import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
const ShopHeader=()=>{
    const [islogin,setIslogin]=useState(false);
    const navigate=useNavigate();
    useEffect(() => {
        const session = sessionStorage.getItem("session");
        if (session) {
            setIslogin(true); 
        } else {
            setIslogin(false);
        }
    }, []);
    const handleLogout=()=>{
        sessionStorage.removeItem("session"); // 세션 스토리지에서 토큰 삭제
        setIslogin(false); // 로그아웃 상태로 변경
        navigate('/');
        window.location.reload();
    }
    return(
      <div className="Header"> 
     <div className="ShopHeader">
        <Link to="/shopbasket" className="HeaderItem">장바구니</Link>
        {islogin==false?
        <Link to="/login" className="HeaderLogin">로그인</Link>:
        <div className="HeaderLogin" onClick={handleLogout}>로그아웃</div>}</div>
      <div className="MainHeader">  <a href="/"> <img src={process.env.PUBLIC_URL + '/shop.png'} width = '50px' height='50px'className="HeaderLogo" /></a>
        <h2 className="ShopText">쇼핑몰</h2>
        <Select className="Search"
          placeholder="검색어를 입력하세요"
          noOptionsMessage={() => null}
          />
        </div> </div>
    );
};
export default ShopHeader;