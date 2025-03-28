import './DisplayResponseHeaders.css'

export default function DisplayResponseHeaders({headers}){


    return (


        <>
            <h2>Response Headers</h2>
            <div className="headerTable">
                
                {
                    headers.map((headers,index) => (
                        <p className='headerRow'> 
                            <span className="headerTitle">{headers?.key}: </span>
                            <span className="headerValue"> {headers?.value} </span>
                        </p>
                    ))
                }



            </div>
        </>


    )
}