import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css"
import Button from 'react-bootstrap/Button';
function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    "username" : "",
    "password" : ""
  });
  const [text,setText] = useState();

  const changeUserDetails = (e) => {
    setLogin({
      ...login,[e.target.name]:e.target.value
  });
  console.log(login);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    if (login.username == "" || login.password == ""){
      setText("Both Username and Password are needed.")
    }
    else{
      fetch("http://localhost:8081/user/login",{
        method:"POST",
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(login)
      })
      .then(res=>{
        if(res.ok){
          return res.json()
        }
        else{
          setText("Invalid Username or Password!");
          // throw new Error ("Missing Login Credendials");
        }
      })
      .then((data) => {
        sessionStorage.setItem("login",JSON.stringify(data));
        navigate("/URLSearch");
      })
      // .catch(Error)
    }
  };

  return (
    
    
    <div>
      <div style={{ 
      backgroundImage: `url('src/pages/loginback.jpg')`,
     
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      alignContent: 'center',
      paddingLeft: '270px',
      paddingRight: '270px',
      backgroundRepeat: 'no-repeat',
      height: '550px',
      width: '1000px',
      borderRadius: '150px',
      opacity: '0.8',
      }}>
         <div className="login-container">
      
      <div className="rectangle-background"></div>
      <header className="title-header">
           Commerce Bank URL Analyzer
        </header>
        <header className="login-header">
           Login, Welcome Back!
        </header>
      <div className="login-form">
    
      <form>
           <div className="form-group">
            <label className='log'>Username:</label>
            <input type="text" className="form-control" name='username' onChange={changeUserDetails} placeholder="Enter Username"/>
           </div>
           <div className="form-group">
            <label className='log'>Password:</label>
            <input type="password" className="form-control" name='password' onChange={changeUserDetails} placeholder="Enter Password"/>
           </div>
           <a href='/createAccount'><p>New User? Resgister Now</p></a>
             <button variant = "success" className="login-btn" onClick={handleLogin}>Login</button>
             
        </form>
      </div>
    </div>
        
      </div>
      
    

    </div>

   
    

    
    
  );
}
export default Login;
