import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import './statusDataTable.css'


const data = [
    { key:1, id: '021A1971101N0003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 10, realProgress: 50, progress: 50},
    { key:2, id: '021A1971101N0003_02.pdf', status: 'LDG Design', condition: 'ON GOING', progressMax: 4, realProgress: 55, progress: 55},
    { key:3, id: '021B1971101N0003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 2, realProgress: 55, progress: 50},
    { key:4, id: '021A194321N0003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 5, realProgress: 60, progress: 50},
    { key:5, id: '021A1121101N0003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 1, realProgress: 30, progress: 30},
    { key:6, id: '021A1971101N9003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 10, realProgress: 35, progress: 30},
    { key:7, id: '121A1971101N0003_01.pdf', status: 'New', condition: 'ON GOING', progressMax: 8, realProgress: 80, progress: 80},
];

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
  };
  
  
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
        <Table className="customTable" bordered = {true} rowSelection={{type: 'checkbox', ...rowSelection}} columns={columns} dataSource={data} pagination={{ pageSize: this.props.pagination  }} size="small"/>
          <div style={{position: "absolute", bottom:25, left:0}}>
            <b>Total elements: {data.length}</b>
          </div>
        </div>
        
      </div>
    );
  }
}

export default StatusDataTable;