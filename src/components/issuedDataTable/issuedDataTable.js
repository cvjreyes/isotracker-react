import React from 'react';
import 'antd/dist/antd.css';
import { Pagination, Table } from 'antd';
import { Link } from 'react-router-dom';
import RenamePopUp from '../renamePopUp/renamePopUp';
import CommentPopUp from '../commentPopUp/commentPopUp';
import CancelRevPopUp from '../cancelRevPopUp/cancelRevPopUp';


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

class IssuedDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    displayData: [],
    filterData: ["", "", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    role: this.props.currentRole,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    filters: [],
    cancellable: false
  };

  unlock(filename){
    this.props.unlock(filename)
  }

  rename(newName, oldName){
    this.props.rename(newName, oldName)
  }

  cancelRev(filename){
    this.props.cancelRev(filename)
  }

  async sendHold(fileName){
    this.props.sendHold(fileName)
  }
 

  async componentDidMount(){
    
    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/acronyms")
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

      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/issuedFiles", options)
          .then(response => response.json())
          .then(async json => {
                  var rows = []
                  let row = null
                  let pButton, iButton, rButton, rToLOSButton, cancelRevButton
                   = null
                  
                  for(let i = 0; i < json.rows.length; i++){

                    if(json.rows[i].last_update){
                      json.rows[i].updated_at = json.rows[i].last_update
                    }

                    switch(json.rows[i].spo){
                      case 0:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 1:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 2:
                        pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break; 
                      case 3:
                        pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 4:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      case 5:
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"#696969", color:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                        break;
                      default:  
                        pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
                    }
                    switch(json.rows[i].sit){
                      case 0:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 1:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 2:
                        iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break; 
                      case 3:
                        iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 4:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      case 5:
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"#696969", color:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                        break;
                      default:  
                        iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
                    }
                    
                    let revision = ""
                    if(this.props.currentTab === "Issued"){
                      revision = "R" + String(json.rows[i].revision - 1) + " - " + json.rows[i].transmittal + "/" + json.rows[i].issued_date
                    }else{
                      revision = "*R" + json.rows[i].revision
                    }

                    if(json.rows[i].requested === 1){
                        rButton = <button className="btn btn-danger" disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested !== 1 && json.rows[i].requested !== 2){
                        rButton = <button className="btn btn-warning" disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }else if(json.rows[i].requested === 2){
                        rButton = <button className="btn btn-success" disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                    }

                    if(this.props.currentRole === "SpecialityLead"){
                      if(json.rows[i].requested !== 2 && json.rows[i].issued !== 0 && this.state.tab === "Issued"){
                        rToLOSButton = <button className="btn btn-danger" onClick={() => this.returnToLOS(json.rows[i].filename)} style={{fontSize:"10px", padding:"2px 5px 2px 5px", width:"75px", marginLeft:"5px"}}>Return</button>
                        cancelRevButton = null
                      }else{
                        rToLOSButton = null
                        cancelRevButton = <CancelRevPopUp iso = {json.rows[i].filename} cancelRev={this.cancelRev.bind(this)}/>
                      }
                    }
                    

                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , type:json.rows[i].code, revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div style={{display:"flex"}}> {pButton} {iButton} {rButton} {rToLOSButton} {cancelRevButton}</div>}

                    if(row){
                      if(i % 2 === 0){
                        row["color"] = "#fff"
                      }else{
                        row["color"] = "#eee"
                      }
                       
                      rows.push(row)
                    }
                   
                    
                    }
                    const filterRow = [{key:0, id: <div><input type="text" className="filter__input" placeholder="ISO ID" onChange={(e) => this.filter(0, e.target.value)}/></div>, type: <div><input type="text" className="filter__input" placeholder="Type" onChange={(e) => this.filter(1, e.target.value)}/></div>, revision: <div><input type="text" className="filter__input" placeholder="Revision" onChange={(e) => this.filter(2,e.target.value)}/></div>, date: <div><input type="text" className="filter__input" placeholder="Date" onChange={(e) => this.filter(3,e.target.value)}/></div>, from: <div><input type="text" className="filter__input" placeholder="From" onChange={(e) => this.filter(4,e.target.value)}/></div>, to: <div><input type="text" className="filter__input" placeholder="To" onChange={(e) => this.filter(5,e.target.value)}/></div>, user: <div><input type="text" className="filter__input" placeholder="User" onChange={(e) => this.filter(6,e.target.value)}/></div>, actions: <div><input type="text" className="filter__input" placeholder="Actions" onChange={(e) => this.filter(7,e.target.value)}/></div>}]
                
                    this.setState({data : rows, displayData: rows});
                    await this.setState({filters : filterRow})
              }
          )
          .catch(error => {
              console.log(error);
          })

        
  }

  async componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/acronyms")
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
  
        const options = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      }
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/issuedFiles", options)
            .then(response => response.json())
            .then(async json => {
                    var rows = []
                    let row = null
                    let pButton, iButton, rButton, rToLOSButton, cancelRevButton
                     = null
                    
                    for(let i = 0; i < json.rows.length; i++){
  
                      if(json.rows[i].last_update){
                        json.rows[i].updated_at = json.rows[i].last_update
                      }
  
                      switch(json.rows[i].spo){
                        case 0:
                          pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break;
                        case 1:
                          pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break;
                        case 2:
                          pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break; 
                        case 3:
                          pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break;
                        case 4:
                          pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break;
                        case 5:
                          pButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"#696969", color:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                          break;
                        default:  
                          pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
                      }
                      switch(json.rows[i].sit){
                        case 0:
                          iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break;
                        case 1:
                          iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break;
                        case 2:
                          iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break; 
                        case 3:
                          iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break;
                        case 4:
                          iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break;
                        case 5:
                          iButton = <button className="btn btn-warning" onClick={() => this.props.sendCancelInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"#696969", color:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                          break;
                        default:  
                          iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
                      }
                      
                      let revision = ""
                      if(this.props.currentTab === "Issued"){
                        revision = "R" + String(json.rows[i].revision - 1) + " - " + json.rows[i].transmittal + "/" + json.rows[i].issued_date
                      }else{
                        revision = "*R" + json.rows[i].revision
                      }

                      if(json.rows[i].requested === 1){
                        rButton = <button className="btn btn-danger" disabled style={{backgroundColor:"yellow", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                      }else if(json.rows[i].requested !== 1 && json.rows[i].requested !== 2){
                        rButton = <button className="btn btn-warning" disabled style={{backgroundColor:"white", fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                      }else if(json.rows[i].requested === 2){
                        rButton = <button className="btn btn-success" disabled style={{fontSize:"10px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>R</button>
                      }
  
                      
                    if(this.props.currentRole === "SpecialityLead"){
                      if(json.rows[i].requested !== 2 && json.rows[i].issued !== 0 && this.state.tab === "Issued"){
                        rToLOSButton = <button className="btn btn-danger" onClick={() => this.returnToLOS(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"75px", marginLeft:"5px",float:"right", backgroundColor:"#DC143C", color:"white"}}>Return</button>
                        cancelRevButton = null
                      }else{
                        rToLOSButton = null
                        cancelRevButton = <CancelRevPopUp iso = {json.rows[i].filename} cancelRev={this.cancelRev.bind(this)}/>
                      }
                    }
  
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , type:json.rows[i].code, revision: revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].user, actions: <div style={{display:"flex"}}> {pButton} {iButton} {rButton} {rToLOSButton} {cancelRevButton}</div>}
  
                      if(row){
                        if(i % 2 === 0){
                          row["color"] = "#fff"
                        }else{
                          row["color"] = "#eee"
                        }
                         
                        rows.push(row)
                      }
                     
                      
                      }
                  
                      await this.setState({data : rows});

                      let auxDisplayData = this.state.data
                      let resultData = []
                      let fil, exists = null
                      for(let i = 0; i < auxDisplayData.length; i++){
                        exists = true
                        for(let column = 0; column < Object.keys(auxDisplayData[i]).length-2; column ++){
                          fil = Object.keys(auxDisplayData[i])[column+1]
                          if(fil === "id"){
                            if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
                              exists = false
                            }
                          }else if(fil === "actions"){
                            
                            if(auxDisplayData[i][fil].props.children[5]){
                              if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[1].props.children === "CLAIMED"){
                                let claimed = "claimed"
                                if(!claimed.includes(this.state.filterData[column].toLocaleLowerCase())){
                                  exists = false
                                }
                              }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[1].props.children === "PENDING"){
                                let pending = "pending"
                                if(!pending.includes(this.state.filterData[column].toLocaleLowerCase())){
                                  exists = false
                                }
                              }
                            }else{
                              if(this.state.filterData[column] !== "" && this.state.filterData[column]){
                                exists = false
                              }
                            }
                            
                          }else{
                            if(auxDisplayData[i][fil]){
                              if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].includes(this.state.filterData[column])){
                                exists = false
                              }
                            }
                            
                          }
                          
                        }
                        if(exists){
                          resultData.push(auxDisplayData[i])
                        }
                      }
                      await this.setState({displayData: resultData})
                }
            )
            .catch(error => {
                console.log(error);
            })
    }

  }

  async filter(column, value){
    let fd = this.state.filterData
    fd[column] = value
    await this.setState({filterData: fd})

    let auxDisplayData = this.state.data
    let resultData = []
    let fil, exists = null
    for(let i = 0; i < auxDisplayData.length; i++){
      exists = true
      for(let column = 0; column < Object.keys(auxDisplayData[i]).length-2; column ++){
        fil = Object.keys(auxDisplayData[i])[column+1]
        if(fil === "id"){
          if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
            exists = false
          }
        }else if(fil === "actions"){
          
          if(auxDisplayData[i][fil].props.children[5]){
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[1].props.children === "CLAIMED"){
              let claimed = "claimed"
              if(!claimed.includes(this.state.filterData[column].toLocaleLowerCase())){
                exists = false
              }
            }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[1].props.children === "PENDING"){
              let pending = "pending"
              if(!pending.includes(this.state.filterData[column].toLocaleLowerCase())){
                exists = false
              }
            }
          }else{
            if(this.state.filterData[column] !== "" && this.state.filterData[column]){
              exists = false
            }
          }
          
        }else{
          if(auxDisplayData[i][fil]){
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].includes(this.state.filterData[column])){
              exists = false
            }
          }
          
        }
        
      }
      if(exists){
        resultData.push(auxDisplayData[i])
      }
    }
    await this.setState({displayData: resultData})
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
      const file = new Blob([response], {
        type: "application/pdf"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      let w = window.open(fileURL);

        w.addEventListener("load", function() {
          setTimeout(()=> w.document.title = fileName
          , 300);


        });

        // create <a> tag dinamically
        var fileLink = document.createElement('a');
        fileLink.href = fileURL;

        // it forces the name of the downloaded file
        fileLink.download = fileName;

        // triggers the click event
        fileLink.click();


      
    })
    .catch(error => {
      console.log(error);
    });
  }

  async returnToLOS(fileName){
    this.props.returnToLOS(fileName)
  }

  
  getColumnSearchProps = dataIndex => ({
    render: text => 
    text
      
  });

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
        
        disabled: (record.actions.props.children[1].props.children === 'CLAIMED'| (record.actions.props.children[1].props.children === 'PENDING' && (secureStorage.getItem("role") !== "DesignLead" && secureStorage.getItem("role") !== "StressLead" && secureStorage.getItem("role") !== "SupportsLead" && secureStorage.getItem("role") !== "SpecialityLead")) | (record.actions.props.children[1].props.children !== 'PENDING' && this.props.currentTab !== "Issued" && (secureStorage.getItem("role") === "DesignLead" | secureStorage.getItem("role") === "StressLead" | secureStorage.getItem("role") === "SupportsLead") || record.actions.props.children[5].props.children === "R") && this.props.currentTab !== "Issued"),
        // Column configuration not to be checked
        name: record.name,
      }) : ({
        disabled: (record.actions.props.children[1].props.children === 'CLAIMED'| (record.actions.props.children[1].props.children === 'PENDING' && (secureStorage.getItem("role") !== "DesignLead" && secureStorage.getItem("role") !== "StressLead" && secureStorage.getItem("role") !== "SupportsLead" && secureStorage.getItem("role") !== "SpecialityLead")) | (record.actions.props.children[1].props.children !== 'PENDING' && (secureStorage.getItem("role") === "DesignLead" | secureStorage.getItem("role") === "StressLead" | secureStorage.getItem("role") === "SupportsLead")) && this.props.currentTab !== "Issued"),
        // Column configuration not to be checked
        name: record.name,
      }),
    };

    const rowSelectionFilter = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: true,
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
    
    
    let columns = [
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
        width:"270px"
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        sorter:{
          compare: (a, b) => { return a.type.localeCompare(b.type)},
        },
        width:"70px"
      },
      {
        title: <center className="dataTable__header__text">Revision</center>,
        dataIndex: 'revision',
        key: 'revision',
        ...this.getColumnSearchProps('revision'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
        width:"190px"
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
        },
        width:"150px"
      },
      {
        title: <div className="dataTable__header__text">From</div>,
        dataIndex: 'from',
        key: 'from',
        ...this.getColumnSearchProps('from'),
        sorter: {
          compare: (a, b) => { return a.from.localeCompare(b.from)},
        },
        width:"100px"
      },
      {
        title: <div className="dataTable__header__text">To</div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { return a.to.localeCompare(b.to)},
        },
        width:"120px"
      },
      {
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
        ...this.getColumnSearchProps('user'),
        sorter: {
          compare: (a, b) => { return a.user.localeCompare(b.user)},
        },        
        width:"350px"
      },
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
      },
    ];

    if(process.env.REACT_APP_PROGRESS === "0"){
      columns = [{
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
        width:"270px"
      },
      {
        title: <center className="dataTable__header__text">Revision</center>,
        dataIndex: 'revision',
        key: 'revision',
        ...this.getColumnSearchProps('revision'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
        width:"190px"
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
        },
        width:"150px"
      },
      {
        title: <div className="dataTable__header__text">From</div>,
        dataIndex: 'from',
        key: 'from',
        ...this.getColumnSearchProps('from'),
        sorter: {
          compare: (a, b) => { return a.from.localeCompare(b.from)},
        },
        width:"100px"
      },
      {
        title: <div className="dataTable__header__text">To</div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { return a.to.localeCompare(b.to)},
        },
        width:"120px"
      },
      {
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
        ...this.getColumnSearchProps('user'),
        sorter: {
          compare: (a, b) => { return a.user.localeCompare(b.user)},
        },
        width:"350px"
      },
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
      },
    ];
    }


    var totalElements = null;
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "absolute", bottom: -30, left:0}}>
      <b>Total elements: {this.state.data.length}</b>
     </div>);
    }

    return (
      <div>
        {this.state.updateData}
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} style={{ height: '430px', fontSize:"16px"}} columns={columns} dataSource={this.state.displayData} scroll={{y:360}} pagination={{ defaultPageSize:50, hideOnSinglePage:true, pageSizeOptions:[50, 100, 200, 500]}} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
        <Table className="filter__table"  pagination={{disabled:true, hideOnSinglePage:true}} rowSelection={{type: 'checkbox', ...rowSelectionFilter}} scroll={{y:400}} showHeader = {false} bordered = {true} columns={columns} dataSource={this.state.filters} size="small"/> 
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default IssuedDataTable;