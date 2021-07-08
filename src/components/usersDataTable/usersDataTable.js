import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './usersDataTable.css'
import { Link } from 'react-router-dom';
import ManageRolesPopUp from '../manageRolesPopUp/manageRolesPopUp';
import DeleteUserConfPopUp from '../deleteUserConfPopUp/deleteUserConfPopUp';


class UsersDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    weights: [],
    role: this.props.role,
    selectedRows: [],
    selectedRowsKeys: [],
    dataAux : [],
    update: this.props.updateData,
    users: [],
    mounted: false
  };

  deleteUser(id){
    this.props.deleteUser(id)
  }
  
  

  async componentDidMount(){
    console.log("mount")
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      },

  }


    const rolesBtnsDict = {"Design": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#00FF7F"}}>DES</button>, 
    "DesignLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"lightgreen"}}>LDE</button>, 
    "Stress": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#00BFFF"}}>STR</button>, 
    "StressLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#87CEEB"}}>LST</button>, 
    "Supports": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#1E90FF"}}>SUP</button>, 
    "SupportsLead": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#6495ED"}}>LSP</button>, 
    "Materials": <button className="btn"  disabled style={{color:"white", fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#6A5ACD"}}>MAT</button>, 
    "Issuer": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FFC0CB"}}>ISS</button>, 
    "SpecialityLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"	#FFA500"}}>LOS</button>, 
    "Process": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FF4500"}}>PRO</button>, 
    "Instrument": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FFD700"}}>INS</button>, 
    "Review": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"white"}}>REV</button>}
    

    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/users", options)
        .then(response => response.json())
        .then(async json => {
          let rows = []
          for(let i = 0; i < json.length; i++){
              let row = {user_id: json[i].id, username: json[i].name, email: json[i].email, roles: null, actions: null}
              
              let users = this.state.users
              users.push(json[i].email)
              this.setState({
                users: users
              })
              const body = {
                  user: json[i].email,
                  id: json[i].id
              }
              const options = {
                  method: "POST",
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify(body)
              }

              await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/user", options)
                  .then(response => response.json())
                  .then(async json => {
                      row["actions"] = <div style={{display:"flex"}}><DeleteUserConfPopUp  deleteUser={this.deleteUser.bind(this)} id={row.user_id} username={row.username}/><ManageRolesPopUp roles={json.roles} id={row.user_id} email={json.email} submitRoles={this.submitRoles.bind(this)}/></div>                  
                      let roles = [rolesBtnsDict[json.roles[0]]]
                          for(let j = 1; j < json.roles.length; j++){
                              roles.push(rolesBtnsDict[json.roles[j]])
                          }

                      row["roles"] = <div> {roles} </div>
                      if(i % 2 === 0){
                          row["color"] = "#fff"
                      }else{
                          row["color"] = "#eee"
                      }
                      
                      let currentData = this.state.dataAux
                      currentData.push(row)
                      await this.setState({dataAux: currentData})
                  })
              
          }
      })
      await this.setState({data: this.state.dataAux})
      await this.setState({mounted: true})
}
  


  async componentDidUpdate(prevProps, prevState){

    if(prevProps.updateData === false && this.props.updateData === true || prevProps.updateData === true && this.props.updateData === false && this.state.mounted === true){
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
    
        }
    
          const rolesBtnsDict = {"Design": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#00FF7F"}}>DES</button>, 
          "DesignLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"lightgreen"}}>LDE</button>, 
          "Stress": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#00BFFF"}}>STR</button>, 
          "StressLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#87CEEB"}}>LST</button>, 
          "Supports": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#1E90FF"}}>SUP</button>, 
          "SupportsLead": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#6495ED"}}>LSP</button>, 
          "Materials": <button className="btn"  disabled style={{color:"white", fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#6A5ACD"}}>MAT</button>, 
          "Issuer": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FFC0CB"}}>ISS</button>, 
          "SpecialityLead": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"	#FFA500"}}>LOS</button>, 
          "Process": <button className="btn"  disabled style={{color: "white",fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FF4500"}}>PRO</button>, 
          "Instrument": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"#FFD700"}}>INS</button>, 
          "Review": <button className="btn"  disabled style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginRight: "5px", backgroundColor:"white"}}>REV</button>}
          
          await this.setState({dataAux: []})

          await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/users", options)
              .then(response => response.json())
              .then(async json => {
                const dataLength = json.length
                console.log("Hay ", dataLength)
                let rows = []
                for(let i = 0; i < json.length; i++){
                    
                    let row = {user_id: json[i].id, username: json[i].name, email: json[i].email, roles: null, actions: null}
                    
                    const body = {
                        user: json[i].email,
                        id: json[i].id
                    }
                    const options = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(body)
                    }
    
                    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/roles/user", options)
                        .then(response => response.json())
                        .then(async json => {

                          row["actions"] = <div style={{display:"flex"}}><DeleteUserConfPopUp  deleteUser={this.deleteUser.bind(this)} id={row.user_id} username={row.username}/><ManageRolesPopUp roles={json.roles} id={row.user_id} email={json.email} submitRoles={this.submitRoles.bind(this)}/></div>                  
                          let roles = [rolesBtnsDict[json.roles[0]]]
                            for(let j = 1; j < json.roles.length; j++){
                                roles.push(rolesBtnsDict[json.roles[j]])
                            }
    
                            row["roles"] = <div> {roles} </div>
                            if(i % 2 === 0){
                                row["color"] = "#fff"
                            }else{
                                row["color"] = "#eee"
                            }

                              
                            let currentData = this.state.dataAux
                              
                              await currentData.push(row)
                              await this.setState({dataAux: currentData})
                            
                            
                            
                                                   
                        })
                    
                }
            })
            await this.setState({data: this.state.dataAux})
    }
  }

  submitRoles(id, roles){
    this.props.submitRoles(id, roles)
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
      this.state.searchedColumn === "id" ? (
        record.id.props.children
          ? record.id.props.children.toString().toLowerCase().includes(value.toLowerCase())
          : ''
        ) : (
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : ''
        ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
    text != null ? (
    text.props && text.type !== "div" ? (
      <Link onClick={() => this.getMaster(text.props.children)}>{text.props.children}</Link>
    ) : this.state.searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text ? text : ''}
      />
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
            title: <div className="dataTable__header__text">Username</div>,
            dataIndex: 'username',
            key: 'username',
            width: '20%',
            ...this.getColumnSearchProps('username'),
            sorter: {
                compare: (a, b) => { return a.username.localeCompare(b.username)},
            },
        },
          
      {
        title: <center className="dataTable__header__text">Email</center>,
        dataIndex: 'email',
        key: 'email',
        width: '30%',
        ...this.getColumnSearchProps('email'),
        sorter:{
          compare: (a, b) => a.email.localeCompare(b.email),
        },
      },
      {
        title: <div className="dataTable__header__text">Roles</div>,
        dataIndex: 'roles',
        key: 'roles',
        ...this.getColumnSearchProps('roles'),
        sorter: {
          compare: (a, b) => { return a.roles.localeCompare(b.roles)},
        },
      },
      {
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        width: '250px',
        ...this.getColumnSearchProps('actions'),
      }
    ];

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

export default UsersDataTable;