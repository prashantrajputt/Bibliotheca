import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

import "./Address.css"
import { useState } from "react";
import axios from "axios";
const Address=()=>{
    const [address,setAddress]= useState({
        newAdd:""
    })
    const navigate=useNavigate();
    const handleChange = ({ currentTarget: input }) => {
        setAddress({ ...address, [input.name]: input.value });
      };
    const add=localStorage.getItem('address');
    const email=localStorage.getItem('email')

    const handleSubmit=async(e)=>{
        //alert(address.newAdd)
        e.preventDefault();
        try {
        const url = `https://bibliotheca-backend.onrender.com/api/change-address/${email}`;
        const { data: res } = await axios.put(url, address);

        console.log(res.message);
        alert('Update Successful.');
        navigate("/order")
        } catch (error) {
        console.log(error);
        }
    }
    return(
        <>
        <Navbar/>
        
        <div id="APdiv">
            <h1>Add New Address</h1><br/><br/>
            <div id="ACdiv">
                <textarea name="newAdd" value={address.newAdd} defaultValue={add} onChange={handleChange} ></textarea>
                <Link><button onClick={handleSubmit}>Add New Address</button></Link>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default Address;