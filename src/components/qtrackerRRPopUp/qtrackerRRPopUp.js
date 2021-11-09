import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AlertF from "../alert/alert"
import ReactTooltip from "react-tooltip"


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

export default class QtrackerRRPopUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible : false,
            scope: null,
            items: null,
            description: null,
            errorBlankRequest: false
        }
    }

    async openModal() {
        await this.setState({
            visible : true,
            scope: null,
            description: null,
            items: null
        });
    }

    async closeModal() {
        await this.setState({
            visible : false,
            scope: null,
            description: null,
            items: null
        });

        this.refs.scope.value = null;
        this.refs.description.value = null;
        this.refs.items.value = null;

    }

    async request(){
        
        if(this.state.scope && this.state.description && this.state.items){
            const body ={
                scope : this.state.scope,
                description: this.state.description,
                items: this.state.items,
                user: secureStorage.getItem("user")
              }
              const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }
              await fetch("http://"+process.env.REACT_APP_SERVER+":"+process.env.REACT_APP_NODE_PORT+"/qtracker/requestRR", options)
                  .then(response => response.json())
                  .then(json => {
                      if(json.filename){
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
                    nodeId="14"
                    labelText="RequestReport"
                    labelIcon={SupervisorAccountIcon}
                    onClick={() => this.openModal()}
                    color="none" 
                    bgColor="none"
                    />                
                    <div>
                    
                    <Modal visible={this.state.visible} width="700" height="550" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                        <div
                        className={`alert alert-success ${this.state.errorBlankRequest ? 'alert-shown' : 'alert-hidden'}`}
                        onTransitionEnd={() => this.setState({errorBlankRequest: false})}
                        >
                            <AlertF type="qtracker" text="At least one field is blank!" margin="5px"/>                            
                        </div>
                        <center className="qtracker__popUp__title" style={{marginBottom: "30px"}}><h3>REQUEST REPORT</h3></center>
                        <div className="qtrackerRequest__container">
                            <textarea data-for="items-help" data-tip="Items help" data-iscapture="true" name="items" className="qtrackerPopUp__input__text" rows="3" placeholder="Items to report" ref="items" style={{marginBottom:"20px", color:"black"}} onChange={(e) => this.setState({items: e.target.value})}/>
                            <ReactTooltip id="items-help" place="right" type="dark" effect="solid"/>

                            <input data-for="scope-help" data-tip="Scope help" data-iscapture="true" type="text" placeholder="Scope" id="scope" className="qtrackerPopUp__input__text" ref="scope" style={{marginBottom: "20px", color:'black'}} value={this.state.scope} onChange={(e) => this.setState({scope: e.target.value})} ></input>
                            <ReactTooltip id="scope-help" place="right" type="dark" effect="solid"/>

                            <textarea name="description" className="qtrackerPopUp__input__text" rows="5" placeholder="Description" ref="description" style={{marginBottom:"20px", color:"black"}} onChange={(e) => this.setState({description: e.target.value})}/>                            

                            <button class="btn btn-sm btn-success" onClick={() => this.request()} style={{marginRight:"5px", fontSize:"20px"}}>Submit</button>
                            <button class="btn btn-sm btn-danger" onClick={() => this.closeModal()} style={{marginLeft:"5px", fontSize:"20px"}}>Cancel</button>
                        </div>
                    </Modal>
                </div>
            </div>
        );
    }
}