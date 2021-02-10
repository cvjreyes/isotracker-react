import "./reportBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const Report_btns = (props, activate) => {
    const [tab, setTab] = useState()
    var statusButton, historyButton
    if(tab === "status"){
        statusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", marginRight:"25px"}}><b>Status</b></button>
    }else{
        statusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", marginRight:"25px"}} onClick={() => {(props.onChange("status"));setTab("status")}}><b>Status</b></button>
    }
    if(tab === "history"){
        historyButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8"}}><b>History</b></button>
    }else{
        historyButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue"}} onClick={() => {(props.onChange("history"));setTab("history")}}><b>History</b></button>
    }
    return(
        <td className="td__btns">
            {statusButton}
            {historyButton}
        </td>
    );
};

export default Report_btns;