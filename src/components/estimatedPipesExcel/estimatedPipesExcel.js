import React from 'react';
import 'antd/dist/antd.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';
import "./estimatedPipesExcel.css"

class EstimatedPipesExcel extends React.Component{
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
    steps: [],
    areas: [],
    types: [],
  };

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/equipEstimatedExcel", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      rows.push({"Area": "Area", "Type": "Type", "Quantity": "Quantity"})
      for(let i = 0; i < json.rows.length; i++){

          row = {"Area": json.rows[i].area, "Type": json.rows[i].type, "Quantity": json.rows[i].quantity, id: json.rows[i].id}

          rows.push(row)
      }
      this.setState({data : rows, selectedRows: []});

  }) 

  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/areas", options)
    .then(response => response.json())
    .then(json => {
      let areas_options = []
      for(let i = 0; i < json.length; i++){
        areas_options.push(json[i].name)
      }
      this.setState({areas : areas_options});

  })

  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/equipments/types", options)
    .then(response => response.json())
    .then(json => {
      let types_options = []
      for(let i = 0; i < json.rows.length; i++){
        types_options.push(json.rows[i].name)
      }
      this.setState({types : types_options});

  })
}

  addRow(){
    let rows = this.state.data
    rows.push({"Area": "", "Type": "", "Quantity": ""})
    this.setState({data: rows})
  }
  
  submitChanges(){
    const body = {
      rows: this.state.data,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/equipments/estimated", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

  render() {

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: [300, 400, 110, 210, 140, 130, 140, 110, 130, 110, 143],
        fontSize: 24
        //... other options
      }
  

      return (
          <div>
            <div id="hot-app">
              <HotTable
                data={this.state.data}
                colHeaders={["<b className='header'>Line reference</b>", "<b>Tag</b>", "<b>Unit</b>", "<b>Area</b>", "<b>Fluid</b>", "<b>Seq</b>", "<b>Spec</b>", "<b>Diameter</b>", "<b>Insulation</b>", "<b>Train</b>", "<b>Status</b>"]}
                rowHeaders={true}
                rowHeights="30px"
                columnHeaderHeight={30}
                width="100%"
                height="520"
                settings={settings}
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Line reference", type:'dropdown', source: this.state.areas },{ data: "Tag", type:'text'},{ data: "Unit", type:'text'},{ data: "Area", type:'dropdown', source: this.state.areas }, { data: "Fluid", type:'text'}, { data: "Seq", type:'text'}.data, { data: "Spec", type:'text'}, { data: "Diameter", type:'text'}, { data: "Insulation", type:'text'},{ data: "Train", type:'text'},{ data: "Status", type:'text'}]}
                filters={true}
                dropdownMenu= {[
                    'make_read_only',
                    '---------',
                    'alignment',
                    '---------',
                    'filter_by_condition',
                    '---------',
                    'filter_operators',
                    '---------',
                    'filter_by_condition2',
                    '---------',
                    'filter_by_value',
                    '---------',
                    'filter_action_bar',
                  ]}
              />
              <br></br>
              <div style={{marginLeft:"803px"}}>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRow()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChanges()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </div>
              <br></br>
            </div>
          </div>
      );
  }
}

export default EstimatedPipesExcel;