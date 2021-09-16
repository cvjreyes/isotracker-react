import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './onHoldTable.css'
import { Link } from 'react-router-dom';
import CommentPopUp from '../commentPopUp/commentPopUp';

class OnHoldTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null
  };


  componentDidMount(){

    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
  }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/holds", options)
        .then(response => response.json())
        .then(json => {
                var rows = []
                for(let i = 0; i < json.rows.length; i++){
                    var holds = [json.rows[i].hold1, json.rows[i].hold2, json.rows[i].hold3, json.rows[i].hold4, json.rows[i].hold5, json.rows[i].hold6, json.rows[i].hold7, json.rows[i].hold8, json.rows[i].hold9, json.rows[i].hold10]
                    var descriptions = [json.rows[i].description1, json.rows[i].description2, json.rows[i].description3, json.rows[i].description4, json.rows[i].description5, json.rows[i].description6, json.rows[i].description7, json.rows[i].description8, json.rows[i].description9, json.rows[i].description10]

                    var row = {key:i, id: json.rows[i].isoid , holds: <CommentPopUp isoid={json.rows[i].isoid} holds = {holds} descriptions = {descriptions}/>}
                 
                    rows.push(row)                
                }
                
                this.setState({data : rows, selectedRows: []});

            }
        )
        .catch(error => {
            console.log(error);
        })  
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
          ...this.getColumnSearchProps('id'),
          sorter:{
            compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
          },
        },
        {
          title: <center className="dataTable__header__text">HOLDS</center>,
          dataIndex: 'holds',
          key: 'holds',
          ...this.getColumnSearchProps('holds'),

        },
        
      ];
    

    var totalElements = null
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
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ defaultCurrent:1, total: this.state.data.length }} size="small"/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default OnHoldTable;