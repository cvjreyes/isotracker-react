import "./piping.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import RoleDropDown from '../../components/roleDropDown/roleDropDown'
import EquipmentsNavBtns from "../../components/EquipmentsNavBtns/equipmentsNavBtns"
import PipingEstimatedDataTable from "../../components/pipingEstimatedDataTable/pipingEstimatedDataTable"
import ModelledDataTable from "../../components/modelledDataTable/modelledDataTable"
import ProgressPlotPiping from "../../components/progressPlotPiping/progressPlotPiping"
import PipingTypesDataTable from "../../components/pipingTypesDataTable/pipingTypesDataTable"
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import PipingExcel from "../../components/pipingExcel/pipingExcel"
import PipingExcelEdit from "../../components/pipingExcelEdit/pipingExcelEdit"
import IsoTrackerLogo from "../../assets/images/3DTracker.svg"
import ExportIcon from "../../assets/images/downloadicon.png"
import EditIcon from "../../assets/images/edit.png"
import AlertF from "../../components/alert/alert"

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import PipingNavBtns from "../../components/pipingNavBtns/pipingNavBtns"

import PipingDataTable from "../../components/pipingDataTable/pipingDataTable"


const Piping = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[weight, setWeight] = useState();
    const[progress, setProgress] = useState();
    const[successAlert, setSuccessAlert] = useState(false);
    const[selected, setSelected] = useState([])
    const [updateData, setUpdateData] = useState();
    const [warningSelected, setWarningSelected] = useState(false);
    const [transactionSuccess, setTransactionSuccess] = useState(false)

    const history = useHistory()

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

        let options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/pipingWeight", options)
            .then(response => response.json())
            .then(json => {
                setWeight(json.weight)
                setProgress(json.progress)
            }
            )
            .catch(error => {
                console.log(error);
            })       

            const body = {
                user: currentUser,
            }
            options = {
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
            
    },[]);

    function success(){
        setSuccessAlert(true)
        setTimeout(function () {
            setSuccessAlert(false)
        }, 1000);
    }

    function handleOnIdle(){
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

    useEffect(()=>{
        if(!secureStorage.getItem("user")){
            history.push("/"+process.env.REACT_APP_PROJECT+"/");
        }
    }, [])

    var dataTableHeight = "600px"

    document.body.style.zoom = 0.8
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("piping_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null
    let actionBtns = null
    let adminBtn = null

    if(currentTab === "Estimated"){
        table = <PipingEstimatedDataTable/>
    }else if(currentTab === "Modelled"){    
        table = <ModelledDataTable/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotPiping/>
    }else if(currentTab === "Types"){
        table = <PipingTypesDataTable/>
    }else if(currentTab === "Key parameters"){
        table = <PipingExcel success={success.bind(this)}/>
    }else if(currentTab === "Edit"){
        table = <PipingExcelEdit success={success.bind(this)}/>
    }else if(currentTab === "PipingModelled" || currentTab === "PipingComponents" || currentTab === "PipingSStress" || currentTab === "PipingRStress" || currentTab === "PipingStress" || currentTab === "PipingSDesign"){
        actionBtns = <button className="action__btn"  name="claim" value="claim" onClick={() => claimClick()}>Claim</button>
        table = <PipingDataTable currentTab = {currentTab} onChange={value=> setSelected(value)} claimClick={claimClick.bind(this)}/>
    }

    
    async function claimClick(){
        if(selected.length > 0){
            localStorage.setItem("update", true)
            
            const body ={
                user: currentUser,
                pipes: selected,
            }
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }

            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/claimPipes", options)
            .then(response => response.json())
            .then(json =>{
                if(json.success){
                    setSuccessAlert(true)
                }
            })
            await setUpdateData(!updateData)
            await setSelected([])
            
        }else{
            await setWarningSelected(true)
        }
    }


    return(
        
        <body>
            <IdleTimer
                timeout={1000 * 60 * 15}
                onIdle={handleOnIdle}
                debounce={250}
            />
            <NavBar onChange={value => setCurrentTab(currentTab)}/>
            <div
            className={`alert alert-success ${successAlert ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setSuccessAlert(false)}
            >
                <AlertF type="success" text="Pipes claimed!" margin="0px"/>
            </div>
            <div
            className={`alert alert-success ${transactionSuccess ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setTransactionSuccess(false)}
            >
                <AlertF type="success" margin="-30px" text="The action has been completed."/>
            </div>
            <div
            className={`alert alert-success ${warningSelected ? 'alert-shown' : 'alert-hidden'}`}
            onTransitionEnd={() => setWarningSelected(false)}
            >
                <AlertF type="warning" text="Select at least one pipe!" margin="10px"/>   
            </div>
            <div style={{position:"absolute", marginTop:"180px", marginLeft:"48%"}}>
                <i className="discipline__title" style={{fontStyle:"normal"}}>Piping</i>
            </div>
                <div className="isotracker__row">
                  <div className="isotracker__column">
                      <img src={IsoTrackerLogo} alt="isoTrackerLogo" className="isoTrackerLogo__image2"/>
                      
                      <div className="roleSelector__containerF">
                              <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                      </div>
                      
                  </div>

                  <div className="isotracker__column">
                  
                  <table className="equipTable__table" style={{marginTop:"270px", width:"35%", marginLeft:"59%"}}>
                        <tbody className="equipable__body">
                            <tr>    
                                <td  className="equipTable__header" style={{backgroundColor:"#338DF1", borderRadius:"1em 0 0 0"}}>Estimated weight</td>
                                <td className="equipTable__header" style={{backgroundColor:"#338DF1", borderRadius:"0 1em 0 0"}}>Total progress</td>
                            </tr>
                            <tr>
                                <td className="equipTable__state" style={{borderRadius:"0 0 0 1em"}}>{weight}</td>
                                <td className="equipTable__state" style={{borderRadius:"0 0 1em 0"}}>{progress}%</td>
                            </tr>
                        </tbody>
                    </table>
                    
                  </div>               
                  
                  
              </div>
              <table className="isotracker__table__container">
                      <tr className="isotracker__table__navBar__container">
                          <th  colspan="2" className="isotracker__table__navBar">
                            {adminBtn}
                          </th>
                      </tr>
                      <tr className="isotracker__table__tray__and__table__container" style={{height: dataTableHeight}}>
                          <td className="disciplines__table__trays">
                              <div className="trays__container">
                              <PipingNavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab} currentRole = {currentRole}/> 

                                  <p className="isotracker__table__trays__group">Options</p>
                                  <center className="equimentsNavBtns__center">              
                                    <EquipmentsNavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab} currentRole = {currentRole} discipline = "Equipment"/>               
                                    </center>
                              </div>
                          </td>
                          <td className="discplines__table__table" style={{height: dataTableHeight}} >
                              <div  style={{height: dataTableHeight}} className="isotracker__table__table__container">
                                  {table}
                              </div>
                          </td>
                          
                      </tr>
                  </table>
                  <center className="actionBtns__container">
                      {actionBtns}
                  </center>
         </body>
    )
}

export default Piping;