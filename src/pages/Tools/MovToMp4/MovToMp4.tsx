import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const MovToMp4: React.FC = () => {
  return (
    <ToolPage
      title="MOV to MP4"
      description="Instantly convert bulky Apple MOV files into highly compatible MP4 format. 100% local processing."
      actionType="convert"
      supportedFormats={['mp4']}
      maxFileSize="Unlimited"
      toolType="video"
      inputFormats={['mov']}
      lockedTargetFormat="mp4"
    />
  );
};

export default MovToMp4;
