import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const Mp3ToWav: React.FC = () => {
  return (
    <ToolPage
      title="MP3 to WAV"
      description="Convert MP3 to uncompressed WAV format."
      actionType="convert"
      supportedFormats={['mp3']}
      lockedTargetFormat="wav"
      maxFileSize="Unlimited"
      toolType="audio"
    />
  );
};

export default Mp3ToWav;
