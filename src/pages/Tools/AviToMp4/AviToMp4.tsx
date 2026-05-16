import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const AviToMp4: React.FC = () => {
  return (
    <ToolPage
      title="AVI to MP4"
      description="Convert legacy AVI videos to modern MP4 format."
      actionType="convert"
      supportedFormats={['avi']}
      lockedTargetFormat="mp4"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default AviToMp4;
