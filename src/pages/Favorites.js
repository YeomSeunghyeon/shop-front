import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from "axios";

const Favorites=()=>{
    const session=sessionStorage.getItem("session");
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetchData();
      },[])
      const fetchData=async()=>{
        try{
         const response=await axios.get(`/user/Favorites?id=${session}`)
         if(response)
          setData(response.data)
        }catch(error){
          if (error.response.status === 500) {
            alert(error.response.data.message);
        } else if (error.response.status === 401 || error.response.status === 403) {
            alert(error.response.data.message);
        }
        }
      }
return(
    <div>
        <ShopHeader/>
        <div>
          {data&&data.map((it)=>{
            return(
              <div>
              <div className="BasketImage"> <img src={process.env.PUBLIC_URL + `/item${it.menu}${it.num}.jpg`} width = '170px' height='170px'className="HeaderLogo" />
              </div>
              <div>{it.name}</div>
              </div>
            )
          })}
        </div>
       
    </div>
)
};
export default Favorites;