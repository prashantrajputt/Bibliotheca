import "./Delivery.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const Delivery = () => {
    const location = useLocation();
    const data = location.state;

    const pq = parseInt(localStorage.getItem("pQuant"), 10) || 1;
    const add = localStorage.getItem("address");
    const email = localStorage.getItem("email");
    const mob= localStorage.getItem("ph");
    const un= localStorage.getItem("UserName");

    const navigate=useNavigate();

    const codRef = useRef(null);
    const codRe = useRef(null);


    const address = () => {
        toast("This payment option is not available for this product...");
    }

    const handleRemove = async (id) => {
        try {
            await axios.put(`https://bibliotheca-backend.onrender.com/api/remove-product/${email}/${id}`);
        } catch (error) {
            console.log(error);
        }
    };

    


const loadScript=(src)=>{
    return new Promise((resolve)=>{
        const script=document.createElement('script');
        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

const onPayment = async (Price, id) => {

    try {
      const scriptLoaded = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  
      if (!scriptLoaded) {
        toast("Razorpay SDK failed to load. Please check your internet connection.");
        return;
      }
  
      const options = {
        id: 1,
        Price: Price, // Price in paise
      };
  
      const res = await axios.post('https://bibliotheca-backend.onrender.com/api/createOrder', options);
      const data = res.data;
  
      if (!data || !data.id) {
        console.log("Order creation failed");
        toast("Order creation failed. Please try again.");
        return;
      }
  
      console.log(data);
  
      const paymentObject = new window.Razorpay({
        key: "rzp_live_75WzkMyHZxVan1", 
        order_id: data.id, 
        amount: data.amount, 
        currency: data.currency, 
        name: "Bibliotheca", 
        description: "Order Payment",
        handler: function (response) {
          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
  
          axios.post('https://bibliotheca-backend.onrender.com/api/verifyPayment', options2)
            .then((res) => {
              console.log(res.data);
              if (res?.data?.success) {
                alert("Payment Success...");
                axios.put(`https://bibliotheca-backend.onrender.com/api/buy-product/${email}/${id}/${pq}`)
                .then(() => {
                 handleRemove(id);
                navigate("/confirmed");
                })
            .catch((error) => {
              console.log(error);
            });
              } else {
                alert("Payment Failed...");
              }
            })
            .catch((err) => {
              console.log(err);
              toast("Verification failed. Please try again.");
            });
        },
        prefill: {
          name: un, 
          email: email, 
          contact: mob, 
        },
        theme: {
          color: "#61dafb", 
        },
      });
  
      paymentObject.open(); 
    } catch (error) {
      console.log("Payment error:", error);
      toast("Payment failed. Please try again.");
    }
  };


  const Confirm = async(p,id) => {
    if(codRe.current && codRe.current.checked)
    {
        onPayment(p,id);
    }
    else if (codRef.current && codRef.current.checked) {
        try {
            await axios.put(`https://bibliotheca-backend.onrender.com/api/buy-product/${email}/${id}/${pq}`);
        } catch (error) {
            console.log(error);
        }
        handleRemove(id);
        navigate("/confirmed")
    } else {
        toast("Please select a payment option....");
    }
}
  

/*const onPayment=async(Price,Name)=>{
    try{
        const options={
            id:1,
            Price:10,
        }
        const res=await axios.post('http://localhost:8080/api/createOrder',options)
        const data=res.data;
        console.log(data)



        const paymentObject=new window.Razorpay({
            key:"rzp_live_75WzkMyHZxVan1",
            order_id:data.id,
            ...data,
            handler: function(response)
            {
                console.log(response);

                const options2={
                    order_id:response.razorpay_order_id,
                    payment_id:response.razorpay_payment_id,
                    signature: response.razorpay_signature,
                }

                axios.post('http://localhost:8080/api/verifyPayment',options2).then((res)=>{
                    console.log(res.data);
                    if(res?.data?.success)
                    {
                        alert("Payment Success...")
                    }
                    else{
                        alert("Payment Failed...")
                    }
                }
                ).catch((err)=>{
                    console.log(err);
                })
                paymentObject.open()
            }
        })
    }catch(error){
        console.log(error)
    }
}


useEffect(()=>{
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
},[])
*/
    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="containerO">
                <div className="main-contentO">
                    <div className="stepO" id="choose-addressO">
                        <hr />
                        <h2>Step 1 | Choose Address</h2>
                        <button className="address-btnO" onClick={() => { toast("To change the details go to profile section...") }}>{add}</button>
                        <button className="add-address-btnO" onClick={() => { toast("To change the details go to profile section...") }}>+ update address</button>
                    </div>

                    <div className="stepO" id="order-summaryO">
                        <hr />
                        <h2>Step 2 | Order Summary</h2>
                        <div className="order-detailsO">
                            <div className="image-sectionO">
                                <div className="thumbnail-aO">
                                    <img className="thumbnailO" src={data.Img} alt="product" />
                                </div>
                            </div>
                            <div className="details-sectionO">
                                <h1 className="product-nameO">{data.Name}</h1>
                                <h4>{data.author}</h4>
                                <div className="priceO">
                                    <span className="original-priceO">₹{data.Price}</span>
                                    <span className="discount-priceO">₹{parseInt(0.7 * data.Price)}</span>
                                    <span className="discountO">30% off</span>
                                </div>
                                <div className="quantity-sectionO">
                                    <div className="quantityO">
                                        <b>Total Quantity: {pq}</b>
                                    </div>
                                    <p>&emsp;<b>Delivery by Thu Jun 6</b></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="stepO" id="payment-optionsO">
                        <hr />
                        <h2>Step 3 | Payment Options</h2>
                        <div className="payment-optionO">
                            <input type="radio" id="upiO" name="payment" value="upi" ref={codRe} />
                            <label htmlFor="upiO"  style={{ cursor: "pointer" }}>Online Payment</label>
                        </div>
                        
                        <div className="payment-optionO">
                            <input type="radio" id="codO" name="payment" value="cod" ref={codRef} />
                            <label htmlFor="codO" style={{ cursor: "pointer" }}>Cash on Delivery</label>
                        </div>
                    </div>
                </div>

                <div className="price-detailsO">
                    <h2>Price Details</h2>
                    <div className="price-itemO">
                        <span>Price (1 item)</span>
                        <span>₹{parseInt(0.7 * data.Price)}</span>
                    </div>
                    <div className="price-itemO">
                        <span>Delivery Charges</span>
                        <span>₹40 <span className="free"></span></span>
                    </div>
                    <hr />
                    <div className="price-item totalO">
                        <span>Total Payable :&emsp;</span>
                        <span>₹{parseInt(0.7 * data.Price) * pq + 40} (total : {pq} items)</span>
                    </div>
                        <button className="pay-btnO" onClick={()=>{Confirm(parseInt(0.7 * data.Price) * pq + 40,data.id)}}>Place Order</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Delivery;
