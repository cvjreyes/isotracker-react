import React from "react";
import NavBar from '../../components/navBar/navBar';
import Login from '../../components/login/login';
import './login.css';
//Página de home con el menú para ir a las aplicaciones de isotracker

const LoginPage = () =>{
    return(
        <body>
            <div className="home__background">
                <NavBar/>
                
                <Login/>
  );
            </div>
            
        </body>
    );
};

export default LoginPage;