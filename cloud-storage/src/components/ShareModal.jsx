import React, { useState } from 'react';
import '../styles/ShareModal.css';

function ShareModal({ file, onShare, onClose }) {
  const [emails, setEmails] = useState('');
  const [accessLevel, setAccessLevel] = useState('view');
  const [shareLink, setShareLink] = useState('');

  const handleShare = () => {
    const emailList = emails.split(',').map(e => e.trim()).filter(e => e);
    if (emailList.length > 0) {
      onShare(file, emailList);
      alert(`Shared "${file.name}" with: ${emailList.join(', ')}`);
      onClose();
    }
  };

  const generateShareLink = () => {
    const link = `https://cloudvault.app/share/${file.id}/${Math.random().toString(36).substr(2, 9)}`;
    setShareLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard!');
  };

  return (
    <div className="share-modal-overlay">
      <div className="share-modal">
        <div className="modal-header">
          <h2>Share "{file.name}"</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="share-tabs">
          <div className="tab-content">
            <h3>Share with people</h3>
            <div className="form-group">
              <label>Email addresses (comma-separated)</label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="user@example.com, another@example.com"
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Access level</label>
              <select value={accessLevel} onChange={(e) => setAccessLevel(e.target.value)}>
                <option value="view">View only</option>
                <option value="comment">View & Comment</option>
                <option value="edit">Edit</option>
              </select>
            </div>

            <button className="btn-primary" onClick={handleShare}>
              Share
            </button>
          </div>

          <div className="divider"></div>

          <div className="tab-content">
            <h3>Create share link</h3>
            {!shareLink ? (
              <button className="btn-secondary" onClick={generateShareLink}>
                🔗 Generate Share Link
              </button>
            ) : (
              <div className="share-link-box">
                <input 
                  type="text" 
                  value={shareLink} 
                  readOnly 
                  className="link-input"
                />
                <button className="btn-copy" onClick={copyToClipboard}>
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
