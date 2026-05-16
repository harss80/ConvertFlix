import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const ImageToPdf: React.FC = () => {
  return (
    <ToolPage
      title="Image to PDF"
      description="Convert JPG/PNG images to a PDF document."
      actionType="convert"
      supportedFormats={['jpg', 'jpeg', 'png']}
      lockedTargetFormat="pdf"
      maxFileSize="Unlimited"
      toolType="pdf"
    />
  );
};

export default ImageToPdf;
