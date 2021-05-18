//Tabla de estado de IsoTracker

import "./stateTable.css"
import React, { useState , useEffect} from 'react'

const StateTable = props =>{

    const [designR0, setDesignR0] = useState(0)
    const [designR1, setDesignR1] = useState(0)
    const [designR2, setDesignR2] = useState(0)
    const [designHold, setDesignHold] = useState(0)
    const [designDeleted, setDesignDeleted] = useState(0)
    const [designStock, setDesignStock] = useState(0)
    const [stressR0, setStressR0] = useState(0)
    const [stressR1, setStressR1] = useState(0)
    const [stressR2, setStressR2] = useState(0)
    const [stressHold, setStressHold] = useState(0)
    const [stressDeleted, setStressDeleted] = useState(0)
    const [stressStock, setStressStock] = useState(0)
    const [supportsR0, setSupportsR0] = useState(0)
    const [supportsR1, setSupportsR1] = useState(0)
    const [supportsR2, setSupportsR2] = useState(0)
    const [supportsHold, setSupportsHold] = useState(0)
    const [supportsDeleted, setSupportsDeleted] = useState(0)
    const [supportsStock, setSupportsStock] = useState(0)
    const [materialsR0, setMaterialsR0] = useState(0)
    const [materialsR1, setMaterialsR1] = useState(0)
    const [materialsR2, setMaterialsR2] = useState(0)
    const [materialsHold, setMaterialsHold] = useState(0)
    const [materialsDeleted, setMaterialsDeleted] = useState(0)
    const [materialsStock, setMaterialsStock] = useState(0)
    const [issuerR0, setIssuerR0] = useState(0)
    const [issuerR1, setIssuerR1] = useState(0)
    const [issuerR2, setIssuerR2] = useState(0)
    const [issuerHold, setIssuerHold] = useState(0)
    const [issuerDeleted, setIssuerDeleted] = useState(0)
    const [issuerStock, setIssuerStock] = useState(0)
    const [toIssueR0, setToIssueR0] = useState(0)
    const [toIssueR1, setToIssueR1] = useState(0)
    const [toIssueR2, setToIssueR2] = useState(0)
    const [toIssueHold, setToIssueHold] = useState(0)
    const [toIssueDeleted, setToIssueDeleted] = useState(0)
    const [toIssueStock, setToIssueStock] = useState(0)
    const [issuedR0, setIssuedR0] = useState(0)
    const [issuedR1, setIssuedR1] = useState(0)
    const [issuedR2, setIssuedR2] = useState(0)
    const [issuedDeleted, setIssuedDeleted] = useState(0)
    const [issuedStock, setIssuedStock] = useState(0)
    const [totalR0, setTotalR0] = useState(0)
    const [totalR1, setTotalR1] = useState(0)
    const [totalR2, setTotalR2] = useState(0)
    const [totalHold, setTotalHold] = useState(0)
    const [totalDeleted, setTotalDeleted] = useState(0)
    const [totalStock, setTotalStock] = useState(0)
    const [model, setModel] = useState(0)

    const [progress, setProgress] = useState(0)
    const [progressIso, setProgressIso] = useState(0)
    const [realProgress, setRealProgress] = useState(0)
    const [realProgressISO, setRealProgressIso] = useState(0)

    const [realProgressTD, setRealProgressTD] = useState()
    const [realProgressIsoTD, setRealProgressIsoTD] = useState()
    const [realProgressTDValue, setRealProgressTDValue] = useState()
    const [realProgressIsoTDValue, setRealProgressIsoTDValue] = useState()

    useEffect(()=>{
        if(process.env.REACT_APP_PROGRESS === "0"){
            fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/updateStatus")
            .then(response => response.json())
            .then(json => {
                setDesignR0(json["designR0"])
                setDesignR1(json["designR1"])
                setDesignR2(json["designR2"])
                setDesignHold(json["designHold"])
                setDesignDeleted(json["designDeleted"])
                setDesignStock(json["designStock"])
                setStressR0(json["stressR0"])
                setStressR1(json["stressR1"])
                setStressR2(json["stressR2"])
                setStressHold(json["stressHold"])
                setStressDeleted(json["stressDeleted"])
                setStressStock(json["stressStock"])
                setSupportsR0(json["supportsR0"])
                setSupportsR1(json["supportsR1"])
                setSupportsR2(json["supportsR2"])
                setSupportsHold(json["supportsHold"])
                setSupportsDeleted(json["supportsDeleted"])
                setSupportsStock(json["supportsStock"])
                setMaterialsR0(json["materialsR0"])
                setMaterialsR1(json["materialsR1"])
                setMaterialsR2(json["materialsR2"])
                setMaterialsHold(json["materialsHold"])
                setMaterialsDeleted(json["materialsDeleted"])
                setMaterialsStock(json["materialsStock"])
                setIssuerR0(json["issuerR0"])
                setIssuerR1(json["issuerR1"])
                setIssuerR2(json["issuerR2"])
                setIssuerHold(json["issuerHold"])
                setIssuerDeleted(json["issuerDeleted"])
                setIssuerStock(json["issuerStock"])
                setToIssueR0(json["toIssueR0"])
                setToIssueR1(json["toIssueR1"])
                setToIssueR2(json["toIssueR2"])
                setToIssueHold(json["toIssueHold"])
                setToIssueDeleted(json["toIssueDeleted"])
                setToIssueStock(json["toIssueStock"])
                setIssuedR0(json["issuedR0"])
                setIssuedR1(json["issuedR1"])
                setIssuedR2(json["issuedR2"])
                setIssuedDeleted(json["issuedDeleted"])
                setIssuedStock(json["issuedStock"])
                setTotalR0(json["totalR0"])
                setTotalR1(json["totalR1"])
                setTotalR2(json["totalR2"])
                setTotalHold(json["totalHold"])
                setTotalDeleted(json["totalDeleted"])
                setTotalStock(json["totalStock"])
                
            }) 
        }else{
            fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/updateStatus")
                .then(response => response.json())
                .then(json => {
                    console.log(json["model"])
                    setDesignR0(json["designR0"])
                setDesignR1(json["designR1"])
                setDesignR2(json["designR2"])
                setDesignHold(json["designHold"])
                setDesignDeleted(json["designDeleted"])
                setDesignStock(json["designStock"])
                setStressR0(json["stressR0"])
                setStressR1(json["stressR1"])
                setStressR2(json["stressR2"])
                setStressHold(json["stressHold"])
                setStressDeleted(json["stressDeleted"])
                setStressStock(json["stressStock"])
                setSupportsR0(json["supportsR0"])
                setSupportsR1(json["supportsR1"])
                setSupportsR2(json["supportsR2"])
                setSupportsHold(json["supportsHold"])
                setSupportsDeleted(json["supportsDeleted"])
                setSupportsStock(json["supportsStock"])
                setMaterialsR0(json["materialsR0"])
                setMaterialsR1(json["materialsR1"])
                setMaterialsR2(json["materialsR2"])
                setMaterialsHold(json["materialsHold"])
                setMaterialsDeleted(json["materialsDeleted"])
                setMaterialsStock(json["materialsStock"])
                setIssuerR0(json["issuerR0"])
                setIssuerR1(json["issuerR1"])
                setIssuerR2(json["issuerR2"])
                setIssuerHold(json["issuerHold"])
                setIssuerDeleted(json["issuerDeleted"])
                setIssuerStock(json["issuerStock"])
                setToIssueR0(json["toIssueR0"])
                setToIssueR1(json["toIssueR1"])
                setToIssueR2(json["toIssueR2"])
                setToIssueHold(json["toIssueHold"])
                setToIssueDeleted(json["toIssueDeleted"])
                setToIssueStock(json["toIssueStock"])
                setIssuedR0(json["issuedR0"])
                setIssuedR1(json["issuedR1"])
                setIssuedR2(json["issuedR2"])
                setIssuedDeleted(json["issuedDeleted"])
                setIssuedStock(json["issuedStock"])
                setTotalR0(json["totalR0"])
                setTotalR1(json["totalR1"])
                setTotalR2(json["totalR2"])
                setTotalHold(json["totalHold"])
                setTotalDeleted(json["totalDeleted"])
                setTotalStock(json["totalStock"])
                setModel(json["modelCount"])
                }) 
                const options = {
                    method: "GET",
                }
                fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/currentProgressISO", options)
                .then(response => response.json())
                .then(async json =>{
                     setProgressIso(json.progressISO)
                     setRealProgressIso(json.realprogressISO)
                })
                
                fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/currentProgress", options)
                .then(response => response.json())
                .then(async json =>{
                     setProgress(json.progress)
                     setRealProgress(json.realprogress)
                })

        }
        console.log(props.currentRole)
        if(props.currentRole === "SpecialityLead"){
            setRealProgressTD(<td  className="statusTable__header" style={{backgroundColor:"orange"}}>R.nP.</td>)
            setRealProgressIsoTD(<td  className="statusTable__header" style={{backgroundColor:"orange"}}>R.P. ISO</td>)
            setRealProgressTDValue(<td rowSpan="6" className="statusTable__state">{realProgress}%</td>)
            setRealProgressIsoTDValue(<td rowSpan="6" className="statusTable__state">{realProgressISO}%</td>)
        }else{
            setRealProgressTD(null)
            setRealProgressIsoTD(null)
            setRealProgressTDValue(null)
            setRealProgressIsoTDValue(null)
        }
        
    },[props.updateData, props.currentRole])

    return (
        <td className="statusTable__td">
            <table className="statusTable__table">
                <tbody className="statusTable__body">
                    <tr>
                        <td  className="statusTable__header" >M:{model}</td>
                        <td  className="statusTable__header" >Design</td>
                        <td  className="statusTable__header" >Stress</td>
                        <td  className="statusTable__header" >Supports</td>
                        <td  className="statusTable__header" >Materials</td>
                        <td  className="statusTable__header" >Issuer</td>
                        <td  className="statusTable__header" >To issue</td>
                        <td  className="statusTable__header" style={{backgroundColor:"#00a000"}}>Issued</td>
                        <td  className="statusTable__header" style={{backgroundColor:"blue"}}>Total</td>
                        <td  className="statusTable__header" style={{backgroundColor:"orange"}}>P.</td>
                        <td  className="statusTable__header" style={{backgroundColor:"orange"}}>P.ISO</td>
                        {realProgressTD}
                        {realProgressIsoTD}
                    </tr>
                    <tr>
                        <td className="statusTable__header" style={{backgroundColor:"lightblue"}}>R0</td>
                        <td className="statusTable__state">{designR0}</td>
                        <td className="statusTable__state">{stressR0}</td>
                        <td className="statusTable__state">{supportsR0}</td>
                        <td className="statusTable__state">{materialsR0}</td>
                        <td className="statusTable__state">{issuerR0}</td>
                        <td className="statusTable__state">{toIssueR0}</td>
                        <td className="statusTable__state">{issuedR0}</td>   
                        <td className="statusTable__state">{totalR0}</td>  
                        <td rowSpan="6" className="statusTable__state">{progress}%</td>  
                        <td rowSpan="6" className="statusTable__state">{progressIso}%</td>  
                        {realProgressTDValue}
                        {realProgressIsoTDValue} 
                    </tr>
                    <tr>
                        <td className="statusTable__header" style={{backgroundColor:"lightblue"}}>R1</td>
                        <td className="statusTable__state">{designR1}</td>
                        <td className="statusTable__state">{stressR1}</td>
                        <td className="statusTable__state">{supportsR1}</td>
                        <td className="statusTable__state">{materialsR1}</td>
                        <td className="statusTable__state">{issuerR1}</td>
                        <td className="statusTable__state">{toIssueR1}</td>
                        <td className="statusTable__state">{issuedR1}</td>   
                        <td className="statusTable__state">{totalR1}</td> 
                  </tr>
                  <tr>
                        <td className="statusTable__header" style={{backgroundColor:"lightblue"}}>R2</td>
                        <td className="statusTable__state">{designR2}</td>
                        <td className="statusTable__state">{stressR2}</td>
                        <td className="statusTable__state">{supportsR2}</td>
                        <td className="statusTable__state">{materialsR2}</td>
                        <td className="statusTable__state">{issuerR2}</td>
                        <td className="statusTable__state">{toIssueR2}</td>
                        <td className="statusTable__state">{issuedR2}</td>   
                        <td className="statusTable__state">{totalR2}</td> 
                  </tr>
                  <tr>
                        <td className="statusTable__header" style={{backgroundColor:"red"}}>On hold</td>
                        <td className="statusTable__state">{designHold}</td>
                        <td className="statusTable__state">{stressHold}</td>
                        <td className="statusTable__state">{supportsHold}</td>
                        <td className="statusTable__state">{materialsHold}</td>
                        <td className="statusTable__state">{issuerHold}</td>
                        <td className="statusTable__state">{toIssueHold}</td>
                        <td className="statusTable__state">-</td>   
                        <td className="statusTable__state">{totalHold}</td> 
                  </tr>
                  <tr>
                        <td className="statusTable__header" style={{backgroundColor:"grey"}}>Deleted</td>
                        <td className="statusTable__state">{designDeleted}</td>
                        <td className="statusTable__state">{stressDeleted}</td>
                        <td className="statusTable__state">{supportsDeleted}</td>
                        <td className="statusTable__state">{materialsDeleted}</td>
                        <td className="statusTable__state">{issuerDeleted}</td>
                        <td className="statusTable__state">{toIssueDeleted}</td>
                        <td className="statusTable__state">{issuedDeleted}</td>   
                        <td className="statusTable__state">{totalDeleted}</td> 
                  </tr>
                  <tr>
                        <td className="statusTable__header" style={{backgroundColor:"blue"}}>Stock</td>
                        <td className="statusTable__state">{designStock}</td>
                        <td className="statusTable__state">{stressStock}</td>
                        <td className="statusTable__state">{supportsStock}</td>
                        <td className="statusTable__state">{materialsStock}</td>
                        <td className="statusTable__state">{issuerStock}</td>
                        <td className="statusTable__state">{toIssueStock}</td>
                        <td className="statusTable__state">{issuedStock}</td>   
                        <td className="statusTable__state">{totalStock}</td> 
                  </tr>
                </tbody>
            </table>
        </td>
    );
};

export default StateTable;