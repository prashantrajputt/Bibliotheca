import "./Contact.css";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import React, {useRef} from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Contact= () => {
  const email=localStorage.getItem('email')
  const un=localStorage.getItem('UserName')
  const form = useRef();
  const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_th70t6r', 'template_inzlrbc', form.current, {
      publicKey: '-0VC5CtKNsclHgn5d',
    })
    .then(
      () => {
        window.location.reload();

      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );
  };
  window.onload = () => {
    toast("Mail Sent. Team will contact you soon...")

  };
  return(
      <>
      <Navbar/>
      <ToastContainer />

      <section className="contact">
      <div className="content">
        <h2>Contact Us</h2>
        <p><b>Connect us for asking any query or if you have any complain
          then please fill this form. We will contact you as soon as possible </b>
        </p>
      </div>
      <div className="container-contactus">
        <div className="contactInfo">
          <div className="box">
            <div className="icon"><i className="fa fa-map-marker" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Address</h3>
              <p style={{color:"white"}}><b>Vellore Institute of Technology,<br/>Chennai,Tamil Nadu,<br/>624001</b></p>
            </div>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-phone" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Phone</h3>
              <p style={{color:"white"}}><b>+91 6206409201</b></p>
            </div>
          </div>
          <div className="box">
            <div className="icon"><i className="fa fa-envelope" aria-hidden="true"></i></div>
            <div className="text">
              <h3>Email</h3>
              <p style={{color:"white"}}><b>bibliotheca.pvt.ltd@gmail.com</b></p>
            </div>
          </div>
        </div>
        <div className="contactForm" >
          <form ref={form} onSubmit={sendEmail}>
            <h2>Send Mesaage</h2>
            <div className="inputBox">
              <input type="text"  name='from_name' defaultValue={un} readOnly/>
              <span>Full Name</span>
            </div>
            <div className="inputBox">
            <input 
  type="text" 
  name="your_email" 
  defaultValue={email} 
  readOnly 
/>
              <span>Email</span>
            </div>
            <div className="inputBox">
              <input type="number" name="phone"  required/>
              <span>Phone Number</span>
            </div>
            <div className="inputBox">
              <textarea name="message" required/>
              <span>Type your Message...</span>
            </div>
            <div className="inputBox">
            <input type="submit"  value="Send" required />
            </div>
          </form>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  )
};

export default Contact;