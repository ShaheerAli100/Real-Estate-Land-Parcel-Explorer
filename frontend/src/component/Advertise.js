import React from "react";
// import {NavLink} from 'react-router-dom';
import Navbar from './Navbar';
import './index.css';

const Advertise=()=>{
    return (
        <>
            <div className="homepage">
            <Navbar foption="Home" soption="Explore" toption="Dashboard" logBtn="Login" paths="/login" />
 
                {/* <section className="sign-up">
                    <div className="nav-bar sign-bar">
                        <nav>
                            <h1 id="logo" className="logo">RELPE</h1>
                            <ul className="links-nav">
                                <a href="./index.html"><li>Home</li></a>
                                <a href="Map.html"><li>Explore</li></a>
                                <a href="./index.html"><li>Add Property</li></a>
                                <a href="login.html"><li>Dashboards</li></a>
                            </ul>
                        </nav>
                    </div>
                </section> */}
                <section className="sign-card">
                    <div className="card">
                        <form action="">
                            <div className="names">
                                <label for="">First Name</label>
                                <input type="text" />
                                <label for="">Last Name</label>
                                <input type="text" />
                            </div> 
                            <div className="email">
                                <label for="">CNIC</label>
                                <input type="text" placeholder="XXXXX-XXXXXXX-X" />
                            </div>   
                            <div className="email">
                                <label for="">Phone Number</label>
                                <input type="text" placeholder="+92-XXX-XXXXXXX" />
                            </div> 
                            <div className="password">
                                <label for="">Property Address</label>
                                <input type="text" placeholder="House No ABC" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Property Space</label>
                                <input type="text" placeholder="5 Marla" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Property Purpose</label>
                                <input type="text" placeholder="Rent/Sell" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Number of Rooms</label>
                                <input type="number" placeholder="2 or More?" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Number of BathRooms</label>
                                <input type="number" placeholder="2 or More?" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Average Monthly Bills</label>
                                <input type="text" placeholder="10,000 PKR" />
                            </div>

                            <div>
                                <label for="">Facilities</label>
                            </div>
                            <div className="confirm-pass">
                                <label for="">Gas</label>
                                <input type="checkbox" />
                                <label for="">Electrcty</label>
                                <input type="checkbox" />
                                <label for="">Water</label>
                                <input type="checkbox" />
                                <label for="">Internet</label>
                                <input type="checkbox" />
                            </div>
                            <div className="confirm-pass">
                                <label for="">Your Offer</label>
                                <input type="text" placeholder="10,000-30,000PKR" />
                            </div>
                            
                            <a href=""><button className="sub">Verify Now</button></a>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Advertise;