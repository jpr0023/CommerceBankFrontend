import './DisplayResponseHeaders.css'
export default function DisplayResponseHeaders({headers}){
    return (
        <>
            <h2>Response Headers</h2>
            <div className="headerTable">
                
                {
                    headers.map((headers,index) => (
                        <div className="headerRow">
                            <div className="headerTitle">{headers?.key}:</div>
                            <div className="headerValue">{headers?.value}</div>
                        </div>

                    ))
                }
            </div>
        </>


    )
}