import React from "react";
import './welcomeLoginF.css'
import TechnipLogo from "../../assets/images/technip.png"
import IsoTrackerLogo from "../../assets/images/isotracker.png"
import { useState } from "react";
import Eye from "../../assets/images/eye.png"
import GreenCircle from "../../assets/images/green_circle.png"
import BlueCircle from "../../assets/images/blue_circle.png"

//Página de welcome que actua como portada

const WelcomeLoginF = () =>{
    document.body.style.zoom = 1.
    document.title= process.env.REACT_APP_APP_NAMEPROJ

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return(
        <body>
        <div className="background"> 
            <img src={TechnipLogo} alt="technipLogo" className="technipLogo__image"/>
            <img src={GreenCircle} alt="greenCircle" className="greenCircle__image"/>
            <img src={BlueCircle} alt="blueCircle" className="blueCircle__image"/>
            
            <div className="login__form">
                <img src={IsoTrackerLogo} alt="isoTrackerLogo" className="isoTrackerLogo__image"/>
                <text className="welcome__text">Welcome</text>
                <text className="enter__text">Please, enter you e-mail account and password.</text>
                <text className="email__label">E-mail</text>
                <input type="text" className="email__input"></input>
                <text className="password__label">Password</text>
                <div>
                    <input className="password__input" type={passwordShown ? "text" : "password"} />
                    <img onClick={togglePassword} src={Eye} alt="eye" className="eye__image"></img>
                </div>
                <div className="login__buttons">
                    <button className="login__button">Log In</button>
                    <text className="navis__text">Or you can access to NavisattSelect</text>
                    <button className="navis__button">NAVISATTSELECT</button>
            </div>
            </div>
            
        </div>
        </body>
    );
};

export default WelcomeLoginF;