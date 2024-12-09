import { Link, useLocation,useNavigate } from "react-router-dom";
import "./Editinfo.css";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const EditInfo = () => {
  const location = useLocation();
  const user = location.state;

  const navigate=useNavigate();

  const [data, setData] = useState({
    Name: user.Name || '',
    address: user.address || '',
    creditCard: user.creditCard || '',
    bank: user.bank || '',
    gender: user.gender || '',
    mob: user.mob || '',
    pincode: user.pincode || '',
    cvv: user.cvv || ''
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  useEffect(() => {
    if (user && user.gender !== undefined) {
      if (user.gender === "male") {
        document.getElementById("male").checked = true;
      } else if (user.gender === "female") {
        document.getElementById("female").checked = true;
      } else {
        document.getElementById("ns").checked = true;
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://bibliotheca-backend.onrender.com/api/personal-details/${user.email}`;
      const { data: res } = await axios.put(url, data);

      console.log(res.message);
      toast('Update Successful.');
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container1">
        <div className="sidebar1">
          <div className="profile1">
            <div className="avatar1"></div>
            <p>Hello, {user.Name}</p>
          </div>
          <div className="menu1">
            <Link to="/profile"><button>Go Back</button></Link>
            <Link to="/orderhistory"><button>My Orders</button></Link>
            <Link to="/yourbasket"><button>Basket</button></Link>
            <Link to="/faq"><button>FAQ</button></Link>
            <Link to="/"><button onClick={handleLogout}>Logout</button></Link>
          </div>
        </div>
        <div className="main-content">
          <h2>Personal Information</h2>
          <form id="pForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="Name" value={data.Name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <div className="gender-options">
                <input type="radio" id="male" name="gender" value="male" onChange={handleChange} />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" onChange={handleChange} />
                <label htmlFor="female">Female</label>
                <input type="radio" id="ns" name="gender" value="Not Uploaded" onChange={handleChange} />
                <label htmlFor="ns">Not Specified</label>
              </div>
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="text" name="mob" value={data.mob} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={data.address} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Pincode</label>
              <input type="text" name="pincode" value={data.pincode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Credit Card Number</label>
              <input type="text" name="creditCard" value={data.creditCard} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input type="text" name="cvv" value={data.cvv} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Bank Name</label>
              <input type="text" name="bank" value={data.bank} onChange={handleChange} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditInfo;
