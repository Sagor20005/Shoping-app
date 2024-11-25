import React,{useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import "./Style/HomeContent.css"
import {useSelector,useDispatch} from "react-redux"
import {getProducts} from "../../Feature/Product/ProductSlice"
import AOS from 'aos';
import 'aos/dist/aos.css';

import getAosAnimation from "../../Utilities/getAosAnimation"


const HomeContent = ()=>{
  const Navigate = useNavigate()
  const {products,isLodding,isError,error} = useSelector((state)=>state.product)
  const dispatch = useDispatch()
  
  // initialize aos 
  useEffect(()=>{
    dispatch(getProducts())
    AOS.init()
  },[dispatch])
  
  
  // what to rendar in empty or error case
  let content;
  if(products.length === 0 && !isLodding && !isError){
    content = <h3 className="empty_error">not find product..</h3>
  }else if(isLodding && !isError){
    content = <h3 className="empty_error">Searching....</h3>
  }else if(isError){
    content = <h3 className="empty_error">{error}..</h3>
  }
  
  
  return(
    <>
      {
        <div className="content_containar">
          <h3>Product:</h3>
          

          
          <div className="product_list" >
            
            {content}
            {
              products.map((product)=>{
              const anName = getAosAnimation()
                return(
                <div data-aos={anName} onClick={()=>Navigate("/selected-product",{state:{productData:product}})} className="product">
                  <div className="image">
                    <img src={product.image.url} alt={product.type}/>
                  </div>
                  <div className="product_info">
                    <p>{product.name.length > 30 ? product.name.slice(0,31)+"..." : product.name }</p>
                    <h3>{product.price}৳</h3>
                  </div>
                </div>
                )
              })
            }
            
            
          </div>
        </div>
      }
    </>
    );
};
export default HomeContent;