import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './onHoldTable.css'
import { Link } from 'react-router-dom';
import CommentPopUp from '../commentPopUp/commentPopUp';
import HoldsPopUp from '../holdsPopUp/holdsPopUp';

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
    
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/acronyms")
    .then(response => response.json())
    .then(json => {
      let dict = {}

      for(let i = 0; i < json.length; i++){
        dict[json[i].name] = json[i].code
      }
      this.setState({
        acronyms: dict
      })
    })

    if(process.env.REACT_APP_PROGRESS === "1"){
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
    
                        var row = {key:i,  id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , type: json.rows[i].code, revision: "*R" + json.rows[i].revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, user: <div style={{textAlign:"left", display:"flex"}}>{this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user}</div>, holds: <HoldsPopUp isoid={json.rows[i].isoid} holds = {holds} descriptions = {descriptions}/>}
                    
                        rows.push(row)                
                    }
                    
                    this.setState({data : rows, selectedRows: []});
    
                }
            )
            .catch(error => {
                console.log(error);
            })  
      }else{
        
        
        const body ={
          currentTab : this.props.currentTab
        }
        const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        }
          fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/files", options)
              .then(response => response.json())
              .then(json => {
                      var rows = []
                      for(let i = 0; i < json.rows.length; i++){
                          var row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , type: json.rows[i].code, revision: "*R" + json.rows[i].revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, user: <div style={{textAlign:"left", display:"flex"}}>{this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user} <CommentPopUp comments={json.rows[i].comments} filename={json.rows[i].filename} updated={json.rows[i].updated_at}/></div>}
                      
                          rows.push(row)                
                      }
                      
                      this.setState({data : rows, selectedRows: []});

                  }
          )
          .catch(error => {
              console.log(error);
          })
        }

    
  }

  componentDidUpdate(prevProps, prevState){

    if(prevProps !== this.props && process.env.REACT_APP_PROGRESS === "0"){
      const body ={
        currentTab : this.props.currentTab
      }
      const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
      fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/files", options)
          .then(response => response.json())
          .then(json => {
                  var rows = []
                  
                  for(let i = 0; i < json.rows.length; i++){
                      var row = {key:i, id: <Link onClick={() => this.getMaster(json.rows[i].filename)}>{json.rows[i].filename}</Link> , type: json.rows[i].code, revision: "*R" + json.rows[i].revision, date: json.rows[i].updated_at.toString().substring(0,10) + " "+ json.rows[i].updated_at.toString().substring(11,19), from: json.rows[i].from, user: <div style={{textAlign:"left", display:"flex"}}>{this.state.acronyms[json.rows[i].role] + " - " + json.rows[i].user} <CommentPopUp comments={json.rows[i].comments} filename={json.rows[i].filename} updated={json.rows[i].updated_at}/></div>}
                   
                      rows.push(row)                
                  }
                  this.setState({
                    data : rows,
                  });
              }
          )
          .catch(error => {
              console.log(error);
          })
      }

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
/*
    this.state.searchedColumn === "id" ? (
      record.id.props.children
        ? record.id.props.children.toString().toLowerCase().includes(value.toLowerCase())
        : ''
      ) : this.state.searchedColumn === "actions" ? (
        record.actions.props.children[1].props.children.toString().toLowerCase().includes(value.toLowerCase())
      ) : (
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : ''
      ),*/

      record[dataIndex].props 
          ? (record[dataIndex].props.children[1].props
            ? record.actions.props.children[1].props.children.toString().toLowerCase().includes(value.toLowerCase())
            : record[dataIndex].props.children.toString().toLowerCase().includes(value.toLowerCase())
            )
          : (record[dataIndex]
            ?  record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : ''),

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
    
    
    let columns = [
      {
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '23%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <div className="dataTable__header__text">Type</div>,
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        sorter: {
          compare: (a, b) => { return a.type.localeCompare(b.type)},
        },
      },
      {
        title: <center className="dataTable__header__text">Revision</center>,
        dataIndex: 'revision',
        key: 'revision',
        width: '8%',
        ...this.getColumnSearchProps('revision'),
        sorter:{
          compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
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
        title: <div className="dataTable__header__text">User</div>,
        dataIndex: 'user',
        key: 'user',
        ...this.getColumnSearchProps('user'),
        sorter: {
          compare: (a, b) => { return a.user.localeCompare(b.user)},
        },
      },
      {
        title: <div className="dataTable__header__text">Holds</div>,
        dataIndex: 'holds',
        key: 'holds',
      },
    ];

    

    if(process.env.REACT_APP_PROGRESS === "0"){
      columns = [
        {
          title: <center className="dataTable__header__text">ISO ID</center>,
          dataIndex: 'id',
          key: 'id',
          width: '23%',
          ...this.getColumnSearchProps('id'),
          sorter:{
            compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
          },
        },
        {
          title: <center className="dataTable__header__text">Revision</center>,
          dataIndex: 'revision',
          key: 'revision',
          width: '8%',
          ...this.getColumnSearchProps('revision'),
          sorter:{
            compare: (a, b) => a.id.props.children.localeCompare(b.id.props.children),
          },
        },
        {
          title: <div className="dataTable__header__text">Date</div>,
          dataIndex: 'date',
          key: 'date',
          width: '20%',
          ...this.getColumnSearchProps('date'),
          sorter: {
            compare: (a, b) => a.date.replace(/\D/g,'') - b.date.replace(/\D/g,''),
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
          title: <div className="dataTable__header__text">User</div>,
          dataIndex: 'user',
          key: 'user',
          ...this.getColumnSearchProps('user'),
          sorter: {
            compare: (a, b) => { return a.user.localeCompare(b.user)},
          },
        },
      ];
    }
    

    var totalElements = null
    if (this.state.data.length === 0){
      totalElements = null;
    }else{
      totalElements = (<div style={{position: "absolute", bottom: 25, left:0}}>
      <b>Total elements: {this.state.data.length}</b>
     </div>);
    }

    let table = null
    if(process.env.REACT_APP_PROGRESS === "1"){
      table = <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
    }else{
      table = <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
    }

    return (
      <div>
        {this.state.updateData}
        <div className="dataTable__container">
          {table}
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default OnHoldTable;