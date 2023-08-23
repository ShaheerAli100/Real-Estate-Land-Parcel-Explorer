import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";

function Adminpanel() {
  const navigate=useNavigate();
  const [userData,setUserData]=useState({});
  const callAdminPage=async()=>{
    try{
        const res =await fetch('/aboutAdmin',{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
             },
            credentials:"include"
        });
       
        const data=await res.json();
        console.log(data);
        setUserData(data);

        if(!res.status===200){
            const error= new Error(res.error);
            throw error;
        }

    }catch(err){
        console.log(err);
        navigate('/loginForAdmin');
    }
};
useEffect(()=>{
  callAdminPage();
},[]);


  const [Users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/allUsers");
      const data = await response.json();
      console.log("Users: ", data);
      setUsers(data);
    }
    fetchUsers();
  }, []);

  //Deleting a user
  const deleteUsers = async (id) => {
    try {

      const confirmDelete = window.confirm('Are you sure you want to delete this User?');
      if (!confirmDelete) {
        return; // Exit the function if the user cancels the deletion
      }
      const response = await fetch(`/allUsers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.warn('Deleted Successfully', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        // Optional: Call fetchSubjects() again to refresh the list
      } else {
        console.log('Error deleting user:', response.status);
      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };

  return (
    <>
      <div className="homepage" >

        <Navbar  logBtn="Logout" paths="/logout"/>

      {/* <div className="table-container">
        <table className="subject-table">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>House Address</th>
              <th>Email</th>
              <th>CNIC</th>
              <th>Phone Number</th>
              <th>Space</th>
              <th>Phone Number</th>
            </tr>
            {subjects.map((subject) => (
              <tr key={subject._id}>
                <td>{subject.firstName}</td>
                <td>{subject.lastName}</td>
                <td>{subject.HouseAddress}</td>
                <td>{subject.email}</td>
                <td>{subject.cnic}</td>
                <td>{subject.phoneNumber}</td>
                <td>{subject.space}</td>
                <td>{subject.phoneNumber}</td>
              </tr>
            ))}
        </table>
      </div> */}

        {Users.map((User) => (
        <div class="information">  
         <h1 style={{textAlign:"center", fontFamily:"'Montserrat', sans-serif"}}>{User.firstName} {User.lastName}</h1>
                  <div class="table-flex" style={{fontFamily:"'Montserrat', sans-serif"}}>
                      <table>
                          <tbody>
                              <tr>
                                  <th>Name</th>
                                  <th>CNIC</th>
                                  <th>Phone Number</th>
                                  <th>Email</th>
                              </tr>
                              <tr>
                                  <td>{User.firstName} {User.lastName}</td>
                                  <td>{User.cnic}</td>
                                  <td>{User.phoneNumber}</td>
                                  <td>{User.email}</td>
                              </tr>
                          </tbody>
                      </table>
                      <table>
                          <tbody>
                              <tr>
                                  <th>Property Address</th>
                                  <th>Property Purpose</th>
                                  <th>Number of Rooms</th>
                                  <th>Number of BathRooms</th>
                              </tr>
                              <tr>
                                  <td>{User.HouseAddress}</td>
                                  <td>{User.purpose}</td>
                                  <td>{User.rooms}</td>
                                  <td>{User.bathrooms}</td>
                              </tr>
                          </tbody>
                      </table>
                      <table>
                          <tbody>
                              <tr>
                                  <th>Space</th>
                                  <th>Average Monthly Bills</th>
                                  <th>Facilities</th>
                                  
                              </tr>
                              <tr>    
                                  <td>{User.space}</td>
                                  <td>{User.bills} PKR</td>
                                  <td>GAS:"{User.gas}", INTERNET:"{User.internet}, Electricity:"{User.electricity}", Water:"{User.water}"</td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div className="delbtn">
                      <svg onClick={() => deleteUsers(User._id)} style={{fill:"#FA5252", cursor:"pointer"}}  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="60px" height="60px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"/><title>Delete</title></svg>
                  </div>
              </div>
              ))}
            </div>
            <ToastContainer
                    style={{fontSize:"14px"}}
                />
    </>
  );
}

export default Adminpanel;
