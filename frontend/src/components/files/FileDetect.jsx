import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const FileDetect = ({ fileUrl }) => {
  const [fileType, setFileType] = useState('');

  useEffect(() => {
    const determineFileType = (url) => {
      const extension = url.split('.').pop().toLowerCase();
      if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension)) {
        return 'image';
      } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
        return 'video';
      } else if (['pdf'].includes(extension)) {
        return 'pdf';
      } else if (['xlsx', 'xls'].includes(extension)) {
        return 'excel';
      } else {
        return 'unknown';
      }
    };

    setFileType(determineFileType(fileUrl));
  }, [fileUrl]);

  const renderFile = () => {
    switch (fileType) {
      case 'image':
        return <img src={fileUrl} alt="file" style={{ maxWidth: '100%', height: 'auto' }} />;
      case 'video':
        return (
          <video controls style={{ maxWidth: '100%' }}>
            <source src={fileUrl} type={`video/${fileUrl.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        );
      case 'pdf':
        return (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <div style={{ height: '750px' }}>
              <Viewer fileUrl={fileUrl} />
            </div>
          </Worker>
        );
      case 'excel':
        return <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`} width="100%" height="600px" frameBorder="0" />;
      default:
        return <p>Cannot display this file type</p>;
    }
  };

  return (
    <div>
      {renderFile()}
    </div>
  );
};

export default FileDetect;