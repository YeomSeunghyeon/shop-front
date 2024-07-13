import { useNavigate, useParams } from "react-router-dom";
import ShopHeader from "../components/ShopHeader";
import { useEffect, useState } from "react";
import axios from "axios"
const List=()=>{
    const {id}= useParams();
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    useEffect(() => {
        fetchData();
     }, []); 
  
     
       const fetchData = async () => {    
         try {
             const response = await axios.get(`/user/itemList?menu=${id}`)
           if(response){
             setData(response.data.results)
           }

         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
           }}
         } 
return(
    <div>
    <ShopHeader/>
    {data&&data.map((it)=>{
            return(
            <div className="ListAll">
              <div className="ListName">{it.name}</div>
              <div className="ListPrice">{it.price}원</div>
              <div className="ListOrigin">{it.origin}</div>
          </div>
            )
        })}
    </div>

)
};
export default List;