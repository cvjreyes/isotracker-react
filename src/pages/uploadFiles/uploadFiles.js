import ReportBtns from "../../components/reportBtns/reportBtns"
import StateTable from "../../components/stateTable/stateTable"
import NavBtns from "../../components/navBtns/navBtns"
import "./styles.css"
import DragAndDrop from "../../components/dragAndDrop/dragAndDrop"

const UploadFiles = () => {
    return (
        <body>
            <div className="container">
                <center>
                    <br></br>
                    
                    <h2 className="title__container">
                        <b>
                            <i className="iso__title">IsoTracker</i>
                        </b>
                    </h2>
                    <h3 className="iso__subtitle">History</h3>
                </center>
                <br></br>
                <table style={{width: "100%"}}>
                    <tbody>
                        <tr>
                            <td>
                                <ReportBtns/>
                            </td>
                            <td style={{width: "64%"}}>
                                <StateTable/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <br></br>
                <button class="btn btn-info btn-lg" style={{width: "100%"}}>Click here to upload</button>
                <DragAndDrop/>
                <center className="navBtns__center">
                    <NavBtns/>
                </center>
            </div>
        </body>

        
    );
};

export default UploadFiles;
