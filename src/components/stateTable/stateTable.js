//Tabla de estado de IsoTracker

import "./stateTable.css"

const StateTable = () =>{
    return (
        <td className="statusTable__td">
            <table className="statusTable__table">
                <tbody className="statusTable__body">
                    <tr>
                        <td  className="statusTable__header">Modelled</td>
                        <td  className="statusTable__header">Design</td>
                        <td  className="statusTable__header">Stress</td>
                        <td  className="statusTable__header">Supports</td>
                        <td  className="statusTable__header">Materials</td>
                        <td  className="statusTable__header">Issuer</td>
                        <td  colSpan= "4"  className="statusTable__header">Isocontrol</td>
                        <td  className="statusTable__header">Total</td>
                    </tr>
                    <tr>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">Uploaded</td>
                        <td className="statusTable__state">In Progress</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">-</td>
                        <td className="statusTable__state">To Issue</td>   
                        <td style={{width: "3.7%"}} className="statusTable__state">R0</td>
                        <td style={{width: "3.7%"}} className="statusTable__state">R1</td>
                        <td style={{width: "3.7%"}} className="statusTable__state">R2</td>
                        <td className="statusTable__state">-</td>         
                    </tr>
                    <tr>
                        <td className="statusTable__value">4532</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>
                        <td className="statusTable__value">0</td>   
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value"></td>
                        <td className="statusTable__value">0</td>   
                        
                    </tr>
                </tbody>
            </table>
        </td>
    );
};

export default StateTable;