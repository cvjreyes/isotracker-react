import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import "./commentPopUp.css"

export default class CommentPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            content: null
        }
    }

    openModal() {

        const holds = this.props.holds
        const descriptions = this.props.descriptions
        let content = []

        console.log(descriptions)

        for(let i = 0; i < holds.length; i++){
            if(holds[i]){
                content.push(<div className="holds__row">
                    <p className="holds__hold__text">{holds[i]}:</p>
                    <p className="holds__description__text">{descriptions[i]}</p>
                </div>)
            }
        }

        this.setState({
            content: content,
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
                <button class="btn btn-info" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginLeft: "5px"}} onClick={() => this.openModal()}>HOLDS</button>
                <div>
                    <Modal visible={this.state.visible} width="350" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <center className="popUp__title"><h3><strong>HOLDS</strong></h3></center>
                        <div className="holds__container">
                        
                            {this.state.content}  
                        </div>
                                
                    </Modal>
                </div>
            </div>
        );
    }
}