import React from 'react';
import Login from '../../components/login/login';

import './login.css';
//No se usa, se usa welcomeloginF

const LoginPage = () =>{
    document.title= process.env.REACT_APP_APP_NAMEPROJ

    return(
        <body>
            <div className="home__background">
                
                <Login/>
  );
            </div>
            
        </body>
    );
};

export default LoginPage;