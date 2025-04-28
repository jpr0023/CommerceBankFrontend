 import './App.css'
 import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import URLSearch from './pages/URLSearch'
import { useNavigate } from 'react-router-dom';
import ProtectedRoutes from './pages/utils/protectedroutes';
import URLTable from './pages/URLtable';
import CreateAccount from './pages/CreateAccount';
import UserSearches from './pages/UserSearches';

function App() {
  //const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    
    <>
      <div>
      <Routes>

          <Route element = {<ProtectedRoutes/>}/>
           <Route path="/" element = {<Login/>}/>
          <Route element = {<ProtectedRoutes/>}>
           <Route path="/" element = {<Login/>}/>
           <Route path="/URLSearch" element = {<URLSearch/>}/>
            <Route path="/urlTable" element={<URLTable/>}></Route>
            <Route path="/createAccount" element={<CreateAccount/>}/>
            <Route path="/searches" element={<UserSearches/>}/>
        </Route>
        
      </Routes>    
      </div>
    </>
  )
}

export default App
