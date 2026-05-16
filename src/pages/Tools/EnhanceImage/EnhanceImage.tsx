import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const EnhanceImage: React.FC = () => {
  return (
    <ToolPage
      title="Enhance Image"
      description="Use advanced algorithms to upscale, sharpen, and improve the quality of your images without losing detail."
      actionType="enhance"
      supportedFormats={['jpg', 'jpeg', 'png', 'webp']}
      maxFileSize="Unlimited"
      toolType="image"
      inputFormats={['jpg', 'jpeg', 'png', 'webp']}
    />
  );
};

export default EnhanceImage;
