import DataTable from "../../components/datatable/datatable"
import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"
import "./styles.css"
import React, { useState } from 'react'
import ActionButtons from "../../components/actionBtns/actionBtns"
import ActionExtra from "../../components/actionExtra/actionExtra"
import CommentBox from "../../components/commentBox/commentBox"
import ProgressTable from "../../components/progressTable/progressTable"
import SelectPag from "../../components/selectPag/selectPag"
import CheckInTable from "../../components/checkInTable/checkInTable"
import NavBar from '../../components/navBar/navBar'

const IsoCtrl = () => {
    const [currentTab, setCurrentTab] = useState("History")
    const[pagination, setPagination] = useState(8)
    const user = "admin"

    console.log(currentTab)

    var dataTableHeight = 8

    if (pagination === 8){
        dataTableHeight = "380px"
    }if(pagination === 25){
        dataTableHeight = "1250px"
    }if(pagination === 50){
        dataTableHeight = "2500px"
    }if(pagination === 100){
        dataTableHeight = "5000px"
    }

    var uploadButton, uploadDefButton, actionButtons, actionText, actionExtra, commentBox, progressTableWidth
    var currentTabText = currentTab
    var tableContent = <DataTable pagination = {pagination} />
    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>
    if(currentTab === "Upload IsoFiles"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8"}}><b>Upload</b></button>
        tableContent = <DragAndDrop/>
        pageSelector = null
        uploadDefButton = <div><br></br><button class="btn btn-info btn-lg" style={{width: "100%"}}>Click here to upload</button></div>
    }if(currentTab === "Design"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue"}} onClick={() => setCurrentTab("Upload IsoFiles")}><b>Upload</b></button>
    }if(currentTab === "LDE/IsoControl"){
        actionExtra = <ActionExtra/>
    }if(currentTab === "CheckBy"){
        tableContent = <CheckInTable/>
    }

    if(currentTab !== "Upload IsoFiles" && currentTab !== "Status" && currentTab !== "History" && currentTab !== "CheckBy"){
        actionText = <b className="progress__text">Click an action for selected IsoFiles:</b>
        actionButtons = <ActionButtons currentTab = {currentTab}/>
        commentBox = <CommentBox/>
    }

    if (user === "admin"){
        progressTableWidth = "33%";
    }else{
        progressTableWidth = "15%";
    }
    
    return (
        
        <body>
            <NavBar onChange={value => setCurrentTab(value)}/>
            <div className="isoCtrl__container">   
                <td className="progressTable__container" style={{width: progressTableWidth}}>
                        <ProgressTable user = {user} />
                </td>   
                <center>
                    
                    <h2 className="title__container">
                        <b>
                            <i className="iso__title">IsoTracker</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">{currentTabText}</h3>
                </center>
                
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td style={{paddingRight:"0px"}}>
                                <ReportBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                                
                            </td>
                            <td>
                                {uploadButton}
                            </td>
                            <td style={{width: "75 %", float: "right"}}>
                                <StateTable/>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {uploadDefButton}
                {pageSelector}
                <div style={{height: dataTableHeight}}>
                    {tableContent}
                </div>
                <div className="bottom__container">
                    <center className="actionBtns__container">
                        {actionText}
                        {actionExtra}
                        {actionButtons}
                    </center>
                    <br></br>
                    <center className="commentBox__container">
                        {commentBox}
                    </center>
                 
                    
                </div>
            </div>
            <center className="navBtns__center">              
                <NavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>               
            </center>
            <br></br>
        </body>

        
    );
};

export default IsoCtrl;
