import React from 'react';
import './csptrackerRequestsDataTable.css'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class CSPTrackerdRequestsDataTable extends React.Component{
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

  async markAsRead(sptag){

  }

  async accept(sptag){
  
  }

  async reject(sptag){

  }

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }


    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptrackerRequests", options)
            .then(response => response.json())
            .then(async json => {
                var rows = []
                var row = null
                for(let i = 0; i < json.rows.length; i++){
                    row = {key:i, tag: json.rows[i].tag, pid: json.rows[i].pid, sptag: json.rows[i].sptag}
                    if(json.rows[i].read === 0){
                        row.actions = <div className="request__buttons__container">
                            <button className="read__button" onClick={()=>this.markAsRead(json.rows[i].sptag)}>Mark as read</button>
                            <button className="accept__button" onClick={()=>this.accept(json.rows[i].sptag)}>Accept</button>
                            <button className="reject__button" onClick={()=>this.reject(json.rows[i].sptag)}>Reject</button>
                        </div>
                    }else{
                        row.actions = <div className="request__buttons__container">
                            <button className="accept__button" onClick={()=>this.accept(json.rows[i].sptag)}>Accept</button>
                            <button className="reject__button" onClick={()=>this.reject(json.rows[i].sptag)}>Reject</button>
                        </div>
                    }
                    if(i % 2 === 0){
                        row["color"] = "#fff"
                    }else{
                        row["color"] = "#eee"
                    }
                    rows.push(row)
                }
                await this.setState({data: rows})
            })
            .catch(error => {
                console.log(error);
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

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptrackerRequests", options)
            .then(response => response.json())
            .then(async json => {
                var rows = []
                var row = null
                for(let i = 0; i < json.rows.length; i++){
                    row = {key:i, tag: json.rows[i].tag, pid: json.rows[i].pid, sptag: json.rows[i].sptag}
                    if(json.rows[i].read === 1){
                        row.actions = <div className="request__buttons__container">
                            <button className="read__button" onClick={()=>this.markAsRead(json.rows[i].sptag)}>Mark as read</button>
                            <button className="accept__button" onClick={()=>this.accept(json.rows[i].sptag)}>Accept</button>
                            <button className="reject__button" onClick={()=>this.reject(json.rows[i].sptag)}>Reject</button>
                        </div>
                    }else{
                        row.actions = <div className="request__buttons__container">
                            <button className="accept__button" onClick={()=>this.accept(json.rows[i].sptag)}>Accept</button>
                            <button className="reject__button" onClick={()=>this.reject(json.rows[i].sptag)}>Reject</button>
                        </div>
                    }

                  
                    if(i % 2 === 0){
                        row["color"] = "#fff"
                    }else{
                        row["color"] = "#eee"
                    }
                    
                    rows.push(row)
                }
                await this.setState({data: rows})
            })
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
        ...this.getColumnSearchProps('tag'),
        sorter:{
          compare: (a, b) => a.tag.localeCompare(b.tag),
        },
      },
      {
        title: <center className="dataTable__header__text">P&ID</center>,
        dataIndex: 'pid',
        key: 'pid',
        ...this.getColumnSearchProps('pid'),
        sorter:{
          compare: (a, b) => a.pid.localeCompare(b.pid),
        },
      },
      {
        title: <div className="dataTable__header__text">SP TAG</div>,
        dataIndex: 'sptag',
        key: 'sptag',
        ...this.getColumnSearchProps('sptag'),
        sorter: {
            compare: (a, b) => a.sptag - b.sptag,
        },
      },
      {
        title: <center className="dataTable__header__text">ACTIONS</center>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
        sorter:{
          compare: (a, b) => a.actions.localeCompare(b.actions),
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

    return (
      <div>
        {this.state.updateData}
        <div className="estimatedDataTable__container">
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"
         rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default CSPTrackerdRequestsDataTable;