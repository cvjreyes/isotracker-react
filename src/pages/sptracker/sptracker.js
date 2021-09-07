import "./sptracker.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import IsoTrackerLogo from "../../assets/images/3DTracker.svg"
import RoleDropDown from '../../components/roleDropDown/roleDropDown'

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import SelectPag from "../../components/selectPag/selectPag"
import EditIcon from "../../assets/images/edit.png"
import View from "../../assets/images/Notepad.png"

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

    const [currentRole, setCurrentRole] = useState();
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("inst_tab"))
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(10)
    const[successAlert, setSuccessAlert] = useState(false);
    

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

    let editBtn = null

    if(currentRole === "Materials"){
        editBtn =  <label class="switchBtn">
                        <input type="checkbox"/>
                        <div class="slide round">Edit mode</div>
                    </label>    
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
                          <th  colspan="2" className="isotracker__table__navBar">
                          {editBtn}

                          {pageSelector}
                          </th>
                      </tr>
                      <tr className="isotracker__table__tray__and__table__container" style={{height: dataTableHeight}}>
                          <td className="discplines__table__table" style={{height: dataTableHeight}} >
                              <div  style={{height: dataTableHeight}} className="isotracker__table__table__container">
                                  
                              </div>
                          </td>
                          
                      </tr>
                  </table>
         </body>
    )
}

export default CSPTracker;