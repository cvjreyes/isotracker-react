import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import ChooseFile from '../chooseFile/chooseFile';
import './uploadPopUp.css'

export default class UploadPopUp extends Component {
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
            <section >
                <input type="button"  value="UPLOAD" className="upload__button" onClick={() => this.openModal()} />
                <Modal   visible={this.state.visible} width="700" height="600" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="popUp__container" >
                        <center className="popUp__title"><h1>Isometric X</h1></center>
                        <div className="row__container">
                            <label className="popUp__label">Master PDF</label>
                            <div className="chooseFile__container" >
                                <ChooseFile/>
                            </div>
                            
                        </div>
                    </div>
                </Modal>
            </section>
        );
    }
}