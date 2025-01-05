import { useEffect, useState } from "react";
import ShopHeader from "../../components/ShopHeader";
import axios from "axios";
import ShopBasket from "../ShopBasket";
import ShopButton from "../../components/ShopButton";
import { useNavigate } from "react-router-dom";

const MyPageEdit=()=>{
    const id=sessionStorage.getItem('session');
    const navigate=useNavigate();
    const [data,setData]=useState({
         id:"",
        password:"",
        name:"",
        tel:"",
        address:""});
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
      const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit=async()=>{
      axios.post("/user/EditUser",{
        id:data.id,
        password:data.password,
        name:data.name,
        tel:data.tel,
        address:data.address
      }).then(response => {        
        alert("회원수정이 완료되었습니다");
       navigate("/mypage")
    })
    .catch(error => {
        if (error.response.status === 500) {
            alert(error.response.data.message);
        } else if (error.response.status === 401 || error.response.status === 403) {
            alert(error.response.data.message);
        }
        navigate("/mypage")
    });
    }
return(
    <div>
        <ShopHeader/>
        <div className="MyPageHeader">
     <div className="MyPageText">나의 정보 수정 </div>
     <ShopButton text="완료" className="MyPageEditButton" onClick={handleSubmit}/>
   </div>
      <div className="MyPageAll"> 
        <div className="MyPageIdTxt">아이디</div>
        <div className="MyPageEditId">{data.id}</div>
        <div className="MyPagePwdTxt">비밀번호</div>
        <input className="MyPageEditPwd" value={data.password} name="password" onChange={handleChange}/>
        <div className="MyPageNameTxt">이름</div>
        <input className="MyPageEditName" value={data.name} name="name" onChange={handleChange}/>
        <div className="MyPageTelTxt">전화번호</div>
        <input className="MyPageEditTel" value={data.tel} name="tel" onChange={handleChange}/>
        <div className="MyPageAddressTxt">주소</div>
        <input className="MyPageEditAddress" value={data.address} name="address" onChange={handleChange}/>
        </div> 
    </div>
)
};
export default MyPageEdit;