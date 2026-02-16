# CloudVault - 500GB Cloud Storage Application

A modern, full-featured cloud storage application built with React.js featuring a beautiful UI and comprehensive file management capabilities.

## Features ✨

✅ **500GB Storage Space** - Large capacity for all your files
✅ **User Authentication** - Login and signup system
✅ **File Management** - Upload, download, and organize files
✅ **Folder Organization** - Create and manage custom folders
✅ **File Search** - Quick search and filter functionality
✅ **File Preview** - Preview files before downloading
✅ **Share Files** - Share files via email with access control
✅ **Share Links** - Generate shareable links
✅ **Version Control** - Track file versions over time
✅ **Drag & Drop** - Intuitive drag-and-drop file uploads
✅ **Storage Meter** - Visual storage usage indicator
✅ **Responsive Design** - Works on desktop and mobile
✅ **Modern UI** - Beautiful gradient design with smooth animations

## Project Structure

```
cloud-storage/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Login/Signup page
│   │   ├── FileBrowser.jsx     # Main file browser
│   │   ├── FileExplorer.jsx    # File list display
│   │   ├── FileUpload.jsx      # Upload modal
│   │   ├── SearchBar.jsx       # Search functionality
│   │   ├── ShareModal.jsx      # Share file modal
│   │   └── StorageMeter.jsx    # Storage usage display
│   ├── styles/
│   │   ├── index.css           # Global styles
│   │   ├── App.css
│   │   ├── Login.css
│   │   ├── FileBrowser.css
│   │   ├── FileExplorer.css
│   │   ├── SearchBar.css
│   │   ├── FileUpload.css
│   │   ├── ShareModal.css
│   │   └── StorageMeter.css
│   ├── App.jsx                 # Main component
│   └── index.js                # Entry point
├── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Usage

### Login/Signup
- Click "Sign Up" to create a new account with your name, email, and password
- Or login with existing credentials

### Upload Files
- Click the "⬆️ Upload File" button
- Drag and drop files or click to browse
- Select multiple files and click "Upload"

### Manage Files
- Navigate folders using the sidebar
- View files in grid or list view
- Search files by name

### File Actions
- **👁️ Preview** - View file details
- **🔗 Share** - Share via email or generate link
- **⏱️ Version** - View file version history
- **🗑️ Delete** - Remove files

### Storage Management
- Check storage usage in the sidebar
- Visual indicator shows storage percentage
- Upgrade button for additional space

## Tech Stack

- **React 18** - UI library
- **CSS3** - Styling with gradients and animations
- **Local Storage** - Session persistence
- **JavaScript ES6+** - Modern JavaScript

## Features Breakdown

### Authentication
- Signup with email and password
- Login persistence using localStorage
- User profile management

### File Management
- Multiple file storage
- Folder-based organization
- File metadata (name, size, date)

### Sharing
- Email-based sharing
- Public share links
- Access level control (View, Comment, Edit)

### Search & Filter
- Real-time file search
- Filter by folder
- Grid and list view options

### Storage Tracking
- Visual storage meter
- Used/Total GB display
- Percentage indicator
- Color-coded status (Green < 60%, Orange 60-80%, Red > 80%)

## Customization

Edit these files to customize:
- Colors and gradients: `src/styles/*.css`
- Component logic: `src/components/*.jsx`
- Storage limits: `src/App.jsx`

## Future Enhancements

- Backend integration with database
- Real file upload to cloud server
- Advanced sharing permissions
- Bulk file operations
- Trash/Recovery
- Activity logs
- Cloud sync
- Desktop client

## License

This project is open source and available under the MIT License.

## Support

For issues or feature requests, please create an issue in the project repository.

---

**Built with React.js** ⚛️
