import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Flex,
    Button,
    Heading,
    useToast,
    Box,
    Avatar,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
import {Link, useNavigate } from "react-router-dom"

const initUserInfo = {
    email:"",
    password:""
}
export const Login = ()=>{
    const toast = useToast();
    const [userLogin,setUserLogin] = useState(initUserInfo)
    const [isLoginSuccess,setIsLoginSuccess] = useState({message:"",token:null,loggedIn:false,email:""})
    console.log(isLoginSuccess)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target
        setUserLogin({
            ...userLogin,
            [name]:value
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        if(userLogin.email=="" || userLogin.password==""){
            toast({
            title: "Account created.",
            description: "Please fill the proper Details",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        }
        else{
            setLoading(true)
            fetch("http://localhost:8080/login",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(userLogin)
            })
            .then((res)=>res.json())
            .then((res)=>setIsLoginSuccess(res))
            .finally(()=>setLoading(false))
        }
    }

    useEffect(()=>{
        if(isLoginSuccess.loggedIn){
            localStorage.setItem("coinTab_login_token",isLoginSuccess.token)
            localStorage.setItem("email",isLoginSuccess.email)
             toast({
            title: "Account created.",
            description: "Login Successfully",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
            navigate("/")
        }
        if(isLoginSuccess.loggedIn== false && isLoginSuccess.message!=""){
            toast({
                title: "Account created.",
                description: `${isLoginSuccess.message}`,
                status: "warning",
                duration: 9000,
                isClosable: true,
                position: "top",
              });
        }
    },[isLoginSuccess])


    if(loading){

        return <Avatar position='absolute' marginLeft='0%' src="https://media.tenor.com/K2UGDd4acJUAAAAC/load-loading.gif" alt="gif" />
        
    }


    return(
    <>

           <Box display="flex" justifyContent='center' height='0vh' marginTop='40px'  >
           {/* <Avatar position='absolute' marginLeft='0%'  src="https://media.tenor.com/K2UGDd4acJUAAAAC/load-loading.gif" alt="" /> */}
           {loading}
           </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        height="50vh"
        flexDirection={"column"}
      >
        <Heading m={"2rem"}>Login</Heading>
        <FormControl
          width="30%"
          height="35vh"
          boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
          p={"2rem"}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="name@domain.com"
            id="email"
            name="email"
            onChange={handleChange}
          />
  
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            id="password"
            name="password"
            onChange={handleChange}
          />
  
          <Button
            mt="15px"
            width="full"
            type="submit"
            colorScheme="blue"
            onClick={handleSubmit}
          >
            Login
          </Button>


          <FormHelperText>
            Please create a account ?{" "}
            <Link
              to={"/signup"}
              style={{
                textDecoration: "underline",
                color: "blue",
              }}
            >
              Register
            </Link>
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
    )
}

