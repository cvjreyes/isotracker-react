import "./progressTable.css"

const ProgressTable = props =>{
    var headers, progress
    if (props.user === "admin"){
        headers = 
        <tr>
            <td  style={{width: "11%"}} className="progressTable__header">Progress</td>
            <td  style={{width: "11%"}} className="progressTable__header">Progress ISO</td>
            <td  style={{width: "11%"}} className="progressTable__header">Real progress</td>
            <td  style={{width: "11%"}} className="progressTable__header">Real progress ISO</td>
        </tr>
        progress = 
        <tr>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:"40%",backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>40%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:"50%",backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>50%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:"80%",backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>80%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:"60%",backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>60%
                </div>
            </td>                        
        </tr>
    }else{
        headers = 
        <tr>
            <td  style={{width: "11%"}} className="progressTable__header">Progress</td>
            <td  style={{width: "11%"}} className="progressTable__header">Progress ISO</td>
        </tr>
        progress = 
        <tr>
            <td style={{textAlign:"center"}}>
                <div style={{color:"black", fontSize: "15px",width:"40%",backgroundColor: "#A0AFD9", height: "21px"}}>
                    <span class="sr-only"></span>40%
                </div>
            </td>
            <td style={{textAlign:"center"}}>
                <div style={{color:"black", fontSize: "15px",width:"50%",backgroundColor: "#A0AFD9", height: "21px"}}>
                    <span class="sr-only"></span>50%
                </div>
            </td>                      
        </tr>
    }
    return (
        <td className="progressTable__td">
            <table style={{width: "100%"}} className="progressTable__table">
                <tbody className="progressTable__body">
                    {headers}
                    {progress}
                </tbody>
            </table>
        </td>
    );
};

export default ProgressTable;