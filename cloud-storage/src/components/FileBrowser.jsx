import React, { useState } from 'react';
import FileExplorer from './FileExplorer';
import StorageMeter from './StorageMeter';
import SearchBar from './SearchBar';
import FileUpload from './FileUpload';
import ShareModal from './ShareModal';
import '../styles/FileBrowser.css';

function FileBrowser({ user, onLogout, storage }) {
  const [files, setFiles] = useState([
    { id: 1, name: 'Project-2024.zip', size: '250MB', type: 'zip', date: '2024-02-10', folder: 'Projects', versions: [{ version: 1, date: '2024-02-10' }] },
    { id: 2, name: 'Presentation.pptx', size: '45MB', type: 'pptx', date: '2024-02-09', folder: 'Documents', versions: [{ version: 1, date: '2024-02-09' }] },
    { id: 3, name: 'Vacation.jpg', size: '5MB', type: 'jpg', date: '2024-02-08', folder: 'Images', versions: [{ version: 1, date: '2024-02-08' }] }
  ]);
  const [folders, setFolders] = useState(['Documents', 'Images', 'Videos', 'Projects', 'Archive']);
  const [currentFolder, setCurrentFolder] = useState('Documents');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedView, setSelectedView] = useState('grid'); // grid or list

  const filteredFiles = files.filter(file => {
    const matchesFolder = file.folder === currentFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const handleAddFolder = (folderName) => {
    if (!folders.includes(folderName)) {
      setFolders([...folders, folderName]);
    }
  };

  const handleUploadFile = (fileName, fileSize) => {
    const newFile = {
      id: Date.now(),
      name: fileName,
      size: fileSize,
      type: fileName.split('.').pop().toLowerCase(),
      date: new Date().toISOString().split('T')[0],
      folder: currentFolder,
      versions: [{ version: 1, date: new Date().toISOString().split('T')[0] }]
    };
    setFiles([...files, newFile]);
    setShowUploadModal(false);
  };

  const handleDeleteFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const handleShare = (file, emails) => {
    console.log(`Shared ${file.name} with: ${emails.join(', ')}`);
    setShowShareModal(false);
  };

  const handlePreview = (file) => {
    console.log(`Preview: ${file.name}`);
    alert(`Preview feature: ${file.name}\n\nSize: ${file.size}\nType: ${file.type}\nDate: ${file.date}`);
  };

  const handleVersionHistory = (file) => {
    alert(`Version History for ${file.name}:\n\n${file.versions.map((v, i) => `Version ${v.version}: ${v.date}`).join('\n')}`);
  };

  return (
    <div className="file-browser">
      <div className="header">
        <div className="header-left">
          <h1>☁️ CloudVault</h1>
          <span className="user-welcome">Welcome, {user?.name || 'User'}</span>
        </div>
        <button onClick={onLogout} className="btn-logout">Logout</button>
      </div>

      <div className="main-container">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Navigation</h3>
            <button className="btn-new-folder" onClick={() => handleAddFolder('New Folder')}>
              + New Folder
            </button>
            <button 
              className="btn-upload"
              onClick={() => setShowUploadModal(true)}
            >
              ⬆️ Upload File
            </button>
          </div>

          <div className="sidebar-section">
            <h3>Folders</h3>
            <div className="folder-list">
              {folders.map(folder => (
                <button
                  key={folder}
                  className={`folder-btn ${currentFolder === folder ? 'active' : ''}`}
                  onClick={() => setCurrentFolder(folder)}
                >
                  📁 {folder}
                </button>
              ))}
            </div>
          </div>

          <StorageMeter storage={storage} />
        </aside>

        <section className="main-content">
          <div className="content-header">
            <SearchBar query={searchQuery} setQuery={setSearchQuery} />
            <div className="view-toggle">
              <button 
                className={`view-btn ${selectedView === 'grid' ? 'active' : ''}`}
                onClick={() => setSelectedView('grid')}
              >
                ⊞ Grid
              </button>
              <button 
                className={`view-btn ${selectedView === 'list' ? 'active' : ''}`}
                onClick={() => setSelectedView('list')}
              >
                ≡ List
              </button>
            </div>
          </div>

          <div className={`files-container ${selectedView}`}>
            {filteredFiles.length === 0 ? (
              <div className="empty-state">
                <p>📭 No files in this folder</p>
                <button 
                  className="btn-primary"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload your first file
                </button>
              </div>
            ) : (
              <FileExplorer 
                files={filteredFiles}
                onDelete={handleDeleteFile}
                onShare={(file) => {
                  setSelectedFile(file);
                  setShowShareModal(true);
                }}
                onPreview={handlePreview}
                onVersionHistory={handleVersionHistory}
              />
            )}
          </div>
        </section>
      </div>

      {showUploadModal && (
        <FileUpload 
          onUpload={handleUploadFile}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      {showShareModal && selectedFile && (
        <ShareModal 
          file={selectedFile}
          onShare={handleShare}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}

export default FileBrowser;
