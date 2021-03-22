import DataTable from "../../components/datatable/datatable"
import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"
import "./isoCtrl.css"
import React, { useState , useEffect} from 'react'
import ActionButtons from "../../components/actionBtns/actionBtns"
import ActionExtra from "../../components/actionExtra/actionExtra"
import CommentBox from "../../components/commentBox/commentBox"
import ProgressTable from "../../components/progressTable/progressTable"
import SelectPag from "../../components/selectPag/selectPag"
import CheckInTable from "../../components/checkInTable/checkInTable"
import NavBar from '../../components/navBar/navBar'
import MyTrayBtn from "../../components/myTrayBtn/myTrayBtn"
import MyTrayTable from "../../components/myTrayTable/myTrayTable"
import BinBtn from '../../components/binBtn/binBtn'
import BinTable from "../../components/binTable/binTable"
import StatusDataTable from "../../components/statusDataTable/statusDataTable"
import RoleDropDown from "../../components/roleDropDown/roleDropDown"



const IsoCtrl = () => {
   
    
    const[pagination, setPagination] = useState(8) //Controla el numero de entradas por pagina de la tabla
    const user = "admin" //De momento esta variable controla el tipo de user
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const [update, setUpdate] = useState(false);
    const [selected, setSelected] = useState([]);

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    
    var secureStorage = new SecureStorage(localStorage, {
        hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);
    
            return key.toString();
        },
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    
            data = data.toString();
    
            return data;
        },
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    
            data = data.toString(CryptoJS.enc.Utf8);
    
            return data;
        }
    });

    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("tab")) //Controla la tabla y botones que se muestran
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
    var uploadButton, uploadDefButton, actionButtons, actionText, actionExtra, commentBox, progressTableWidth, tableContent
    var currentTabText = currentTab
    tableContent = <DataTable onChange={value=> setSelected(value)} pagination = {pagination} currentTab = {currentTab} update={false}/>
    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>
    var currentUser = secureStorage.getItem('user')

    const body = {
        user: currentUser,
    }
    
    useEffect(()=>{
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch("http://localhost:5000/api/roles/user", options)
            .then(response => response.json())
            .then(json => {
                
                setRoles(json.roles);
                console.log(secureStorage.getItem('role'))
                if(secureStorage.getItem('role') !== null){
                    setCurrentRole(secureStorage.getItem('role'))
                }else{
                    secureStorage.setItem('role', json.roles[0])
                    setCurrentRole(secureStorage.getItem('role'))
                }
                }
            )
            .catch(error => {
                console.log(error);
            })    
    },[]);

    useEffect(()=>{
        console.log(selected)
        if(currentTab !== "My Tray"){
            tableContent = <DataTable onChange={value=> setSelected(value)} pagination = {pagination} currentTab = {currentTab} update = {true}/>
        }else{
            tableContent = <MyTrayTable  onChange={value=> setSelected(value)} currentTab = {currentTab} pagination = {pagination} currentRole = {currentRole} currentUser = {currentUser} update = {true}/>
        }
        actionButtons = <ActionButtons onChange={value => setSelected(value)} currentTab = {currentTab} user={currentUser} selected={selected}/>
    }, [selected])


    if(currentTab === "Upload IsoFiles"){
        secureStorage.setItem("tab", "Upload IsoFiles")
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
    }if(currentTab === "My Tray"){
        tableContent = <MyTrayTable  onChange={value=> setSelected(value)} pagination = {pagination} currentRole = {currentRole} currentUser = {currentUser} update = {false}/>
    }if(currentTab === "Recycle bin"){
        tableContent = <BinTable pagination = {pagination}/>
    }if(currentTab === "Status"){
        tableContent = <StatusDataTable pagination = {pagination}/>
    }

    if(currentTab !== "Upload IsoFiles" && currentTab !== "Status" && currentTab !== "History" && currentTab !== "CheckBy"){
        commentBox = <CommentBox/>
    }

    if(((currentRole === "Design" || currentRole === "DesignLead") && currentTab === "Design") || 
    ((currentRole === "Stress" || currentRole === "StressLead") && currentTab === "Stress") ||
    ((currentRole === "Supports" || currentRole === "SupportsLead") && currentTab === "Support") ||
    ((currentRole === "Materials") && currentTab === "Materials") ||
    ((currentRole === "Issuer") && currentTab === "Issuer") ||
    ((currentRole === "SpecialityLead" || currentTab ==="SpecialityLead") ||
    (currentTab=== "My Tray"))){
        actionText = <b className="progress__text">Click an action for selected IsoFiles:</b>
        actionButtons = <ActionButtons onChange={value => setSelected(value)} currentTab = {currentTab} user={currentUser} selected={selected}/>
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
                        <div className="roleSelector__container">
                            <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                         </div>
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
                <div style={{position: "absolute", width:"300px", overflow:"hidden"}}>
                  {pageSelector}
                  <BinBtn onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
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
