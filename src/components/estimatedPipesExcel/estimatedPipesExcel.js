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
    diameters: [],
    areas: [],
    trains: ["01", "02", "03", "04", "05"],
    line_refs: []
  };

  async componentDidMount(){

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }


  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/areas", options)
    .then(response => response.json())
    .then(json => {
      let areas_options = []
      for(let i = 0; i < json.length; i++){
        areas_options.push(json[i].name)
      }
      this.setState({areas : areas_options});

  })

  await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/diameters", options)
  .then(response => response.json())
  .then(json => {
    let diameters = []
    for(let i = 0; i < json.diameters.length; i++){
      diameters.push(json.diameters[i].diameter)
    }
    this.setState({diameters : diameters});

  })

  await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/api/lineRefs", options)
  .then(response => response.json())
  .then(json => {
    let line_refs = []
    console.log(json)
    for(let i = 0; i < json.line_refs.length; i++){
      line_refs.push(json.line_refs[i].line_ref)
    }
    this.setState({line_refs : line_refs});

  })

  await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/modelledEstimatedPipes", options)
  .then(response => response.json())
  .then(async json => {
    let rows = [] 
    for(let i = 0; i < json.rows.length; i++){
      rows.push({"Line reference": json.rows[i].line_reference, "Tag": json.rows[i].tag, "Unit": json.rows[i].unit, "Area": json.rows[i].area, "Fluid": json.rows[i].fluid, "Seq": json.rows[i].seq, "Spec": json.rows[i].spec, "Diameter": json.rows[i].diameter, "Insulation": json.rows[i].insulation, "Train": json.rows[i].train, "Status": json.rows[i].status, "id":json.rows[i].id})
    }
    await this.setState({data: rows})
  })
}

  addRow(){
    let rows = this.state.data
    rows.push({"Line reference": "", "Tag": "", "Unit": "", "Area": "", "Fluid": "", "Seq": "", "Spec": "", "Diameter": "", "Insulation": "", "Train": "", "Status": ""})
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

    this.props.success()
  }

  handleChange = (changes, source) =>{
    // console.log(this.state.data[changes[0][0]])
    if (source !== 'loadData'){
      if (changes[0][1] === 'Line reference'){
        console.log(changes[0][3])
      }
    }
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
                columns= {[{ data: "Line reference", type:'dropdown', source: this.state.line_refs, strict: true },{ data: "Tag", type:'text', readOnly: true},{ data: "Unit", type:'text', readOnly: true},{ data: "Area", type:'dropdown', source: this.state.areas, strict: true }, { data: "Fluid", type:'text', readOnly: true}, { data: "Seq", type:'text', readOnly: true}.data, { data: "Spec", type:'text', readOnly: true}, { data: "Diameter", type:'dropdown', source: this.state.diameters, strict: true}, { data: "Insulation", type:'text', readOnly: true},{ data: "Train", type:'dropdown', source: this.state.trains, strict: true},{ data: "Status", type:'text', readOnly: true}]}
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
                  afterChange={this.handleChange}
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