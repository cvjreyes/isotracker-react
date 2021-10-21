import FileIcon from "../../assets/images/file-icon.png"
import ChartColorIcon from "../../assets/images/chart-color-icon.png"
import PipeIcon from "../../assets/images/pipe-icon.png"
import EquiIcon from "../../assets/images/equi-icon.png"
import StruIcon from "../../assets/images/stru-icon.png"
import ElecIcon from "../../assets/images/elec-icon.png"
import InstIcon from "../../assets/images/inst-icon.png"
import React, { useState, useEffect } from 'react';
import MenuListPITList from "../menuListPitList/menuListPitList"




const MenuListPIT = () =>{

    return(
        <div class="panel__container">
            <div className="panel__heading__container">
                <h4>
                    <text className="panel__heading__text">PITRequests</text>
                </h4>
            </div>

            <div className="elements__container">
                <div className="menu" style={{paddingTop:"10px"}}>
                    <MenuListPITList/>
                </div>
                
            </div>
            
            
        </div>
    );
};

export default MenuListPIT;