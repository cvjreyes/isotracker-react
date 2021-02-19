//Botones inferiores para navegar por isoControl

import "./navBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBtns = props =>{
    var designButton, stressButton, supportsButton, materialsButton, issuerButton, ldeIsocontrolButton
    if(props.currentTab === "Design"){
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Design</b></button>
    }else{
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Design")}}><b>Design</b></button>
    }
    if(props.currentTab === "Stress"){
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Stress</b></button>
    }else{
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Stress")}}><b>Stress</b></button>
    }
    if(props.currentTab === "Support"){
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Support</b></button>
    }else{
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Support")}}><b>Support</b></button>
    }
    if(props.currentTab === "Materials"){
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180x", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Materials</b></button>
    }else{
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Materials")}}><b>Materials</b></button>
    }
    if(props.currentTab === "Issuer"){
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Issuer</b></button>
    }else{
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Issuer")}}><b>Issuer</b></button>
    }
    if(props.currentTab === "LDE/IsoControl"){
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>LDE/Isocontrol</b></button>
    }else{
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("LDE/IsoControl")}}><b>LDE/Isocontrol</b></button>
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