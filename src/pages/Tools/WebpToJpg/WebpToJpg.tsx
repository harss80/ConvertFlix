import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const WebpToJpg: React.FC = () => {
  return (
    <ToolPage
      title="WEBP to JPG"
      description="Convert WebP images to standard JPG format."
      actionType="convert"
      supportedFormats={['webp']}
      lockedTargetFormat="jpg"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default WebpToJpg;
