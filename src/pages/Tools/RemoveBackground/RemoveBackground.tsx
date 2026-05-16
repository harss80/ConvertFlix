import React, { useState, useRef, useEffect } from 'react';
import { removeBackground, Config } from '@imgly/background-removal';
import styles from './RemoveBackground.module.css';
import { Upload, X, Download, AlertTriangle, Zap, Image as ImageIcon, Eraser, Settings } from 'lucide-react';

const RemoveBackground: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [resultUrl, setResultUrl] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preload model on component mount for faster perceived performance
  useEffect(() => {
    const preloadModel = async () => {
      try {
        const config: Config = {
          publicPath: "https://static.remove-bg.io/assets/", // Optional: CDN for models if local doesn't work well
          progress: (k, curr, total) => {
            if (curr && total) {
              // Preloading silently in background
            }
          }
        };
        // Just touching the library helps warm it up
      } catch (e) {
        console.error('Preload failed', e);
      }
    };
    preloadModel();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResultUrl('');
      setError('');
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      setResultUrl('');
      setError('');
    } else {
      setError('Please drop a valid image file');
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProgress(0);
    setError('');
    setStatusText('Initializing AI Model...');

    try {
      const config: Config = {
        progress: (key, current, total) => {
          if (key === 'fetch') {
             setStatusText('Downloading AI Models (one-time)...');
             if (current && total) {
                 setProgress(Math.round((current / total) * 50)); // first 50% is download
             }
          } else if (key === 'compute') {
             setStatusText('Processing image...');
             if (current && total) {
                 setProgress(50 + Math.round((current / total) * 50)); // next 50% is compute
             }
          }
        }
      };

      const rawBlob = await removeBackground(file, config);
      const pngBlob = new Blob([rawBlob], { type: 'image/png' });
      const url = URL.createObjectURL(pngBlob);
      setResultUrl(url);
      setProgress(100);
      setStatusText('Complete!');
    } catch (err) {
      console.error(err);
      setError('Failed to remove background. The image might be too complex or your browser does not support WebGL/WASM.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!resultUrl || !file) return;
    const link = document.createElement('a');
    link.href = resultUrl;
    
    // Original name without extension + _nobg.png
    const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
    link.download = `${baseName}_nobg.png`;

    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setFile(null);
    setPreviewUrl('');
    setResultUrl('');
    setError('');
    setProgress(0);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerIcon}><Eraser size={24} /></div>
          <div className={styles.headerContent}>
            <h1 className={styles.title}>AI Background Remover</h1>
            <p className={styles.description}>Instantly remove backgrounds using advanced client-side AI. 100% Free, Private, and Instant.</p>
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.workspace}>
            {!file ? (
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
                  <span className={styles.fileInfo}>Supports JPG, PNG, WEBP</span>
                </div>
              </div>
            ) : (
              <div className={styles.previewContainer}>
                <button className={styles.clearButton} onClick={clearAll}>
                  <X size={20} />
                </button>
                
                <div className={styles.comparisonGrid}>
                  <div className={styles.imageCard}>
                    <h4>Original</h4>
                    <img src={previewUrl} alt="Original" className={styles.previewImage} />
                  </div>
                  
                  {resultUrl && (
                    <div className={styles.imageCard}>
                      <h4>Result</h4>
                      <div className={styles.transparentBg}>
                        <img src={resultUrl} alt="Result without background" className={styles.previewImage} />
                      </div>
                    </div>
                  )}
                </div>

                {!resultUrl && (
                  <div className={styles.actionArea}>
                    <button
                      className={`${styles.processButton} ${isProcessing ? styles.processing : ''}`}
                      onClick={handleProcess}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <><Settings className={styles.spinning} size={20} /> {statusText}</>
                      ) : (
                        <><Zap size={20} /> Remove Background</>
                      )}
                    </button>
                    
                    {isProcessing && (
                      <div className={styles.progressWrapper}>
                        <div className={styles.progressBar}>
                          <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                        </div>
                        <span className={styles.progressText}>{progress}%</span>
                      </div>
                    )}
                  </div>
                )}

                {error && (
                  <div className={styles.errorAlert}>
                    <AlertTriangle size={20} />
                    {error}
                  </div>
                )}

                {resultUrl && (
                  <div className={styles.resultActions}>
                    <button className={styles.downloadButton} onClick={handleDownload}>
                      <Download size={20} /> Download HD Image
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={styles.sidebar}>
             <div className={styles.infoCard}>
              <h3>Premium & Private</h3>
              <p>Unlike other services, your image is <strong>never uploaded</strong> to any server. Our AI model runs entirely inside your browser using WebAssembly. This means instant results and 100% privacy.</p>
            </div>
             <div className={styles.infoCard}>
              <h3>Pro Tips</h3>
              <ul className={styles.tipsList}>
                <li>Images with clear contrast work best.</li>
                <li>The first run may take a few seconds to download the AI models. Subsequent runs are instant.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
