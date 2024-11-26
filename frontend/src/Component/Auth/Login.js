import React,{useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Swal from "sweetalert2"
import {useCookies} from "react-cookie"

const Login = ()=>{
  const [,setCookie] = useCookies([process.env.REACT_APP_NAME])
  const Navigate = useNavigate()
  
  // empty & error fields state
  const [usernameError, setUsername] = useState(null)
  const [passwordError, setPassword] = useState(null)
  
  // handle submit 
  const Submit = async (e)=>{
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    if(username && password){
    try{
      let response = await fetch(`${process.env.REACT_APP_API_URL}/member/${username}/${password}`)
      console.log(response)
      response = await response.json()
      console.log(response)
      if(response && response.state){
        setCookie(`${process.env.REACT_APP_NAME}`, response.jwtToken, {maxAge: 60*60*2})
        localStorage.setItem(`${process.env.REACT_APP_NAME}`,JSON.stringify(response.isSellar))
        Navigate("/")
      }else if(response && response.msg){
        Swal.fire({
          title:"Error!",
          text:response.msg,
          icon:"error"
        })
      }else if(response && response.errorFields){
        const fields = response.errorFields
        setUsername(fields.username ? fields.username : null)
        setPassword(fields.password ? fields.password : null)
      }
    }catch(err){
      console.log(err)
      Swal.fire({
        title:"Error!",
        text:err.message,
        icon:"error"
      })
    }
    }else{
      setPassword("please enter username!")
      setUsername("please enter password!")
    }
  }
  
  // input change handler 
  const changeHandler = ()=>{
    setPassword(null)
    setUsername(null)
  }
  
  return(
    <>
      {
        <div className="form_containar">
          <h1>Login</h1>
          <form onSubmit={(e)=>Submit(e)}>
            <input onChange={changeHandler} type="text" placeholder="Enter email or number" name="username"/>
            <p className="alert">{usernameError}</p>
            <input onChange={changeHandler} type="password" placeholder="Enter password" name="password"/>
            <p className="alert">{passwordError}</p>
            <button type="submit">Log In!</button>
          </form>
          <Link to="/">Go to Home Page</Link>
          <Link to="/signup">Create an account</Link>
        </div>
      }
    </>
    );
};
export default Login;