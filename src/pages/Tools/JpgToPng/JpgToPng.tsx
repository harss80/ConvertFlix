import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const JpgToPng: React.FC = () => {
  return (
    <ToolPage
      title="JPG to PNG"
      description="Convert JPG images to PNG with transparency support."
      actionType="convert"
      supportedFormats={['jpg', 'jpeg']}
      lockedTargetFormat="png"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default JpgToPng;
