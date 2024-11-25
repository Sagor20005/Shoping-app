import React from 'react'
import {SearchBar,Offers,BottomNav,HomeContent} from "../../ComponentImports"
const HomePage = ()=>{
  return(
    <>
      <div className="App">
        <SearchBar />
        <Offers />
        <HomeContent />
        <BottomNav />
      </div>
    </>
    );
};
export default HomePage;