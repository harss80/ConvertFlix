import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const WebmToMp4: React.FC = () => {
  return (
    <ToolPage
      title="WEBM to MP4"
      description="Convert WebM browser videos to MP4."
      actionType="convert"
      supportedFormats={['webm']}
      lockedTargetFormat="mp4"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default WebmToMp4;
