import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import List from './pages/List';
import ShopBasket from './pages/ShopBasket';
import ItemDetail from './pages/ItemDetail';
import Note from './pages/note/Note';
import NoteList from './pages/note/NoteList';
import MyPage from './pages/MyPage/MyPage';
import MyPageEdit from './pages/MyPage/MyPageEdit';
import ShopFooter from './components/ShopFooter';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
 <Routes>
 <Route path='/' element={<Home/>}/>
 <Route path='/login' element={<Login/>}/>
 <Route path='/join' element={<Join/>}/>
 <Route path='/list/:id' element={<List/>}/>
 <Route path='/shopbasket' element={<ShopBasket/>}/>
 <Route path='/item/:id' element={<ItemDetail/>}/>
 <Route path='/note/list' element={<NoteList/>}/>
 <Route path='/note/:id' element={<Note/>}/>
 <Route path='/mypage' element={<MyPage/>}/>
 <Route path='/mypage/edit' element={<MyPageEdit/>}/>
 </Routes>
  <ShopFooter/>
   </div>
   </BrowserRouter>
  );
}

export default App;
