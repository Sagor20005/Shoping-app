import React, { useState,  useEffect} from 'react'
import {  useLocation, useNavigate } from 'react-router-dom'
import "./Style/SelectedProduct.css"
import {  Navigation } from "../../ComponentImports"
import Swal from "sweetalert2"

const SelectedProduct = ()=> {
  const shearLogo = "https://img.icons8.com/?size=100&id=7cHip00DTxUL&format=png&color=000000"
  const location = useLocation()
  const Navigate = useNavigate()
  const defaultRendar = location.search === "" ? true: false;
  //const [productData,setProductData] = useState(null)
  const [log, setLog] = useState( {
      isLodding: false,
      error: null
    })
  const [productData,setProductData] = useState(null)
  // what to fetch
  async function conditionForGettingData () {
    if (defaultRendar) {
      setProductData(location.state.productData)
    } else {
      // parse product id
      const id = location.search.replace("?id=", "")
      // getting product data
      setLog((log)=> {
        return {
          ...log, isLodding: true
        }
      })
      let result = await fetch(`${process.env.REACT_APP_API_URL}/product/get/${id}`)
        setLog((log)=> {
          return {
            ...log, isLodding: false
          }
        })
        result = await result.json()
        
        if (result && result.state) {
          setProductData(result.data)
        } else {
          setLog((log)=> {
            return {
              ...log, error: result.msg
            }
          })
        }
    }}
  // call getting conditionForGettingData
  useEffect(()=>{
    conditionForGettingData()
  },[])
  
  // Handle shear 
const handleShear = ()=>{
  const url = `${window.location.href}/?id=${productData._id}`
  navigator.clipboard.writeText(url);
  Swal.fire("Coppid Success!")
}

const handleCart = async ()=> {
  const lsData = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_NAME}`))
  const cartData = {
    productName: productData.name,
    productImage: productData.image.url,
    productPrice: productData.price,
    productId: productData._id,
    castumarId: lsData ? lsData._id : false
  }
  if (/*Object.keys(cartData).every((key)=> cartData[key] ? true: false)*/ cartData.castumarId ) {
  try {
    let result = await fetch(`${process.env.REACT_APP_API_URL}/product/cart/`, {
      method: "post",
      body: JSON.stringify(cartData),
      headers: {
        "content-type": "application/json"
      }
    })
    result = await result.json()
    if (result && result.state) {
      Swal.fire({
        title: "Success!",
        text: "Cart added success!",
        icon: "success"
      })
    } else {
      Swal.fire({
        title: "Error!",
        text: result.msg,
        icon: "error"
      })
    }
  }catch(err) {
    Swal.fire({
      title: "Error!",
      text: err.message,
      icon: "error"
    })
  }
  } else {
    Swal.fire({
      title: "Error!",
      text: "please login First!",
      icon: "error"
    })
  }
}

  // what to rendar
  let content = null
  if (!log.isLodding && !log.error && !productData) {
    // Empty case rendar
    content = <h1>Empty</h1>
  } else if (log.isLodding && !log.error && !productData) {
    // pending case rendar
    content = <h1>Lodding..</h1>
  } else if (!log.isLodding && log.error && !productData) {
    content = <h1>{log.error}</h1>
  } else if (!log.isLodding && !log.error && productData) {
    // fetched and got data case rendar
    const tableItems = ["type",
      "returnDays",
      "discription",
      "warranty"]
    content =
    <div className="selected_product">
      <div className="info">
        <img src={productData.image.url} alt="image" />
      <div className="price_shear">
        <p>
          Jaraz best price <h3>{productData.price}৳</h3>
        </p>
        <img onClick={handleShear} src={shearLogo} alt="img" />
    </div>
    <p className="name">
      {productData.name}
    </p>
    <button onClick={()=>Navigate("/checkout",{state:{productData}})}>Bye Now!</button>
    <button onClick={handleCart}>Add to Cart</button>
  </div>
  <div className="more_info">
    <table>
      <tr>
        <th>Feature</th>
        <th>Deatels</th>
      </tr>
      {
      tableItems.map((item)=> {
        return <><tr>
          <td>{item}:</td>
          <td>{(typeof(productData[item]) === "boolean" ? (productData[item] ? "Yes": "No"): productData[item])}</td>
        </tr></>
      })
      }
    </table>
  </div>
</div>
}



return(
<>
{
<div className="selected_containar">
<Navigation name={productData && (productData.name.length > 30 ? productData.name.slice(0, 30): productData.name) } address={"/"} />
{content}
</div>
}
</>
);
};
export default SelectedProduct;