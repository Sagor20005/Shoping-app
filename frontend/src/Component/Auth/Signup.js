import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import "./Style/Form.css"
import Swal from "sweetalert2"
import {useCookies} from "react-cookie"

const Signup = ()=>{
  const Navigate = useNavigate()
  
  // cookies managment requirement 
  const [,setCookie] = useCookies([process.env.REACT_APP_NAME])
  
  const Submit = async (e)=>{
    e.preventDefault()
    let formData = new FormData(e.target)
    // delete isSellar and change this currect => true/false
    formData.delete("isSellar")
    formData.append("isSellar",e.target.isSellar.checked)
    
    // send member data to server
    try{
      let result = await fetch(`${process.env.REACT_APP_API_URL}/member/`,{
        method:"post",
        body:formData
      })
      result = await result.json()
      if(result && result.state){
        setCookie(`${process.env.REACT_APP_NAME}`, result.jwtToken, {maxAge: 60*60*2})
        localStorage.setItem(`${process.env.REACT_APP_NAME}`,JSON.stringify(result.isSellar))
        Navigate("/")
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
    
  }
  
  return(
    <>
      {
        <div className="form_containar">
          <h1>Registar Now</h1>
          <form onSubmit={(e)=>Submit(e)}>
            <input type="text" placeholder="Enter name." name="name" />
            <input type="email" placeholder="Enter email." name="email" />
            <input type="number" placeholder="Enter number." name="number" />
            <input type="password" placeholder="Enter password." name="password" />
            <div className="inline">
              <input type="checkbox" className="type_checkbox" id="isSellar" name="isSellar"/>
              <label htmlFor="isSellar">Is a Sellar Account?</label>
            </div>
            <button type="submit">Sign Up!</button>
          </form>
          <Link to="/login">alrady have for Login</Link>
          
        </div>
      }
    </>
    );
};
export default Signup;