import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


class ModelledDataTable extends React.Component{
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

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/modelled", options)
      .then(response => response.json())
      .then(json => {
        var rows = []
        var row = null
        for(let i = 0; i < json.rows.length; i++){
            row = {key:i, id: json.rows[i].isoid, tag: json.rows[i].tag, type: json.rows[i].code.toString()}
            if(row){
              if(i % 2 === 0){
                row["color"] = "#fff"
              }else{
                row["color"] = "#eee"
              }
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

    const columns = [
      {
        title: <center className="dataTable__header__text">TAG</center>,
        dataIndex: 'tag',
        key: 'tag',
        width: '40%',
        ...this.getColumnSearchProps('tag'),
        sorter:{
          compare: (a, b) => a.tag.localeCompare(b.tag),
        },
      },
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '40%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.localeCompare(b.id),
        },
      },
      {
        title: <div className="dataTable__header__text">Type</div>,
        dataIndex: 'type',
        key: 'type',
        width: '20%',
        ...this.getColumnSearchProps('type'),
        sorter: {
          compare: (a, b) => a.type.localeCompare(b.type),
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
        <div className="dataTable__container" style={{float:"top", position:"relative"}}>
        <Table className="customTable" bordered = {true}  columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default ModelledDataTable;