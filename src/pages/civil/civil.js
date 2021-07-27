import "./civil.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import RoleDropDown from '../../components/roleDropDown/roleDropDown'
import EquipmentsNavBtns from "../../components/EquipmentsNavBtns/equipmentsNavBtns"
import SelectPag from "../../components/selectPag/selectPag"
import ProgressPlotCivils from "../../components/progressPlotCivils/progressPlotCivils"
import CivilEstimatedDataTable from "../../components/civilEstimatedDataTable/civilEstimatedDataTable"
import CivilModelledDataTable from "../../components/civilModelledDataTable/civilModelledDataTable"
import CivilTypesDataTable from "../../components/civilTypesDataTable/civilTypesDataTable"
import DownloadIcon from "../../assets/images/downloadicon.png"
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import CivilExcel from "../../components/civilExcel/civilExcel"
import CivilExcelEdit from "../../components/civilExcelEdit/civilExcelEdit"
import IsoTrackerLogo from "../../assets/images/isotracker.png"

const Civil = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(8)
    const[weight, setWeight] = useState();
    const[progress, setProgress] = useState();
    const[admin, setAdmin] = useState(false);

    

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
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/civils/weight", options)
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

    var dataTableHeight = "550px"
    let navBtnsMargin = "600px"

    if (pagination === 8){
        dataTableHeight = "50px"
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
    }

    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("civ_tab"))
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
        table = <CivilEstimatedDataTable pagination = {pagination}/>
    }else if(currentTab === "Modelled"){
        downloadBtn = <div>
        <input type="image" src={DownloadIcon} alt="issued" style={{width:"25px", float:"left"}} onClick={()=>downloadCivilModelled()}/>
    </div> 
        table = <CivilModelledDataTable pagination = {pagination}/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotCivils/>
        pageSelector = null
        navBtnsMargin = "600px"
    }else if(currentTab === "Types"){
        table = <CivilTypesDataTable/>
    }else if(currentTab === "Key parameters"){
        table = <CivilExcel/>
        pageSelector = null
        navBtnsMargin = "700px"
    }

    if(!admin){
        navBtns = <div>              
            <EquipmentsNavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab} currentRole = {currentRole} discipline = "Equipment"/>               
            </div>
        if(currentTab === "Estimated"){
            adminBtn =<button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"15px", marginTop:"15px", width:"60px"}} onClick={() => swapAdmin()}>Edit</button>
        }
    }else if(admin && currentTab === "Estimated"){
        if(currentTab === "Estimated"){
            adminBtn =<button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"15px", marginTop:"15px", width:"60px"}} onClick={() => swapAdmin()}>Back</button>
        }
        table = <CivilExcelEdit/>
        navBtns = null
        pageSelector = null
    }


    async function downloadCivilModelled(){

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/downloadCivilModelled/")
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
/*<td className="isotracker__table__table" style={{height: dataTableHeight}} >
                              <div style={{height: dataTableHeight}} className="isotracker__table__table__container">
                                  {table}
                              </div>
                          </td>*/

    return(
        
        <body>
            
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
                      <tr className="isotracker__table__navBar__container">
                          <th  colspan="2" className="isotracker__table__navBar">
                            {downloadBtn}
                            {adminBtn}
                                <p className="progress__and__weight" style={{marginLeft:"500px"}}>Estimated weight: {weight}</p>
                                <p className="progress__and__weight">Total progress: {progress}%</p>
                            {pageSelector}
                          </th>
                      </tr>
                      <tr className="isotracker__table__tray__and__table__container" style={{height: dataTableHeight}}>
                          <td className="disciplines__table__trays">
                              <div className="trays__container">
                                  <p className="isotracker__table__trays__group">Trays</p>
                                    {navBtns}
                              </div>
                          </td>
                          <td className="isotracker__table__table" style={{height: dataTableHeight}} >
                              <div  className="isotracker__table__table__container">
                                  {table}
                              </div>
                          </td>
                          
                      </tr>
                  </table>
         </body>
    )
}

export default Civil;