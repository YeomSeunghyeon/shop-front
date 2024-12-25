
import axios from "axios";
import ShopHeader from "../../components/ShopHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NoteList=()=>{
    const[data,setData]=useState([]);
    const [number,setNumber]=useState(1);
    useEffect(()=>{
      fetchData()
    },[]);
    const fetchData=async()=>{
  try{
    const response=await axios.get("/user/getNoteAll");
    if(response)
        setData(response.data);
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
        <div className="NoteListAll">
            <div className="NoteListText">공지사항</div>
            <div className="NoteCategoryAll">
            <div className="NoteCategoryNumber">번호</div>
            <div className="NoteCategoryTitle">제목</div>
            <div className="NoteCategoryName">글쓴이</div></div>
            {data&&data.map((it,index)=>{
                return(<div key={it.nnum} className="NoteListKey">
                    <div className="NoteListNumber">{number+index}</div>
                    <Link to={`/note/${it.nnum}`} className="NoteListTitle">{it.title}</Link>
                    <div className="NoteListName">{it.name}</div></div>
                )
            })}
        </div>
    </div>
)
};
export default NoteList;