import "./navBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

const NavBtns = (props, {activate}) =>{
    const [tab, setTab] = useState()
    console.log(activate)
    var designButton, stressButton, supportsButton, materialsButton, issuerButton, ldeIsocontrolButton
    if(tab === "design"){
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Design</b></button>
    }else{
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("design"));setTab("design")}}><b>Design</b></button>
    }
    if(tab === "stress"){
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Stress</b></button>
    }else{
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("stress"));setTab("stress")}}><b>Stress</b></button>
    }
    if(tab === "support"){
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Support</b></button>
    }else{
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("support"));setTab("support")}}><b>Support</b></button>
    }
    if(tab === "materials"){
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Materials</b></button>
    }else{
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("materials"));setTab("materials")}}><b>Materials</b></button>
    }
    if(tab === "issuer"){
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Issuer</b></button>
    }else{
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("issuer"));setTab("issuer")}}><b>Issuer</b></button>
    }
    if(tab === "ldeIsoControl"){
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>LDE/Isocontrol</b></button>
    }else{
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "fitContext", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {(props.onChange("ldeIsoControl"));setTab("ldeIsoControl")}}><b>LDE/Isocontrol</b></button>
    }
    
    return(
        <div>
            {designButton}
            {stressButton}
            {supportsButton}
            {materialsButton}
            {issuerButton}
            {ldeIsocontrolButton}
        </div>
    );
};

export default NavBtns;