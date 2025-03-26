import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";



//This is some functionallity i was working on to try to get simple display about a given URL
//function URLSearch() {
   // const [url, setUrl] = useState('');
  //  const [analysis, setAnalysis] = useState(null);
  //  const [error, setError] = useState('');
  
 //   const handleInputChange = (event) => {
 //     setUrl(event.target.value);
 //     setError(''); // Clear any previous errors when input changes
 //   };
  
//    const analyzeURL = () => {
 //     try {
 //       const parsedURL = new URL(url);
  //      setAnalysis({
  //        protocol: parsedURL.protocol,
  //        hostname: parsedURL.hostname,
  //        pathname: parsedURL.pathname,
  //        search: parsedURL.search,
  //        hash: parsedURL.hash,
  //      });
  //      setError(''); // Clear any previous errors if parsing is successful
  //    } catch (err) {
  //      setAnalysis(null); // Clear previous analysis if there's an error
  //      setError('Invalid URL');





//was trying to use the template from the book page to create a new page for the URL search
//when i tried to submit a URL it wouldnt populate in URLdb
//The logic I got from everything I looked at seemed that a URL needs to be saved in 
//the database then pulled from the database to the back in order to pull ssl certs and other info
//then there can be an implementation to pull that data from the database to the front end




function URLSearch() {

    const[urls, URLS] = useState({
        url:'',
      });

    const navigate = useNavigate();  

    const showinfo =(e)=>{
      e.preventDefault();
      fetch("http://localhost:8081/analyze",
        {
        method:"GET",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(urls)
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
    const submitURL =(e)=>{
        e.preventDefault();
        fetch("http://localhost:8081/urls",
          {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(urls)
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

    const changeValue=(e)=>{
        console.log(e);
        URLS({
         ...urls, [e.target.name]:e.target.value  
        });
        console.log(e.target.name + " name "  );
        console.log(e.target.value + " value " );
    }


    return (
      
        <div>
          <Header/>
            <Form onSubmit = {showinfo}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Save URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter a URL to Analyze" onChange = {changeValue} name="url" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Analyze  
                </Button>
                <Button onClick = {submitURL} variant="primary" type="submit">
                    Save  
                </Button>
            </Form>
          
          
        </div>
      );

      
      
 

}

export default URLSearch;
