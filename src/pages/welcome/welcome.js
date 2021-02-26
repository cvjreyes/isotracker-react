import React from "react";
import './welcome.css'

//Página de welcome que actua como portada

const Welcome = () =>{
    return(
        <body>
        <div className="cover__background"> 
            <div className="cover__login__container">
                <a href="/login" className="cover__login__text">LOGIN</a>
            </div>
            <div class="content">
                <div className="cover__main__container">
                    <div className="cover__main__text">3D Progress Control v2</div><br></br><div>
                    <div className="cover__main__footer"><center><footer>Ⓒ Copyright 2021 Technip Iberia, S.A.U - Developed by: J.Reyes-Sztayzel</footer></center></div></div>
                </div>
            </div>
        </div>
        </body>
    );
};

export default Welcome;