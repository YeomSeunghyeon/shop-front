import { useState } from "react";
import ShopButton from "../components/ShopButton";
import ShopHeader from "../components/ShopHeader";
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Join=()=>{
    const navigate=useNavigate();
    const [data,setData]=useState({
        id:"",
        pwd:"",
        name:"",
        tel:""
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit=async()=>{
        axios.post('/user/join',{
            id:data.id,
            pwd:data.pwd,
            name:data.name,
            tel:data.tel,
            is_admin:1
        })
        .then(response => {        
            alert("회원가입이 완료되었습니다.");
            navigate('/');
            window.location.reload();
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
    <div className="JoinText">회원가입</div>
   <div className="IdAll"><div className="IdText">아이디</div><input className="IdInput" onChange={handleChange} name="id" value={data.id}>
   </input></div> 
   <div className="PwdAll"><div className="PwdText">비밀번호</div><input className="PwdInput" onChange={handleChange} name="pwd" value={data.pwd}>
   </input></div> 
   <div className="NameAll"><div className="NameText">이름</div><input className="NameInput" onChange={handleChange} name="name" value={data.name}>
   </input></div> 
   <div className="TelAll"><div className="TelText">전화번호</div><input className="TelInput" onChange={handleChange} name="tel" value={data.tel}>
   </input></div> 
   <ShopButton className="JoinButton" text="완료" onClick={handleSubmit} />
   </div>
)
};
export default Join;