
import React, { useState , useEffect} from 'react'
import { HotTable } from '@handsontable/react';

import IdleTimer from 'react-idle-timer'
import {useHistory} from "react-router";
import BackIcon from "../../assets/images/back.svg"
import Reports from "../../assets/images/Notepad.png"
import Graph from "../../assets/images/ChartBar.png"
import AlertF from "../../components/alert/alert"
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse'
import { saveAs } from 'file-saver';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx-js-style";

import './pipingProduction.css'
import SaveIcon from "../../assets/images/save.svg"
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import NavBarProdCurve from '../../components/navBarProdCurve/navBarProdCurve';


import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    const [tab, setTab] = useState("prod")
    const [tabBtns, setTabBtns] = useState(null)
    const [usersType, setUsersType] = useState("iso")
    const [usersData, setUsersData] = useState(null)

    const [updateData, setUpdateData] = useState(false)
    const [updateRows, setUpdateRows] = useState(false)
    const [tables, setTables] = useState([])
    const [materials, setMaterials] = useState([])
    const [materialsList, setMaterialsList] = useState([])
    const [materialsIDList, setMaterialsIDList] = useState([])
    const [piping, setPiping] = useState([])
    const [management, setManagement] = useState([])

    const [estimatedData, setEstimatedData] = useState({})
    const [forecastData, setForecastData] = useState({})
    const [realData, setRealData] = useState({})
    const [estimatedProgressData, setEstimatedProgressData] = useState({})
    const [realProgressData, setRealProgressData] = useState({})
    const [estimatedMaterialData, setEstimatedMaterialData] = useState({})
    const [overallTable, setOverallTable] = useState()

    const[estimatedWeightData, setEstimatedWeightData] = useState({})
    const[forecastWeightData, setForecastWeightData] = useState({})
    const[realWeightData, setRealWeightData] = useState({})
    const[estimatedProgressWeightData, setEstimatedProgressWeightData] = useState({})
    const[realProgressWeightData, setRealProgressWeightData] = useState({})

    const[realWeightMatData, setRealWeightMatData] = useState({})
    const[realProgressWeightMatData, setRealProgressWeightMatData] = useState({})

    const [success, setSuccess] = useState(false)
    const [spanAlert, setSpanAlert] = useState(false)
    const [pipingAlert, setPipingAlert] = useState(false)
    const [materialsAlert, setMaterialsAlert] = useState(false)

    const [lineChart, setLineChart] = useState()

    const [loading, setLoading] = useState(false)

    const [estimatedOverall, setEstimatedOverall] = useState([])
    const [realOverall, setRealOverall] = useState([])
    const [estimatedProgressOverall, setEstimatedProgressOverall] = useState([])
    const [realProgressOverall, setRealProgressOverall] = useState([])
    const colors = ["#4169E1", "#B0E0E6", "#00BFFF", "#008000", "#7CFC00", "#98FB98", "#FF8C00", "#FFD700", "#FF0000", "#FF1493", "#FF69B4", "#FFC0CB", "#708090", "#A9A9A9", "#DCDCDC", "#20B2AA", "#00CED1", "#AFEEEE"]

    document.body.style.zoom = 1

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
        const table_class = ["mat1-table", "mat2-table", "mat3-table", "mat4-table", "mat5-table", "mat6-table"]
        const weight_table_class = ["wmat1-table", "wmat2-table", "wmat3-table", "wmat4-table", "wmat5-table", "wmat6-table"]
        
        await setLoading(true)

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
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


        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedByMaterial", options)
            .then(response => response.json())
            .then(async json => {
                let est = estimatedMaterialData
                for(let i = 0; i < json.estimated.length; i++){
                    est[json.estimated[i].id] = json.estimated[i].estimated
                }
                await setEstimatedMaterialData(est)
            })

        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaterials", options)
            .then(response => response.json())
            .then(async json => {
                const materials = json.materials
                let mat = []
                let matList = []
                let matIDList = []
                for(let i = 0; i < materials.length; i++){
                    mat.push({"id": materials[i].id, "Material": materials[i].name})
                    matList.push(materials[i].name)
                    matIDList.push(materials[i].id)
                }
                await setMaterialsIDList(matIDList)
                await setMaterials(mat)
                await setMaterialsList(matList)

                if(tab === "prod"){
                    setTabBtns(<div style={{width: "140px"}}>
                        <button className="reporting__tab__button" style={{backgroundColor:"#338DF1"}}>P</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setTab("weight")}>W</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setTab("users")}>U</button>
                    </div>)
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getIssuedByMatWeek", options)
                    .then(response => response.json())
                    .then(async json => {
                        const issued = json.issued
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedMatWeek", options)
                            .then(response => response.json())
                            .then(async json => {

                                const estimated = json.estimated
                                if(estimated.length > 0){
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
                                        let graphData = []
                                        let est = {}
                                        let sumEst = {}
                                        let sumReal = {}
                                        let sumForc = {}
                                        let sumEstGraph = []
                                        let sumRealGraph = []
                                        let sumForcGraph = []
                                        let countEst = 0
                                        let countReal = 0
                                        let countForc = 0
                                        let forc = {}
                                        let col = []
                                        let sumEstCells = []

                                        for(let i = 0; i < estimated.length; i++){
                                            if(estimated[i].material_id === material){
                                                weeks.push(estimated[i].week.toString())
                                                est[estimated[i].week.toString()] = estimated[i].estimated
                                                forc[forecast[i].week.toString()] = forecast[i].estimated
                                                countForc += forecast[i].estimated
                                                countEst += estimated[i].estimated
                                                sumEst[estimated[i].week.toString()] = countEst
                                                if(issued[material]){
                                                    if(issued[material][estimated[i].week]){
                                                        countReal += issued[material][estimated[i].week]
                                                    }
                                                }
                                                sumReal[estimated[i].week.toString()] = countReal
                                                sumForc[estimated[i].week.toString()] = countForc
                                                col.push({ data: estimated[i].week.toString(), type: "numeric"})
                                                sumEstCells.push({row: 1, col: i, readOnly:true})
                                                sumEstCells.push({row: 3, col: i, readOnly:true})
                                                sumEstCells.push({row: 4, col: i, readOnly:true})
                                            }else{
                                                let estData = estimatedData
                                                estData[material] = est
                                                await setEstimatedData(estData)
                                                let forcData = forecastData
                                                forcData[material] = forc
                                                await setForecastData(forcData)
                                                let rData = realData
                                                rData[material] = issued[material]
                                                await setRealData(rData)
                                                let sumEstData = estimatedProgressData
                                                sumEstData[material] = sumEst
                                                await setEstimatedProgressData(sumEstData)
                                                let sumRealData = realProgressData
                                                sumRealData[material] = sumReal
                                                await setRealProgressData(sumRealData)
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

                                                let t_class = table_class[matIDList.indexOf(material)]

                                                await tables.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", width:"1750px", paddingBottom:"30px", marginTop:"20px"}}><div style={{display:"flex"}}><text className="materials__title">{estimated[i-1].name.toUpperCase()} Isometrics <text style={{fontSize:"17px"}}>{totalEst}</text> {warning}</text><button className="save__button" onClick={()=> submitEstimatedForecast(estimated[i-1].material_id)}><img src={SaveIcon} alt="save" className="save__icon"></img></button></div>
                                                <div style={{marginTop:"10px"}}><HotTable
                                                data={[est, issued[material], forc, sumEst, sumReal]}
                                                colHeaders={weeks}
                                                rowHeaders={["Estimated", "Real", "Forecast", "Estimated progress", "Real progress"]}
                                                width="1750"
                                                height="160"
                                                settings={settings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                cell = {sumEstCells}
                                                className={t_class}
                                            /></div></div>)

                                            Object.keys(sumEst).map(function(key, index) {
                                                sumEstGraph.push(sumEst[key])
                                            });

                                            Object.keys(sumReal).map(function(key, index) {
                                                sumRealGraph.push(sumReal[key])
                                            });

                                            Object.keys(sumForc).map(function(key, index) {
                                                sumForcGraph.push(sumForc[key])
                                            });

                                            let color_index = ((matIDList.indexOf(material)) * 3)
                                            
                                            graphData.push({
                                                label: 'Estimated ' + estimated[i-1].name,
                                                fill: false,
                                                lineTension: 0.2,
                                                backgroundColor: colors[color_index],
                                                borderColor: colors[color_index],
                                                borderWidth: 1,
                                                data: sumEstGraph
                                            })

                                            graphData.push({
                                                label: 'Forecast ' + estimated[i-1].name,
                                                fill: false,
                                                lineTension: 0.2,
                                                backgroundColor: colors[color_index + 2],
                                                borderColor: colors[color_index + 2],
                                                borderWidth: 1,
                                                data: sumForcGraph
                                            })

                                            graphData.push({
                                                label: 'Real ' + estimated[i-1].name,
                                                fill: false,
                                                lineTension: 0.2,
                                                backgroundColor: colors[color_index + 1],
                                                borderColor: colors[color_index + 1],
                                                borderWidth: 1,
                                                data: sumRealGraph
                                            })
                
                                            weeks = [estimated[i].week.toString()]
                                            est = {}
                                            forc = {}
                                            sumEst = {}
                                            sumReal = {}
                                            sumForc = {}
                                            sumEstGraph = []
                                            sumRealGraph = []
                                            sumForcGraph = []
                                            est[estimated[i].week.toString()] = estimated[i].estimated
                                            forc[forecast[i].week.toString()] = forecast[i].estimated
                                            if(issued[estimated[i].material_id]){
                                                if(issued[estimated[i].material_id]["1"]){
                                                    countReal = issued[estimated[i].material_id][estimated[i].week]
                                                }else{
                                                    countReal = 0
                                                }
                                            }else{
                                                countReal = 0
                                            }
                                            sumReal[estimated[i].week.toString()] = countReal

                                            if(estimated[i].estimated){
                                                countEst = estimated[i].estimated
                                            }else{
                                                countEst = 0
                                            }

                                            if(forecast[i].estimated){
                                                countForc = forecast[i].estimated
                                            }else{
                                                countForc = 0
                                            }
                                            sumForc[forecast[i].week.toString()] = countForc
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
                                        let rData = realData
                                        rData[material] = issued[material]
                                        await setRealData(rData)
                                        let sumEstData = estimatedProgressData
                                        sumEstData[material] = sumEst
                                        await setEstimatedProgressData(sumEstData)
                                        let sumRealData = realProgressData
                                        sumRealData[material] = sumReal
                                        await setRealProgressData(sumRealData)
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

                                        let t_class = table_class[matIDList.indexOf(material)]

                                        await tables.push(<div id="hot-app" style={{width:"1750px", paddingBottom:"30px", marginTop:"20px"}}><div style={{display:"flex"}}><text className="materials__title">{estimated[estimated.length-1].name.toUpperCase()} Isometrics <text style={{fontSize:"17px"}}>{totalEst}</text> {warning}</text><button className="save__button" onClick={()=> submitEstimatedForecast(material)}><img src={SaveIcon} alt="save" className="save__icon"></img></button></div>
                                        <div style={{marginTop:"10px"}}><HotTable
                                                data={[est, issued[material], forc, sumEst, sumReal]}
                                                colHeaders={weeks}
                                                rowHeaders={["Estimated", "Real", "Forecast", "Estimated progress", "Real progress"]}
                                                width="1750"
                                                height="160"
                                                settings={settings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                cell = {sumEstCells}
                                                className={t_class}
                                            /></div></div>)

                                        await setTables([])
                                        await setTables(tables)

                                        Object.keys(sumEst).map(function(key, index) {
                                            sumEstGraph.push(sumEst[key])
                                        });

                                        Object.keys(sumReal).map(function(key, index) {
                                            sumRealGraph.push(sumReal[key])
                                        });
                                        Object.keys(sumForc).map(function(key, index) {
                                            sumForcGraph.push(sumForc[key])
                                        });

                                        let color_index = (matIDList.indexOf(material)) * 3
                                        
                                        graphData.push({
                                            label: 'Estimated ' + estimated[estimated.length-1].name,
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: colors[color_index],
                                            borderColor: colors[color_index],
                                            borderWidth: 1,
                                            data: sumEstGraph
                                        })

                                        graphData.push({
                                            label: 'Forecast ' + estimated[estimated.length-1].name,
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: colors[color_index + 2],
                                            borderColor: colors[color_index + 2],
                                            borderWidth: 1,
                                            data: sumForcGraph
                                        })

                                        graphData.push({
                                            label: 'Real ' + estimated[estimated.length-1].name,
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: colors[color_index + 1],
                                            borderColor: colors[color_index + 1],
                                            borderWidth: 1,
                                            data: sumRealGraph
                                        })

                                    
                                        let overallTable = []
                                        let totalEstimated = 0

                                        let estimatedOverall = {}
                                        let esimatedOverallSum = {}
                                        let estimatedOverallCount = 0
                                        let estimatedOverallGraph = []

                                        let realOverall = {}
                                        let realOverallSum = {}
                                        let realOverallCount = 0
                                        let realOverallGraph = []

                                        Object.keys(estimatedMaterialData).map(function(key, index) {
                                            totalEstimated += estimatedMaterialData[key]
                                        });

                                        Object.keys(issued).map(function(key, index) {
                                            Object.keys(issued[key]).map(function(k, index) {
                                                if(realOverall[k]){
                                                    realOverall[k] += issued[key][k]
                                                }else{
                                                    realOverall[k] = issued[key][k]
                                                }
                                            })
                                        });

                                        Object.keys(estimated).map(function(key, index) {
                                            if(estimatedOverall[estimated[key].week]){
                                                estimatedOverall[estimated[key].week] += estimated[key].estimated
                                            }else{
                                                estimatedOverall[estimated[key].week] = estimated[key].estimated
                                            }
                                        });

                                        let labels = []
                                        let overallCells = []
                                        await Object.keys(estimatedOverall).map(function(key, index) {
                                            if(realOverall[key]){
                                                realOverallCount += realOverall[key]
                                            }
                                            realOverallSum[key] = realOverallCount
                                            estimatedOverallCount += estimatedOverall[key]
                                            esimatedOverallSum[key] = estimatedOverallCount
                                            estimatedOverallGraph.push(estimatedOverallCount)
                                            realOverallGraph.push(realOverallCount)

                                            overallCells.push({row: 2, col: index, className: "overallCell__estSum"})
                                            overallCells.push({row: 3, col: index, className: "overallCell__realSum"})

                                            labels.push("W" + key.toString())
                                        });

                                        graphData.push({
                                            label: 'Estimated Overall',
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: 'rgb(147,112,219)',
                                            borderColor: 'rgb(147,112,219)',
                                            borderWidth: 1,
                                            data: estimatedOverallGraph
                                        })

                                        graphData.push({
                                            label: 'Real Overall',
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: 'rgb(255,80,80)',
                                            borderColor: 'rgb(255,80,80)',
                                            borderWidth: 1,
                                            data: realOverallGraph
                                        })

                                        warning = null
                                        if(totalEstimated < estimatedOverallCount){
                                            warning = <text className="warning__text">*Estimated exceeded by {estimatedOverallCount-totalEstimated}!</text>
                                        }
                                        await overallTable.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", borderTop:"1px solid lightgray", width:"1750px", paddingBottom:"30px", paddingTop:"30px", marginTop:"20px"}}><text className="materials__title">OVERALL Isometrics <text style={{fontSize:"17px"}}>({totalEstimated} estimated)</text> {warning}</text>
                                        <div style={{marginTop:"10px"}}><HotTable
                                                data={[estimatedOverall, realOverall, esimatedOverallSum, realOverallSum]}
                                                colHeaders={weeks}
                                                rowHeaders={["Estimated", "Real", "Estimated progress", "Real progress"]}
                                                width="1750"
                                                height="138"
                                                settings={settings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                readOnly= {true}
                                                className='overall-table'
                                                
                                            /></div></div>)

                                        await setEstimatedOverall(estimatedOverall)
                                        await setRealOverall(realOverall)
                                        await setEstimatedProgressOverall(esimatedOverallSum)
                                        await setRealProgressOverall(realOverallSum)
                                        await setOverallTable()
                                        await setOverallTable(overallTable)
                                        await setLineChart(<Line
                                            data={{
                                                labels: labels,
                                                datasets: graphData
                                            }}
                                            options={{
                                                hover: {
                                                    mode: 'new mode'
                                                },
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "PRODUCTION CURVES",
                                                        font: {size: "22px"}
                                                    },
                                                    legend: {
                                                        display: true,
                                                        position: "left",
                                                        labels: {
                                                            filter: function (legendItem, chartData) {
                                                                    chartData.datasets[legendItem.datasetIndex].hidden = true
                                                                return true
                                                            },
                                                        },
                                                    },
                                                    
                                                },
                                                
                                                
                                            }}
                                        />)

                                    })
                                }
                            })
                    })  
                }else if(tab === "weight"){
                    setTabBtns(<div style={{width: "140px"}}>
                        <button className="reporting__tab__button" onClick={() => setTab("prod")}>P</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px",backgroundColor:"#338DF1"}}>W</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setTab("users")}>U</button>
                    </div>)
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getIssuedWeightByMatWeek", options)
                    .then(response => response.json())
                    .then(async json => {
                        const issued = json.issued
                        await setRealWeightMatData(issued)
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedForecastWeight", options)
                            .then(response => response.json())
                            .then(async json => {

                                const estimated = json.estimated
                                if(estimated.length > 0){  
                                        let tables = []
                                        const weightSettings = {
                                            licenseKey: 'non-commercial-and-evaluation',
                                            colWidths: 55,
                                            rowHeaderWidth: 190
                                            //... other options
                                        }

                                        let weeks = []
                                        let graphData = []
                                        let est = {}
                                        let forc = {}
                                        let sumEst = {}
                                        
                                        let sumForc = {}
                                        let countEst = 0
                                        let countForc = 0
                                        let col = []
                                        let sumEstCells = []

                                        let realOverallCount = 0
                                        let realOverallSum = {}
                                        let realOverallGraph = []
                                        let realOverall = {}

                                        for(let i = 0; i < estimated.length; i++){
                                            weeks.push(estimated[i].week.toString())
                                            est[estimated[i].week] = estimated[i].estimated
                                            forc[estimated[i].week] = estimated[i].forecast
                                            countEst += estimated[i].estimated
                                            countForc += estimated[i].forecast
                                            sumEst[estimated[i].week] = countEst
                                            sumForc[estimated[i].week] = countForc

                                            col.push({ data: estimated[i].week.toString(), type: "numeric"})
                                        }

                                        Object.keys(issued).map(async function(key, index) {
                                            let countReal = 0
                                            let sumReal = {}
                                            let sumRealGraph = []
                                            Object.keys(est).map(async function(w, index) {
                                                if(issued[key][w]){
                                                    countReal += issued[key][w]
                                                    sumReal[w] = countReal
                                                }else{
                                                    sumReal[w] = countReal
                                                }
                                                if(realOverall[w]){
                                                    realOverall[w] += issued[key][w]
                                                }else{
                                                    realOverall[w] = issued[key][w]
                                                }
                                                
                                            })

                                            let t_class = weight_table_class[matIDList.indexOf(parseInt(key))]
                                            await tables.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", width:"1750px", paddingBottom:"30px", marginTop:"20px"}}><text className="materials__title">{materialsList[matIDList.indexOf(parseInt(key))].toUpperCase()} Weight (kg)</text>
                                                <div style={{marginTop:"10px"}}><HotTable
                                                data={[issued[key], sumReal]}
                                                colHeaders={weeks}
                                                rowHeaders={["Real", "Real progress"]}
                                                width="1750"
                                                height="80"
                                                settings={weightSettings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                readOnly= {true}
                                                cell = {sumEstCells}
                                                className={t_class}
                                            /></div></div>)
                                                
                                            Object.keys(sumReal).map(function(key, index) {
                                                sumRealGraph.push(sumReal[key])
                                            });

                                            let color_index = ((matIDList.indexOf(parseInt(key))) * 3)

                                            graphData.push({
                                                label: 'Real ' + materialsList[matIDList.indexOf(parseInt(key))],
                                                fill: false,
                                                lineTension: 0.2,
                                                backgroundColor: colors[color_index + 1],
                                                borderColor: colors[color_index + 1],
                                                borderWidth: 1,
                                                data: sumRealGraph
                                            })

                                            let realProgressWeight = realProgressWeightMatData
                                            realProgressWeight[key] = sumReal
                                            await setRealProgressWeightMatData(realProgressWeight)
                                        })
                                        
                                        await setTables([])
                                        await setTables(tables)
                                      
                                        let overallTable = []
                                        let totalEstimated = 0

                                        let estimatedOverall = {}
                                        let esimatedOverallSum = {}
                                        let estimatedOverallCount = 0
                                        let estimatedOverallGraph = []

                                        let forecastOverall = {}
                                        let forecastOverallSum = {}
                                        let forecastOverallCount = 0
                                        let forecastOverallGraph = []

                                        for(let i = 0; i < estimated.length; i++){
                                            totalEstimated += estimated[i]["estimated"]
                                        };
                                        
                                        Object.keys(est).map(function(key, index) {
                                            if(estimatedOverall[key]){
                                                estimatedOverall[key] += est[key]
                                            }else{
                                                estimatedOverall[key] = est[key]
                                            }
                                        });

                                        Object.keys(forc).map(function(key, index) {
                                            if(forecastOverall[key]){
                                                forecastOverall[key] += forc[key]
                                            }else{
                                                forecastOverall[key] = forc[key]
                                            }
                                        });

                                        await setEstimatedWeightData(estimatedOverall)
                                        await setForecastWeightData(forecastOverall)

                                        let labels = []
                                        let overallCells = []
                                        await Object.keys(estimatedOverall).map(function(key, index) {
                                            if(realOverall[key]){
                                                realOverallCount += realOverall[key]
                                            }
                                            realOverallSum[key] = realOverallCount
                                            estimatedOverallCount += estimatedOverall[key]
                                            esimatedOverallSum[key] = estimatedOverallCount
                                            estimatedOverallGraph.push(estimatedOverallCount)
                                            realOverallGraph.push(realOverallCount)

                                            forecastOverallCount += forecastOverall[key]
                                            forecastOverallSum[key] = forecastOverallCount
                                            forecastOverallGraph.push(forecastOverallCount)

                                            overallCells.push({row: 1, col: index, readOnly: true})
                                            overallCells.push({row: 3, col: index, className: "overallCell__estSum", readOnly: true})
                                            overallCells.push({row: 4, col: index, className: "overallCell__realSum", readOnly: true})

                                            labels.push("W" + key.toString())
                                        });

                                        
                                        graphData.push({
                                            label: 'Estimated Overall',
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: 'rgb(147,112,219)',
                                            borderColor: 'rgb(147,112,219)',
                                            borderWidth: 1,
                                            data: estimatedOverallGraph
                                        })

                                        graphData.push({
                                            label: 'Forecast Overall',
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: 'rgb(60,179,113)',
                                            borderColor: 'rgb(60,179,113)',
                                            borderWidth: 1,
                                            data: forecastOverallGraph
                                        })

                                        graphData.push({
                                            label: 'Real Overall',
                                            fill: false,
                                            lineTension: 0.2,
                                            backgroundColor: 'rgb(255,80,80)',
                                            borderColor: 'rgb(255,80,80)',
                                            borderWidth: 1,
                                            data: realOverallGraph
                                        })

                                        await overallTable.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", borderTop:"1px solid lightgray", width:"1750px", paddingBottom:"30px", paddingTop:"30px", marginTop:"20px"}}><div style={{display:"flex"}}><text className="materials__title">OVERALL Weight (kg) <text style={{fontSize:"17px"}}></text></text><button className="save__button" onClick={()=> submitWeight(estimatedOverall, forecastOverall)}><img src={SaveIcon} alt="save" className="save__icon"></img></button></div>
                                        <div style={{marginTop:"10px"}}><HotTable
                                                data={[estimatedOverall, realOverall, forecastOverall, esimatedOverallSum, realOverallSum]}
                                                colHeaders={weeks}
                                                rowHeaders={["Estimated", "Real", "Forecast", "Estimated progress", "Real progress"]}
                                                width="1750"
                                                height="145"
                                                settings={weightSettings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                className='overallWeight-table'
                                                cell={overallCells}
                                                
                                            /></div></div>)
                                            
                                        await setEstimatedWeightData(estimatedOverall)
                                        await setRealWeightData(realOverall)
                                        await setForecastWeightData(forecastOverall)
                                        await setEstimatedProgressWeightData(esimatedOverallSum)
                                        await setRealProgressWeightData(realOverallSum)
                                        await setOverallTable()
                                        await setOverallTable(overallTable)
                                        await setLineChart(<Line
                                            data={{
                                                labels: labels,
                                                datasets: graphData
                                            }}
                                            options={{
                                                hover: {
                                                    mode: 'new mode'
                                                },
                                                plugins: {
                                                    title: {
                                                        display: true,
                                                        text: "WEIGHT CURVES",
                                                        font: {size: "22px"}
                                                    },
                                                    legend: {
                                                        display: true,
                                                        position: "left",
                                                        labels: {
                                                            filter: function (legendItem, chartData) {
                                                                    chartData.datasets[legendItem.datasetIndex].hidden = true
                                                                return true
                                                            },
                                                        },
                                                    },
                                                    
                                                },
                                                
                                                
                                            }}
                                        />)

                                    
                                }
                            })
                    })  
                }else if(tab === "users"){
                    if(usersType === "iso"){
                        await setTabBtns(<div style={{width: "90px"}}>
                        <button className="reporting__tab__button" onClick={() => setTab("prod")}>P</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setTab("weight")}>W</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px", backgroundColor:"#338DF1"}}>U</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px", backgroundColor:"#338DF1"}}>I</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setUsersType("weight")}>W</button>
                        </div>)
                    }else if(usersType === "weight"){
                        await setTabBtns(<div style={{width: "90px"}}>
                        <button className="reporting__tab__button" onClick={() => setTab("prod")}>P</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setTab("weight")}>W</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px", backgroundColor:"#338DF1"}}>U</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px"}} onClick={async() => await setUsersType("iso")}>I</button>
                        <button className="reporting__tab__button" style={{marginTop:"10px", backgroundColor:"#338DF1"}}>W</button>
                        </div>)
                    }
                   

                    await setTables([])
                    await setLineChart(null)
                    await setOverallTable([])
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getEstimatedForecastWeight", options)
                    .then(response => response.json())
                    .then(async json => {
                        const estimated = json.estimated
                        const usersSettings = {
                            licenseKey: 'non-commercial-and-evaluation',
                            colWidths: 40,
                            rowHeaderWidth: 190
                            //... other options
                        }
                        let weeks = []
                        let col = []
                        if(estimated.length > 0){
                            for(let i = 0; i < estimated.length; i++){
                                weeks.push(estimated[i].week.toString())
                                col.push({ data: estimated[i].week.toString(), type: "numeric"})
                            }
                            if(usersType === "iso"){
                                await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getIsosByUserWeek", options)
                                .then(response => response.json())
                                .then(async json => {
                                    const user_isos = json.user_isos
                                    await setUsersData(user_isos)
                                    let t = []
                                    Object.keys(user_isos).map(async function(user, index) {
    
                                        await t.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", width:"1750px", paddingBottom:"10px", marginTop:"10px"}}><div style={{display:"flex"}}><text className="materials__title">{user.toUpperCase()} (Isometrics)<text style={{fontSize:"17px"}}></text></text></div>
                                        <div style={{marginTop:"10px"}}><HotTable
                                                data={[user_isos[user]["assigned"], user_isos[user]["sent"], user_isos[user]["returned"], user_isos[user]["remaining"]]}
                                                colHeaders={weeks}
                                                rowHeaders={["Assigned", "Sent", "Returned", "Remaining"]}
                                                width="1750"
                                                height="145"
                                                settings={usersSettings} 
                                                manualColumnResize={true}
                                                manualRowResize={true}
                                                columns= {col}
                                                filters={true}
                                                className='users-table'
                                                readOnly={true}
                                                
                                        /></div></div>)
                                    });
                                    
                                    await setTables(t)
                                })
                            }else if(usersType === "weight"){
                                await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getWeightByUserWeek", options)
                            .then(response => response.json())
                            .then(async json => {
                                const user_isos = json.user_isos
                                await setUsersData(user_isos)
                                let t = []
                                Object.keys(user_isos).map(async function(user, index) {

                                    await t.push(<div id="hot-app" style={{borderBottom:"1px solid lightgray", width:"1750px", paddingBottom:"10px", marginTop:"10px"}}><div style={{display:"flex"}}><text className="materials__title">{user.toUpperCase()} (Weight)<text style={{fontSize:"17px"}}></text></text></div>
                                    <div style={{marginTop:"10px"}}><HotTable
                                            data={[user_isos[user]["assigned"], user_isos[user]["sent"], user_isos[user]["returned"], user_isos[user]["remaining"]]}
                                            colHeaders={weeks}
                                            rowHeaders={["Assigned", "Sent", "Returned", "Remaining"]}
                                            width="1750"
                                            height="145"
                                            settings={usersSettings} 
                                            manualColumnResize={true}
                                            manualRowResize={true}
                                            columns= {col}
                                            filters={true}
                                            className='users-table'
                                            readOnly={true}
                                            
                                    /></div></div>)
                                });
                                
                                await setTables(t)
                            })
                            }
                            
                        }
                        
                    })
                    
                }

            })
            await setLoading(false)
    }, [updateData, tab, usersType])

    async function printDocument() {
        const input = document.getElementById('graph');
        if(tab === "prod"){
            html2canvas(input, {scrollY: -window.scrollY})
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF('l', 'mm', [340, 177]);
              pdf.addImage(imgData, 'JPEG', 5, 5);
              // pdf.output('dataurlnewwindow');
              pdf.save("Production.pdf");
            })
          ;
        }else if(tab === "weight"){
            html2canvas(input, {scrollY: -window.scrollY})
            .then((canvas) => {
              const imgData = canvas.toDataURL('image/png');
              const pdf = new jsPDF('l', 'mm', [340, 177]);
              pdf.addImage(imgData, 'JPEG', 5, 5);
              // pdf.output('dataurlnewwindow');
              pdf.save("Weight.pdf");
            })
          ;
        }
        
      }

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

    async function submitWeight(estimatedOverall, forecastOverall){
        const body ={
            estimated: estimatedOverall,
            forecast: forecastOverall
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitEstimatedForecastWeight", options)
        .then(response => response.json())
        .then(async json => {
            if(json.success){
                await setSuccess(true)
                await setUpdateData(!updateData)
            }
        })        
    }

    async function exportPiping(){

        if(tab === "prod"){
            let weeks = {0: "WEEK"}
            let estAll = estimatedOverall
            let realAll = realOverall
            let estProgressAll = estimatedProgressOverall
            let realProgressAll = realProgressOverall
    
            Object.keys(estAll).map(function(key, index) {
                weeks[key] = "W" + key
                if(!estAll[key]){
                    estAll[key] = " "
                }
                if(!realAll[key]){
                    realAll[key] = " "
                }
            });
    
            estAll[0] = "Estimated"
            realAll[0] = "Real"
            estProgressAll[0] = "Estimated Progress"
            realProgressAll[0] = "Real Progress"
            weeks[0] = "Week"
    
            let apiData = [{},{0:"Piping production curves"}, {}, {}, {0: "OVERALL Isometrics"}, weeks, estAll, realAll, estProgressAll, realProgressAll]
    
            for(let i = 0; i < materials.length; i++){
                apiData.push({})
                apiData.push({})
                apiData.push({0:materials[i].Material}) 
    
                let est = estimatedData[materialsIDList[i]]
                let real = realData[materialsIDList[i]]
                let forecast = forecastData[materialsIDList[i]]
                let sumEst = estimatedProgressData[materialsIDList[i]]
                let sumReal = realProgressData[materialsIDList[i]]
                if(!est){
                    est = {}
                }if(!real){
                    real = {}
                }if(!forecast){
                    forecast = {}
                }
    
                Object.keys(est).map(function(key, index) {
                    if(!est[key]){
                        est[key] = " "
                    }
                    if(!real[key]){
                        real[key] = " "
                    }
                    if(!forecast[key]){
                        forecast[key] = " "
                    }
                });
                
                est[0] = "Estimated"
                real[0] = "Real"
                forecast[0] = "Forecast"
                sumEst[0] = "Estimated progress"
                sumReal[0] = "Real progress"
    
                apiData.push(weeks)
                apiData.push(est)
                apiData.push(real)
                apiData.push(forecast)
                apiData.push(sumEst)
                apiData.push(sumReal)
            }
    
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let ws = XLSX.utils.json_to_sheet(apiData, {skipHeader: 1}); 
           
            Object.keys(ws).map(function(i, index) {
               
                if (typeof(ws[i]) != "string"){
                    if(index === 0){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                weight: "bold",
                                sz: 15,
                                color: {rgb: "4169E1"}
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                                wrapText: '3',
                            },
                        }  ;
                    }else if(colors[materialsList.indexOf(ws[i].v) * 3]){
                        let fill = colors[materialsList.indexOf(ws[i].v) * 3].replace('#','')
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: fill} }  
                        }  ;
                    }else if(ws[i].v === "OVERALL Isometrics"){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "9370DB"} }  
                        }  ;
                    }else if(ws[i].v.toString().includes("W")){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "C0C0C0"} }  
                        }  ;
                    }else{
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                
                            },
                            alignment: {
                                vertical: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "DCDCDC"} }  
                        }  ;
                    }
    
                }
            })
            
            var wscols = [
                {wch: 30}, // "characters"
            ];
    
            ws['!cols'] = wscols
    
            const wb = { Sheets: { Production: ws }, SheetNames: ["Production"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Production.xlsx");
        }else if(tab === "weight"){
            let weeks = {0: "WEEK"}
            let estAll = estimatedWeightData
            let forcAll = forecastWeightData
            let realAll = realWeightData
            let estProgressAll = estimatedProgressWeightData
            let realProgressAll = realProgressWeightData
    
            Object.keys(estAll).map(function(key, index) {
                weeks[key] = "W" + key
                if(!estAll[key]){
                    estAll[key] = " "
                }
                if(!realAll[key]){
                    realAll[key] = " "
                }
                if(!forcAll[key]){
                    forcAll[key] = " "
                }
            });
    
            estAll[0] = "Estimated"
            forcAll[0] = "Forecast"
            realAll[0] = "Real"
            estProgressAll[0] = "Estimated Progress"
            realProgressAll[0] = "Real Progress"
            weeks[0] = "Week"

            let apiData = [{},{0:"Piping weight curves"}, {}, {}, {0: "OVERALL Weight"}, weeks, estAll, realAll, forcAll, estProgressAll, realProgressAll]

            for(let i = 0; i < materials.length; i++){
                
                if(realProgressWeightMatData[materialsIDList[i]]){

                    apiData.push({})
                    apiData.push({})
                    apiData.push({0:materials[i].Material}) 
                    let real = realWeightMatData[materialsIDList[i]]
                    let sumReal = realProgressWeightMatData[materialsIDList[i]]
                    if(!real){
                        real = {}
                    }
        
                    Object.keys(estAll).map(function(key, index) {
                        if(!real[key]){
                            real[key] = " "
                        }
                    });
                    
                    real[0] = "Real"
                    sumReal[0] = "Real progress"
        
                    apiData.push(weeks)
                    apiData.push(real)
                    apiData.push(sumReal)
                }
                
            }

            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let ws = XLSX.utils.json_to_sheet(apiData, {skipHeader: 1}); 
           
            Object.keys(ws).map(function(i, index) {
               
                if (typeof(ws[i]) != "string"){
                    if(index === 0){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                weight: "bold",
                                sz: 15,
                                color: {rgb: "4169E1"}
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                                wrapText: '3',
                            },
                        }  ;
                    }else if(colors[materialsList.indexOf(ws[i].v) * 3]){
                        let fill = colors[materialsList.indexOf(ws[i].v) * 3].replace('#','')
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: fill} }  
                        }  ;
                    }else if(ws[i].v === "OVERALL Weight"){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "9370DB"} }  
                        }  ;
                    }else if(ws[i].v.toString().includes("W")){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "C0C0C0"} }  
                        }  ;
                    }else{
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                
                            },
                            alignment: {
                                vertical: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "DCDCDC"} }  
                        }  ;
                    }
    
                }
            })
            
            var wscols = [
                {wch: 30}, // "characters"
            ];
    
            ws['!cols'] = wscols
    
            const wb = { Sheets: { Production: ws }, SheetNames: ["Production"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "Weights.xlsx");
        }else if(tab === "users"){
            let apiData = []
            let type = ""
            if(usersType === "iso"){
                apiData = [{},{0:"User efficiency (Isometrics)"}]
                type = "User efficiency (Isometrics)"
            }else if(usersType === "weight"){
                apiData = [{},{0:"User efficiency (Weight)"}]
                type = "User efficiency (Weight)"

            }

            Object.keys(usersData).map(function(user, index) {
                apiData.push({})
                apiData.push({})
                apiData.push({0:user})

                let assigned = {}, sent = {}, returned = {}, remaining = {}, weeks = {0: "WEEK"}
                
                assigned[0] = "Assigned"
                sent[0] = "Sent"
                returned[0] = "Returned"
                remaining[0] = "Remaining"
                Object.keys(usersData[user]["remaining"]).map(function(key, index) {
                    weeks[key] = "W" + key
                    if(usersData[user]["assigned"]){
                        if(usersData[user]["assigned"][key]){
                            assigned[key] = usersData[user]["assigned"][key]
                        }else{
                            assigned[key] = ""
                        }
                    }else{
                        assigned[key] = ""
                    }

                    if(usersData[user]["sent"]){
                        if(usersData[user]["sent"][key]){
                            sent[key] = usersData[user]["sent"][key]
                        }else{
                            sent[key] = ""
                        }
                    }else{
                        sent[key] = ""
                    }

                    if(usersData[user]["returned"]){
                        if(usersData[user]["returned"][key]){
                            returned[key] = usersData[user]["returned"][key]
                        }else{
                            returned[key] = ""
                        }
                    }else{
                        returned[key] = ""
                    }

                    if(usersData[user]["remaining"]){
                        if(usersData[user]["remaining"][key]){
                            remaining[key] = usersData[user]["remaining"][key]
                        }else{
                            remaining[key] = 0
                        }
                    }else{
                        remaining[key] = ""
                    }

                });
                apiData.push(weeks)
                apiData.push(assigned)
                apiData.push(sent)
                apiData.push(returned)
                apiData.push(remaining)
                
            });
            const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
            let ws = XLSX.utils.json_to_sheet(apiData, {skipHeader: 1}); 

            Object.keys(ws).map(function(i, index) {
               
                if (typeof(ws[i]) != "string"){
                    if(index === 0){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                weight: "bold",
                                sz: 12,
                                color: {rgb: "4169E1"}
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                                wrapText: '3',
                            },
                        }  ;
                    }else if(ws[i].v === type){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "9370DB"} }  
                        }  ;
                    }else if(ws[i].v.toString().includes("W")){
                        ws[i].s = { 
                            font: {
                                name: "arial",
                            },
                            alignment: {
                                vertical: "center",
                                horizontal: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "C0C0C0"} }  
                        }  ;
                    }else{
                        ws[i].s = { 
                            font: {
                                name: "arial",
                                
                            },
                            alignment: {
                                vertical: "center",
                            },
                            border: {
                                right: {
                                    style: "thin",
                                    color: "000000"
                                },
                                left: {
                                    style: "thin",
                                    color: "000000"
                                },
                                bottom: {
                                    style: "thin",
                                    color: "000000"
                                },
                                top: {
                                    style: "thin",
                                    color: "000000"
                                },
                            },
                            fill: { fgColor: { rgb: "DCDCDC"} }  
                        }  ;
                    }
    
                }
            })


            var wscols = [
                {wch: 30}, // "characters"
            ];
    
            ws['!cols'] = wscols
    
            const wb = { Sheets: { Production: ws }, SheetNames: ["Production"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            let name = ""
            if(usersType === "iso"){
                name = "Users efficiency (Isometrics).xlsx"
            }else if(usersType === "weight"){
                name = "Users efficiency (Weight).xlsx"
            }
            FileSaver.saveAs(data, name);
        }
        
    }
    
    const matSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 400,
        //... other options
    }

    const pipingSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 200,
        //... other options
    }
    if(tab === "users"){
        return(
            <body style={{overflow:"hidden", height:"100vh"}}>
                {updateData}
                {updateRows}
                <IdleTimer
                    timeout={1000 * 60 * 15}
                    onIdle={handleOnIdle}
                    debounce={250}
                />
                <NavBarProdCurve/>
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
                <Collapse in={loading}>
                    <Alert style={{fontSize:"16px",position: "fixed", left: "50%", top:"10%", transform: "translate(-50%, -50%)",zIndex:"0"}} severity="info"
                        >
                        Processing...
                    </Alert>
                </Collapse>
                <div id="pdf">
                    <div style={{display:"flex"}}>
                        {tabBtns}
                        <div className="users__tables__container">
                            <div>
                                <h4 style={{fontSize:"22px", fontWeight:"bold", fontFamily:"Helvetica", color:"gray", marginTop:"20px", marginLeft:"700px"}}>USER EFFICIENCY</h4>
                            </div>
                            {tables}
                        </div>
                        <div style={{marginBottom:"30px", marginLeft:"1630px", position:"absolute"}}>
                            <button className="back__button" onClick={()=>history.push('/'+process.env.REACT_APP_PROJECT+'/piping')} style={{width:"110px", marginTop: "80px"}}><img src={BackIcon} alt="hold" className="navBar__icon" style={{marginRight:"0px", height: "30px"}}></img><p className="back__button__text">Back</p></button>
                            <button className="back__button" onClick={()=> exportPiping()} style={{width:"110px", marginLeft:"10px", marginTop: "80px"}}><img src={Reports} alt="report" className="navBar__icon" style={{marginRight:"0px", height: "30px"}}></img><p className="back__button__text">Export</p></button>
                        </div>
                        
                    </div>
                </div>
            </body>
        )
    }else{
        return(

            <body style={{overflow:"hidden", height:"100vh"}}>
                {updateData}
                {updateRows}
                <IdleTimer
                    timeout={1000 * 60 * 15}
                    onIdle={handleOnIdle}
                    debounce={250}
                />
                <NavBarProdCurve/>
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
                <Collapse in={loading}>
                    <Alert style={{fontSize:"16px",position: "fixed", left: "50%", top:"10%", transform: "translate(-50%, -50%)",zIndex:"0"}} severity="info"
                        >
                        Processing...
                    </Alert>
                </Collapse>
                <div id="pdf">
                <div className="top__container">
                    {tabBtns}
                    <div id="graph" className="graph__container">
                    
                    {lineChart}
                    
                    </div>
                    <div className="materials__pc__container">
                        <div style={{marginBottom:"30px"}}>
                            <button className="back__button" onClick={()=>history.push('/'+process.env.REACT_APP_PROJECT+'/piping')} style={{width:"110px", marginTop: "80px"}}><img src={BackIcon} alt="hold" className="navBar__icon" style={{marginRight:"0px", height: "30px"}}></img><p className="back__button__text">Back</p></button>
                            <button className="back__button" onClick={()=> printDocument()} style={{width:"110px", marginLeft:"10px", marginTop: "80px"}}><img src={Graph} alt="report" className="navBar__icon" style={{marginRight:"0px", height: "30px"}}></img><p className="back__button__text">Graph</p></button>
                            <button className="back__button" onClick={()=> exportPiping()} style={{width:"110px", marginLeft:"10px", marginTop: "80px"}}><img src={Reports} alt="report" className="navBar__icon" style={{marginRight:"0px", height: "30px"}}></img><p className="back__button__text">Export</p></button>
                        </div>
                        <div style={{display:"flex"}}>
                            <text className="materials__title">Project Management</text>
                            <button className="save__button" onClick={()=> submitManagement()}><img src={SaveIcon} alt="save" className="save__icon"></img></button>
                        </div>
                        <div style={{marginBottom:"20px", marginTop:"10px"}}>
                            <HotTable
                                data={management}
                                colHeaders = {["<b>Starting date</b>", "<b>Finishing date</b>"]}
                                rowHeaders={true}
                                width="500"
                                height="60"
                                settings={pipingSettings} 
                                manualColumnResize={true}
                                manualRowResize={true}
                                columns= {[{ data: "Starting date", type:"date"}, { data: "Finishing date", type:"date"}]}
                                filters={true}
                                className='project__management'
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
                        <div id="hot-app" style={{marginBottom:"20px"}}>
                            <HotTable
                                data={materials}
                                colHeaders = {["<b>Material</b>"]}
                                rowHeaders={true}
                                width="450"
                                height="130"
                                settings={matSettings} 
                                manualColumnResize={true}
                                manualRowResize={true}
                                columns= {[{ data: "Material"}]}
                                filters={true}
                                className='project__management'
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
                                <button class="btn btn-sm btn-info" onClick={() => addRowMaterials()} style={{marginRight:"5px", fontSize:"12px",width:"60px", borderRadius:"10px", backgroundColor:"#338DF1", marginLeft:"165px"}}>Add</button>
                                <button class="btn btn-sm btn-success" onClick={() => submitChangesMaterials()} style={{marginRight:"5px", fontSize:"12px", width:"60px", borderRadius:"10px", backgroundColor:"#7BD36D"}}>Save</button>
                            <div id="hot-app" style={{marginBottom:"20px", marginTop:"40px"}}>
                            <HotTable
                                data={piping}
                                colHeaders = {["<b>Piping class</b>", "<b>Material</b>"]}
                                rowHeaders={true}
                                width="500"
                                height="130"
                                settings={pipingSettings} 
                                manualColumnResize={true}
                                manualRowResize={true}
                                columns= {[{ data: "PipingClass"}, { data: "Material", type:"dropdown",strict:"true", source: materialsList}]}
                                filters={true}
                                className='project__management'
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
                            <button class="btn btn-sm btn-info" onClick={() => addRowPiping()} style={{marginRight:"5px", fontSize:"12px",width:"60px", borderRadius:"10px", backgroundColor:"#338DF1", marginLeft:"165px"}}>Add</button>
                            <button class="btn btn-sm btn-success" onClick={() => submitChangesPiping()} style={{marginRight:"5px", fontSize:"12px", width:"60px", borderRadius:"10px", backgroundColor:"#7BD36D"}}>Save</button>
    
                        </div>
                </div>
                <div className="materials__tables__container">
                    {overallTable}
                    {tables}
                </div>
                </div>
            </body>
        );
    }
    
};

export default PITRequests;