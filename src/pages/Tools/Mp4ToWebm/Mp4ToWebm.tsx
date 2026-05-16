import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const Mp4ToWebm: React.FC = () => {
  return (
    <ToolPage
      title="MP4 to WEBM"
      description="Convert MP4 videos to WebM format for HTML5."
      actionType="convert"
      supportedFormats={['mp4']}
      lockedTargetFormat="webm"
      maxFileSize="Unlimited"
      toolType="video"
    />
  );
};

export default Mp4ToWebm;
