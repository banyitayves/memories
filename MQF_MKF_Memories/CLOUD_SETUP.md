# MQF & MKF Memories - Cloud Synchronization Setup

## 📱 What's Fixed
Your pictures/memories will now synchronize across all devices! When one person uploads a photo on their phone, tablet, or computer, the other person can see it on any of their devices after logging in.

## 🚀 How to Set Up

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Download from: https://nodejs.org/ (Get LTS version)
2. Install it on your computer

### Step 2: Install Server Dependencies
Open PowerShell or Command Prompt in this folder (`MQF_MKF_Memories`) and run:

```bash
npm install
```

This will install all required packages (express, cors, multer, body-parser).

### Step 3: Start the Cloud Server
Keep PowerShell/Command Prompt open and run:

```bash
npm start
```

You should see:
```
🚀 Memory Server running on http://localhost:3001
📁 Uploads directory: [path]/uploads
```

### Step 4: Open the App
1. Open `index.html` in your web browser
2. The app will automatically detect the cloud server
3. When you log in, it will sync all memories from the cloud to your device

## 📊 How It Works

```
Device A (Upload)
    ↓
[Photo Uploaded]
    ↓
Cloud Server (stores all memories)
    ↓
Device B (Download)
    ↑
[Memory syncs automatically]
```

### Features:
- ✅ **Automatic Sync**: When you log in, all photos/videos are synced
- ✅ **Offline Support**: Works without internet (uses local storage as backup)
- ✅ **Cross-Device**: Upload on phone, view on tablet/computer
- ✅ **Both Users**: Both MKF and MQF see each other's uploads automatically
- ✅ **Cloud Backup**: All files stored centrally, won't be lost

## 🔧 Server Files

- **server.js** - The cloud server (handles file uploads, storage, downloads)
- **package.json** - Dependencies needed
- **uploads/** - Folder where all photos/videos are stored
- **memories.json** - Metadata for photos
- **documents.json** - Metadata for documents

## 💡 Troubleshooting

### Server won't start?
```bash
# Make sure you're in the right folder:
cd "c:\Users\GS BUSANZA\Desktop\HTML\MQF_MKF_Memories"

# Try installing again:
npm install

# Then start:
npm start
```

### Can't see pictures on other device?
1. Make sure the server is running (you should see the console message)
2. Both devices must be on the same WiFi network or IP address
3. Check browser console for errors (F12 → Console tab)

### Still not syncing?
Edit line 2 in `script.js` with your computer's IP address:
```javascript
const CLOUD_SERVER_URL = 'http://YOUR_IP_ADDRESS:3001';
```

To find your IP address:
- Windows: Open PowerShell and run `ipconfig` (look for IPv4 Address)
- Mac/Linux: Open Terminal and run `ifconfig`

## 📝 Notes

- The server saves files to the `uploads/` folder on your computer
- All metadata is stored in JSON files (memories.json, documents.json)
- When the server is off, the app still works with local storage
- Don't share your computer's IP/server URL outside a trusted network

## 🎉 Enjoy!
Now you can upload memories on any device and see them everywhere! 💑💕
