import React, { Component } from 'react';
import SuccessIcon from "../../assets/images/CheckCircle.png"
import ErrorIcon from "../../assets/images/WarningCircle.png"
import WarningIcon from "../../assets/images/Warning.png"
import "./alert.css"

export default class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: props.type,
            text: props.text,
            alert: null,
            subtext: props.subtext,
            popUp: props.popUp,
            change: props.change
        }
        
    }

    componentDidMount(){
        let alertComponent = null
        if(this.state.type === "success"){ //Si la alerta es de tipo success
            if(this.state.change){
                //Se construye la alerta a partir de la info recibida desde el padre
                alertComponent = <div className="alert__success">
                                    
                <img src={SuccessIcon} className="alert__icon" alt="success"></img>
                <div className="text__alert__container">
                    <text className="alert__title">Excellent!</text>
                    <text className="alert__text" style={{marginLeft:"0px"}}>{this.props.text}</text>
                </div>
            
            </div>
            }else{
                alertComponent = <div className="alert__success">
                                    
                                    <img src={SuccessIcon} className="alert__icon" alt="success2"></img>
                                    <div className="text__alert__container">
                                        <text className="alert__title">Excellent!</text>
                                        <text className="alert__text" style={{marginLeft:this.props.margin}}>{this.props.text}</text>
                                    </div>
                                
                                </div>
            }
            this.setState({alert: alertComponent})
        }else if(this.state.type === "error"){ //Si es de error
            if(this.state.change){
                //Lo mismo pero incluye un campo de subtexto
                alertComponent = <div className="alert__error">
                                    
                <img src={ErrorIcon} className="alert__icon" alt="error"></img>
                <div className="text__alert__container">
                    <text className="alert__title">Oops!</text>
                    <text className="alert__error__text" style={{marginLeft:"0px"}}>Something has failed:</text>
                    <text className="alert__subtext" style={{marginLeft:this.props.margin}}>{this.props.subtext}</text>
                </div>
            
            </div>
            }else{
                alertComponent = <div className="alert__error">
                                    
                                    <img src={ErrorIcon} className="alert__icon" alt="error2"></img>
                                    <div className="text__alert__container">
                                        <text className="alert__title">Oops!</text>
                                        <text className="alert__error__text">Something has failed:</text>
                                        <text className="alert__subtext" style={{marginLeft:this.props.margin}}>{this.props.subtext}</text>
                                    </div>
                                
                                </div>
            }
            this.setState({alert: alertComponent})
        }else if(this.state.type==="qtracker"){ //Si la alerta es de pit(ya no se usa excepto por FMC)
            alertComponent = <div className="alert__qtracker">
                                    
                                    <img src={SuccessIcon} className="alert__icon" alt="success"></img>
                                    <div className="text__alert__container">
                                        <text className="alert__title">Success</text>
                                        <text className="alert__text" style={{marginLeft:"-1px"}}>Request sent successfully!</text>
                                    </div>
                                
                                </div>
             this.setState({alert: alertComponent})
        }else{ //En caso contrario es un warning
            if(this.state.popUp){ //Si es una alerta dentro de un popup los margenes son distintos
                alertComponent = <div className="alert__warning" style={{marginTop:"-200px"}}>
                                    
                                    <img src={WarningIcon} className="alert__icon" alt="warning"></img>
                                    <div className="text__alert__container">
                                        <text className="alert__title">Warning</text>
                                        <text className="alert__text" style={{marginLeft:this.props.margin}}>{this.props.text}</text>
                                    </div>
                                
                                </div>
            }else{
                alertComponent = <div className="alert__warning">
                                    
                                    <img src={WarningIcon} className="alert__icon" alt="warning2"></img>
                                    <div className="text__alert__container">
                                        <text className="alert__title">Warning</text>
                                        <text className="alert__text" style={{marginLeft:this.props.margin}}>{this.props.text}</text>
                                    </div>
                                
                                </div>
            }
            this.setState({alert: alertComponent})  

        }
    }

    
    

    render() {

        return (
            <div className="alert__container__fade">
                {this.state.alert}
            </div>           
        );
    }
}