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
    displayData: [],
    filterData: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    tab: this.props.currentTab,
    selectedRows: [],
    selectedRowsKeys: [],
    updateData: this.props.updateData,
    username: "",
    acronyms : null,
    steps: [],
    filters: []
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

  async deleteSP(tag){
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

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/deleteSP", options)
      .then(response => response.json())
      .then(
        this.props.updateDataMethod()
      )
  }
  
  async excludeSP(tag){
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

    fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/excludeSP", options)
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
          console.log(json.rows[1])
          if(process.env.REACT_APP_MMDN === "1"){
            for(let i = 0; i < json.rows.length; i++){
              row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_nps, p2bore: json.rows[i].p2diameter_nps, p3bore: json.rows[i].p3diameter_nps, rating: json.rows[i].rating, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments, pid: json.rows[i].pid, line_id: json.rows[i].line_id, requisition: json.rows[i].requisition, equipnozz: json.rows[i].equipnozz, utility_station: json.rows[i].utility_station, request_date: json.rows[i].request_date.toString().substring(0,10) + " "+ json.rows[i].request_date.toString().substring(11,19)}

              if(json.rows[i].ready_load_date){
                row.ready_load_date = json.rows[i].ready_load_date.toString().substring(0,10) + " "+ json.rows[i].ready_load_date.toString().substring(11,19)
              }else{
                row.ready_load_date = ""
              }

              if(json.rows[i].ready_e3d_date){
                row.ready_e3d_date = json.rows[i].ready_e3d_date.toString().substring(0,10) + " "+ json.rows[i].ready_e3d_date.toString().substring(11,19)
              }else{
                row.ready_e3d_date = ""
              }

              if(json.rows[i].drawing_filename !== null && json.rows[i].drawing_filename !== "" && row.description_plane !== null && row.description_plane !== ""){
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
              
              if(json.rows[i].updated === 2){
                row.ready_load = "DELETED"
                row.ready_e3d = "DELETED"
                row.color = "#rrr"
              }else if(json.rows[i].ready_e3d === 2){
                row.ready_load = "READY"
                row.ready_e3d = "EXCLUDED"
                row.color = "#lll"
              }else{

                if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1 && json.rows[i].ready_e3d === 0){
                  row.ready_load = "UPDATED"
                  row.color = "#yyy"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                    }
                  }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null ){
                    row.ready_load = "READY"
                  if(row.ready_e3d === 1){
                    if(json.rows[i].updated === 0){
                      row.color = "#ggg"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                      }else{
                        row.ready_e3d = "READY"
                        row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                      }
                    }else{
                      row.color = "#bbb"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                      }else{
                        row.ready_e3d = "READY"
                        row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                      }
                    }
                    
                  }else{
                    row.color = "#yyy"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                      row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button><button class="csp_exclude_btn btn-sm btn-danger" onClick={() => this.excludeSP(json.rows[i].tag)}>EXCLUDE 3D</button></div>
                    }
                  }
                  
                }else{
                  row.ready_load = "NOT READY"
                  row.color = "white"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                  }else{
                    row.ready_e3d = "NOT READY"
                    row.ready_load = <div>NOT READY<button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                  }
                }
              }
              

              for (const [key, value] of Object.entries(row)) {
                if(!value){
                  row[key] = ""
                }
              }

              if(json.rows[i].type){
                row.type = <b>{json.rows[i].type}</b>
              }else{
                <b> </b>
              }

              if(json.rows[i].tag){
                row.tag = <b>{json.rows[i].tag}</b>
              }else{
                <b> </b>
              }

              rows.push(row)
            }
          }else{
            for(let i = 0; i < json.rows.length; i++){
              row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_dn, p2bore: json.rows[i].p2diameter_dn, p3bore: json.rows[i].p3diameter_dn, rating: json.rows[i].rating, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments, pid: json.rows[i].pid, line_id: json.rows[i].line_id, requisition: json.rows[i].requisition, equipnozz: json.rows[i].equipnozz, utility_station: json.rows[i].utility_station, request_date: json.rows[i].request_date.toString().substring(0,10) + " "+ json.rows[i].request_date.toString().substring(11,19)}

              if(json.rows[i].ready_load_date){
                row.ready_load_date = json.rows[i].ready_load_date.toString().substring(0,10) + " "+ json.rows[i].ready_load_date.toString().substring(11,19)
              }else{
                row.ready_load_date = ""
              }

              if(json.rows[i].ready_e3d_date){
                row.ready_e3d_date = json.rows[i].ready_e3d_date.toString().substring(0,10) + " "+ json.rows[i].ready_e3d_date.toString().substring(11,19)
              }else{
                row.ready_e3d_date = ""
              }
              
              if(!json.rows[i].type){
                row.type = ""
              }

              if(json.rows[i].drawing_filename !== null && json.rows[i].drawing_filename !== "" && row.description_plane !== null && row.description_plane !== ""){
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

              if(json.rows[i].updated === 2){
                row.ready_load = "DELETED"
                row.ready_e3d = "DELETED"
                row.color = "#rrr"
              }else if(json.rows[i].ready_e3d === 2){
                row.ready_load = "READY"
                row.ready_e3d = "EXCLUDED"
                row.color = "#lll"
              }else{

                if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1 && json.rows[i].ready_e3d === 0){
                  row.ready_load = "UPDATED"
                  row.color = "#yyy"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                    }
                  }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null ){
                    row.ready_load = "READY"
                  if(row.ready_e3d === 1){
                    if(json.rows[i].updated === 0){
                      row.color = "#ggg"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                      }else{
                        row.ready_e3d = "READY"
                        row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                      }
                    }else{
                      row.color = "#bbb"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                      }else{
                        row.ready_e3d = "READY"
                        row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                      }
                    }
                    
                  }else{
                    row.color = "#yyy"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                      row.ready_load = <div style={{display:"inline-block"}}>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button><button class="csp_exclude_btn btn-sm btn-danger" onClick={() => this.excludeHold(json.rows[i].tag)}>EXCLUDE 3D</button></div>
                    }
                  }
                  
                }else{
                  row.ready_load = "NOT READY"
                  row.color = "white"
                  if(this.props.currentRole === "3D Admin"){
                    row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                  }else{
                    row.ready_e3d = "NOT READY"
                    row.ready_load = <div>NOT READY<button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                  }
                }
              }
              
              for (const [key, value] of Object.entries(row)) {
                if(!value){
                  row[key] = ""
                }
              }

              if(json.rows[i].tag){
                row.tag = <b>{json.rows[i].tag}</b>
              }else{
                <b> </b>
              }
              
              if(json.rows[i].type){
                row.type = <b>{json.rows[i].type}</b>
              }else{
                <b> </b>
              }


              rows.push(row)
            }
          }
          
          this.setState({data: rows, displayData: rows})
          
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
            if(process.env.REACT_APP_MMDN === "1"){
              for(let i = 0; i < json.rows.length; i++){
                row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_nps, p2bore: json.rows[i].p2diameter_nps, p3bore: json.rows[i].p3diameter_nps, rating: json.rows[i].rating, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments, pid: json.rows[i].pid, line_id: json.rows[i].line_id, requisition: json.rows[i].requisition, equipnozz: json.rows[i].equipnozz, utility_station: json.rows[i].utility_station, request_date: json.rows[i].request_date.toString().substring(0,10) + " "+ json.rows[i].request_date.toString().substring(11,19)}

                if(json.rows[i].ready_load_date){
                  row.ready_load_date = json.rows[i].ready_load_date.toString().substring(0,10) + " "+ json.rows[i].ready_load_date.toString().substring(11,19)
                }else{
                  row.ready_load_date = ""
                }

                if(json.rows[i].ready_e3d_date){
                  row.ready_e3d_date = json.rows[i].ready_e3d_date.toString().substring(0,10) + " "+ json.rows[i].ready_e3d_date.toString().substring(11,19)
                }else{
                  row.ready_e3d_date = ""
                }

                if(!json.rows[i].type){
                  row.type = ""
                }
                
                if(json.rows[i].drawing_filename !== null && json.rows[i].drawing_filename !== "" && row.description_plane !== null && row.description_plane !== ""){
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
                

                if(json.rows[i].updated === 2){
                  row.ready_load = "DELETED"
                  row.ready_e3d = "DELETED"
                  row.color = "#rrr"
                }else if(json.rows[i].ready_e3d === 2){
                  row.ready_load = "READY"
                  row.ready_e3d = "EXCLUDED"
                  row.color = "#lll"
                }else{
  
                  if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1 && json.rows[i].ready_e3d === 0){
                    row.ready_load = "UPDATED"
                    row.color = "#yyy"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                      }else{
                        row.ready_e3d = "NOT READY"
                      }
                    }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null ){
                      row.ready_load = "READY"
                    if(row.ready_e3d === 1){
                      if(json.rows[i].updated === 0){
                        row.color = "#ggg"
                        if(this.props.currentRole === "3D Admin"){
                          row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                        }else{
                          row.ready_e3d = "READY"
                          row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                        }
                      }else{
                        row.color = "#bbb"
                        if(this.props.currentRole === "3D Admin"){
                          row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                        }else{
                          row.ready_e3d = "READY"
                          row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                        }
                      }
                      
                    }else{
                      row.color = "#yyy"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                      }else{
                        row.ready_e3d = "NOT READY"
                        row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button><button class="csp_exclude_btn btn-sm btn-danger" onClick={() => this.excludeSP(json.rows[i].tag)}>EXCLUDE 3D</button></div>
                      }
                    }
                    
                  }else{
                    row.ready_load = "NOT READY"
                    row.color = "white"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                      row.ready_load = <div>NOT READY<button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                    }
                  }
                }

                for (const [key, value] of Object.entries(row)) {
                  if(!value){
                    row[key] = ""
                  }
                }
                if(json.rows[i].tag){
                  row.tag = <b>{json.rows[i].tag}</b>
                }else{
                  <b> </b>
                }
                
                if(json.rows[i].type){
                  row.type = <b>{json.rows[i].type}</b>
                }else{
                  <b> </b>
                }

                rows.push(row)
              }
            }else{
              for(let i = 0; i < json.rows.length; i++){
                row = {key:i, tag: json.rows[i].tag, quantity: json.rows[i].quantity, type: json.rows[i].type, description: json.rows[i].description, description_plane: json.rows[i].description_plan_code, description_iso: json.rows[i].description_iso, ident: json.rows[i].ident, p1bore: json.rows[i].p1diameter_dn, p2bore: json.rows[i].p2diameter_dn, p3bore: json.rows[i].p3diameter_dn, rating: json.rows[i].rating, end_preparation: json.rows[i].end_preparation, spec: json.rows[i].spec, descrition_plane: json.rows[i].description_drawing, face_to_face: json.rows[i].face_to_face, bolts_type: json.rows[i].bolt_type, ready_load: json.rows[i].ready_load, ready_e3d: json.rows[i].ready_e3d, comments: json.rows[i].comments, pid: json.rows[i].pid, line_id: json.rows[i].line_id, requisition: json.rows[i].requisition, equipnozz: json.rows[i].equipnozz, utility_station: json.rows[i].utility_station, request_date: json.rows[i].request_date.toString().substring(0,10) + " "+ json.rows[i].request_date.toString().substring(11,19)}
                
                if(json.rows[i].ready_load_date){
                  row.ready_load_date = json.rows[i].ready_load_date.toString().substring(0,10) + " "+ json.rows[i].ready_load_date.toString().substring(11,19)
                }else{
                  row.ready_load_date = ""
                }

                if(json.rows[i].ready_e3d_date){
                  row.ready_e3d_date = json.rows[i].ready_e3d_date.toString().substring(0,10) + " "+ json.rows[i].ready_e3d_date.toString().substring(11,19)
                }else{
                  row.ready_e3d_date = ""
                }
                
                if(json.rows[i].drawing_filename !== null && json.rows[i].drawing_filename !== "" && row.description_plane !== null && row.description_plane !== ""){
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

                if(json.rows[i].updated === 2){
                  row.ready_load = "DELETED"
                  row.ready_e3d = "DELETED"
                  row.color = "#rrr"
                }else if(json.rows[i].ready_e3d === 2){
                  row.ready_load = "READY"
                  row.ready_e3d = "EXCLUDED"
                  row.color = "#lll"
                }else{
  
                  if(row.ready_load === 1 && json.rows[i].drawing_filename !== null && json.rows[i].updated === 1 && json.rows[i].ready_e3d === 0){
                    row.ready_load = "UPDATED"
                    row.color = "#yyy"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                      }else{
                        row.ready_e3d = "NOT READY"
                      }
                    }else if(row.ready_load === 1 && json.rows[i].drawing_filename !== null ){
                      row.ready_load = "READY"
                    if(row.ready_e3d === 1){
                      if(json.rows[i].updated === 0){
                        row.color = "#ggg"
                        if(this.props.currentRole === "3D Admin"){
                          row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                        }else{
                          row.ready_e3d = "READY"
                          row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                        }
                      }else{
                        row.color = "#bbb"
                        if(this.props.currentRole === "3D Admin"){
                          row.ready_e3d = <button class="csp__cancel__btn btn-sm btn-danger" onClick={() => this.cancelReadyE3D(json.rows[i].tag)}>CANCEL</button>
                        }else{
                          row.ready_e3d = "READY"
                          row.ready_load = <div>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                        }
                      }
                      
                    }else{
                      row.color = "#yyy"
                      if(this.props.currentRole === "3D Admin"){
                        row.ready_e3d = <button class="ready__btn btn-sm btn-success" onClick={() => this.readyE3D(json.rows[i].tag)}>READY</button>
                      }else{
                        row.ready_e3d = "NOT READY"
                        row.ready_load = <div style={{display:"inline-block"}}>READY <button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button><button class="csp_exclude_btn btn-sm btn-warning" onClick={() => this.excludeSP(json.rows[i].tag)}>EXCLUDE 3D</button></div>
                      }
                    }
                    
                  }else{
                    row.ready_load = "NOT READY"
                    row.color = "white"
                    if(this.props.currentRole === "3D Admin"){
                      row.ready_e3d = <button disabled class="ready__disabled btn-sm btn-success">READY</button>
                    }else{
                      row.ready_e3d = "NOT READY"
                      row.ready_load = <div>NOT READY<button class="csp_delete_btn btn-sm btn-danger" onClick={() => this.deleteSP(json.rows[i].tag)}>DELETE</button></div>
                    }
                  }
                }
                  for (const [key, value] of Object.entries(row)) {
                    if(!value){
                      row[key] = ""
                    }
                  }
                  
                  if(json.rows[i].tag){
                    row.tag = <b>{json.rows[i].tag}</b>
                  }else{
                    <b> </b>
                  }
                  
                  if(json.rows[i].type){
                    row.type = <b>{json.rows[i].type}</b>
                  }else{
                    <b> </b>
                  }

                rows.push(row)
              }
            }
            await this.setState({data: rows})
            let auxDisplayData = this.state.data
            let resultData = []
            let fil, exists = null
            for(let i = 0; i < auxDisplayData.length; i++){
              exists = true
              for(let column = 0; column < Object.keys(auxDisplayData[i]).length-2; column ++){
                fil = Object.keys(auxDisplayData[i])[column+1]
                if(this.props.currentRole === "3D Admin"){
                  if(fil === "tag" || fil === "type" || fil === "ready_e3d"){
                    if(!auxDisplayData[i][fil].props && this.state.filterData[column]){
                      exists = false
                    }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
                      exists = false
                    }   
                  }else{
                    if(auxDisplayData[i][fil]){
                      if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].toString().includes(this.state.filterData[column])){
                        exists = false
                      }
                    }else if(this.state.filterData[column]){
                      exists = false
                    }
                
                  }
                }else{
                  if(fil === "tag" || fil === "type"){
                    if(!auxDisplayData[i][fil].props && this.state.filterData[column]){
                      exists = false
                    }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
                      exists = false
                    }          
                  }else{
                    if(auxDisplayData[i][fil]){
                      if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].toString().includes(this.state.filterData[column])){
                        exists = false
                      }
                    }else if(this.state.filterData[column]){
                      exists = false
                    }
                
                  }
                }
              }
                
              if(exists){
                resultData.push(auxDisplayData[i])
              }
            }
            await this.setState({displayData: resultData})
                    
                  })
                  .catch(error => {
                      console.log(error);
                  })       
              }

  }


  async filter(column, value){
    let fd = this.state.filterData
    fd[column] = value
    await this.setState({filterData: fd})

    let auxDisplayData = this.state.data
    let resultData = []
    let fil, exists = null
    for(let i = 0; i < auxDisplayData.length; i++){
      exists = true
      for(let column = 0; column < Object.keys(auxDisplayData[i]).length-2; column ++){
        fil = Object.keys(auxDisplayData[i])[column+1]
        if(this.props.currentRole === "3D Admin"){
          if(fil === "tag" || fil === "type" || fil === "ready_e3d"){
            if(!auxDisplayData[i][fil].props && this.state.filterData[column]){
              exists = false
            }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
              exists = false
            }   
          }else{
            if(auxDisplayData[i][fil]){
              console.log(auxDisplayData[i][fil])
              if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].toString().includes(this.state.filterData[column])){
                exists = false
              }
            }else if(this.state.filterData[column]){
              exists = false
            }
        
          }
        }else{
          if(fil === "tag" || fil === "type"){
            if(!auxDisplayData[i][fil].props && this.state.filterData[column]){
              exists = false
            }else if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].props.children.includes(this.state.filterData[column])){
              exists = false
            }          
          }else{
            if(auxDisplayData[i][fil]){
              console.log(auxDisplayData[i][fil])
              if(this.state.filterData[column] !== "" && this.state.filterData[column] && !auxDisplayData[i][fil].toString().includes(this.state.filterData[column])){
                exists = false
              }
            }else if(this.state.filterData[column]){
              exists = false
            }
        
          }
        }
      }
        
      if(exists){
        resultData.push(auxDisplayData[i])
      }
    }
    await this.setState({displayData: resultData})
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


      
    record[dataIndex].props ? record[dataIndex].props.children.toString().toLowerCase().includes(value.toLowerCase()) :
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
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="TAG" style={{textAlign:"center"}} onChange={(e) => this.filter(0, e.target.value)}/></center>,
        dataIndex: 'tag',
        key: 'tag',
        ...this.getColumnSearchProps('tag'),
        fixed: "left",
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Type" style={{textAlign:"center"}} onChange={(e) => this.filter(2, e.target.value)}/></div>,
        dataIndex: 'type',
        key: 'type',
        ...this.getColumnSearchProps('type'),
        fixed: "left",
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Spec" style={{textAlign:"center"}} onChange={(e) => this.filter(12, e.target.value)}/></div>,
        dataIndex: 'spec',
        key: 'spec',
        ...this.getColumnSearchProps('spec'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="P1Bore" style={{textAlign:"center"}} onChange={(e) => this.filter(7, e.target.value)}/></div>,
        dataIndex: 'p1bore',
        key: 'p1bore',
        ...this.getColumnSearchProps('p1bore'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="P2Bore" style={{textAlign:"center"}} onChange={(e) => this.filter(8, e.target.value)}/></div>,
        dataIndex: 'p2bore',
        key: 'p2bore',
        ...this.getColumnSearchProps('p2bore'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="P3Bore" style={{textAlign:"center"}} onChange={(e) => this.filter(9, e.target.value)}/></div>,
        dataIndex: 'p3bore',
        key: 'p3bore',
        ...this.getColumnSearchProps('p3bore'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Rating" style={{textAlign:"center"}} onChange={(e) => this.filter(10, e.target.value)}/></div>,
        dataIndex: 'rating',
        key: 'rating',
        ...this.getColumnSearchProps('rating'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="End Preparation" style={{textAlign:"center"}} onChange={(e) => this.filter(11, e.target.value)}/></div>,
        dataIndex: 'end_preparation',
        key: 'end_preparation',
        ...this.getColumnSearchProps('end_preparation'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Line ID" style={{textAlign:"center"}} onChange={(e) => this.filter(20, e.target.value)}/></div>,
        dataIndex: 'line_id',
        key: 'line_id',
        ...this.getColumnSearchProps('line_id'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="P&ID" style={{textAlign:"center"}} onChange={(e) => this.filter(19, e.target.value)}/></div>,
        dataIndex: 'pid',
        key: 'pid',
        ...this.getColumnSearchProps('pid'),
        align: "center"
      },
      
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Drawing Description" style={{textAlign:"center"}} onChange={(e) => this.filter(4, e.target.value)}/></div>,
        dataIndex: 'description_plane',
        key: 'description_plane',
        ...this.getColumnSearchProps('description_plane'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Drawing" style={{textAlign:"center"}} onChange={(e) => this.filter(13, e.target.value)}/></div>,
        dataIndex: 'drawing',
        key: 'drawing',
        width: "400px",
        align: "center"
      },
      
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Quantity" style={{textAlign:"center"}} onChange={(e) => this.filter(1, e.target.value)}/></center>,
        dataIndex: 'quantity',
        key: 'quantity',
        ...this.getColumnSearchProps('quantity'),
        align: "center"
      },    
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Requisition" style={{textAlign:"center"}} onChange={(e) => this.filter(21, e.target.value)}/></center>,
        dataIndex: 'requisition',
        key: 'requisition',
        ...this.getColumnSearchProps('requisition'),
        align: "center"
      }, 
      {
        title: <center className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Description" style={{textAlign:"center"}} onChange={(e) => this.filter(3, e.target.value)}/></center>,
        dataIndex: 'description',
        key: 'description',
        ...this.getColumnSearchProps('description'),
        width: "400px",
        ellipsis:true
      },
      
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="ISO Description" style={{textAlign:"center"}} onChange={(e) => this.filter(5, e.target.value)}/></div>,
        dataIndex: 'description_iso',
        key: 'description_iso',
        ...this.getColumnSearchProps('description_iso'),
        width: "400px",
        ellipsis:true
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Ident" style={{textAlign:"center"}} onChange={(e) => this.filter(6, e.target.value)}/></div>,
        dataIndex: 'ident',
        key: 'ident',
        ...this.getColumnSearchProps('ident'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Face to Face" style={{textAlign:"center"}} onChange={(e) => this.filter(14, e.target.value)}/></div>,
        dataIndex: 'face_to_face',
        key: 'face_to_face',
        ...this.getColumnSearchProps('face_to_face'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="FLG Short Code" style={{textAlign:"center"}} onChange={(e) => this.filter(15, e.target.value)}/></div>,
        dataIndex: 'bolts_type',
        key: 'bolts_type',
        ...this.getColumnSearchProps('bolts_type'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Equipment + Nozzle" style={{textAlign:"center"}} onChange={(e) => this.filter(22, e.target.value)}/></div>,
        dataIndex: 'equipnozz',
        key: 'equipnozz',
        ...this.getColumnSearchProps('equipnozz'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Utility Station" style={{textAlign:"center"}} onChange={(e) => this.filter(23, e.target.value)}/></div>,
        dataIndex: 'utility_station',
        key: 'utility_station',
        ...this.getColumnSearchProps('utility_station'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Request Update" style={{textAlign:"center"}} onChange={(e) => this.filter(24, e.target.value)}/></div>,
        dataIndex: 'request_date',
        key: 'request_date',
        ...this.getColumnSearchProps('request_date'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Ready to load date" style={{textAlign:"center"}} onChange={(e) => this.filter(25, e.target.value)}/></div>,
        dataIndex: 'ready_load_date',
        key: 'ready_load_date',
        ...this.getColumnSearchProps('ready_load_date'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Ready in 3D date" style={{textAlign:"center"}} onChange={(e) => this.filter(26, e.target.value)}/></div>,
        dataIndex: 'ready_e3d_date',
        key: 'ready_e3d_date',
        ...this.getColumnSearchProps('ready_e3d_date'),
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Comments" style={{textAlign:"center"}} onChange={(e) => this.filter(18, e.target.value)}/></div>,
        dataIndex: 'comments',
        key: 'comments',
        ...this.getColumnSearchProps('comments'),
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Ready to load" style={{textAlign:"center"}} onChange={(e) => this.filter(16, e.target.value)}/></div>,
        dataIndex: 'ready_load',
        key: 'ready_load',
        ...this.getColumnSearchProps('ready_load'),
        fixed: "right",
        align: "center"
      },
      {
        title: <div className="dataTable__header__text"><input  type="text" className="filter__input" placeholder="Ready in 3D" style={{textAlign:"center"}} onChange={(e) => this.filter(17, e.target.value)}/></div>,
        dataIndex: 'ready_e3d',
        key: 'ready_e3d',
        ...this.getColumnSearchProps('ready_e3d'),
        fixed: "right",
        align: "center"
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
        <div className="estimatedDataTable__container" style={{width:"auto"}}>
        <Table className="customTable" bordered = {true} columns={columns} dataSource={this.state.displayData} pagination={{disabled:true, defaultPageSize:5000}} size="small"
         rowClassName= {(record) => record.color.replace('#', '')} scroll={{x:8000, y: 437}}/>
          {totalElements}
        </div>
        
      </div>
    );
  }
}

export default CSPTrackerdDataTable;