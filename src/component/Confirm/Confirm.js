import React, { useState, useEffect } from 'react';
import './Confirm.css';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Confirm = () => {
  const [days, setDays] = useState('');
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    function getDateSevenDaysFromNow() {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 7);
      const day = currentDate.getDate();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const monthName = monthNames[currentDate.getMonth()];
      setDays(`${day} ${monthName}`);
    }

    getDateSevenDaysFromNow();
    toast("Order confirmed....");

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          navigate('/mainpage');
        }
        return prevCountdown - 1;
      });
    }, 800);

    return () => clearInterval(timer); 
  }, [navigate]);

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="loading">
        <svg xmlns="http://www.w3.org/2000/svg" width="124" height="124" viewBox="0 0 124 124">
          <circle className="circle-loading" cx="62" cy="62" r="59" fill="none" stroke="hsl(271, 76%, 74%)" stroke-width="6px"></circle>
          <circle className="circle" cx="62" cy="62" r="59" fill="none" stroke="hsl(271, 76%, 53%)" stroke-width="6px" stroke-linecap="round"></circle>
          <polyline className="check" points="73.56 48.63 57.88 72.69 49.38 62" fill="none" stroke="hsl(271, 76%, 53%)" stroke-width="6px" stroke-linecap="round"></polyline>
        </svg>
      </div>
      <div id='oConf'>
        <h4>Order Confirmed!</h4>
        <h2>Thanks for shopping with bibliotheca....</h2>
        <h3>Delivered by: {days}</h3>
        <h3>Redirecting to home page in {countdown} seconds...</h3>
      </div>
      <Footer />
    </>
  );
};

export default Confirm;
