import React from 'react'
import {useLocation} from 'react-router-dom'
import "./Style/SelectedProduct.css"
import {Navigation} from "../../ComponentImports"
import Swal from "sweetalert2"

const SelectedProduct = ()=>{
  const location = useLocation()
  const productData = location.state.productData
  const shearLogo ="https://img.icons8.com/?size=100&id=7cHip00DTxUL&format=png&color=000000"
  
  const handleCart = async ()=>{
    const cartData = {
      productName: productData.name,
      productImage: productData.image.url,
      productId: productData._id,
      castumarId: JSON.parse(localStorage.getItem(`${process.env.REACT_APP_NAME}`))._id
    }
    console.log(cartData)
    if(Object.keys(cartData).every((key)=> cartData[key] ? true : false)){
      try{
        let result = await fetch(`${process.env.REACT_APP_API_URL}/product/cart/`,{
          method:"post",
          body:JSON.stringify(cartData),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json()
        if(result && result.state){
          Swal.fire({
            title:"Success!",
            text:"Cart added success!",
            icon:"success"
          })
        }else{
          Swal.fire({
            title:"Error!",
            text:result.msg,
            icon:"error"
          })
        }
      }catch(err){
        Swal.fire({
          title:"Error!",
          text:err.message,
          icon:"error"
        })
      }
    }else{
      Swal.fire({
            title:"Error!",
            text:"please login First!",
            icon:"error"
          })
    }
  }
  
  return(
    <>
      {
        <div className="selected_containar">
          <Navigation name={productData.name.length > 30 ? productData.name.slice(0,30) : productData.name} address={"/"} />
          <div className="selected_product">
            
            <div className="info">
              <img src={productData.image.url} alt="img"/>
              <div className="price_shear">
                <p>Jaraz best price <h3>{productData.price}৳</h3></p>
                <img src={shearLogo} alt="img"/>
              </div>
              <p className="name">{productData.name}</p>
              <button>Bye Now!</button>
              <button onClick={handleCart}>Add to Cart!</button>
            </div>
            
            <div className="more_info">
              
              <table>
                <theade>
                  <tr>
                    <th>Feature</th>
                    <th>deatels</th>
                  </tr>
                </theade>
                <tbody>
                  <tr>
                    <td>type</td>
                    <td>{productData.type}</td>
                  </tr>
                  <tr>
                    <td>return</td>
                    <td>{productData.returnDays}</td>
                  </tr>
                  <tr>
                    <td>discrib</td>
                    <td>{productData.discription}</td>
                  </tr>
                  <tr>
                    <td>Warranty</td>
                    <td>{productData.warranty ? "yes" : "no"}</td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            
          </div>
        </div>
      }
    </>
    );
};
export default SelectedProduct;