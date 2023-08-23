import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
// import Navbar from './component/Navbar';
import Frontpage from './component/Frontpage';
import Map from './component/Map';
import Login from './component/Login';
import Signup from './component/Signup';
import SignupforMember from './component/SignupforMember';
import Dashboard from './component/Dashboard';
import Advertise from './component/Advertise';
import Askpop from './component/Askpop';
import Logout from './component/Logout';
import Customer from './component/Customer';
import LoginForCus from './component/LoginForCus';
import AdminPanel from './component/Adminpanel';
import LoginForAdmin from './component/LoginForAdmin';



const App=()=>{
  return(
    <>
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Frontpage/>} />
            <Route path='/advertise' element={<Advertise/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/map' element={<Map/>} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/signupformember' element={<SignupforMember/>} />
            <Route path='/askpop' element={<Askpop/>} />
            <Route path='/logout' element={<Logout/>} />
            <Route path='/customer' element={<Customer/>} />
            <Route path='/loginForCustomers' element={<LoginForCus/>} />
            <Route path='/loginForAdmin' element={<LoginForAdmin/>} />
            <Route path='/admin' element={<AdminPanel/>} />
            
            
          </Routes>
        </BrowserRouter>
    </>
   );  
}

export default App;