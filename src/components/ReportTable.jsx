import './ReportTable.css'
import DisplayBubble from "./DisplayBubble";
import DisplayResponseHeaders from "./DisplayResponseHeaders";
import { useNavigate } from "react-router-dom";

export default function reportTable(){

    const dataJson = JSON.parse(sessionStorage.getItem('url'));
    let title = dataJson?.url?.urlValue?.toLowerCase();
    let holder;
    const Navigate = useNavigate();
   
        if (title.startsWith("https://www.")){
            title = title.substring(12);
        }
        else if (title.startsWith("http://www.")){
            title = title.substring(11);
        }

        title = title.charAt(0).toUpperCase() + title.slice(1);
    
    // Use effect to grab the length of the response headers?
    // Have the 4 or 5 lines going over all of the other stuff

    function navigateOver(){
        Navigate("/searches");
    }

    function saveTable(){
        const token = sessionStorage.getItem('login');
        const urlId = dataJson?.url?.id;
        fetch(`http://localhost:8081/saveUrl/${token}/${urlId}`,{
            method:"GET"
        })
        .then(res => {
            if (res.status !== 200){
                throw new Error("Saving Error");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    return(
        <>
            <div className="urlTable">
            <p className="urlTitle">{title}</p>

            <DisplayBubble title={'Response Code:'} value={dataJson?.responseCode}/>
            <DisplayBubble title={'Response Time:'} value={dataJson?.responseTime}/>
            <DisplayBubble title={'Server:'} value={dataJson?.server}/>
            <DisplayBubble title={"Content-Type:"} value={dataJson?.contentType} />

            <DisplayResponseHeaders headers={dataJson?.headers} />
            
            <button className='button2' onClick={() => navigateOver()}>Full History</button>
            <button className='button2' onClick={() => saveTable()}>Save</button>

            </div>
        
        </>
    )




};