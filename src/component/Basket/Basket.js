import "./Basket.css";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReadMore = ({ children }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text" style={{ display: "block" }}>
      {isReadMore ? children.slice(0, 100) : children}
      <span onClick={toggleReadMore} className="read-or-hide" style={{ color: "red" }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Basket = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const email = localStorage.getItem("email");

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

  const handleRemove = async (id, quantity) => {
    try {
      await axios.put(`https://bibliotheca-backend.onrender.com/api/remove-product/${email}/${id}`);
      await axios.put(`https://bibliotheca-backend.onrender.com/api/add-remove-product/${id}/${quantity}`);
      setUser(prevUser => ({
        ...prevUser,
        Basket: prevUser.Basket.filter(item => item !== id),
        purchaseQuantity: prevUser.purchaseQuantity.filter((_, index) => index !== prevUser.Basket.indexOf(id))
      }));
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };


  const isAllZeros = (array) => array && array.every(value => value === 0);
  window.onload=()=>{
    toast("Product removed from basket....")
  }

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div id="pCard">
        <br />
        {loading ? (
          <Loader />
        ) : user && user.Basket && (user.Basket.length === 0 || isAllZeros(user.purchaseQuantity)) ? (
          <>
          <h1 style={{ color: "white" }}>Nothing in the basket.....</h1>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          </>
        ) : (
          user &&
          user.Basket &&
          user.Basket.map((ind, index) => (
            user.purchaseQuantity[index] !== 0 && (
              <div id="cCard" key={products[ind].id}>
                <span id="br"></span>
                <div id="Details">
                  <img id="bookImg" src={products[ind].Img} alt={products[ind].Name} />
                  <div id="bDetails">
                    <br />
                    <Link style={{ textDecoration: "none" }} to="/details" state={products[ind]}>
                      <h2 onClick={() => localStorage.setItem("quant", JSON.stringify(user.purchaseQuantity[index]))}>
                        {products[ind].Name}
                      </h2> 
                    </Link>
                    <h4>{products[ind].author}</h4>
                  </div>
                  <div id="Bpurchase">
                    <h3>Quantity: {user.purchaseQuantity[index]}</h3>
                    <br />
                    <Link to="/details" state={products[ind]}>
                      <button className="add-button" onClick={() => localStorage.setItem("quant", JSON.stringify(user.purchaseQuantity[index]))}>
                        <i className="fa fa-shopping-bag" aria-hidden="true"></i> Buy
                      </button>
                    </Link>
                    <br/><br/>
                    <button className="add-button" onClick={() => handleRemove(products[ind].id, user.purchaseQuantity[index])}>
                      <i className="fa fa-times" aria-hidden="true"></i>Cancel
                    </button>
                  </div>
                </div>
              </div>
            )
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Basket;
