//Lista que muestra las diferentes aplicaciones de IsoTracker y su progreso

import './menuList.css'
import FileIcon from "../../assets/images/file-icon.png"
import ChartColorIcon from "../../assets/images/chart-color-icon.png"
import PipeIcon from "../../assets/images/pipe-icon.png"
import EquiIcon from "../../assets/images/equi-icon.png"
import StruIcon from "../../assets/images/stru-icon.png"
import ElecIcon from "../../assets/images/elec-icon.png"
import InstIcon from "../../assets/images/inst-icon.png"
import React, { useState } from 'react';

const MenuList = () =>{

    //Existe un estado para cada opción del menu
    const [isoIsShown, setIsoIsShown] = useState(false);
    const [progIsShown, setProgIsShown] = useState(false);
    const [pipeIsShown, setPipeIsShown] = useState(false);
    const [equipIsShown, setEquipIsShown] = useState(false);
    const [civIsShown, setCivIsShown] = useState(false);
    const [instIsShown, setInstIsShown] = useState(false);
    const [elecIsShown, setElecIsShown] = useState(false);

    return(
        <div class="panel__container">
            <div className="panel__heading__container">
                <h4>
                    <b className="panel__heading__text">3D Progress Control v2</b>
                </h4>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: isoIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setIsoIsShown(true)} onMouseLeave={() => setIsoIsShown(false)} ><img src={FileIcon} alt="file" className="panel__icon"/>&nbsp;&nbsp;&nbsp;IsoTracker</h4>
                        <div className="progress__bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                            <span class="sr-only"></span><strong>Open</strong>
                        </div>
                    </a> 
                </div>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: progIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setProgIsShown(true)} onMouseLeave={() => setProgIsShown(false)}><img src={ChartColorIcon} alt="chart" className="panel__icon"/>&nbsp;&nbsp;&nbsp;3D Progress (Weight: 47688 | 100%)</h4>
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "67.24%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>67.24%</strong>                                         
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: pipeIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setPipeIsShown(true)} onMouseLeave={() => setPipeIsShown(false)}><img src={PipeIcon} alt="pipe" className="panel__icon"/>&nbsp;&nbsp;&nbsp;Piping (Weight: 20582 | 43.18%)</h4>        
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "91.1%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>91.1%</strong>                                       
                        </div>
                    </div>          
                </div>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/isotracker" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: equipIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setEquipIsShown(true)} onMouseLeave={() => setEquipIsShown(false)}><img src={EquiIcon} alt="equi" className="panel__icon"/>&nbsp;&nbsp;&nbsp;Equipment (Weight: 4225 | 8.86%)</h4>                   
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "60.4%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>60.4%</strong>                                         
                        </div>
                    </div>
                </div>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: civIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setCivIsShown(true)} onMouseLeave={() => setCivIsShown(false)}><img src={StruIcon} alt="stru" className="panel__icon"/>&nbsp;&nbsp;&nbsp;Civil (Weight: 16730 | 35.1%)</h4> 
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "82.38%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>82.38%</strong>                                        
                        </div>
                    </div>         
                </div>
            </div>
            <div className="panel__content__container">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: instIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setInstIsShown(true)} onMouseLeave={() => setInstIsShown(false)}><img src={InstIcon} alt= "inst" className="panel__icon"/>&nbsp;&nbsp;&nbsp;Instrumentation (Weight: 1886 | 3.96%)</h4>         
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "27.36%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>27.36%</strong>                                         
                        </div>
                    </div>   
                </div>
            </div>
            <div className="panel__content__container__last">
                <div>
                    <a href="/" style={{textDecoration: "none"}}>
                        <h4 style={{backgroundColor: elecIsShown ? "lightgray":"white", transition: "background-color 0.5s"}} className="panel__icon__container" onMouseEnter={() => setElecIsShown(true)} onMouseLeave={() => setElecIsShown(false)}><img src={ElecIcon} alt="inst" className="panel__icon"/>&nbsp;&nbsp;&nbsp;Electrical (Weight: 4245 | 8.91%)</h4>
                    </a>
                    <div class="progress" style={{height: "25px"}}>
                        <div class="progress-bar" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{color: "black", fontSize: "15px", width: "62.4%", backgroundColor: "#A0AFD9",textAlign: "center"}}>
                            <span class="sr-only"></span><strong>62.4%</strong>                                         
                        </div>
                    </div>
                    
                </div>
            </div>            
        </div>
    );
};

export default MenuList;