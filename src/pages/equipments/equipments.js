import "./equipments.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import RoleDropDown from '../../components/roleDropDown/roleDropDown'
import EquipEstimatedDataTable from "../../components/equipEstimatedDataTable/equipEstimatedDataTable"
import EquipModelledDataTable from "../../components/equipModelledDataTable/equipModelledDataTable"
import EquipmentsNavBtns from "../../components/EquipmentsNavBtns/equipmentsNavBtns"
import SelectPag from "../../components/selectPag/selectPag"
import ProgressPlotEquipments from "../../components/progressPlotEquipments/progressPlotEquipments"
import EquipTypesDataTable from "../../components/equipTypesDataTable/equipTypesDataTable"
import DownloadIcon from "../../assets/images/downloadicon.png"
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import EquipExcel from "../../components/equipExcel/equipExcel"
import EquipExcelEdit from "../../components/equipExcelEdit/equipExcelEdit"
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse'


const Equipments = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(8)
    const[weight, setWeight] = useState();
    const[progress, setProgress] = useState();
    const[admin, setAdmin] = useState(false);
    const[successAlert, setSuccessAlert] = useState(false);


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

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/equipments/weight", options)
            .then(response => response.json())
            .then(json => {
                setWeight(json.weight)
                setProgress(json.progress)
            }
            )
            .catch(error => {
                console.log(error);
            })       
            
    },[]);


    
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


    function swapAdmin(){
        setAdmin(!admin)
    }

    function success(){
        setSuccessAlert(true)
        setTimeout(function () {
            setSuccessAlert(false)
        }, 1000);
    }

    var dataTableHeight = "550px"
    let navBtnsMargin = "600px"

    if (pagination === 8){
        dataTableHeight = "550px"
        navBtnsMargin = "600px"
    }if(pagination === 25){
        dataTableHeight = "1250px"
        navBtnsMargin = "1200px"
    }if(pagination === 50){
        dataTableHeight = "2250px"
        navBtnsMargin = "2150px"
    }if(pagination === 100){
        dataTableHeight = "4250px"
        navBtnsMargin = "4000px"
    }if(pagination === 500){
        dataTableHeight = "19300px"
        navBtnsMargin = "19000px"
    }

    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("equip_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null

    dataTableHeight = 8
    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>

    let downloadBtn = null
    let adminBtn = null
    let navBtns = null


    if(currentTab === "Estimated"){
        table = <EquipEstimatedDataTable pagination = {pagination}/>
    }else if(currentTab === "Modelled"){
        downloadBtn = <div>
        <input type="image" src={DownloadIcon} alt="issued" style={{width:"25px", marginTop:"27px", marginLeft:"20px", float:"left"}} onClick={()=>downloadEquipmentModelled()}/>
    </div> 
        table = <EquipModelledDataTable pagination = {pagination}/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotEquipments/>
        pageSelector = null
        navBtnsMargin = "600px"
    }else if(currentTab === "Types"){
        table = <EquipTypesDataTable pagination = {pagination}/>
    }else if(currentTab === "Key parameters"){
        table = <EquipExcel success={success.bind(this)}/>
        pageSelector = null
        navBtnsMargin = "700px"
    }
    
    if(!admin){
        navBtns = <center className="equimentsNavBtns__center" style={{marginTop: navBtnsMargin}}>              
            <EquipmentsNavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab} currentRole = {currentRole} discipline = "Equipment"/>               
            </center>
        if(currentTab === "Estimated" && currentRole === "Project"){
            adminBtn =<button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"15px", marginTop:"25px", width:"60px"}} onClick={() => swapAdmin()}>Edit</button>
        }else{
            adminBtn = null
        }
    }else if(admin && currentTab === "Estimated"){
        if(currentTab === "Estimated"){
           adminBtn =<button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"15px", marginTop:"25px", width:"60px"}} onClick={() => swapAdmin()}>Back</button>
        }
        table = <EquipExcelEdit success={success.bind(this)}/>
        navBtns = null
        pageSelector = null
    }

    async function downloadEquipmentModelled(){

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/downloadEquipmentModelled/")
        .then(response => response.json())
        .then(json => {
            const headers = ["AREA", "TAG", "TYPE", "WEIGHT", "STATUS", "PROGRESS"]
            exportToExcel(JSON.parse(json), "Equipment modelled", headers)
        })
    }

    const exportToExcel = (apiData, fileName, headers) => {
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        const header_cells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'O1']
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

    }

    return(
        
        <body>
            
            <NavBar onChange={value => setCurrentTab(currentTab)}/>
            <Collapse in={successAlert}>
                <Alert style={{fontSize:"22px",position: "fixed", left: "50%", top:"10%", transform: "translate(-50%, -50%)", zIndex:"3"}} severity="success"
                    >
                    Success!
                </Alert>
            </Collapse>
            <div className="equipments__container">  
                <center>
                    <h2 className="title__container">
                        <div className="roleSelector__container">
                            <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                            
                            </div>
                        <b >      
                            <i className="iso__title">Equipment</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">{currentTab}</h3>
                </center>
                <div style={{position: "absolute", width:"500px", display:"inline-block"}}>
                  {pageSelector}        
                  {downloadBtn}
                  {adminBtn}
                </div>
                <div style={{display:"inline"}}>
                    <div className="equipTable__container">
                        <td className="equipTable__td">
                            <table className="equipTable__table">
                                <tbody className="equipable__body">
                                    <tr>    
                                        <td  className="equipTable__header" style={{backgroundColor:"rgb(107, 157, 187)", borderRadius:"1em 0 0 0"}}>Estimated weight</td>
                                        <td className="equipTable__header" style={{backgroundColor:"rgb(107, 157, 187)", borderRadius:"0 1em 0 0"}}>Total progress</td>
                                    </tr>
                                    <tr>
                                        <td className="equipTable__state" style={{borderRadius:"0 0 0 1em"}}>{weight}</td>
                                        <td className="equipTable__state" style={{borderRadius:"0 0 1em 0"}}>{progress}%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </div>
                </div>

                <div style={{height: dataTableHeight}}>
                    <br></br>
                    <br></br> 
                    <br></br> 
                    {table}
                </div>         
            </div>
            <br></br>
            {navBtns}
         </body>
    )
}

export default Equipments;