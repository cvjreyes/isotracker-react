import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import * as FileSaver from "file-saver";

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

class NavisTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
  };

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/navis", options)
    .then(response => response.json())
    .then(json => {
        let rows = []
        for(let i = 0; i < json.rows.length; i++){
            if(i % 2 === 0){
                rows.push({key:i, object: json.rows[i].object, attribute: json.rows[i].value, color:"#fff"})
              }else{
                rows.push({key:i, object: json.rows[i].object, attribute: json.rows[i].value, color:"#eee"})              }
            
        }
        this.setState({data : rows});
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

    this.setState({
      selectedRowsKeys: selectedRowKeys,
      selectedRows: selectedRows
    })
    //this.setState({ selectedRows: selectedRows });
    //this.props.onChange(ids);
    
  };

  generateXML(){
    console.log(this.state.selectedRows)
    let xml = "<?xml version='1.0' encoding='UTF-8' ?>\n    <exchange xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xsi:noNamespaceSchemaLocation='http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd'>\n      <optionset name=''>\n           <optionset name='interface'>\n              <optionset name='smart_tags'>\n                     <option name='enabled'>\n                           <data type='bool'>true</data>\n                     </option>\n                     <option name='hide_category' flags='32'>\n                           <data type='bool'>false</data>\n                     </option>\n                     <optionarray name='definitions'>\n"
    
    for(let i = 0; i < this.state.selectedRows.length; i++){
        let option = this.state.selectedRows[i].attribute.toLowerCase()
        xml+= "                                 <optionset name=''>\n                                       <option name='category'>\n                                          <data type='name'>\n                                              <name internal='lcldrvm_props'>PDMS</name>\n                                          </data>\n                                       </option>\n                                       <option name='property'>\n                                          <data type='name'>\n                                              <name internal='lcldrvm_prop "+option+"'>"+option.toUpperCase()+"</name>\n                                          </data>\n                                       </option>\n                                </optionset>\n"
    }
    xml+="                  </optionarray>\n               </optionset>\n         </optionset>\n      </optionset>\n  </exchange>"
    const data = new Blob([xml], { type: 'txt' });
    FileSaver.saveAs(data, "navis.xml");
}
  

  render() {
    
    const selectedRows = this.state.selectedRows;
    const selectedRowsKeys = this.state.selectedRowsKeys;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => (      
        {
        
        // Column configuration not to be checked
        name: record.name,
      }),
    };


    const columns = [
      {
        title: <center className="dataTable__header__text">Object 3D</center>,
        dataIndex: 'object',
        key: 'object',
        width: '15%',
        ...this.getColumnSearchProps('object'),
        sorter:{
          compare: (a, b) => a.object.localeCompare(b.object),
        },
      },
      {
        title: <center className="dataTable__header__text">Attribute</center>,
        dataIndex: 'attribute',
        key: 'attribute',
        ...this.getColumnSearchProps('attribute'),
        sorter:{
          compare: (a, b) => a.attribute.localeCompare(b.attribute),
        },
      },
      
    ];
    

    return (
      <div>
        <button className="btn btn-warning" style={{width:"100%", fontSize:"24px", top:"2%",left:"0",zIndex:"999", backgroundColor:"#CCCC00", position:"fixed"}} onClick={()=> this.generateXML()}>Generate XML</button>

        {this.state.updateData}

        <div className="estimatedDataTable__container">
        <Table className="customTable" bordered = {true} columns={columns} rowSelection={{type: 'checkbox', ...rowSelection}} dataSource={this.state.data} pagination={{ pageSize: this.state.data.length  }} size="small"
         rowClassName= {(record) => record.color.replace('#', '')}/>
        </div>
        
      </div>
    );
  }
}

export default NavisTable;