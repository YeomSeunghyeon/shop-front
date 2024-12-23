import { useLocation, useNavigate, useParams } from "react-router-dom";
import ShopHeader from "../components/ShopHeader";
import { useEffect, useState } from "react";
import axios from "axios"
import ShopButton from "../components/ShopButton";
const List=()=>{
    const {id}= useParams();
    const navigate=useNavigate();
    const [data,setData]=useState([]);
    const [category,setCategory]=useState([]);
    const user=sessionStorage.getItem("session");
    const location = useLocation();
    useEffect(() => {
        fetchData();
        categoryData();
     },[location]); 
       
     
       const fetchData = async () => {    
         try {
             const response = await axios.get(`/user/itemList?menu=${id}`)
           if(response){
             setData(response.data.results);
          
           }

         }catch (error) {
          if(error.response.status===500){
          alert(error.response.data.message);
          }
          else if(error.response.status===401 || error.response.status===403){
            alert(error.response.data.message);
           }}
         } 
         const categoryData = async () => {    
          try {
              const response = await axios.get(`/user/getCategoryitem?num=${id}`)
            if(response){
              setCategory(response.data[0]);
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
          if(user){
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
        else{
            navigate("/login")
        }
    
        }
return(
    <div>
    <ShopHeader/>
    <div className="ListText">{category.name}카테고리</div>
    <div className="ListAll">
    {data&&data.map((it)=>{
            return(
            <div className="List">
                 <div className="ListImage"> <img src={process.env.PUBLIC_URL + `/item${it.menu}${it.num}.jpg`} width = '100px' height='100px'className="HeaderLogo" />
                 </div>
              <div className="ListName">{it.name}</div>
              <div className="ListPrice">{it.price}원</div>
              <ShopButton className="ListBasket" text="상품담기" onClick={()=>handleBasket(it.num)}/>
          </div>
            )
        })}
        </div>
    </div>

)
};
export default List;