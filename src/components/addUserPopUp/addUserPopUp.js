import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './addUserPopUp.css'

export default class AddUserPopUp extends Component {
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
                <input type="button"  value="Add user" className="btn btn-success"  style={{marginRight:"5px", marginLeft:"5px", width:"110px", fontSize:"14px"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="800" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="popUp__container" >
                            <center className="popUp__title"><h3>Add a new user</h3></center>
                                
                        </div>
                        <div className="popUp__input">
                            <h4 style={{fontWeight:"bold"}}>Username and email</h4>
                            
                        </div>
                        <div className="popUp__input">
                            <input type="text" placeholder="Username" id="username"></input>
                            
                        </div>
                        <div className="popUp__input">
                            <input type="text" placeholder="Email" id="email"></input>
                            
                        </div>
                        <div className="popUp__buttons__container">
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginRight:"5px", fontSize:"16px"}}>Cancel</button>
                        </div>
                        
                    </Modal>
                </div>
            </section>
        );
    }
}