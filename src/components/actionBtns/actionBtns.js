//Botones de accion que aparecen en cada fase de isotracker para tratar los archivos

const ActionBtns = props =>{
    var actionBtn1, actionBtn2
    if (props.currentTab === "Design"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Stress</button>
        actionBtn2 = <button class="btn btn-sm btn-primary" >Supports</button>
    }if (props.currentTab === "Stress"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Support</button>
        actionBtn2 = <button class="btn btn-sm btn-danger" >With Comments</button>
    }if (props.currentTab === "Support"){
        actionBtn1 = <button class="btn btn-sm btn-primary" style={{marginRight:"5px", marginLeft:"5px"}}>Stress</button>
        actionBtn2 = <button class="btn btn-sm btn-danger" >With Comments</button>
    }if (props.currentTab === "Materials"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Issuer</button>
        actionBtn2 = <button class="btn btn-sm btn-danger" >With Comments</button>
    }if (props.currentTab === "Issuer"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>IsoCtrl</button>
        actionBtn2 = <button class="btn btn-sm btn-danger" >With Comments</button>
    }if (props.currentTab === "LDE/IsoControl"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>To Issue</button>
        actionBtn2 = <button class="btn btn-sm btn-danger" >With Comments</button>
    }if (props.currentTab === "MyTray"){
        actionBtn1 = <button class="btn btn-sm btn-warning" name="destination" value="stress" style={{marginRight:"5px", marginLeft:"5px"}}>Unclaim</button>
        actionBtn2 = <button class="btn btn-sm btn-success" >Verify</button>
    }
    return(
        <div>
            {actionBtn1}
            {actionBtn2}
        </div>
    );
};

export default ActionBtns;