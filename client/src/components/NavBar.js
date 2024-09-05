import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

function keyHandle(){
  
}
export default function NavBar(){
  return(
    <div className = "navigation-bar">
      <h1>Book browse</h1>
      <input className = "search-bar" type = "text" placeholder = "Search for titles, author, etc."></input>
      <button className = "category-browse-button">Browse by category</button>
      <button className = "your-library-button">Your library</button>
    </div>
  )
}