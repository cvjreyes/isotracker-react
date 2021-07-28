import "./piping.css"
import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import RoleDropDown from '../../components/roleDropDown/roleDropDown'
import EquipmentsNavBtns from "../../components/EquipmentsNavBtns/equipmentsNavBtns"
import SelectPag from "../../components/selectPag/selectPag"
import PipingEstimatedDataTable from "../../components/pipingEstimatedDataTable/pipingEstimatedDataTable"
import ModelledDataTable from "../../components/modelledDataTable/modelledDataTable"
import ProgressPlotPiping from "../../components/progressPlotPiping/progressPlotPiping"
import PipingTypesDataTable from "../../components/pipingTypesDataTable/pipingTypesDataTable"
import DownloadIcon from "../../assets/images/downloadicon.png"
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import PipingExcel from "../../components/pipingExcel/pipingExcel"
import PipingExcelEdit from "../../components/pipingExcelEdit/pipingExcelEdit"
import IsoTrackerLogo from "../../assets/images/isotracker.png"

const Piping = () => {

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
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/currentProgress", options)
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

    var dataTableHeight = "490px"
    let navBtnsMargin = "600px"

    if (pagination === 10){
        dataTableHeight = "490px"
        navBtnsMargin = "600px"
    }if(pagination === 25){
        dataTableHeight = "1050px"
        navBtnsMargin = "1200px"
    }if(pagination === 50){
        dataTableHeight = "2000px"
        navBtnsMargin = "2150px"
    }if(pagination === 100){
        dataTableHeight = "3900px"
        navBtnsMargin = "4000px"
    }

    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("piping_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null

    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>
    let downloadBtn = null
    let adminBtn = null
    let navBtns = null

    if(currentTab === "Estimated"){
        table = <PipingEstimatedDataTable pagination = {pagination}/>
    }else if(currentTab === "Modelled"){
        downloadBtn = <div>
        <input type="image" src={DownloadIcon} alt="issued" style={{width:"25px", marginTop:"27px", marginLeft:"20px", float:"left"}} onClick={()=>downloadModelled()}/>
    </div>  
        table = <ModelledDataTable pagination = {pagination}/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotPiping/>
        pageSelector = null
        navBtnsMargin = "600px"
    }else if(currentTab === "Types"){
        table = <PipingTypesDataTable/>
    }else if(currentTab === "Key parameters"){
        table = <PipingExcel/>
        pageSelector = null
        navBtnsMargin = "700px"
    }
    
    if(!admin){
        navBtns = <center className="equimentsNavBtns__center">              
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
        table = <PipingExcelEdit/>
        navBtns = null
        pageSelector = null
    }


    async function downloadModelled(){

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/downloadModelled/")
        .then(response => response.json())
        .then(json => {
            const headers = ["TAG", "ISO_ID", "TYPE"]
            exportToExcel(JSON.parse(json), "Piping modelled", headers)
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
                      <td className="discplines__table__table" style={{height: dataTableHeight}} >
                          <div style={{height: dataTableHeight}} className="isotracker__table__table__container">
                              {table}
                          </div>
                      </td>
                      
                  </tr>
              </table>
     </body>
    )
}

export default Piping;