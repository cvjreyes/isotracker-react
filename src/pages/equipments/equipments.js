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
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import EquipExcel from "../../components/equipExcel/equipExcel"
import EquipExcelEdit from "../../components/equipExcelEdit/equipExcelEdit"
import IsoTrackerLogo from "../../assets/images/3dtracker.png"
import ExportIcon from "../../assets/images/downloadicon.png"
import EditIcon from "../../assets/images/edit.png"

const Equipments = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(10)
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

    var dataTableHeight = "500px"
    let navBtnsMargin = "600px"

    if (pagination === 10){
        dataTableHeight = "500px"
        navBtnsMargin = "600px"
    }if(pagination === 25){
        dataTableHeight = "1100px"
        navBtnsMargin = "1200px"
    }if(pagination === 50){
        dataTableHeight = "2080px"
        navBtnsMargin = "2150px"
    }if(pagination === 100){
        dataTableHeight = "4040px"
        navBtnsMargin = "4000px"
    }


    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("equip_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null

    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>

    let downloadBtn = null
    let adminBtn = null
    let marginProgress = null


    if(currentTab === "Estimated"){
        table = <EquipEstimatedDataTable pagination = {pagination}/>
    }else if(currentTab === "Modelled"){
        downloadBtn = <button className="navBar__button" onClick={()=>downloadEquipmentModelled()} style={{marginLeft:"125px"}}><img src={ExportIcon} alt="trash" className="navBar__icon"></img><p className="navBar__button__text">Export</p></button>
    
        table = <EquipModelledDataTable pagination = {pagination}/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotEquipments/>
        pageSelector = null
        navBtnsMargin = "600px"
    }else if(currentTab === "Types"){
        table = <EquipTypesDataTable/>
    }else if(currentTab === "Key parameters"){
        table = <EquipExcel/>
        pageSelector = null
        navBtnsMargin = "700px"
    }else if(currentTab === "Edit"){
        table = <EquipExcelEdit/>
        pageSelector = null
    }

    
    if(currentTab === "Edit"){
        dataTableHeight = "740px"
    }else if(currentTab === "Key parameters"){
        dataTableHeight = "600px"
    }
    
    if(currentRole === "Project"){
        if(currentTab === "Estimated" || currentTab === "Edit"){
            if(currentTab === "Edit"){
                adminBtn = <button className="navBar__button" onClick={()=>setCurrentTab("Edit")} style={{backgroundColor:"#0000FF", marginLeft:"125px"}}><img src={EditIcon} alt="trash" className="navBar__icon"></img><p className="navBar__button__text">Edit</p></button>
            }else{
                adminBtn = <button className="navBar__button" onClick={()=>setCurrentTab("Edit")} style={{marginLeft:"125px"}}><img src={EditIcon} alt="trash" className="navBar__icon"></img><p className="navBar__button__text">Edit</p></button>
            }        }else{
            adminBtn = null
        }
    }
        
    if(adminBtn || downloadBtn){
        marginProgress = "55%"
    }else{
        marginProgress = "66%"
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
    /* 
                            {adminBtn}     
                            {pageSelector}   */

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

                  <div className="isotracker__column">
                  
                  <table className="equipTable__table" style={{marginTop:"140px", width:"35%", marginLeft:"59%"}}>
                        <tbody className="equipable__body">
                            <tr>    
                                <td  className="equipTable__header" style={{backgroundColor:"#0070ed", borderRadius:"1em 0 0 0"}}>Estimated weight</td>
                                <td className="equipTable__header" style={{backgroundColor:"#0070ed", borderRadius:"0 1em 0 0"}}>Total progress</td>
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
                          <text style={{marginLeft:"20px", fontSize:"18px", marginTop:"30px"}}>Equipment</text>
                            {adminBtn}
                            {downloadBtn}
                          {pageSelector}
                          </th>
                      </tr>
                      <tr className="isotracker__table__tray__and__table__container" style={{height: dataTableHeight}}>
                          <td className="disciplines__table__trays">
                              <div className="trays__container">
                                  <p className="isotracker__table__trays__group">Trays</p>
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
         </body>
    )
}

export default Equipments;