import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TechnipLogo from "../../assets/images/tpfmc_logo.svg"
import Icapp from "../../assets/images/icapp.png"
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import './navBar.css';

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

const NavBar = () =>{
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElIso, setAnchorElIso] = React.useState(null);

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const handleClickIso = (event) => {
        setAnchorElIso(event.currentTarget);
    };

    const handleCloseIso = () => {
        setAnchorElIso(null);
    };
    return(
        <div className={classes.root}>
            <AppBar position="static" className="navBar__container" style={{borderBbottomColor: "rgb(211, 224, 233)", borderLeftColor: "rgb(211, 224, 233)", bordeRightColor: "rgb(211, 224, 233)", borderTopColor: "rgb(211, 224, 233)", backgroundColor: "white"}}>
                <Toolbar>
                    <a class="navbar-brand" style={{float:"left", paddingLeft: "20px"}} href="/">
                        <img src={TechnipLogo} alt="technipLogo"/>
                    </a>
                    <Typography variant="h6" className={classes.title}>
                    
                    </Typography>
                    <Button aria-controls="simple-menu-iso" aria-haspopup="true" onClick={handleClickIso} style={{marginRight:"25px", fontFamily: 'sans-serif'}}>
                        Iso Tracker ▼
                    </Button>
                    <Menu
                        id="simple-menu-iso"
                        anchorEl={anchorElIso}
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                        transformOrigin={{ vertical: "top", horizontal: "center" }}
                        open={Boolean(anchorElIso)}
                        onClose={handleCloseIso}
                    >
                    <MenuItem onClick={handleCloseIso}>Status</MenuItem>
                    <MenuItem onClick={handleCloseIso}>History</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Design</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Stress</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Support</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Materials</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Issuer</MenuItem>
                    <MenuItem onClick={handleCloseIso}>Controls</MenuItem>
                    <MenuItem onClick={handleCloseIso}><b>CHECK BY_</b></MenuItem>
                    </Menu>
                    <li className="icapp__button"><a href="/"><strong className="icapp__text">ICApp</strong></a></li>
                    <a class="navbar-brand" href="/">
                        <img src={Icapp} className="icapp__image" alt="icappImage"/>
                    </a>
                    
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClickUser}>
                        User ▼
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
                    <MenuItem onClick={handleCloseUser}>Home</MenuItem>
                    <MenuItem onClick={handleCloseUser}>Change password</MenuItem>
                    <MenuItem onClick={handleCloseUser}><b>Logout</b></MenuItem>
                    </Menu>
 
                    

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;