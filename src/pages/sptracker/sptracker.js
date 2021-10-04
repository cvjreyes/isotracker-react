import "./sptracker.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import CSPTrackerLogo from "../../assets/images/csptracker.svg"
import RoleDropDown from '../../components/roleDropDown/roleDropDown'

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import SelectPag from "../../components/selectPag/selectPag"
import CSPTrackerdDataTable from "../../components/csptrackerDataTable/csptrackerDataTable"
import HotTable from "@handsontable/react"

import SaveIcon from "../../assets/images/save.svg"
import AlertF from "../../components/alert/alert"
import CSPTrackerRequestPopUp from "../../components/csptrackerRequestPopUp/csptrackerRequestPopUp"
import CSPTrackerdRequestsDataTable from "../../components/csptrackerRequestsDataTable/csptrackerRequestsDataTable"

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import Reports from "../../assets/images/view_requests.svg"
import Back from "../../assets/images/back.svg"

const CSPTracker = () => {

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

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 250,
      }

    const [currentRole, setCurrentRole] = useState();
    const [currentTab, setCurrentTab] = useState("View")
    const [roles, setRoles] = useState();
    const [pagination, setPagination] = useState(10)

    const [successAlert, setSuccessAlert] = useState(false);
    const [uploadDrawingSuccess, setUploadDrawingSuccess] = useState(false);
    const [updateDrawingSuccess, setUpdateDrawingSuccess] = useState(false);
    const [drawingError, setDrawingError] = useState(false);
    const [noTagError, setNoTagError] = useState(false);
    const [invalidFieldError, setInvalidFieldError] = useState(false);
    const [errorIndex, setErrorIndex] = useState(null);
    const [warningBlankRequest, setWarningBlankRequest] = useState(false)
    const [requestSuccess, setRequestSuccess] = useState(false)
    const [existsRequest, setExistsRequest] = useState(false)

    const [viewData, setViewData] = useState()
    const [editData, setEditData] = useState()
    const [descriptionPlaneData, setDescriptionPlaneData] = useState()
    const [diametersData, setDiametersData] = useState()
    const [ratingData, setRatingData] = useState()
    const [specData, setSpecData] = useState()
    const [endPreparationData, setEndPrepartaionData] = useState()
    const [boltTypesData, setBoltTypesData] = useState()

    const [busy, setBusy] = useState(false)
    const [editingUser, setEditingUser] = useState()

    const [updateData, setUpdateData] = useState(false)    

    const history = useHistory()

    useEffect(()=>{
        if(!secureStorage.getItem("user")){
            history.push("/"+process.env.REACT_APP_PROJECT+"/");
        }
    }, [])

    var currentUser = secureStorage.getItem('user')

    let p1bore, p2bore, p3bore = ""

    if(process.env.REACT_APP_MMDN === "0"){
        p1bore = "p1diameter_nps"
        p2bore = "p2diameter_nps"
        p3bore = "p3diameter_nps"
    }else{
        p1bore = "p1diameter_dn"
        p2bore = "p2diameter_dn"
        p3bore = "p3diameter_dn"
    }

    useEffect(()=>{
        const body = {
            user: currentUser,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/user", options)
            .then(response => response.json())
            .then(json => {
                setRoles(json.roles);
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
            
    },[currentRole]);

    useEffect(()=>{
        const body = {
            user: currentUser,
        }
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/exitEditCSP", options)
            .then(response => response.json())
            .then(async json => {

            })

    },[updateData])

    useEffect(async()=>{
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker", options)
            .then(response => response.json())
            .then(async json => {
                await setEditData(json.rows)
            })

        if(currentTab === "View"){  
    
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getListsData", options)
            .then(response => response.json())
            .then(async json => {
                await setDescriptionPlaneData(json.descriptionPlaneData)
                await setDiametersData(json.diametersData)
                await setRatingData(json.ratingData)
                await setSpecData(json.specData)
                await setEndPrepartaionData(json.endPreparationData)
                await setBoltTypesData(json.boltTypesData)
            })
        }    
    }, [currentTab])

    function uploadSuccess(){
        setUploadDrawingSuccess(true)
    }

    function updateSuccess(){
        setUpdateDrawingSuccess(true)
    }

    function drawingUploadError(){
        setDrawingError(true)
    }

    function errorBlankRequest(){
        setWarningBlankRequest(true)
    }

    function successRequest(){
        setRequestSuccess(true)
    }

    function existsErrorRequest(){
        setExistsRequest(true)
    }

    function handleOnIdle(){
        saveChanges()
        const body = {
            user: currentUser,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/exitEditCSP", options)
            .then(response => response.json())
            .then(async json => {

            })
        secureStorage.clear()
        history.push("/" + process.env.REACT_APP_PROJECT)
    }

    async function handleToggle(){
        if(currentTab === "View"){
            const body = {
                user: currentUser,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/editCSP", options)
            .then(response => response.json())
            .then(async json => {
                if(json.user){
                    await setBusy(true)
                    await setEditingUser(json.user)
                }else{
                    await setBusy(false)
                }
                await setCurrentTab("Edit")
            })
            
        }else{
            const body = {
                user: currentUser,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/exitEditCSP", options)
            .then(response => response.json())
            .then(async json => {
                if(json.success){
                    await saveChanges()
                    await setCurrentTab("View")
                }
            })
            
        }
    }

    async function addRow(){
        let rows = editData
        //rows.push({tag:null, description: null, description_plan_code: null, drawing_filename: null, description_iso: null, ident: null, p1diameter_dn: null, p1diameter_nps: null, p2diameter_dn: null, p2diameter_nps: null, p3diameter_dn: null, p3diameter_nps: null, rating: null, spec: null, face_to_face: null, end_preparation: null, description_drawing: null, bolts: null, bolt_type: null, ready_load: null, ready_e3d: null, comments: null})
        rows.push({tag:"", quantity: "", description: "", description_plan_code: "", drawing_filename: "", description_iso: "", ident: "", p1diameter_dn: "", p1diameter_nps: "", p2diameter_dn: "", p2diameter_nps: "", p3diameter_dn: "", p3diameter_nps: "", rating: "", spec: "", type: "", end_preparation: "", description_drawing: "", face_to_face: "", bolts: "", bolt_type: "", ready_load: "", ready_e3d: "", comments: ""})
        await setEditData(rows)
        await setUpdateData(!updateData)
      }

    async function saveChanges(){

        const body = {
            rows: editData,
            email: currentUser
        }
        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/tags", options)
        .then(response => response.json())
        .then(async json =>{
            let unique = true
            if(json.none){

            }else{
                let tags = []
                for(let i = 0; i < editData.length; i++){
                    if(tags.indexOf(editData[i].tag) > -1 && editData[i].tag !== null){
                        unique = false
                        await setErrorIndex("Repeated tag at entry " + i +"!")             
                    }else{
                        tags.push(editData[i].tag)
                    }
                }
            }
            
            if(!unique){
                await setNoTagError(true)
            }
            options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
            fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitCSP", options)
            .then(response => response.json())
            .then(async json =>{
                if(json.success){
                    await setSuccessAlert(true)
                }
            })
                                
        })                
             
    }

    async function updateDataMethod(){
        setUpdateData(!updateData)
    }

    async function downloadReport(){
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/downloadCSP/")
        .then(response => response.json())
        .then(json => {
            const headers = ["Tag", "Quantity", "Type", "Description", "Drawing description", "Iso description", "Ident", "P1Bore", "P2Bore", "P3Bore", "Rating", "Spec", "End preparation", "Face to face", "Bolts", "FLG Short Code", "Comments", "Ready to Load", "Ready in E3D", "Updated"]
            const apiData = JSON.parse(json)
            const fileName = "CSPTracker report"

            const fileType =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            const header_cells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1', 'P1', 'Q1', 'R1', 'S1', 'T1', 'U1', 'V1', 'W1']
            const fileExtension = ".xlsx";

            let wscols = []
            for(let i = 0; i < headers.length; i++){
                wscols.push({width:35})
            }

            const ws = XLSX.utils.json_to_sheet(apiData);   
            ws["!cols"] = wscols
            for(let i = 0; i < headers.length; i++){
                ws[header_cells[i]].v = headers[i]
            }
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + fileExtension);
        })
    }

    document.body.style.zoom = 0.8

    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>

    var dataTableHeight = "570px"

    if (pagination === 10){
        dataTableHeight = "570px"
    }if(pagination === 25){
        dataTableHeight = "1240px"
    }if(pagination === 50){
        dataTableHeight = "2330px"
    }if(pagination === 100){
        dataTableHeight = "4520px"
    }if(pagination === 500){
        dataTableHeight = "19000px"    
    }

    let editBtn, addRowBtn, saveBtn, upload, requestBtn, notificationsBtn, designNotificationsBtn = null
    let table = <CSPTrackerdDataTable currentRole = {currentRole} updateDataMethod = {updateDataMethod.bind(this)} updateData = {updateData} uploadDrawingSuccess = {uploadSuccess.bind(this)} updateDrawingSuccess = {updateSuccess.bind(this)} drawingUploadError={drawingUploadError.bind(this)}/>
    if(currentRole === "Materials"){
        editBtn = <label class="switchBtn" style={{width:"145px"}}>
                    <p className="navBar__button__text" style={{width:"100px", marginTop:"4px"}}>Edit mode</p>
                    <input type="checkbox" id="edit" onClick={()=>handleToggle()}/>
                    <div class="slide round"></div>
                </label>   
                   
        if(currentTab === "Edit"){
            notificationsBtn = null
        }
        else if(currentTab !== "Requests"){
            notificationsBtn = <button className="navBar__button" onClick={()=>setCurrentTab("Requests")} style={{width:"120px", marginTop:"5px"}}><img src={Reports} alt="hold" className="navBar__icon" style={{marginRight:"4px"}}></img><p className="navBar__button__text">Requests</p></button>
        }else{
            notificationsBtn = <button className="navBar__button" onClick={()=>setCurrentTab("View")} style={{backgroundColor:"#99C6F8", width:"120px", marginTop:"5px"}}><img src={Back} alt="hold" className="navBar__icon" style={{marginRight:"4px"}}></img><p className="navBar__button__text">Back</p></button>
            editBtn = <label class="switchBtn" style={{width:"145px"}}>
            <p className="navBar__button__text" style={{width:"100px", marginTop:"4px"}}>Edit mode</p>
            <input type="checkbox" id="edit" disabled/>
            <div class="slide round"></div>
        </label>
        }
    }

    if(currentRole === "Design"){
        requestBtn = <CSPTrackerRequestPopUp errorBlankRequest={errorBlankRequest.bind(this)} successRequest={successRequest.bind(this)} existsErrorRequest={existsErrorRequest.bind(this)}/>
    }

    if(currentRole === "Materials"){
        pageSelector = <div style={{marginLeft:"87%", position:"absolute"}}><SelectPag onChange={value => setPagination(value)} pagination = {pagination}/></div>
    }else if(currentRole === "Design"){
        pageSelector = <div style={{marginLeft:"86%"}}><SelectPag onChange={value => setPagination(value)} pagination = {pagination}/></div>  
    }else{
        pageSelector = <div style={{marginLeft:"94%"}}><SelectPag onChange={value => setPagination(value)} pagination = {pagination}/></div>
    }

    if(currentTab === "View"){
        table = <CSPTrackerdDataTable pagination={pagination} currentRole = {currentRole} updateDataMethod = {updateDataMethod.bind(this)} updateData = {updateData} uploadDrawingSuccess = {uploadSuccess.bind(this)} updateDrawingSuccess = {updateSuccess.bind(this)} drawingUploadError={drawingUploadError.bind(this)}/>
        
        addRowBtn = null
        saveBtn = null
        
    }else if(currentTab === "Edit"){
        if(!busy){
            table = <HotTable
            data={editData}
            colHeaders = {["<b>TAG</b>", "<b>QUANTITY</b>", "<b>TYPE</b>", "<b>DESCRIPTION</b>", "<b>DRAWING DESCRIPTION</b>", "<b>DESCRIPTION ISO</b>", "<b>IDENT</b>", "<b>P1BORE</b>", "<b>P2BORE</b>", "P3BORE", "<b>RATING</b>", "<b>SPEC</b>", "<b>END PREPARATION</b>", "FACE TO FACE", "<b>BOLTS</b>", "FLG SHORT CODE", "COMMENTS"]}
            rowHeaders={true}
            width="2200"
            height="635"
            settings={settings} 
            manualColumnResize={true}
            manualRowResize={true}
            columns= {[{ data: "tag", type:'text'}, {data:"quantity", type:"numeric"}, {data: "type", type:"text"}, { data: "description", type:'text'}, {data: "description_plan_code", type:"dropdown", allowInvalid:true, source: descriptionPlaneData}, {data: "description_iso", type:"text"},{data: "ident", type:"text"}, {data: p1bore, type:"dropdown", strict:"true", source: diametersData}, {data: p2bore, type:"dropdown", strict:"true", source: diametersData}, {data: p3bore, type:"dropdown", strict:"true", source: diametersData}, {data: "rating", type:"dropdown", strict:"true", source: ratingData}, {data: "spec", type:"dropdown", strict:"true", source: specData},{data: "end_preparation", type:"dropdown", strict:"true", source: endPreparationData}, {data: "face_to_face", type:"text"}, {data: "bolts", type:"dropdown", strict:"true", source:["YES", "NO"]}, {data: "bolt_type", type:"dropdown", strict:"true", source: boltTypesData}, {data:"comments", type:"text"}]}
            />
          
            pageSelector = null
            dataTableHeight= "700px"
            addRowBtn = <button class="btn btn-sm btn-success" onClick={() => addRow()} style={{marginRight:"5px", fontSize:"18px", width:"35px", height:"35px", borderRadius:"10px", float:"right", marginTop:"8px"}}>+</button>
    
            saveBtn = <button className="navBar__button" onClick={()=> saveChanges()} style={{marginTop:"7px"}}><img src={SaveIcon} alt="save" className="navBar__icon"></img><p className="navBar__button__text">Save</p></button>
        }else{
            table = <div className="connected__panel"><p className="connected__text">The user {editingUser} is already editing!</p></div>
        }    

    }else if(currentTab === "Requests"){
        table = <CSPTrackerdRequestsDataTable updateDataMethod = {updateDataMethod.bind(this)} updateData = {updateData} />
    }

    return(
        
        <body>
            {updateData}
            <IdleTimer
                timeout={1000 * 60 * 5}
                onIdle={handleOnIdle}
                debounce={250}
            />
            <NavBar onChange={value => setCurrentTab(currentTab)}/>
            <div
            className={`alert alert-success ${successAlert ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setSuccessAlert(false)}
            >
                <AlertF type="success" text="Changes saved!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${uploadDrawingSuccess ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setUploadDrawingSuccess(false)}
            >
                <AlertF type="success" text="Drawing uploaded successfully!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${updateDrawingSuccess ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setUpdateDrawingSuccess(false)}
            >
                <AlertF type="success" text="Drawing updated successfully!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${noTagError ? 'alert-shown' : 'alert-error-hidden'}`}
            onTransitionEnd={() => setNoTagError(false)}
            >
                <AlertF type="waring" text={errorIndex} margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${invalidFieldError ? 'alert-shown' : 'alert-error-hidden'}`}
            onTransitionEnd={() => setInvalidFieldError(false)}
            >
                <AlertF type="error" subtext="At least one of the entries had an invalid field!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${requestSuccess? 'alert-shown' : 'alert-error-hidden'}`}
            onTransitionEnd={() => setRequestSuccess(false)}
            >
                <AlertF type="success" text="SP requested successfully!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${warningBlankRequest ? 'alert-shown' : 'alert-error-hidden'}`}
            onTransitionEnd={() => setWarningBlankRequest(false)}
            >
                <AlertF type="warning" text="All fileds need to be filled!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${existsRequest ? 'alert-shown' : 'alert-error-hidden'}`}
            onTransitionEnd={() => setExistsRequest(false)}
            >
                <AlertF type="error" subtext="An SP with that SPTag already exists!" margin="0px"/>
            </div>
            <div className="isotracker__row">
                  <div className="isotracker__column">
                      <img src={CSPTrackerLogo} alt="CSPTrackerLogo" className="isoTrackerLogo__image2" style={{height:"85px"}}/>
                      
                      <div className="roleSelector__containerF">
                              <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                      </div>
                      
                  </div>
            </div>
            <table className="isotracker__table__container">
                      <tr className="isotracker__table__navBar__container" style={{height:"65px "}}>
                          <th  className="isotracker__table__navBar">
                              <div style={{display:"flex"}}>
                                {requestBtn}
                                {editBtn}
                                {notificationsBtn}
                                {designNotificationsBtn}
                                {saveBtn}   
                                {pageSelector}
                              </div>                           
                               
                          </th>
                      </tr>
                      <tr className="isotracker__table__tray__and__table__container" style={{height: dataTableHeight}}>
                          <td className="discplines__table__table" style={{height: dataTableHeight}} >
                              <div  style={{height: dataTableHeight}} className="isotracker__table__table__container" style={{width:"2200px"}}>
                                {table}
                                {addRowBtn}
                              </div>
                          </td>
                          
                      </tr>
                  </table>
                  <center className="actionBtns__container">   
                    <div style={{display:"flex", marginTop:"10px"}}>
                        <button className="action__btn" name="export" value="export" onClick={() => downloadReport()}>Export</button>
                    </div>
                    
                  </center>
                  <br></br>
         </body>
    )
}

export default CSPTracker;