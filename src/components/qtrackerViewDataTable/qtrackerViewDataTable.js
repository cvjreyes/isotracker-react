import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import QtrackerNWCSpecPopUp from '../qtrackerNWCSpecPopUp/qtrackerNWCSpecPopUp';

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
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    steps: []
  };

  async accept(id){
    const body = {
      id: id,
      email: secureStorage.getItem("user")
    }
    const options = {
      method: "POst",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/acceptRequest", options)
    .then(response => response.json())
    .then(json =>{
      this.props.updateDataMethod()
    })
  }

  async reject(id){
    const body = {
      id: id,
      email: secureStorage.getItem("user")
    }
    const options = {
      method: "POst",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/rejectRequest", options)
    .then(response => response.json())
    .then(json =>{
      this.props.updateDataMethod()
    })
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
                row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at, specifications: <QtrackerNWCSpecPopUp incidence_number={json.rows[i].incidence_number} spref={json.rows[i].spref} description={json.rows[i].description}/>}
                if(json.rows[i].status === 0){
                    row.status = "PENDING"
                    row.color = "#www"
                }else if(json.rows[i].status === 1){
                    row.status = "IN PROGRESS"
                    row.color = "#yyy"
                }else if(json.rows[i].status === 2){
                    row.status = "READY"
                    row.color = "#ggg"
                }else{
                    row.status = "REJECTED"
                    row.color = "#rrr"
                }
                rows.push(row)
            }

            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/getNVN", options)
            .then(response => response.json())
            .then(async json => {
            var row = null
                for(let i = 0; i < json.rows.length; i++){
                    row = {incidence_number: json.rows[i].incidence_number, user: json.rows[i].user, created_at: json.rows[i].created_at, specifications: "A"}
                    if(json.rows[i].status === 0){
                        row.status = "PENDING"
                        row.color = "#www"
                    }else if(json.rows[i].status === 1){
                        row.status = "IN PROGRESS"
                        row.color = "#yyy"
                    }else if(json.rows[i].status === 2){
                        row.status = "READY"
                        row.color = "#ggg"
                    }else{
                        row.status = "REJECTED"
                        row.color = "#rrr"
                    }
                    rows.push(row)
                }
                
                await this.setState({data: rows})

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
    }

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
            compare: (a, b) => a.created_at - b.created_at,
        },
      },
      {
        title: <center className="dataTable__header__text">Specifications</center>,
        dataIndex: 'specifications',
        key: 'specifications',
        ...this.getColumnSearchProps('specifications'),
        width: "162px"
      },
      {
        title: <center className="dataTable__header__text">Status</center>,
        dataIndex: 'status',
        key: 'status',
        ...this.getColumnSearchProps('status'),
        sorter:{
          compare: (a, b) => a.status.localeCompare(b.status),
        },
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
    console.log(this.state.data)
    return (
      <div>
        {this.state.updateData}
        <div className="estimatedDataTable__container" style={{width:"auto"}}>
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} scroll={{y:437}} pagination={{disabled:true, defaultPageSize:5000}} size="small"
         rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default QTrackerViewDataTable;