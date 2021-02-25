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

                        <div className="form-group" style={{display:"flex", alignItems:"left"}}>
                            <label style={{position:"absolute"}}>Role</label>
                            <select className="destination__select" style={{position:"relative", marginTop:"30px"}}><option disabled selected>Select a role</option><option value="Design">Design</option><option value="LDesign">Leader Design</option><option value="Stress">Stress</option><option value="LStress">Leader Stress</option><option value="Support">Support</option><option value="LSupport">Leader Support</option><option value="Materials">Materials</option><option value="Issuer">Issuer</option></select>
                        </div>

                        <div className="form-group">
                            <label>Usename</label>
                            <input type="text" className="form-control" placeholder="Last name" />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <button type="submit" className="btn btn-dark btn-lg btn-block" style={{marginTop:"30px", backgroundColor: "#17a2b8", marginBottom:"10px"}}>Register</button>
                    </form>
                </div>
  );
            </div>
            
        </body>
    );
};

export default Register;