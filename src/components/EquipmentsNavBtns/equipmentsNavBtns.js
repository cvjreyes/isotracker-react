//Botones inferiores para navegar por isoControl

import 'bootstrap/dist/css/bootstrap.min.css';
import "./equipmentsNavBtns.css"

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

const EquipmentsNavBtns = props =>{
    var estimatedButton, modelledButton, progressButton, typesButton, keyButton
    if(props.currentTab === "Estimated"){
        if(props.discipline === "Equipment"){
            secureStorage.setItem("equip_tab", "Estimated")
        }else if(props.discipline === "Instrumentation"){
            secureStorage.setItem("inst_tab", "Estimated")
        }else if(props.discipline === "Civil"){
            secureStorage.setItem("civ_tab", "Estimated")
        }else if(props.discipline === "Electrical"){
            secureStorage.setItem("elec_tab", "Estimated")
        }
        else if(props.discipline === "Piping"){
            secureStorage.setItem("piping_tab", "Estimated")
        }
        
        estimatedButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Estimated</button>
    }else{
        estimatedButton = <button  type="button" className="trays__navBtns text-left" onClick={() => {props.onChange("Estimated")}}>Estimated</button>
        
    }
    if(props.currentTab === "Modelled"){
        if(props.discipline === "Equipment"){
            secureStorage.setItem("equip_tab", "Modelled")
        }else if(props.discipline === "Instrumentation"){
            secureStorage.setItem("inst_tab", "Modelled")
        }else if(props.discipline === "Civil"){
            secureStorage.setItem("civ_tab", "Modelled")
        }else if(props.discipline === "Electrical"){
            secureStorage.setItem("elec_tab", "Modelled")
        }else if(props.discipline === "Piping"){
            secureStorage.setItem("piping_tab", "Modelled")
        }
        modelledButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Modelled</button>
    }else{
        modelledButton = <button  type="button" className="trays__navBtns text-left" onClick={() => {props.onChange("Modelled")}}>Modelled</button>
        
    }
    if(props.currentTab === "Progress"){
        if(props.discipline === "Equipment"){
            secureStorage.setItem("equip_tab", "Progress")
        }else if(props.discipline === "Instrumentation"){
            secureStorage.setItem("inst_tab", "Progress")
        }else if(props.discipline === "Civil"){
            secureStorage.setItem("civ_tab", "Progress")
        }else if(props.discipline === "Electrical"){
            secureStorage.setItem("elec_tab", "Progress")
        }else if(props.discipline === "Piping"){
            secureStorage.setItem("piping_tab", "Progress")
        }
        progressButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Progress</button>
    }else{
        progressButton = <button  type="button" className="trays__navBtns text-left" onClick={() => {props.onChange("Progress")}}>Progress</button>
        
    }
    if(props.currentTab === "Types"){
        if(props.discipline === "Equipment"){
            secureStorage.setItem("equip_tab", "Types")
        }else if(props.discipline === "Instrumentation"){
            secureStorage.setItem("inst_tab", "Types")
        }else if(props.discipline === "Civil"){
            secureStorage.setItem("civ_tab", "Types")
        }else if(props.discipline === "Electrical"){
            secureStorage.setItem("elec_tab", "Types")
        }else if(props.discipline === "Piping"){
            secureStorage.setItem("piping_tab", "Types")
        }
        typesButton = <button  type="button" className="trays__navBtns text-left" style={{backgroundColor:"#99C6F8", color:"black", fontWeight:"bold"}} >Types</button>
    }else{
        typesButton = <button  type="button" className="trays__navBtns text-left" onClick={() => {props.onChange("Types")}}>Types</button>
    }

    if(props.currentTab === "Key parameters"){
        if(props.discipline === "Equipment"){
            secureStorage.setItem("equip_tab", "Key parameters")
        }else if(props.discipline === "Instrumentation"){
            secureStorage.setItem("inst_tab", "Key parameters")
        }else if(props.discipline === "Civil"){
            secureStorage.setItem("civ_tab", "Key parameters")
        }else if(props.discipline === "Electrical"){
            secureStorage.setItem("elec_tab", "Key parameters")
        }else if(props.discipline === "Piping"){
            secureStorage.setItem("piping_tab", "Key parameters")
        }
        if(secureStorage.getItem("role") === "Project"){
            keyButton = <button  type="button" className="trays__navBtns text-left">KeyParams</button>
        }
    }else{
        if(secureStorage.getItem("role") === "Project"){
            keyButton = <button  type="button" className="trays__navBtns text-left" onClick={() => {props.onChange("Key parameters")}}>KeyParams</button>
        }
    }
    
    return(
        <div>
            {estimatedButton}
            {modelledButton}
            {progressButton}
            {typesButton}
            {keyButton}
        </div>
    );
};

export default EquipmentsNavBtns;