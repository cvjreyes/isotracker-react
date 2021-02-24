import React from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import './myTrayTable.css'
import UploadPopUp from '../uploadPopUp/uploadPopUp';


const data = [
    { key:2, id: 1, date: '01/02/2021', from: 'Jon', to: 'Adrian', user: 'tec_Jon', actions:<UploadPopUp id={1} /> },
    { key:1, id: 3, date: '02/02/2021', from: 'Jon', to: 'Laura', user: 'tec_Jon', actions:<UploadPopUp id={3}/> },
    { key:3, id: 23, date: '07/02/2021', from: 'Rick', to: 'Adrian', user: 'tec_Rick', actions:<UploadPopUp id={23}/> },
    { key:4, id: 12, date: '23/01/2021', from: 'Maria', to: 'Laura', user: 'tec_Laura', actions:<UploadPopUp id={12}/> },
    { key:5, id: 1, date: '01/02/2021', from: 'Jon', to: 'Adrian', user: 'tec_Jon', actions:<UploadPopUp id={1}/> },
    { key:6, id: 3, date: '02/02/2021', from: 'Jon', to: 'Laura', user: 'tec_Jon', actions:<UploadPopUp id={3}/> },
    { key:7, id: 23, date: '07/02/2021', from: 'Rick', to: 'Adrian', user: 'tec_Rick', actions:<UploadPopUp id={23}/> },
    { key:8, id: 12, date: '23/01/2021', from: 'Maria', to: 'Laura', user: 'tec_Laura', actions:<UploadPopUp id={12}/> },
    { key:9, id: 3, date: '01/02/2021', from: 'Carl', to: 'Bob', user: 'sup_Bob', actions:<UploadPopUp id={1}/> },
    { key:10, id: 1, date: '01/02/2021', from: 'Jon', to: 'Adrian', user: 'tec_Jon', actions:<UploadPopUp id={3}/>},
    { key:11, id: 3, date: '02/02/2021', from: 'Jon', to: 'Laura', user: 'tec_Jon', actions:<UploadPopUp id={12}/>},
    { key:12, id: 23, date: '07/02/2021', from: 'Rick', to: 'Adrian', user: 'tec_Rick', actions:<UploadPopUp id={23}/> },
    { key:13, id: 12, date: '23/01/2021', from: 'Maria', to: 'Laura', user: 'tec_Laura', actions:<UploadPopUp id={12}/> },
    { key:14, id: 3, date: '01/02/2021', from: 'Carl', to: 'Bob', user: 'sup_Bob', actions:<UploadPopUp id={3}/> },
    { key:15, id: 41, date: '05/02/2021', from: 'Michael', to: 'Carlos', user: 'tec_Michael', actions:<UploadPopUp id={41}/> }
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


class MyTrayTable extends React.Component{
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
        title: <center className="dataTable__header__text">ISO ID</center>,
        dataIndex: 'id',
        key: 'id',
        width: '20%',
        ...this.getColumnSearchProps('id'),
        sorter:{
          compare: (a, b) => a.id - b.id,
        },
      },
      {
        title: <div className="dataTable__header__text">Date</div>,
        dataIndex: 'date',
        key: 'date',
        width: '20%',
        ...this.getColumnSearchProps('date'),
        sorter: {
          compare: (a, b) => moment(a.date, 'DD/MM/YYYY') - moment(b.date, 'DD/MM/YYYY'),
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
        title: <div className="dataTable__header__text">To</div>,
        dataIndex: 'to',
        key: 'to',
        ...this.getColumnSearchProps('to'),
        sorter: {
          compare: (a, b) => { return a.to.localeCompare(b.to)},
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
        title: <div className="dataTable__header__text">Actions</div>,
        dataIndex: 'actions',
        key: 'actions',
        ...this.getColumnSearchProps('actions'),
        sorter: {
          compare: (a, b) => a.actions - b.actions,
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

export default MyTrayTable;