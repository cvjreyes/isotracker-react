//Botones de historial y status

import "./reportBtns.css"
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
const Report_btns = props => {
    var StatusButton, HistoryButton
    if(props.currentTab === "Status"){
        secureStorage.setItem("tab", "Status")
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", marginRight:"10px", width:"180px"}}><b>Status</b></button>
    }else{
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", marginRight:"10px", width:"180px"}} onClick={() => {props.onChange("Status")}}><b>Status</b></button>
    }
    if(props.currentTab === "History"){
        secureStorage.setItem("tab", "History")
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", width:"180px"}}><b>History</b></button>
    }else{
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", width:"180px"}} onClick={() => {props.onChange("History");}}><b>History</b></button>
    }
    return(
        <td className="td__btns">
            {StatusButton}
            {HistoryButton}
            
        </td>
    );
};

export default Report_btns;