import { Link } from "react-router-dom";
import "./profile.css";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from 'axios';

const Profile= () => {


  const [user, setUser] = useState([]);
	const email = localStorage.getItem("email");
	const getUserDetail=async()=>{
	  try{
		  const {data}=await axios.get(`https://bibliotheca-backend.onrender.com/api/details/${email}`);
			  setUser(data);
  
	  }catch(error){
		  console.log(error);
  }}
	  getUserDetail();

    const handleLogout = () => {
      localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("UserName");
          localStorage.removeItem("address");

    };

    localStorage.setItem("address",user.address)


    return (
      <>
      <Navbar/>
        <div className="container1">
          <div className="sidebar1">
            <div className="profile1">
              <div className="avatar1"></div>
              <p>Hello, {user.Name}</p>
            </div>
            <div className="menu1">
              <Link to="/mainpage"><button >Home</button></Link>
              <Link to="/orderhistory"><button>My Orders</button></Link>
              <Link to="/yourbasket"><button>Basket</button></Link>
              <Link to="/faq"><button>FAQ</button></Link>
              <Link to="/"><button onClick={handleLogout}>Logout</button></Link>
            </div>
          </div>
          <div className="main-content">
            <h2>Personal Information</h2>
            <div id="pForm">
              <div className="form-group">
                <label>Name</label>
                <h3>{user.Name}</h3>
              </div>
              <div className="form-group">
                <label>Gender</label>
                
                <h3>{user.gender}</h3>
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <h3>{email}</h3>
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <h3>{user.mob}</h3>
              </div>
              <div className="form-group">
                <label>Address</label>
                <h3>{user.address}</h3>
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <h3>{user.pincode}</h3>
              </div>
              <div className="form-group">
              <label>Credit Card Number</label>
                <h3>{user.creditCard}</h3>
              </div>
              <div className="form-group">
                <label>CVV</label>
                <h3>{user.cvv}</h3>
              </div>
              <div className="form-group">
                <label>Bank Name</label>
                <h3>{user.bank}</h3>
              </div>
              <Link to="/editinfo" state={user}><button type="submit">Edit Information</button></Link>
              <Link to="/change-password" state={user} ><button type="submit">Change Password</button></Link>

            </div>
          </div>
        </div>
        <Footer/>
        </>
      );
    }
    

export default Profile;