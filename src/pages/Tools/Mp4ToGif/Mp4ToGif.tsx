import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const Mp4ToGif: React.FC = () => {
  return (
    <ToolPage
      title="MP4 to GIF"
      description="Convert MP4 videos to animated GIFs."
      actionType="convert"
      supportedFormats={['mp4']}
      lockedTargetFormat="gif"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default Mp4ToGif;
