import React, { useState } from 'react';
import '../styles/FileUpload.css';

function FileUpload({ onUpload, onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const uploadedFiles = Array.from(e.dataTransfer.files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      }));
      setFiles(uploadedFiles);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      const uploadedFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
      }));
      setFiles(uploadedFiles);
    }
  };

  const handleUpload = () => {
    files.forEach(file => {
      onUpload(file.name, file.size);
    });
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal">
        <div className="modal-header">
          <h2>Upload Files</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div 
          className={`drop-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <p>📁 Drag and drop files here</p>
          <p className="or">or</p>
          <label className="file-input-label">
            Browse files
            <input 
              type="file" 
              multiple 
              onChange={handleFileInput}
              className="file-input"
            />
          </label>
        </div>

        {files.length > 0 && (
          <div className="file-list">
            <h3>Files to upload ({files.length}):</h3>
            {files.map((file, index) => (
              <div key={index} className="file-item-upload">
                <span>{file.name}</span>
                <span className="size">{file.size}</span>
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button 
            className="btn-primary"
            onClick={handleUpload}
            disabled={files.length === 0}
          >
            Upload {files.length > 0 ? `(${files.length})` : ''}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
