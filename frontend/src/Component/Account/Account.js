import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./Style/Account.css"
import {Navigation} from "../../ComponentImports"
import Icons from "../../HelperData/Icons.json"

const Account = ()=>{
  const { isSellar } = JSON.parse(localStorage.getItem(`${process.env.REACT_APP_NAME}`))
  const Navigate = useNavigate()
  return(
    <>
      <div className="account_containar">
        <Navigation name={"Account"} address={"/"} />
        <ul>
          <li>Profile</li>
          <li>About</li>
          <li>Make a sellar</li>
          <li>Contact us</li>
        </ul>
        
        {isSellar ? <img onClick={()=>Navigate("/new-product")} className="add_product" src={Icons.plus} alt="add"/> : null}
        
      </div>
    </>
    );
};
export default Account;