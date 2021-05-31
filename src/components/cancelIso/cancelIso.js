import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './cancelIso.css'

export default class CancelIso extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
        this.user = props.user;
        this.role = props.role;
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

    return(){
        const tray = document.getElementById("tray").value
        const comments = document.getElementById("comments").value
        this.props.returnIso(tray, comments)
        this.closeModal()
    }

    render() {
        var trayHeader, traySelect
        console.log(this.props.role)
        trayHeader = <h4 className="cancel__header__tray">Tray</h4>
        if(this.props.role === "SpecialityLead"){
            traySelect = <select className="destination__select" id="tray"><option value="Design" selected="selected">Design</option><option value="Stress">Stress</option><option value="Supports">Supports</option><option value="Materials">Materials</option><option value="Issuer">Issuer</option></select>
        }else if(this.props.role === "Supports"){
            traySelect = <select className="destination__select" id="tray"><option value="Design" selected="selected">Design</option><option value="Stress">Stress</option></select>
        }else if(this.props.role === "Materials"){
            traySelect = <select className="destination__select" id="tray"><option value="Design" selected="selected">Design</option><option value="Stress">Stress</option><option value="Supports">Supports</option></select>
        }else if(this.props.role === "Issuer"){
            traySelect = <select className="destination__select" id="tray"><option value="Design" selected="selected">Design</option><option value="Stress">Stress</option><option value="Supports">Supports</option><option value="Materials">Materials</option></select>
        }
        
        return (
            <div style={{marginRight:"5px", marginLeft:"5px", float:"right"}}>
                <button class="btn btn-sm" style={{backgroundColor: "grey", color:"white", width:"110px", height:"32px", marginTop:"1px"}} onClick={() => this.openModal()}>Return</button>
                <div>
                    <Modal visible={this.state.visible} width="650" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="header__container">
                            {trayHeader}
                            <h4 className="cancel__header__comments">Comments</h4>
                        </div>
                        <div className="body__container">   
                            {traySelect}
                            <textarea id="comments" placeholder="Comments" class="comments" cols="51" rows="6" required="" maxlength="400" name="comments" style={{margin: "10px 10px 10px 10px"}}></textarea>
                        </div>
                        <center className="buttons__container">
                            <button class="btn btn-sm btn-success" style={{marginRight:"5px", fontSize:"16px"}} onClick={()=>this.return()}>Confirm</button>
                            <button class="btn btn-sm btn-danger" style={{marginRight:"5px", fontSize:"16px"}} onClick={()=>this.closeModal()}>Cancel</button>
                        </center>
                    </Modal>
                </div>
            </div>
        );
    }
}