import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const AacToMp3: React.FC = () => {
  return (
    <ToolPage
      title="AAC to MP3"
      description="Convert AAC audio to standard MP3 format."
      actionType="convert"
      supportedFormats={['aac']}
      lockedTargetFormat="mp3"
      maxFileSize="Unlimited"
      toolType="audio"
    />
  );
};

export default AacToMp3;
