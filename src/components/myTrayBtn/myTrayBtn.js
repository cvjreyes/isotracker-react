import './myTrayBtn.css'
const MyTrayBtn = props =>{
    var myTrayBtn
    if(props.currentTab === "My Tray"){
        myTrayBtn = <button  type="button" className="btn btn-info btn-lg" style={{marginRight:"10px", width: "180px", backgroundColor: "#17a2b8"}}><b>My tray</b></button>
    }else{
        myTrayBtn = <button  type="button" className="btn btn-info btn-lg" style={{marginRight:"10px", width: "180px", backgroundColor: "lightblue"}} onClick={() => {props.onChange("My Tray")}}><b>My tray</b></button>
    }
    return(
        <td className="myTrayBtn__container">
            {myTrayBtn}
        </td>
    );
};

export default MyTrayBtn;