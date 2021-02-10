const ActionBtns = props =>{
    var actionBtn1, actionBtn2
    if (props.currentTab === "Design"){
        actionBtn1 = <button class="btn btn-sm btn-success" name="destination" value="stress" style={{marginRight:"5px"}}>Stress</button>
        actionBtn2 = <button class="btn btn-sm btn-primary" >Supports</button>
    }
    return(
        <div>
            {actionBtn1}
            {actionBtn2}
        </div>
    );
};

export default ActionBtns;