import './ReportTable.css'
import DisplayBubble from "./DisplayBubble";
import DisplayResponseHeaders from "./DisplayResponseHeaders";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import DisplayCerts from './Displaycerts';


export default function reportTable(){

    const dataJson = JSON.parse(sessionStorage.getItem('url'));
    let title = dataJson?.url?.urlValue?.toLowerCase();
    const [saveButton, setSaveButton] = useState("Save");

    let holder;
    const Navigate = useNavigate();
   
        useEffect(() => {
            
            if (!dataJson){
                Navigate("/URLSearch",0)
            }
        }, [Navigate])
    

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
            if (res.status === 200){
                setSaveButton("Saved");
                setTimeout(() => setSaveButton("Save"), 2500); 
            }
            else if (res.status !== 200){
                throw new Error("Saving Error");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    if (dataJson){
    return(
        <>
            <div className="urlTable">
                <p className="urlTitle">{title}</p>
                
                <div className="urlContent">
                    <div className='Left_Column'>
                        <DisplayBubble title={'Response Code:'} value={dataJson?.responseCode}/>
                        <DisplayBubble title={'Response Time:'} value={dataJson?.responseTime}/>
                        <DisplayBubble title={'Server:'} value={dataJson?.server}/>
                        <DisplayBubble title={"Cipher Suite:"} value={dataJson?.cipherSuite} />
                        <DisplayCerts certs={dataJson?.certificateInfo}/>
                    </div>
                    <div className='Right_Column'>
                        <DisplayResponseHeaders headers={dataJson?.headers} />
                    </div>
                </div>

                <div className="buttonContainer">
                    <button className="button2" onClick={() => navigateOver()}>Full History</button>
                    <button className="button2" onClick={() => saveTable()}>{saveButton}</button>
                </div>

            </div>
        
        </>
    )
    }
    else{
        return(
            <></>
        )
    }



};