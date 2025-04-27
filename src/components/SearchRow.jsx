import { useNavigate } from "react-router-dom";
import "./SearchRow.css"

export default function SearchRow({search, setSearches, component}){
    const nav = useNavigate();
    const token = sessionStorage.getItem('login');
    function renameSearch(id){
        
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



    if (search != null && component == 1){
    return(

        <>

        
            <div className="searchRow">
                <label className="saved-row">{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                <button className="rename-btn" onClick={() => renameSearch(search?.id)}>Rename</button>
                <button className="rescan-btn" onClick={() => rescanSearch(search?.url?.id)}>Rescan</button>
                <button className="delete-btn" onClick={() => deleteSearch(search?.id)}>Delete</button>
            </div>
        </>
    );
    }

    else if (search !=  null && component == 2){
        return(

            <>
            
            
                <div className="searchRow">
                    <label className="recent-row">{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                    <button className="rescan-btn" onClick={() => rescanSearch(search?.url?.id)}>Rescan</button>
                    <button className="save-btn" onClick = {() => saveSearch(search?.url?.id)}>Save</button>
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