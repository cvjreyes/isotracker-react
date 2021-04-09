import Lens from "../../assets/images/lupa.png"

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

const procInsBtn = props =>{
    if(props.currentTab === "Process"){
        secureStorage.setItem("tab", "Process")
    }else if(props.currentTab === "Instrument"){
        secureStorage.setItem("tab", "Instrument")
    }
    return(
        <div>
            <input type="image" src={Lens} alt="lens" style={{width:"60px", marginTop:"22px", marginLeft:"10px", float:"left"}} onClick={() => {props.onChange(props.currentTab)}} />
        </div>
    );
};

export default procInsBtn;