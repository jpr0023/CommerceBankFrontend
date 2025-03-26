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
      });

    const navigate = useNavigate();  


    const submitURL =(e)=>{
        e.preventDefault();
        fetch("http://localhost:8081/analyze", {
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body: JSON.stringify(urls)
        })
        .then(res=>{
            console.log(1,res);
            if(res.status === 200){
              return res.json();
            }else{
              return null;
            }
          })
        .then((data) => {
            if (data !== null){
              sessionStorage.setItem("url",JSON.stringify(data));
              console.log(data);
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
    }


    return (
      
        <div>
          <Header/>
            <Form onSubmit = {submitURL}>
                <Form.Group controlId="URL">
                    <Form.Label>Enter URL to Analyze</Form.Label>
                    <Form.Control type="text" placeholder="Enter URL" onChange = {changeValue} name="website" value={urls[0]?.website}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit  
                </Button>
            </Form>
        </div>
      );

      
      
 

}

export default URLSearch;
