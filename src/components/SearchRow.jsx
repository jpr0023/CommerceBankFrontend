import { useNavigate } from "react-router-dom";
import "./SearchRow.css"
import { useState } from "react";

export default function SearchRow({search, setSearches, component}){
    const nav = useNavigate();
    const token = sessionStorage.getItem('login');
    const [renameClassName, setRenameClass] = useState("renameInvisible");
    const [renameValue, setRename] = useState("");
    function renameSearch(id){

        fetch(`http://localhost:8081/saved/rename/${id}`,{
            method:"PUT",
            headers:{
                "Content-Type": "text/plain"
            },
            body:renameValue
        })
        .then(res=>{
            if (res.status == 204){
                return fetch(`http://localhost:8081/user/searches/${token}`);
            }
            else{
                throw new Error("Rename Failure");
            }
        })
        .then((res) => {
            if (res.status === 200){
                return res.json();
            }
        })
        .then((data) => {
            setSearches(data);
            setRename("");
        })
        .catch(error => {
            console.log(error);
        })
    }

    function renameVisible(){
        if (renameClassName === "renameInvisible"){
            setRenameClass("renameVisible");
        }
        else{
            setRenameClass("renameInvisible");
        }
    }

    function saveSearch(id){
        
        fetch(`http://localhost:8081/saveUrl/${token}/${id}`,{
            method:"GET"
        })
        .then(res => {
            if (res.status == 200){
                return fetch(`http://localhost:8081/user/searches/${token}`);
            }
            else if (res.status !== 200){
                throw new Error("Saving Error");
            }
        })
        .then((res) => {
            if (res.status === 200){
                return res.json();
            }
        })
        .then((data) => {
            setSearches(data);
        })
        .catch(error => {
            console.log(error);
        })
    }


    function rescanSearch(id){
        console.log(token);

        console.log(id);

        fetch(`http://localhost:8081/saved/rescan/${token}/${id}`,{
            method:"GET"
        }) 
        .then(res => {
            if(res.status === 200){
                return res.json();
            }
        })
        .then((data) => {
            if (data){
                sessionStorage.setItem('url', JSON.stringify(data));
                nav("/urlTable");
            }
        })
    }

    function deleteSearch(id){
        fetch(`http://localhost:8081/saved/delete/${id}`,{
            method:"DELETE"
        })
        .then(res => {
            if (res.status == 204){
                return fetch(`http://localhost:8081/user/searches/${token}`);
            }
            
            else if(res.status !== 204){
                throw new Error("Delete Failed");
            }
        })
        .then((res) => {
            if (res.status === 200){
                return res.json();
            }
            
        })
        .then((data) => {
            setSearches(data);
        })
        .catch(error =>{
            console.error("Error deleteing: ", error);
        })
    }

    function recoverSearch(id){
        fetch(`http://localhost:8081/deleted/recover/${id}/${token}`,{
            method:"GET"
        })
        .then(res => {
            if (res.status == 204){
                return fetch(`http://localhost:8081/user/searches/${token}`);
            }
        
            else if(res.status !== 204){
                throw new Error("Recover Failed");
            }
        })
        .then((res) => {
            if (res.status === 200){
                return res.json();
            }
            
        })
        .then((data) => {
            setSearches(data);
        })
        .catch(error =>{
            console.error("Error Recovering: ", error);
        })
    }

    function renameInput(e){
        setRename(e.target.value);
        console.log(renameValue);
    }

    function clearText(){
        setRename("");
        setRenameClass("renameInvisible");
    }



    if (search != null && component == 1){
    return(

        <>

        
            <div className="saved-row">
                <label>{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                <div className={`rename-input-group ${renameClassName}`}>
                    <input className="fieldid" type="text" onChange={renameInput} value={renameValue}/>
                    <button className="save-btn" onClick={() => renameSearch(search?.id)}>Confirm</button>
                    <button className="delete-btn" onClick={() => clearText()}>Done</button>
                </div>
                <button className="rename-btn" onClick = {renameVisible}>Rename</button>
                <button className="rescan-btn" onClick={() => rescanSearch(search?.url?.id)}>Rescan</button>
                <button className="delete-btn" onClick={() => deleteSearch(search?.id)}>Delete</button>
            </div>
        </>
    );
    }

    else if (search !=  null && component == 2){
        return(

            <>
                <div className="recent-row">
                    <label>{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                    <button className="rescan-btn" onClick={() => rescanSearch(search?.url?.id)}>Rescan</button>
                    <button className="save-btn" onClick = {() => saveSearch(search?.url?.id)}>Save</button>
                </div>
            </>
        )
    }
    else if (search != null && component == 3){
        return(

            <>
                <div className="deleted-row">
                    <label>{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                    <button className="rename-btn" onClick={() => recoverSearch(search?.url?.id)}>Recover</button>
                    
                </div>
            </>
        )
    }
    else{
        return(

            <>
                <div className="searchRow">
                    <></>
                </div>
            </>
        ) 
    }
}