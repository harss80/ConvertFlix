import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const MkvToMp4: React.FC = () => {
  return (
    <ToolPage
      title="MKV to MP4"
      description="Convert MKV files to universally supported MP4."
      actionType="convert"
      supportedFormats={['mkv']}
      lockedTargetFormat="mp4"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default MkvToMp4;
