import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import HoldsPopUp from '../holdsPopUp/holdsPopUp';

class IsoControlFullDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    displayData: [],
    filterData: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    role: this.props.currentRole,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    filters: []
  };

  unlock(filename){
    this.props.unlock(filename)
  }

  rename(newName, oldName){
    this.props.rename(newName, oldName)
  }

  componentDidMount(){
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getIsocontrolFull", options)
    .then(response => response.json())
    .then(json =>{
        let rows = []
        for(let i = 0; i < json.rows.length; i++){

            json.rows[i].line_id = json.rows[i].unit + json.rows[i].line
            json.rows[i].iso_id = json.rows[i].unit + json.rows[i].area + json.rows[i].line + json.rows[i].train
            
            if(json.rows[i].LDL === "In LDL" && json.rows[i].BOM === "Not in BOM"){
                json.rows[i].line_id = json.rows[i].LDL_unit + json.rows[i].fluid + json.rows[i].seq
                json.rows[i].iso_id = " "

                json.rows[i].unit = json.rows[i].LDL_unit
                json.rows[i].line = json.rows[i].fluid + json.rows[i].seq
                json.rows[i].spec_code = json.rows[i].spec_code_ldl
            }else{
                json.rows[i].LDL_unit = json.rows[i].unit
                json.rows[i].line_id = json.rows[i].unit + json.rows[i].line
                json.rows[i].iso_id = json.rows[i].unit + json.rows[i].area + json.rows[i].line + json.rows[i].train

            }

            if(json.rows[i].diameter === null){
                json.rows[i].modelled = "Not modelled"
            }else{
                json.rows[i].modelled = "Modelled"
                json.rows[i].BOM = "In BOM"
                json.rows[i].LDL = "In LDL"
            }

            if(!json.rows[i].spec_code){
              json.rows[i].spec_code = ""
            }

            if(!json.rows[i].BOM){
                json.rows[i].BOM = ""
            }

            if(!json.rows[i].LDL){
                json.rows[i].LDL = ""
            }

            if(!json.rows[i].calc_notes){
                json.rows[i].calc_notes = ""
            }

            if(!json.rows[i].to){
                json.rows[i].to = ""
            }

            if(!json.rows[i].progress){
                json.rows[i].progress = ""
            }

            if(!json.rows[i].area){
              json.rows[i].area = ""
            }

            if(!json.rows[i].train){
              json.rows[i].train = ""
            }

            if(!json.rows[i].fluid){
              json.rows[i].fluid = ""
            }

            if(!json.rows[i].seq){
              json.rows[i].seq = ""
            }

            if(!json.rows[i].stress_level){
              json.rows[i].stress_level = ""
            }

            if(!json.rows[i].insulation){
              json.rows[i].insulation = ""
            }
            
            if(!json.rows[i].total_weight){
              json.rows[i].total_weight = ""
            }

            if(!json.rows[i].to){
              json.rows[i].to = "Not in ISOTRACKER"
              json.rows[i].progress = "Not in ISOTRACKER"
            }

            if(json.rows[i].hold1){
              let holds = [json.rows[i].hold1, json.rows[i].hold2, json.rows[i].hold3, json.rows[i].hold4, json.rows[i].hold5, json.rows[i].hold6, json.rows[i].hold7, json.rows[i].hold8, json.rows[i].hold9, json.rows[i].hold10]
              let descriptions = [json.rows[i].description1, json.rows[i].description2, json.rows[i].description3, json.rows[i].description4, json.rows[i].description5, json.rows[i].description6, json.rows[i].description7, json.rows[i].description8, json.rows[i].description9, json.rows[i].description10]
              json.rows[i].holds = <HoldsPopUp isoid={json.rows[i].iso_id} holds = {holds} descriptions = {descriptions}/>
            }else{
              json.rows[i].holds = null
            }

            if(i % 2 === 0){
                json.rows[i].color = "#fff"
            }else{
                json.rows[i].color = "#eee"
            }
            json.rows[i].line_id = <b>{json.rows[i].line_id}</b>
            rows.push(json.rows[i])
            console.log(json.rows[i].length)
        }
        this.setState({data: rows, displayData: rows})
    })

    
        
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
        if(fil === "holds"){
          if(auxDisplayData[i][fil]){
            let h = "HOLDS"
            console.log(h.includes(this.state.filterData[column]))
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && auxDisplayData[i][fil].props && !h.includes(this.state.filterData[column])){
              exists = false
            }
          }else if(this.state.filterData[column]){
            exists = false
          }
        }else if(fil === "line_id"){
          if(auxDisplayData[i][fil]){
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
              exists = false
            }
          }else if(this.state.filterData[column]){
            exists = false
          }
        }else{
          if(auxDisplayData[i][fil]){
            if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].toString().includes(this.state.filterData[column])){
              exists = false
            }
          }else if(this.state.filterData[column]){
            exists = false
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
            
        record[dataIndex].props ? record[dataIndex].props.children.toString().toLowerCase().includes(value.toLowerCase()) :
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
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Line ID" style={{textAlign:"center"}} onChange={(e) => this.filter(41, e.target.value)}/></center>,
        dataIndex: 'line_id',
        key: 'line_id',
        ...this.getColumnSearchProps('line_id'),
        fixed: "left",
        align: "center"
      },
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Unit" style={{textAlign:"center"}} onChange={(e) => this.filter(12, e.target.value)}/></center>,
        dataIndex: 'unit',
        key: 'unit',
        ...this.getColumnSearchProps('unit'),
        align: "center"
      },
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Area" style={{textAlign:"center"}} onChange={(e) => this.filter(0, e.target.value)}/></center>,
        dataIndex: 'area',
        key: 'area',
        ...this.getColumnSearchProps('area'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Line" style={{textAlign:"center"}} onChange={(e) => this.filter(1, e.target.value)}/></div>,
        dataIndex: 'line',
        key: 'line',
        ...this.getColumnSearchProps('line'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Train" style={{textAlign:"center"}} onChange={(e) => this.filter(2, e.target.value)}/></div>,
        dataIndex: 'train',
        key: 'train',
        ...this.getColumnSearchProps('train'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Fluid" style={{textAlign:"center"}} onChange={(e) => this.filter(9, e.target.value)}/></div>,
        dataIndex: 'fluid',
        key: 'fluid',
        ...this.getColumnSearchProps('fluid'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Sequential" style={{textAlign:"center"}} onChange={(e) => this.filter(10, e.target.value)}/></div>,
        dataIndex: 'seq',
        key: 'seq',
        ...this.getColumnSearchProps('seq'),
        align: "center"
      },
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Iso ID" style={{textAlign:"center"}} onChange={(e) => this.filter(42, e.target.value)}/></center>,
        dataIndex: 'iso_id',
        key: 'iso_id',
        ...this.getColumnSearchProps('iso_id'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Spec code" style={{textAlign:"center"}} onChange={(e) => this.filter(3, e.target.value)}/></div>,
        dataIndex: 'spec_code',
        key: 'spec_code',
        ...this.getColumnSearchProps('spec_code'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Diameter" style={{textAlign:"center"}} onChange={(e) => this.filter(4, e.target.value)}/></div>,
        dataIndex: 'diameter',
        key: 'diameter',
        ...this.getColumnSearchProps('diameter'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="P&ID" style={{textAlign:"center"}} onChange={(e) => this.filter(5, e.target.value)}/></div>,
        dataIndex: 'pid',
        key: 'pid',
        ...this.getColumnSearchProps('pid'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Stress level" style={{textAlign:"center"}} onChange={(e) => this.filter(6, e.target.value)}/></div>,
        dataIndex: 'stress_level',
        key: 'stress_level',
        ...this.getColumnSearchProps('stress_level'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Calculation notes" style={{textAlign:"center"}} onChange={(e) => this.filter(7, e.target.value)}/></div>,
        dataIndex: 'calc_notes',
        key: 'calc_notes',
        ...this.getColumnSearchProps('calc_notes'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Insulation" style={{textAlign:"center"}} onChange={(e) => this.filter(8, e.target.value)}/></div>,
        dataIndex: 'insulation',
        key: 'insulation',
        ...this.getColumnSearchProps('insulation'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Total weight" style={{textAlign:"center"}} onChange={(e) => this.filter(11, e.target.value)}/></div>,
        dataIndex: 'total_weight',
        key: 'total_weight',
        ...this.getColumnSearchProps('total_weight'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Modelled" style={{textAlign:"center"}} onChange={(e) => this.filter(43, e.target.value)}/></div>,
        dataIndex: 'modelled',
        key: 'modelled',
        ...this.getColumnSearchProps('modelled'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Tray" style={{textAlign:"center"}} onChange={(e) => this.filter(16, e.target.value)}/></div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Progress" style={{textAlign:"center"}} onChange={(e) => this.filter(17, e.target.value)}/></div>,
        dataIndex: 'progress',
        key: 'progress',
        ...this.getColumnSearchProps('progress'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Holds" style={{textAlign:"center"}} onChange={(e) => this.filter(44, e.target.value)}/></div>,
        dataIndex: 'holds',
        key: 'holds',
        ...this.getColumnSearchProps('holds'),
        width:"140px",
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="BOM" style={{textAlign:"center"}} onChange={(e) => this.filter(15, e.target.value)}/></div>,
        dataIndex: 'BOM',
        key: 'BOM',
        ...this.getColumnSearchProps('BOM'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="LDL" style={{textAlign:"center"}} onChange={(e) => this.filter(14, e.target.value)}/></div>,
        dataIndex: 'LDL',
        key: 'LDL',
        ...this.getColumnSearchProps('LDL'),
        align: "center"
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
        <div className="dataTable__container">
        <Table className="customTable" scroll={{x:6000, y:437}} bordered = {true} columns={columns} dataSource={this.state.displayData} pagination={{disabled:true, defaultPageSize:5000}} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default IsoControlFullDataTable;