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

const EquipmentsNavBtns = props =>{
    var estimatedButton, modelledButton, progressButton, typesButton, keyButton, isoControlButton
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
        
        estimatedButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Estimated</b></button>
    }else{
        estimatedButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Estimated")}}><b>Estimated</b></button>
        
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
        modelledButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Modelled</b></button>
    }else{
        modelledButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Modelled")}}><b>Modelled</b></button>
        
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
        progressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Progress</b></button>
    }else{
        progressButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Progress")}}><b>Progress</b></button>
        
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
        typesButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Types</b></button>
    }else{
        typesButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Types")}}><b>Types</b></button>
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
            keyButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#00a000"}}><b>Key parameters</b></button>
        }
    }else{
        if(secureStorage.getItem("role") === "Project"){
            keyButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#4ee44e"}} onClick={() => {props.onChange("Key parameters")}}><b>Key parameters</b></button>
        }
    }
    if(props.discipline === "Piping"/*&& secureStorage.getItem("role") === "SpecialityLead"*/){
        
        if(props.currentTab === "Isocontrol"){
            if(props.discipline === "Piping"){
                secureStorage.setItem("piping_tab", "Isocontrol")
            }
            
            isoControlButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "#17a2b8"}}><b>Isocontrol</b></button>
        }else{
            isoControlButton = <button  type="button" class="btn btn-default btn-lg" style={{border:"1px solid lightgray", width: "200px", marginLeft:"10px", marginRight:"10px", backgroundColor: "white"}} onClick={() => {props.onChange("Isocontrol")}}><b>Isocontrol</b></button>
            
        }
    }
    
    return(
        <div>
            {estimatedButton}
            {modelledButton}
            {progressButton}
            {typesButton}
            {isoControlButton}
            {keyButton}
        </div>
    );
};

export default EquipmentsNavBtns;