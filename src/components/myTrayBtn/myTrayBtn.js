import './myTrayBtn.css'
const MyTrayBtn = props =>{
    var myTrayBtn
    if(props.currentTab === "MyTray"){
        myTrayBtn = <button  type="button" class="btn btn-info btn-lg" style={{marginRight:"10px", width: "180px", backgroundColor: "#17a2b8"}}><b>My tray</b></button>
    }else{
        myTrayBtn = <button  type="button" class="btn btn-info btn-lg" style={{marginRight:"10px", width: "180px", backgroundColor: "lightblue"}} onClick={() => {props.onChange("MyTray")}}><b>My tray</b></button>
    }
    return(
        <td className="myTrayBtn__container">
            {myTrayBtn}
        </td>
    );
};

export default MyTrayBtn;