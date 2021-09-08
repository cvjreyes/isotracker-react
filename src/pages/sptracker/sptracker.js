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
    const [p1boreData, setP1boreData] = useState()
    const [p2boreData, setP2boreData] = useState()
    const [p3boreData, setP3boreData] = useState()
    const [ratingData, setRatingData] = useState()
    const [specData, setSpecData] = useState()
    const [endPreparationData, setEndPrepartaionData] = useState()
    const [boltTypesData, setBoltTypesData] = useState()



    

    const history = useHistory()

    var currentUser = secureStorage.getItem('user')

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

    function success(){
        setSuccessAlert(true)
        setTimeout(function () {
            setSuccessAlert(false)
        }, 1000);
    }
    
    function handleOnIdle(){
        secureStorage.clear()
        history.push("/" + process.env.REACT_APP_APP_NAMEPROJ)
    }

    async function handleToggle(){
        if(currentTab === "View"){
            await setCurrentTab("Edit")
        }else{
            await saveChanges()
            await setCurrentTab("View")
        }
    }

    async function addRow(){
        let rows = editData
        rows.push({"tag": "", "description": "", "description_plane": "","description_iso": "", "ident": "", "p1bore": "", "p2bore": "", "p3bore": "", "rating": "", "p1bore": "", "spec": "", "face_to_face": "", "end_preparation": "", "bolts": "", "bolt_type": ""})
        setEditData(rows)
      }

    async function saveChanges(){
        console.log(editData)
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
    let table = <CSPTrackerdDataTable/>

    if(currentRole === "Materials"){
        editBtn =  <label class="switchBtn">
                        <input type="checkbox" id="edit" onClick={()=>handleToggle()}/>
                        <div class="slide round">Edit mode</div>
                    </label>    
    }

    if(currentTab === "View"){
        table = <CSPTrackerdDataTable/>
        pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>
        addRowBtn = null
        saveBtn = null
    }else{
        table = <HotTable
        data={editData}
        colHeaders = {["TAG", "DESCRIPTION", "DRAWING DESCRIPION", "DESCRIPTION ISO", "IDENT", "P1BORE", "P2BORE", "P3BORE", "RATING", "SPEC", "FACE TO FACE", "END PREPARATION", "BOLTS", "TYPE OF BOLT"]}
        rowHeaders={true}
        width="2200"
        height="635"
        settings={settings} 
        manualColumnResize={true}
        manualRowResize={true}
        columns= {[{ data: "tag", type:'text'}, { data: "description", type:'text'}, {data: "description_plane", type:"dropdown", strict:"false", source: descriptionPlaneData}, {data: "description_iso", type:"text"},{data: "Ident", type:"text"}, {data: "p1bore", type:"dropdown", strict:"true", source: p1boreData}, {data: "p2bore", type:"dropdown", strict:"true", source: p2boreData}, {data: "p3bore", type:"dropdown", strict:"true", source: p3boreData}, {data: "rating", type:"dropdown", strict:"true", source: ratingData}, {data: "spec", type:"dropdown", strict:"true", source: specData}, {data: "face_to_face", type:"numeric"},{data: "end_preparation", type:"dropdown", strict:"true", source: endPreparationData},{data: "bolts", type:"dropdown", strict:"true", source:["yes", "no"]}, {data: "bolt_type", type:"dropdown", strict:"true", source: boltTypesData}]}
        />
        
        pageSelector = null
        dataTableHeight= "700px"
        addRowBtn = <button class="btn btn-sm btn-success" onClick={() => addRow()} style={{marginRight:"5px", fontSize:"18px", width:"35px", height:"35px", borderRadius:"10px", float:"right", marginTop:"8px"}}>+</button>

        saveBtn = <button className="navBar__button" onClick={()=> saveChanges()} style={{marginTop:"7px"}}><img src={SaveIcon} alt="save" className="navBar__icon"></img><p className="navBar__button__text">Save</p></button>

    }



    return(
        
        <body>
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
                                <div style={{marginLeft:"87%"}}>
                                    {pageSelector}  
                                </div> 
                                         
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