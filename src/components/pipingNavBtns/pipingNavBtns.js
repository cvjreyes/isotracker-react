//Botones inferiores para navegar por isoControl

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

const PipingNavBtns = props =>{
    var myTrayButton, modelledButton, componentsButton, sStressButton, rStressButton, stressButton, sDesignButtn
    if(props.currentTab === "PipinMyTray"){
        secureStorage.setItem("tab", "PipinMyTray")
        myTrayButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}}>My Tray</button>
    }else{
        myTrayButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipinMyTray")}}>My tray</button>
        
    }
    if(props.currentTab === "PipingModelled"){
        secureStorage.setItem("tab", "PipingModelled")
        modelledButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Modelled</button>
    }else{
        modelledButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingModelled")}}>Modelled</button>
        
    }
    if(props.currentTab === "PipingComponents"){
        secureStorage.setItem("tab", "PipingComponents")
        componentsButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Components</button>
    }else{
        componentsButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingComponents")}}>Components</button>
        
    }
    if(props.currentTab === "PipingSStress"){
        secureStorage.setItem("tab", "PipingSStress")
        sStressButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >S-Stress</button>
    }else{
        sStressButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingSStress")}}>S-Stress</button>    
    }
    if(props.currentTab === ""){
        secureStorage.setItem("tab", "PipingRStress")
        rStressButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >R-Stress</button>
    }else{
        rStressButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingRStress")}}>R-Stress</button>
        
    }
    if(props.currentTab === "PipingStress"){
        secureStorage.setItem("tab", "PipingStress")
        stressButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Stress</button>
    }else{
        stressButton = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingRStress")}}>Stress</button>
        
    }
    if(props.currentTab === "PipingSDesign"){
        secureStorage.setItem("tab", "PipingSDesign")
        sDesignButtn = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >S-Design</button>
    }else{
        sDesignButtn = <button  type="button" className="trays__navBtns text-left"  onClick={() => {props.onChange("PipingSDesign")}}>S-Design</button>
        
    }

    
    return(
        <div>                                  
            <p className="isotracker__table__trays__group">Home</p>
            {myTrayButton}
            <p className="isotracker__table__trays__group">Trays</p>
            {modelledButton}
            {componentsButton}
            {sStressButton}
            {rStressButton}
            {stressButton}
            {sDesignButtn}
        </div>
    );
};

export default PipingNavBtns;