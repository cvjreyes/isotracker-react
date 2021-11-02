import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import "./holdsPopUp.css"

export default class HoldsPopUp extends Component {
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

        for(let i = 0; i < holds.length; i++){
            if(holds[i]){
                content.push(<tr className="holds__row">                   
                    <td style={{border: "0.28px solid #D2D2D2", width:"50px", verticalAlign:"middle", textAlign:"center"}}>
                        <p className="holds__hold__text">{holds[i]}</p>
                    </td>
                    <td style={{border: "0.28px solid #D2D2D2", width:"400px", verticalAlign:"middle"}}>
                        <p className="holds__description__text">{descriptions[i]}</p>
                    </td>              
                </tr>)
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
            <div>
                <button class="btn btn-info" style={{fontSize:"12px", padding:"2px 5px 2px 5px"}} onClick={() => this.openModal()}>HOLDS</button>
                <div>
                    <Modal visible={this.state.visible} width="500" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <center className="popUp__title"><h3><strong>{this.props.isoid}</strong></h3></center>
                        <table className="holds__container">
                        
                            {this.state.content}  
                        </table>
                                
                    </Modal>
                </div>
            </div>
        );
    }
}