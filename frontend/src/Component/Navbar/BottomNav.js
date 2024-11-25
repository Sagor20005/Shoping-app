import React from 'react'
import {useNavigate} from 'react-router-dom'
import "./Style/BottomNav.css"

const BottomNav = ()=>{
  const Navigate = useNavigate()
  const navListData = [
    {icon:"https://img.icons8.com/?size=100&id=dS5lJMOqmBwL&format=png&color=000000",name:"Home",address:"/"},
    {icon:"https://img.icons8.com/?size=100&id=dN8m9joMwymk&format=png&color=000000",name:"Catagoris",address:"/cat"},
    {icon:"https://img.icons8.com/?size=100&id=BBhHIwJINbBl&format=png&color=000000",name:"Cart",address:"/cart"},
    {icon:"https://img.icons8.com/?size=100&id=xUROKwrjyYiU&format=png&color=000000",name:"Account",address:"/account"},
    ]
  return(
    <>
      {
        <div className="bottom_nav_containar">
          
          
          {
            navListData.map((nav)=>{
              return(
              <div onClick={()=>Navigate(nav.address)} className="item">
                <img src={nav.icon} alt={nav.name}/>
                <p>{nav.name}</p>
              </div>
              )
            })
          }
          
        </div>
      }
    </>
    );
};
export default BottomNav;