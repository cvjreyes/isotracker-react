import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import React from 'react'
import {message} from'antd'
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse'

const Layout = ({ input, previews, submitButton, dropzoneProps, files, extra: { maxFiles } }) => {
  return (
    <div>
      
      {submitButton}
      <div {...dropzoneProps}>
      
      {previews}
      {files.length < maxFiles && input}
        
      </div>

      
    </div>
  )
}

class DragAndDrop extends React.Component{

  state = {
    fileList: [],
    success: false,
    error: false,
    uploaded: false,
    errorAlerts: [],
    max: 0,
    uploadingPreview: false,
    uploading: false
  };

  async uploadFile(file) {

    await fetch('http://localhost:5000/upload', {
      // content-type header should not be specified!
      method: 'POST',
      body: file,
    })
      .then(response => {
        // Do something with the successful response
        if (response.status === 200){
          console.log("ADSAD")
          if(!this.state.success){
              this.setState({
                success : true,
              })
          }

          let filename = null;
          for (let value of file.values()){
            filename = value.name
          }
          let extension = "";
          let i = filename.lastIndexOf('.');
          if (i > 0) {
            extension = filename.substring(i+1);
          }
          if(extension === "pdf"){
            let body =  {
              fileName: filename,
              user: this.props.user,
            }
            fetch('http://localhost:5000/uploadHis', {
              // content-type header should not be specified!
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            }).then(response => console.log(response.json()))
            .catch(error => message.error(error))
          }
        }else{
          for (let value of file.values()) {
            let joined = this.state.errorAlerts.concat(value.name);
            this.setState({
              errorAlerts : joined,
              error: true
            })
          }
        }
        let max = this.state.max - 1
        this.setState({
          max: max
        })
        console.log(max)
        if (max === 0){
          this.setState({
            uploaded: true,
            uploading: false
          })
        }
        
      })
      .catch(error => message.error(error)
    );
  }

  async updateFile(file) {

    await fetch('http://localhost:5000/update', {
      // content-type header should not be specified!
      method: 'POST',
      body: file,
    })
      .then(response => {
        // Do something with the successful response
        if (response.status === 200){
          if(!this.state.success){
              this.setState({
                success : true,
              })
          }

          let filename = null;
          for (let value of file.values()){
            filename = value.name
          }
          let extension = "";
          let i = filename.lastIndexOf('.');
          if (i > 0) {
            extension = filename.substring(i+1);
          }
          if(extension === "pdf"){
            let body =  {
              file: filename,
              user: this.props.user,
            }
            console.log(body)
            fetch('http://localhost:5000/updateHis', {
              // content-type header should not be specified!
              method: 'POST',
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            }).then(response => console.log(response.json()))
            .catch(error => message.error(error))
          }
        }else{
          for (let value of file.values()) {
            let joined = this.state.errorAlerts.concat(value.name);
            this.setState({
              errorAlerts : joined,
              error: true
            })
          }
        }
        let max = this.state.max - 1
        this.setState({
          max: max
        })
        if (max === 0){
          this.setState({
            uploaded: true,
            uploading: false
          })
        }
        
      })
      .catch(error => message.error(error)
    );
  }


  handleSubmit = async (files, allFiles) => {

    this.setState({
      success: false,
      uploaded: false,
      error: false,
      errorAlerts: [],
      counter: 0,
      max: files.length,
      uploading: true
    })

    await allFiles.forEach(file => {

      
      const formData  = new FormData(); 
      formData.append('file', file.file);       
      if(this.props.mode == "upload"){
        this.uploadFile(formData);
      }else{
        if(String(this.props.iso).trim() === String(file.file.name.split('.').slice(0, -1)).trim() || 
           String(this.props.iso+'-CL').trim() === String(file.file.name.split('.').slice(0, -1)).trim() ){
          console.log("Pertenece " + file.file.name)
          this.updateFile(formData);
        }else{
          let joined = this.state.errorAlerts.concat(file.file.name);
            this.setState({
              errorAlerts : joined,
              error: true
            })
        }
      }
      file.remove();
    });    

      if (!this.state.uploaded){
        this.setState({
          uploading: false,
          uploaded: true
        })
      }

  }

  render(){

    const errorAlerts = this.state.errorAlerts;
    let errors = []
    if(errorAlerts.length > 0){
      for(let i = 0; i < errorAlerts.length; i++){
        
        if (this.props.mode == "upload"){
          errors.push(<Alert severity="error"
          >
            The file {errorAlerts[i]} already exists!

          </Alert>)
        }else{
          errors.push(<Alert severity="error"
          >
            The file {errorAlerts[i]} doesn't belong to this isometric!

          </Alert>)
        }
      }
    }

    let inputContent = null
    let styles = null

    if(this.props.mode == "upload"){
      inputContent = "Drop isometrics here"
      styles = {
        dropzone: {
          maxHeight: '400px',
        },
      }
    }else{
      inputContent = "Drop the files to update"
      styles = {
        dropzone: {
          height: '250px'
        },
        dropzoneActive: {
          height: '300px'
        },
        previewContainer:{
          height: '2px'
        }
    }

    const dropzoneStyle = {
      width  : "1%",
      height : "20%",
      border : "1px solid black"
   };
   
  }

    return (
      <div>
        <Dropzone
          LayoutComponent={Layout}
          onSubmit={this.handleSubmit}
          inputContent= {inputContent}
          styles={styles}
        />

        <Collapse in={this.state.success}>
          <Collapse in={this.state.uploaded}>
            <Alert
            >
              The files have been uploaded!

            </Alert>
          </Collapse>
        </Collapse>
        <Collapse in={this.state.error}>
          <Collapse in={this.state.uploaded}>
            {errors}
          </Collapse>
          
        </Collapse>
        <Collapse in={this.state.uploading}>
          <Alert severity="info"
            >
              The files are uploading...

            </Alert>
        </Collapse>
        
      </div>
    )
  }
}

export default DragAndDrop;