import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/navbar.module.css"

export const Navbar = ()=>{
    const navigate = useNavigate()
    const [token,setToken] = useState(localStorage.getItem("coinTab_login_token"))
    const handleNavigate=()=>{
        navigate("/")
    }
    const handleLogout=()=>{
        localStorage.removeItem("coinTab_login_token")
        localStorage.removeItem("email")
        navigate("/login")
    }


    return(<>
        <div className={styles.navbar_container}>
            <div className={styles.logo_cointab_div}>
                <img onClick={handleNavigate} src="https://www.cointab.in/wp-content/uploads/2021/06/cointab_green-1.png" alt="cointab logo" />
            </div>
            <div className={styles.set_links_div}>
                <Link className={styles.set_link} to="/" >Home</Link>
                
                
                <Link className={styles.set_link} to="/signup"> Signup </Link>

               <Link className={styles.set_link} to="/login">Login</Link>
                
            </div>
        </div>
    </>)
}