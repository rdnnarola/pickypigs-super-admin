import React from 'react'
import { useDropzone } from "react-dropzone";


const UploadImageComponent = (props) => {

    const { setFieldValue } = props;

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue("image", acceptedFiles[0]);
    },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <ul style={{color:"red",listStyle:"none",position:"relative",top:"7px"}}>
        {errors.map(e => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
  ));

  return (
    <div className="border bg-primary" type="button">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
          <p>Drop the files here ...</p>
          <em>(Only files with name less than 20 characters will be accepted)</em>
          </>
        ) : (
          <div className="d-flex justify-content-center align-items-center p-2">
            <img
              src={"images/upload.svg"}
              width="30px"
              className="img-fluid mr-4"
              alt="showpassword"
            />
            <p className="text-white m-0">Click to Upload Image</p>
            <ul >{fileRejectionItems}</ul>
          </div>
        )}
      </div>
    </div>
  );
};
    

export default UploadImageComponent
