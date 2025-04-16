 import './App.css'
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Book from './pages/Book'
import URLSearch from './pages/URLSearch'
import { useNavigate } from 'react-router-dom';
import ProtectedRoutes from './pages/utils/protectedroutes';
import URLTABLE from './pages/URLtable';
import CreateAccount from './pages/CreateAccount';
import Header from './components/Header';
function App() {
  //const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    
    <>
      <Header></Header>
      <div>
      
      <Routes>

          <Route element = {<ProtectedRoutes/>}>
           <Route path="/" element = {<Login/>}/>
           <Route path="/URLSearch" element = {<URLSearch/>}/>
            <Route path="/urlTable" element={<urlTable/>}></Route>
            <Route path="/createAccount" element={<CreateAccount/>}/>
        </Route>
        
      </Routes>    
      </div>
    </>
  )
}

export default App
