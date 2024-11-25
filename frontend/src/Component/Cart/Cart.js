import React from 'react'
import {} from 'react-router-dom'
import "./Style/Cart.css"
import {Navigation} from "../../ComponentImports"
import Icons from "../../HelperData/Icons.json"

const Cart = ()=>{
  const cartsData = [
    {name:"man watch hdhd jdjdj hdhdhd dhdh",image:"https://img.drz.lazcdn.com/static/bd/p/ae511f485113b8ac0769ad562485d0d5.jpg_720x720q80.jpg_.webp",price:"444"},
    {name:"man watch hdhd jdjdj hdhdhd dhdh",image:"https://img.drz.lazcdn.com/static/bd/p/ae511f485113b8ac0769ad562485d0d5.jpg_720x720q80.jpg_.webp",price:"444"},
    {name:"man watch hdhd jdjdj hdhdhd dhdh",image:"https://img.drz.lazcdn.com/static/bd/p/ae511f485113b8ac0769ad562485d0d5.jpg_720x720q80.jpg_.webp",price:"444"},
    ]
  return(
    <>
      <Navigation name={"My Cart"} address={"/"}/>
      <div className="cart_containar">
        <div className="cart_list">
          
          
          
          
          
          {
            cartsData.map((product)=>{
              return(
              <div className="cart">
            
                <div className="cart_dtls">
                  <img src={product.image} alt="product"/>
                  <p>{product.name}</p>
                  <h3>{product.price}৳</h3>
                </div>
            
                <div className="cart_options">
                  <div className="count_for_bye">
                    <img src={Icons.plus} alt="plus"/>
                    <h2>2</h2>
                    <img src={Icons.minus} alt="minus"/>
                  </div>
                  <div className="btns">
                    <img src={Icons.delete} alt="delete"/>
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