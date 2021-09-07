import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

class CSPTrackerdDataTable extends React.Component{
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

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
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
        title: <center className="dataTable__header__text">DESCRIPTION</center>,
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
        sorter:{
          compare: (a, b) => a.description.localeCompare(b.description),
        },
      },
      {
        title: <div className="dataTable__header__text">DESCRIPTION PLANE</div>,
        dataIndex: 'description_plane',
        key: 'description_plane',
        ...this.getColumnSearchProps('description_plane'),
        sorter: {
          compare: (a, b) => a.description_plane-b.description_plane,
        },
      },
      {
        title: <div className="dataTable__header__text">ISO DESCRIPTION</div>,
        dataIndex: 'description_iso',
        key: 'description_iso',
        ...this.getColumnSearchProps('description_iso'),
        sorter: {
          compare: (a, b) => a.modelled-b.modelled,
        },
      },
      {
        title: <div className="dataTable__header__text">IDENT</div>,
        dataIndex: 'ident',
        key: 'ident',
        ...this.getColumnSearchProps('ident'),
        sorter: {
          compare: (a, b) => a.ident-b.ident,
        },
      },
      {
        title: <div className="dataTable__header__text">P1BORE</div>,
        dataIndex: 'p1bore',
        key: 'p1bore',
        ...this.getColumnSearchProps('p1bore'),
        sorter: {
          compare: (a, b) => a.p1bore-b.p1bore,
        },
      },
      {
        title: <div className="dataTable__header__text">P2BORE</div>,
        dataIndex: 'p2bore',
        key: 'p2bore',
        ...this.getColumnSearchProps('p2bore'),
        sorter: {
          compare: (a, b) => a.p2bore-b.p2bore,
        },
      },
      {
        title: <div className="dataTable__header__text">P3BORE</div>,
        dataIndex: 'p3bore',
        key: 'p3bore',
        ...this.getColumnSearchProps('p3bore'),
        sorter: {
          compare: (a, b) => a.p3bore-b.p3bore,
        },
      },
      {
        title: <div className="dataTable__header__text">RATING</div>,
        dataIndex: 'rating',
        key: 'rating',
        ...this.getColumnSearchProps('rating'),
        sorter: {
            compare: (a, b) => a.rating.localeCompare(b.rating),
        },
      },
      {
        title: <div className="dataTable__header__text">SPEC</div>,
        dataIndex: 'spec',
        key: 'spec',
        ...this.getColumnSearchProps('spec'),
        sorter: {
            compare: (a, b) => a.spec.localeCompare(b.spec),
        },
      },
      {
        title: <div className="dataTable__header__text">FACE-TO-FACE</div>,
        dataIndex: 'spec',
        key: 'spec',
        ...this.getColumnSearchProps('spec'),
        sorter: {
            compare: (a, b) => a.spec.localeCompare(b.spec),
        },
      },
      {
        title: <div className="dataTable__header__text">END PREPARATION</div>,
        dataIndex: 'end_preparation',
        key: 'end_preparation',
        ...this.getColumnSearchProps('end_preparation'),
        sorter: {
            compare: (a, b) => a.end_preparation.localeCompare(b.end_preparation),
        },
      },
      {
        title: <div className="dataTable__header__text">DRAWING</div>,
        dataIndex: 'drawing',
        key: 'drawing',
        ...this.getColumnSearchProps('drawing'),
        sorter: {
            compare: (a, b) => a.drawing.localeCompare(b.drawing),
        },
      },
      {
        title: <div className="dataTable__header__text">BOLTS</div>,
        dataIndex: 'bolts',
        key: 'bolts',
        ...this.getColumnSearchProps('bolts'),
        sorter: {
            compare: (a, b) => a.bolts.localeCompare(b.bolts),
        },
      },
      {
        title: <div className="dataTable__header__text">BOLT TYPE</div>,
        dataIndex: 'bolts_type',
        key: 'bolts_type',
        ...this.getColumnSearchProps('bolts_type'),
        sorter: {
            compare: (a, b) => a.bolts_type.localeCompare(b.bolts_type),
        },
      },
      {
        title: <div className="dataTable__header__text">READY TO LOAD</div>,
        dataIndex: 'ready_load',
        key: 'ready_load',
        ...this.getColumnSearchProps('ready_load'),
        sorter: {
            compare: (a, b) => a.ready_load.localeCompare(b.ready_load),
        },
      },
      {
        title: <div className="dataTable__header__text">READY IN E3D</div>,
        dataIndex: 'ready_e3d',
        key: 'ready_e3d',
        ...this.getColumnSearchProps('ready_e3d'),
      },
      {
        title: <div className="dataTable__header__text">COMMENTS</div>,
        dataIndex: 'comments',
        key: 'comments',
        ...this.getColumnSearchProps('comments'),
      },
    ];
    
    for(let i = 0; i < this.state.steps.length; i++){
      let index = this.state.steps[i]
      columns.push({
        title: <div className="dataTable__header__text">{this.state.steps[i]}%</div>,
        dataIndex: index,
        key: index,
        ...this.getColumnSearchProps(index),
        sorter: {
          compare: (a, b) => a[index] - b[index],
        },
      })
    }

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

export default CSPTrackerdDataTable;