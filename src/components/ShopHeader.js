import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Select from 'react-select';
import axios from "axios";
const ShopHeader=()=>{
    const [islogin,setIslogin]=useState(false);
    const[item,setItem]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
      fetchData();
    },[])
    const fetchData = async () => {
        try {
            const response = await axios.get(`/user/itemAll`);
            if (response) {
                setItem(response.data);
  
            }
        } catch (error) {
            if (error.response.status === 500) {
                alert(error.response.data.message);
            } else if (error.response.status === 401 || error.response.status === 403) {
                alert(error.response.data.message);
            }
        }
    };
    useEffect(() => {
        const session = sessionStorage.getItem("session");
        if (session) {
            setIslogin(true); 
        } else {
            setIslogin(false);
        }
    }, []);
    const options = item.map((item) => ({
        value: item.num, // ID를 value로 사용
        label: item.name, // name을 abel로 사용l
      }));
    const handleLogout=()=>{
        sessionStorage.removeItem("session"); // 세션 스토리지에서 토큰 삭제
        setIslogin(false); // 로그아웃 상태로 변경
        navigate('/');
        window.location.reload();
    }
        const handleSearch = (selectedOption) => {
            if (selectedOption && selectedOption.value) {
            navigate(`/item/${selectedOption.value}`);
            }
        };
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
          options={options} // 드롭다운 옵션
          placeholder="검색어를 입력하세요"
          onChange={handleSearch} 
       
          />
        </div> </div>
    );
};
export default ShopHeader;