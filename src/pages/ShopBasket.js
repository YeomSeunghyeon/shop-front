import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from "axios"
const ShopBasket=()=>{
    const session=sessionStorage.getItem("session");
    const [data,setData]=useState([]);
    useEffect(() => {
        fetchData();
     }, []); 
       
     
       const fetchData = async () => {    
         try {
             const response = await axios.get(`/user/getBasket?user=${session}`)
           if(response){
             setData(response.data.results);
             console.log(response.data.results);
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
    <div className="BasketText">
        {session}님의 장바구니
        <div>
     
        </div>
    </div>
    </div>
)
};
export default ShopBasket