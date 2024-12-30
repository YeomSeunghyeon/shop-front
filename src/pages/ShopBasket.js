import { useEffect, useState } from "react";
import ShopHeader from "../components/ShopHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShopButton from "../components/ShopButton";


const ShopBasket = () => {
    const session = sessionStorage.getItem("session");
    const [data, setData] = useState([]);
    const [menuCounts, setMenuCounts] = useState({});
    const [menuNames, setMenuNames] = useState({});
    const [price,setPrice]=useState({});
    const [id,setId]=useState({});
    const[menuNum,setMenu]=useState({});
    const navigate=useNavigate();

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(()=>{
    if(!session)
        navigate("/login")
    },[])
    const fetchData = async () => {
        try {
            const response = await axios.get(`/user/getBasket?user=${session}`);
            if (response) {
                setData(response.data);
                calculateMenuCounts(response.data);
            }
        } catch (error) {
            if (error.response.status === 500) {
                alert(error.response.data.message);
            } else if (error.response.status === 401 || error.response.status === 403) {
                alert(error.response.data.message);
            }
        }
    };

    const calculateMenuCounts = (data) => {
        const counts = data.reduce((acc, item) => {
            acc[item.menu] = (acc[item.menu] || 0) + 1;
            return acc;
        }, {}); //메뉴별 개수 개산
        setMenuCounts(counts); // 저장

        
        Object.keys(counts).forEach((menu) => {
            changeMenu(menu);
        }); // 메뉴 이름,원산지, 가격 불러오기
    };

    const changeMenu = async (num) => {
        try {
            const response = await axios.get(`/user/item?num=${num}`);
            if (response) {
                setMenuNames(prevState => ({
                    ...prevState,
                    [num]: response.data[0].name
                }));  //이름을 저장
                setPrice(prevState=>({
                    ...prevState,
                    [num]:response.data[0].price
                })); //가격저장
                setId(prevState=>({
                    ...prevState,
                    [num]:response.data[0].num
                })) //아이디
                setMenu(prevState=>({
                    ...prevState,
                    [num]:response.data[0].menu
                }))//메뉴뉴
            }
        } catch (error) {
            if (error.response.status === 500) {
                alert(error.response.data.message);
            } else if (error.response.status === 401 || error.response.status === 403) {
                alert(error.response.data.message);
            }
        }
    };

    return (    
        <div>
            <ShopHeader />
            <div className="BasketText">
                {session}님의 장바구니  
                <div className="BasketAll">
                    {Object.entries(menuCounts).map(([menu,count]) => (
                        <div className="BasketItemAll">
                        <div className="BasketImage"> <img src={process.env.PUBLIC_URL + `/item${menuNum[menu]}${id[menu]}.jpg`} width = '170px' height='170px'className="HeaderLogo" />
                        </div>
                        <div className="BasketRight1">
                          <div className="BasketName" >{menuNames[menu]}</div>
                            <div className="BasketCount">구매개수:{count}개</div>
                            <div className="BasketRight2">
                            <div className="BasketAllPrice">총액:{price[menu]*count}원</div>
                            <ShopButton className="BasketButton" text="구매하기"/></div>
                        </div>  </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopBasket;
