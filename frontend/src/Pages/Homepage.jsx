import { Box, Button } from "@chakra-ui/react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Homepage=()=>{
    const navigate = useNavigate()
    const email = localStorage.getItem("email")
    const token = useState(localStorage.getItem("coinTab_login_token"))

    // if(token){
    //     return <h2>Logout</h2>
    // }

    const handleLogout=()=>{
        localStorage.removeItem("coinTab_login_token")
        localStorage.removeItem("email")
        navigate("/login")
    }

    return(<>
        <Box display='flex' justifyContent='center' >
      

        <Box fontSize='30px' mt='30px'>
           Hey, {email}
        </Box>

        <Box position='absolute' mt='-60px' ml='84%'>
         {token,<Button background="teal" color="white" onClick={handleLogout}>Logout</Button>}
        </Box>
        </Box>
    </>
    )
}