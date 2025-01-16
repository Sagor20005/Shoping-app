import React,{ useState, useEffect } from 'react'
import {} from 'react-router-dom'
import "./Style/MyOrder.css"
import {Navigation} from "../../ComponentImports"

const MyOrder = ()=>{
  // states 
  const [ ordersObj, setOrder ] = useState({
    isLodding:true,
    isError:false,
    error:null,
    orderList:[]
  })
  
  // request orderList
  useEffect( ()=>{
    async function getOrder(){
    try{
      let result = await fetch(`${process.env.REACT_APP_API_URL}/product/order/${JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))._id}`)
      result = await result.json()
      console.log(result)
      if(result && result.state){
        setOrder((previus)=>{
        return{
          ...previus,orderList:result.data,isLodding:false
        }
      })
      }else{
        setOrder((previus)=>{
        return{
          ...previus,isError:true,error:result.msg,isLodding:false
        }
      })
      }
    }catch(err){
      setOrder((previus)=>{
        return{
          ...previus,isError:true,error:err.message,isLodding:false
        }
      })
    }
  }
  getOrder()
  },[])
  
  // what to rendar 
  let content = ""
  if(ordersObj.isLodding){
    content= <h2 className="alertText">Lodding...</h2>
  }else if(!ordersObj.isLodding && ordersObj.isError && ordersObj.error){
    content=<h2 className="alertText">{ordersObj.error}</h2>
  }else if(!ordersObj.isLodding && !ordersObj.isError && ordersObj.orderList){
    content = <>
      {
        ordersObj.orderList.map((order)=>{
          return <div key={order._id}>
            <h4>{order.product.name.length > 60 ? order.product.name.slice(0,60) : order.product.name }</h4>
            <p>{order.product.type}</p>
          </div>
        })
      }
    </>
  }
  
  
  return(
    <>
    <Navigation name={"My Order"} address={"/account"}/>
    <div className="myOrderContainar">
      {content}
    </div>
    </>
    );
};
export default MyOrder;