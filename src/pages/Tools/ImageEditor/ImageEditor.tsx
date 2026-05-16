import React, { useState, useRef } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';
import styles from './ImageEditor.module.css';
import { Upload, X, AlertTriangle, Edit } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError('');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setError('');
    } else {
      setError('Please drop a valid image file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearAll = () => {
    setFile(null);
    setPreviewUrl('');
    setError('');
  };

  const handleSave = (editedImageObject: any, designState: any) => {
    // Filerobot might not return imageBase64 directly unless configured, so we extract it from the canvas
    const url = editedImageObject.imageBase64 || editedImageObject.imageCanvas.toDataURL(editedImageObject.mimeType || 'image/png');
    
    const link = document.createElement('a');
    link.style.display = 'none';
    link.download = editedImageObject.fullName || `edited_${file?.name || 'image.png'}`;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}><Edit size={24} /></div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>Professional Image Editor</h1>
            <p className={styles.description}>Crop, filter, tune, and annotate your images with a premium, zero-latency local editor.</p>
          </div>
        </div>

        <div className={styles.workspace}>
          {!previewUrl ? (
            <div
              className={styles.dropZone}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/webp"
                className={styles.fileInput}
              />
              <div className={styles.uploadPrompt}>
                <Upload size={48} className={styles.uploadIcon} />
                <h3>Drop your image here</h3>
                <p>or click to browse</p>
              </div>
            </div>
          ) : (
            <div className={styles.editorContainer}>
              <button className={styles.clearButton} onClick={clearAll} title="Close Editor">
                <X size={20} />
              </button>
              
              {/* Note: FilerobotImageEditor has its own internal styling, so we just give it a container */}
              <div style={{ height: '70vh', minHeight: '600px', width: '100%' }}>
                <FilerobotImageEditor
                  source={previewUrl}
                  onSave={handleSave}
                  annotationsCommon={{
                    fill: '#ff0000',
                  }}
                  Text={{ text: 'ConvertFlix...' }}
                  Rotate={{ angle: 90, componentType: 'slider' }}
                  tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK, TABS.FILTERS, TABS.FINETUNE, TABS.RESIZE]}
                  defaultTabId={TABS.ADJUST}
                  defaultToolId={TOOLS.CROP}
                />
              </div>
            </div>
          )}

          {error && (
            <div className={styles.errorAlert}>
              <AlertTriangle size={20} />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
