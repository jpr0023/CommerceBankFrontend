import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./login.css"
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
  console.log(login)
  console.log(sessionStorage.getItem("login"));
  }

  const handleLogin = () => {
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
    <p>
    <label>
      Username:
        <input type="text" name="username" onChange={changeUserDetails} />
      </label></p>
      <p><label>Password:
        <input type="password" name="password" onChange={changeUserDetails} />
        </label>
      </p>
        <button onClick={handleLogin}>Login</button>
      
      <p className='Invalid'>{text}</p>
    </div>
  );
}
export default Login;
