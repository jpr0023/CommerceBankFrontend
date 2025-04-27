import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


//  To Explain thought process
//  fetch to go through. Have to use post to get it to work for a response body.
//  Switched up the urls first link to website not sure if it matters the naming at all but just did it incase.
//  Changed up the bottom to data so we know that deals with that instead of seeing res each time kind of gets confusing.
//  But that checks to see if there is something there if there is saves it to session storage

// What sessionstorage gives us the ability to do is keep it around the entire time that the page is open. but clears when we close the tab
// I can rename the website tag if you would like not sure if it matters but to keep transparency can do that. To make it easier like setting it to url or something like that.
// If you have any questions feel free to message me on discord(Brett)


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
            console.log(1,res);
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

    const changeValue=(e)=>{
        setUrls({
         ...urls, [e.target.name]:e.target.value  
        });
        console.log(urls);
    }


    return (
      
        <div>
          <img className = "logo" src="src/pages/logo.png" alt="CommerceBankLogo"/>
            <Header></Header>
            <Form onSubmit = {submitURL}>
                <Form.Group controlId="URL">
                    <Form.Label className = "label">Enter URL to Analyze:</Form.Label>
                    <Form.Control className="form-control"  type="text" placeholder="Enter URL" onChange = {changeValue} name="website" value={urls.website}/>
                </Form.Group>

                <Button className = "btn" variant="success" type="submit">
                    Analyze URL  
                </Button>
            </Form>
        </div>
      );

      
      
 

}

export default URLSearch;
