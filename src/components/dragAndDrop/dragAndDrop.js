//Drag and drop para subir isometricas

import React from 'react';
import 'antd/dist/antd.css';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const DragAndDrop = () =>{
    return(
        <div>
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
};

export default DragAndDrop;