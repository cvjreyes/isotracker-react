import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import ChooseFile from '../chooseFile/chooseFile';
import './uploadPopUp.css'

export default class UploadPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
        this.id = props.id;
    }

   

    openModal() {
        this.setState({
            visible : true
        });
    }

    closeModal() {
        this.setState({
            visible : false
        });
    }

    render() {
        return (
            <section >
                <input type="button"  value="UPLOAD" className="btn btn-warning"  style={{fontSize:"12px", padding:"2px 5px 2px 5px", backgroundColor:"#B0E0E6", borderColor:"#B0E0E6"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="popUp__container" >
                            <center className="popUp__title"><h1>{this.id}</h1></center>
                            <div className="popUp__superior__container">
                                <label className="popUp__label_master">Master PDF</label>
                                <div className="chooseFile__container" >
                                    <ChooseFile/>
                                </div>   
                            </div>
                            <center className="popUp__subtitle">Attachments</center>
                            <div className="popUp__inferior__container">           
                                <label className="popUp__label_clean">Clean PDF</label>
                                <div className="chooseFile__container" >
                                    <ChooseFile/>
                                </div>
                            </div>
                                <div className="popUp__inferior__container2">
                                    <label className="popUp__label_zip">ZIP</label>
                                    <div className="chooseFile__container" >
                                        <ChooseFile/>
                                    </div>  
                                </div> 
                            </div>
                            <center className="popUp__warning__title">***WARNING!*** This action will replace the current(s) file(s). Take appropiate cautions.</center>
                            <center className="popUp__warning__subtitle">If you are not sure of this action, click cancel and contact your supervisor.</center>
                            <center className="popUp__buttons__container">
                                <button class="btn btn-sm btn-primary" style={{marginRight:"5px", fontSize:"16px"}}>Upload</button>
                                <button class="btn btn-sm btn-danger" style={{marginRight:"5px", fontSize:"16px"}}>Cancel</button>
                            </center>
                    </Modal>
                </div>
            </section>
        );
    }
}