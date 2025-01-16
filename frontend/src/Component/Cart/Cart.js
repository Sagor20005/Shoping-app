import React,{useEffect,useRef} from 'react'
import {} from 'react-router-dom'
import "./Style/Cart.css"
import Swal from "sweetalert2"
import {Navigation} from "../../ComponentImports"
import Icons from "../../HelperData/Icons.json"
import {useSelector,useDispatch} from "react-redux"
import {getCarts, incriment, dicrement, deleteACart} from "../../Feature/Product/CartSlice"

const Cart = ()=>{
  const {carts, isError, isLodding, error} = useSelector((state)=>state.cart)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCarts())
  },[])
  
  
  const handleQantity = async (id,quantity,action)=>{
    let result = await fetch(`${process.env.REACT_APP_API_URL}/product/cart`,{
      method:"put",
      body:JSON.stringify({id,action,quantity}),
      headers:{
        "content-type":"application/json"
      }
    })
    result = await result.json()
    if(result && result.state){
      if(action === "increase"){
        dispatch(incriment(id))
      }else{
        dispatch(dicrement(id))
      }
    }else{
      
    }
  }
   const handleDelete = async (id)=>{
     if(id){
       try{
        let result = await fetch(`${process.env.REACT_APP_API_URL}/product/cart`,{
          method:"delete",
          body:JSON.stringify({id}),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json()
        if(result && result.state){
          dispatch(deleteACart(id))
        }else{
          Swal.fire({
            title:"Delete",
            text:"delete success!",
            icon:"success"
          })
        }
       }catch(err){
         console.log(err)
       }
     }
   }
  
  return(
    <>
      <Navigation name={"My Cart"} address={"/"}/>
      <div className="cart_containar">
        <div className="cart_list">
           {
            carts.length > 0 && carts.map((product)=>{
              return(
              <div className="cart">
            
                <div className="cart_dtls">
                  <img src={product.productImage} alt="product"/>
                  <p>{product.productName}</p>
                  <h3>{product.productPrice}৳</h3>
                </div>
            
                <div className="cart_options">
                  <div className="count_for_bye">
                    <img onClick={()=>handleQantity(product._id,product.quantity,"increase")} src={Icons.plus} alt="plus"/>
                    <h4>{product.quantity}</h4>
                    <img onClick={()=>handleQantity(product._id,product.quantity,"decrease")} src={Icons.minus} alt="minus"/>
                  </div>
                  <div className="btns">
                    <img onClick={()=>handleDelete(product._id)} src={Icons.delete} alt="delete"/>
                    <img src={Icons.buy} alt="bue"/>
                  </div>
                </div>
            
              </div>
              )
            })
          }
          
          
          
        </div>
      </div>
    </>
    );
};
export default Cart;