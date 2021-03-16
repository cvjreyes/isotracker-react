//Drag and drop para subir isometricas

import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Upload, message , Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse'


class DragAndDrop extends React.Component{

  state = {
    fileList: [],
    uploading: false,
    clear: false,
    success: false,
    error: false,
    errorAlerts: [],
  };

  uploadFile(file) {
    fetch('http://localhost:5000/upload', {
      // content-type header should not be specified!
      method: 'POST',
      body: file,
    })
      .then(response => {
        // Do something with the successful response
        if (response.status === 200){
          for (var value of file.values()) {
            this.setState({
              success : true,
            })
          }
        }else{
          for (var value of file.values()) {
            var joined = this.state.errorAlerts.concat(value.name);
            this.setState({
              errorAlerts : joined,
              error: true
            })
          }
          console.log(this.state.errorAlerts)
        }
        this.setState({
          fileList: []
        });
      })
      .catch(error => message.error(error)
    );
  }


  handleUpload = () =>{
    this.setState({
      success: false,
      error: false,
      errorAlerts: []
    })
    this.state.fileList.forEach(file => {
      
      const formData  = new FormData();
      formData.append('file', file);
      this.uploadFile(formData);

    });    
  }

render (){
  
  const fileList = this.state.fileList;
  const errorAlerts = this.state.errorAlerts;
  const { Dragger } = Upload;

  var errors = []
  for(let i = 0; i < errorAlerts.length; i++){
    var extension = "";
    var j = errorAlerts[i].lastIndexOf('.');
    if (j > 0) {
      extension = errorAlerts[i].substring(j+1);
    }
    if (extension == 'zip' || extension == 'pdf' ){
      errors.push(<Alert severity="error"
      >
        The file {errorAlerts[i]} already exists!

      </Alert>)
    }else{
      errors.push(<Alert severity="error"
      >
        The file {errorAlerts[i]} has an invalid format!

      </Alert>)
    }
  }

  console.log(errors)

  const props = {
    name: 'file',
    multiple: true,
    action: 'http://localhost:5000/upload',
    onRemove: file => {
      this.setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      this.setState(state => ({
        fileList: [...state.fileList, file],
      }));

      return false;
      },
    accept: ".pdf,.zip",
      fileList
    };

      return(
          <div>
            <button onClick={this.handleUpload} class="btn btn-info btn-lg" style={{backgroundColor: "#17a2b8", width:"100%"}}>Upload files</button>
              <Dragger {...props}>
                
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag the isometrics to this area to upload</p>
                  <p className="ant-upload-hint">
                    You can drop single or multiple isometrics
                  </p>
              </Dragger>,
              <Collapse in={this.state.success}>
              <Alert
              >
                The files have been uploaded!

              </Alert>
            </Collapse>
            <Collapse in={this.state.error}>
              {errors}
            </Collapse>
          </div>
      );
      }
}

export default DragAndDrop;


