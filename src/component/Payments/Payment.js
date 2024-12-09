const { default: axios } = require("axios");
const { useEffect } = require("react");

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

const onPayment=async(Price,Name)=>{
    try{
        const options={
            id:1,
            Price:Price,
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