import './login.css'
import React, { useState} from 'react'
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


const Login = props =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const history = useHistory();

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
        fetch("http://localhost:5000/login", options)
            .then(response => response.json())
            .then(json => {
                    localStorage.setItem('token', json.token);
                    secureStorage.setItem('user', json.user)
                    secureStorage.setItem('tab', "Status")      
                    history.replace('/isotracker');
                    window.location.reload(false);
                    
                }
            )
            .catch(error => {
                setError(true);
            })               
        
    }



    return(
        <div className="login__form__container">
                    <form>
                        <center><h3>Log in</h3></center>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {error && <p className="error__message" style={{color: "red"}}>Email or password incorrect. Try again.</p>}
                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{marginTop:"30px", backgroundColor: "#17a2b8"}}  onClick={handleLogin}>Log in</button>
                    </form>
        </div>
    );
};

export default Login;