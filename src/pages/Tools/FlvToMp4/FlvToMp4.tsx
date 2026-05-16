import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const FlvToMp4: React.FC = () => {
  return (
    <ToolPage
      title="FLV to MP4"
      description="Convert Flash FLV videos to MP4 format."
      actionType="convert"
      supportedFormats={['flv']}
      lockedTargetFormat="mp4"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default FlvToMp4;
