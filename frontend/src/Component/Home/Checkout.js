import React, {
  useState,
  useRef
} from "react";
import {
  useLocation,
  useNavigate
} from "react-router-dom"
import Swal from "sweetalert2"

const Checkout = () => {
  const [paymentMethod,
    setPaymentMethod] = useState("Hand Cash");
  //const [Castumaraddress,setAddress] = useState(null)
  const location = useLocation()
  const Navigate = useNavigate()
  const Data = location.state.productData

  const addressElement = useRef()
  // console.log(addressElement.current ? "ok" : "not ok")


  // cheak address boon in ls
  const LocalData = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
  const addresses = LocalData.addressBook ? LocalData.addressBook: [];

  // byeNow handler
  const byeNowHandler = async ()=> {
    let orderObj = {
      product: {
        id: Data._id,
        name: Data.name,
        type: Data.type
      },
      castumar: {
        name: LocalData.name,
        id: LocalData._id,
        CastumarAddress: addressElement.current ? addressElement.current.value: null,
        paymentMethod,
        paid: false,
      }
    }
    try {
      if (orderObj.castumar.CastumarAddress) {
        if (paymentMethod === "Hand Cash") {
          let result = await fetch(`${process.env.REACT_APP_API_URL}/product/order`, {
            method: "post",
            body: JSON.stringify(orderObj),
            headers: {
              "content-type": "application/json"
            }
          })
          result = await result.json()
          if (result && result.state) {
            Navigate("/")
          } else {
            Swal.fire({
              title: "Faild",
              text: result.message,
              icon: "error"
            })
          }
        } else {
          Swal.fire({
            title: "Cant order place!",
            text: "nogod or bkash feature not work!",
            icon: "error"
          })
        }
      }else{
        Swal.fire({
          title:"Not Found!",
          text:"please select an address!",
          icon:"error"
        })
      }
    }catch(err) {
      console.log(err)
    }
  }

  // addressHandler-
  // const addressHandler = (e)=>{
  //   setAddress(e.target.value)
  // }

  return (
    <div style={ { fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h2 style={ { textAlign: "center" }}>Checkout</h2>
      <div style={ { marginBottom: "20px" }}>
        <h4>Address</h4>
        {
        addresses.length === 0 ?
        <button
          style={ {
            height: "40px",
            width: "100%",
            color: "white",
            backgroundColor: "#a49c6d",
            borderRadius: "10px",
            border: "none",
            marginTop: "10px"
          }}
          onClick={()=>Navigate("/addressbook")}
          >Add Address!</button>:
        <select
          style={ {
            backgroundColor: "#a49c6d",
            height: "40px",
            width: "100%",
            color: "white",
            outline: "none",
            borderRadius: "10px",
            marginTop: "10px",
            padding: "0 10px"
          }}
          ref={addressElement}

          value={addresses[0].state+","+addresses[0].distic+","+addresses[0].union+" ("+addresses[0].more+")"}
          >
          {
          addresses.map((address)=> {
            return (
              <option>{address.state}-{address.distic}-{address.union} {address.more && `( ${address.more} )`}</option>
            )
          })
          }
        </select>
        }
      </div>

      <div style={ { marginBottom: "20px" }}>
        <h4>Payment Method</h4>
        <div>
          <label>
            <input
            type="radio"
            value="Hand Cash"
            checked={paymentMethod === "Hand Cash"}
            onChange={() => setPaymentMethod("Hand Cash")}
            />
          Hand Cash
        </label>
      </div>
      <div>
        <label>
          <input
          type="radio"
          value="Nagod"
          checked={paymentMethod === "Nagod"}
          onChange={() => setPaymentMethod("Nagod")}
          />
        Nagod
      </label>
    </div>
    <div>
      <label>
        <input
        type="radio"
        value="Bkash"
        checked={paymentMethod === "Bkash"}
        onChange={() => setPaymentMethod("Bkash")}
        />
      Bkash
    </label>
  </div>
</div>

<div style={ { marginBottom: "20px" }}>
  <h4>Shopping Bill</h4>
  <div style={ { display: "flex", justifyContent: "space-between" }}>
    <span>{Data.type}</span>
    <span>{Data.price}৳</span>
  </div>
  <hr />
<div style={ { display: "flex", justifyContent: "space-between", marginTop: "10px", fontWeight: "bold" }}>
  <span>Total</span>
  <span>{Data.price}৳</span>
</div>
</div>

<button
style={ {
backgroundColor: "#a49c6d",
color: "white",
border: "none",
borderRadius: "10px",
padding: "10px 20px",
width: "100%",
cursor: "pointer",
}}
onClick={byeNowHandler}
>
Bye Now
</button>
</div>
);
};

export default Checkout;