import './myTrayBtn.css'

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
const MyTrayBtn = props =>{
    var myTrayBtn
    if(props.currentTab === "My Tray"){
        secureStorage.setItem("tab", "My Tray")
        myTrayBtn = <button  type="button" className="myTray__button text-left"  style={{backgroundColor: "#0070ed", color:'white'}}>My tray</button>
    }else{
        myTrayBtn = <button  type="button" className="myTray__button text-left" style={{backgroundColor: "#F5F8FA"}} onClick={() => {props.onChange("My Tray")}}>My tray</button>
    }
    return(
        <td className="myTrayBtn__container">
            {myTrayBtn}
        </td>
    );
};

export default MyTrayBtn;