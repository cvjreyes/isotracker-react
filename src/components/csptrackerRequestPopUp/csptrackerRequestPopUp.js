import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './csptrackerRequestPopUp.css'

export default class CSPTrackerRequestPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            tag: null,
            pid: null,
            sptag: null
        }
    }

    openModal() {
        this.setState({
            visible : true,
            tag: null,
            pid: null,
            sptag: null
        });
    }

    closeModal() {
        this.setState({
            visible : false,
            tag: null,
            pid: null,
            sptag: null
        });
    }

    async request(){
        if(this.state.tag && this.state.pid && this.state.sptag){
            const body ={
                tag : this.state.tag,
                pid: this.state.pid,
                sptag: this.state.sptag
              }
              const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
              await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/requestSP", options)
                  .then(response => response.json())
                  .then(json => {
                      if(json.success){
                          this.props.successRequest()
                      }else{
                          this.props.existsErrorRequest()
                      }
                  })
                  this.closeModal()
        }else{
            this.props.errorBlankRequest()
        }
        
    }

    render() {
        return (
            <div style={{marginRight:"5px", marginLeft:"5px", float:"right"}}>
                <button class="btn btn-info" style={{fontSize:"12px", padding:"2px 5px 2px 5px", marginLeft: "5px", width:"100px"}} onClick={() => this.openModal()}>REQUEST SP</button>
                <div>
                    <Modal visible={this.state.visible} width="450" height="320" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <center className="popUp__title" style={{marginBottom: "30px"}}><h3>REQUEST SP</h3></center>
                        <div className="request__container">
                            <input type="text" placeholder="TAG" id="tag" className="popUp__input__text" style={{marginBottom: "20px", color:'black'}} value={this.state.tag} onChange={(e) => this.setState({tag: e.target.value})} ></input>
                            <input type="text" placeholder="P&ID" id="pid" className="popUp__input__text" style={{marginBottom: "20px", color:"black"}} value={this.state.pid} onChange={(e) => this.setState({pid: e.target.value})} ></input>
                            <input type="text" placeholder="TAG SP" id="sptag"className="popUp__input__text" style={{marginBottom: "30px", color:"black"}} value={this.state.sptag} onChange={(e) => this.setState({sptag: e.target.value})} ></input>
                            <button class="btn btn-sm btn-success" onClick={() => this.request()} style={{marginRight:"5px", fontSize:"16px"}}>Submit</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginLeft:"5px", fontSize:"16px"}}>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}