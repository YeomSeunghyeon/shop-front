import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from 'axios'; 
import { Navigate, useNavigate } from "react-router-dom";

const Home=()=>{
    const [data,setData]=useState([]);
  
 return(
    <div>
        <ShopHeader/>
    <div className="MainText">쇼핑몰 사이트에 오신걸 환영합니다!!</div>
    </div>
 )
};
export default Home;