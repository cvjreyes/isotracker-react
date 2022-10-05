import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import '../uploadReportPopUp/uploadReportPopUp.css'

export default class UploadBOMPopUp extends Component {
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

    handleChange(event){
        this.setState({file: event.target.files[0]})
    }

    async uploadReport(event){
        event.preventDefault()
        this.props.setUploading(true)
        //Subimos el excel de la bom table
        if(this.state.file.name.substring(this.state.file.name.length-4, this.state.file.name.length) === "xlsx"){
            const formData  = new FormData(); 
            formData.append('file', this.state.file, "marian.xlsx");
            const options = {
                method: "POST",
                body: formData
            }
            await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/updateBOM", options)
            .then(response => response.json())
            .then(async json =>{
                if(json.invalid){
                    this.props.setErrorReportData(json.invalid)
                }
            })
            
        }else{

        }
        this.closeModal()
        this.props.setUploading(false)
    }

    render() {
        return (
            <section style={{float:"left"}}>
                <input type="button"  value="Upload BOM" style={{marginTop:"10px",marginLeft:"10px", height:"150px", width:"150px"}} className="btn btn-bg btn-info"  onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="180" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="popUp__container" >
                            <center className="popUp__title"><h2>Upload BOM report</h2></center>
                                
                        </div>
                        <div className="select__container">
                            <form onSubmit={this.uploadReport}>
                                <input type="file" name="fileToUpload" id="fileToUpload" onChange={this.handleChange}/>
                                <input type="submit" style={{marginLeft:"10px"}} className="btn btn-sm btn-success" value="Upload"/>
                            </form>
                        </div> 

                        
                    </Modal>
                </div>
            </section>
        );
    }
}