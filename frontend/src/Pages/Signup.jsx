import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Flex,
    Button,
    Heading,
    useToast,
    Avatar,
    Box,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  
  export default function Signup() {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [isSignupSuccess,setIsSignupSuccess] = useState({message:"",signedUp:false})
  

    const [signupForm, setSignupForm] = useState({
      email: "",
      password: "",
    });
  
 
    function handleSignup(e) {
      e.preventDefault();
    

    if(signupForm.email == "" || signupForm.password == ""){

        toast({
            title: "Account created.",
            description: "Please fill the proper Details",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
        

    }else{
        setLoading(true)
        fetch("http://localhost:8080/register",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupForm)
        })
        .then((res)=>res.json())
        .then((res)=>setIsSignupSuccess(res))
        .finally(()=>setLoading(false))
    }  
    }


  
    function handleChange(e) {
      setSignupForm({ ...signupForm, [e.target.id]: e.target.value });
    }


    useEffect(()=>{
                if(isSignupSuccess.signedUp){
                  
                    toast({
                        title: "Account created.",
                        description: "We've created your account for you.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                        position: "top",
                      });
                      navigate("/login");
                }
                if(isSignupSuccess.signedUp==false && isSignupSuccess.message!=""){
                    toast({
                        title: "Account created.",
                        description: `${isSignupSuccess.message}`,
                        status: "warning",
                        duration: 9000,
                        isClosable: true,
                        position: "top",
                      });
                }
            },[isSignupSuccess])


            if(loading){

                return <Avatar position='absolute' marginLeft='0%' src="https://media.tenor.com/K2UGDd4acJUAAAAC/load-loading.gif" alt="gif" />
                
            }

    return (

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
        <Heading m={"2rem"}>Register</Heading>
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
            onChange={handleChange}
          />
  
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
          />
  
          <Button
            mt="15px"
            width="full"
            type="submit"
            colorScheme="blue"
            onClick={handleSignup}
          >
            Register
          </Button>

          <FormHelperText>
            Already have an account ?{" "}
            <Link
              to={"/login"}
              style={{
                textDecoration: "underline",
                color: "blue",
              }}
            >
              Login Here
            </Link>
          </FormHelperText>
        </FormControl>
      </Flex>

      </>
    );
  }
  