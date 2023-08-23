import React, {useState} from "react";
import './index.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";

const LoginForCus=()=>{
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const navigate = useNavigate();
    const [email,setEmail]=useState('');
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
    const loginCustomer=async(e)=>{
        e.preventDefault(); 
        const res=await fetch('/signinForCustomers',{
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body:JSON.stringify({
              email,
              password
          })
        });
        const data=await res.json();
        if(res.status === 400 || !data ){
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
        } else if(!email || !password || data.error === "Invalid credentials" || data.error==="No token provided"){
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
        }
        else{
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
                navigate("/customer");
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
                                <label for="">Email</label>
                                <input type="email" name="email" id="email" autoComplete="off"
                                    value={email}
                                    onChange={(e)=>{setEmail(e.target.value)}}                                    
                                />
                            </div>  
                            <div className="password">
                                <label for="">Password</label>
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password" autoComplete="off"
                                    value={password}
                                    onChange={(e)=>{setPassword(e.target.value)}}                               
                                 />
                                  <span className="password-toggle" onClick={handlePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                 </span>
                            </div>
                            <div>
                            <a href=""><p>Forgot Password?</p></a> 
                            <NavLink to="/login"><p>Are you a Society Member?</p></NavLink> 

                            </div>
                        
                            {/* <a href=""><button type="submit" name="signin" className="sub"
                                value="Log In"
                                onClick={loginUser}
                            >Submit</button></a> */}
                            <a href=""><button type="submit" name="signin" className="sub"
                                value="Log In"
                                onClick={loginCustomer}
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

export default LoginForCus;