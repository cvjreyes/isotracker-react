import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import '../uploadReportPopUp/uploadReportPopUp.css'
import readXlsxFile from 'read-excel-file'
import { readString } from 'react-papaparse'

export default class UpdateDrawingPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            file: null,
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.uploadReport = this.uploadReport.bind(this);
        this.id = props.id;
        
    }
   

    openModal() {      
        this.setState({
            visible : true,
            error: false,
            file: null
        });
    }

    closeModal() {
        document.getElementById("fileToUpload").value = null
        this.setState({
            visible : false,
            file: null,
        });
    }

    async handleChange(event){
        await this.setState({file: event.target.files[0]})
    }

    async uploadReport(){
        const extension = this.state.file.name.split('.').pop();
        const fileName = this.props.description_plan_code + "." + extension
        const file  = new FormData(); 
        file.append('file', this.state.file, fileName);
        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/updateDrawing", {
            method: 'POST',
            body: file,
            })
            .then(response =>{
                if (response.status !== 200){
                    console.log("ya existe")
                }else{
                    this.setState({
                        file: null,
                        error: false
                    })
                }
 
            })

        this.closeModal()
    }

    render() {
        return (
            <section style={{float:"right"}}>
                <input type="button"  value="UPDATE" class="update__btn btn-sm btn-info"  onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="180" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="popUp__container" >
                            <center className="popUp__title"><h2>Update the drawing for {this.props.description_plan_code}</h2></center>
                                
                        </div>
                        <div className="select__container">

                            <input type="file" accept=".pdf,.png" name="fileToUpload" id="fileToUpload" onChange={this.handleChange}/>
                            <button style={{marginLeft:"10px"}} className="btn btn-sm btn-success" onClick={()=>this.uploadReport()}>Submit</button>
                            
                        </div> 

                        
                    </Modal>
                </div>
            </section>
        );
    }
}