import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './addUserPopUp.css'

export default class AddUserPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            id : props.id,
            username : "",
            email : "",
            des : false,
            lde : false,
        }
        
    }
   

    openModal() {      
        this.setState({
            visible : true,
        });
    }

    closeModal() {
        this.setState({
            visible : false,
            email : "",
            username : ""
        });

    }

    addUser(){
        const username = this.state.username
        const email = this.state.email

        const des = this.state.des
        console.log(this.state)

    }

    handleChangeUsername(event){
        this.setState({username: event.target.value});
    }

    render() {
        return (
            <section >
                <input type="button"  value="Add user" className="btn btn-success"  style={{marginRight:"5px", marginLeft:"5px", width:"110px", fontSize:"14px"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="450" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="popUp__container" >
                            <center className="popUp__title"><h3>Add a new user</h3></center>
                                
                        </div>
                        <div className="popUp__input">
                            <h4 style={{fontWeight:"bold"}}>Username and email</h4>
                            
                        </div>
                        
                        <div className="popUp__input">
                            <input type="text" placeholder="Username" id="username" className="popUp__input__text" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}  style={{width:"300px"}}></input>
                        </div>
                        <div className="popUp__input">
                            <input type="text" placeholder="Email" id="email"className="popUp__input__text" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} ></input>
                        </div>
                        <div className="popUp__input">
                            <h4 style={{fontWeight:"bold"}}>Roles</h4>
                            
                        </div>
                        <div className="popUp__input__checkbox__group">
         
                            <input type="checkbox" name="role" value="DES" className="popUp__input__checkbox" onChange={(e) => this.setState({des: e.target.checked})} defaultChecked={this.state.des}/>
                            <label for="DES" className="popUp__input__checkbox__label">Design</label> 
                            <input type="checkbox" name="role" value="LDE" className="popUp__input__checkbox"/>     
                            <label for="LDE" className="popUp__input__checkbox__label">Design Lead</label>
                            <input type="checkbox" name="role" value="STR" className="popUp__input__checkbox"/>  
                            <label for="STR" className="popUp__input__checkbox__label">Stress</label>
                            <input type="checkbox" name="role" value="LST" className="popUp__input__checkbox"/>  
                            <label for="LST" className="popUp__input__checkbox__label">Stress</label>
   
                        </div>
                        <div className="popUp__input__checkbox__group">
                        <input type="checkbox" name="role" value="SUP" className="popUp__input__checkbox"/>  
                            <label for="SUP" className="popUp__input__checkbox__label">Supports</label>
                            <input type="checkbox" name="role" value="LSP" className="popUp__input__checkbox"/>  
                            <label for="LSP" className="popUp__input__checkbox__label">Supports Lead</label>
                            <input type="checkbox" name="role" value="MAT" className="popUp__input__checkbox"/>  
                            <label for="MAT" className="popUp__input__checkbox__label">Materials</label>
                            <input type="checkbox" name="role" value="ISS" className="popUp__input__checkbox"/>  
                            <label for="ISS" className="popUp__input__checkbox__label">Issuer</label>
                        </div>
                        <div className="popUp__input__checkbox__group">
                            <input type="checkbox" name="role" value="LOS" className="popUp__input__checkbox"/>  
                            <label for="LOS" className="popUp__input__checkbox__label">Speciality Lead</label>
                            <input type="checkbox" name="role" value="PRO" className="popUp__input__checkbox"/>  
                            <label for="PRO" className="popUp__input__checkbox__label">Process</label>
                            <input type="checkbox" name="role" value="INS" className="popUp__input__checkbox"/>  
                            <label for="INS" className="popUp__input__checkbox__label">Instrument</label>
                            <input type="checkbox" name="role" value="REV" className="popUp__input__checkbox"/>  
                            <label for="REV" className="popUp__input__checkbox__label">Review</label>
                        </div>
                        <div className="popUp__buttons__container__users">
                            <button class="btn btn-sm btn-success" onClick={() => this.addUser()} style={{marginRight:"5px", fontSize:"16px"}}>Add user</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginRight:"5px", fontSize:"16px"}}>Cancel</button>
                        </div>
                       
                    </Modal>
                </div>
            </section>
        );
    }
}