//Cabecera de IsoTracker con diferentes desplegables y botones

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TechnipLogo from "../../assets/images/tpenr_logo.svg"
import Icapp from "../../assets/images/icapp.png"
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
    const [anchorElIso, setAnchorElIso] = React.useState(null);
    const history = useHistory();
    const[username, setUsername] = React.useState("");

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleClickIso = (event) => {
        setAnchorElIso(event.currentTarget);
    };

    const handleCloseIso = (selectedTab) => {
        setAnchorElIso(null);
        props.onChange(selectedTab);
    };
    const handleLogOut = () => {
        localStorage.clear();
        history.replace("/welcome");
    };
    const handleHome = () =>{
        setAnchorElUser(null);
        setAnchorElIso(null);
        history.replace("/isotracker");
    }
    useEffect(() =>{
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
        fetch("http://localhost:5000/api/findByEmail", optionsUsername)
        .then(response => response.json())
        .then(json => {
            setUsername(json.name);
        })
    })
    return(
        <div className={classes.root}>
            <AppBar position="fixed" className="navBar__container" style={{borderBottomColor: "rgb(211, 224, 233)", borderLeftColor: "rgb(211, 224, 233)", bordeRightColor: "rgb(211, 224, 233)", borderTopColor: "rgb(211, 224, 233)", backgroundColor: "white"}}>
                <Toolbar>
                    <a className="navbar-brand" style={{float:"left", paddingLeft: "20px"}} href="/isotracker">
                        <img src={TechnipLogo} alt="technipLogo" style={{height:"50px"}}/>
                    </a>
                    <Typography variant="h6" className={classes.title}>
                    
                    </Typography>
                    <Button onClick={handleClickIso} style={{marginRight:"25px"}}>
                        <i className="dropdown__text">IsoTracker </i>&nbsp;<b className="dropdown__arrow">▼</b>
                    </Button>
                    <Menu
                        id="simple-menu-iso"
                        anchorEl={anchorElIso}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(anchorElIso)}
                        onClose={(event) => setAnchorElIso(null)}
                    >
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Status")}>Status</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("History")}>History</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Design")}>Design</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Stress")}>Stress</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Support")}>Support</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Materials")}>Materials</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("Issuer")}>Issuer</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={(event) => handleCloseIso("LDE/IsoControl")}>Controls</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px", fontWeight:"bold"}} onClick={(event) => handleCloseIso("CheckBy")}>CHECK BY_</MenuItem>
                    </Menu>
                    <li className="icapp__button"><a href="/"><strong className="icapp__text">ICApp</strong></a></li>
                    <a className="navbar-brand" href="/">
                        <img src={Icapp} className="icapp__image" alt="icappImage"/>
                    </a>
                    
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickUser}>
                    <i className="dropdown__text">{username}</i>&nbsp;<b className="dropdown__arrow">▼</b>
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorElUser}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUser}
                    >
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={handleHome}>Home</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={handleCloseUser}>Change password</MenuItem>
                    <MenuItem style={{fontFamily:"Quicksand", fontSize:"13.33px"}} onClick={handleLogOut}><b>Logout</b></MenuItem>
                    </Menu>
 
                    

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;