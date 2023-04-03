import { Navigate } from "react-router-dom"

export const PrivateRoute=({children})=>{

    let coinTab_token = (localStorage.getItem("coinTab_login_token"))
 
    if(!coinTab_token){
       return <Navigate to="/login" />
    }
    return(
        <>
        {children}
        </>
    )
}