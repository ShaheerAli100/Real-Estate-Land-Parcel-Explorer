import React from "react";
import {NavLink} from 'react-router-dom';
// import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./Navbar";
import './index.css';

const Askpop=()=>{
    return(
        <>
                <div className="homepage">
                    {/* <section className="sign-up">
                        <div className="nav-bar sign-bar">
                            <nav>
                                <h1 id="logo" className="logo">RELPE</h1>
                                <ul className="links-nav">
                                    <a href="./index.html"><li>Home</li></a>
                                    <a href="Map.html"><li>Explore</li></a>
                                    <a href="login.html"><li>Dashboards</li></a>
                                </ul>
                                <a href="./signup.html"><button>Sign-Up</button></a>
                            </nav>
                        </div>
                    </section> */}
                    <Navbar foption="Home" soption="Explore" coption="Customer" toption="Member" dropdownOption="Dashboard" logBtn="SignUp" paths="/signup" />
                    <section className="sign-card">
                        <div className="card card-ask">
                           
                        <NavLink to="/signup"><div>
                                <h1>Are you a customer?</h1>
                           </div></NavLink>
                           <NavLink to="/signupformember"><div>
                                <h1>Are you a society member?</h1>
                           </div></NavLink>
                        </div>
                    </section>
            </div>
        </>
    );
}

export default Askpop;