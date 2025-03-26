import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
function Login() {

  
      const[createUser, Create] = useState({
          user:'',
        });
  
      const navigate = useNavigate();  
  
  
      const handleLogin =(e)=>{
          e.preventDefault();
          fetch("http://localhost:8081/createUser",
            {
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(createUser)
          })
          
          .then(res=>{
              console.log(1,res);
              if(res.status === 201){
                return res.json();
              }else{
                return null;
              }
            })
          .then(res=>{
            console.log(res)
            if(res!==null){
              navigate("/");
            }else{
              alert('fails');
            }
          
          });
      
      }  


      const changeValue = () => {
        console.log(e);
        Create({
         ...createUser, [e.target.name]:e.target.value  
         
        });
        console.log(e.target.name + " name "  );
        console.log(e.target.value + " value " );
      };

   
   



      return (
    
        <div>
  
          <Form onSubmit = {handleLogin}>
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Login</Form.Label>
                  <Form.Control type="text" placeholder="username" onChange = {changeValue} name="user" />
              </Form.Group>

              <Button variant="primary" type="submit">
                  Login
              </Button>
          </Form>
      </div>

      );


    


 
}
export default Login;
