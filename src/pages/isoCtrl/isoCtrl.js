import DataTable from "../../components/datatable/datatable"
import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"
import "./styles.css"
import React, { useState } from 'react';
import ActionButtons from "../../components/actionBtns/actionBtns"

const IsoCtrl = () => {
    const [currentTab, setCurrentTab] = useState()
    console.log(currentTab)
    var uploadButton, uploadDefButton, progressText, progressISOText, actionButtons
    var currentTabText = currentTab
    var tableContent = <DataTable/>

    if(currentTab === "Upload IsoFiles"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8"}}><b>Upload</b></button>
        tableContent = <DragAndDrop/>
        uploadDefButton = <button class="btn btn-info btn-lg" style={{width: "100%"}}>Click here to upload</button>
    }if(currentTab === "Design"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue"}} onClick={() => setCurrentTab("Upload IsoFiles")}><b>Upload</b></button>
        actionButtons = <ActionButtons currentTab = {currentTab}/>
    }if(currentTab === "Status"){
        progressText = <h4 className = "progress__text">Progress: 0%  / Real Progress: 0%</h4>
        progressISOText = <h4 className = "progress__text">Progress ISO: 45%  / Real Progress ISO: 45%</h4>
    }



    return (
        <body>
            <div className="container">
                <center>
                    <br></br>
                    <h2 className="title__container">
                        <b>
                            <i className="iso__title">IsoTracker</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">{currentTabText}</h3>

                    {progressText}
                    {progressISOText}
                </center>
                <br></br>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td style={{paddingRight:"0px"}}>
                                <ReportBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                                
                            </td>
                            <td style={{marginLeft:"5px"}}>
                                {uploadButton}
                            </td>
                            <td style={{width: "64%"}}>
                                <StateTable/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <br></br>
                {uploadDefButton}
                {tableContent}
                <center>
                    
                    <b className="progress__text">Click and action for selected IsoFiles: </b>
                    {actionButtons}
                </center>
                
                <center className="navBtns__center">
                    
                    <NavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                    
                </center>
            </div>
        </body>

        
    );
};

export default IsoCtrl;
