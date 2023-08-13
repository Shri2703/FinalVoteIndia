import { Component } from "react";
import Logoimg from "./Images/newlogo.png"
import "./Navbar.css";
import { Link } from "@mui/material";

class Navbar extends Component{

    state = {clicked: false };
    handleClick = () =>{
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <div className="body">
            <nav className="NavbarItems">
                <div className="logo-box">
                <img className="logo" src={Logoimg} />
                <h1 className="navbar-logo"> Vote INDIA</h1>
                </div>
                <div className="menu-icons" onClick={this.handleClick}>
                    <i className={this.state.clicked ? "fas fa-times":"fas fa-bars"}></i>
                </div>

                <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                    <li>
                        <a href="#home" className="nav-links">
                            <i class="fa-solid fa-house"></i>Home
                        </a>
                    </li>
                    <li>
                        <a href="#about1" className="nav-links">
                            <i class="fa-solid fa-user"></i>About
                        </a>
                    </li>
                    <li>
                        <a href="#contact" className="nav-links">
                            <i class="fa-solid fa-phone"></i>Contacts
                        </a>
                    </li>
                    {/* <li>
                        <a href="#" className="nav-links">
                            Login
                        </a>
                    </li> */}

                    <Link href="Signup"><button >Sign up</button></Link>
                </ul>
                
            </nav>
        </div>
            
        )
    }
}

export default Navbar;