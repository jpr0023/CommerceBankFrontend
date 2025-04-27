import SavedSearches from "../components/SavedSearches";
import RecentSearches from "../components/RecentSearches";
import DeletedSearches from "../components/DeletedSearches";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./UserSearches.css";

export default function UserSearches(){

    const [searches, setSearches] = useState([]);
    const token = sessionStorage.getItem("login");


    // Goes for api call on page load
    useEffect(()=>{
        // Sends request on API Customer. That brings back there searches of recent and saved searches.
        fetch(`http://localhost:8081/user/searches/${token}`,{
            method:"GET"
        })
        // Checks to see if the fetch was successful
        .then(res=> {
            if (res.status === 200){
                return res.json();
            }
            else{
                throw new Error;
            }
        })
        .then((data)=> {
            // If succesful stores that within the searches useState
            setSearches(data);
        })
        // Prints out error for now to see what is going on
        .catch((error)=>{
            console.log(error);
        })
    }, [token])    

    // Returns a page that has both the saved Searches and Recent Searches on the same thing will style this a little bit more just want to get the idea of it down
    return (
        <div className="searches">
            <Header></Header>
            <div className="saved-section">
            <header>Saved Searches</header>
            <SavedSearches searches={searches?.savedSearches || []} setSearches={setSearches}/>
            </div>
            <div className="bottom-section">
                <div className="recent-section">
                    <header>Recent Searches</header>
                    <RecentSearches searches={searches?.recentSearches || []} setSearches={setSearches}/>
                </div>
                <div className="deleted-section">
                    <header>Recently Deleted</header>
                    <DeletedSearches searches={searches?.deletedSearches|| []} setSearches={setSearches}/>
                </div>
            </div>

        </div>
    );
}