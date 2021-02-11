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
            <td className="progressTable__value">40%</td>
            <td className="progressTable__value">50%</td>
            <td className="progressTable__value">60%</td>
            <td className="progressTable__value">70%</td>                        
        </tr>
    }else{
        headers = 
        <tr>
            <td  style={{width: "11%"}} className="progressTable__header">Progress</td>
            <td  style={{width: "11%"}} className="progressTable__header">Progress ISO</td>
        </tr>
        progress = 
        <tr>
            <td className="progressTable__value">40%</td>
            <td className="progressTable__value">50%</td>                        
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