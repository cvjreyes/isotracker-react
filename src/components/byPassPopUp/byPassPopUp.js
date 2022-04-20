import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import AlertF from "../../components/alert/alert"


export default class ByPassPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            blankFields: false,
            type: null,
            note: null
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
            blankFields: false,
            type: null,
            note: null
        });
    }

    creatByPass(){
        const notes = document.getElementById("notes").value
        console.log(this.state.type, notes)
        //this.props.creatByPass(type, notes)
        this.closeModal()
    }


    render() {
        return (
            <section >
                <input type="button"  value="ByPass" className="btn btn_warning" style={{fontSize: "12px", padding: "2px 5px", backgroundColor: "orange", borderColor: "rgb(176, 224, 230)", width: "100px", float: "left", marginRight: "5px", marginTop: "3px"}} onClick={() => this.openModal()} />
                <div>
                    <Modal visible={this.state.visible} width="650" height="530" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div
                        className={`alert alert-success ${this.state.blankFields ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => this.setState({blankFields: false})}
                        >
                        <AlertF type="warning" text="Username or email missing!" popUp={true}/>
                      </div>

                    <div className="popUp__container" >
                            <center className="popUp__title"><h3>Create ByPass</h3></center>
                                
                        </div>
                        <div className="popUp__input">
                            <h4 style={{fontWeight:"bold"}}>Type</h4>
                            
                        </div>
                        
                        <div className="popUp__input">
                            <label for="select">Type: </label>
                            <select className="popUp_input_select" name="select" onChange={(e) => this.setState({type: e.target.value})} value={this.state.selected}>
                                <option value={0} selected>Instrument</option>
                                <option value={1}>Equipment</option>
                                <option value={2}>Material</option>
                                <option value={3}>PID</option>
                            </select>
                        </div>
                        <div>
                            <textarea placeholder='Notes...' id="notes" name="notes"></textarea>
                        </div>
                        <div className="popUp__buttons__container__users">
                            <button class="btn btn-sm btn-success" onClick={() => this.createByPass()} style={{marginRight:"5px", fontSize:"16px"}}>Create</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginLeft:"5px", fontSize:"16px"}}>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </section>
        );
    }
}