import React from 'react';
import 'antd/dist/antd.css';
import { Table } from 'antd';
import UploadPopUp from '../uploadPopUp/uploadPopUp';
import { Link } from 'react-router-dom';
import UploadProcInst from '../uploadProcInst/uploadProcInst';
import CommentPopUp from '../commentPopUp/commentPopUp';
import RevisionPopUp from '../revisionPopUp/revisionPopUp';
import ByPassPopUp from '../byPassPopUp/byPassPopUp';


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

class ByPassDataTable extends React.Component{
    state = {
      searchText: '',
      searchedColumn: '',
      data: [],
      displayData: [],
      filterData: ["", "", "", "", "", ""],
      role: secureStorage.getItem("role"),
      user: secureStorage.getItem("user"),
      tab: this.props.currentTab,
      selectedRows: [],
      selectedRowsKeys: [],
      updateData: this.props.updateData,
      popup: false,
      filters: []
    };

  updateData() {
    this.setState({data : []})
    this.props.updateD()
  }

  success(){
    //this.props.successAlert()
  }


  componentDidMount(){

   
  }
  

  componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){
      
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
          if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[0].type.name === "UploadPopUp"){
            let upload = "upload"
            if(!upload.includes(this.state.filterData[column].toLocaleLowerCase())){
              exists = false
            }
          }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props.children[0].type === "button"){
            let cv = "cancel verify"
            if(!cv.includes(this.state.filterData[column].toLocaleLowerCase())){
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
        
        disabled: record.actions.props.children[0].props.children === 'CANCEL VERIFY' || record.actions.props.children[10],
        // Column configuration not to be checked
        name: record.name,
      })
      ) : (
        {
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
        title: <center className="dataTable__header__text">TAG</center>,
        dataIndex: 'tag',
        key: 'tag',
        width: '23%',
        ...this.getColumnSearchProps('tag'),
        sorter:{
          compare: (a, b) => a.tag.localeCompare(b.tag),
        },
      },
      {
        title: <div className="dataTable__header__text">Iso ID</div>,
        dataIndex: 'isoid',
        key: 'isoid',
        ...this.getColumnSearchProps('isoid'),
        sorter: {
          compare: (a, b) => { return a.isoid.localeCompare(b.isoid)},
        },
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'type',
        key: 'type',
        width: '8%',
        ...this.getColumnSearchProps('type'),
        sorter:{
          compare: (a, b) => a.type.localeCompare(b.type),
        },
      },
      {
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
        width: '20%',
        ...this.getColumnSearchProps('user'),
        sorter: {
          compare: (a, b) =>  a.user.localeCompare(b.user),
        },
      },
      {
        title: <div className="dataTable__header__text">Notes</div>,
        dataIndex: 'notes',
        key: 'notes',
      },
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
      },
      {
        title: <div className="dataTable__header__text">Status</div>,
        dataIndex: 'status',
        key: 'status',
        width:'20%',
        ...this.getColumnSearchProps('status'),
        sorter: {
          compare: (a, b) => a.status.type - b.status.type,
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
        <Table className="customTable" style={{ height: '540px' }} bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.displayData} scroll={{y:437}} pagination={{disabled:true, defaultPageSize:5000}} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
        <Table className="filter__table" pagination={{disabled:true}} rowSelection={{type: 'checkbox', ...rowSelectionFilter}} scroll={{y:437}} showHeader = {false} bordered = {true} columns={columns} dataSource={this.state.filters} size="small"/>
          {totalElements}
        </div>
      </div>
    );
  }
}

export default ByPassDataTable;