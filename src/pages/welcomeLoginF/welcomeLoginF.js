import React from "react";
import './welcomeLoginF.css'
import TechnipLogo from "../../assets/images/technip.png"
import IsoTrackerLogo from "../../assets/images/IsoTracker.svg"
import FullTrackerLogo from "../../assets/images/3DTracker.svg"
import { useState } from "react";
import Eye from "../../assets/images/eye.png"
import GreenCircle from "../../assets/images/green_circle.png"
import BlueCircle from "../../assets/images/blue_circle.png"
import {useHistory} from "react-router";

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

//Página de welcome que actua como portada

const WelcomeLoginF = () =>{
    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ

    const [passwordShown, setPasswordShown] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const history = useHistory();

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const body = {
        email: email,
        password: password
    }

    const handleLogin = () => {
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/login", options)
            .then(response => response.json())
            .then(json => {
                console.log(process.env.REACT_APP_PROGRESS)
                if(process.env.REACT_APP_PROGRESS === "1"){
                    localStorage.setItem('token', json.token);
                    secureStorage.setItem('user', json.user)
                    secureStorage.setItem('tab', "Status")   
                    secureStorage.setItem("equip_tab", "Estimated")  
                    secureStorage.setItem("inst_tab", "Estimated")    
                    secureStorage.setItem("civ_tab", "Estimated")  
                    secureStorage.setItem("elec_tab", "Estimated")  
                    secureStorage.setItem("piping_tab", "Estimated")
                    history.replace('/'+process.env.REACT_APP_PROJECT+'/home');
                    window.location.reload(false);
                }else{
                    localStorage.setItem('token', json.token);
                    secureStorage.setItem('user', json.user)
                    secureStorage.setItem('tab', "Status")   
                    history.push('/'+process.env.REACT_APP_PROJECT+'/isotracker');
                    window.location.reload(false);
                }
            })
        
            .catch(error => {
                setError(true);
            })               
        
    }
    
    let logo = null

    if(process.env.REACT_APP_PROGRESS === "0"){
        logo = IsoTrackerLogo
    }else{
        logo = FullTrackerLogo
    }

    return(
        <body>
        <div className="background">
            <img src={TechnipLogo} alt="technipLogo" className="technipLogo__image"/>
            <img src={GreenCircle} alt="greenCircle" className="greenCircle__image"/>
            <img src={BlueCircle} alt="blueCircle" className="blueCircle__image"/>
            
            <div className="login__form">
                <img src={logo} alt="isoTrackerLogo" className="isoTrackerLogo__image"/>
                <text className="welcome__text">Welcome</text>
                <text className="enter__text">Please, enter you e-mail account and password.</text>
                <text className="email__label">E-mail</text>
                <input type="text" className="email__input" onChange={(e) => setEmail(e.target.value)}></input>
                <text className="password__label">Password</text>
                <div>
                    <input className="password__input" type={passwordShown ? "text" : "password"} onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                        handleLogin()
                        }
                    }}/>
                    <img onClick={togglePassword} src={Eye} alt="eye" className="eye__image"></img>
                </div>
                <div className="login__buttons">
                    <button className="login__button" onClick={handleLogin}>Log In</button>
                    {error && <p className="error__message" style={{color: "red", position:"absolute"}}>Email or password incorrect. Try again.</p>} 

                    <text className="navis__text">Or you can access to NavisattSelect</text>
                    <button className="navis__button" onClick={(e) => history.push("/"+process.env.REACT_APP_PROJECT+"/navis")}>NAVISATTSELECT</button>
            </div>
            </div>
            
        </div>
        </body>
    );
};

export default WelcomeLoginF;