import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import MailIcon from '@mui/icons-material/Mail';
import DeleteIcon from '@mui/icons-material/Delete';
import Label from '@mui/icons-material/Label';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import InfoIcon from '@mui/icons-material/Info';
import ForumIcon from '@mui/icons-material/Forum';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useHistory } from 'react-router';
import QtrackerNWCPopUp from '../qtrackerNWCPopUp/qtrackerNWCPopUp'
import QtrackerNVNPopUp from '../qtrackerNVNPopUp/qtrackerNVNPopUp';
import QtrackerNRIPopUp from '../qtrackerNRIPopUp/qtrackerNRIPopUp';
import QtrackerNRBPopUp from '../qtrackerNRBPopUp/qtrackerNRBPopUp';
import QtrackerRRPopUp from '../qtrackerRRPopUp/qtrackerRRPopUp';
import QtrackerNRIDSPopUp from '../qtrackerNRIDSPopUp/qtrackerNRIDSPopUp';

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
          <Typography variant="caption" color="inherit">
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

export default function MenuListPITList(props) {

    const history = useHistory()

    function handleCADpmcClick(){
        window.open("http://eu012vm0190/UI/Login.aspx", "_blank")
    }

    function handleSPClick(){
        history.push("/"+process.env.REACT_APP_PROJECT+"/csptracker");
    }

    function success(){
      props.success()
    }

  return (
    <TreeView
      aria-label="gmail"
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon/>}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 700, flexGrow: 1, maxWidth: 720, overflowY: 'auto' }}
    >
      <StyledTreeItem nodeId="14" style={{marginBottom:"5px"}} labelText="New user" labelIcon={SupervisorAccountIcon}/>
      <StyledTreeItem nodeId="1" style={{marginBottom:"5px"}} labelText="CADpmc" labelIcon={MailIcon} onClick={()=> handleCADpmcClick()}/>
      <StyledTreeItem nodeId="2" style={{marginBottom:"5px"}} labelText="CSPTracker" labelIcon={InfoIcon} onClick={()=> handleSPClick()} />
      <StyledTreeItem nodeId="3" labelText="Out of SpecTracker" color="#1a73e8" bgColor="#e8f0fe" labelIcon={Label}>
        <StyledTreeItem
          nodeId="5"
          labelText="InstrumentTracker"
          labelIcon={SupervisorAccountIcon}
          
        />
        <StyledTreeItem
          nodeId="6"
          labelText="PSVTracker"
          labelIcon={InfoIcon}
          
        />
        <StyledTreeItem
          nodeId="7"
          labelText="ExpansionJoin"
          labelIcon={ForumIcon}
          style={{marginBottom:"5px"}}
        />
      </StyledTreeItem>

      <StyledTreeItem nodeId="4" labelText="QueryTracker" color="#e3742f" bgColor="#fcefe3" labelIcon={Label}>
        
        <QtrackerNWCPopUp success={success.bind(this)}/>
        <QtrackerNVNPopUp success={success.bind(this)}/>
        
        <StyledTreeItem
          nodeId="11"
          labelText="NotReporting"
          labelIcon={InfoIcon}
        >
          <QtrackerNRIPopUp success={success.bind(this)}/>
          <QtrackerNRBPopUp success={success.bind(this)}/>
          <QtrackerNRIDSPopUp success={success.bind(this)}/>
        </StyledTreeItem>

        <QtrackerRRPopUp success={success.bind(this)}/>

        {/*
        <StyledTreeItem
          nodeId="10"
          labelText="NotReporting"
          labelIcon={ForumIcon}
          color="#a250f5"
          bgColor="#f3e8fd"
        >
            <StyledTreeItem
          nodeId="11"
          labelText="InIsometric"
          labelIcon={SupervisorAccountIcon}
        />
        <StyledTreeItem
          nodeId="12"
          labelText="InBfile"
          labelIcon={InfoIcon}
        />
        </StyledTreeItem>
        <StyledTreeItem
          nodeId="13"
          labelText="AnyOther"
          labelIcon={InfoIcon}
          color="#e3742f"
          bgColor="#fcefe3"
        />
        */}
      </StyledTreeItem>
        
    </TreeView>
  );
}
