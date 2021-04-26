import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import "./forceClaimPopUp.css"

const CryptoJS = require("crypto-js");
    const SecureStorage = require("secure-web-storage");
    var SECRET_KEY = 'sanud2ha8shd72h';
    
    var secureStorage = new SecureStorage(localStorage, {
        hash: function hash(key) {
            key = CryptoJS.SHA256(key, SECRET_KEY);
    
            return key.toString();
        },
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    
            data = data.toString();
    
            return data;
        },
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);
    
            data = data.toString(CryptoJS.enc.Utf8);
    
            return data;
        }
    });

export default class UploadPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            users: []
        }
        this.id = props.id;
    }

    async openModal() {  
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
        await fetch("http://localhost:5000/api/users/"+secureStorage.getItem("tab"), options)
        .then(response => response.json())
        .then(json => {
            this.setState({
                users: json.usernames
            })
        })    
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
            <section style={{float:"left"}}>
                <button value="Force claim" className="btn btn-sm btn-warning" style={{marginRight:"5px", marginLeft:"5px", width:"110px", float: "left"}} onClick={() => this.openModal()}>Force unclaim</button>                <div>
                    <Modal visible={this.state.visible} width="650" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div className="popUp__container" >
                            <center className="popUp__title"><h1>Select a user</h1></center>          
                        </div>
                        <center>
                            <select id="userSelect">

                            </select>
                        </center>
                    </Modal>
                </div>
            </section>
            
        );
    }
}