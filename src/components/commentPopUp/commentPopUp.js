import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

export default class CommentPopUp extends Component {
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

    render() {
        return (
            <div style={{marginRight:"5px", marginLeft:"5px", float:"right"}}>
                <button class="btn btn-info" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginLeft: "5px"}} onClick={() => this.openModal()}>COMMENTS</button>
                <div>
                    <Modal visible={this.state.visible} width="450" height="120" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div style={{marginTop:"10px"}}>
                            <p style={{fontSize:"20px", padding:"5px 5px 5px 15px"}}>{this.props.comments}</p>   
                        </div>
                                
                    </Modal>
                </div>
            </div>
        );
    }
}