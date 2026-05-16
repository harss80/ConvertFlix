import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const FlacToMp3: React.FC = () => {
  return (
    <ToolPage
      title="FLAC to MP3"
      description="Convert lossless FLAC audio to MP3."
      actionType="convert"
      supportedFormats={['flac']}
      lockedTargetFormat="mp3"
      maxFileSize="Unlimited"
      toolType="audio"
    />
  );
};

export default FlacToMp3;
