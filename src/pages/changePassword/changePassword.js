import React, { useState} from 'react'
import {useHistory} from "react-router";
import './changePassword.css';
import NavBar from '../../components/navBar/navBar'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse'

//Página de home con el menú para ir a las aplicaciones de isotracker

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

const ChangePasswordPage = () =>{
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    document.body.style.zoom = 1

    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confPassword, setConfPassword] = useState(null);
    const [blankError, setBlankError] = useState(false);
    const [wrongPassError, setWrongPassError] = useState(false);
    const [notCoincideError, setNotCoincideError] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const history = useHistory();

    const handelChangePassword = async() =>{
        setWrongPassError(false)
        setBlankError(false)
        setConfPassword(false)
        const body = {
            email: secureStorage.getItem('user'),
            password: password
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        if(password === null || newPassword === null || confPassword === null || password === "" || newPassword === "" || confPassword === ""){
            setBlankError(true)
        }else{
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/user/getPassword", options)
            .then(response => response.json())
            .then(async json =>{
                if(json.password === "incorrect"){
                    setWrongPassError(true)
                }else{
                    if(newPassword === confPassword){
                        const body = {
                            email: secureStorage.getItem('user'),
                            newPassword: newPassword
                        }
                        const options = {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(body)
                        }
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/user/changePassword", options)
                        .then(async response => {
                            await setSuccessful(true)
                            await localStorage.clear();
                            setTimeout(()=> {history.replace("/"+process.env.REACT_APP_PROJECT+"/login")}, 2000)
                        })
                        .catch(err=> console.log(err))
                    }else{
                        setNotCoincideError(true)
                    }
                }
            })
        }

    }

    return(
        <body>
            <NavBar onChange={value => history.replace("/"+process.env.REACT_APP_PROJECT+"/isotracker")}/>
            <Collapse in={blankError}>
                <Alert style={{fontSize:"22px",position: "fixed", left: "51%", top:"10%", transform: "translate(-50%, -50%)", zIndex:"3"}} severity="error"
                    >
                    At least one field is blank!
                </Alert>
            </Collapse>
            <Collapse in={wrongPassError}>
                <Alert style={{fontSize:"22px",position: "fixed", left: "51%", top:"10%", transform: "translate(-50%, -50%)", zIndex:"3"}} severity="error"
                    >
                    The current password is not correct!
                </Alert>
            </Collapse>
            <Collapse in={notCoincideError}>
                <Alert style={{fontSize:"22px",position: "fixed", left: "51%", top:"10%", transform: "translate(-50%, -50%)", zIndex:"3"}} severity="error"
                    >
                    The new password doesn't match!
                </Alert>
            </Collapse>
            <Collapse in={successful}>
                <Alert style={{fontSize:"22px",position: "fixed", left: "51%", top:"10%", transform: "translate(-50%, -50%)", zIndex:"3"}} severity="success"
                    >
                    The password changed successfully!
                </Alert>
            </Collapse>
            
            <div className="home__background">
                <div className="login__form__container">
                    <center><h3>Change password</h3></center>
                    <br></br>

                    <div className="form-group">
                        <label>Current Password</label>
                        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password" className="form-control" onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" className="form-control" onChange={(e) => setConfPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-dark btn-lg btn-block" style={{marginTop:"30px", backgroundColor: "#17a2b8"}}  onClick={handelChangePassword}>Change Password</button>

                </div> 
            </div>         
        </body>
    );
};

export default ChangePasswordPage;