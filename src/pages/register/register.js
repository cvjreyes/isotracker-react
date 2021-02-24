import React from "react";
import NavBar from '../../components/navBar/navBar';
import './register.css';
//Página de home con el menú para ir a las aplicaciones de isotracker

const Register = () =>{
    return(
        <body>
            <div className="home__background">
                <NavBar/>
                
                <div className="register__form__container">
                    <form>
                        <center><h3>Register</h3></center>

                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" className="form-control" placeholder="First name" />
                        </div>

                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>

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
                            Already registered <a href="#">log in?</a>
                        </p>
                    </form>
                </div>
  );
            </div>
            
        </body>
    );
};

export default Register;