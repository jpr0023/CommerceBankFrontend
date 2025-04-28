import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./URLSearch.css";

function URLSearch() {

    const[urls, setUrls] = useState({
        website:'',
        token:''
      });

    const navigate = useNavigate();  
    const [invalidInput, setInvalid] = useState("invalidInvisible")


    useEffect(() => {
      const token = sessionStorage.getItem("login");
      if (!token) {
        setTimeout(() => navigate("/"), 0); // Delay just enough to prevent early render issues
      }
      console.log(sessionStorage.getItem("login"));
    }, [navigate]);
    

    const submitURL =(e)=>{
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
            }
            else if (res.status === 400){
              if (invalidInput === "invalidInvisible"){
                setInvalid("invalidVisible");
              }
              return null
            }
            else{
              return null;
            }
          })
        .then((data) => {
            if (data !== null){
              sessionStorage.setItem("url",JSON.stringify(data));
              navigate("/urlTable");
            }
            else{
              console.log("Fail search")
            }
        })    
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
                <p className={invalidInput}>This is not a valid input.<br></br> Ex: www.google.com</p>
                <Button variant="success" type="submit">
                    Submit  
                </Button>
            </Form>
        </div>
      );

      
      
 

}

export default URLSearch;
