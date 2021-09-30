import React from 'react';
import './csptrackerDataTable.css'
import 'antd/dist/antd.css';
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import UploadDrawingPopUp from '../uploadDrawingPopUp/uploadDrawingPopUp';
import UpdateDrawingPopUp from '../updateDrawingPopUp/updateDrawingPopUp';
import { Link } from 'react-router-dom';

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

  async readyE3D(tag){
    const body = {
      tag: tag
    }

    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  }


  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/readye3d", options)
      .then(response => response.json())
      .then(
        this.props.updateDataMethod()
      )
  }

  async cancelReadyE3D(tag){
    const body = {
      tag: tag
    }

    const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
  }


  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/cancelreadye3d", options)
      .then(response => response.json())
      .then(
        this.props.updateDataMethod()
        )
  }

  async updateData(){
    this.props.updateDataMethod()
  }

  async uploadDrawingSuccess(){
    this.props.uploadDrawingSuccess()
  }

  async updateDrawingSuccess(){
    this.props.updateDrawingSuccess()
  }

  async drawingUploadError(){
    this.props.drawingUploadError()
  }

  async getDrawing(fileName){
    const options = {
      method: "GET",
      headers: {
          "Content-Type": "application/pdf"
      }
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getDrawing/"+fileName, options)
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

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }


    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker", options)
        .then(response => response.json())
        .then(async json => {
          var rows = []
          var row = null
          if(process.env.REACT_APP_MMDN === "0"){
            for(let i = 0; i < json.rows.length; i++){
              row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_nps, p2bore: json.rows[i].p2diameter_nps, p3bore: json.rows[i].p3diameter_nps, rating: json.rows[i].rating, spec: json.rows[i].spec, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts: json.rows[i].bolts, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments}
              
              if(json.rows[i].drawing_filename !== null && row.description_plane !== null){
                if(this.props.currentRole === "Materials"){
                  row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link><UpdateDrawingPopUp description_plan_code={row.description_plane} updateDrawingSuccess={this.updateDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/></div>
                }else{
                  row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link></div>
                }
              }else if(json.rows[i].drawing_filename === null && row.description_plane !== null){
                if(this.props.currentRole === "Materials"){
                  row.drawing = <UploadDrawingPopUp description_plan_code={row.description_plane} updateDataMethod = {this.updateData.bind(this)} uploadDrawingSuccess={this.uploadDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/>
                }else{
                  row.drawing = null
                }
              }else{
                row.drawing = null
              }
          
              if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1){
                row.ready_load = "UPDATED"
                row.color = "#bbb"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                  }else{
                    row.ready_e3d = "UPDATED"
                  }
              }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && (json.rows[i].bolts === "NO" || (json.rows[i].bolts === "YES" && json.rows[i].bolt_type))){
                row.ready_load = "READY"
                if(row.ready_e3d === 1){
                  row.color = "#ggg"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                  }else{
                    row.ready_e3d = "READY"
                  }
                }else{
                  row.color = "#yyy"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                  }else{
                    row.ready_e3d = "NOT READY"
                  }
                }
                
              }else{
                row.ready_load = "NOT READY"
                row.color = "white"
                if(this.props.currentRole === "3D Admin"){
                  row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                }else{
                  row.ready_e3d = "NOT READY"
                }
              }

              for (const [key, value] of Object.entries(row)) {
                if(!value){
                  row[key] = ""
                }
              }

              rows.push(row)
            }
          }else{
            for(let i = 0; i < json.rows.length; i++){
              row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_dn, p2bore: json.rows[i].p2diameter_dn, p3bore: json.rows[i].p3diameter_dn, rating: json.rows[i].rating, spec: json.rows[i].spec, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts: json.rows[i].bolts, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments}
              
              if(json.rows[i].drawing_filename !== null && row.description_plane !== null){
                if(this.props.currentRole === "Materials"){
                  row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link><UpdateDrawingPopUp description_plan_code={row.description_plane} updateDrawingSuccess={this.updateDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/></div>
                }else{
                  row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link></div>
                }
              }else if(json.rows[i].drawing_filename === null && row.description_plane !== null){
                if(this.props.currentRole === "Materials"){
                  row.drawing = <UploadDrawingPopUp description_plan_code={row.description_plane} updateDataMethod = {this.updateData.bind(this)} uploadDrawingSuccess={this.uploadDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/>
                }else{
                  row.drawing = null
                }
              }else{
                row.drawing = null
              }

              if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1){
                row.ready_load = "UPDATED"
                row.color = "#bbb"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                  }else{
                    row.ready_e3d = "UPDATED"
                  }
                }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && (json.rows[i].bolts === "NO" || (json.rows[i].bolts === "YES" && json.rows[i].bolt_type))){
                  row.ready_load = "READY"
                if(row.ready_e3d === 1){
                  row.color = "#ggg"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                  }else{
                    row.ready_e3d = "READY"
                  }
                }else{
                  row.color = "#yyy"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                  }else{
                    row.ready_e3d = "NOT READY"
                  }
                }
                
              }else{
                row.ready_load = "NOT READY"
                row.color = "white"
                if(this.props.currentRole === "3D Admin"){
                  row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                }else{
                  row.ready_e3d = "NOT READY"
                }
              }

              for (const [key, value] of Object.entries(row)) {
                if(!value){
                  row[key] = ""
                }
              }

              rows.push(row)
            }
          }
          this.setState({data: rows})
          
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


      await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker", options)
          .then(response => response.json())
          .then(async json => {
            var rows = []
            var row = null
            if(process.env.REACT_APP_MMDN === "0"){
              for(let i = 0; i < json.rows.length; i++){
                row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_nps, p2bore: json.rows[i].p2diameter_nps, p3bore: json.rows[i].p3diameter_nps, rating: json.rows[i].rating, spec: json.rows[i].spec, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts: json.rows[i].bolts, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments}

                if(json.rows[i].drawing_filename !== null && row.description_plane !== null){
                  if(this.props.currentRole === "Materials"){
                    row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link><UpdateDrawingPopUp description_plan_code={row.description_plane} updateDrawingSuccess={this.updateDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/></div>
                  }else{
                    row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link></div>
                  }
                }else if(json.rows[i].drawing_filename === null && row.description_plane !== null){
                  if(this.props.currentRole === "Materials"){
                    row.drawing = <UploadDrawingPopUp description_plan_code={row.description_plane} updateDataMethod = {this.updateData.bind(this)} uploadDrawingSuccess={this.uploadDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/>
                  }else{
                    row.drawing = null
                  }
                }else{
                  row.drawing = null
                }

                if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1){
                  row.ready_load = "UPDATED"
                  row.color = "#bbb"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "UPDATED"
                    }
                  }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && (json.rows[i].bolts === "NO" || (json.rows[i].bolts === "YES" && json.rows[i].bolt_type))){
                    row.ready_load = "READY"
                  if(row.ready_e3d === 1){
                    row.color = "#ggg"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                    }else{
                      row.ready_e3d = "READY"
                    }
                  }else{
                    row.color = "#yyy"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                    }
                  }
                  
                }else{
                  row.ready_load = "NOT READY"
                  row.color = "white"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                  }else{
                    row.ready_e3d = "NOT READY"
                  }
                }

                for (const [key, value] of Object.entries(row)) {
                  if(!value){
                    row[key] = ""
                  }
                }

                rows.push(row)
              }
            }else{
              for(let i = 0; i < json.rows.length; i++){
                row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_dn, p2bore: json.rows[i].p2diameter_dn, p3bore: json.rows[i].p3diameter_dn, rating: json.rows[i].rating, spec: json.rows[i].spec, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts: json.rows[i].bolts, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments}
                
                
                if(json.rows[i].drawing_filename !== null && row.description_plane !== null){
                  if(this.props.currentRole === "Materials"){
                    row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link><UpdateDrawingPopUp description_plan_code={row.description_plane} updateDrawingSuccess={this.updateDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/></div>
                  }else{
                    row.drawing = <div className="drawing__column"><Link onClick={() => this.getDrawing(json.rows[i].drawing_filename)}>{json.rows[i].drawing_filename + " R" + json.rows[i].revision}</Link></div>
                  }
                }else if(json.rows[i].drawing_filename === null && row.description_plane !== null){
                  if(this.props.currentRole === "Materials"){
                    row.drawing = <UploadDrawingPopUp description_plan_code={row.description_plane} updateDataMethod = {this.updateData.bind(this)} uploadDrawingSuccess={this.uploadDrawingSuccess.bind(this)} drawingUploadError={this.drawingUploadError.bind(this)}/>
                  }else{
                    row.drawing = null
                  }
                }else{
                  row.drawing = null
                }

                if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1){
                  row.ready_load = "UPDATED"
                  row.color = "#bbb"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "UPDATED"
                    }
                  }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && (json.rows[i].bolts === "NO" || (json.rows[i].bolts === "YES" && json.rows[i].bolt_type))){
                    row.ready_load = "READY"
                    if(row.ready_e3d === 1){
                      row.color = "#ggg"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                      }else{
                        row.ready_e3d = "READY"
                      }
                    }else{
                      row.color = "#yyy"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                      }else{
                        row.ready_e3d = "NOT READY"
                      }
                    }
                    
                  }else{
                    row.ready_load = "NOT READY"
                    row.color = "white"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                    }
                  }

                  for (const [key, value] of Object.entries(row)) {
                    if(!value){
                      row[key] = ""
                    }
                  }

                rows.push(row)
              }
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
        title: <center className="dataTable__header__text">Tag</center>,
        dataIndex: 'tag',
        key: 'tag',
        ...this.getColumnSearchProps('tag'),
        sorter:{
          compare: (a, b) => a.tag.localeCompare(b.tag),
        },
        fixed: "left"
      },
      {
        title: <center className="dataTable__header__text">Quantity</center>,
        dataIndex: 'quantity',
        key: 'quantity',
        ...this.getColumnSearchProps('quantity'),
        sorter:{
          compare: (a, b) => a.quantity - b.quantity,
        },
      },
      {
        title: <div className="dataTable__header__text">Type</div>,
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        sorter: {
            compare: (a, b) => a.type.localeCompare(b.type),
        },
      },
      {
        title: <center className="dataTable__header__text">Description</center>,
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
        width: "400px",
        sorter:{
          compare: (a, b) => a.description.localeCompare(b.description),
        },
      },
      {
        title: <div className="dataTable__header__text">Drawing Description</div>,
        dataIndex: 'description_plane',
        key: 'description_plane',
        ...this.getColumnSearchProps('description_plane'),
        sorter: {
          compare: (a, b) => a.description_plane.localeCompare(b.description_plane),
        },
      },
      {
        title: <div className="dataTable__header__text">Drawing</div>,
        dataIndex: 'drawing',
        key: 'drawing',
        ...this.getColumnSearchProps('drawing'),
        width: "300px",
      },
      {
        title: <div className="dataTable__header__text">Iso Description</div>,
        dataIndex: 'description_iso',
        key: 'description_iso',
        ...this.getColumnSearchProps('description_iso'),
        width: "400px",
        sorter: {
          compare: (a, b) => a.description_iso.localeCompare(b.description_iso),
        },
      },
      {
        title: <div className="dataTable__header__text">Ident</div>,
        dataIndex: 'ident',
        key: 'ident',
        ...this.getColumnSearchProps('ident'),
        sorter: {
          compare: (a, b) => a.ident.localeCompare(b.ident),
        },
      },
      {
        title: <div className="dataTable__header__text">P1Bore</div>,
        dataIndex: 'p1bore',
        key: 'p1bore',
        ...this.getColumnSearchProps('p1bore'),
        sorter: {
          compare: (a, b) => a.p1bore-b.p1bore,
        },
      },
      {
        title: <div className="dataTable__header__text">P2Bore</div>,
        dataIndex: 'p2bore',
        key: 'p2bore',
        ...this.getColumnSearchProps('p2bore'),
        sorter: {
          compare: (a, b) => a.p2bore-b.p2bore,
        },
      },
      {
        title: <div className="dataTable__header__text">P3Bore</div>,
        dataIndex: 'p3bore',
        key: 'p3bore',
        ...this.getColumnSearchProps('p3bore'),
        sorter: {
          compare: (a, b) => a.p3bore-b.p3bore,
        },
      },
      {
        title: <div className="dataTable__header__text">Rating</div>,
        dataIndex: 'rating',
        key: 'rating',
        ...this.getColumnSearchProps('rating'),
        sorter: {
            compare: (a, b) => a.rating.localeCompare(b.rating),
        },
      },
      {
        title: <div className="dataTable__header__text">Spec</div>,
        dataIndex: 'spec',
        key: 'spec',
        ...this.getColumnSearchProps('spec'),
        sorter: {
            compare: (a, b) => a.spec.localeCompare(b.spec),
        },
      },
      {
        title: <div className="dataTable__header__text">End Preparation</div>,
        dataIndex: 'end_preparation',
        key: 'end_preparation',
        ...this.getColumnSearchProps('end_preparation'),
        sorter: {
            compare: (a, b) => a.end_preparation.localeCompare(b.end_preparation),
        },
      },
      {
        title: <div className="dataTable__header__text">Face to Face</div>,
        dataIndex: 'face_to_face',
        key: 'face_to_face',
        ...this.getColumnSearchProps('face_to_face'),
        sorter: {
            compare: (a, b) => a.face_to_face.localeCompare(b.face_to_face),
        },
      },
      {
        title: <div className="dataTable__header__text">Bolts</div>,
        dataIndex: 'bolts',
        key: 'bolts',
        ...this.getColumnSearchProps('bolts'),
        sorter: {
            compare: (a, b) => a.bolts.localeCompare(b.bolts),
        },
      },
      {
        title: <div className="dataTable__header__text">FLG Short Code</div>,
        dataIndex: 'bolts_type',
        key: 'bolts_type',
        ...this.getColumnSearchProps('bolts_type'),
        sorter: {
            compare: (a, b) => a.bolts_type.localeCompare(b.bolts_type),
        },
      },
      {
        title: <div className="dataTable__header__text">Comments</div>,
        dataIndex: 'comments',
        key: 'comments',
        ...this.getColumnSearchProps('comments'),
      },
      {
        title: <div className="dataTable__header__text">Ready to Load</div>,
        dataIndex: 'ready_load',
        key: 'ready_load',
        ...this.getColumnSearchProps('ready_load'),
        sorter: {
            compare: (a, b) => a.ready_load.localeCompare(b.ready_load),
        },
        fixed: "right"
      },
      {
        title: <div className="dataTable__header__text">Ready in E3D</div>,
        dataIndex: 'ready_e3d',
        key: 'ready_e3d',
        ...this.getColumnSearchProps('ready_e3d'),
        fixed: "right"
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
         rowClassName= {(record) => record.color.replace('#', '')} scroll={{x:5900}}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default CSPTrackerdDataTable;