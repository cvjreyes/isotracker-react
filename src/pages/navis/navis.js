import React, { useState , useEffect} from 'react'
import NavBar from '../../components/navBar/navBar'
import NavisTable from '../../components/navisTable/navisTable';
import "./navis.css"

const Navis = () => {

    const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    const [currentRole, setCurrentRole] = useState();
    const [roles, setRoles] = useState();
    const[pagination, setPagination] = useState(8)
    const[weight, setWeight] = useState();
    const[progress, setProgress] = useState();

    

    useEffect(()=>{
        const body = {
            user: currentUser,
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/user", options)
            .then(response => response.json())
            .then(json => {
                setRoles(json.roles);
                if(secureStorage.getItem('role') !== null){
                    setCurrentRole(secureStorage.getItem('role'))
                }else{
                    secureStorage.setItem('role', json.roles[0])
                    setCurrentRole(secureStorage.getItem('role'))
                }
                }
            )
            .catch(error => {
                console.log(error);
            })       
            
    },[currentRole]);

    useEffect(()=>{

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        }
       

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/civils/weight", options)
            .then(response => response.json())
            .then(json => {
                setWeight(json.weight)
                setProgress(json.progress)
            }
            )
            .catch(error => {
                console.log(error);
            })       
            
    },[]);
    
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

    var dataTableHeight = "550px"
    let navBtnsMargin = "600px"

    if (pagination === 8){
        dataTableHeight = "550px"
        navBtnsMargin = "600px"
    }if(pagination === 25){
        dataTableHeight = "1250px"
        navBtnsMargin = "1200px"
    }if(pagination === 50){
        dataTableHeight = "2250px"
        navBtnsMargin = "2150px"
    }if(pagination === 100){
        dataTableHeight = "4250px"
        navBtnsMargin = "4000px"
    }

    document.body.style.zoom = 0.9
    document.title= process.env.REACT_APP_APP_NAMEPROJ
    const [currentTab, setCurrentTab] = useState(secureStorage.getItem("civ_tab"))
    if(currentTab === "" || currentTab === null){
        setCurrentTab("Estimated")
    }

    var currentUser = secureStorage.getItem('user')
    var table = null

    var dataTableHeight = 8

    table = <NavisTable/>

    

    return(
        
        <body>
            <div className="navis__container">  
                <div>
                    <br></br>
                    <br></br> 

                    <br></br> 
                    {table}
                </div>         
            </div>
         </body>
    )
}

export default Navis;