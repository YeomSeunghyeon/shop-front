import { useNavigate, useParams } from "react-router-dom";
import ShopHeader from "../components/ShopHeader";
import { useEffect, useState } from "react";
import axios from "axios"
import ShopButton from "../components/ShopButton";
const List=()=>{
    const {id}= useParams();
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const user=sessionStorage.getItem("session");
    useEffect(() => {
        fetchData();
     }, []); 
       
     
       const fetchData = async () => {    
         try {
             const response = await axios.get(`/user/itemList?menu=${id}`)
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

         const handleBasket=async(menu)=>{
          axios.post('/user/putBasket',{
            user:user,
            menu:menu
        })
        .then(response => {        
            alert("저장되었습니다.");
        })
        .catch(error => {
            if (error.response.status === 500) {
                alert(error.response.data.message);
            } else if (error.response.status === 401 || error.response.status === 403) {
                alert(error.response.data.message);
            }
        });
    }
return(
    <div>
    <ShopHeader/>
    <div className="ListText">식품</div>
    <div className="ListAll">
    {data&&data.map((it)=>{
            return(
            <div className="List">
               <img src={it.img}/>
              <div className="ListName">{it.name}</div>
              <div className="ListPrice">{it.price}원</div>
              <div className="ListOrigin">{it.origin}</div>
              <ShopButton className="ListBasket" text="상품담기" onClick={()=>handleBasket(it.num)}/>
          </div>
            )
        })}
        </div>
    </div>

)
};
export default List;