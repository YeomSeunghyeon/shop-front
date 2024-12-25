import { useParams} from "react-router-dom";
import ShopHeader from "../../components/ShopHeader";
import { useEffect, useState } from "react";
import axios from "axios";

const Note=()=>{
    const {id}=useParams();
    const[data,setData]=useState([]);
    useEffect(()=>{
     fetchData();
    },[]);
    const fetchData=async()=>{
     try{
     const response=await axios.get(`/user/getNote?num=${id}`);
     if(response)
       setData(response.data[0]);

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
   <div className="NoteAll">
   <div className="NoteTitle"> {data.title}</div>
  <div className="NoteDN"> <div className="NoteDate"> {data.date}</div>
   <div className="NoteName"> {data.name}</div></div>
   <div className="NoteContent"> {data.content}</div>
   </div>
    </div>
)
};
export default Note;