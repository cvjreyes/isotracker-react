import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import './qtrackerNWCPopUp.css'
import AlertF from "../../components/alert/alert"

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

    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
          color: theme.palette.text.secondary,
          borderTopRightRadius: theme.spacing(2),
          borderBottomRightRadius: theme.spacing(2),
          paddingRight: theme.spacing(1),
          fontWeight: theme.typography.fontWeightMedium,
          '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
          },
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
          },
          [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
          },
        },
        [`& .${treeItemClasses.group}`]: {
          marginLeft: 0,
          [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
          },
        },
      }));
      
      function StyledTreeItem(props) {
        const {
          bgColor,
          color,
          labelIcon: LabelIcon,
          labelInfo,
          labelText,
          ...other
        } = props;
      
        return (
          <StyledTreeItemRoot
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0}}>
                <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                  {labelText}
                </Typography>
                <Typography variant="caption">
                  {labelInfo}
                </Typography>
              </Box>
            }
            style={{
              '--tree-view-color': color,
              '--tree-view-bg-color': bgColor,
            }}
            {...other}
          />
        );
      }
      
      StyledTreeItem.propTypes = {
        bgColor: PropTypes.string,
        color: PropTypes.string,
        labelIcon: PropTypes.elementType.isRequired,
        labelInfo: PropTypes.string,
        labelText: PropTypes.string.isRequired,
      };

export default class QtrackerNWCPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            spref: null,
            attach: null,
            description: null,
            errorBlankRequest: false,
        }
    }

    async openModal() {
        await this.setState({
            visible : true,
            spref: null,
            description: null,
            attach: null
        });
    }

    async closeModal() {
        await this.setState({
            visible : false,
            spref: null,
            description: null,
            attach: null
        });

        this.refs.spref.value = null;
        this.refs.description.value = null;
        this.refs.attach.value = null;

    }

    async request(){
        
        if(this.state.spref && this.state.description){

            let has_attach

            if(this.state.attach){
              has_attach = true
            }else{
              has_attach = false
            }

            let body ={
                spref : this.state.spref,
                description: this.state.description,
                has_attach: has_attach,
                user: secureStorage.getItem("user")
              }
              let options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
              await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/requestNWC", options)
                  .then(response => response.json())
                  .then(async json => {
                      if(json.filename && this.state.attach){
                        const extension = this.state.attach.name.split('.').pop();
                        const file  = new FormData(); 
                        file.append('file', this.state.attach, json.filename + "." + extension);
                        await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/uploadAttach", {
                            method: 'POST',
                            body: file,
                            }).then(response =>{
                                if (response.status === 200){
                                    this.props.success()
                                }
                            })                       
                        
                      }else{
                          this.props.success()
                      }
                  })
                  this.closeModal()
        }else{
            this.setState({errorBlankRequest: true})
        }
        
    }    

    render() {       
        
        return (
            <div>
                    <StyledTreeItem
                    nodeId="9"
                    labelText="NotWorkingComponent"
                    labelIcon={SupervisorAccountIcon}
                    onClick={() => this.openModal()}
                    color="none" 
                    bgColor="none"
                    />                
                    <div>
                    
                    <Modal visible={this.state.visible} width="700" height="500" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div
                        className={`alert alert-success ${this.state.errorBlankRequest ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => this.setState({errorBlankRequest: false})}
                        >
                            <AlertF type="qtracker" text="At least one field is blank!" margin="5px"/>                            
                        </div>
                        
                        <center className="qtracker__popUp__title" style={{marginBottom: "30px"}}><h3>NOT WORKING COMPONENT</h3></center>
                        <div className="qtrackerRequest__container">
                            <input type="text" placeholder="SPREF" id="spref" className="qtrackerPopUp__input__text" ref="spref" style={{marginBottom: "20px", color:'black'}} value={this.state.spref} onChange={(e) => this.setState({spref: e.target.value})} ></input>

                            <textarea name="description" className="qtrackerPopUp__input__text" rows="5" placeholder="Description" ref="description" style={{marginBottom:"20px", color:"black"}} onChange={(e) => this.setState({description: e.target.value})}/>
                            

                            <input type="file" id="attach" className="qtrackerPopUp__input__file"  ref="attach" style={{marginBottom: "30px"}} onChange={(e) => this.setState({attach: e.target.files[0]})} ></input>
                            <label for="attach" className="attach__label">Attach: </label>
                            <button class="btn btn-sm btn-success" onClick={() => this.request()} style={{marginRight:"5px", fontSize:"20px"}}>Submit</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginLeft:"5px", fontSize:"20px"}}>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}