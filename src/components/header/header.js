import "./header.css"
import TechnipLogo from "../../assets/images/tpfmc_logo.svg"
import Icapp from "../../assets/images/icapp.png"

const Header = () =>{
    return(
        <div className="header__container" href="http://localhost:3000/">
            <a class="navbar-brand" style={{float:"left", paddingLeft: "20px"}}>
                <img src={TechnipLogo}/>
            </a>
            <div className="headerRight__container">
                <li  class="dropdown" style={{paddingLeft:"3px", paddingRight:"15px",paddingTop: "17px",float:"left", position: "relative", display: "inline-block", fontSize: "10pt", fontWeight: "bold", fontStyle: "italic"}}>
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style={{borderadius: "0px 0px 4px 4px", transition: "all 200ms ease 0s", background: "white", color: "black"}} >Iso Tracker <span class="caret"></span></a>
                    <ul class="dropdown-menu" role="menu">
                        <li style={{fontSize: "13px"}}>
                        <a href="http://localhost:8099/isostatus">Status</a>
                        <a href="http://localhost:8099/hisoctrl">History</a>
                        <a href="http://localhost:8099/design">Design</a>
                        <a href="http://localhost:8099/stress">Stress</a>
                        <a href="http://localhost:8099/supports">Supports</a>    
                        <a href="http://localhost:8099/materials">Materials</a>
                        <a href="http://localhost:8099/lead">Issuer</a>    
                        <a href="http://localhost:8099/iso">LDE/Isocontrol</a>
                        <a href="http://localhost:8099/commontray"><b>CHECK BY...</b></a>
                        </li>        
                    </ul>
                </li>
                <li className="icapp__button"><a href=""><strong className="icapp__text">ICApp</strong></a></li>
                <a class="navbar-brand" style={{float:"left", paddingTop:"12px"}}>
                    <img src={Icapp} className="icapp__image"  href="#"/>
                </a>
            </div>
        </div>
    );
};

export default Header;