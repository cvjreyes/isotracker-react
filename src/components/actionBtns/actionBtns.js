//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos

import CancelIso from "../cancelIso/cancelIso";

const ActionBtns = props =>{
    var actionBtn1, actionBtn2, actionBtn3, actionBtn4, actionBtn5, actionBtn6
    if (props.currentTab === "Design"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Stress</button>
        actionBtn2 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px"}}>Supports</button>
        actionBtn3 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
    }if (props.currentTab === "Stress"){
        actionBtn1 = <button class="btn btn-sm btn-primary" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Support</button>
        actionBtn2 = <button class="btn btn-sm btn-warning" style={{marginRight:"5px", marginLeft:"5px"}}>With Comments</button>
        actionBtn3 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
        actionBtn4 = <button class="btn btn-sm btn-success"style={{marginRight:"5px", marginLeft:"5px"}}>Verify</button>
        actionBtn5 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px"}}>Cancel verify</button>
        actionBtn6 =  <CancelIso user = {props.user}/>
    }if (props.currentTab === "Support"){
        actionBtn1 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px"}}>Stress</button>
        actionBtn2 = <button class="btn btn-sm btn-warning" style={{marginRight:"5px", marginLeft:"5px"}}>With Comments</button>
        actionBtn3 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
        actionBtn4 = <button class="btn btn-sm btn-success"style={{marginRight:"5px", marginLeft:"5px"}}>Verify</button>
        actionBtn5 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px"}}>Cancel verify</button>
        actionBtn6 =  <CancelIso user = {props.user}/>
    }if (props.currentTab === "Materials"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Issuer</button>
        actionBtn2 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
        actionBtn3 = <button class="btn btn-sm btn-warning" style={{marginRight:"5px", marginLeft:"5px"}} >With Comments</button>
        actionBtn5 =  <CancelIso user = {props.user}/>
    }if (props.currentTab === "Issuer"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>IsoCtrl</button>
        actionBtn2 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
        actionBtn3 = <button class="btn btn-sm btn-warning"style={{marginRight:"5px", marginLeft:"5px"}} >With Comments</button>
        actionBtn5 =  <CancelIso user = {props.user}/>
    }if (props.currentTab === "LDE/IsoControl"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>To Issue</button>
        actionBtn2 = <button class="btn btn-sm " style={{marginRight:"5px", marginLeft:"5px", backgroundColor:"#15e915"}}>Claim</button>
        actionBtn3 = <button class="btn btn-sm btn-warning" style={{marginRight:"5px", marginLeft:"5px"}}>With Comments</button>
        actionBtn5 =  <CancelIso user = {props.user}/>
    }if (props.currentTab === "My Tray"){
        actionBtn1 = <button class="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Unclaim</button>
        actionBtn2 = <button class="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px"}} >Verify</button>
    }if (props.currentTab === "Recycle bin"){
        actionBtn2 = <button class="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px"}} >Restore</button>
    }
    return(
        <div>
            {actionBtn1}
            {actionBtn2}
            {actionBtn3}
            {actionBtn4}
            {actionBtn5}
        </div>
    );
};

export default ActionBtns;