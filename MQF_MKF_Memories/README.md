# 💕 MQF & MKF - Our Memory Treasury 💕

A beautiful, romantic, all-in-one platform for storing photos, videos, documents, chatting, and playing romantic games together!

## ✨ Features

### 🔐 **Login System**
- Two user accounts: MQF (Him) and MKF (Her)
- Welcome screen with romantic theme
- Personal greeting upon login
- Logout functionality with confirmation

### 📸 **Photo & Video Gallery**
- Unlimited storage for photos and videos
- Drag-and-drop upload interface
- Batch upload multiple files
- Filter by All, Photos, or Videos
- Full-screen image/video viewer
- Previous/Next navigation with keyboard shortcuts
- Delete memories with confirmation
- Track who uploaded each memory
- **🆕 Cloud Sync**: Photos sync across devices instantly! ☁️

### ☁️ **NEW - Cloud Synchronization**
- Upload photos on one device, see on other instantly! 📱
- Firebase Realtime Database integration
- Real-time notifications for new uploads
- Cross-device memory sharing
- Automatic backup to cloud
- **[See FIREBASE_SETUP.md for setup instructions]**

### 📄 **Document Storage**
- Upload PDFs, Word docs, Excel sheets, and more
- Organized document grid
- File size and upload date tracking
- Document type icons (PDF, DOC, XLS, etc.)
- Quick delete functionality
- See who uploaded each document

### 💬 **Real-time Chat System**
- Send messages between MQF and MKF
- Message timestamps
- See who sent each message
- Message bubbles with different colors for each person
- Automatically scrolls to latest messages
- Keyboard Enter support for quick messaging
- Messages persist in the database

### 🎮 **Romantic Games**

#### Single Player Games
##### ❓ **Love Questions**
- 10 romantic questions to learn more about each other
- Fun getting-to-know-you experience
- Great conversation starter

##### 🎲 **Memory Match Game**
- 16 heart-themed cards to match
- Track your attempts and matches
- Winning congratulations
- Fun way to spend time together

##### 🎡 **Love Roulette**
- Spin for romantic challenges
- 10+ different romantic activities
- Includes: kiss, sing, dance, take selfies, cook together, plan dates
- Great for couples activities

##### 🧠 **Love Quiz**
- Test how well you know each other
- Multiple choice questions
- Score tracking
- Fun and interactive

#### 🆕 Multiplayer Games (NEW!)
##### 🎮 **Tic Tac Toe Battle**
- Classic strategic head-to-head competition
- 3×3 grid game with X and O
- Perfect for competitive couples

##### 🎪 **Rock Paper Scissors Tournament**
- Best of 3 rounds
- Quick and exciting
- Score tracking throughout

##### 💕 **Truth or Dare Challenge**
- 4 rounds of romantic questions and dares
- Deepen your connection
- Get to know each other better

##### 🎯 **Word Match Game**
- Match romantic words with hints
- 6 romantic word pairs
- Test your memory and knowledge
- Beat your best attempt count

### 💾 **Unlimited Storage**
- Uses IndexedDB for massive storage capacity
- Virtually unlimited space (depends on device)
- Real-time storage tracking
- No cloud needed - all data stays on your device
- Complete privacy
- **NEW: Also syncs to Firebase cloud** ☁️

## Getting Started

1. **Open the Website**
   - Open `index.html` in your web browser
   - Choose who you are: MQF or MKF
   - The website works completely offline

2. **Setup Cloud Sync (Optional but Recommended)**
   - See `FIREBASE_SETUP.md` for instructions
   - Takes only 5 minutes
   - Enables cross-device photo sharing

3. **Upload Memories (Photos/Videos)**
   - Drag & drop files onto the upload area, OR
   - Click "Click to Upload" button
   - Supported: JPG, PNG, GIF, MP4, WebM, etc.
   - Photos automatically sync to both devices! ✨

4. **Upload Documents**
   - Drag & drop documents onto the document upload area
   - Or click the document upload button
   - Supported: PDF, DOC, DOCX, XLS, XLSX, PPT, TXT, ZIP

5. **Chat with Each Other**
   - Type your message in the chat input
   - Press Enter or click Send
   - See your love's responses instantly
   - Messages are stored in the database

6. **Play Games Together**
   - Click any game card to start
   - Single player games for individual fun
   - Multiplayer games to play together (same or different devices)
   - Enjoy romantic challenges and fun moments

7. **View & Enjoy**
   - Browse your photo/video gallery
   - Click any memory for full-screen view
   - Filter by photos or videos
   - Share documents
   - Play romantic games together

## How to Use Each Feature

### 📸 Gallery Navigation
- **View:** Click any photo/video card
- **Browse:** Use arrow keys (← →) or Previous/Next buttons
- **Filter:** Click All, Photos, or Videos buttons
- **Delete:** Click 🗑️ in full-screen view
- **Close:** Press Escape or click outside
- **Sync Status:** Check ☁️ status in header for cloud sync

### ☁️ Cloud Synchronization
- **Upload:** Upload from User A
- **Wait:** Takes 1-2 seconds to sync ⚡
- **View:** User B sees photo instantly 📱
- **Status:** See ☁️ "Cloud Sync: Connected ✅" in header
- **Offline:** Works locally, syncs when online

### 📄 Document Management
- **Upload:** Drag, drop, or click to upload
- **View:** Cards show file info and document type icon
- **Delete:** Click 🗑️ Delete button on any document

### 💬 Chat
- **Send:** Type message and press Enter or click Send 💌
- **View:** All messages saved with timestamps
- **Track:** See who sent each message
- **Scroll:** Auto-scrolls to latest messages

### 🎮 Games
- **Single Player:** Click any of the 4 original games
- **Multiplayer:** Scroll down to "👥 Play Together" section
- **Start:** Click game card to begin
- **Play:** Follow the game instructions
- **Return:** Click close or Return button to go back

## Technical Details

- **HTML5:** Semantic markup
- **CSS3:** Modern styling with gradients, animations
- **JavaScript:** IndexedDB for local storage + Firebase integration
- **Database:** 3 stores - memories, documents, messages
- **Cloud:** Firebase Realtime Database for cross-device sync
- **No Server:** Fully self-contained (with optional cloud)
- **Responsive:** Works on desktop, tablet, mobile

## Browser Compatibility

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Tips & Tricks

💡 **Cloud Sync Tips:**
- Complete Firebase setup first (see FIREBASE_SETUP.md)
- Both devices need internet for sync
- Photos appear within 1-2 seconds
- Notifications alert when new photos arrive

💡 **Organization Tips:**
- Files displayed newest first
- Use photos/videos for memories
- Use documents for important notes together
- Use chat for daily love messages
- Cloud backup protects your memories

🎯 **Game Tips:**
- Play single-player games for fun
- Use multiplayer games for couple time
- Memory Match is great for quick fun
- Truth or Dare deepens your connection
- Tic Tac Toe is perfect for friendly competition

🎮 **Multiplayer Game Tips:**
- Tic Tac Toe: Think strategically 🧠
- Rock Paper Scissors: Quick & exciting ⚡
- Truth or Dare: Get closer emotionally 💕
- Word Match: Test your romantic knowledge 💡

⌨️ **Keyboard Shortcuts:**
- **Arrow Keys:** Navigate photos/videos
- **Escape:** Close photo/video viewer
- **Enter:** Send chat messages

📱 **Mobile Tips:**
- Fully responsive design
- Touch-friendly interface
- Swipe to navigate (with arrow buttons)
- Perfect for phone screen sharing games

## Privacy & Security

- ✅ All data stored locally on your device
- ✅ Cloud data (Firebase) stored securely
- ✅ Nothing uploaded to third-party servers (except Firebase if enabled)
- ✅ No tracking or ads
- ✅ Complete privacy between you two
- ✅ Data persists until you delete it
- ✅ See FIREBASE_SETUP.md for security rules

## Storage Information

- **Local Capacity:** Depends on your device (typically 50MB - 1GB+)
- **Technology:** IndexedDB (modern browser storage) + Firebase
- **Cloud Storage:** Free tier with Firebase (generous limits)
- **Data:** Stored locally and in cloud (if enabled)
- **Privacy:** Completely private
- **Persistence:** Data remains until deleted

## File Information

**Main Files:**
- `index.html` - Main website with new multiplayer game UI
- `styles.css` - Beautiful styling (updated with game styles)
- `script.js` - Complete functionality with Firebase integration
- `README.md` - This guide
- **NEW: `FIREBASE_SETUP.md`** - Cloud setup instructions
- **NEW: `NEW_FEATURES.md`** - Detailed explanation of new features

## About This Website

MQF & MKF is a romantic platform designed specifically for couples to:
- Store and cherish precious moments
- Share important documents
- Communicate through chat
- Play romantic games together
- **NEW: Sync photos across devices** ☁️
- **NEW: Play multiplayer games** 👥
- Keep everything safe locally and in cloud

Every feature is built with love and romance in mind. Your memories are sacred, and this platform treats them that way.

---

## 🆕 What's New in Version 2.0?

✨ **Cross-Device Photo Sync** - Upload on one device, see on other instantly!
👥 **4 Multiplayer Games** - Tic Tac Toe, Rock Paper Scissors, Truth or Dare, Word Match
🔔 **Real-Time Notifications** - Get alerts when your love uploads photos
☁️ **Firebase Cloud Backup** - Your memories are safe in the cloud
🎮 **Enhanced Game UI** - Better graphics and smoother animations

See `NEW_FEATURES.md` for complete details!

---

**Built with love for you both! 💕**

**Location:** `c:\Users\GS BUSANZA\Desktop\HTML\MQF_MKF_Memories\`

**Setup Help:**
- For cloud sync: See `FIREBASE_SETUP.md`
- For new features: See `NEW_FEATURES.md`
- For general help: This `README.md`

