import { useState } from "react";
import ShopHeader from "../components/ShopHeader";
import ShopButton from "../components/ShopButton";
import axios from 'axios'; 
import { Link, useNavigate } from "react-router-dom";
const Login=()=>{
    const [id,setId]=useState("");
    const [pwd,setPwd]=useState("");
    const navigate=useNavigate();
   
    const handleSubmit=async()=>{
        try {
           const response = await axios.post(`/user/login`, { 
              id:id,
              pwd:pwd});
           
           if (response.status === 200) {
              console.log('로그인 성공');
          
              const session = response.data.sessionId;
              sessionStorage.setItem('session', session);
             
             navigate("/");
           }
         } catch (error) {
           alert("아이디나 비밀번호가 잘못되었습니다") } }
        
return(
    <div>
        <ShopHeader/>
        <div className="Login">
        <div className="LoginText">로그인</div>
        <div className="LoginIdAll"><div className="LoginIdText">ID</div>
        <input className="LoginId" value={id} onChange={(e)=>setId(e.target.value)}></input></div>
        <div className="LoginPwdAll" value={pwd} onChange={(e)=>setPwd(e.target.value)}><div className="LoginPwdText">password</div><input className="LoginPwd"></input></div>
        <ShopButton text="로그인하기" className="LoginButton" onClick={handleSubmit}/>
        <Link to="/join" className="LoginJoin">회원가입하러가기</Link>
        </div>
    </div>
)
};
export default Login