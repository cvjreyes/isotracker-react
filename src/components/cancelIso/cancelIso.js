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
        var trayHeader, traySelect
        if (this.props.user === "admin"){
            trayHeader = <h4 className="cancel__header__tray">Tray</h4>
            traySelect = <select className="destination__select" ><option value="Design" selected="selected">Design</option><option value="Stress">Stress</option><option value="Support">Support</option><option value="Materials">Materials</option><option value="Issuer">Issuer</option></select>
        }
        return (
            <div style={{marginRight:"5px", marginLeft:"5px", float:"right"}}>
                <button class="btn btn-sm" style={{backgroundColor: "grey", color:"white"}} onClick={() => this.openModal()}>Cancel isometric</button>
                <div>
                    <Modal visible={this.state.visible} width="1100" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="header__container">
                            <h4 className="cancel__header__id">Iso ID</h4>
                            {trayHeader}
                            <h4 className="cancel__header__comments">Comments</h4>
                        </div>
                        <div className="body__container">
                            <p className="isometric__name">021A1971101N0004_01.pdf</p>
                            {traySelect}
                            <textarea placeholder="Comments" class="comments" cols="51" rows="14" required="" maxlength="400" name="comments" style={{margin: "10px 10px 10px 10px"}}></textarea>
                        </div>
                        <center className="buttons__container">
                            <button class="btn btn-sm btn-success" style={{marginRight:"5px", fontSize:"16px"}}>Confirm</button>
                            <button class="btn btn-sm btn-danger" style={{marginRight:"5px", fontSize:"16px"}}>Cancel</button>
                        </center>
                    </Modal>
                </div>
            </div>
        );
    }
}