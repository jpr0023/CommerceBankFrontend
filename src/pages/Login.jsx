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

    <form>
      <header>
        Login
      </header>
       <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" onChange={changeUserDetails} placeholder="Enter Username"/>
       </div>
       <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" onChange={changeUserDetails} placeholder="Enter Password"/>
       </div>
  
         <Button variant = "success" type="submit" class="btn btn-primary">Submit</Button>
         
      </form>

    
    
  );
}
export default Login;
