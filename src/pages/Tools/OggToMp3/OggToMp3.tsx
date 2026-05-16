import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const OggToMp3: React.FC = () => {
  return (
    <ToolPage
      title="OGG to MP3"
      description="Convert OGG audio to MP3 format."
      actionType="convert"
      supportedFormats={['ogg']}
      lockedTargetFormat="mp3"
      maxFileSize="Unlimited"
      toolType="audio"
    />
  );
};

export default OggToMp3;
