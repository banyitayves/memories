import React from 'react';
import '../styles/FileExplorer.css';

function FileExplorer({ files, onDelete, onShare, onPreview, onVersionHistory }) {
  const getFileIcon = (type) => {
    const icons = {
      pdf: '📄',
      doc: '📝',
      docx: '📝',
      xls: '📊',
      xlsx: '📊',
      pptx: '🎯',
      jpg: '🖼️',
      jpeg: '🖼️',
      png: '🖼️',
      gif: '🖼️',
      zip: '📦',
      mp4: '🎬',
      mp3: '🎵',
      txt: '📄'
    };
    return icons[type] || '📋';
  };

  return (
    <div className="file-explorer">
      {files.map(file => (
        <div key={file.id} className="file-item">
          <div className="file-icon">{getFileIcon(file.type)}</div>
          <div className="file-info">
            <h4 className="file-name">{file.name}</h4>
            <p className="file-meta">{file.size} • {file.date}</p>
          </div>
          <div className="file-actions">
            <button 
              className="action-btn"
              title="Preview"
              onClick={() => onPreview(file)}
            >
              👁️
            </button>
            <button 
              className="action-btn"
              title="Share"
              onClick={() => onShare(file)}
            >
              🔗
            </button>
            <button 
              className="action-btn"
              title="Version History"
              onClick={() => onVersionHistory(file)}
            >
              ⏱️
            </button>
            <button 
              className="action-btn delete"
              title="Delete"
              onClick={() => onDelete(file.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileExplorer;
