import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const SvgToPng: React.FC = () => {
  return (
    <ToolPage
      title="SVG to PNG"
      description="Convert SVG vector graphics to PNG raster images."
      actionType="convert"
      supportedFormats={['svg']}
      lockedTargetFormat="png"
      maxFileSize="Unlimited"
      toolType="image"
    />
  );
};

export default SvgToPng;
