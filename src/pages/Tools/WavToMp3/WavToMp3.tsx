import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const WavToMp3: React.FC = () => {
  return (
    <ToolPage
      title="WAV to MP3"
      description="Compress massive uncompressed WAV audio files into streamlined MP3s without audible quality loss."
      actionType="convert"
      supportedFormats={['mp3']}
      maxFileSize="Unlimited"
      toolType="audio"
      inputFormats={['wav', 'flac', 'aac', 'ogg']}
      lockedTargetFormat="mp3"
    />
  );
};

export default WavToMp3;
