//Cabecera de IsoTracker con diferentes desplegables y botones

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TechnipLogo from "../../assets/images/tpenr_logo.svg"
import HomeLogo from "../../assets/images/home.png"
import Icapp from "../../assets/images/client.png"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './navBar.css';
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


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

const NavBar = (props) =>{
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const history = useHistory();
    const[username, setUsername] = React.useState("");
    const[progressButtons, setProgressButtons] = React.useState(null);
    let menubtn = null
    
    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleClickIsotracker = () => {
        history.push("/"+process.env.REACT_APP_PROJECT+"/isotracker");
    };

    const handleLogOut = () => {
        localStorage.clear();
        history.push("/"+process.env.REACT_APP_PROJECT+"/login");
    };

    const handleChangePassword = () =>{
        setAnchorElUser(null);
        history.push("/"+process.env.REACT_APP_PROJECT+"/changepassword");
    }

    const handleClickEquipments = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/equipments");
    }

    const handleClickInstrument = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/instrumentation");
    }
    const handleClickCivil = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/civil");
    }
    const handleClickElectrical = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/electrical");
    }
    const handleClickPiping = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/piping");
    }
    const handleClickProject = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/login");
    }
    const handleClickHome = () =>{
        history.push("/"+process.env.REACT_APP_PROJECT+"/home");
    }

    useEffect(async() =>{
        const bodyUsername = {
            email: secureStorage.getItem("user")
          }
        const optionsUsername = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyUsername)
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/findByEmail", optionsUsername)
        .then(response => response.json())
        .then(json => {
            setUsername(json.name);
        })

        if(process.env.REACT_APP_PROGRESS === "1"){
            setProgressButtons(<div style={{width:"100%", marginLeft: "23%"}}>
                <Button class="btn nohover" onClick={handleClickHome} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Home </i>
        </Button><Button class="btn nohover" onClick={handleClickPiping} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Piping </i>
        </Button><Button class="btn nohover" onClick={handleClickInstrument} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Instrumentation </i>
        </Button>
        <Button class="btn nohover" onClick={handleClickEquipments} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Equipment </i>
        </Button>
        <Button class="btn nohover" onClick={handleClickCivil} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Civil </i>
        </Button>
        <Button class="btn nohover" onClick={handleClickElectrical} style={{marginRight:"50px"}}>
            <i className="dropdown__text">Electrical </i>
        </Button>
        <Button class="btn nohover" onClick={handleClickIsotracker} style={{marginRight:"50px"}}>
                        <i className="dropdown__text" >IsoTracker </i>
                    </Button></div>)
        

        }
    },[])

    let projectBtn = null
    if(process.env.REACT_APP_PROGRESS === "1"){
        projectBtn = <Button class="btn nohover" disabled style={{marginLeft:"15%"}}>
                        <i className="dropdown__text__projectname" >{process.env.REACT_APP_APP_NAMEPROJ} </i>
                    </Button>
    }else{
        projectBtn = <Button  class="btn nohover" disabled style={{marginLeft:"89%", marginRight:"50px"}}>
                        <i className="dropdown__text__projectname" >{process.env.REACT_APP_APP_NAMEPROJ} </i>
                    </Button>
    }
    return(
        <div className={classes.root}>
            <div style={{display:"flex"}}>
            <AppBar position="fixed" className="navBar__container" style={{height:"62px", borderBottomColor: "rgb(211, 224, 233)", borderLeftColor: "rgb(211, 224, 233)", bordeRightColor: "rgb(211, 224, 233)", borderTopColor: "rgb(211, 224, 233)", backgroundColor: "#383838"}}>
            
                <Toolbar>
                    
                    {progressButtons}
                    
                    
                  
                    <Button aria-controls="simple-menu" aria-haspopup="true" class="btn nohover" onClick={handleClickUser}>
                    <i className="dropdown__text">{username}&nbsp;🠗</i>
                    </Button>
                    
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorElUser}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUser}
                        PaperProps={{
                            style: {
                            left: '50%',
                            transform: 'translateX(+70%)',
                            }
                        }}
                    >
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={handleChangePassword}>Change password</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={handleLogOut}><b>Logout</b></MenuItem>
                    </Menu>
 
                    {projectBtn}
                    
                </Toolbar>

            </AppBar>
            </div>
        </div>
    );
};

export default NavBar;