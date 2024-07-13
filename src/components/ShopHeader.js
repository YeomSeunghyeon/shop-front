import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
        
     <div className="ShopHeader">
       <a href="/"> <img src={process.env.PUBLIC_URL + '/shop.png'} width = '50px' className="HeaderLogo" /></a>
        <Link to="/" className="HeaderMain">쇼핑몰</Link>
        <Link to="/list/1" className="HeaderItem1">식품</Link>
        <div className="HeaderItem2">가전</div>
        <Link to="/shopbasket" className="HeaderItem3">장바구니</Link>
        {islogin==false?
        <Link to="/login" className="HeaderLogin">로그인</Link>:
        <div className="HeaderLogin" onClick={handleLogout}>로그아웃</div>}</div>
    );
};
export default ShopHeader;