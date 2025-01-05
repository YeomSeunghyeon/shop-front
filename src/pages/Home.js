import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from "axios";
import { Link } from "react-router-dom";
import ShopFooter from "../components/ShopFooter";


const Home=()=>{
    const [data,setData]=useState([]);
   useEffect(()=>{
    fetchData()
   },[]);
   const fetchData=async()=>{
   try{
    const response=await axios.get('/user/getNoteAll');
    if(response)
        setData(response.data);
   }catch(error){
    if (error.response.status === 500) {
        alert(error.response.data.message);
    } else if (error.response.status === 401 || error.response.status === 403) {
        alert(error.response.data.message);
    }
   }
   };
 return(
    <div>
        <ShopHeader/>
        <div className="MainBox">
            <Link to={`/note/${1}`} className="MainNoteText">{data.length > 0 ? data[0].title : "Loading..."} </Link>
    <div className="MainText">쇼핑몰 사이트에 오신걸 환영합니다!!</div></div>
    </div>
 )
};  
export default Home;