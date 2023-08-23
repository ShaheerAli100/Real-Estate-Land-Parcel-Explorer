import React from "react";
import { NavLink } from "react-router-dom";
import './index.css';
import Navbar from "./Navbar";


const Frontpage=()=>{
    return(
        <>
            <section id="home" className="homepage">
                <div className="frontpage">
                    {/* <div className="nav-bar">
                        <nav>
                            <h1 id="logo">RELPE</h1>
                            <ul className="links-nav">
                                <a href="index.html"><li>Home</li></a>
                                <a href="Map.html"><li>Explore</li></a>
                                <a href="login.html"><li>Dashboards</li></a>
                            </ul>
                            <a href="./signup.html"><button>Sign-Up</button></a>
                        </nav>
                    </div> */}
                    <Navbar foption="Home" soption="Explore" coption="Customer" toption="Member" dropdownOption="Dashboard"  logBtn="Login" paths="/login" />

                    <div className="frontpage-flex">
                        <div className="frontpage-content">
                                <h1 className="front-style">Real-Estate Land Parcel Explorer</h1>
                                <p>Want to buy or rent?</p>
                                <h1 className="fs-heading">How much my property is worth?</h1>
                                <p className="fs-para">Elegant retreat in a quiet Coral Gables setting. This home provides wonderful entertaining spaces with a chef kitchen opening Elegant retreat in a quiet Coral Gables setting.</p>
                                <a href="http://localhost:8080/"><button className="explore">Explore Now</button></a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="services"></section>
            <section className="footer">

            </section>
        </>
    );
}
export default Frontpage;