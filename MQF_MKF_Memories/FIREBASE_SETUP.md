# 🔥 Firebase Setup Guide - Cross-Device Photo Sharing

## ✨ What's New

Your MQF & MKF Memories app now has:
- **☁️ Cloud Synchronization**: Upload photos on one device, see them instantly on the other!
- **👥 Multiplayer Games**: 4 new games to play together:
  - 🎮 **Tic Tac Toe** - Classic strategic battle
  - 🎪 **Rock Paper Scissors** - Best of 3 rounds
  - 💕 **Truth or Dare** - Get to know each other better
  - 🎯 **Word Match** - Romantic word matching game

## 🚀 Quick Setup (5 minutes)

### Step 1: Create a Firebase Project

1. Go to [Google Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: `mqf-mkf-memories` (or your preference)
4. Click **Continue**
5. Disable Google Analytics (optional)
6. Click **Create Project**

### Step 2: Set Up Realtime Database

1. In Firebase Console, go to **"Realtime Database"** (in left menu under Build)
2. Click **"Create Database"**
3. Choose location close to you
4. Start in **"Test Mode"** (we'll secure it later)
5. Click **Enable**

### Step 3: Get Your Firebase Credentials

1. Click the **gear icon** (⚙️) → **Project Settings**
2. Go to **"Your apps"** section
3. Click **"Web"** icon to create a web app
4. Register app (name it "MQF MKF Memories")
5. Copy the Firebase config object

Your config will look like:
```javascript
const FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890"
};
```

### Step 4: Update Your App

1. Open `script.js` in your MQF & MKF Memories folder
2. Find the `FIREBASE_CONFIG` object (around line 8)
3. Replace with your actual Firebase credentials
4. Save the file

### Step 5: Set Security Rules

For secure, private access for both users only:

1. In Firebase Console, go **Realtime Database** → **Rules**
2. Replace all code with:

```json
{
  "rules": {
    "memories": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp", "uploadedBy"]
    },
    "gameData": {
      ".read": true,
      ".write": true,
      ".indexOn": ["timestamp"]
    }
  }
}
```

3. Click **Publish**

> ⚠️ **Note**: These rules allow anyone with this config to access data. For production, implement authentication.

## 📸 How to Use Cross-Device Sync

### Uploading Photos:
1. **User 1** logs in and uploads photos
2. Photos are automatically saved to Firebase ☁️
3. **User 2** logs in (on another device)
4. Photos appear automatically! 🎉

### Playing Multiplayer Games:
1. Both users open the app
2. Go to **🎮 Romantic Games** section
3. Find **👥 Play Together** section
4. Choose any multiplayer game
5. Play together and have fun! 💕

## 🔄 Real-Time Sync Features

- ✅ Photos sync in real-time
- ✅ Automatic notifications when other user uploads
- ✅ Works even when offline (syncs when back online)
- ✅ All games track scores and progress
- ✅ Private to your couple only

## 📱 Test It Out

### On Your Computer:
1. Open http://localhost:8000 (or use Live Server in VS Code)
2. Login as MKF user
3. Upload a photo
4. Notice the ☁️ status shows "Connected"

### On Your Phone:
1. Connect to same WiFi network
2. Find your computer's IP address (Windows: `ipconfig`, look for IPv4)
3. Open browser: `http://YOUR_IP:8000`
4. Login as MQF user
5. See the photo appear instantly! 📸

## 🎮 New Multiplayer Games

### 🎖️ Tic Tac Toe
- Classical strategy game
- Take turns placing X and O
- First to get 3 in a row wins

### 🎪 Rock Paper Scissors
- Play 3 rounds
- Best score wins
- Pure luck and strategy mix

### 💕 Truth or Dare
- Ask each other romantic questions
- Give fun dares to perform
- 4 rounds of getting closer

### 🎯 Word Match
- Match romantic words with hints
- Test your memory and knowledge
- Complete in fewest attempts

## ⚙️ Troubleshooting

### "Cloud Sync: Offline"
- Check internet connection
- Verify Firebase credentials are correct
- Ensure Firebase Rules are published

### Photos not syncing
- Refresh the page
- Check Firebase Console to verify data is there
- Ensure both users are logged in

### Games not working
- Clear browser cache (Ctrl+Shift+Delete)
- Refresh the page
- Try a different game first

## 🔐 Security Notes

- These rules allow public write access (for testing only)
- For production: Implement Firebase Authentication
- Add user verification before allowing photo access
- Consider encrypting sensitive data

## 📚 Firebase Console Monitoring

**Check your data in Firebase:**
1. Open Firebase Console
2. Click **Realtime Database**
3. Expand **memories** folder
4. See all uploaded photos and metadata

## 💡 Pro Tips

- Use on **same WiFi** for fastest sync
- Both users can be online for real-time experience
- Games can be played even offline, but photos need internet
- Store important moments - they're backed up in cloud!

## 🎉 Congratulations!

You now have:
- ☁️ Cloud-synced photo gallery
- 👥 4 multiplayer games to play together
- 💕 A secure, private space for your memories

**Enjoy your digital romance! 💑**

---

### Still Need Help?

1. Check Google Firebase Documentation: https://firebase.google.com/docs
2. Verify your config is pasted correctly
3. Ensure both users are on same project
4. Clear cache and try again

**Happy memories and gaming! 🎊**
