import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Password=()=>{
    const location = useLocation();
    const user = location.state;
  const email=localStorage.getItem('email')
    const navigate=useNavigate();
    const [data, setData] = useState({
        password:''
    })
    const handleLogout = () => {
        localStorage.removeItem("token");
            localStorage.removeItem("email");
      };
      const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = `https://bibliotheca-backend.onrender.com/api/change-password/${email}`;
          const { data: res } = await axios.put(url, data);
    
          console.log(res.message);
          alert('Update Successful.');
          navigate("/profile")
          //window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };
    return(
        <>
      <Navbar />
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
          <h2>Change Password</h2>
          <form id="pForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Enter new Password</label>
              <input type="text" name="password" value={data.password} onChange={handleChange} />
            </div>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
    )
}
export default Password