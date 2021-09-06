import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class IsoControlNotModelledDataTable extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    data: [],
    tab: this.props.currentTab,
    role: this.props.currentRole,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null
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
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getNotModelled", options)
    .then(response => response.json())
    .then(json =>{
        let rows = []
        for(let i = 0; i < json.rows.length; i++){
            if(json.rows[i].BOM === "In BOM"){
              json.rows[i].line_id = json.rows[i].bom_unit + json.rows[i].line
              json.rows[i].iso_id = json.rows[i].bom_unit + json.rows[i].area + json.rows[i].line + json.rows[i].train

              json.rows[i].unit = json.rows[i].bom_unit
            }else{
              json.rows[i].line_id = json.rows[i].LDL_unit + json.rows[i].fluid + json.rows[i].seq
              json.rows[i].iso_id = json.rows[i].LDL_unit + /*json.rows[i].area +*/ json.rows[i].fluid + json.rows[i].seq //+ json.rows[i].train

              json.rows[i].unit = json.rows[i].LDL_unit
              json.rows[i].line = json.rows[i].fluid + json.rows[i].seq
              json.rows[i].spec_code = json.rows[i].spec_code_ldl
            }

            if(!json.rows[i].spec_code){
              json.rows[i].spec_code = ""
            }

            if(i % 2 === 0){
                json.rows[i].color = "#fff"
            }else{
                json.rows[i].color = "#eee"
            }
            rows.push(json.rows[i])
        }
        this.setState({data: rows})
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
        title: <center className="dataTable__header__text">Unit</center>,
        dataIndex: 'unit',
        key: 'unit',
        ...this.getColumnSearchProps('unit'),
        sorter:{
          compare: (a, b) => { return a.unit.localeCompare(b.unit)},
        },
      },
      {
        title: <center className="dataTable__header__text">Area</center>,
        dataIndex: 'area',
        key: 'area',
        ...this.getColumnSearchProps('area'),
        sorter:{
          compare: (a, b) => a.area.localeCompare(b.area),
        },
      },
      {
        title: <div className="dataTable__header__text">Line</div>,
        dataIndex: 'line',
        key: 'line',
        ...this.getColumnSearchProps('line'),
        sorter: {
          compare: (a, b) => a.line.localeCompare(b.line),
        },
      },
      {
        title: <div className="dataTable__header__text">Train Nº</div>,
        dataIndex: 'train',
        key: 'train',
        ...this.getColumnSearchProps('train'),
        sorter: {
          compare: (a, b) => { return a.train.localeCompare(b.train)},
        },
      },
      {
        title: <div className="dataTable__header__text">Line ID</div>,
        dataIndex: 'line_id',
        key: 'line_id',
        ...this.getColumnSearchProps('line_id'),
        sorter: {
          compare: (a, b) => { return a.line_id.localeCompare(b.line_id)},
        },
      },
      {
        title: <center className="dataTable__header__text">Iso ID</center>,
        dataIndex: 'iso_id',
        key: 'iso_id',
        ...this.getColumnSearchProps('iso_id'),
        sorter:{
          compare: (a, b) => a.iso_id.localeCompare(b.iso_id),
        },
      },
      {
        title: <div className="dataTable__header__text">Spec code</div>,
        dataIndex: 'spec_code',
        key: 'spec_code',
        widht: '10%',
        ...this.getColumnSearchProps('spec_code'),
        sorter: {
          compare: (a, b) => { return a.spec_code.localeCompare(b.spec_code)},
        },
      },
      {
        title: <div className="dataTable__header__text">Total weight</div>,
        dataIndex: 'total_weight',
        key: 'total_weight',
        ...this.getColumnSearchProps('total_weight'),
        sorter: {
          compare: (a, b) => { return a.total_weight - b.total_weight},
        },
      },
      {
        title: <div className="dataTable__header__text">BOM</div>,
        dataIndex: 'BOM',
        key: 'BOM',
        ...this.getColumnSearchProps('BOM'),
        sorter: {
          compare: (a, b) => { a.BOM.localeCompare(b.BOM)},
        },
      },
      {
        title: <div className="dataTable__header__text">LDL</div>,
        dataIndex: 'LDL',
        key: 'LDL',
        ...this.getColumnSearchProps('LDL'),
        sorter: {
          compare: (a, b) => { a.LDL.localeCompare(b.LDL)},
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
        <div className="dataTable__container">
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default IsoControlNotModelledDataTable;