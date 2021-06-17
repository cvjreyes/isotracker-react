import React, { Component } from 'react';
import UploadReportPopUp from "../../components/uploadReportPopUp/uploadReportPopUp"
import UploadEquisModelledPopUp from "../../components/uploadEquisModelledPopUp/uploadEquisModelledPopUp"
import UploadEquisEstimatedPopUp from "../../components/uploadEquisEstimatedPopUp/uploadEquisEstimatedPopUp"
import UploadInstrumentationModelledPopUp from '../uploadInstrumentationModelledPopUp/uploadInstrumentationModelledPopUp';
import UploadInstrumentationEstimatedPopUp from '../uploadInstrumentationEstimatedPopUp/uploadInstrumentationEstimatedPopUp';
import UploadCivilEstimatedPopUp from '../uploadCivilEstimtedPopUp/uploadCivilEstimtedPopUp';
import UploadCivilModelledPopUp from '../uploadCivilModelledPopUp/uploadCivilModelledPopUp';
import UploadElectricalEstimatedPopUp from '../uploadElectricalEstimatedPopUp/uploadElectricalEstimatedPopUp';
import UploadElectricalModelledPopUp from '../uploadElectricalModelledPopUp/uploadElectricalModelledPopUp';

export default class ReportBoxBtns extends Component {

    setErrorReport(){
        this.props.setErrorReport();
    }

    setUploading(active){
        this.props.setUploading(active)
    }



    render() {
        let adminBtns = null
        if(this.props.user === "super@user.com"){
            adminBtns = <div><UploadReportPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <button className="btn btn-bg btn-info" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadStatus3D()}>Status 3D</button>
            <UploadEquisModelledPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadEquisEstimatedPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadInstrumentationModelledPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadInstrumentationEstimatedPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadCivilModelledPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadCivilEstimatedPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadElectricalModelledPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            <UploadElectricalEstimatedPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
            </div>

        }
        return (
            <div className="reports__container">
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadHistory()}>Comments</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadStatus()}>Status</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadPI()}>SPO-SIT</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadIssued()}>Issued</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadModelled()}>Modelled</button>
                {adminBtns}
                
            </div>
        );
    }
}