import DataTable from "../../components/datatable/datatable"
import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import "./styles.css"
import React, { useState } from 'react';

const IsoCtrl = () => {
    const [currentTab, setCurrentTab] = useState()
    return (
        <body>
            <div className="container">
                <center>
                    <br></br>
                    <h2 className="title__container">
                        <b>
                            <i className="iso__title">IsoTracker</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">History</h3>
                </center>
                <br></br>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <ReportBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                                
                            </td>
                            <td style={{marginLeft:"5px"}}>
                                <a class="btn btn-info btn-lg" style={{display:"inline-block", position:"relative"}} onClick={() => setCurrentTab("upload")}>Upload files</a>
                            </td>
                            <td style={{width: "64%"}}>
                                <StateTable/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <br></br>
                <DataTable/>
                <center className="navBtns__center">
                    <NavBtns onChange={value => setCurrentTab(value)} currentTab = {currentTab}/>
                    
                </center>
            </div>
        </body>

        
    );
};

export default IsoCtrl;
