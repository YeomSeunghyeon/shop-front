import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Favorites=()=>{
    const session=sessionStorage.getItem("session");
    const [data,setData]=useState([]);
    const navigate=useNavigate();
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
      const handleMove=(num)=>{
        navigate(`/item/${num}`)
      }
return(
    <div>
        <ShopHeader/>
        <div>
          <div className="FavoriteText">즐겨찾기</div>
          <div className="FavoriteAll">
          {data&&data.map((it)=>{
            return(
              <div className="FavoriteItem" onClick={()=>handleMove(it.num)}>
              <div className="FavoriteImage"> <img src={process.env.PUBLIC_URL + `/item${it.menu}${it.num}.jpg`} width = '170px' height='170px'className="HeaderLogo" />
              </div>
              <div className="FavoriteName">{it.name}</div>
              </div>
            )
          })}
        </div></div>
       
    </div>
)
};
export default Favorites;