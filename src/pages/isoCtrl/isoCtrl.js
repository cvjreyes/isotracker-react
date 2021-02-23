import DataTable from "../../components/datatable/datatable"
import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"
import "./isoCtrl.css"
import React, { useState } from 'react'
import ActionButtons from "../../components/actionBtns/actionBtns"
import ActionExtra from "../../components/actionExtra/actionExtra"
import CommentBox from "../../components/commentBox/commentBox"
import ProgressTable from "../../components/progressTable/progressTable"
import SelectPag from "../../components/selectPag/selectPag"
import CheckInTable from "../../components/checkInTable/checkInTable"
import NavBar from '../../components/navBar/navBar'
import MyTrayBtn from "../../components/myTrayBtn/myTrayBtn"
import MyTrayTable from "../../components/myTrayTable/myTrayTable"


const IsoCtrl = () => {

    const [currentTab, setCurrentTab] = useState("History") //Controla la tabla y botones que se muestran
    const[pagination, setPagination] = useState(8) //Controla el numero de entradas por pagina de la tabla
    const user = "admin" //De momento esta variable controla el tipo de user

    console.log(currentTab)

    //La altura de la tabla es fija en funcion de la paginacion para evitar que los botones se muevan
    var dataTableHeight = 8

    if (pagination === 8){
        dataTableHeight = "490px"
    }if(pagination === 25){
        dataTableHeight = "1160px"
    }if(pagination === 50){
        dataTableHeight = "2130px"
    }if(pagination === 100){
        dataTableHeight = "4070px"
    }

    //Componentes de la pagina que varian en funcion del estado
    var uploadButton, uploadDefButton, actionButtons, actionText, actionExtra, commentBox, progressTableWidth
    var currentTabText = currentTab
    var tableContent = <DataTable pagination = {pagination} />
    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>

    if(currentTab === "Upload IsoFiles"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", width:"180px"}}><b>Upload</b></button>
        tableContent = <DragAndDrop/>
        pageSelector = null
        uploadDefButton = <div><br></br><button class="btn btn-info btn-lg" style={{width: "100%"}}>Click here to upload</button></div>
    }if(currentTab === "Design"){
        uploadButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", width:"180px"}} onClick={() => setCurrentTab("Upload IsoFiles")}><b>Upload</b></button>
    }if(currentTab === "LDE/IsoControl"){
        actionExtra = <ActionExtra/>
    }if(currentTab === "CheckBy"){
        tableContent = <CheckInTable/>
    }if(currentTab === "MyTray"){
        tableContent = <MyTrayTable pagination = {pagination}/>
    }

    if(currentTab !== "Upload IsoFiles" && currentTab !== "Status" && currentTab !== "History" && currentTab !== "CheckBy"){
        actionText = <b className="progress__text">Click an action for selected IsoFiles:</b>
        actionButtons = <ActionButtons currentTab = {currentTab}/>
        commentBox = <CommentBox/>
    }

    //El usuario admin ve mas parte de la tabla de progreso
    if (user === "admin"){
        progressTableWidth = "35%";
    }else{
        progressTableWidth = "15%";
    }
    
    return (
        
        <body>
            <NavBar onChange={value => setCurrentTab(value)}/>
            <div className="isoCtrl__container">     
                <center>
                    
                    <h2 className="title__container">
                        <b >      
                            <i className="iso__title">IsoTracker</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">{currentTabText}</h3>
                </center>
                
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <MyTrayBtn onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                            <td className="reportBtns__container" style={{width:"380px"}}>
                                
                                <ReportBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                                
                            </td>
                            <td>
                                {uploadButton}
                            </td>   
                                           
                            <td style={{width: progressTableWidth,position:"inline-block", right: "0"}}>
                                <ProgressTable user = {user} />
                            </td>    
                            
                        </tr>
                    </tbody>
                </table>              
                
                <div className="stateTable__container">
                    <td style={{width: "75 %"}}>
                        <StateTable/>
                    </td>
                </div>
                <div style={{position: "absolute"}}>
                  {pageSelector}
                </div>
                    
                
                <div style={{height: dataTableHeight}}>
                    <br></br>
                    <br></br>
                    {uploadDefButton}   
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
