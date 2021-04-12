import { CenterFocusStrong, TransferWithinAStationSharp } from '@material-ui/icons';
import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SecureStorage from 'secure-web-storage';
import './uploadProcInst.css'

export default class UploadProcInst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            file : null,
            role: this.props.role,
            user: this.props.currentUser
        }
        this.id = props.id;

    }
   
    onFileChange = event => {

        this.setState({ file: event.target.files[0]});
    };

    async accept(){
        console.log(this.id[0] + '.pdf', this.state.file.name)
        if(this.id[0] + '.pdf' === this.state.file.name){
            const file  = new FormData(); 
            file.append('file', this.state.file); 
            
            const body = {
                file: file,
                action: "accept",
                user: this.state.user
            }
    
            await fetch('http://localhost:5000/uploadProcInst', {
                // content-type header should not be specified!
                method: 'POST',
                body: body,
            })
            .then(response => {
                // Do something with the successful response
                this.setState({
                    file: null
                })
                this.closeModal()
            })
            .catch(error => console.log(error)
            );
        }else{
            console.log("No pertenece")
        }
        
    }

    async deny(){

    }

    openModal() {      
        this.setState({
            visible : true,
        });
    }

    closeModal() {
        this.setState({
            visible : false,
        });
    }

    render() {
        return (
            <section>
                <input type="button"  value="UPLOAD" className="btn btn-warning"  style={{fontSize:"12px", padding:"2px 5px 2px 5px", backgroundColor:"#B0E0E6", borderColor:"#B0E0E6", width:"100px", float:"left"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="400" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <button onClick={() => this.closeModal()} style={{marginTop:"5px", fontSize:"16px", position:"absolute", right:"10px", backgroundColor:"transparent", border:"None"}}>X</button>

                        <div className="popUpP__container" >

                            <center className="popUpP__title"><h1>{this.id}</h1></center>
                            <form>
                                <div class="form-group">
                                    <center>
                                        <input type="file" onChange={this.onFileChange} className="inputFile__container" id="exampleFormControlFile1"></input>
                                    </center>
                                </div>
                            </form>
                        </div>
                        <center className="popUpP__warning__title">***WARNING!*** This action may replace the current appended file. Take appropiate cautions.</center>
                        <center className="popUpP__warning__subtitle">If you are not sure of this action, click cancel and contact your supervisor.</center>
                        <div className="popUpP__buttons__container">
                            <button class="btn btn-sm btn-success" onClick={() => this.accept()} style={{marginRight:"5px", fontSize:"16px"}}>Accept</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.deny()} style={{marginRight:"5px", fontSize:"16px"}}>Deny</button>
                        </div>
                    </Modal>
                </div>
            </section>
        );
    }
}