import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const WebpToPng: React.FC = () => {
  return (
    <ToolPage
      title="WEBP to PNG"
      description="Convert WebP to PNG format."
      actionType="convert"
      supportedFormats={['webp']}
      lockedTargetFormat="png"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default WebpToPng;
