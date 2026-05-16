import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const M4aToMp3: React.FC = () => {
  return (
    <ToolPage
      title="M4A to MP3"
      description="Convert M4A audio to MP3 format."
      actionType="convert"
      supportedFormats={['m4a']}
      lockedTargetFormat="mp3"
      maxFileSize="Unlimited"
      toolType="audio"
    />
  );
};

export default M4aToMp3;
