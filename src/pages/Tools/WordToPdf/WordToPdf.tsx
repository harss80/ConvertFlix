import React from 'react';
import ToolPage from '../../../components/ToolPage/ToolPage';

const WordToPdf: React.FC = () => {
  return (
    <ToolPage
      title="Word to PDF"
      description="Convert Word documents (DOC, DOCX) to secure PDF format. Preserve all formatting, fonts, and layouts perfectly."
      actionType="convert"
      supportedFormats={['pdf']}
      maxFileSize="Unlimited"
      toolType="pdf"
      inputFormats={['doc', 'docx']}
      lockedTargetFormat="pdf"
    />
  );
};

export default WordToPdf;
