import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';


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

class procInstTable extends React.Component{ //Datatable de procesos e instrumentacion
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    displayData: [],
    filterData: ["", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    filters: []
  };

  

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
    
    const body ={
      type : this.props.currentTab
    }
    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  }
    //Get de las isos en p/i
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/filesProcInst", options)
        .then(response => response.json())
        .then(async json => {
                var rows = []
                var row = null
                for(let i = 0; i < json.rows.length; i++){
                    if(json.rows[i].spoclaimed === 1 && this.props.currentTab ===  "Process"){ //Si estamos en la tabla de procesos y la iso esta claimed
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].spouser, actions: <div><button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button></div> }
                    }else if (json.rows[i].sitclaimed === 1 && this.props.currentTab ===  "Instrument"){ //Si estamos en la tabla de instrumentos y la iso esta claimed
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].situser, actions: <div><button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button></div>}   
                    }else{ //Si esta libre
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: "None", actions:""}
                    }
                    if(row){
                      if(i % 2 === 0){
                        row["color"] = "#fff"
                      }else{
                        row["color"] = "#eee"
                      }
                       
                      rows.push(row)
                    }
                  }
                
                  const filterRow = [{key:0, id: <div><input type="text" className="filter__input" placeholder="ISO ID" onChange={(e) => this.filter(0, e.target.value)}/></div>, date: <div><input type="text" className="filter__input" placeholder="Date" onChange={(e) => this.filter(1,e.target.value)}/></div>, from: <div><input type="text" className="filter__input" placeholder="From" onChange={(e) => this.filter(2,e.target.value)}/></div>, to: <div><input type="text" className="filter__input" placeholder="To" onChange={(e) => this.filter(3,e.target.value)}/></div>, user: <div><input type="text" className="filter__input" placeholder="User" onChange={(e) => this.filter(4,e.target.value)}/></div>, actions: <div><input type="text" className="filter__input" placeholder="Actions" onChange={(e) => this.filter(5,e.target.value)}/></div>}]
                
                  this.setState({data : rows, selectedRows: [], displayData: rows});
                  await this.setState({filters : filterRow})

            }
        )
        .catch(error => {
            console.log(error);
        })

        
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){
      
      const body ={
        type : this.props.currentTab
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/filesProcInst", options)
          .then(response => response.json())
          .then(async json => {
                  var rows = []
                  let row = null
                  for(let i = 0; i < json.rows.length; i++){
                    if(json.rows[i].spoclaimed === 1 && this.props.currentTab ===  "Process"){ 
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].spouser, actions:<div><button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button></div>}
                    }else if (json.rows[i].sitclaimed === 1 && this.props.currentTab ===  "Instrument"){
                      row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: json.rows[i].situser, actions: <div><button className="btn btn-success"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px"}}>CLAIMED</button></div> }   
                    }else{
                        row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, user: "None", actions:""}
                    }
                    if(row){
                      if(i % 2 === 0){
                        row["color"] = "#fff"
                      }else{
                        row["color"] = "#eee"
                      }
                       
                      rows.push(row)
                    }
                  }
                  this.setState({
                    data : rows,
                  });
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

                        if(auxDisplayData[i][fil].props){
                          if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children.props.children === "CLAIMED"){
                            let claimed = "claimed"
                            if(!claimed.includes(this.state.filterData[column].toLocaleLowerCase())){
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

          if(auxDisplayData[i][fil].props){
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children.props.children === "CLAIMED"){
              let claimed = "claimed"
              if(!claimed.includes(this.state.filterData[column].toLocaleLowerCase())){
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

  
  getColumnSearchProps = dataIndex => ({
  
    render: text => 
      text.props ? (
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
      getCheckboxProps: (record) => (      
        {
        
        disabled:  record.actions.props != null | (record.actions.type === 'button' && (secureStorage.getItem("role") !== "DesignLead" && secureStorage.getItem("role") !== "StressLead" && secureStorage.getItem("role") !== "SupportsLead" && secureStorage.getItem("role") !== "SpecialityLead")) | (record.actions.type !== 'button' && (secureStorage.getItem("role") === "DesignLead" | secureStorage.getItem("role") === "StressLead" | secureStorage.getItem("role") === "SupportsLead")),
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
    
    
    const columns = [
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '23%',
        ...this.getColumnSearchProps('id'),
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
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
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
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} style={{ height: '430px' }} dataSource={this.state.displayData} scroll={{y:330}} pagination={{disabled:true, defaultPageSize:5000}} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
        <Table className="filter__table" pagination={{disabled:true}} rowSelection={{type: 'checkbox', ...rowSelectionFilter}} scroll={{y:400}} showHeader = {false} bordered = {true} columns={columns} dataSource={this.state.filters} size="small"/>  
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default procInstTable;