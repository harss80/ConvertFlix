import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const PngToWebp: React.FC = () => {
  return (
    <ToolPage
      title="PNG to WEBP"
      description="Convert PNG to WEBP for smaller sizes."
      actionType="convert"
      supportedFormats={['png']}
      lockedTargetFormat="webp"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default PngToWebp;
