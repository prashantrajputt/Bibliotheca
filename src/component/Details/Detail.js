import "./Detail.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text1">
      {isReadMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className="read-or-hide1" style={{ color: "red" }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Detail = () => {
  const location = useLocation();
  const data = location.state;
  const q=localStorage.getItem("quant");
  const [quantities, setQuantities] = useState({ [data.id]: parseInt(q) });
  const email=localStorage.getItem("email")
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getUserDetail = async () => {
      setLoading(true);
      try {
        //toast("Welcome...")
        const { data } = await axios.get(`https://bibliotheca-backend.onrender.com/api/all/`);
        setProduct(data);
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getUserDetail();

  }, []);

  const handleIncrease = async(id) => {
    if(quantities[id]<=product[id].initialAvl-q-2){
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.min((prevQuantities[id] || 0) + 1)
    }));
    try {
      if(quantities[id]===0)
      {
        toast("Product added to basket....")
        await axios.put(`https://bibliotheca-backend.onrender.com/api/add-product/${email}/${id}`)
      }
      else{
        //alert(quantities[id])
      await axios.put(`https://bibliotheca-backend.onrender.com/api/update-quantity/${email}/${id}`);
      }
      await axios.put(`https://bibliotheca-backend.onrender.com/api/increase-amount/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  else{
    toast("Product out of stock")
  }
  };

  const handleDecrease =async (id) => {
    if (quantities[id] > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: prevQuantities[id] - 1
      }));
    

    try {
      await axios.put(`https://bibliotheca-backend.onrender.com/api/dec-quantity/${email}/${id}`);
      await axios.put(`https://bibliotheca-backend.onrender.com/api/decrease-amount/${id}`);
    } catch (error) {
      console.log(error);
    }
  }
  else
  {
    toast("You have not added the product")
  }
  };

  const Pin=()=>{
    let a= document.getElementById("pin").value;
    //alert(a)
    if(a.length===6)
    {
      toast("Delivery available for this pincode....");
    }
    else{
      toast("Delivery is not available for this pincode....");
    }
  }
  const navigate = useNavigate();


  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="container2">
        <div className="image-section5">
          <div className="thumbnail-a5">
            <img className="thumbnail5" src={data.Img} alt={data.Name} />
          </div>
        </div>
        <div className="details-section">
          <h1 className="product-name">{data.Name}</h1>
          <h4 style={{ color: "white" }}>{data.author}</h4>
          <div className="price">
            <span className="discount-price">₹{parseInt(0.7 * data.Price)}</span>
            <span className="original-price">₹{data.Price}</span>
            <span className="discount">30% off</span>
          </div>
          <p className="stock">In stock: Dispatch in 5 working days</p>
          <p>Stock Left: {data.initialAvl}</p>

          <div className="quantity">
            <button onClick={() => handleDecrease(data.id)}>-</button>
            <span>{quantities[data.id]}</span>
            <button onClick={() => handleIncrease(data.id)}>+</button>
          </div>
          <button
      className="button-buy"
      onClick={() => {
        if (quantities[data.id] > 0) {
          localStorage.setItem("pQuant", JSON.stringify(quantities[data.id]));
          navigate("/order", { state: data }); 
        } else {
          toast("You have not added any product...."); 
        }
      }}
    >
      Buy Now
    </button>
          <div className="delivery">
            <span>Eligible for Delivery?</span>
            <p>
              Enter pincode:&emsp;<input type="number" id="pin" /> <button id="a1" onClick={Pin} >Check</button>
            </p>
            <p>Get it by 4th June</p>
          </div>
          <br />
    
        </div>
      </div>
      <div className="description2">
        <h1>Product Description</h1>
        <h2 style={{ color: "yellow" }}>{data.Name}</h2>
        <ReadMore>{data.caption}</ReadMore>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
