import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function URLSearch() {

    const[urls, setUrls] = useState({
        website:'',
        token:''
      });

    const navigate = useNavigate();  


    useEffect(() => {
      const token = sessionStorage.getItem("login");
      if (!token) {
        setTimeout(() => navigate("/"), 0); // Delay just enough to prevent early render issues
      }
      console.log(sessionStorage.getItem("login"));
    }, [navigate]);
    
    
    function validateURL(){
        fetch("http://localhost:8081/analyze",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(urls) 
        })
        .then(res =>{
            if(res.status === 200){
              return true;
            }
            else{
              throw new Error("Bad Request");
            }
        })
        .catch((error) => console.log(error));
    }

    const submitURL =(e)=>{

        if (() => validateURL()){
        e.preventDefault();
        urls.token = sessionStorage.getItem("login");
        fetch("http://localhost:8081/analyze", {
          method:"POST",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(urls) 
        })
        .then(res=>{
            if(res.status === 200){
              console.log(res.headers.get("Content-Type"));
              return res.json();
            }else{
              return null;
            }
          })
        .then((data) => {
            if (data !== null){
              sessionStorage.setItem("url",JSON.stringify(data));
              navigate("/urlTable");
          }
          else{
            alert("Failed");
          }
        })    
      }
      else{

      }
    }  

    const changeValue=(e)=>{
        setUrls({
         ...urls, [e.target.name]:e.target.value  
        });
        console.log(urls);
    }


    return (
      
        <div>
            <Header></Header>
            <Form onSubmit = {submitURL}>
                <Form.Group controlId="URL">
                    <Form.Label>Enter URL to Analyze</Form.Label>
                    <Form.Control className="form-control"  type="text" placeholder="www.example.com" onChange = {changeValue} name="website" value={urls.website}/>
                </Form.Group>

                <Button variant="success" type="submit">
                    Submit  
                </Button>
            </Form>
        </div>
      );

      
      
 

}

export default URLSearch;
