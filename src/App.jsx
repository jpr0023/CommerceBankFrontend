 import './App.css'
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Book from './pages/Book'
import URLSearch from './pages/URLSearch'
import { useNavigate } from 'react-router-dom';
import ProtectedRoutes from './pages/utils/protectedroutes';
import URLTable from './pages/URLtable';
function App() {
  //const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    
    <>

      <div>
 
      <Routes>

        <Route path="/login" element = {<Login/>}/>

        <Route element = {<ProtectedRoutes/>}>
           <Route path="/" element = {<Home/>}/>
           <Route path="/URLSearch" element = {<URLSearch/>}/>
            <Route path="/urlTable" element={<URLTable/>}></Route>
        </Route>
        
      </Routes>    
      </div>
    </>
  )
}

export default App
