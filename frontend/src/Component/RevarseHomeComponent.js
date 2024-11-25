import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import {useCookies} from "react-cookie"

const RevarseHome = ()=>{
  const [cookies] = useCookies([process.env.REACT_APP_NAME])
  
  let auth = cookies[process.env.REACT_APP_NAME] 
  return auth ? <Navigate to="/"/> : <Outlet/> 
};
export default RevarseHome;