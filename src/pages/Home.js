import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from 'axios'; 
import { Navigate, useNavigate } from "react-router-dom";

const Home=()=>{
    const [data,setData]=useState([]);
  
 return(
    <div>
        <ShopHeader/>
    <div></div></div>
 )
};
export default Home;