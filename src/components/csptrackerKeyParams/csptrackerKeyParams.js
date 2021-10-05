import React from 'react';
import 'antd/dist/antd.css';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.css';

class CSPTrackerKeyParams extends React.Component{
  state = {
    searchText: '',
    searchedColumn: '',
    ratingData: [],
    specData: [],
    endPreparationData: [],
    boltTypesData: [],
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

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker/ratings", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      for(let i = 0; i < json.rows.length; i++){

          row = {"Name": json.rows[i].rating}
          rows.push(row)
      }
      this.setState({ratingData : rows, selectedRows: []});

    }) 

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker/specs", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      for(let i = 0; i < json.rows.length; i++){

          row = {"Name": json.rows[i].spec}
          rows.push(row)
      }
      this.setState({specData : rows, selectedRows: []});

    }) 

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker/endPreparations", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      for(let i = 0; i < json.rows.length; i++){

          row = {"Name": json.rows[i].state}
          rows.push(row)
      }
      this.setState({endPreparationData : rows, selectedRows: []});

    })
    
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/csptracker/boltTypes", options)
    .then(response => response.json())
    .then(json => {
      var rows = []
      var row = null
      for(let i = 0; i < json.rows.length; i++){

          row = {"Name": json.rows[i].type}
          rows.push(row)
      }
      this.setState({boltTypesData : rows, selectedRows: []});

    }) 
  }

  addRowRatings(){
    let rows = this.state.ratingData
    rows.push({"Name":""})
    this.setState({ratingData: rows})
  }
  
  submitChangesTypes(){
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
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/equipments/types", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

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
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/equipments/steps", options)
    .then(response => response.json())
    .then(json =>{

    })
    this.props.success()
  }

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
    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/submit/equipments/progress", options)
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
                data={this.state.ratingData}
                colHeaders = {["<b>RATINGS</b>"]}
                rowHeaders={true}
                width="250"
                height="470"
                settings={stepsSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Name"}]}
              />
              <br></br>
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowRatings()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesRatings()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
            </div>
          </div>
          <div className="column" style={{marginLeft:"170px"}}>

            <div id="hot-app">
              <HotTable
                data={this.state.specData}
                colHeaders = {["<b>SPECS</b>"]}
                rowHeaders={true}
                width="250"
                height="470"
                settings={typesSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Name"}]}
              />
              <br></br>
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowSpecs()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesSpecs()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
            </div>
          </div>
         
          <div className="column" style={{marginLeft:"170px"}}>
            <div id="hot-app">
              <HotTable
                data={this.state.endPreparationData}
                colHeaders = {["<b>END PREPARATIONS</b>"]}
                rowHeaders={true}
                width="250"
                height="470"
                settings={progressSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Name"}]}
              />
              <br></br>
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowEndPreparations()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesEndPreparations()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
              <br></br>
            </div>
          </div>
          <div className="column" style={{marginLeft:"170px"}}>

            <div id="hot-app">
              <HotTable
                data={this.state.boltTypesData}
                colHeaders = {["<b>BOLT TYPES</b>"]}
                rowHeaders={true}
                width="250"
                height="470"
                settings={typesSettings} 
                manualColumnResize={true}
                manualRowResize={true}
                columns= {[{ data: "Name"}]}
              />
              <br></br>
              <center>
                  <button class="btn btn-sm btn-info" onClick={() => this.addRowBoltTypes()} style={{marginRight:"5px", fontSize:"16px",width:"60px", borderRadius:"10px"}}>Add</button>
                  <button class="btn btn-sm btn-success" onClick={() => this.submitChangesBoltTypes()} style={{marginRight:"5px", fontSize:"16px", width:"60px", borderRadius:"10px"}}>Save</button>
              </center>
            </div>
          </div>
      </div>
      );
  }
}

export default CSPTrackerKeyParams;