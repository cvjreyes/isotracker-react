import "./sptracker.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import IsoTrackerLogo from "../../assets/images/3DTracker.svg"
import RoleDropDown from '../../components/roleDropDown/roleDropDown'

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import SelectPag from "../../components/selectPag/selectPag"
import CSPTrackerdDataTable from "../../components/csptrackerDataTable/csptrackerDataTable"
import HotTable from "@handsontable/react"

import SaveIcon from "../../assets/images/FolderOpen.png"

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

    var currentUser = secureStorage.getItem('user')

    let p1bore, p2bore, p3bore = ""

    if(process.env.REACT_APP_APP_MMDN === "0"){
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
                console.log(json.rows)
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
    }, [currentTab, updateData])

    function success(){
        setSuccessAlert(true)
        setTimeout(function () {
            setSuccessAlert(false)
        }, 1000);
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
        history.push("/" + process.env.REACT_APP_APP_NAMEPROJ)
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
                    console.log(json)
                    await setBusy(true)
                    await setEditingUser(json.user)
                }else{
                    await setBusy(false)
                }
                await setCurrentTab("Edit")
            })
            
        }else{
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
                if(json.success){
                    await saveChanges()
                    await setCurrentTab("View")
                }
            })
            
        }
    }

    async function addRow(){
        let rows = editData
        rows.push({tag:"", description: "", description_plan_code: "", drawing_filename: "", description_iso: "", ident: "", p1diameter_dn: "", p1diameter_nps: "", p2diameter_dn: "", p2diameter_nps: "", p3diameter_dn: "", p3diameter_nps: "", rating: "", spec: "", face_to_face: "",end_preparation: "", description_drawing: "", bolts: "", bolt_type: "", ready_load: "", ready_e3d: "", comments: ""})
        await setEditData(rows)
        await setUpdateData(!updateData)
      }

    async function saveChanges(){
        const body = {
            rows: editData,
          }
          const options = {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
          }
          fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitCSP", options)
          .then(response => response.json())
          .then(json =>{
      
          })
    }

    async function updateDataMethod(){
        setUpdateData(!updateData)
    }

    document.body.style.zoom = 0.8

    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>

    var dataTableHeight = "500px"

    if (pagination === 10){
        dataTableHeight = "500px"
    }if(pagination === 25){
        dataTableHeight = "1100px"
    }if(pagination === 50){
        dataTableHeight = "2080px"
    }if(pagination === 100){
        dataTableHeight = "4040px"
    }if(pagination === 500){
        dataTableHeight = "19000px"    
    }

    let editBtn, addRowBtn, saveBtn, upload = null
    let table = <CSPTrackerdDataTable updateDataMethod = {updateDataMethod.bind(this)} updateData = {updateData}/>

    if(currentRole === "Materials"){
        editBtn =  <label class="switchBtn">
                        <input type="checkbox" id="edit" onClick={()=>handleToggle()}/>
                        <div class="slide round">Edit mode</div>
                    </label>    
    }


    if(currentTab === "View"){
        table = <CSPTrackerdDataTable updateDataMethod = {updateDataMethod.bind(this)} updateData = {updateData}/>
        if(currentRole === "Materials" || currentRole === "Speciality Lead"){
            pageSelector = <div style={{marginLeft:"87%"}}><SelectPag onChange={value => setPagination(value)} pagination = {pagination}/></div>
        }else{
            pageSelector = <div style={{marginLeft:"94%"}}><SelectPag onChange={value => setPagination(value)} pagination = {pagination}/></div>
        }
        addRowBtn = null
        saveBtn = null
        
    }else{
        if(!busy){
            table = <HotTable
            data={editData}
            colHeaders = {["TAG", "DESCRIPTION", "DRAWING DESCRIPION", "DESCRIPTION ISO", "IDENT", "P1BORE", "P2BORE", "P3BORE", "RATING", "SPEC", "FACE TO FACE", "END PREPARATION", "BOLTS", "TYPE OF BOLT"]}
            rowHeaders={true}
            width="2200"
            height="635"
            settings={settings} 
            manualColumnResize={true}
            manualRowResize={true}
            columns= {[{ data: "tag", type:'text'}, { data: "description", type:'text'}, {data: "description_drawing", type:"dropdown", allowInvalid:true, source: descriptionPlaneData}, {data: "description_iso", type:"text"},{data: "ident", type:"text"}, {data: p1bore, type:"dropdown", strict:"true", source: diametersData}, {data: p2bore, type:"dropdown", strict:"true", source: diametersData}, {data: p3bore, type:"dropdown", strict:"true", source: diametersData}, {data: "rating", type:"dropdown", strict:"true", source: ratingData}, {data: "spec", type:"dropdown", strict:"true", source: specData}, {data: "face_to_face", type:"numeric"},{data: "end_preparation", type:"dropdown", strict:"true", source: endPreparationData},{data: "bolts", type:"dropdown", strict:"true", source:["yes", "no"]}, {data: "bolt_type", type:"dropdown", strict:"true", source: boltTypesData}, {data:"comments", type:"text"}]}
            />

            
            
            pageSelector = null
            dataTableHeight= "700px"
            addRowBtn = <button class="btn btn-sm btn-success" onClick={() => addRow()} style={{marginRight:"5px", fontSize:"18px", width:"35px", height:"35px", borderRadius:"10px", float:"right", marginTop:"8px"}}>+</button>
    
            saveBtn = <button className="navBar__button" onClick={()=> saveChanges()} style={{marginTop:"7px"}}><img src={SaveIcon} alt="save" className="navBar__icon"></img><p className="navBar__button__text">Save</p></button>
        }else{
            table = <div className="connected__panel"><p className="connected__text">The user {editingUser} is already editing!</p></div>
        }    

    }    

    return(
        
        <body>
            {updateData}
            <IdleTimer
                timeout={1000 * 60 * 15}
                onIdle={handleOnIdle}
                debounce={250}
            />
            <NavBar onChange={value => setCurrentTab(currentTab)}/>
            <div className="isotracker__row">
                  <div className="isotracker__column">
                      <img src={IsoTrackerLogo} alt="isoTrackerLogo" className="isoTrackerLogo__image2"/>
                      
                      <div className="roleSelector__containerF">
                              <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                      </div>
                      
                  </div>
            </div>
            <table className="isotracker__table__container">
                      <tr className="isotracker__table__navBar__container" style={{height:"65px "}}>
                          <th  className="isotracker__table__navBar">
                              <div style={{display:"flex"}}>
                                {editBtn}
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
         </body>
    )
}

export default CSPTracker;