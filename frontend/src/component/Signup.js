import React,{useState} from "react";
import ReactDOM  from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import './index.css';
import Navbar from "./Navbar";

const Signup=()=>{
    // prompt("Are you a Society Member?");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [user,setUser]=useState({
        firstName:"",lastName:"",email:"",phone:"",password:"",confirmPassword:""
    });
    const [error,setError]=useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    let name;
    let value;
    const handleInputs=(e)=>{
        // console.log(e);
        name=e.target.name;
        value=e.target.value;

        setUser({...user,[name]:value});
    }
const PostData=async(e)=>{
    e.preventDefault();
    const {firstName,lastName,email,phone,password,confirmPassword}=user;
    if(!user.firstName || !user.lastName || !user.email || !user.phone || !user.password || !user.confirmPassword){
        setError(true);
        return false;
    }
    const res=await fetch("/registerForCustomer",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            firstName,lastName,email,phone,password,confirmPassword 
        })
    });
    const data=await res.json(); 
    if(data.status===422 || !data){
        toast.error('Invalid', {
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
        toast.success('Successful', {
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
            navigate("/loginForCustomers");
        }, 3000);
    }
}

    return(
        <>
            <div className="homepage">
                {/* <section className="sign-up">
                    <div className="nav-bar sign-bar">
                        <nav>
                            <h1 id="logo" className="logo">RELPE</h1>
                            <ul className="links-nav">
                                <NavLink to="/" ><li>Home</li></NavLink>
                                <NavLink to="/map"><li>Explore</li></NavLink>
                                <NavLink to="/dashboard"><li>Dashboards</li></NavLink>
                            </ul>
                            <NavLink to="/login"><button>Login</button></NavLink>
                        </nav>
                    </div>
                </section> */}
                <Navbar foption="Home" soption="Explore" coption="Customer" toption="Member" dropdownOption="Dashboard" logBtn="Login" paths="/login" />
                <section className="sign-card">
                    <div className="card">
                        {/* <h1>For Customers</h1> */}
                        <form action="" method="POST">
                            <div className="names">
                                <label for="">First Name</label>
                                <input type="text" name="firstName" id="firstName" autoComplete="off"
                                value={user.firstName}
                                onChange={handleInputs}/>
                            {error && !user.firstName && <span style={{color:"red"}}>Please Enter</span> }

                                <label for="">Last Name</label>
                                <input type="text" name="lastName" id="lastName" autoComplete="off"
                                value={user.lastName}
                                onChange={handleInputs}/>
                            {error && !user.lastName && <span style={{color:"red"}}>Please Enter</span> }

                            </div> 
                            <div className="email">
                                <label for="">Email</label>
                                <input type="email" name="email" id="email" autoComplete="off"
                                value={user.email}
                                onChange={handleInputs}/>
                            {error && !user.email && <span style={{color:"red"}}>Please Enter</span> }

                            </div> 
                            <div className="phone">
                                <label for="">PhoneNumber</label>
                                <input type="number" name="phone" id="phone" autoComplete="off"
                                value={user.phone}
                                onChange={handleInputs}/>
                            {error && !user.phone && <span style={{color:"red"}}>Please Enter</span> }

                            </div>  
                            <div className="password">
                                <label for="">Password</label>
                                <input type={showPassword ? 'text' : 'password'} name="password" id="password" autoComplete="off"
                                value={user.password}
                                onChange={handleInputs}/>
                                <span className="password-toggle" onClick={handlePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            {error && !user.password && <span style={{color:"red"}}>Please Enter</span> }

                            </div>
                            <div className="confirm-pass">
                                <label for="">Confirm-Password</label>
                                <input type={showPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" autoComplete="off"
                                value={user.confirmPassword}
                                onChange={handleInputs}/>
                                <span className="password-toggle" onClick={handlePasswordVisibility}>
                                    {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                                </span>
                            {error && !user.confirmPassword && <span style={{color:"red"}}>Please Enter</span> }

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
export default Signup;