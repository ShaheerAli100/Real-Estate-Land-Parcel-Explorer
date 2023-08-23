import React, {useState} from "react";
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

const LoginForAdmin=()=>{
    const navigate = useNavigate();
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');

    // const loginUser=async(e)=>{
    //   e.preventDefault(); 
    //   const res=await fetch('/signin',{
    //     method:"POST",
    //     headers:{
    //         "Content-Type": "application/json"
    //     },
    //     body:JSON.stringify({
    //         email,
    //         password
    //     })
    //   });
    //   const data=res.json();
    //   if(res.status===400 || !data){
    //     window.alert("invalid credentails");
    //   }else{
    //     window.alert("Login Successful");
    //     navigate("/dashboard");
    //   }
    // }
    const loginAdmin=async(e)=>{
        e.preventDefault(); 
        const res=await fetch('/signinForAdmin',{
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
              name,
              password
          })
        });
        const data=res.json();
        if(res.status===400 || !data ){
            toast.error('Invalid Credentials', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }else{
            toast.success('Login Successful', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          
            setTimeout(function() {
                navigate("/admin");
            }, 3000);
        }
      }
    //   console.log(loginCustomer);


    // const doubleFunction=()=>{
    //     loginUser;
    //     loginCustomer;
    // }
    //   var Test = React.createClass({
    //     onClick: function(event){
    //         loginUser();
    //         loginCustomer();
    //     },
    //     render: function(){
    //        return (
    //           <a href="#" onClick={this.onClick}>Test Link</a>
    //        );
    //     }
    //  });
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
                <Navbar foption="Home" soption="Explore" coption="Customer" toption="Member" dropdownOption="Dashboard" logBtn="SignUp" paths="/askpop" />
                <section className="sign-card">
                    <div className="card">
                        <form method="POST" action="">
                            
                            <div className="email">
                                <label for="">Name</label>
                                <input type="email" name="name" id="email" autoComplete="off"
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}                                    
                                />
                            </div>  
                            <div className="password">
                                <label for="">Password</label>
                                <input type="password" name="password" id="password" autoComplete="off"
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}                               
                                 />
                                
                            </div>
                           
                        
                            {/* <a href=""><button type="submit" name="signin" className="sub"
                                value="Log In"
                                onClick={loginUser}
                            >Submit</button></a> */}
                            <a href=""><button type="submit" name="signin" className="sub"
                                value="Log In"
                                onClick={loginAdmin}
                            >Submit</button></a>
                         </form>
                    </div>
                </section>
                <ToastContainer
                    style={{fontSize:"16px"}}
                />
        </div>
       

    </>
    
    );
}

export default LoginForAdmin;