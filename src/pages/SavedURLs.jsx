import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";


function Saved() {

    const [urls, setUrl] = useState([]);

    useEffect(()=>{
        fetch(" http://localhost:8081/urls", {method:"GET"})
        .then(res =>res.json())
        .then(res=>{
            setUrl(res)});
    },[])      
     
    return (
        <div>
              <Header/>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>

        {urls.map(urls =>

            <tr key = {urls.id}>
            <td>{urls.id}</td>
            <td>{urls.url}</td>
            </tr>
        )}


      </tbody>
      </Table>
        </div>
      );
 
}



export default Saved;