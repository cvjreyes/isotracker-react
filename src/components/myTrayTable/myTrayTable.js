import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './myTrayTable.css'
import UploadPopUp from '../uploadPopUp/uploadPopUp';
import { Link } from 'react-router-dom';
import UploadProcInst from '../uploadProcInst/uploadProcInst';


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

class MyTrayTable extends React.Component{
    state = {
      searchText: '',
      searchedColumn: '',
      data: [],
      role: secureStorage.getItem("role"),
      user: secureStorage.getItem("user"),
      tab: this.props.currentTab,
      selectedRows: [],
      selectedRowsKeys: [],
      updateData: this.props.updateData,
      popup: false
    };

  updateData() {
    this.setState({data : []})
    this.props.updateD()
  }

  componentDidMount(){

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
      this.setState({
        username: json.name
      })
    })
    

    const body ={
      currentRole : this.state.role,
      currentUser: this.state.user
    }
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  }
    fetch("http://localhost:5000/api/myTrayFiles/myFiles", options)
        .then(response => response.json())
        .then(json => {
            var rows = []
            var row = null;
            let pButton, iButton, fButton = null;
            for(let i = 0; i < json.rows.length; i++){
              console.log(json.rows[i].spo)
              switch(json.rows[i].spo){
                case 0:
                  pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                  break;
                case 1:
                  pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                  break;
                case 2:
                  pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                  break; 
                case 3:
                  pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                  break;
                case 4:
                  pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                  break;
                default:  
                  pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
              }
              switch(json.rows[i].sit){
                case 0:
                  iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                  break;
                case 1:
                  iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                  break;
                case 2:
                  iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                  break; 
                case 3:
                  iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                  break;
                case 4:
                  iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                  break;
                default:  
                  iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
              }
              switch(json.rows[i].forced){
                case 1:
                  fButton = <button className="btn btn-danger" disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>F</button>
                  break;
                default:
                  break;
              }
              if(process.env.REACT_APP_IFC === "1"){
                if(secureStorage.getItem("role") === "Process" ||secureStorage.getItem("role") === "Instrument"){
                  row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadProcInst id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} role={this.state.role} update={this.updateData.bind(this)}/> {fButton} </div>}
                }else{
                  if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                    if (secureStorage.getItem("role") === "Design" || secureStorage.getItem("role") === "DesignLead" || secureStorage.getItem("role") === "Issuer"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton} </div>} 
                    }else{
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton}</div>}
                    }
                  }else{
                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user}/> {pButton} {iButton} {fButton}</div>}
                  } 
                }
                              
              }else{
                if(secureStorage.getItem("role") === "Process" ||secureStorage.getItem("role") === "Instrument"){
                  row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div> <UploadProcInst id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} update={this.updateData.bind(this)}/> {fButton} </div>}
                }else{
                  if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton}</div>}
                  }else{
                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} /> {pButton} {iButton} {fButton}</div>}
                  }
                }
                
              }
              
              rows.push(row)
            }
            this.setState({data : rows});

            }
        )
        .catch(error => {
            console.log(error);
        })
  }
  

  componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){
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
        this.setState({
          username: json.name
        })
      })  
      
      const body ={
        currentRole : secureStorage.getItem("role"),
        currentUser : this.state.user
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
      fetch("http://localhost:5000/api/myTrayFiles/myFiles", options)
          .then(response => response.json())
          .then(json => {
              var rows = []
              var row = null
              let pButton, iButton, fButton = null;
              for(let i = 0; i < json.rows.length; i++){
                switch(json.rows[i].spo){
                  case 0:
                    pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                    break;
                  case 1:
                    pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                    break;
                  case 2:
                    pButton = <button className="btn btn-success" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                    break; 
                  case 3:
                    pButton = <button className="btn btn-danger" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                    break;
                  case 4:
                    pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>
                    break;
                  default:  
                    pButton = <button className="btn btn-warning" onClick={() => this.props.sendProcessClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>P</button>      
                }
                switch(json.rows[i].sit){
                  case 0:
                    iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                    break;
                  case 1:
                    iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"yellow", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                    break;
                  case 2:
                    iButton = <button className="btn btn-success" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                    break; 
                  case 3:
                    iButton = <button className="btn btn-danger" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} style={{fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                    break;
                  case 4:
                    iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)} disabled style={{backgroundColor:"orange", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>
                    break;
                  default:  
                    iButton = <button className="btn btn-warning" onClick={() => this.props.sendInstrumentClick(json.rows[i].filename)}style={{backgroundColor:"white", fontSize:"12px", borderColor:"black", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>I</button>      
                }
                switch(json.rows[i].forced){
                  case 1:
                    fButton = <button className="btn btn-danger" disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"30px", marginRight:"5px"}}>F</button>
                    break;
                  default:
                    break;
                }
                if(process.env.REACT_APP_IFC === "1"){
                  if(secureStorage.getItem("role") === "Process" ||secureStorage.getItem("role") === "Instrument"){
                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadProcInst id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} role={this.state.role} update={this.updateData.bind(this)}/> {fButton} </div>}
                  }else{
                    if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                      if (secureStorage.getItem("role") === "Design" || secureStorage.getItem("role") === "DesignLead" || secureStorage.getItem("role") === "Issuer"){
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton} </div>} 
                      }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton}</div>}
                      }
                    }else{
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user}/> {pButton} {iButton} {fButton}</div>}
                    } 
                  }
                                
                }else{
                  if(secureStorage.getItem("role") === "Process" ||secureStorage.getItem("role") === "Instrument"){
                    row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div> <UploadProcInst id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} update={this.updateData.bind(this)}/> {fButton} </div>}
                  }else{
                    if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions: <div><button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"120px", marginRight: "5px"}}>CANCEL VERIFY</button> {pButton} {iButton} {fButton}</div>}
                    }else{
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , revision: "R" + json.rows[i].revision + "*", date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from.toString(), to: json.rows[i].to, actions:<div><UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} /> {pButton} {iButton} {fButton}</div>}
                    }
                  }
                  
                }
                
                rows.push(row)
              }
              this.setState({data : rows});

              }
          )
          .catch(error => {
              console.log(error);
          })
    }
  }

  getMaster(filename){

    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/pdf"
      }
    }
    fetch("http://localhost:5000/getMaster/"+filename, options)
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
      text.props && text.type !== UploadProcInst && text.type !== "div" ? (
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
    this.props.onChange(ids);
  };


  render() {

    const selectedRows = this.state.selectedRows;
    const selectedRowsKeys = this.state.selectedRowsKeys;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => 
      this.state.role !== "Instrument" && this.state.role !== "Process" ? (
      ( 
        {
        
        disabled: record.actions.props.children[0].props.children === 'CANCEL VERIFY' ,
        // Column configuration not to be checked
        name: record.name,
      })
      ) : (
        {
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
        width: '20%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <center className="dataTable__header__text">Revision</center>,
        dataIndex: 'revision',
        key: 'revision',
        width: '8%',
        ...this.getColumnSearchProps('revision'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
        },
      },
      {
        title: <div className="dataTable__header__text">From</div>,
        dataIndex: 'from',
        key: 'from',
        ...this.getColumnSearchProps('from'),
        sorter: {
          compare: (a, b) => { return a.from.localeCompare(b.from)},
        },
      },
      {
        title: <div className="dataTable__header__text">To</div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { return a.to.localeCompare(b.to)},
        },
      },
      
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
        sorter: {
          compare: (a, b) => a.actions.props.type - b.actions.props.type,
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
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
          {totalElements}
        </div>
      </div>
    );
  }
}

export default MyTrayTable;