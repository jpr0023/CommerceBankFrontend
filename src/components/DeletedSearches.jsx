import SearchRow from "./SearchRow";


export default function RecentSearches({searches, setSearches}){

    const rows = Array(5).fill(null);
    const searchesLength = searches.length;
    return(
        <>

            {rows.map((_,index)=>{
                return index < searchesLength ?
                    <SearchRow search={searches[index]} setSearches={setSearches} component={3}/>
                    :
                    <SearchRow search={null} setSearches={setSearches} component={3}/>
                                
            })
            }
        </>
    );
}