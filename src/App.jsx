 import './App.css'
import Header from './components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Book from './pages/book'
 

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <Header/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/book" element = {<Book/>}/>
      </Routes>    
      </div>
    </>
  )
}

export default App
