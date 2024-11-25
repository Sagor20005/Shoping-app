import React from 'react'
import {useNavigate} from 'react-router-dom'
import "../Auth/Style/Form.css"
import Swal from "sweetalert2"


const AddProduct = ()=>{
  const Navigate = useNavigate()
  
  const Submit = async (e)=>{
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append("sellarId",JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))._id)
    formData.append("sellarName",JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))._name)
    formData.delete("warranty")
    formData.append("warranty",e.target.warranty.checked)
    try{
      let result = await fetch(process.env.REACT_APP_API_URL + "/product/",{
        method:"post",
        body:formData
      })
      result = await result.json()
      if(result.state){
        Navigate("/")
      }else{
        Swal.fire({
          title:"Error!",
          text:result.msg,
          icon:"error"
        })
      }
    }catch(err){
      console.log(err)
      Swal.fire({
        title:"Error!",
        text:err.message,
        icon:"error"
      })
    }
    
  }
  
  return(
    <>
      <div className="form_containar">
        <h1>Add Product</h1>
        <form onSubmit={(e)=>Submit(e)}>
          <input type="text" placeholder="Enter product name" name="name"/>
          <input type="number" placeholder="Enter product price" name="price"/>
          <input type="text" placeholder="Enter product Discription" name="discription"/>
          <input type="text" placeholder="Enter return days" name="returnDays"/>
          <input className="type_file" type="file" name="file"/>
          <div className="inline">
            <input id="warranty" className="type_checkbox" type="checkbox" name="warranty"/>
            <label htmlFor="warranty" >warranty</label>
          </div>
          <select name="type">
            <option value="">Choose Type</option>
            <option value="t-shirt">T-shirt</option>
            <option value="plug">plug</option>
          </select>
          
          <button type="submit" >Submit</button>
        </form>
      </div>
    </>
    );
};
export default AddProduct;