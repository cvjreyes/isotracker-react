import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class IsoControlFullDataTable extends React.Component{
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
                json.rows[i].line_id = json.rows[i].unit + json.rows[i].line
                json.rows[i].iso_id = json.rows[i].unit + json.rows[i].area + json.rows[i].line + json.rows[i].train
  
                json.rows[i].unit = json.rows[i].unit
            }

            if(json.rows[i].diameter === null){
                json.rows[i].modelled = "Not modelled"
            }else{
                json.rows[i].modelled = "Modelled"
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
        title: <div className="dataTable__header__text">Line ID</div>,
        dataIndex: 'line_id',
        key: 'line_id',
        ...this.getColumnSearchProps('line_id'),
        sorter: {
          compare: (a, b) => { return a.line_id.localeCompare(b.line_id)},
        },
        fixed: "left"
      },
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
        title: <div className="dataTable__header__text">Train</div>,
        dataIndex: 'train',
        key: 'train',
        ...this.getColumnSearchProps('train'),
        sorter: {
          compare: (a, b) => { return a.train.localeCompare(b.train)},
        },
      },
      {
        title: <div className="dataTable__header__text">Fluid</div>,
        dataIndex: 'fluid',
        key: 'fluid',
        ...this.getColumnSearchProps('fluid'),
        sorter: {
          compare: (a, b) => { return a.fluid.localeCompare(b.fluid)},
        },
      },
      {
        title: <div className="dataTable__header__text">Sequential</div>,
        dataIndex: 'seq',
        key: 'seq',
        ...this.getColumnSearchProps('seq'),
        sorter: {
          compare: (a, b) => { return a.seq.localeCompare(b.seq)},
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
        ...this.getColumnSearchProps('spec_code'),
        sorter: {
          compare: (a, b) => { return a.spec_code.localeCompare(b.spec_code)},
        },
      },
      {
        title: <div className="dataTable__header__text">Diameter</div>,
        dataIndex: 'diameter',
        key: 'diameter',
        ...this.getColumnSearchProps('diameter'),
        sorter: {
          compare: (a, b) => { return a.diameter - b.diameter},
        },
      },
      {
        title: <div className="dataTable__header__text">P&ID</div>,
        dataIndex: 'pid',
        key: 'pid',
        ...this.getColumnSearchProps('pid'),
        sorter: {
          compare: (a, b) => { return a.pid.localeCompare(b.pid)},
        },
      },
      {
        title: <div className="dataTable__header__text">Stress level</div>,
        dataIndex: 'stress_level',
        key: 'stress_level',
        ...this.getColumnSearchProps('stress_level'),
        sorter: {
          compare: (a, b) => { return a.stress_level.localeCompare(b.stress_level)},
        },
      },
      {
        title: <div className="dataTable__header__text">CN</div>,
        dataIndex: 'calc_notes',
        key: 'calc_notes',
        ...this.getColumnSearchProps('calc_notes'),
        sorter: {
          compare: (a, b) => { return a.calc_notes.localeCompare(b.calc_notes)},
        },
      },
      {
        title: <div className="dataTable__header__text">Insulation</div>,
        dataIndex: 'insulation',
        key: 'insulation',
        ...this.getColumnSearchProps('insulation'),
        sorter: {
          compare: (a, b) => { return a.insulation.localeCompare(b.insulation)},
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
        title: <div className="dataTable__header__text">Modelled</div>,
        dataIndex: 'modelled',
        key: 'modelled',
        ...this.getColumnSearchProps('modelled'),
        sorter: {
          compare: (a, b) => { a.modelled.localeCompare(b.modelled)},
        },
      },
      {
        title: <div className="dataTable__header__text">State</div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { a.to.localeCompare(b.to)},
        },
      },
      {
        title: <div className="dataTable__header__text">Progress</div>,
        dataIndex: 'progress',
        key: 'progress',
        ...this.getColumnSearchProps('progress'),
        sorter: {
          compare: (a, b) => { a.progress.localeCompare(b.progress)},
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
      {
        title: <div className="dataTable__header__text">CUSTOM 1</div>,
        dataIndex: 'custom1',
        key: 'custom1',
        ...this.getColumnSearchProps('custom1'),
        sorter: {
          compare: (a, b) => { a.custom1.localeCompare(b.custom1)},
        },
        width:"400px"
      },
      {
        title: <div className="dataTable__header__text">CUSTOM 2</div>,
        dataIndex: 'custom2',
        key: 'custom2',
        ...this.getColumnSearchProps('custom2'),
        sorter: {
          compare: (a, b) => { a.custom2.localeCompare(b.custom2)},
        },
        width:"400px"
      },
      {
        title: <div className="dataTable__header__text">CUSTOM 3</div>,
        dataIndex: 'custom3',
        key: 'custom3',
        ...this.getColumnSearchProps('custom3'),
        sorter: {
          compare: (a, b) => { a.custom3.localeCompare(b.custom3)},
        },
        width:"400px"
      },
      {
        title: <div className="dataTable__header__text">CUSTOM 4</div>,
        dataIndex: 'custom4',
        key: 'custom4',
        ...this.getColumnSearchProps('custom4'),
        sorter: {
          compare: (a, b) => { a.custom4.localeCompare(b.custom4)},
        },
        width:"400px"
      },
      {
        title: <div className="dataTable__header__text">CUSTOM 5</div>,
        dataIndex: 'custom5',
        key: 'custom5',
        ...this.getColumnSearchProps('custom5'),
        sorter: {
          compare: (a, b) => { a.custom5.localeCompare(b.custom5)},
        },
        width:"400px"
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
        <Table className="customTable" scroll={{x:6000}} bordered = {true} columns={columns} dataSource={this.state.data} pagination={{ pageSize: this.props.pagination  }} size="small" rowClassName= {(record) => record.color.replace('#', '')}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default IsoControlFullDataTable;