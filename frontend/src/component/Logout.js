import React, { useEffect } from "react";
// import ReactDOM from 'react-dom';
// import { NavLink } from "react-router-dom";
import './index.css';
import { useNavigate } from "react-router-dom";

const Logout=()=>{
    const nevigate=useNavigate();
    useEffect(()=>{
        fetch('/logout',{
          method:"GET",
          headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
          } ,
          credentials:"include"
        }).then((res)=>{
            nevigate('/login',{replace:true});
            if(!res.status===200){
                const error= new Error(res.error);
                throw error;
            }
        }).catch((err)=>{
            console.log(err);
        });
    });
    return(
        <>
            <h1>Logout Page bitch</h1>

        </>
    
    )
      
}


export default Logout;