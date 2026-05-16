import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const PngToJpg: React.FC = () => {
  return (
    <ToolPage
      title="PNG to JPG Converter"
      description="Instantly convert transparent PNG files into optimized JPG images. Fast, local, and incredibly secure."
      actionType="convert"
      supportedFormats={['jpg']}
      maxFileSize="Unlimited"
      toolType="image"
      inputFormats={['png']}
      lockedTargetFormat="jpg"
    />
  );
};

export default PngToJpg;
