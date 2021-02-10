import "./reportBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const Report_btns = props => {
    var StatusButton, HistoryButton
    if(props.currentTab === "Status"){
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", marginRight:"40px"}}><b>Status</b></button>
    }else{
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", marginRight:"40px"}} onClick={() => {props.onChange("Status")}}><b>Status</b></button>
    }
    if(props.currentTab === "History"){
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8"}}><b>History</b></button>
    }else{
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue"}} onClick={() => {props.onChange("History");}}><b>History</b></button>
    }
    return(
        <td className="td__btns">
            {StatusButton}
            {HistoryButton}
        </td>
    );
};

export default Report_btns;