//Tabla de estado de IsoTracker

import "./stateTable.css"
import React, { useState , useEffect} from 'react'

const StateTable = props =>{

    const [designUploadedCount, setDesignUploadedCount] = useState(0)
    const [designProgressCount, setDesignProgessCount] = useState(0)
    const [stressCount, setStressCount] = useState(0)
    const [supportsCount, setSupportsCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(()=>{
        fetch("http://localhost:5000/updateStatus")
        .then(response => response.json())
        .then(json => {
            setDesignUploadedCount(json["designUploaded"])
            setDesignProgessCount(json["designProgress"])
            setStressCount(json["stress"])
            setSupportsCount(json["supports"])
      }) 
     setTotalCount(designUploadedCount+designProgressCount+stressCount+supportsCount)
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
                        <td  className="statusTable__header" style={{backgroundColor:"blue"}}>Total</td>
                        <td  className="statusTable__header" style={{backgroundColor:"red"}}>On hold</td>
                    </tr>
                    <tr>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">Uploaded</td>
                        <td className="statusTable__state">In Progress</td>
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
                    </tr>
                    <tr>
                        <td className="statusTable__value">4532</td>
                        <td className="statusTable__value">{designUploadedCount}</td>
                        <td className="statusTable__value">{designProgressCount}</td>
                        <td className="statusTable__value">{stressCount}</td>
                        <td className="statusTable__value">{supportsCount}</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>   
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value">{totalCount}</td>   
                        <td className="statusTable__value">0</td> 

                        
                    </tr>
                </tbody>
            </table>
        </td>
    );
};

export default StateTable;