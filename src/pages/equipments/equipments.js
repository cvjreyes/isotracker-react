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

const Equipments = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(8)
    const[weight, setWeight] = useState();
    const[progress, setProgress] = useState();
    

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
        navBtnsMargin = "2300px"
    }if(pagination === 100){
        dataTableHeight = "4350px"
    }

    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("equip_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null

    var dataTableHeight = 8
    var pageSelector = <SelectPag onChange={value => setPagination(value)} pagination = {pagination}/>


    if(currentTab === "Estimated"){
        table = <EquipEstimatedDataTable pagination = {pagination}/>
    }else if(currentTab === "Modelled"){
        table = <EquipModelledDataTable pagination = {pagination}/>
    }else if(currentTab === "Progress"){
        table = <ProgressPlotEquipments/>
    }else if(currentTab === "Types"){
        table = <EquipTypesDataTable/>
    }

    return(
        
        <body>
            
            <NavBar onChange={value => setCurrentTab(currentTab)}/>
            <div className="equipments__container">  
                <center>
                    <h2 className="title__container">
                        <div className="roleSelector__container">
                            <RoleDropDown style={{paddingLeft: "2px"}} onChange={value => setCurrentRole(value)} roles = {roles}/>
                            </div>
                        <b >      
                            <i className="iso__title">Equipments</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">{currentTab}</h3>
                </center>
                <div style={{position: "absolute", width:"50px"}}>
                  {pageSelector}        
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
            <center className="equimentsNavBtns__center" style={{marginTop: navBtnsMargin}}>              
                    <EquipmentsNavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab} currentRole = {currentRole}/>               
            </center>
         </body>
    )
}

export default Equipments;