//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos

const ActionBtns = props =>{
    var actionBtn1, actionBtn2, actionBtn3, actionBtn4, actionBtn5, actionBtn6, actionBtn7, actionBtn8, actionBtn9
    if(props.onlyDownload){
        actionBtn9 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
    }else{
        if (props.currentTab !== "My Tray" && props.currentTab !== "Recycle bin" && props.currentTab !== "On hold"){
            actionBtn9 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
            actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.claimClick()}>Claim</button>
    
        }if (props.currentTab === "My Tray"){
            actionBtn1 = <button className="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.unclaimClick()}>Unclaim</button>
            actionBtn9 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
            if(props.role !== "Design" && props.role !== "DesignLead" && props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead" ){
                actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Design")}>Design</button>
            }
            if(process.env.REACT_APP_IFC === "0"){
                if (props.role !== "Stress" && props.role !== "StressLead"){
                    actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
                } if (props.role !== "Supports" && props.role !== "SupportsLead"){
                    actionBtn4 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("supports")}>Support</button>
                }
                if(props.role !== "DesignLead" && props.role !== "StressLead" && props.role !== "SupportsLead" && props.role !== "Process" && props.role !== "Instrument"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>
                }
            }else{
                if(props.role !== "Design" && props.role !== "DesignLead" && props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead"){
                    actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Design")}>Design</button>
                }if(props.role === "DesignLead"){
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
                    actionBtn4 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Supports")}>Support</button>     
                }else if(props.role === "Stress"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>
                    actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("supports")}>Supports</button>
                }else if(props.role === "Supports"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("stress")}>Stress</button>
                }else if(props.role === "SupportsLead"){
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("supports")}>Supports</button>

                }else if (props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead"){
                    actionBtn3 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.verifyClick()}>Verify</button>

                }
            }
            
            if(props.role === "DesignLead" || props.role === "SpecialityLead"){
                actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("Design")}>Design</button>
                actionBtn6 = <button className="btn btn-sm btn-danger" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("Recycle bin")}>Delete</button>
                actionBtn7 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.transaction("On hold")}>Hold</button>
            }else if(props.role === "StressLead"){
                actionBtn2 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("Stress")}>Stress</button>
                actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("Supports")}>Supports</button>
            }
            else if(props.role === "SupportsLead"){
                actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("Stress")}>Stress</button>
                actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.returnLead("supports")}>Supports</button>
                
            }

            

        }if ((props.currentTab === "Recycle bin" && (props.role === "DesignLead" || props.role === "SpecialityLead")) || 
            (props.currentTab === "On hold" && (props.role === "DesignLead" || props.role === "SpecialityLead" || props.role === "Issuer"))){
            actionBtn8 = <button className="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px", width:"98px"}} onClick={() => props.restoreClick()}>Restore</button>
        }
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
            {actionBtn8}
            {actionBtn9}
        </div>
    );
};

export default ActionBtns;