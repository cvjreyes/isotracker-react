import "./reportBtns.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Report_btns = props => {
    var StatusButton, HistoryButton
    if(props.currentTab === "Status"){
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", marginRight:"10px", width:"180px"}}><b>Status</b></button>
    }else{
        StatusButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", marginRight:"10px", width:"180px"}} onClick={() => {props.onChange("Status")}}><b>Status</b></button>
    }
    if(props.currentTab === "History"){
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", width:"180px"}}><b>History</b></button>
    }else{
        HistoryButton = <button  type="button" class="btn btn-info btn-lg" style={{backgroundColor: "lightblue", width:"180px"}} onClick={() => {props.onChange("History");}}><b>History</b></button>
    }
    return(
        <td className="td__btns">
            {StatusButton}
            {HistoryButton}
        </td>
    );
};

export default Report_btns;