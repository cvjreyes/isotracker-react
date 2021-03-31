import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import './myTrayTable.css'
import UploadPopUp from '../uploadPopUp/uploadPopUp';


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
            for(let i = 0; i < json.rows.length; i++){
              if(process.env.REACT_APP_IFC === "1"){
                  if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions: <button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"100px"}}>CANCEL VERIFY</button> }
                  }else{
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions:<UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user}/>}
                  }             
               }else{
                
                  if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions: <button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"100px"}}>CANCEL VERIFY</button> }
                  }else{
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions:<UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)}  currentUser = {this.state.user} />}
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
              for(let i = 0; i < json.rows.length; i++){
                if(process.env.REACT_APP_IFC === "1"){
                  if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions: <button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"100px"}}>CANCEL VERIFY</button> }
                  }else{
                    var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions:<UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)} currentUser = {this.state.user}/>}
                  }         
                }else{
                  
                    if(json.rows[i].verifydesign === 1 && json.rows[i].role === secureStorage.getItem("role")){
                      var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions: <button className="btn btn-warning" onClick={() => this.props.cancelVerifyClick(json.rows[i].filename)} style={{fontSize:"12px", padding:"2px 5px 2px 5px", width:"100px"}}>CANCEL VERIFY</button> }
                    }else{
                      var row = {key:i, id: json.rows[i].filename , date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, to: json.rows[i].to, actions:<UploadPopUp id = {json.rows[i].filename.split('.').slice(0, -1)} currentUser = {this.state.user}/>}
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
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
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
      ids.push(selectedRows[i].id)
    }
    this.setState({
      selectedRowsKeys: selectedRowKeys,
      selectedRows: selectedRows
    })
    this.props.onChange(ids);
    
  };


  render() {

    const update = this.state.updateData;
    const selectedRows = this.state.selectedRows;
    const selectedRowsKeys = this.state.selectedRowsKeys;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => (      
        {
        
        disabled: record.actions.type === 'button',
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
        width: '20%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id - b.id,
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => moment(a.date, 'DD/MM/YYYY') - moment(b.date, 'DD/MM/YYYY'),
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
          compare: (a, b) => a.actions - b.actions,
        },
      },
    ];

    if (this.state.data.length === 0){
      var totalElements = null;
    }else{
      var totalElements = (<div style={{position: "absolute", bottom: 25, left:0}}>
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