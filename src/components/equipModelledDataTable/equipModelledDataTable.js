import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


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

class EquipModelledDataTable extends React.Component{
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

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/equipments/modelled", options)
      .then(response => response.json())
      .then(json => {
        var rows = []
        var row = null
        
        for(let i = 0; i < json.rows.length; i++){
            let mod = 0
            if(json.rows[i].modelled){
              mod = json.rows[i].modelled
            }
            if(i % 2 === 0){
              row = {key:i, area: json.rows[i].area, tag: json.rows[i].tag, type: json.rows[i].type, weight: json.rows[i].weight, status: json.rows[i].status, progress: json.rows[i].progress, color: "#fff"}
            }else{
              row = {key:i, area: json.rows[i].area, tag: json.rows[i].tag, type: json.rows[i].type, weight: json.rows[i].weight, status: json.rows[i].status, progress: json.rows[i].progress, color: "#eee"}
            }
            
            for(let j = 0; j < this.state.steps.length; j++){
              let currentStep = this.state.steps[j].toString()
              row[currentStep] = json.rows[i][currentStep]
            }
            rows.push(row)
        }
        this.setState({data : rows, selectedRows: []});

    }) 
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


      
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
          


    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text => 
      
      text
    
      
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

    const steps = this.state.steps

    const columns = [
      {
        title: <center className="dataTable__header__text">Area</center>,
        dataIndex: 'area',
        key: 'area',
        width: '5%',
        ...this.getColumnSearchProps('area'),
        sorter:{
          compare: (a, b) => a.area.localeCompare(b.area),
        },
      },
      {
        title: <center className="dataTable__header__text">Tag</center>,
        dataIndex: 'tag',
        key: 'tag',
        width: '5%',
        ...this.getColumnSearchProps('tag'),
        sorter:{
          compare: (a, b) => a.tag.localeCompare(b.tag),
        },
      },
      {
        title: <center className="dataTable__header__text">Type</center>,
        dataIndex: 'type',
        key: 'type',
        width: '10%',
        ...this.getColumnSearchProps('type'),
        sorter:{
          compare: (a, b) => a.type.localeCompare(b.type),
        },
      },
      {
        title: <div className="dataTable__header__text">Weight</div>,
        dataIndex: 'weight',
        key: 'weight',
        width: '5%',
        ...this.getColumnSearchProps('weight'),
        sorter: {
          compare: (a, b) => a.weight-b.weight,
        },
      },
      {
        title: <center className="dataTable__header__text">Status</center>,
        dataIndex: 'status',
        key: 'status',
        width: '15%',
        ...this.getColumnSearchProps('status'),
        sorter:{
          compare: (a, b) => a.status.localeCompare(b.status),
        },
      },
      {
        title: <center className="dataTable__header__text">Progress</center>,
        dataIndex: 'progress',
        key: 'progress',
        width: '5%',
        ...this.getColumnSearchProps('progress'),
        sorter:{
          compare: (a, b) => a.progress.localeCompare(b.progress),
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
        <div className="estimatedDataTable__container">
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination }} size="small"
         rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default EquipModelledDataTable;