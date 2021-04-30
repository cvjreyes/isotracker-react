import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './statusDataTable.css'
import { Link } from 'react-router-dom';

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

class StatusDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: []
  };
  

  componentDidMount(){

    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },
    }
    fetch("http://localhost:5000/api/statusFiles", options)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            var rows = []
            var row = null;
            for(let i = 0; i < json.rows.length; i++){
                row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>}
                      
              rows.push(row)
            }
                         
            this.setState({data : rows});

            }
        )
        .catch(error => {
            console.log(error);
        })
  }

  getMaster(fileName){

    console.log(fileName)

    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/pdf"
      }
    }
    fetch("http://localhost:5000/getMaster/"+fileName, options)
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
    const columns = [
        {
            title: <div className="dataTable__header__text">Status</div>,
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            ...this.getColumnSearchProps('status'),
            sorter: {
                compare: (a, b) => { return a.status.localeCompare(b.status)},
            },
        },
          
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '20%',
        ...this.getColumnSearchProps('id'),
        sorter:{
            compare: (a, b) => { return a.id.localeCompare(b.id)},
        },
      },
      {
        title: <div className="dataTable__header__text">Condition</div>,
        dataIndex: 'condition',
        key: 'condition',
        ...this.getColumnSearchProps('condition'),
        sorter: {
          compare: (a, b) => { return a.condition.localeCompare(b.condition)},
        },
      },
      {
        title: <div className="dataTable__header__text">Progress MAX</div>,
        dataIndex: 'progressMax',
        key: 'progressMax',
        ...this.getColumnSearchProps('progressMax'),
        sorter: {
            compare: (a, b) => a.progressMax - b.progressMax,
        },
      },
      {
        title: <div className="dataTable__header__text">Real Progress</div>,
        dataIndex: 'realProgress',
        key: 'realProgress',
        ...this.getColumnSearchProps('realProgress'),
        sorter: {
            compare: (a, b) => a.realProgress - b.realProgress,
        },
      },
      {
        title: <div className="dataTable__header__text">Progress</div>,
        dataIndex: 'progress',
        key: 'progress',
        ...this.getColumnSearchProps('progress'),
        sorter: {
          compare: (a, b) => a.progress - b.progress,
        },
      },
    ];

    return (
      <div>
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
          <div style={{position: "absolute", bottom:25, left:0}}>
            <b>Total elements: {this.state.data.length}</b>
          </div>
        </div>
        
      </div>
    );
  }
}

export default StatusDataTable;