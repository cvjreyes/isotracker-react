import NavBar from '../../components/navBar/navBar';
import React, { useState , useEffect} from 'react'
import { HotTable } from '@handsontable/react';

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import BackIcon from "../../assets/images/back.svg"

import AlertF from "../../components/alert/alert"

import './pipingProduction.css'
import SaveIcon from "../../assets/images/save.svg"

//Página de home con el menú para ir a las aplicaciones de isotracker

const PITRequests = () =>{

    const history = useHistory();

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

    document.body.style.zoom = 0.8

    const [updateData, setUpdateData] = useState(false)
    const [updateRows, setUpdateRows] = useState(false)
    const [tables, setTables] = useState([])
    const [materials, setMaterials] = useState()
    const [materialsList, setMaterialsList] = useState([])
    const [piping, setPiping] = useState()
    const [management, setManagement] = useState([])

    const [estimatedData, setEstimatedData] = useState({})
    const [forecastData, setForecastData] = useState({})
    const [estimatedMaterialData, setEstimatedMaterialData] = useState({})

    const [success, setSuccess] = useState(false)
    const [spanAlert, setSpanAlert] = useState(false)
    const [pipingAlert, setPipingAlert] = useState(false)
    const [materialsAlert, setMaterialsAlert] = useState(false)


    function handleOnIdle(){
        const body = {
            user: secureStorage.getItem("user"),
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

    useEffect(async() =>{
    
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedByMaterial", options)
            .then(response => response.json())
            .then(async json => {
                let est = estimatedMaterialData
                for(let i = 0; i < json.estimated.length; i++){
                    est[json.estimated[i].id] = json.estimated[i].estimated
                }
                await setEstimatedMaterialData(est)
            })

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getIssuedByMatWeek", options)
        .then(response => response.json())
        .then(async json => {
            const issued = json.issued
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedMatWeek", options)
                .then(response => response.json())
                .then(async json => {

                    const estimated = json.estimated
                    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getForecastMatWeek", options)
                        .then(response => response.json())
                        .then(async json => {
                            const forecast = json.forecast
                            let tables = []
                            let material = estimated[0].material_id
                            const settings = {
                                licenseKey: 'non-commercial-and-evaluation',
                                colWidths: 40,
                                rowHeaderWidth: 190
                                //... other options
                            }
                            let weeks = []
                            let est = {}
                            let sumEst = {}
                            let sumReal = {}
                            let countEst = 0
                            let countReal = 0
                            let forc = {}
                            let col = []
                            let sumEstCells = []
                            for(let i = 0; i < estimated.length; i++){
                                if(estimated[i].material_id === material){
                                    weeks.push(estimated[i].week.toString())
                                    est[estimated[i].week.toString()] = estimated[i].estimated
                                    forc[forecast[i].week.toString()] = forecast[i].estimated
                                    countEst += estimated[i].estimated
                                    sumEst[estimated[i].week.toString()] = countEst
                                    if(issued[material]){
                                        if(issued[material][estimated[i].week]){
                                            countReal += issued[material][estimated[i].week]
                                        }
                                    }
                                    sumReal[estimated[i].week.toString()] = countReal
                                    col.push({ data: estimated[i].week.toString(), type: "numeric"})
                                    sumEstCells.push({row: 1, col: i, readOnly:true})
                                    sumEstCells.push({row: 3, col: i, readOnly:true})
                                }else{
                                    let estData = estimatedData
                                    estData[material] = est
                                    await setEstimatedData(estData)
                                    let forcData = forecastData
                                    forcData[material] = forc
                                    await setForecastData(forcData)
                                    let totalEst = estimatedMaterialData[estimated[i-1].material_id]
                                    if(!totalEst){
                                        totalEst = 0
                                    }
                                    let diff = countEst - totalEst
                                    let warning = null
                                    if(totalEst < countEst){
                                        warning = <text className="warning__text">*Estimated exceeded by {diff}!</text>
                                    }
                                    if(!totalEst){
                                        totalEst = "(0 estimated)"
                                    }else{
                                        totalEst = "(" + totalEst.toString() + " estimated)"
                                    }

                                    await tables.push(<div id="hot-app"><text className="materials__title">{estimated[i-1].name.toUpperCase()} Isometrics <text style={{fontSize:"17px"}}>{totalEst}</text> {warning}</text><button className="save__button" onClick={()=> submitEstimatedForecast(estimated[i-1].material_id)}><img src={SaveIcon} alt="save" className="save__icon"></img></button>
                                    <div style={{marginTop:"10px"}}><HotTable
                                    data={[est, issued[material], forc, sumEst, sumReal]}
                                    colHeaders={weeks}
                                    rowHeaders={["Estimated", "Real", "Forecast", "Estimated progress", "Real progress"]}
                                    width="2150"
                                    height="200"
                                    settings={settings} 
                                    manualColumnResize={true}
                                    manualRowResize={true}
                                    columns= {col}
                                    filters={true}
                                    cell = {sumEstCells}
                                /></div></div>)
                                weeks = [estimated[i].week.toString()]
                                est = {}
                                forc = {}
                                sumEst = {}
                                sumReal = {}
                                est[estimated[i].week.toString()] = estimated[i].estimated
                                forc[forecast[i].week.toString()] = forecast[i].estimated
                                if(issued[estimated[i].material_id]){
                                    countReal = issued[estimated[i].material_id][estimated[i].week]
                                }else{
                                    countReal = 0
                                }
                                sumReal[estimated[i].week.toString()] = countReal

                                if(estimated[i].estimated){
                                    countEst = estimated[i].estimated
                                }else{
                                    countEst = 0
                                }
                                sumEst[estimated[i].week.toString()] = countEst
                                
                                col = [{ data: estimated[i].week.toString(), type: "numeric"}]
                                material = estimated[i].material_id
                                }
                            }
                            let estData = estimatedData
                            estData[material] = est
                            await setEstimatedData(estData)
                            let forcData = forecastData
                            forcData[material] = forc
                            await setForecastData(forcData)
                            let totalEst = estimatedMaterialData[material]
                            if(!totalEst){
                                totalEst = 0
                            }
                            let diff = countEst - totalEst
                            let warning = null
                            if(totalEst < countEst){
                                warning = <text className="warning__text">*Estimated exceeded by {diff}!</text>
                            }
                            if(!totalEst){
                                totalEst = "(0 estimated)"
                            }else{
                                totalEst = "(" + totalEst.toString() + " estimated)"
                            }



                            await tables.push(<div id="hot-app"><text className="materials__title">{estimated[estimated.length-1].name.toUpperCase()} Isometrics <text style={{fontSize:"17px"}}>{totalEst}</text> {warning}</text><button className="save__button" onClick={()=> submitEstimatedForecast(material)}><img src={SaveIcon} alt="save" className="save__icon"></img></button>
                            <div style={{marginTop:"10px"}}><HotTable
                                    data={[est, issued[material], forc, sumEst, sumReal]}
                                    colHeaders={weeks}
                                    rowHeaders={["Estimated", "Real", "Forecast", "Estimated progress", "Real progress"]}
                                    width="2150"
                                    height="200"
                                    settings={settings} 
                                    manualColumnResize={true}
                                    manualRowResize={true}
                                    columns= {col}
                                    filters={true}
                                    cell = {sumEstCells}
                                /></div></div>)

                            setTables(tables)
                        })
                })
         })  

        

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaterials", options)
            .then(response => response.json())
            .then(async json => {
                const materials = json.materials
                let mat = []
                let matList = []
                for(let i = 0; i < materials.length; i++){
                    mat.push({"id": materials[i].id, "Material": materials[i].name})
                    matList.push(materials[i].name)
                }
                await setMaterials(mat)
                await setMaterialsList(matList)
            })

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaterialsPipingClass", options)
            .then(response => response.json())
            .then(async json => {
                const materials = json.materials                        
                let piping = []
                for(let i = 0; i < materials.length; i++){
                    piping.push({"id": materials[i].piping_id, "PipingClass": materials[i].piping, "Material": materials[i].material})
                }
                
                await setPiping(piping)
        })

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getProjectSpan", options)
            .then(response => response.json())
            .then(async json => {
                const span = json.span
                await setManagement({"Starting date": span[0].starting_date.toString().substring(8,10) + "/" + span[0].starting_date.toString().substring(5,7) + "/" + span[0].starting_date.toString().substring(0,4), "Finishing date": span[0].finishing_date.toString().substring(8,10) + "/" + span[0].finishing_date.toString().substring(5,7) + "/" + span[0].finishing_date.toString().substring(0,4)})
            })

    }, [updateData])

    async function addRowMaterials(){
        let m = materials
        m.push({"id": "", "Material": ""})
        await setMaterials(m)
        await setUpdateRows(!updateRows)
    }

    async function addRowPiping(){
        let p = piping
        p.push({"id": "", "Material": ""})
        await setPiping(p)
        await setUpdateRows(!updateRows)
    }

    async function submitChangesMaterials(){
        const body ={
            materials : materials
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitMaterials", options)
        .then(response => response.json())
        .then(async json => {
            if(json.success){
                await setMaterialsAlert(true)
                await setUpdateData(!updateData)
            }
        })
    }

    async function submitChangesPiping(){
        const body ={
            piping : piping
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitPipingClass", options)
        .then(response => response.json())
        .then(async json => {
            if(json.success){
                await setPipingAlert(true)
                await setUpdateData(!updateData)
            }
        })
    }

    async function submitManagement(){
        const body ={
            span : management
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitProjectSpan", options)
        .then(response => response.json())
        .then(async json => {
            if(json.success){
                await setSpanAlert(true)
                await setUpdateData(!updateData)
            }
        })
    }

    async function submitEstimatedForecast(material_id){
        const body ={
            material_id : material_id,
            estimated: estimatedData[material_id],
            forecast: forecastData[material_id]
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitEstimatedForecast", options)
        .then(response => response.json())
        .then(async json => {
            if(json.success){
                await setSuccess(true)
                await setUpdateData(!updateData)
            }
        })        
    }
    
    const matSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 450,
        //... other options
    }

    const pipingSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 225,
        //... other options
    }

    return(

        <body>
            {updateData}
            {updateRows}
            <IdleTimer
                timeout={1000 * 60 * 15}
                onIdle={handleOnIdle}
                debounce={250}
            />
            <NavBar/>
            <div className={`alert alert-success ${spanAlert ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setSpanAlert(false)}>
                <AlertF type="success" text="Project week span saved!" margin="0px"/>
            </div>
            <div className={`alert alert-success ${pipingAlert ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setPipingAlert(false)}>
                <AlertF type="success" text="Piping classes saved!" margin="0px"/>
            </div>
            <div className={`alert alert-success ${materialsAlert ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setMaterialsAlert(false)}>
                <AlertF type="success" text="Materials saved!" margin="0px"/>
            </div>
            <div className={`alert alert-success ${success ? 'alert-shown' : 'alert-hidden'}`} onTransitionEnd={() => setSuccess(false)}>
                <AlertF type="success" text="Changes saved!" margin="0px"/>
            </div>
            <button className="back__button" onClick={()=>history.push('/'+process.env.REACT_APP_PROJECT+'/piping')} style={{width:"175px", marginLeft:"100px", marginTop: "120px"}}><img src={BackIcon} alt="hold" className="navBar__icon" style={{marginRight:"0px"}}></img><p className="back__button__text">Back</p></button>
            <div className="top__container">
                <div className="graph__container">

                </div>
                <div className="materials__pc__container">
                <div id="hot-app" style={{marginBottom:"20px"}}>
                    <HotTable
                        data={materials}
                        colHeaders = {["<b>Material</b>"]}
                        rowHeaders={true}
                        width="500"
                        height="225"
                        settings={matSettings} 
                        manualColumnResize={true}
                        manualRowResize={true}
                        columns= {[{ data: "Material"}]}
                        filters={true}
                        dropdownMenu= {[
                            'make_read_only',
                            '---------',
                            'alignment',
                            '---------',
                            'filter_by_condition',
                            '---------',
                            'filter_operators',
                            '---------',
                            'filter_by_condition2',
                            '---------',
                            'filter_by_value',
                            '---------',
                            'filter_action_bar',
                        ]}
                    />
                    </div>
                        <button class="btn btn-sm btn-info" onClick={() => addRowMaterials()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px", backgroundColor:"#338DF1", marginLeft:"190px"}}>Add</button>
                        <button class="btn btn-sm btn-success" onClick={() => submitChangesMaterials()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px", backgroundColor:"#7BD36D"}}>Save</button>
                    <div id="hot-app" style={{marginBottom:"20px", marginTop:"40px"}}>
                    <HotTable
                        data={piping}
                        colHeaders = {["<b>Piping class</b>", "<b>Material</b>"]}
                        rowHeaders={true}
                        width="500"
                        height="225"
                        settings={pipingSettings} 
                        manualColumnResize={true}
                        manualRowResize={true}
                        columns= {[{ data: "PipingClass"}, { data: "Material", type:"dropdown",strict:"true", source: materialsList}]}
                        filters={true}
                        dropdownMenu= {[
                            'make_read_only',
                            '---------',
                            'alignment',
                            '---------',
                            'filter_by_condition',
                            '---------',
                            'filter_operators',
                            '---------',
                            'filter_by_condition2',
                            '---------',
                            'filter_by_value',
                            '---------',
                            'filter_action_bar',
                        ]}
                    />
                    </div>
                    <button class="btn btn-sm btn-info" onClick={() => addRowPiping()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px", backgroundColor:"#338DF1", marginLeft:"190px"}}>Add</button>
                    <button class="btn btn-sm btn-success" onClick={() => submitChangesPiping()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px", backgroundColor:"#7BD36D"}}>Save</button>

                </div>
            </div>
            <div className="management__container">
                <text className="materials__title">Project Management</text>
                <button className="save__button" onClick={()=> submitManagement()}><img src={SaveIcon} alt="save" className="save__icon"></img></button>
                
                
                <div style={{marginTop:"10px"}}>
                    <HotTable
                        data={management}
                        colHeaders = {["<b>Starting date</b>", "<b>Finishing date</b>"]}
                        rowHeaders={true}
                        width="500"
                        height="120"
                        settings={pipingSettings} 
                        manualColumnResize={true}
                        manualRowResize={true}
                        columns= {[{ data: "Starting date", type:"date"}, { data: "Finishing date", type:"date"}]}
                        filters={true}
                        dropdownMenu= {[
                            'make_read_only',
                            '---------',
                            'alignment',
                            '---------',
                            'filter_by_condition',
                            '---------',
                            'filter_operators',
                            '---------',
                            'filter_by_condition2',
                            '---------',
                            'filter_by_value',
                            '---------',
                            'filter_action_bar',
                        ]}
                    />
                </div>
            </div>
            <div className="materials__tables__container">
                
                {tables}
            </div>
        </body>
    );
};

export default PITRequests;