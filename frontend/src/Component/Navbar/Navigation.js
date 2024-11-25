import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./Style/Navigation.css"

const Navigation = ({name,address})=>{
  const Navigate = useNavigate()
  const back = "https://img.icons8.com/?size=100&id=39800&format=png&color=000000"
  return(
    <div className="navigation">
      <img onClick={()=>Navigate(address)} src={back} alt="back"/>
      <h3>{name}</h3>
    </div>
    );
};
export default Navigation;