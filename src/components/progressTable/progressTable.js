//Tabla que muestra el progreso de isoTracker

import "./progressTable.css"
import React, {useEffect} from 'react'

class ProgressTable extends React.Component{
    
    state={
        currentProgress: this.props.progress,
        currentRealProgress: this.props.realProgress,
        updateData: this.props.updateData,
        currentProgressISO: this.props.progressISO,
        currentRealProgressISO: this.props.realProgressISO,
        user: this.props.user
    }
    //Si el user es admin muestra mas informacion
   
    componentDidMount() {
        this.setState({
            currentProgress: this.props.progress,
            currentRealProgress: this.props.realProgress,
            currentProgressISO: this.props.progressISO,
            currentRealProgressISO: this.props.realProgressISO,
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props){
            this.setState({
                currentProgress: this.props.progress,
                currentRealProgress: this.props.realProgress,
                currentProgressISO: this.props.progressISO,
                currentRealProgressISO: this.props.realProgressISO,
            })
        }
    }

    render(){

    const currentProgressWidth = String(this.state.currentProgress)+"%"
    const currentRealProgressWidth = String(this.state.currentRealProgress)+"%"
    const currentProgressISOWidth = String(this.state.currentProgressISO)+"%"
    const currentRealProgressWidthISO = String(this.state.currentRealProgressISO)+"%"
    let headers, progress

    if (this.state.user === "admin"){

            headers =
            <tr>
                <td className="progressTable__header">Progress</td>
                <td className="progressTable__header">Progress ISO</td>
                <td className="progressTable__header">Real progress</td>
                <td className="progressTable__header">Real progress ISO</td>
            </tr>

            progress = <tr>
            <td className="progressTable__content__td">
                <div style={{color:"black", fontSize: "13px",width:currentProgressWidth,backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>{this.state.currentProgress}%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:currentProgressISOWidth,backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>{this.state.currentProgressISO}%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:currentRealProgressWidth,backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>{this.state.currentRealProgress}%
                </div>
            </td>
            <td style={{textAlign:"center", height: "19px"}}>
                <div style={{color:"black", fontSize: "13px",width:currentRealProgressWidthISO,backgroundColor: "#A0AFD9", height: "19px"}}>
                    <span class="sr-only"></span>{this.state.currentRealProgressISO}%
                </div>
            </td>                        
        </tr>     
    }else{
            headers = <tr>
                <td  style={{width: "11%"}} className="progressTable__header">Progress</td>
                <td  style={{width: "11%"}} className="progressTable__header">Progress ISO</td>
            </tr>

            progress = <tr>
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
            <table className="progressTable__table">
                <tbody className="progressTable__body">
                    {headers}
                    {progress}
                </tbody>
            </table>
        </td>
    );
};
}

export default ProgressTable;