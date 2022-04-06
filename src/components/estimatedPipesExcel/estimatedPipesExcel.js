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
    line_refs: [],
    new_data: {},
    warning: false,
    empty: false,
    tags: []
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
    for(let i = 0; i < json.line_refs.length; i++){
      line_refs.push(json.line_refs[i].line_ref)
    }
    this.setState({line_refs : line_refs});

  })

  await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/modelledEstimatedPipes", options)
  .then(response => response.json())
  .then(async json => {
    let rows = [] 
    let tags = []
    for(let i = 0; i < json.rows.length; i++){
      rows.push({"Line reference": json.rows[i].line_reference, "Tag": json.rows[i].tag, "Unit": json.rows[i].unit, "Area": json.rows[i].area, "Fluid": json.rows[i].fluid, "Seq": json.rows[i].seq, "Spec": json.rows[i].spec, "Diameter": json.rows[i].diameter, "Insulation": json.rows[i].insulation, "Train": json.rows[i].train, "Status": json.rows[i].status, "id":json.rows[i].id})
      tags.push(json.rows[i].tag)
    }
    await this.setState({data: rows, tags: tags})
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

}

  addRow(){
    let rows = this.state.data
    rows.push({"Line reference": "", "Tag": "", "Unit": "", "Area": "", "Fluid": "", "Seq": "", "Spec": "", "Diameter": "", "Insulation": "", "Train": "", "Status": ""})
    this.setState({data: rows})
  }
  
  async submitChanges(){
    
    let new_rows = []
    Object.entries(this.state.new_data)
    .map( ([key, value]) => new_rows.push(value))
    for(let i = 0; i < new_rows.length; i++){
      if(new_rows[i]["Line reference"] === "" || new_rows[i].Tag === "" || new_rows[i].Unit === "" || new_rows[i].Area === "" || new_rows[i].Fluid === "" || new_rows[i].Seq === "" || new_rows[i].Spec === "" || new_rows[i].Diameter === "" || new_rows[i].Insulation === "" || new_rows[i].Train === "" || new_rows[i]["Line reference"] === null || new_rows[i].Tag === null || new_rows[i].Unit === null || new_rows[i].Area === null || new_rows[i].Fluid === null || new_rows[i].Seq === null || new_rows[i].Spec === null || new_rows[i].Diameter === null || new_rows[i].Insulation === null || new_rows[i].Train === null){
        await this.setState({empty: true})
        console.log(new_rows[i])
        new_rows.splice(i, 1)
      }
    }

    const body = {
      rows: new_rows,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submitModelledEstimatedPipes", options)
    .then(response => response.json())
    .then(async json => {
      if(json.success){
        this.props.success()
        
      }
      if(this.state.warning){
        this.props.estimatedWarning()
      }
      if(this.state.empty){
        this.props.estimatedEmpty()
      }
      this.setState({new_data: [], warning: false, empty: false})
    })
  }

  handleChange = async(changes, source) =>{
    if (source !== 'loadData'){
      let data_aux = this.state.data
      let row_id = changes[0][0]
      if(this.state.data[row_id].Status === "ESTIMATED*" || this.state.data[row_id].Status === "MODELLED"){
        data_aux[row_id][changes[0][1]] = "##########"
        await this.setState({data: data_aux, warning: true})
      }else{
        let row = this.state.data[row_id]
        if (changes[0][1] === 'Line reference'){
          const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
          }
        
          await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/getDataByRef/" + changes[0][3], options)
            .then(response => response.json())
            .then(async json => {
              if(json.pipe){
                data_aux[row_id].Unit = json.pipe[0].unit
                data_aux[row_id].Fluid = json.pipe[0].fluid
                data_aux[row_id].Seq = json.pipe[0].seq
                data_aux[row_id].Spec = json.pipe[0].spec_code
                data_aux[row_id].Insulation = json.pipe[0].insulation
              await this.setState({data : data_aux})
              }
          })
  
        }
        if(row.Area && row.Diameter && row.Train && row["Line reference"]){
          let tag_order = process.env.REACT_APP_TAG_ORDER.split(/[ -]+/)        
          data_aux[row_id].Tag = row[tag_order[0]] + "-" + row[tag_order[1]] + "-" + row[tag_order[2]] + "-" + row[tag_order[3]] + "-" + row[tag_order[4]] + "-" + row[tag_order[5]] + "-" + row[tag_order[6]] + "_" + row[tag_order[7]]  
        }
        let new_data = this.state.new_data
        if(this.state.tags.indexOf(data_aux[row_id].Tag) > -1 && this.state.tags.indexOf(data_aux[row_id].Tag) !== row_id){
          data_aux[row_id].Tag = "ALREADY EXISTS"
          data_aux[row_id].Area = ""
          data_aux[row_id].Diameter = ""
          data_aux[row_id].Train = ""
          data_aux[row_id].Status = ""
        }else{
          data_aux[row_id].Status = "ESTIMATED"
          new_data[row_id] = row
        }
        await this.setState({data : data_aux, new_data: new_data})
        
        if(!row["Line reference"] && row.id){
          let new_data = this.state.new_data
          new_data[row_id] = {"Line reference": "deleted", id: row.id}
          await this.setState({data : data_aux, new_data: new_data})
        }
      }
      
    }
  }


  render() {

    const settings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: [300, 500, 105, 120, 140, 130, 140, 110, 130, 110, 143],
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
                columns= {[{ data: "Line reference", type:'dropdown', source: this.state.line_refs, strict: true},{ data: "Tag", type:'text', readOnly: true},{ data: "Unit", type:'text', readOnly: true},{ data: "Area", type:'dropdown', source: this.state.areas, strict: true }, { data: "Fluid", type:'text', readOnly: true}, { data: "Seq", type:'text', readOnly: true}, { data: "Spec", type:'text', readOnly: true}, { data: "Diameter", type:'dropdown', source: this.state.diameters, strict: true}, { data: "Insulation", type:'text', readOnly: true},{ data: "Train", type:'dropdown', source: this.state.trains, strict: true},{ data: "Status", type:'text', readOnly: true}]}
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
              <div style={{marginLeft:"695px"}}>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRow()} style={{marginRight:"25px", fontSize:"16px", width:"160px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChanges()} style={{marginRight:"5px", fontSize:"16px", width:"160px", borderRadius:"10px"}}>Save</button>
              </div>
              <br></br>
            </div>
          </div>
      );
  }
}

export default EstimatedPipesExcel;