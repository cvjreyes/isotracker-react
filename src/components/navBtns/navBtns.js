//Botones inferiores para navegar por isoControl

import "./navBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';

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

const NavBtns = props =>{
    var designButton, stressButton, supportsButton, materialsButton, issuerButton, ldeIsocontrolButton
    if(props.currentTab === "Design"){
        secureStorage.setItem("tab", "Design")
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Design</b></button>
    }else{
        designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Design")}}><b>Design</b></button>
        
    }
    if(props.currentTab === "Stress"){
        secureStorage.setItem("tab", "Stress")
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Stress</b></button>
    }else{
        stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Stress")}}><b>Stress</b></button>
        
    }
    if(props.currentTab === "Supports"){
        secureStorage.setItem("tab", "Supports")
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Support</b></button>
    }else{
        supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Supports")}}><b>Support</b></button>
        
    }
    if(props.currentTab === "Materials"){
        secureStorage.setItem("tab", "Materials")
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Materials</b></button>
    }else{
        materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Materials")}}><b>Materials</b></button>
        
    }
    if(props.currentTab === "Issuer"){
        secureStorage.setItem("tab", "Issuer")
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Issuer</b></button>
    }else{
        issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Issuer")}}><b>Issuer</b></button>
        
    }
    if(props.currentTab === "LDE/IsoControl"){
        secureStorage.setItem("tab", "LDE/IsoControl")
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>LOS/Isocontrol</b></button>
    }else{
        ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("LDE/IsoControl")}}><b>LOS/Isocontrol</b></button>
    }if(props.currentTab === "My Tray"){
        switch(props.currentRole){
            case "Design":
                designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Design")}}><b>Design</b></button>
                break;
            case "DesignLead":
                designButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Design")}}><b>Design</b></button>
                break;
            case "Stress":
                stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Stress")}}><b>Stress</b></button>
                break;
            case "StressLead":
                stressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Stress")}}><b>Stress</b></button>
                break;
            case "Supports":
                supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Supports")}}><b>Supports</b></button>
                break;
            case "SupportsLead":
                supportsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Supports")}}><b>Supports</b></button>
                break;
            case "Materials":
                materialsButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Materials")}}><b>Materials</b></button>
                break;
            case "Issuer":
                issuerButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("Issuer")}}><b>Issuer</b></button>
                break;
            case "SpecialityLead":
                ldeIsocontrolButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "180px", marginLeft:"10px", marginRight:"10px", backgroundColor: "lightgray"}} onClick={() => {props.onChange("LDE/IsoControl")}}><b>LOS/Isocontrol</b></button>
                break;
            default:
                break;
        }
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