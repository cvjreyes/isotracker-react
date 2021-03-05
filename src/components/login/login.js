import './login.css'
import React, { useState } from 'react'
import {useHistory} from "react-router";

const Login = props =>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
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

                    localStorage.setItem('token', json.token)
                    localStorage.setItem('user', JSON.stringify(json.user))
                    history.replace('/');
                    
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