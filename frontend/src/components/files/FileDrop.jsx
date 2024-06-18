import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileDrop = ({ onDrop }) => {
  const onDropCallback = useCallback((acceptedFiles) => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <div
      {...getRootProps()}
      className={`border-4 outline-none flex flex-col justify-center items-center border-dashed bg-blue-100 rounded-xl w-full max-w-md p-6 transition duration-300 ease-in-out transform hover:bg-blue-200 hover:scale-105 hover:shadow-lg cursor-pointer
      ${isDragActive ? 'bg-blue-300 border-blue-500' : 'bg-blue-100 border-blue-300'}`}
    >
      <CloudUploadIcon className="text-cyan-900 text-6xl mb-4 animate-bounce" />
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p className="text-lg font-semibold text-blue-700">Drop the files here ...</p> :
          <p className="md:text-lg text-sm text-center font-semibold text-blue-700">
            Drag and drop your site output folder here, or 
            <span className="text-blue-500 underline ml-1">browse to upload</span>
          </p>
      }
    </div>
  );
};

export default FileDrop;
