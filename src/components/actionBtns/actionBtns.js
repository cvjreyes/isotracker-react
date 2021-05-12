//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos
import ForceClaimPopUp from '../forceClaimPopUp/forceClaimPopUp';
import ActionExtra from "../../components/actionExtra/actionExtra"

const ActionBtns = props =>{
    function assignToUser(username){
        props.forceClaim(username)
    }
    
    function toIssue(transmittal, date){
        props.issue(transmittal, date)
    }

    var actionBtn1, actionBtn2, actionBtn3, actionBtn4, actionBtn5, actionBtn6, actionBtn7, actionBtn8, actionBtn9, actionBtn10, actionBtn11, actionBtn12
    if(props.onlyDownload){
        if(props.role === "SpecialityLead" || props.role === "DesignLead"){
            console.log("entra")
            actionBtn6 = <button className="btn btn-sm btn-danger" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("Recycle bin")}>Delete</button>
            actionBtn7 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"#CD853F"}} onClick={() => props.transaction("On hold")}>Hold</button>
        }
        actionBtn11 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
    }else{
        
        if (props.currentTab !== "My Tray" && props.currentTab !== "Recycle bin" && props.currentTab !== "On hold"){
            actionBtn11 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
            if (!(props.role === "SpecialityLead" && (props.currentTab === "Process" || props.currentTab === "Instrument")) && props.currentTab !== "Issued"){
                actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.claimClick()}>Claim</button>
            }
            if(props.currentTab === "Issued"){
                
                if(props.role === "SpecialityLead"){
                    actionBtn1 = <button class="btn btn-sm btn-success" name="newrev" value="newrev" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.newRev()}>New Rev</button>
                }else if(props.role === "Design" || props.role === "DesignLead"){
                    actionBtn1 = <button class="btn btn-sm btn-success" name="newrev" value="newrev" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.request()}>Request</button>
                }
            }
    
        }if (props.currentTab === "My Tray"){
            actionBtn1 = <button className="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.unclaimClick()}>Unclaim</button>
            actionBtn11 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"lightgray"}} onClick={() => props.downloadFiles()}>Download</button>
            if(props.role !== "Design" && props.role !== "DesignLead" && props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead" ){
                actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"#781C2E"}} onClick={() => props.transaction("Design")}>Design</button>
            }
            if(props.role === "DesignLead" || props.role === "StressLead" || props.role === "SupportsLead"){
                actionBtn9 = <button class="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor: "#8B008B", color:"white"}} onClick={() => props.transaction("Materials")}>Materials</button>
            }if(props.role === "Materials"){
                actionBtn5 = <button class="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor: "#FF6781", color:"white"}} onClick={() => props.transaction("Issuer")}>Issuer</button>
            }if(props.role === "Issuer"){
                actionBtn5 = <button class="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor: "	#FF8C00", color:"white"}} onClick={() => props.transaction("LDE/Isocontrol")}>LOS/Isocontrol</button>
            }
            if(process.env.REACT_APP_IFC === "0"){
                if (props.role !== "Stress" && props.role !== "StressLead"){
                    actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("stress")}>Stress</button>
                } if (props.role !== "Supports" && props.role !== "SupportsLead"){
                    actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("supports")}>Support</button>
                }
                if(props.role !== "DesignLead" && props.role !== "StressLead" && props.role !== "SupportsLead" && props.role !== "Process" && props.role !== "Instrument"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.verifyClick()}>Verify</button>
                }
            }else{
                if(props.role !== "Design" && props.role !== "DesignLead" && props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead"){
                    actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"#781C2E"}} onClick={() => props.transaction("Design")}>Design</button>
                }if(props.role === "DesignLead"){
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("stress")}>Stress</button>
                    actionBtn4 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("Supports")}>Support</button>     
                }else if(props.role === "Stress"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.verifyClick()}>Verify</button>
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("supports")}>Supports</button>
                }else if(props.role === "Supports"){
                    actionBtn5= <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.verifyClick()}>Verify</button>
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("stress")}>Stress</button>
                }else if(props.role === "SupportsLead"){
                    actionBtn3 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.returnLead("supports")}>Supports</button>

                }else if (props.role !== "Process" && props.role !== "Instrument" && props.role !== "StressLead" && props.role !== "SupportsLead" && props.role !== "Materials" && props.role !== "Issuer"){
                    actionBtn3 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.verifyClick()}>Verify</button>

                }
            }
            
            if(props.role === "DesignLead"){
                actionBtn2 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"#781C2E"}} onClick={() => props.returnLead("Design")}>Design</button>               
            }if(props.role === "SpecialityLead"){
                actionBtn3 = actionBtn1
                actionBtn1 = <ActionExtra toIssue={toIssue.bind(this)}/>
                actionBtn2 = null
                actionBtn5 = null
            }
            else if(props.role === "StressLead"){
                actionBtn2 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.returnLead("Stress")}>Stress</button>
                actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.returnLead("Supports")}>Supports</button>
            }
            else if(props.role === "SupportsLead"){
                actionBtn3 = <button class="btn btn-sm btn-info" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.returnLead("Stress")}>Stress</button>
                actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.returnLead("supports")}>Supports</button>
                
            }

            
        
        }else if(props.role === "SpecialityLead" && props.currentTab !== "LDE/IsoControl" && props.currentTab !== "Process" &&  props.currentTab !== "Instrument" && props.currentTab !== "Issued"){
            actionBtn10 = <ForceClaimPopUp currentTab={props.currentTab} assignToUser={assignToUser.bind(this)}/>
        }
        
        if ((props.currentTab === "Recycle bin" && (props.role === "DesignLead" || props.role === "SpecialityLead")) || 
            (props.currentTab === "On hold" && (props.role === "DesignLead" || props.role === "SpecialityLead" || props.role === "Issuer"))){
            actionBtn8 = <button className="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.restoreClick()}>Restore</button>
        }
        if(props.role === "SpecialityLead" || props.role === "DesignLead"){
            console.log("entra")
            actionBtn6 = <button className="btn btn-sm btn-danger" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px"}} onClick={() => props.transaction("Recycle bin")}>Delete</button>
            actionBtn7 = <button className="btn btn-sm" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px", width:"110px", backgroundColor:"#CD853F"}} onClick={() => props.transaction("On hold")}>Hold</button>
        }
    }

    return(
        <div style={{display:"flex"}}>
            {actionBtn1}
            {actionBtn2}
            {actionBtn3}
            {actionBtn4}
            {actionBtn5}
            {actionBtn6}
            {actionBtn7}
            {actionBtn8}
            {actionBtn9}
            {actionBtn10}
            {actionBtn11}
            {actionBtn12}
        </div>
    );
};

export default ActionBtns;