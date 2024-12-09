import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text" style={{ display: "none" }}>
      {isReadMore ? text.slice(0, 100) : text}
      <span onClick={toggleReadMore} className="read-or-hide" style={{ color: "red" }}>
        {isReadMore ? "...read more" : " show less"}
      </span>
    </p>
  );
};

const Firstpage = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [product, setProduct] = useState([]);
  const [quantities, setQuantities] = useState({});
  const email=localStorage.getItem("email");
  const [user, setUser] = useState([]);

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
    const getDetail = async () => {
      setLoading(true);
      try {
        const {data}=await axios.get(`https://bibliotheca-backend.onrender.com/api/details/${email}`);
			  setUser(data);
        
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getDetail();
  }, []);
 // alert(user)
 localStorage.setItem("UserName",user.Name);
localStorage.setItem("address",user.address)


  const handleAddToCart = async(id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: (prevQuantities[id] || 0) + 1
    }));
    try {
      toast("Product added to basket....")
      await axios.put(`https://bibliotheca-backend.onrender.com/api/add-product/${email}/${id}`)
      await axios.put(`https://bibliotheca-backend.onrender.com/api/increase-amount/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIncrease = async(id) => {
    if(quantities[id]!=product[id].initialAvl){
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: Math.min((prevQuantities[id] || 0) + 1)
    }));
    try {
      await axios.put(`https://bibliotheca-backend.onrender.com/api/update-quantity/${email}/${id}`);
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


  const handle=async()=>{
    const tk= await localStorage.getItem('token')
   if(!tk)
   {
       toast('Please! Login First to add the items...')
   }
}

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books..."
        />
        <button className="search-button">Search</button>
      </div>

      <div id="pCard">
        {loading ? (
          <Loader />
        ) : (
          product &&
          product
            .filter((book) => {
              return search.toLowerCase() === ''
                ? book
                : book?.Name.toLowerCase().includes(search.toLowerCase()) ||
                  book?.author.toLowerCase().includes(search.toLowerCase()) ||
                  book?.caption.toLowerCase().includes(search.toLowerCase());
            })
            .map((book, index) => (
              <div id="cCard" key={book.id} onMouseEnter={() => Show(index)} onMouseLeave={() => Hide(index)}>
                <span id="br"></span>
                <div id="Details">
                  <img id="bookImg" src={book.Img} alt={book.Name} />
                  <div id="bDetails">
                    <Link style={{ textDecoration: "none" }} to="/details" state={book}>
                      <h2 onClick={()=>{localStorage.setItem("quant",0)}}>{book.Name}</h2>
                    </Link>
                    <h4>{book.author}</h4>
                    <ReadMore id="desc">{book.caption}</ReadMore>
                  </div>
                  <div id="purchase">
                    {book.initialAvl <= 0 ? (
                      <h3 className="out-of-stock">Out of stock</h3>
                    ) : (
                      <>
                        <h3 className="available">
                          Available: {book.initialAvl - (quantities[book.id] || 0)}
                        </h3>
                        <br />
                        {quantities[book.id] > 0 ? (

                          <div className="quantity-container" id="atc">
                            <button className="quantity-button" onClick={() => handleDecrease(book.id)}>-</button>
                            <span value={quantities[book.id]} id="quant">
                             {quantities[book.id]>0?quantities[book.id]:0}
                            </span>
                            <button
                              className="quantity-button"
                              onClick={() => handleIncrease(book.id)}
                            >
                              +
                            </button>
                          </div>):(
                        <button className="add-button" onClick={handle}>
                          <i className="fa fa-cart-arrow-down" aria-hidden="true"></i> Add
                        </button>
                      )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Firstpage;

function Show(i) {
  const details = document.querySelectorAll("#bDetails")[i];
  const text = document.querySelectorAll(".text")[i];
  const bookImg = document.querySelectorAll("#bookImg")[i];
  const card = document.querySelectorAll("#cCard")[i];

  if (window.innerWidth >= 670) {
    details.style.marginTop = "-2rem";
    bookImg.style.width = "19%";
    bookImg.style.height = "10%";
    bookImg.style.marginLeft = "0rem";
    card.style.height = "fit-content";
    text.style.display = "flex";
  } else {
    text.style.display = "none";
  }
}

function Hide(i) {
  const details = document.querySelectorAll("#bDetails")[i];
  const text = document.querySelectorAll(".text")[i];
  const bookImg = document.querySelectorAll("#bookImg")[i];

  if (window.innerWidth >= 670) {
    details.style.marginTop = "2rem";
    text.style.display = "none";
    bookImg.style.width = "190px";
    bookImg.style.height = "185px";
  }
}
