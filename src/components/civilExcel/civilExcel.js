import React from 'react';
import 'antd/dist/antd.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';


class CivilExcel extends React.Component{ //Tablas de edicion de keyparams civils
  state = {
    searchText: '',
    searchedColumn: '',
    typesData: [],
    stepsData: [],
    progressData: [],
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

    //Get de los tipos de civiles
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/civils/types", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      rows.push({"Code": "Code", "Name": "Name", "Weight": "Weight"})
      for(let i = 0; i < json.rows.length; i++){
        //Creamos las filas
          row = {"Code": json.rows[i].code, "Name": json.rows[i].name, "Weight": json.rows[i].weight, id: json.rows[i].id}

          for(let j = 0; j < this.state.steps.length; j++){
            let currentStep = this.state.steps[j].toString()
            row[currentStep] = json.rows[i][currentStep]
          }
          rows.push(row)
      }
      this.setState({typesData : rows, selectedRows: []});

  }) 
  //Get de los steps
  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/civils/steps", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      //Creamos la fila
      rows.push({"Name":"Name", "Percentage":"Percentage"})
      for(let i = 0; i < json.rows.length; i++){
          row = {"Name": json.rows[i].name, "Percentage": json.rows[i].percentage, id: json.rows[i].id}

          rows.push(row)
      }
      this.setState({stepsData : rows, selectedRows: []});

  })
  //Get del progreso 
  fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/gcivils", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      //Creamos la fila
      rows.push({"Week": "Week", "Estimated": "Estimated"})
      for(let i = 0; i < json.rows.length; i++){
          row = {"Week": json.rows[i].week, "Estimated": json.rows[i].estimated, id: json.rows[i].id}

          rows.push(row)
      }
      this.setState({progressData : rows, selectedRows: []});

  })
  }

  addRowTypes(){ //Metodo para añadir una nueva fila a los tipos
    let rows = this.state.typesData
    rows.push({"Code": "", "Name":"", "Weight": ""})
    this.setState({typesData: rows})
  }
  
  submitChangesTypes(){ //Guardamos los tipos
    const body = {
      rows: this.state.typesData,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    //Post de los tipos
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/civils/types", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

  //Lo mismo para steps
  addRowSteps(){
    let rows = this.state.stepsData
    rows.push({"Name": "", "Percentage":""})
    this.setState({stepsData: rows})
  }

  submitChangesSteps(){
    const body = {
      rows: this.state.stepsData,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/civils/steps", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

  //Lo mismo para el progreso
  addRowProgress(){
    let rows = this.state.progressData
    rows.push({"Week": "", "Estimated": ""})
    this.setState({progressData: rows})
  }

  submitChangesProgress(){
    const body = {
      rows: this.state.progressData,
    }
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/civils/progress", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

  render() {

    const typesSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 200,
        //... other options
      }
  
      const stepsSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 200,
        //... other options
      }
  
      const progressSettings = {
        licenseKey: 'non-commercial-and-evaluation',
        colWidths: 195,
        //... other options
      }

      return (
        <div className="row" style={{float:"left"}}>
           
          <div className="column" style={{marginLeft:"300px"}}>

            <div id="hot-app">
              <HotTable
                data={this.state.typesData}
                colHeaders={true}
                rowHeaders={true}
                width="675"
                height="500"
                settings={typesSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Code"}, { data: "Name"}, {data: "Weight", type:"numeric"}]}
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
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowTypes()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesTypes()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
            </div>
          </div>
         
          <div className="column" style={{marginLeft:"20px"}}>
            <div id="hot-app">
              <HotTable
                data={this.state.progressData}
                colHeaders={true}
                rowHeaders={true}
                width="465"
                height="500"
                settings={progressSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Week", type:"numeric"}, {data: "Estimated", type:"numeric"}]}
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
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowProgress()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesProgress()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
              <br></br>
            </div>
          </div>
      </div>
      );
  }
}

export default CivilExcel;