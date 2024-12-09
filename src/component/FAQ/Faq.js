import "./Faq.css";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const Faq = () => {
    
    const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "You can return any item within 30 days of purchase. The item must be in its original condition and packaging."
    },
    {
      question: "How do I track my order?",
      answer: "You can track your order using the tracking number provided in the shipping confirmation email."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping fees and delivery times may vary based on the destination."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, Net Banking, and Cash on Delivery."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can contact our customer service via email at bibliotheca.pvt.ltd@gmail.com or call us at +91 7766903456."
    }
  ];

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
<>
<Navbar/>
<ToastContainer />

  <div className="faq-container">
    <h1>Frequently Asked Questions</h1>
    {faqs.map((faq, index) => (
      <div key={index} className="faq">
        <div className="faq-question" onClick={() => toggleFAQ(index)}>
          {faq.question}
          <span>{activeIndex === index ? '-' : '+'}</span>
        </div>
        <div className={`faq-answer ${activeIndex === index ? 'active' : ''}`}>
          {faq.answer}
        </div>
      </div>
    ))}
  </div>
  <Footer/>
</>

  );
};

export default Faq;
