import { BrowserRouter, Routes,Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import List from './pages/List';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
 <Routes>
 <Route path='/' element={<Home/>}/>
 <Route path='/login' element={<Login/>}/>
 <Route path='/join' element={<Join/>}/>
 <Route path='/list' element={<List/>}/>
 </Routes>
  
   </div>
   </BrowserRouter>
  );
}

export default App;
