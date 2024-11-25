import React from 'react'
import "./Style/Offars.css"

const Offars = ()=>{
  const offerImg ="https://img.icons8.com/?size=100&id=4QXMmPIgxNVx&format=png&color=000000"
  const offerData = [
    {image:offerImg,offer:"11.11"},
    {image:"https://img.icons8.com/?size=100&id=zD-VLZTPKlpb&format=png&color=000000",offer:"Hot"},
    {image:"https://img.icons8.com/?size=100&id=Gej232fTtpRh&format=png&color=000000",offer:"Eid"},
    {image:"https://img.icons8.com/?size=100&id=lehw3dnSlABA&format=png&color=000000",offer:"Mother's day"},
    ]
  return(
    <>
      {
        <div className="offers_containar">
          
          {
            offerData.map((offer)=>{
            return(
              <div className="offer">
                <img src={offer.image} alt="try"/>
                <p>{offer.offer.length > 7 ? <marquee>{offer.offer}</marquee>:offer.offer}</p>
              </div>
              )
            })
          }
          
        </div>
      }
    </>
    );
};
export default Offars;