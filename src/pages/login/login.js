import React from "react";
import NavBar from '../../components/navBar/navBar';
import './login.css';
//Página de home con el menú para ir a las aplicaciones de isotracker

const Login = () =>{
    return(
        <body>
            <div className="home__background">
                <NavBar/>
                
                <div className="login__form__container">
                    <form>
                        <center><h3>Login</h3></center>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{marginTop:"30px"}}>Register</button>
                        <p className="forgot-password text-right">
                            Don't have an account? <a href="/register">register</a>
                        </p>
                    </form>
                </div>
  );
            </div>
            
        </body>
    );
};

export default Login;