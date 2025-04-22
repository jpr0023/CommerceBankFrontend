
function searchRow(search){

    function renameSearch(id){
        
    }


    console.log(search);
    if (search != null){
    return(

        <>
        <p>{JSON.stringify(search)}</p>
        
            <div className="searchRow">
                <label>{search?.urlName !== null ? search?.urlName : search?.url?.urlValue}</label>
                <button onClick={() => renameSearch(search?.id)}>Rename</button>
                <button>Rescan</button>
                <button>Delete</button>
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

export default function SavedSearches({searches}){

    const rows = Array(10).fill(null);
    const searchesLength = searches.length;
    return(
        <>

            {rows.map((_,index)=>{
                if (index < searchesLength){
                    return searchRow(searches[index])
                }
                else{
                    return searchRow(null);
                }
            })
            }
        </>
    );
}