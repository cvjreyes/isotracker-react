import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './statusDataTable.css'
import { Link } from 'react-router-dom';


class StatusDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    weights: [],
    role: this.props.role,
    selectedRows: [],
    selectedRowsKeys: []
  };
  

  async componentDidMount(){

    if(process.env.REACT_APP_PROGRESS === "1"){
      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
      }
      await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaxProgress", options)
      .then(response => response.json())
      .then(json =>{
        this.setState({
          weights: [json.weights[0].weight,json.weights[1].weight,json.weights[2].weight]
        })
      })

      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/statusFiles", options)
          .then(response => response.json())
          .then(json => {
            console.log(this.state.weights)
              var rows = []
              var row = null;
              
              for(let i = 0; i < json.rows.length; i++){
                var condition = ""
                if(json.rows[i].issued === null){
                  condition = "ON GOING R" + String(json.rows[i].revision) + "*"
                }else{
                  condition = "ISSUED R" + String(json.rows[i].revision - 1)
                }
                if(json.rows[i].deleted === 1){
                  condition = "DELETED"
                }
                if(json.rows[i].onhold === 1){
                  condition = "ON HOLD"
                }
                if(json.rows[i].tpipes_id){
                  row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, condition: condition, MAXWeight: this.state.weights[json.rows[i].tpipes_id - 1],realProgress: (json.rows[i].realprogress / this.state.weights[json.rows[i].tpipes_id - 1] * 100).toFixed(2) + "% (" + json.rows[i].realprogress + ")" , progress: (json.rows[i].progress / this.state.weights[json.rows[i].tpipes_id - 1] * 100).toFixed(2) + "% (" + json.rows[i].progress + ")"}
                }else{
                  row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>}
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
                          
              this.setState({data : rows, role: this.props.role});
              }
          )
          .catch(error => {
              console.log(error);
          })
    }else{
      const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },

      }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/statusFiles", options)
          .then(response => response.json())
          .then(json => {
            console.log(this.state.weights)
              var rows = []
              var row = null;
              for(let i = 0; i < json.rows.length; i++){
                var condition = ""
                if(json.rows[i].issued === null){
                  condition = "ON GOING R" + String(json.rows[i].revision) + "*"
                }else{
                  condition = "ISSUED R" + String(json.rows[i].revision - 1)
                }
                if(json.rows[i].deleted === 1){
                  condition = "DELETED"
                }
                if(json.rows[i].onhold === 1){
                  condition = "ON HOLD"
                }
                row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, condition: condition}                    
                if(row){
                  if(i % 2 === 0){
                    row["color"] = "#fff"
                  }else{
                    row["color"] = "#eee"
                  }
                   
                  rows.push(row)
                }
              }
                          
              this.setState({data : rows, role: this.props.role});
              
              }
          )
          .catch(error => {
              console.log(error);
          })
    }
    
  }

  async componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props){

      if(process.env.REACT_APP_PROGRESS === "1"){
        const options = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
        }
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaxProgress", options)
        .then(response => response.json())
        .then(json =>{
          this.setState({
            weights: [json.weights[0].weight,json.weights[1].weight,json.weights[2].weight]
          })
        })
  
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/statusFiles", options)
            .then(response => response.json())
            .then(json => {
              console.log(this.state.weights)
                var rows = []
                var row = null;
                
                for(let i = 0; i < json.rows.length; i++){
                  var condition = ""
                  if(json.rows[i].issued === null){
                    condition = "ON GOING R" + String(json.rows[i].revision) + "*"
                  }else{
                    condition = "ISSUED R" + String(json.rows[i].revision - 1)
                  }
                  if(json.rows[i].deleted === 1){
                    condition = "DELETED"
                  }
                  if(json.rows[i].onhold === 1){
                    condition = "ON HOLD"
                  }
                  if(json.rows[i].tpipes_id){
                    row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, condition: condition, MAXWeight: this.state.weights[json.rows[i].tpipes_id - 1],realProgress: (json.rows[i].realprogress / this.state.weights[json.rows[i].tpipes_id - 1] * 100).toFixed(2) + "% (" + json.rows[i].realprogress + ")" , progress: (json.rows[i].progress / this.state.weights[json.rows[i].tpipes_id - 1] * 100).toFixed(2) + "% (" + json.rows[i].progress + ")"}
                  }else{
                    row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>}
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
                            
                this.setState({data : rows, role: this.props.role});
  
                }
            )
            .catch(error => {
                console.log(error);
            })
      }else{
        const options = {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
  
        }
        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/statusFiles", options)
            .then(response => response.json())
            .then(json => {
              console.log(this.state.weights)
                var rows = []
                var row = null;
                for(let i = 0; i < json.rows.length; i++){
                  var condition = ""
                  if(json.rows[i].issued === null){
                    condition = "ON GOING R" + String(json.rows[i].revision) + "*"
                  }else{
                    condition = "ISSUED R" + String(json.rows[i].revision - 1)
                  }
                  if(json.rows[i].deleted === 1){
                    condition = "DELETED"
                  }
                  if(json.rows[i].onhold === 1){
                    condition = "ON HOLD"
                  }
                  row = {key:i, status: json.rows[i].to, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link>, condition: condition}                    
                  if(row){
                    if(i % 2 === 0){
                      row["color"] = "#fff"
                    }else{
                      row["color"] = "#eee"
                    }
                     
                    rows.push(row)
                  }
                }
                            
                this.setState({data : rows, role: this.props.role});
                
                }
            )
            .catch(error => {
                console.log(error);
            })
      }
    }
  }

  getMaster(fileName){

    console.log(fileName)

    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/pdf"
      }
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getMaster/"+fileName, options)
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
            /*
      this.state.searchedColumn === "id" ? (
        console.log(record[dataIndex], value),
        record[dataIndex]
          ? record.id.props.children.toString().toLowerCase().includes(value.toLowerCase())
          : ''
        ) : (
          console.log(record[dataIndex], value),
          record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
        ),*/
        record[dataIndex].props 
          ? record[dataIndex].props.children.toString().toLowerCase().includes(value.toLowerCase())
          : (record[dataIndex]
            ?  record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : ''),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render:  text => 
    text != null ? (
    text.props && text.type !== "div" ? (
      <Link onClick={() => this.getMaster(text.props.children)}>{text.props.children}</Link>
    ) : this.state.searchedColumn === dataIndex ? (
      text
    ) : (
      text
    )
    ) : (
      text
    )
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
    this.props.onChange(ids);
  };


  render() {

    console.log(this.state.searchedColumn)
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.onSelectChange(selectedRowKeys, selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        // Column configuration not to be checked
        name: record.name,
      }),
    };

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
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
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
      }
    ];
    if(process.env.REACT_APP_PROGRESS === "1"){
      columns.push({
        title: <div className="dataTable__header__text">MAX Weight</div>,
        dataIndex: 'MAXWeight',
        key: 'MAXWeight',
        ...this.getColumnSearchProps('MAXWeight'),
        sorter: {
            compare: (a, b) => a.MAXWeight - b.MAXWeight,
        },
      })
      columns.push({
        title: <div className="dataTable__header__text">Progress</div>,
        dataIndex: 'progress',
        key: 'progress',
        ...this.getColumnSearchProps('progress'),
        sorter: {
          compare: (a, b) => a.progress - b.progress,
        },
      })
      if(this.state.role === "SpecialityLead"){
        columns.push({
          title: <div className="dataTable__header__text">Real Progress</div>,
          dataIndex: 'realProgress',
          key: 'realProgress',
          ...this.getColumnSearchProps('realProgress'),
          sorter: {
              compare: (a, b) => a.realProgress - b.realProgress,
          },
        })
      }
    } 

    return (
      <div>
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
          <div style={{position: "absolute", bottom:25, left:0}}>
            <b>Total elements: {this.state.data.length}</b>
          </div>
        </div>
        
      </div>
    );
  }
}

export default StatusDataTable;