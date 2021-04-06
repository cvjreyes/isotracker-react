//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos

const ActionBtns = props =>{
    
    var actionBtn1, actionBtn2, actionBtn3, actionBtn4, actionBtn5, actionBtn6, actionBtn7
    if (props.currentTab !== "My Tray" && props.currentTab !== "Recycle bin" && props.currentTab !== "On hold"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.claimClick()}>Claim</button>
   
    }if (props.currentTab === "My Tray"){
        actionBtn1 = <button className="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.unclaimClick()}>Unclaim</button>
        if(props.role !== "Design" && props.role !== "DesignLead"){
            actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Design")}>Design</button>
        }
        if(process.env.REACT_APP_IFC === "0"){
            actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
            actionBtn4 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("supports")}>Support</button>
            if(props.role !== "DesignLead" && props.role !== "StressLead" && props.role !== "SupportsLead"){
                actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>

            }
        }else{
            if(props.role !== "Design" && props.role !== "DesignLead"){
                actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Design")}>Design</button>
            }if(props.role === "DesignLead"){
                actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
                actionBtn4 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Supports")}>Support</button>     
            }else if(props.role === "StressLead"){
                actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("supports")}>Supports</button>
            }else if(props.role === "SupportsLead"){
                actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
            }else{
                actionBtn3 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>

            }
        }
        console.log(props.currentRole)
        if(props.role === "DesignLead" || props.role === "SpecialityLead"){
            actionBtn6 = <button className="btn btn-sm btn-danger" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Recycle bin")}>Delete</button>
            actionBtn7 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("On hold")}>Hold</button>
        }
        /*actionBtn2 = <button class="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}}>Verify</button>
        actionBtn3 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}}>Cancel verify</button>
        actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}}>With Comments</button>
        actionBtn5=  <CancelIso user = {props.user} style={{marginRight:"5px", marginLeft:"5px", width:"98px"}}/>*/
    }if (props.currentTab === "Recycle bin"){
        actionBtn1 = <button className="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} >Restore</button>
    }
    

    return(
        <div>
            {actionBtn1}
            {actionBtn2}
            {actionBtn3}
            {actionBtn4}
            {actionBtn5}
            {actionBtn6}
            {actionBtn7}
        </div>
    );
};

export default ActionBtns;