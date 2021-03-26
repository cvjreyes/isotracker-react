//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos

const ActionBtns = props =>{
    
    console.log(process.env.REACT_APP_IFC)
    
    var actionBtn1, actionBtn2, actionBtn3, actionBtn4, actionBtn5
    if (props.currentTab === "Design"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}} onClick={() => props.claimClick()}>Claim</button>
    }if (props.currentTab === "Stress"){
        actionBtn1 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Claim</button>
    }if (props.currentTab === "Support"){
        actionBtn1 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Claim</button>
    }if (props.currentTab === "Materials"){
        actionBtn1 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Claim</button>
    }if (props.currentTab === "Issuer"){
        actionBtn1 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Claim</button>
    }if (props.currentTab === "LDE/IsoControl"){
        actionBtn1 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Claim</button>
    }if (props.currentTab === "My Tray"){
        actionBtn1 = <button className="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}} onClick={() => props.unclaimClick()}>Unclaim</button>

        if(process.env.REACT_APP_IFC === "0"){
            actionBtn2 = <button className="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}} onClick={() => props.verifyClick()}>Verify</button>
        }
        
        /*actionBtn2 = <button class="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px"}}>Verify</button>
        actionBtn3 = <button class="btn btn-sm btn-danger" style={{marginRight:"5px", marginLeft:"5px"}}>Cancel verify</button>
        actionBtn4 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px"}}>With Comments</button>
        actionBtn5=  <CancelIso user = {props.user} style={{marginRight:"5px", marginLeft:"5px"}}/>*/
    }if (props.currentTab === "Recycle bin"){
        actionBtn1 = <button className="btn btn-sm btn-success" style={{marginRight:"5px", marginLeft:"5px"}} >Restore</button>
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