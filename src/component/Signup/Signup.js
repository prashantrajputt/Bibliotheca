import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [error, setError] = useState("");
    const [data, setData] = useState({
        Name: '',
        email: "",
        password: ""
    });
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(data);

            const url = 'https://bibliotheca-backend.onrender.com/api/';
            const { data: res } = await axios.post(url, data);

            console.log(res.message);
            toast('Signup Successful.');
           // window.location.reload();
           navigate("/")
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
              ) {
                setError(error.response.data.message);
              }
        }
    };

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    


    const EyeFunc1 = () => {
        const passInput = document.getElementById("pass");
        const eyeIcon = document.getElementById("oEyes");

        if (passInput.type === "password") {
            passInput.type = "text";
            eyeIcon.className = "fa fa-eye-slash";
        } else {
            passInput.type = "password";
            eyeIcon.className = "fa fa-eye";
        }
    };

    return (
        <>
              <ToastContainer />

            <div id="parent">
                <div id="child">
                    <div id="login">
                        <h1>SignUp</h1>
                        <form onSubmit={handleSubmit}>
                            <p id="inpuTit">Username :</p>
                            <div id="inpuDiv">
                                <i id="icon" className="fa fa-user"></i>
                                <input
                                    type="text"
                                    id="uname"
                                    name="Name"
                                    value={data.Name}
                                    onChange={handleChange}
                                    placeholder="Enter Username"
                                />
                            </div>
                            <p id="inpuTit">Email :</p>
                            <div id="inpuDiv">
                                <i id="icon" className="fa fa-envelope-o"></i>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>
                            <p id="inpuTit">Password :</p>
                            <div id="inpuDiv">
                                <i id="icon" className="fa fa-lock"></i>
                                <input
                                    type="password"
                                    id="pass"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                                <i className="fa fa-eye" onClick={EyeFunc1} id="oEyes"></i>
                            </div>
                            <br />
                            <p>{error}</p>
                            <div id="btnDiv">
                                <button type="submit" id="otpBtn">SignUp</button>
                            </div>
                        </form>
                        <span id="FV"></span>
                        <p id="sgn">
                            Already Registered?&emsp;
                            <Link to="/" id="sgnL">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
