import React from 'react';
import { Widget } from 'react-cloudinary-upload-widget';

const FileUpload = ({
  folder,
  resourceType,
  text,
  successCallback,
  errorCallback,
}) => {
  return (
    <Widget
      sources={['local', 'camera']}
      resourceType={resourceType} // optionally set with 'auto', 'image', 'video' or 'raw' -> default = 'auto'
      cloudName={process.env.CLOUD_NAME} // your cloudinary account cloud name.
      uploadPreset={process.env.CLOUD_UPLOAD_PRESENT} // check that an upload preset exists and check mode is signed or unisgned
      buttonText={text} // default 'Upload Files'
      folder={folder} // set cloudinary folder name to send file
      autoClose={false} // will close the widget after success. Default true
      onSuccess={successCallback} // add success callback -> returns result
      onFailure={errorCallback} // add failure callback -> returns 'response.error' + 'response.result'
      logging={false} // logs will be provided for success and failure messages,
      destroy // will destroy the widget on completion
      apiKey={process.env.CLOUD_API_KEY} // cloudinary API key -> number format
    />
  );
};

export default FileUpload;
