import Bin from "../../assets/images/bin.png"

const BinBtn = props =>{
    return(
        <div>
            <input type="image" src={Bin} style={{width:"40px", marginTop:"20px", marginLeft:"10px"}} onClick={() => {props.onChange("Recycle bin")}} />
        </div>
    );
};

export default BinBtn;