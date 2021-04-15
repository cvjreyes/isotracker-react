import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './uploadPopUp.css'
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"

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
            <section >
                <input type="button"  value="UPLOAD" className="btn btn-warning"  style={{fontSize:"12px", padding:"2px 5px 2px 5px", backgroundColor:"#B0E0E6", borderColor:"#B0E0E6", width:"100px", float:"left", marginRight: "5px"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="popUp__container" >
                            <center className="popUp__title"><h1>{this.id}</h1></center>
                                
                        </div>
                        <div className="dnd__container">
                            <DragAndDrop mode="update" iso={this.id} user={this.props.currentUser} reset={true}/>
                        </div> 
                        <center className="popUp__warning__title">***WARNING!*** This action will replace the current(s) file(s). Take appropiate cautions.</center>
                        <center className="popUp__warning__subtitle">If you are not sure of this action, click cancel and contact your supervisor.</center>
                        <div className="popUp__buttons__container">
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginRight:"5px", fontSize:"16px"}}>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </section>
        );
    }
}