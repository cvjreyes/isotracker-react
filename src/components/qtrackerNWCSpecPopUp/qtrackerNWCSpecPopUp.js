import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './qtrackerNWCSpecPopUp.css'

export default class QtrackerNWCSpecPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            content: null
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
            <div style={{marginRight:"5px", marginLeft:"5px", float:"left"}}>
                <button class="btn btn-info" style={{fontSize:"16px", padding:"2px 5px 2px 5px"}} onClick={() => this.openModal()}>SPECIFICATIONS</button>
                <div>
                    <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <center className="popUp__title"><h3><strong>{this.props.incidence_number}</strong></h3></center>
                    
                    <table className="specs__container">
                        <tr className="specs__row">                   
                        <td style={{border: "0.28px solid #D2D2D2", width:"154px", verticalAlign:"middle", textAlign:"center"}}>
                            <p className="specs__spec__text">SPREF</p>
                        </td>
                        <td style={{border: "0.28px solid #D2D2D2", width:"500px", verticalAlign:"middle"}}>
                            <p className="specs__description__text">{this.props.spref}</p>
                        </td>              
                        </tr>

                        <tr className="specs__row">                   
                        <td style={{border: "0.28px solid #D2D2D2", width:"150px", verticalAlign:"middle", textAlign:"center"}}>
                            <p className="specs__spec__text">DESCRIPTION</p>
                        </td>
                        <td style={{border: "0.28px solid #D2D2D2", width:"500px", verticalAlign:"middle"}}>
                            <p className="specs__description__text">{this.props.description}</p>
                        </td>              
                        </tr>   
                    </table>            
                                
                    </Modal>
                </div>
            </div>
        );
    }
}