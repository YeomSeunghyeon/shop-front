import { useEffect, useState } from "react";
import ShopHeader from "../../components/ShopHeader";
import axios from "axios";
import ShopButton from "../../components/ShopButton";
import { useNavigate } from "react-router-dom";

const MyPage=()=>{
  const id=sessionStorage.getItem('session');
  const [data,setData]=useState({});
  const navigate=useNavigate();
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData=async()=>{
    try{
     const response=await axios.get(`/user/getUser?id=${id}`);
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
  const handleSubmit=()=>{
  navigate("/mypage/edit")
  }
return(
    <div>
      <ShopHeader/>
      <div className="MyPageHeader">
     <div className="MyPageText">나의 정보 </div>
     <ShopButton className="MyPageEditButton" text="수정하기" onClick={handleSubmit}/></div>
      <div className="MyPageAll"> 
        <div className="MyPageIdTxt">아이디</div>
        <div className="MyPageId">{data.id}</div>
        <div className="MyPagePwdTxt">비밀번호</div>
        <div className="MyPagePwd">{data.password}</div>
        <div className="MyPageNameTxt">이름</div>
        <div className="MyPageName">{data.name}</div>
        <div className="MyPageTelTxt">전화번호</div>
        <div className="MyPageTel">{data.tel}</div>
        <div className="MyPageAddressTxt">주소</div>
        <div className="MyPageAddress">{data.address}</div>
        </div> 
    </div>
)
};
export default MyPage;