import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './datatable.css'
import { Link } from 'react-router-dom';
import RenamePopUp from '../renamePopUp/renamePopUp';


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

class DataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    tab: this.props.currentTab,
    role: this.props.currentRole,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null
  };

  unlock(filename){
    this.props.unlock(filename)
  }

  rename(newName, oldName){
    this.props.rename(newName, oldName)
  }

  componentDidMount(){

    
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/acronyms")
      .then(response => response.json())
      .then(json => {
        let dict = {}

        for(let i = 0; i < json.length; i++){
          dict[json[i].name] = json[i].code
        }
        this.setState({
          acronyms: dict
        })
      })

      let body 
      if(this.props.currentTab === "Issued"){
        body ={
          currentTab : "LDE/IsoControl"
        }
      }else{
        body ={
          currentTab : this.props.currentTab
        }
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/files", options)
          .then(response => response.json())
          .then(json => {
                  var rows = []
                  let row = null
                  let pButton, iButton, rButton, bButton, uButton = null
                  
                  for(let i = 0; i < json.rows.length; i++){
                    switch(json.rows[i].spo){
                      case 0:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 1:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 2:
                        pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break; 
                      case 3:
                        pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 4:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 5:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"lightgray", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      default:  
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
                    }
                    switch(json.rows[i].sit){
                      case 0:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 1:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 2:
                        iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break; 
                      case 3:
                        iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 4:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 5:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"lightgray", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      default:  
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
                    }
                    
                    let revision = ""
                    if(this.props.currentTab === "Issued"){
                      console.log(json.rows[i].transmittal)
                      revision = "R" + String(json.rows[i].revision - 1) + " - " + json.rows[i].transmittal + "/" + json.rows[i].issued_date
                    }else{
                      revision = "*R" + json.rows[i].revision
                    }

                    if(json.rows[i].requested === 1){
                      rButton = <button className="btn btn-danger" disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested !== 1 && json.rows[i].requested !== 2){
                      rButton = <button className="btn btn-warning" disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested === 2){
                      rButton = <button className="btn btn-success" disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }

                    if(json.rows[i].blocked === 1){
                      if(json.rows[i].revision === 0 && json.rows[i].issued !== 1){
                        if(secureStorage.getItem('user') === "super@user.com"){
                          bButton =  <RenamePopUp filename={json.rows[i].filename} rename={this.rename.bind(this)} filename={json.rows[i].filename}/>
                          uButton = <button className="btn btn-success" onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>UNLOCK</button>
                        }else{
                          uButton = null
                          bButton = <button className="btn btn-danger" disabled style={{backgroundColor:"red", fontSize:"12px", borderColor:"red", padding:"2px 5px 2px 5px", marginRight:"5px"}}>LOCKED</button>
                        }
                      }else{
                        if(secureStorage.getItem('user') === "super@user.com"){
                          bButton = null
                          uButton = <button className="btn btn-danger" disabled onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>LOCKED ISSUED</button>
                        }else{
                          bButton = null
                          uButton = <button className="btn btn-danger" disabled onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>LOCKED</button>
                        }
                        
                      }
                    }else{
                      bButton = null
                      uButton = null
                    }

                    if(json.rows[i].verifydesign === 1 && json.rows[i].user !== "None"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button disabled className="btn btn-sm btn-warning" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight:"5px"}}>PENDING</button> {pButton} {iButton} {bButton} {uButton} {uButton} </div>}
                    }else if(json.rows[i].verifydesign === 1 && json.rows[i].user === "None"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> <button disabled className="btn btn-sm btn-warning" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight:"5px"}}>PENDING</button> {pButton} {iButton} {bButton} {uButton} </div>}
                    }else if(json.rows[i].claimed === 1){
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                        if(secureStorage.getItem("role") === "SpecialityLead" && secureStorage.getItem("tab") !== "LDE/IsoControl"){
                          row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> <button className="btn btn-danger" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}} onClick={() => this.props.forceUnclaim(json.rows[i].filename)}>FORCE UNCLAIM</button> {pButton} {iButton} {bButton} {uButton} </div>}
                        }
                      }
                    }else if(json.rows[i].user !== "None"){           
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> ,revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {rButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton}  </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        console.log("ASDSA")
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton}  </div>}
                      }

                    }else{                
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {rButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton} </div>}
                      }                   
                    }
                      if(row){
                        rows.push(row)
                      }
                    }
                  this.setState({
                    data : rows,
                  });
                  console.log(this.state.data)
              }
          )
          .catch(error => {
              console.log(error);
          })

        
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){
      
      let body 
      if(this.props.currentTab === "Issued"){
        body ={
          currentTab : "LDE/IsoControl"
        }
      }else{
        body ={
          currentTab : this.props.currentTab
        }
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/files", options)
          .then(response => response.json())
          .then(json => {
                  var rows = []
                  let row = null
                  let pButton, iButton, rButton, bButton, uButton = null
                  
                  for(let i = 0; i < json.rows.length; i++){
                    switch(json.rows[i].spo){
                      case 0:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 1:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 2:
                        pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break; 
                      case 3:
                        pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 4:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 5:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"lightgray", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      default:  
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
                    }
                    switch(json.rows[i].sit){
                      case 0:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 1:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 2:
                        iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break; 
                      case 3:
                        iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 4:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 5:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"lightgray", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      default:  
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
                    }
                    
                    let revision = ""
                    if(this.props.currentTab === "Issued"){
                      console.log(json.rows[i].transmittal)
                      revision = "R" + String(json.rows[i].revision - 1) + " - " + json.rows[i].transmittal + "/" + json.rows[i].issued_date
                    }else{
                      revision = "*R" + json.rows[i].revision
                    }

                    if(json.rows[i].requested === 1){
                      rButton = <button className="btn btn-danger" disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested !== 1 && json.rows[i].requested !== 2){
                      rButton = <button className="btn btn-warning" disabled style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested === 2){
                      rButton = <button className="btn btn-success" disabled style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }

                    if(json.rows[i].blocked === 1){
                      if(json.rows[i].revision === 0 && json.rows[i].issued !== 1){
                        if(secureStorage.getItem('user') === "super@user.com"){
                          bButton =  <RenamePopUp filename={json.rows[i].filename} rename={this.rename.bind(this)} filename={json.rows[i].filename}/>
                          uButton = <button className="btn btn-success" onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>UNLOCK</button>
                        }else{
                          uButton = null
                          bButton = <button className="btn btn-danger" disabled style={{backgroundColor:"red", fontSize:"12px", borderColor:"red", padding:"2px 5px 2px 5px", marginRight:"5px"}}>LOCKED</button>
                        }
                      }else{
                        if(secureStorage.getItem('user') === "super@user.com"){
                          bButton = null
                          uButton = <button className="btn btn-danger" disabled onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>LOCKED ISSUED</button>
                        }else{
                          bButton = null
                          uButton = <button className="btn btn-danger" disabled onClick={()=>this.unlock(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px",  marginRight:"5px"}}>LOCKED</button>
                        }
                        
                      }
                    }else{
                      bButton = null
                      uButton = null
                    }

                    if(json.rows[i].verifydesign === 1 && json.rows[i].user !== "None"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button disabled className="btn btn-sm btn-warning" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight:"5px"}}>PENDING</button> {pButton} {iButton} {bButton} {uButton} </div>}
                    }else if(json.rows[i].verifydesign === 1 && json.rows[i].user === "None"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> <button disabled className="btn btn-sm btn-warning" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight:"5px"}}>PENDING</button> {pButton} {iButton} {bButton} {uButton} </div>}
                    }else if(json.rows[i].claimed === 1){
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> {pButton} {iButton} {bButton} {uButton} </div>}
                        if(secureStorage.getItem("role") === "SpecialityLead" && secureStorage.getItem("tab") !== "LDE/IsoControl"){
                          row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> <button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button> <button className="btn btn-danger" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}} onClick={() => this.props.forceUnclaim(json.rows[i].filename)}>FORCE UNCLAIM</button> {pButton} {iButton} {bButton} {uButton} </div>}
                        }
                      }
                    }else if(json.rows[i].user !== "None"){           
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> ,revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {rButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton}  </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        console.log("ASDSA")
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton}  </div>}
                      }

                    }else{                
                      if(json.rows[i].issued === 1 && this.props.currentTab === "Issued"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {rButton} {bButton} {uButton} </div>}
                      }else if (json.rows[i].issued !== 1 && this.props.currentTab === "LDE/IsoControl"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton} </div>}
                      }else if(this.props.currentTab === "LDE/IsoControl" && json.rows[i].issued === 1){
                        row = null
                      }else if(this.props.currentTab === "Issued" && json.rows[i].issued !== 1){
                        row = null
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div> {pButton} {iButton} {bButton} {uButton} </div>}
                      }                   
                    }
                      if(row){
                        rows.push(row)
                      }
                    }
                  this.setState({
                    data : rows,
                  });
              }
          )
          .catch(error => {
              console.log(error);
          })
      }

  }

  getMaster(fileName){
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/pdf"
      }
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaster/"+fileName, options)
    .then(res => res.blob())
    .then(response => {
      console.log(response)
      const file = new Blob([response], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      window.open(fileURL);
    })
    .catch(error => {
      console.log(error);
    });
  }

  
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>

    this.state.searchedColumn === "id" ? (
      record.id.props.children
        ? record.id.props.children.toString().toLowerCase().includes(value.toLowerCase())
        : ''
      ) : (
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
      ),

    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text => 
    text.props && text.type !== "div" ? (
      <Link onClick={() => this.getMaster(text.props.children)}>{text.props.children}</Link>
    ) : this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text : ''}
      />
    ) : (
      text
    ),
      
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  onSelectChange = (selectedRowKeys, selectedRows) => {
    let ids = []
    for(let i = 0; i < selectedRows.length; i++){
      ids.push(selectedRows[i].id.props.children)
    }
    this.setState({
      selectedRowsKeys: selectedRowKeys,
      selectedRows: selectedRows
    })
    //this.setState({ selectedRows: selectedRows });
    this.props.onChange(ids);
    
  };
  

  render() {
    const selectedRows = this.state.selectedRows;
    const selectedRowsKeys = this.state.selectedRowsKeys;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => record.actions.props.children[5] ?(
        {
        
        disabled: record.actions.props.children[1].props.children === 'CLAIMED'| (record.actions.props.children[1].props.children === 'PENDING' && (secureStorage.getItem("role") !== "DesignLead" && secureStorage.getItem("role") !== "StressLead" && secureStorage.getItem("role") !== "SupportsLead" && secureStorage.getItem("role") !== "SpecialityLead")) | (record.actions.props.children[1].props.children !== 'PENDING' && this.props.currentTab !== "Issued" && (secureStorage.getItem("role") === "DesignLead" | secureStorage.getItem("role") === "StressLead" | secureStorage.getItem("role") === "SupportsLead") || record.actions.props.children[5].props.className === "btn btn-success"),
        // Column configuration not to be checked
        name: record.name,
      }) : ({
        disabled: record.actions.props.children[1].props.children === 'CLAIMED'| (record.actions.props.children[1].props.children === 'PENDING' && (secureStorage.getItem("role") !== "DesignLead" && secureStorage.getItem("role") !== "StressLead" && secureStorage.getItem("role") !== "SupportsLead" && secureStorage.getItem("role") !== "SpecialityLead")) | (record.actions.props.children[1].props.children !== 'PENDING' && (secureStorage.getItem("role") === "DesignLead" | secureStorage.getItem("role") === "StressLead" | secureStorage.getItem("role") === "SupportsLead")),
        // Column configuration not to be checked
        name: record.name,
      }),
    };
    if(localStorage.getItem("update") === "true"){
      this.setState({
        selectedRows: [],
        selectedRowsKeys: []
      })
      rowSelection.selectedRowKeys = []
      rowSelection.selectedRows = []
      localStorage.setItem("update", false)
    }else{
      rowSelection.selectedRowKeys = selectedRowsKeys 
      rowSelection.selectedRows = selectedRows;
    }  
    
    
    const columns = [
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '15%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <center className="dataTable__header__text">Revision</center>,
        dataIndex: 'revision',
        key: 'revision',
        ...this.getColumnSearchProps('revision'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        width: '10%',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
        },
      },
      {
        title: <div className="dataTable__header__text">From</div>,
        dataIndex: 'from',
        key: 'from',
        width: '10%',
        ...this.getColumnSearchProps('from'),
        sorter: {
          compare: (a, b) => { return a.from.localeCompare(b.from)},
        },
      },
      {
        title: <div className="dataTable__header__text">To</div>,
        dataIndex: 'to',
        key: 'to',
        widht: '15%',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { return a.to.localeCompare(b.to)},
        },
      },
      {
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
        width:'20%',
        ...this.getColumnSearchProps('user'),
        sorter: {
          compare: (a, b) => { return a.user.localeCompare(b.user)},
        },
      },
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
        sorter: {
          compare: (a, b) => a.actions.localeCompare(b.actions),
        },
      },
    ];

    var totalElements = null;
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "absolute", bottom: 25, left:0}}>
      <b>Total elements: {this.state.data.length}</b>
     </div>);
    }

    return (
      <div>
        {this.state.updateData}
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default DataTable;