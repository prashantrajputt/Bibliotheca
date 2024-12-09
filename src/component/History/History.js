import "./History.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const email = localStorage.getItem("email");
    const un = localStorage.getItem("UserName");

    const getUserDetail = async () => {
        try {
            const { data } = await axios.get(`https://bibliotheca-backend.onrender.com/api/details/${email}`);
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const getProducts = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`https://bibliotheca-backend.onrender.com/api/all/`);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getUserDetail();
        getProducts();
    }, [email]);

    return (
        <>
            <Navbar />
            <ToastContainer />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="order-history">
                        <div className="container1">
                            <div className="sidebar1">
                                <div className="profile1">
                                    <div className="avatar1"></div>
                                    <p>Hello, {un}</p>
                                </div>
                                <div className="menu1">
                                    <Link to="/mainpage"><button>Home</button></Link>
                                    <Link to="/orderhistory"><button>My Orders</button></Link>
                                    <Link to="/yourbasket"><button>Basket</button></Link>
                                    <Link id="Sbtn"><button>Coupons</button></Link>
                                    <Link to="/"><button>Logout</button></Link>
                                </div>
                            </div>
                        </div>

                        <div className="orders">
                            <p className="heading" style={{ textAlign: "center", color: "white" }}>My Order History</p>
                            {user && user.Buy && user.Buy.length === 0 ? (
                                <h1 style={{ color: "white" }}>Nothing in the basket.....</h1>
                            ) : (
                                user &&
                                user.Buy &&
                                user.Buy.map((ind, index) => (
                                    <div className="order" key={products[ind].id}>
                                        <div className="order-info">
                                            <div className="order-details">
                                                <div className="image-section">
                                                    <div className="thumbnail-a">
                                                        <img className="thumbnail" src={products[ind].Img} alt="Product" />
                                                    </div>
                                                </div>
                                                <div className="details-section">
                                                    <h1 className="product-name">{products[ind].Name}</h1>
                                                    <h4>{products[ind].author}</h4>
                                                    <div className="price">
                                                        <span className="original-price">₹{products[ind].Price}</span>
                                                        <span className="price-itemO">₹{parseInt(0.7 * products[ind].Price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p>Order Confirmed and will be delivered to you soon.</p>
                                        </div>
                                        <FeedbackSection />
                                        <div className="order-summary">
                                            <h3>Order Summary</h3>
                                            <p>Total Items: {user.buyQuantity[index]}</p>
                                            <p>Total Price: ₹{parseInt(0.7 * products[ind].Price) * user.buyQuantity[index] + 40}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}
            
        </>
    );
};

const FeedbackSection = () => {
    const [rating, setRating] = useState(0);

    const handleRating = (rate) => {
        setRating(rate);
        toast("Thanks for rating....")
    };

    return (
        <div className="feedback">
            <StarRating rating={rating} handleRating={handleRating} />
            <textarea className="feedback-area" id="feedback-text" placeholder="Write your feedback here..."></textarea>
            <button onClick={() => {
                const feedbackText = document.getElementById("feedback-text").value;
                feedbackText.length > 0 ? toast("Thanks for your feedback") : toast("Please fill in the feedback first...");
            }} className="feedback-button">Give Feedback</button>
        </div>
    );
};

const StarRating = ({ rating, handleRating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`star ${ratingValue <= rating ? 'filled' : ''}`}
                        onClick={() => handleRating(ratingValue)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default History;
