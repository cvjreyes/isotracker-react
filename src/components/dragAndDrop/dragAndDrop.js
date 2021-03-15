//Drag and drop para subir isometricas

import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Upload, message , Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {Redirect} from "react-router-dom";


class DragAndDrop extends React.Component{

  state = {
    fileList: [],
    uploading: false,
    clear: false
  };

  uploadFile(file) {
    fetch('http://localhost:5000/upload', {
      // content-type header should not be specified!
      method: 'POST',
      body: file,
    })
      .then(response => response.json())
      .then(success => {
        // Do something with the successful response
        message.success('Files uploaded successfully.');
        this.setState({
          fileList: []
        });
      })
      .catch(error => console.log(error)
    );
  }


  handleUpload = () =>{
    
    this.state.fileList.forEach(file => {
      const formData  = new FormData();
      formData.append('file', file);
      this.uploadFile(formData);
    });    
  }

render (){
  
  const fileList = this.state.fileList;
  const { Dragger } = Upload;

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
          </div>
      );
      }
}

export default DragAndDrop;


