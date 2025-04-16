import './DisplayBubble.css'

export default function DisplayBubble({title, value}){



    return(

        <>
        
              <div className="bubbleRow">
                <span className="rowTitle">{title}</span>
                <span className="rowValue">{value}</span>
              </div>
        
        </>

    );





}