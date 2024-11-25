import React from 'react'
import "./Style/SearchBar.css"

const SearchBar = ()=>{
  return(
    <>
      {
        <div className="search_bar">
          <input type="search" placeholder="Search.." recquired />
        </div>
      }
    </>
    );
};
export default SearchBar;