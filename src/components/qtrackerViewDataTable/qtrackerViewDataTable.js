import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import QtrackerNWCSpecPopUp from '../qtrackerNWCSpecPopUp/qtrackerNWCSpecPopUp';
import QtrackerNVNSpecPopUp from '../qtrackerNVNSpecPopUp/qtrackerNVNSpecPopUp';
import QtrackerNRISpecPopUp from '../qtrackerNRISpecPopUp/qtrackerNRISpecPopUp';
import QtrackerNRBSpecPopUp from '../qtrackerNRBSpecPopUp/qtrackerNRBSpecPopUp';
import QtrackerNRIDSSpecPopUp from '../qtrackerNRIDSSpecPopUp/qtrackerNRIDSSpecPopUp';
import QtrackerRPSpecPopUp from '../qtrackerRPSpecPopUp/qtrackerRPSpecPopUp';
import './qtrackerViewDataTable.css'
import AttachIcon from "../../assets/images/attach.png"

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

class QTrackerViewDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    displayData: [],
    filterData: ["", "", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    steps: [],
    filters: []
  };

  async statusChange(incidence_number, status, type){
    let status_id
    if(status === "pending"){
      status_id = 0
    }else if(status === "progress"){
      status_id = 1
    }else if(status === "ready"){
      status_id = 2
    }else if(status === "rejected"){
      status_id = 3
    }

   await this.props.updateStatus([incidence_number, status_id, type])  
  }

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNWC", options)
        .then(response => response.json())
        .then(async json => {
          var rows = []
          var row = null
            for(let i = 0; i < json.rows.length; i++){
                if(json.rows[i].attach === 1){
                  row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNWCSpecPopUp incidence_number={json.rows[i].incidence_number} spref={json.rows[i].spref} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                }else{
                  row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNWCSpecPopUp incidence_number={json.rows[i].incidence_number} spref={json.rows[i].spref} description={json.rows[i].description}/>}
                }
                if(secureStorage.getItem("role") === "3D Admin"){
                  if(json.rows[i].status === 0){
                      row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")} >
                      <option value="pending" selected>Pending</option>
                      <option value="progress">In progress</option>
                      <option value="ready">Ready</option>
                      <option value="rejected">Rejected</option>
                    </select>
                      row.color = "#www"
                  }else if(json.rows[i].status === 1){
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                    <option value="ready">Ready</option>
                    <option value="rejected">Rejected</option>
                  </select>
                      row.color = "#yyy"
                  }else if(json.rows[i].status === 2){
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress">In progress</option>
                    <option value="ready" selected>Ready</option>
                    <option value="rejected">Rejected</option>
                    </select>
                      row.color = "#ggg"
                  }else{
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress">In progress</option>
                    <option value="ready">Ready</option>
                    <option value="rejected" selected>Rejected</option>
                   </select>
                      row.color = "#rrr"
                  }
                }else{
                  if(json.rows[i].status === 0){
                    row.status = "Pending"
                    row.color = "#www"
                  }else if(json.rows[i].status === 1){
                      row.status = "In progress"
                      row.color = "#yyy"
                  }else if(json.rows[i].status === 2){
                      row.status = "Ready"
                      row.color = "#ggg"
                  }else{
                      row.status = "Rejected"
                      row.color = "#rrr"
                  }
                }
                
                rows.push(row)
            }
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNVN", options)
            .then(response => response.json())
            .then(async json => {
            var row = null
                for(let i = 0; i < json.rows.length; i++){
                    if(json.rows[i].attach === 1){
                      row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNVNSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                    }else{
                      row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNVNSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name} description={json.rows[i].description}/>}
                    }
                    if(secureStorage.getItem("role") === "3D Admin"){
                      if(json.rows[i].status === 0){
                          row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")} >
                          <option value="pending" selected>Pending</option>
                          <option value="progress">In progress</option>
                          <option value="ready">Ready</option>
                          <option value="rejected">Rejected</option>
                        </select>
                          row.color = "#www"
                      }else if(json.rows[i].status === 1){
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                        <option value="ready">Ready</option>
                        <option value="rejected">Rejected</option>
                      </select>
                          row.color = "#yyy"
                      }else if(json.rows[i].status === 2){
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress">In progress</option>
                        <option value="ready" selected>Ready</option>
                        <option value="rejected">Rejected</option>
                        </select>
                          row.color = "#ggg"
                      }else{
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress">In progress</option>
                        <option value="ready">Ready</option>
                        <option value="rejected" selected>Rejected</option>
                       </select>
                          row.color = "#rrr"
                      }
                    }else{
                      if(json.rows[i].status === 0){
                        row.status = "Pending"
                        row.color = "#www"
                      }else if(json.rows[i].status === 1){
                          row.status = "In progress"
                          row.color = "#yyy"
                      }else if(json.rows[i].status === 2){
                          row.status = "Ready"
                          row.color = "#ggg"
                      }else{
                          row.status = "Rejected"
                          row.color = "#rrr"
                      }
                    }
                    rows.push(row)
                }
                
                await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRI", options)
                .then(response => response.json())
                .then(async json => {
                var row = null
                    for(let i = 0; i < json.rows.length; i++){
                        if(json.rows[i].attach === 1){
                          row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNRISpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                        }else{
                          row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRISpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/>}
                        }
                        if(secureStorage.getItem("role") === "3D Admin"){
                          if(json.rows[i].status === 0){
                              row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")} >
                              <option value="pending" selected>Pending</option>
                              <option value="progress">In progress</option>
                              <option value="ready">Ready</option>
                              <option value="rejected">Rejected</option>
                            </select>
                              row.color = "#www"
                          }else if(json.rows[i].status === 1){
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                            <option value="ready">Ready</option>
                            <option value="rejected">Rejected</option>
                          </select>
                              row.color = "#yyy"
                          }else if(json.rows[i].status === 2){
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress">In progress</option>
                            <option value="ready" selected>Ready</option>
                            <option value="rejected">Rejected</option>
                            </select>
                              row.color = "#ggg"
                          }else{
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress">In progress</option>
                            <option value="ready">Ready</option>
                            <option value="rejected" selected>Rejected</option>
                           </select>
                              row.color = "#rrr"
                          }
                        }else{
                          if(json.rows[i].status === 0){
                            row.status = "Pending"
                            row.color = "#www"
                          }else if(json.rows[i].status === 1){
                              row.status = "In progress"
                              row.color = "#yyy"
                          }else if(json.rows[i].status === 2){
                              row.status = "Ready"
                              row.color = "#ggg"
                          }else{
                              row.status = "Rejected"
                              row.color = "#rrr"
                          }
                        }
                        rows.push(row)
                    }
                    
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRB", options)
                    .then(response => response.json())
                    .then(async json => {
                    var row = null
                        for(let i = 0; i < json.rows.length; i++){
                            if(json.rows[i].attach === 1){
                              row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNRBSpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                            }else{
                              row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRBSpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/>}
                            }
                            if(secureStorage.getItem("role") === "3D Admin"){
                              if(json.rows[i].status === 0){
                                  row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")} >
                                  <option value="pending" selected>Pending</option>
                                  <option value="progress">In progress</option>
                                  <option value="ready">Ready</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                  row.color = "#www"
                              }else if(json.rows[i].status === 1){
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                <option value="ready">Ready</option>
                                <option value="rejected">Rejected</option>
                              </select>
                                  row.color = "#yyy"
                              }else if(json.rows[i].status === 2){
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress">In progress</option>
                                <option value="ready" selected>Ready</option>
                                <option value="rejected">Rejected</option>
                                </select>
                                  row.color = "#ggg"
                              }else{
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress">In progress</option>
                                <option value="ready">Ready</option>
                                <option value="rejected" selected>Rejected</option>
                               </select>
                                  row.color = "#rrr"
                              }
                            }else{
                              if(json.rows[i].status === 0){
                                row.status = "Pending"
                                row.color = "#www"
                              }else if(json.rows[i].status === 1){
                                  row.status = "In progress"
                                  row.color = "#yyy"
                              }else if(json.rows[i].status === 2){
                                  row.status = "Ready"
                                  row.color = "#ggg"
                              }else{
                                  row.status = "Rejected"
                                  row.color = "#rrr"
                              }
                            }
                            rows.push(row)
                        }
                        
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRIDS", options)
                        .then(response => response.json())
                        .then(async json => {
                        var row = null
                            for(let i = 0; i < json.rows.length; i++){
                                row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRIDSSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name}/>}
                                if(secureStorage.getItem("role") === "3D Admin"){
                                  if(json.rows[i].status === 0){
                                      row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")} >
                                      <option value="pending" selected>Pending</option>
                                      <option value="progress">In progress</option>
                                      <option value="ready">Ready</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                      row.color = "#www"
                                  }else if(json.rows[i].status === 1){
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                    <option value="ready">Ready</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                      row.color = "#yyy"
                                  }else if(json.rows[i].status === 2){
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress">In progress</option>
                                    <option value="ready" selected>Ready</option>
                                    <option value="rejected">Rejected</option>
                                    </select>
                                      row.color = "#ggg"
                                  }else{
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress">In progress</option>
                                    <option value="ready">Ready</option>
                                    <option value="rejected" selected>Rejected</option>
                                   </select>
                                      row.color = "#rrr"
                                  }
                                }else{
                                  if(json.rows[i].status === 0){
                                    row.status = "Pending"
                                    row.color = "#www"
                                  }else if(json.rows[i].status === 1){
                                      row.status = "In progress"
                                      row.color = "#yyy"
                                  }else if(json.rows[i].status === 2){
                                      row.status = "Ready"
                                      row.color = "#ggg"
                                  }else{
                                      row.status = "Rejected"
                                      row.color = "#rrr"
                                  }
                                }
                                rows.push(row)
                            }
                            
                            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getRP", options)
                            .then(response => response.json())
                            .then(async json => {
                            var row = null
                                for(let i = 0; i < json.rows.length; i++){
                                    row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerRPSpecPopUp incidence_number={json.rows[i].incidence_number} items={json.rows[i].items_to_report} scope={json.rows[i].scope} description={json.rows[i].description}/>}
                                    if(secureStorage.getItem("role") === "3D Admin"){
                                      if(json.rows[i].status === 0){
                                          row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")} >
                                          <option value="pending" selected>Pending</option>
                                          <option value="progress">In progress</option>
                                          <option value="ready">Ready</option>
                                          <option value="rejected">Rejected</option>
                                        </select>
                                          row.color = "#www"
                                      }else if(json.rows[i].status === 1){
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                        <option value="ready">Ready</option>
                                        <option value="rejected">Rejected</option>
                                      </select>
                                          row.color = "#yyy"
                                      }else if(json.rows[i].status === 2){
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress">In progress</option>
                                        <option value="ready" selected>Ready</option>
                                        <option value="rejected">Rejected</option>
                                        </select>
                                          row.color = "#ggg"
                                      }else{
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress">In progress</option>
                                        <option value="ready">Ready</option>
                                        <option value="rejected" selected>Rejected</option>
                                       </select>
                                          row.color = "#rrr"
                                      }
                                    }else{
                                      if(json.rows[i].status === 0){
                                        row.status = "Pending"
                                        row.color = "#www"
                                      }else if(json.rows[i].status === 1){
                                          row.status = "In progress"
                                          row.color = "#yyy"
                                      }else if(json.rows[i].status === 2){
                                          row.status = "Ready"
                                          row.color = "#ggg"
                                      }else{
                                          row.status = "Rejected"
                                          row.color = "#rrr"
                                      }
                                    }
                                    rows.push(row)
                                }

                                // Sort the array based on the second element
                                rows.sort(function(first, second) {
                                  return second.created_at.localeCompare(first.created_at);
                                });
                                const filterRow = [{incidence_number: <div><input type="text" className="filter__input" placeholder="Reference" onChange={(e) => this.filter(0, e.target.value)}/></div>, user: <div><input type="text" className="filter__input" placeholder="User" onChange={(e) => this.filter(1, e.target.value)}/></div>, created_at: <div><input type="text" className="filter__input" placeholder="Date" onChange={(e) => this.filter(2,e.target.value)}/></div>, status: <div><input type="text" className="filter__input" placeholder="Status" onChange={(e) => this.filter(3,e.target.value)}/></div>}]
                
                                this.setState({data : rows, displayData: rows});
                                await this.setState({filters : filterRow})

                            })

                        })

                    })

                })

            })
            
        })

  }


  async componentDidUpdate(prevProps, prevState){
    
    if(prevProps !== this.props){

      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNWC", options)
        .then(response => response.json())
        .then(async json => {
          var rows = []
          var row = null
            for(let i = 0; i < json.rows.length; i++){
                if(json.rows[i].attach === 1){
                  row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNWCSpecPopUp incidence_number={json.rows[i].incidence_number} spref={json.rows[i].spref} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                }else{
                  row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNWCSpecPopUp incidence_number={json.rows[i].incidence_number} spref={json.rows[i].spref} description={json.rows[i].description}/>}
                }
                if(secureStorage.getItem("role") === "3D Admin"){
                  if(json.rows[i].status === 0){
                      row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")} >
                      <option value="pending" selected>Pending</option>
                      <option value="progress">In progress</option>
                      <option value="ready">Ready</option>
                      <option value="rejected">Rejected</option>
                    </select>
                      row.color = "#www"
                  }else if(json.rows[i].status === 1){
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                    <option value="ready">Ready</option>
                    <option value="rejected">Rejected</option>
                  </select>
                      row.color = "#yyy"
                  }else if(json.rows[i].status === 2){
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress">In progress</option>
                    <option value="ready" selected>Ready</option>
                    <option value="rejected">Rejected</option>
                    </select>
                      row.color = "#ggg"
                  }else{
                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NWC")}>
                    <option value="pending">Pending</option>
                    <option value="progress">In progress</option>
                    <option value="ready">Ready</option>
                    <option value="rejected" selected>Rejected</option>
                   </select>
                      row.color = "#rrr"
                  }
                }else{
                  if(json.rows[i].status === 0){
                    row.status = "Pending"
                    row.color = "#www"
                  }else if(json.rows[i].status === 1){
                      row.status = "In progress"
                      row.color = "#yyy"
                  }else if(json.rows[i].status === 2){
                      row.status = "Ready"
                      row.color = "#ggg"
                  }else{
                      row.status = "Rejected"
                      row.color = "#rrr"
                  }
                }
                
                rows.push(row)
            }
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNVN", options)
            .then(response => response.json())
            .then(async json => {
            var row = null
                for(let i = 0; i < json.rows.length; i++){
                    if(json.rows[i].attach === 1){
                      row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNVNSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                    }else{
                      row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNVNSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name} description={json.rows[i].description}/>}
                    }
                    if(secureStorage.getItem("role") === "3D Admin"){
                      if(json.rows[i].status === 0){
                          row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")} >
                          <option value="pending" selected>Pending</option>
                          <option value="progress">In progress</option>
                          <option value="ready">Ready</option>
                          <option value="rejected">Rejected</option>
                        </select>
                          row.color = "#www"
                      }else if(json.rows[i].status === 1){
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                        <option value="ready">Ready</option>
                        <option value="rejected">Rejected</option>
                      </select>
                          row.color = "#yyy"
                      }else if(json.rows[i].status === 2){
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress">In progress</option>
                        <option value="ready" selected>Ready</option>
                        <option value="rejected">Rejected</option>
                        </select>
                          row.color = "#ggg"
                      }else{
                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NVN")}>
                        <option value="pending">Pending</option>
                        <option value="progress">In progress</option>
                        <option value="ready">Ready</option>
                        <option value="rejected" selected>Rejected</option>
                       </select>
                          row.color = "#rrr"
                      }
                    }else{
                      if(json.rows[i].status === 0){
                        row.status = "Pending"
                        row.color = "#www"
                      }else if(json.rows[i].status === 1){
                          row.status = "In progress"
                          row.color = "#yyy"
                      }else if(json.rows[i].status === 2){
                          row.status = "Ready"
                          row.color = "#ggg"
                      }else{
                          row.status = "Rejected"
                          row.color = "#rrr"
                      }
                    }
                    rows.push(row)
                }
                
                await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRI", options)
                .then(response => response.json())
                .then(async json => {
                var row = null
                    for(let i = 0; i < json.rows.length; i++){
                        if(json.rows[i].attach === 1){
                          row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNRISpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                        }else{
                          row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRISpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/>}
                        }
                        if(secureStorage.getItem("role") === "3D Admin"){
                          if(json.rows[i].status === 0){
                              row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")} >
                              <option value="pending" selected>Pending</option>
                              <option value="progress">In progress</option>
                              <option value="ready">Ready</option>
                              <option value="rejected">Rejected</option>
                            </select>
                              row.color = "#www"
                          }else if(json.rows[i].status === 1){
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                            <option value="ready">Ready</option>
                            <option value="rejected">Rejected</option>
                          </select>
                              row.color = "#yyy"
                          }else if(json.rows[i].status === 2){
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress">In progress</option>
                            <option value="ready" selected>Ready</option>
                            <option value="rejected">Rejected</option>
                            </select>
                              row.color = "#ggg"
                          }else{
                            row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRI")}>
                            <option value="pending">Pending</option>
                            <option value="progress">In progress</option>
                            <option value="ready">Ready</option>
                            <option value="rejected" selected>Rejected</option>
                           </select>
                              row.color = "#rrr"
                          }
                        }else{
                          if(json.rows[i].status === 0){
                            row.status = "Pending"
                            row.color = "#www"
                          }else if(json.rows[i].status === 1){
                              row.status = "In progress"
                              row.color = "#yyy"
                          }else if(json.rows[i].status === 2){
                              row.status = "Ready"
                              row.color = "#ggg"
                          }else{
                              row.status = "Rejected"
                              row.color = "#rrr"
                          }
                        }
                        rows.push(row)
                    }
                    
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRB", options)
                    .then(response => response.json())
                    .then(async json => {
                    var row = null
                        for(let i = 0; i < json.rows.length; i++){
                            if(json.rows[i].attach === 1){
                              row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <div><QtrackerNRBSpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/><img src={AttachIcon} alt="att" className="attach__icon" style={{marginRight:"0px"}}></img></div>}
                            }else{
                              row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRBSpecPopUp incidence_number={json.rows[i].incidence_number} pipe={json.rows[i].pipe} description={json.rows[i].description}/>}
                            }
                            if(secureStorage.getItem("role") === "3D Admin"){
                              if(json.rows[i].status === 0){
                                  row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")} >
                                  <option value="pending" selected>Pending</option>
                                  <option value="progress">In progress</option>
                                  <option value="ready">Ready</option>
                                  <option value="rejected">Rejected</option>
                                </select>
                                  row.color = "#www"
                              }else if(json.rows[i].status === 1){
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                <option value="ready">Ready</option>
                                <option value="rejected">Rejected</option>
                              </select>
                                  row.color = "#yyy"
                              }else if(json.rows[i].status === 2){
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress">In progress</option>
                                <option value="ready" selected>Ready</option>
                                <option value="rejected">Rejected</option>
                                </select>
                                  row.color = "#ggg"
                              }else{
                                row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRB")}>
                                <option value="pending">Pending</option>
                                <option value="progress">In progress</option>
                                <option value="ready">Ready</option>
                                <option value="rejected" selected>Rejected</option>
                               </select>
                                  row.color = "#rrr"
                              }
                            }else{
                              if(json.rows[i].status === 0){
                                row.status = "Pending"
                                row.color = "#www"
                              }else if(json.rows[i].status === 1){
                                  row.status = "In progress"
                                  row.color = "#yyy"
                              }else if(json.rows[i].status === 2){
                                  row.status = "Ready"
                                  row.color = "#ggg"
                              }else{
                                  row.status = "Rejected"
                                  row.color = "#rrr"
                              }
                            }
                            rows.push(row)
                        }
                        
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNRIDS", options)
                        .then(response => response.json())
                        .then(async json => {
                        var row = null
                            for(let i = 0; i < json.rows.length; i++){
                                row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerNRIDSSpecPopUp incidence_number={json.rows[i].incidence_number} name={json.rows[i].name}/>}
                                if(secureStorage.getItem("role") === "3D Admin"){
                                  if(json.rows[i].status === 0){
                                      row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")} >
                                      <option value="pending" selected>Pending</option>
                                      <option value="progress">In progress</option>
                                      <option value="ready">Ready</option>
                                      <option value="rejected">Rejected</option>
                                    </select>
                                      row.color = "#www"
                                  }else if(json.rows[i].status === 1){
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                    <option value="ready">Ready</option>
                                    <option value="rejected">Rejected</option>
                                  </select>
                                      row.color = "#yyy"
                                  }else if(json.rows[i].status === 2){
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress">In progress</option>
                                    <option value="ready" selected>Ready</option>
                                    <option value="rejected">Rejected</option>
                                    </select>
                                      row.color = "#ggg"
                                  }else{
                                    row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "NRIDS")}>
                                    <option value="pending">Pending</option>
                                    <option value="progress">In progress</option>
                                    <option value="ready">Ready</option>
                                    <option value="rejected" selected>Rejected</option>
                                   </select>
                                      row.color = "#rrr"
                                  }
                                }else{
                                  if(json.rows[i].status === 0){
                                    row.status = "Pending"
                                    row.color = "#www"
                                  }else if(json.rows[i].status === 1){
                                      row.status = "In progress"
                                      row.color = "#yyy"
                                  }else if(json.rows[i].status === 2){
                                      row.status = "Ready"
                                      row.color = "#ggg"
                                  }else{
                                      row.status = "Rejected"
                                      row.color = "#rrr"
                                  }
                                }
                                rows.push(row)
                            }
                            
                            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getRP", options)
                            .then(response => response.json())
                            .then(async json => {
                            var row = null
                                for(let i = 0; i < json.rows.length; i++){
                                    row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at.toString().substring(0,10) + " "+ json.rows[i].created_at.toString().substring(11,19), specifications: <QtrackerRPSpecPopUp incidence_number={json.rows[i].incidence_number} items={json.rows[i].items_to_report} scope={json.rows[i].scope} description={json.rows[i].description}/>}
                                    if(secureStorage.getItem("role") === "3D Admin"){
                                      if(json.rows[i].status === 0){
                                          row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")} >
                                          <option value="pending" selected>Pending</option>
                                          <option value="progress">In progress</option>
                                          <option value="ready">Ready</option>
                                          <option value="rejected">Rejected</option>
                                        </select>
                                          row.color = "#www"
                                      }else if(json.rows[i].status === 1){
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress" selected style={{backgroundColor:"#yyy"}}>In progress</option>
                                        <option value="ready">Ready</option>
                                        <option value="rejected">Rejected</option>
                                      </select>
                                          row.color = "#yyy"
                                      }else if(json.rows[i].status === 2){
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress">In progress</option>
                                        <option value="ready" selected>Ready</option>
                                        <option value="rejected">Rejected</option>
                                        </select>
                                          row.color = "#ggg"
                                      }else{
                                        row.status = <select name="status" id="status" onChange={(event)=> this.statusChange(json.rows[i].incidence_number, event.target.value, "RP")}>
                                        <option value="pending">Pending</option>
                                        <option value="progress">In progress</option>
                                        <option value="ready">Ready</option>
                                        <option value="rejected" selected>Rejected</option>
                                       </select>
                                          row.color = "#rrr"
                                      }
                                    }else{
                                      if(json.rows[i].status === 0){
                                        row.status = "Pending"
                                        row.color = "#www"
                                      }else if(json.rows[i].status === 1){
                                          row.status = "In progress"
                                          row.color = "#yyy"
                                      }else if(json.rows[i].status === 2){
                                          row.status = "Ready"
                                          row.color = "#ggg"
                                      }else{
                                          row.status = "Rejected"
                                          row.color = "#rrr"
                                      }
                                    }
                                    rows.push(row)
                                }

                                // Sort the array based on the second element
                                rows.sort(function(first, second) {
                                  return second.created_at.localeCompare(first.created_at);
                                });
                                
                                await this.setState({data: rows})

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
                                  

                            })

                        })

                    })

                })

            })
            
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

    const columns = [
      {
        title: <center className="dataTable__header__text">Reference</center>,
        dataIndex: 'incidence_number',
        key: 'incidence_number',
        ...this.getColumnSearchProps('incidence_number'),
        sorter:{
          compare: (a, b) => a.incidence_number.localeCompare(b.incidence_number),
        },
      },
      {
        title: <center className="dataTable__header__text">User</center>,
        dataIndex: 'user',
        key: 'user',
        ...this.getColumnSearchProps('user'),
        sorter:{
          compare: (a, b) => a.user.localeCompare(b.user),
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'created_at',
        key: 'created_at',
        ...this.getColumnSearchProps('created_at'),
        sorter: {
          compare: (a, b) => { return a.created_at.localeCompare(b.created_at)},
        },
        
      },
      {
        title: <center className="dataTable__header__text">Actions</center>,
        dataIndex: 'specifications',
        key: 'specifications',
        ...this.getColumnSearchProps('specifications'),
        width: "120px"
      },
      {
        title: <center className="dataTable__header__text">Status</center>,
        dataIndex: 'status',
        key: 'status',
        ...this.getColumnSearchProps('status'),
        sorter:{
          compare: (a, b) => a.status.localeCompare(b.status),
        },
        width: '160px'
      },
    ]

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
        <div className="estimatedDataTable__container" style={{width:"auto"}}>
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.displayData} style={{ height: '540px' }} scroll={{y:437}} pagination={{disabled:true, defaultPageSize:5000}} size="small"
         rowClassName= {(record) => record.color.replace('#', '')}/>
          <Table className="filter__table" pagination={{disabled:true}} scroll={{y:437}} showHeader = {false} bordered = {true} columns={columns} dataSource={this.state.filters} size="small"/> 
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default QTrackerViewDataTable;