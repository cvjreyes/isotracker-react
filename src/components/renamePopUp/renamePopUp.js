import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class RenamePopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false
        }
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

    rename(){
        const newName = document.getElementById("comments").value
        const oldName = this.props.filename

        const body = {
            oldName: oldName,
            newName: newName
        }

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }

        fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/rename", options)
        .then(response => console.log("Cambiado"))

        this.closeModal()
        
    }

    render() {
        
        return (
            <div style={{marginRight:"5px", marginLeft:"5px", float:"right", display:"inline-block"}}>
                <button class="btn btn-sm" style={{backgroundColor:"red", fontSize:"12px", borderColor:"red", padding:"2px 5px 2px 5px", marginRight:"5px", float:"left"}} onClick={() => this.openModal()}>LOCKED</button>
                <div>
                    <Modal visible={this.state.visible} width="550" height="220" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div style={{marginTop:"10px"}}>   
                            <textarea id="comments" placeholder="Comments" class="comments" cols="51" rows="6" required="" maxlength="400" name="comments" style={{margin: "10px 10px 10px 10px"}}></textarea>
                        </div>
                                
                            <button class="btn btn-sm btn-success" style={{fontSize:"15px"}} onClick={()=>this.rename()}>Rename</button>
                    </Modal>
                </div>
            </div>
        );
    }
}