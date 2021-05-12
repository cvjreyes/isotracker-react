import React, { Component } from 'react';
import UploadReportPopUp from "../../components/uploadReportPopUp/uploadReportPopUp"

export default class ReportBoxBtns extends Component {

    setErrorReport(){
        this.props.setErrorReport();
    }

    setUploading(active){
        this.props.setUploading(active)
    }

    render() {
        return (
            <div className="reports__container">
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadHistory()}>Comments</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadStatus()}>Status</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadPI()}>SPO-SIT</button>
                <button className="btn btn-bg btn-success" style={{float:"left", marginTop:"10px", marginLeft:"10px", height:"150px", width:"150px"}} onClick={() => this.props.downloadIssued()}>Issued</button>
                <UploadReportPopUp setUploading={this.setUploading.bind(this)} setErrorReport={this.setErrorReport.bind(this)}/>
                
            </div>
        );
    }
}