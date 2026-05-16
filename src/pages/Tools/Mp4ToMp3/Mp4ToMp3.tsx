import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const Mp4ToMp3: React.FC = () => {
  return (
    <ToolPage
      title="Extract Audio (MP4 to MP3)"
      description="Extract pure high-quality audio tracks from your video files in seconds. Drop an MP4 to get an MP3."
      actionType="convert"
      supportedFormats={['mp3']}
      maxFileSize="Unlimited"
      toolType="video"
      inputFormats={['mp4', 'mkv', 'webm', 'mov']}
      lockedTargetFormat="mp3"
    />
  );
};

export default Mp4ToMp3;
