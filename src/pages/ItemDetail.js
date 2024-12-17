import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom";
import ShopHeader from "../components/ShopHeader";
import ShopButton from "../components/ShopButton";
const ItemDetail=()=>{
    const {id}=useParams();
    const [data,setData]=useState([]);
    const user=sessionStorage.getItem("session");
    const navigate=useNavigate();
    useEffect(()=>{
     fetchData();
    },[])
    const fetchData=async()=>{
        try{
           const response=await axios.get(`/user/item?num=${id}`);
           if(response)
             setData(response.data[0])
        }catch (error) {
            if (error.response.status === 500) {
                alert(error.response.data.message);
            } else if (error.response.status === 401 || error.response.status === 403) {
                alert(error.response.data.message);
            }
        }
    }
   const handleSubmit=()=>{
    if(user){

    }
    else{
        navigate("/login")
    }

    }
return(
    <div>
        <ShopHeader/>
    <div className="ItemAll">
      <div className="ItemImage"> <img src={process.env.PUBLIC_URL + `/item${id}.jpg`} width = '300px' height='300px'className="HeaderLogo" />
      </div>
      <div className="ItemContent">
     <div className="ItemName"> {data.name}</div>
     <div className="ItemOrigin ">생산지:{data.origin}</div>
       <div className="ItemPrice">상품가격: {data.price}원</div>
       <ShopButton className="ItemButton" text="장바구니" onClick={handleSubmit}/></div>
    </div></div>
)
};
export default ItemDetail;