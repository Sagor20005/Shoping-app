import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./Style/Account.css"
import {Navigation} from "../../ComponentImports"
import Icons from "../../HelperData/Icons.json"
import { useCookies } from "react-cookie"
import Swal from "sweetalert2"

const Account = ()=>{
  const Navigate = useNavigate()
  const [,,removeCookie] = useCookies([process.env.REACT_APP_NAME])
  // get is sellar 
  const { isSellar } = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_NAME}`))
  
  function handleLogout(){
    
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        
        try{
          removeCookie(process.env.REACT_APP_NAME)
          Navigate("/")
        }catch(err){
          Swal.fire({
            title:"Error",
            text: err.message ? err.message : "unnon error!",
            icon:"error"
          })
        }
        
      }
    });
    
  }
  return(
    <>
      <div className="account_containar">
        <Navigation name={"Account"} address={"/"} />
        <ul>
          <li>Profile</li>
          <li>Make me sellar</li>
          <li>My Products</li>
          <li onClick={handleLogout}>LogOut</li>
        </ul>
        
        {isSellar ? <img onClick={()=>Navigate("/new-product")} className="add_product" src={Icons.plus} alt="add"/> : null}
        
      </div>
    </>
    );
};
export default Account;