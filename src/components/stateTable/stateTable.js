//Tabla de estado de IsoTracker

import "./stateTable.css"
import React, { useState , useEffect} from 'react'

const StateTable = props =>{

    const [designUploadedCount, setDesignUploadedCount] = useState(0)
    const [designProgressCount, setDesignProgessCount] = useState(0)
    const [stressCount, setStressCount] = useState(0)
    const [supportsCount, setSupportsCount] = useState(0)
    const [onHoldCount, setOnHoldCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)
    const [deletedCount, setDeletedCount] = useState(0)
    const [materialsCount, setMaterialsCount] = useState(0)
    const [issuerCount, setIssuerCount] = useState(0)
    const [isocontrolToIssue, setIsocontrolToIssue] = useState(0)
    const [r0, setR0] = useState(0)
    const [r1, setR1] = useState(0)
    const [r2, setR2] = useState(0)
    const [model, setModel] = useState(0)

    console.log(designUploadedCount)

    useEffect(()=>{
        if(process.env.REACT_APP_PROGRESS === "0"){
            fetch("http://localhost:5000/updateStatus")
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setDesignUploadedCount(json["designUploaded"])
                setDesignProgessCount(json["designProgress"])
                setStressCount(json["stress"])
                setSupportsCount(json["supports"])
                setOnHoldCount(json["onHold"])
                setDeletedCount(json["deleted"])
                setMaterialsCount(json["materials"])
                setIssuerCount(json["issuer"])
                setIsocontrolToIssue(json["isocontrolToIssue"])
                setR0(json["r0"])
                setR1(json["r1"])
                setR2(json["r2"])
                setTotalCount(json["total"])
            }) 
        }else{
            fetch("http://localhost:5000/updateStatus")
                .then(response => response.json())
                .then(json => {
                    console.log(json)
                    setDesignUploadedCount(json["designUploaded"])
                    setDesignProgessCount(json["designProgress"])
                    setStressCount(json["stress"])
                    setSupportsCount(json["supports"])
                    setOnHoldCount(json["onHold"])
                    setDeletedCount(json["deleted"])
                    setMaterialsCount(json["materials"])
                    setIssuerCount(json["issuer"])
                    setIsocontrolToIssue(json["isocontrolToIssue"])
                    setR0(json["r0"])
                    setR1(json["r1"])
                    setR2(json["r2"])
                    setTotalCount(json["total"])
                    setModel(json["model"])
                }) 

        }
        
    },props.updateData)

    return (
        <td className="statusTable__td">
            <table className="statusTable__table">
                <tbody className="statusTable__body">
                    <tr>
                        <td  className="statusTable__header">Modelled</td>
                        <td  className="statusTable__header" colSpan="2">Design</td>
                        <td  className="statusTable__header">Stress</td>
                        <td  className="statusTable__header">Supports</td>
                        <td  className="statusTable__header">Materials</td>
                        <td  className="statusTable__header">Issuer</td>
                        <td  colSpan= "4"  className="statusTable__header">Isocontrol</td>
                        <td  className="statusTable__header" style={{backgroundColor:"gray"}}>Deleted</td>
                        <td  className="statusTable__header" style={{backgroundColor:"red"}}>On hold</td>
                        <td  className="statusTable__header" style={{backgroundColor:"blue"}}>Total</td>
                    </tr>
                    <tr>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">Uploaded</td>
                        <td className="statusTable__state">Progress</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">To Issue</td>   
                        <td style={{width: "3.7%"}} className="statusTable__state">R0</td>
                        <td style={{width: "3.7%"}} className="statusTable__state">R1</td>
                        <td style={{width: "3.7%"}} className="statusTable__state">R2</td>
                        <td className="statusTable__state">-</td>    
                        <td className="statusTable__state">-</td>    
                        <td className="statusTable__state">-</td>      
                    </tr>
                    <tr>
                        <td className="statusTable__value">{model}</td>
                        <td className="statusTable__value">{designUploadedCount}</td>
                        <td className="statusTable__value">{designProgressCount}</td>
                        <td className="statusTable__value">{stressCount}</td>
                        <td className="statusTable__value">{supportsCount}</td>
                        <td className="statusTable__value">{materialsCount}</td>
                        <td className="statusTable__value">{issuerCount}</td>
                        <td className="statusTable__value">{isocontrolToIssue}</td>   
                        <td className="statusTable__value">{r0}</td>
                        <td className="statusTable__value">{r1}</td>
                        <td className="statusTable__value">{r2}</td>
                        <td className="statusTable__value">{deletedCount}</td>
                        <td className="statusTable__value">{onHoldCount}</td>
                        <td className="statusTable__value">{totalCount}</td>   
                         

                        
                    </tr>
                </tbody>
            </table>
        </td>
    );
};

export default StateTable;