import React, { useState } from "react";
import ReactDOM from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';

import './index.css';
import Navbar from "./Navbar";

const SignupforMember = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    HouseAddress: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnic: "",
    phoneNumber: "",
    parcel:"",
    space: "",
    purpose: "",
    rooms: "",
    bathrooms: "",
    bills: "",
    gas: false, // Initialize as false
    electricity: false, // Initialize as false
    water: false, // Initialize as false
    internet: false, // Initialize as false
    offer: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputs = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
   

    setUser((prevUser) => ({
      ...prevUser,
      [name]: inputValue,
    }));
  };

  const PostData = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      HouseAddress,
      email,
      password,
      confirmPassword,
      cnic,
      phoneNumber,
      parcel,
      space,
      purpose,
      rooms,
      bathrooms,
      bills,
      gas,
      electricity,
      water,
      internet,
      offer
    } = user;

    if (
      !firstName ||
      !lastName ||
      !HouseAddress ||
      !email ||
      !password ||
      !confirmPassword ||
      !cnic ||
      !phoneNumber ||
      !parcel ||
      !space ||
      !purpose ||
      !rooms ||
      !bathrooms ||
      !bills
    ) {
      setError(true);
      return false;
    }

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        HouseAddress,
        email,
        password,
        confirmPassword,
        cnic,
        phoneNumber,
        parcel,
        space,
        purpose,
        rooms,
        bathrooms,
        bills,
        gas: gas.toString(),
        electricity: electricity.toString(),
        water: water.toString(),
        internet: internet.toString(),
        offer
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      toast.error('Invalid', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
    } else {
      toast.success('Successful', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
      });
      setTimeout(function() {
        navigate("/login");
    }, 3000);
    }
  };
    return(
        <>
        <div className="homepage">
        <Navbar foption="Home" soption="Explore" coption="Customer" toption="Member" dropdownOption="Dashboard" logBtn="Login" paths="/login" />
            <section className="sign-card">
                <div className="card">
                    <form action="">
                        <div className="names">
                            <label for="">First Name</label>
                            <input type="text" name="firstName" id="firstName" autoComplete="off" minLength={4} 
                                style={{textTransform:"capitalize"}}
                                value={user.firstName}
                                onChange={handleInputs}
                            />
                            {error && !user.firstName && <span style={{color:"red"}}>Please Enter</span> }
                            <label for="">Last Name</label>
                            <input type="text" name="lastName" id="lastName" autoComplete="off" minLength={4}
                                style={{textTransform:"capitalize"}}
                                value={user.lastName}
                                onChange={handleInputs} 

                            />
                            {error && !user.lastName && <span style={{color:"red"}}>Please Enter</span> }

                        </div> 
                        <div className="addres">
                            <label for="">House Address</label>
                            <input type="text" name="HouseAddress" id="HouseAddress" autoComplete="off" minLength={4} 
                                style={{textTransform:"capitalize"}}
                                value={user.HouseAddress}
                                onChange={handleInputs}

                            />
                            {error && !user.HouseAddress && <span style={{color:"red"}}>Please Enter</span> }

                        </div> 
                        <div className="email">
                            <label for="">Email</label>
                            <input type="email" name="email" id="email" autoComplete="off"
                                style={{textTransform:"lowercase"}}
                                value={user.email}
                                onChange={handleInputs}
                            />
                            {error && !user.email && <span style={{color:"red"}}>Please Enter</span> }

                        </div>  
                        <div className="password">
                            <label for="">Password</label>
                            <div className="password-input">
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password" autoComplete="off" minLength={4} maxLength={16}
                                    value={user.password}
                                    onChange={handleInputs}
                                />
                                <span className="password-toggle" onClick={handlePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            </div>
                            
                            {error && !user.password && <span style={{color:"red"}}>Please Enter</span> }

                        </div>
                        <div className="confirm-pass">
                            <label for="">Confirm-Password</label>
                            <div className="password-input">
                                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" autoComplete="off" minLength={4} maxLength={16}
                                    value={user.confirmPassword}
                                    onChange={handleInputs}
                                />
                                <span className="password-toggle" onClick={handlePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            </div>
                            {error && !user.confirmPassword && <span style={{color:"red"}}>Please Enter</span> }

                        </div>
                        <div className="email">
                                <label for="">CNIC</label>
                            <input type="number" name="cnic"  placeholder="XXXXX-XXXXXXX-X" autoComplete="off" minLength={0} maxLength={15}
                                    value={user.cnic}
                                    onChange={handleInputs}
                                />
                            {error && !user.cnic && <span style={{color:"red"}}>Please Enter</span> }

                            </div>   
                            <div className="email">
                                <label for="">Phone Number</label>
                                <input type="number" name="phoneNumber" placeholder="03XX-XXXXXXX" 
                                    autoComplete="off" minLength={0} maxLength={11}
                                    value={user.phoneNumber}
                                    onChange={handleInputs}
                                />
                            {error && !user.phoneNumber && <span style={{color:"red"}}>Please Enter</span> }

                            </div> 
                            <div className="confirm-pass">
                                <label for="">Your Parcel</label>
                                <select
                                    className="form-control"
                                    name="parcel"
                                    value={user.parcel}
                                    onChange={handleInputs}
                                >
                                    <option value="">-- Select Parcel --</option>
                                    <option value="Shop">Shop</option>
                                    <option value="House">House</option>
                                    <option value="Plot">Plot</option>
                                   
                                </select>
                            {error && !user.parcel && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                            <div className="confirm-pass">
                                <label for="">Property Space</label>
                                <select
                                    className="form-control"
                                    name="space"
                                    value={user.space}
                                    onChange={handleInputs}
                                >
                                    <option value="">-- Select Space --</option>
                                    <option value="1 Marla">1 Marla</option>
                                    <option value="2 Marla">2 Marla</option>
                                    <option value="3 Marla">3 Marla</option>
                                    <option value="5 Marla">5 Marla</option>
                                    <option value="7 Marla">7 Marla</option>
                                    <option value="10 Marla">10 Marla</option>
                                </select>
                            {error && !user.space && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                            <div className="confirm-pass">
                                <label for="">Property Purpose</label>
                                <select
                                    className="form-control"
                                    name="purpose"
                                    value={user.purpose}
                                    onChange={handleInputs}
                                    
                                >
                                    <option value="">-- Select Purpose --</option>
                                    <option value="Rent">Rent</option>
                                    <option value="Sell">Sell</option>
                                </select>
                            {error && !user.purpose && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                             <div className="confirm-pass">
                                <label for="">Number of Rooms</label>
                                <input type="number" name="rooms" placeholder="2 or More?" 
                                    autoComplete="off"
                                    value={user.rooms}
                                    onChange={handleInputs}
                                />
                            {error && !user.rooms && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                            <div className="confirm-pass">
                                <label for="">Number of BathRooms</label>
                                <input type="number" name="bathrooms" placeholder="2 or More?" 
                                    autoComplete="off"
                                    value={user.bathrooms}
                                    onChange={handleInputs}
                                />
                            {error && !user.bathrooms && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                            <div className="confirm-pass">
                                <label for="">Average Monthly Bills</label>
                                <input type="number" name="bills" placeholder="10,000 PKR"
                                    autoComplete="off"
                                    value={user.bills}
                                    onChange={handleInputs}                                
                                 />
                            {error && !user.bills && <span style={{color:"red"}}>Please Enter</span> }

                            </div>

                           <div>
                                <label for="">Facilities</label>
                            </div>
                            <div className="confirm-pass">
                                <label for="">Gas</label>
                                <input
                                   type="checkbox"
                                    name="gas"
                                    defaultChecked={false}
                                    checked={user.gas}
                                    onChange={handleInputs}  
                                     />
                            {/* {error && !user.gas && <span style={{color:"red"}}>Please Enter</span> } */}

                                <label for="">Electricity</label>
                                <input 
                                    type="checkbox"
                                    name="electricity"
                                    defaultChecked={false}
                                    
                                    // checked={user.gas}
                                    // onChange={handleInputs} 

                                    // autoComplete="off"
                                    checked={user.electricity}
                                    onChange={handleInputs}  />
                            {/* {error && !user.electricity && <span style={{color:"red"}}>Please Enter</span> } */}

                                <label for="">Water</label>
                                <input type="checkbox" 
                                    name="water" 
                                    // placeholder="YES/NO"
                                    // minLength={0} maxLength={3}
                                    // style={{textTransform:"capitalize"}}

                                    // autoComplete="off"
                                    defaultChecked={false}

                                    checked={user.water}
                                    onChange={handleInputs}  />
                            {/* {error && !user.water && <span style={{color:"red"}}>Please Enter</span> } */}
                                
                                <label for="">Internet</label>

                                <input type="checkbox" 
                                    name="internet" 
                                    // placeholder="YES/NO"
                                    // minLength={0} maxLength={3}
                                    // style={{textTransform:"capitalize"}}

                                    // autoComplete="off"
                                    // defaultChecked={false}
                                    // value="1"
                                    checked={user.internet}
                                    onChange={handleInputs} 
                                />
                            {/* {error && !user.internet && <span style={{color:"red"}}>Please Enter</span> } */}

                            </div>
                            <div className="confirm-pass">
                                <label for="">Your Offer</label>
                                <input type="number"
                                    name="offer" 
                                    autoComplete="off"
                                    value={user.offer}
                                    onChange={handleInputs}                              
                                    placeholder="10,000-30,000PKR" />
                            {error && !user.offer && <span style={{color:"red"}}>Please Enter</span> }

                            </div> 
                        <a href=""><button type="submit" name="signup" id="signup" className="sub"
                            value="register" onClick={PostData}
                        >Submit</button>
                        </a>
                    </form>
                </div>
            </section>
            <ToastContainer
                    style={{fontSize:"14px"}}
                />
        </div>
    </>
    );
}

export default SignupforMember;