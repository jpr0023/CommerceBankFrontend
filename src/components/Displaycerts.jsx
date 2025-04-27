import "./DisplayCerts.css"

export default function DisplayCerts({certs}){


    return (
        <>
        <h2>Certs</h2>
            <div className="certTable">
                
                {
                    certs.map((cert,index) => (
                        <div className="certRow">
                            <div className="certField">
                                <div className="certTitle">Subject:</div>
                                <div className="certValue">{cert?.subject}</div>
                            </div>
                            <div className="certField">
                                <div className="certTitle">Issuer:</div>
                                <div className="certValue">{cert?.issuer}</div>
                            </div>
                            <div className="certField">
                                <div className="certTitle">Valid From:</div>
                                <div className="certValue">{cert?.validFrom}</div>
                            </div>
                            <div className="certField">
                                <div className="certTitle">Valid To:</div>
                                <div className="certValue">{cert?.validTo}</div>
                            </div>
                            <div className="certField">
                                <div className="certTitle">Serial Number:</div>
                                <div className="certValue">{cert?.serialNumber}</div>
                            </div>
                            <div className="certField">
                                <div className="certTitle">Signature Algorithm:</div>
                                <div className="certValue">{cert?.signatureAlgorithm}</div>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    );



}