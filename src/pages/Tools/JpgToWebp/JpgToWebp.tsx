import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const JpgToWebp: React.FC = () => {
  return (
    <ToolPage
      title="JPG to WEBP"
      description="Convert JPG to WEBP for better web performance."
      actionType="convert"
      supportedFormats={['jpg', 'jpeg']}
      lockedTargetFormat="webp"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default JpgToWebp;
