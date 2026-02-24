// ===== FIREBASE CLOUD SYNC CONFIGURATION =====
// Add this Firebase CDN to index.html if not already there:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js"></script>

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyC4YZY2Z7X9r8Z9Y0Z1Z2Z3Z4Z5Z6Z7Z8Z",
    authDomain: "mqf-mkf-memories.firebaseapp.com",
    databaseURL: "https://mqf-mkf-memories-default-rtdb.firebaseio.com",
    projectId: "mqf-mkf-memories",
    storageBucket: "mqf-mkf-memories.appspot.com",
    messagingSenderId: "123456789012",
    appId: "1:123456789012:web:abcdef1234567890abcd"
};

let firebase = null;
let isCloudAvailable = false;
let realtimeDbRef = null;

// Initialize Firebase (will use local storage as fallback if Firebase unavailable)
function initializeFirebase() {
    try {
        if (typeof window.firebase !== 'undefined' && window.firebase.initializeApp) {
            firebase = window.firebase;
            firebase.initializeApp(FIREBASE_CONFIG);
            realtimeDbRef = firebase.database();
            isCloudAvailable = true;
            console.log('✅ Firebase Initialized Successfully');
        } else {
            console.log('Firebase SDK not loaded, using local storage only');
            isCloudAvailable = false;
        }
    } catch (error) {
        console.log('Firebase initialization skipped, using local storage only:', error);
        isCloudAvailable = false;
    }
}

// Utility function to convert ArrayBuffer to base64
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// Database and user management
const DB_NAME = 'MQF_MKF_Memories';
const DB_VERSION = 3;
const STORE_NAMES = {
    memories: 'memories',
    documents: 'documents',
    messages: 'messages',
    permissions: 'permissions'
};

// User credentials
const USERS = {
    'MKF': {
        username: '0791756160',
        password: 'MKFLOVE',
        name: 'NSHIMIYIMANA Yves',
        role: 'him',
        profile: '👨'
    },
    'MQF': {
        username: '0794780083',
        password: 'MQFLOVE',
        name: 'TUYISHIME Yvonne Faida',
        role: 'her',
        profile: '👩'
    }
};

// Daily romantic messages
const ROMANTIC_MESSAGES = [
    "Missing you already. You complete my world! 💕",
    "Every day with you is a blessing. I love you more each day! 💖",
    "You are my greatest adventure and my safe haven. Forever yours! 💕",
    "In your eyes, I found my home. I love you endlessly! 🥰",
    "Thank you for being my reason to smile every single day! 💘",
    "You make me believe in true love. I adore you! 💕",
    "My heart belongs to you completely. Always and forever! 💑",
    "You are my today and all of my tomorrows. I love you! 🌹",
    "With you, every moment feels like a beautiful dream! 💕",
    "You are the love I've always been searching for. Forever grateful! 💖"
];

let db;
let currentUser = null;
let currentIndex = 0;
let filteredMemories = [];
let allMemories = [];
let notificationCount = 0;
let lastNotificationCheckTime = 0;

// Initialize IndexedDB
function initDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve(db);
        };

        request.onupgradeneeded = (event) => {
            const database = event.target.result;
            
            if (!database.objectStoreNames.contains(STORE_NAMES.memories)) {
                const memStore = database.createObjectStore(STORE_NAMES.memories, { keyPath: 'id', autoIncrement: true });
                memStore.createIndex('timestamp', 'timestamp', { unique: false });
                memStore.createIndex('type', 'type', { unique: false });
            }

            if (!database.objectStoreNames.contains(STORE_NAMES.documents)) {
                const docStore = database.createObjectStore(STORE_NAMES.documents, { keyPath: 'id', autoIncrement: true });
                docStore.createIndex('timestamp', 'timestamp', { unique: false });
                docStore.createIndex('uploadedBy', 'uploadedBy', { unique: false });
            }

            if (!database.objectStoreNames.contains(STORE_NAMES.messages)) {
                const msgStore = database.createObjectStore(STORE_NAMES.messages, { keyPath: 'id', autoIncrement: true });
                msgStore.createIndex('timestamp', 'timestamp', { unique: false });
            }

            if (!database.objectStoreNames.contains(STORE_NAMES.permissions)) {
                const permStore = database.createObjectStore(STORE_NAMES.permissions, { keyPath: 'id', autoIncrement: true });
                permStore.createIndex('documentId', 'documentId', { unique: false });
                permStore.createIndex('requestedBy', 'requestedBy', { unique: false });
            }
        };
    });
}

// ===== CLOUD SYNC FUNCTIONS (Firebase) =====
// Update UI to show cloud sync status
function updateCloudStatusUI() {
    const statusEl = document.getElementById('cloudSyncStatus');
    if (statusEl) {
        if (isCloudAvailable) {
            statusEl.textContent = '☁️ Cloud Sync: Connected ✅';
            statusEl.style.color = '#4caf50';
        } else {
            statusEl.textContent = '📱 Cloud Sync: Offline (Local only)';
            statusEl.style.color = '#ff9800';
        }
    }
}

// LOGIN SYSTEM
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    // Find user by username
    let foundUser = null;
    for (const key in USERS) {
        if (USERS[key].username === username && USERS[key].password === password) {
            foundUser = key;
            break;
        }
    }

    if (foundUser) {
        login(foundUser);
    } else {
        errorMsg.textContent = '❌ Invalid username or password!';
        errorMsg.style.display = 'block';
    }
}

function login(user) {
    currentUser = user;
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
    const userName = USERS[user].name;
    document.getElementById('userInfo').innerHTML = `${USERS[user].profile} Welcome, ${userName}! 💕`;
    
    // Sync from Firebase first before rendering
    syncFromCloud();
    
    renderGallery();
    updateStorageInfo();
    renderDocuments();
    renderMessages();
    
    // Initialize daily romantic message and notifications
    initializeDailyMessage();
    startNotificationListener();
    scheduleAutomaticMessages();
    
    // Start real-time sync listener for Firebase
    if (isCloudAvailable) {
        startRealtimeSyncListener();
    }
}

async function syncFromCloud() {
    if (isCloudAvailable) {
        console.log('🔄 Syncing with Firebase...');
        await syncMemoriesFromFirebase();
        console.log('✅ Firebase Sync complete!');
    }
    updateCloudStatusUI();
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        document.getElementById('mainApp').style.display = 'none';
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('loginForm').reset();
        document.getElementById('loginError').style.display = 'none';
        notificationCount = 0;
    }
}

// NOTIFICATION SYSTEM
function addNotification(title, message) {
    return new Promise((resolve) => {
        const transaction = db.transaction([STORE_NAMES.messages], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.messages);
        
        const notification = {
            title: title,
            message: message,
            timestamp: new Date().getTime(),
            read: false,
            type: 'notification',
            from: currentUser === 'MKF' ? 'MQF' : 'MKF'
        };
        
        store.add(notification);
        resolve();
    });
}

function showNotification(title, message) {
    const notificationArea = document.getElementById('notificationArea');
    if (!notificationArea) return;
    
    const notif = document.createElement('div');
    notif.className = 'notification-toast';
    notif.innerHTML = `
        <div class="notification-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    notificationArea.appendChild(notif);
    notificationCount++;
    updateNotificationBadge();
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notif.parentElement) {
            notif.remove();
        }
    }, 6000);
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge && notificationCount > 0) {
        badge.style.display = 'flex';
        badge.textContent = notificationCount > 9 ? '9+' : notificationCount;
    }
}

function clearNotifications() {
    notificationCount = 0;
    const badge = document.getElementById('notificationBadge');
    if (badge) badge.style.display = 'none';
    const notificationArea = document.getElementById('notificationArea');
    if (notificationArea) {
        notificationArea.innerHTML = '';
    }
}

function startNotificationListener() {
    // Check for new uploads from the other user every 2 seconds
    setInterval(() => {
        if (!currentUser) return; // Stop if logged out
        
        getAllMemories().then(memories => {
            const newUploads = memories.filter(m => {
                const otherUser = currentUser === 'MKF' ? 'MQF' : 'MKF';
                return m.uploadedBy === otherUser && 
                       m.timestamp > lastNotificationCheckTime;
            });
            
            newUploads.forEach(upload => {
                const otherUserName = currentUser === 'MKF' ? USERS['MQF'].name : USERS['MKF'].name;
                const type = upload.type === 'image' ? '📸 Photo' : '📹 Video';
                showNotification(
                    `💕 New ${type}!`,
                    `${otherUserName} just shared a new memory with you!`
                );
            });
            
            lastNotificationCheckTime = new Date().getTime();
        });
    }, 2000);
}

// DAILY ROMANTIC MESSAGE SYSTEM
function initializeDailyMessage() {
    const today = new Date().toDateString();
    const lastMessageDate = localStorage.getItem('lastDailyMessageDate_' + currentUser);
    
    if (lastMessageDate !== today) {
        let otherUser = currentUser === 'MKF' ? 'MQF' : 'MKF';
        if (currentUser === 'MKF') {
            // Send daily message only if he's the one logging in
            const randomMessage = ROMANTIC_MESSAGES[Math.floor(Math.random() * ROMANTIC_MESSAGES.length)];
            sendAutomaticMessage(otherUser, randomMessage);
        }
        localStorage.setItem('lastDailyMessageDate_' + currentUser, today);
        displayDailyMessage();
    } else {
        displayDailyMessage();
    }
}

function sendAutomaticMessage(toUser, message) {
    const transaction = db.transaction([STORE_NAMES.messages], 'readwrite');
    const store = transaction.objectStore(STORE_NAMES.messages);
    
    const chatMessage = {
        text: message,
        timestamp: new Date().getTime(),
        sender: currentUser,
        recipient: toUser,
        type: 'message',
        isAutomatic: true
    };
    
    store.add(chatMessage);
    
    // Show notification to the recipient on their next login
    addNotification('💌 Daily Love Message', `You have a new daily message from your love!`);
}

function scheduleAutomaticMessages() {
    // Check if we need to send a message every hour
    setInterval(() => {
        if (currentUser === 'MKF') {
            const today = new Date().toDateString();
            const lastMessageDate = localStorage.getItem('lastDailyMessageDate_' + currentUser);
            
            if (lastMessageDate !== today) {
                const otherUser = 'MQF';
                const randomMessage = ROMANTIC_MESSAGES[Math.floor(Math.random() * ROMANTIC_MESSAGES.length)];
                sendAutomaticMessage(otherUser, randomMessage);
                localStorage.setItem('lastDailyMessageDate_' + currentUser, today);
            }
        }
    }, 3600000); // Check every hour
}

function displayDailyMessage() {
    const dailyMessageArea = document.getElementById('dailyMessageArea');
    if (!dailyMessageArea) return;
    
    const today = new Date().toDateString();
    const todayMessage = localStorage.getItem('todayRomanticMessage_' + today);
    
    if (!todayMessage) {
        const message = ROMANTIC_MESSAGES[Math.floor(Math.random() * ROMANTIC_MESSAGES.length)];
        localStorage.setItem('todayRomanticMessage_' + today, message);
    }
    
    const displayMessage = localStorage.getItem('todayRomanticMessage_' + today);
    dailyMessageArea.innerHTML = `
        <div class="daily-message-card">
            <h3>📅 Today's Love Message 💌</h3>
            <p class="daily-message-text">${displayMessage}</p>
            <p class="daily-message-time">✨ Sent with all my love ✨</p>
        </div>
    `;
}

// MEMORY MANAGEMENT
function addMemory(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const memory = {
                filename: file.name,
                type: file.type.startsWith('image') ? 'image' : 'video',
                data: arrayBufferToBase64(reader.result),
                timestamp: new Date().getTime(),
                filesize: file.size,
                uploadDate: new Date().toLocaleDateString(),
                uploadedBy: currentUser,
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };

            // Try to sync to Firebase first
            if (isCloudAvailable && realtimeDbRef) {
                try {
                    await realtimeDbRef.ref(`memories/${memory.id}`).set(memory);
                    console.log('✅ Memory synced to Firebase:', memory.filename);
                } catch (error) {
                    console.warn('Firebase upload failed, saving locally:', error);
                }
            }

            // Save to local cache as backup
            const transaction = db.transaction([STORE_NAMES.memories], 'readwrite');
            const store = transaction.objectStore(STORE_NAMES.memories);

            const request = store.add(memory);
            request.onsuccess = () => {
                // Show real-time notification to other user
                const otherUserName = currentUser === 'MKF' ? USERS['MQF'].name : USERS['MKF'].name;
                const type = memory.type === 'image' ? '📸 Photo' : '📹 Video';
                showNotification(
                    `💕 New ${type}!`,
                    `${otherUserName} just shared a new memory!`
                );
                addNotification(`New ${type}`, `${otherUserName} uploaded a new memory!`);
                resolve(request.result);
            };
            request.onerror = () => reject(request.error);
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

function getAllMemories() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.memories], 'readonly');
        const store = transaction.objectStore(STORE_NAMES.memories);
        const request = store.getAll();

        request.onsuccess = () => {
            const memories = request.result.sort((a, b) => b.timestamp - a.timestamp);
            resolve(memories);
        };
        request.onerror = () => reject(request.error);
    });
}

// Sync memories from Firebase to local database
async function syncMemoriesFromFirebase() {
    if (!isCloudAvailable || !realtimeDbRef) return;
    
    try {
        const snapshot = await realtimeDbRef.ref('memories').once('value');
        const firebaseMemories = snapshot.val();
        
        if (!firebaseMemories) return;
        
        const transaction = db.transaction([STORE_NAMES.memories], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.memories);
        
        // Add/update memories from Firebase
        Object.values(firebaseMemories).forEach(memory => {
            store.put(memory);
        });
        
        console.log('✅ Synced memories from Firebase');
        return firebaseMemories;
    } catch (error) {
        console.warn('Firebase sync failed:', error);
    }
}

// Real-time listener for new memories from other user
function startRealtimeSyncListener() {
    if (!isCloudAvailable || !realtimeDbRef) return;
    
    realtimeDbRef.ref('memories').on('child_added', async (snapshot) => {
        const memory = snapshot.val();
        if (!memory) return;
        
        // Don't re-notify if it's our own upload
        if (memory.uploadedBy === currentUser) return;
        
        // Add to local database if not already there
        const transaction = db.transaction([STORE_NAMES.memories], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.memories);
        store.put(memory);
        
        // Show notification
        const otherUserName = currentUser === 'MKF' ? USERS['MQF'].name : USERS['MKF'].name;
        const type = memory.type === 'image' ? '📸 Photo' : '📹 Video';
        showNotification(
            `💕 New ${type}!`,
            `${otherUserName} just shared a new memory!`
        );
    });
}

function deleteMemory(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.memories], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.memories);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function getMemoryById(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.memories], 'readonly');
        const store = transaction.objectStore(STORE_NAMES.memories);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function updateStorageInfo() {
    getAllMemories().then(memories => {
        let totalSize = 0;
        memories.forEach(memory => {
            totalSize += memory.filesize || 0;
        });

        const usedMB = (totalSize / (1024 * 1024)).toFixed(2);
        const percentUsed = Math.min((totalSize / (1024 * 1024 * 10)) * 100, 100);

        document.getElementById('storageUsed').style.width = percentUsed + '%';
        document.getElementById('storageText').textContent = 
            `Used: ${usedMB} MB / Available: Virtually Unlimited (IndexedDB Storage)`;
    });
}

function renderGallery(filter = 'all') {
    getAllMemories().then(memories => {
        allMemories = memories;

        if (filter === 'all') {
            filteredMemories = memories;
        } else {
            filteredMemories = memories.filter(m => m.type === filter);
        }

        const gallery = document.getElementById('gallery');

        if (filteredMemories.length === 0) {
            gallery.innerHTML = '<div class="empty-gallery"><p>💭 No memories yet. Start creating your treasury of love!</p></div>';
            return;
        }

        gallery.innerHTML = filteredMemories.map((memory, index) => {
            const blob = new Blob([memory.data], { type: memory.type === 'image' ? 'image/jpeg' : 'video/mp4' });
            const url = URL.createObjectURL(blob);
            const thumbnail = memory.type === 'image' 
                ? `<img src="${url}" alt="Memory" class="memory-thumbnail">`
                : `<video class="memory-thumbnail"><source src="${url}" type="video/mp4"></video>`;

            return `
                <div class="memory-card" onclick="openModal(${index})">
                    ${thumbnail}
                    <div class="memory-overlay">
                        <p>${memory.type === 'image' ? '📸 Photo' : '📹 Video'}</p>
                    </div>
                </div>
            `;
        }).join('');
    });
}

function openModal(index) {
    currentIndex = index;
    const memory = filteredMemories[index];
    displayMemory(memory);
    document.getElementById('modal').style.display = 'block';
    updateNavigationButtons();
}

function displayMemory(memory) {
    const blob = new Blob([memory.data], { type: memory.type === 'image' ? 'image/jpeg' : 'video/mp4' });
    const url = URL.createObjectURL(blob);

    const modalBody = document.getElementById('modalBody');
    if (memory.type === 'image') {
        modalBody.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    } else {
        modalBody.innerHTML = `<video controls style="max-width: 100%; max-height: 100%; object-fit: contain;"><source src="${url}" type="video/mp4"></video>`;
    }

    document.getElementById('deleteBtn').onclick = async () => {
        if (confirm('Are you sure you want to delete this precious memory? 😢')) {
            await deleteMemory(filteredMemories[currentIndex].id);
            closeModal();
            await renderGallery();
            await updateStorageInfo();
        }
    };
}

function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === filteredMemories.length - 1;
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}


function handleFileUpload(files, isDocument = false) {
    if (files.length === 0) return;

    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const uploadStatus = document.getElementById('uploadStatus');

    uploadProgress.style.display = 'block';

    let completed = 0;
    for (const file of files) {
        if (isDocument) {
            addDocument(file).then(() => {
                completed++;
                const progress = (completed / files.length) * 100;
                progressBar.style.width = progress + '%';
                uploadStatus.textContent = `Uploading: ${completed}/${files.length} files...`;

                if (completed === files.length) {
                    uploadStatus.textContent = `✅ Successfully uploaded ${completed} document(s)! 📄`;
                    renderDocuments();

                    setTimeout(() => {
                        uploadProgress.style.display = 'none';
                    }, 2000);
                }
            }).catch(error => {
                uploadStatus.textContent = `❌ Error uploading ${file.name}`;
            });
        } else {
            addMemory(file).then(() => {
                completed++;
                const progress = (completed / files.length) * 100;
                progressBar.style.width = progress + '%';
                uploadStatus.textContent = `Uploading: ${completed}/${files.length} files...`;

                if (completed === files.length) {
                    uploadStatus.textContent = `✅ Successfully uploaded ${completed} memory(ies)! 💕`;
                    renderGallery();
                    updateStorageInfo();

                    setTimeout(() => {
                        uploadProgress.style.display = 'none';
                    }, 2000);
                }
            }).catch(error => {
                uploadStatus.textContent = `❌ Error uploading ${file.name}`;
            });
        }
    }
}

// DOCUMENT MANAGEMENT
function addDocument(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
            const doc = {
                filename: file.name,
                data: reader.result,
                timestamp: new Date().getTime(),
                filesize: file.size,
                uploadDate: new Date().toLocaleDateString(),
                uploadedBy: currentUser,
                type: file.type,
                downloadPermissions: {} // Track who can download
            };

            // Try to sync to cloud first
            if (isCloudAvailable) {
                await uploadDocumentToCloud(
                    doc.filename,
                    reader.result,
                    doc.uploadedBy
                );
            }

            // Save to local cache as backup
            const transaction = db.transaction([STORE_NAMES.documents], 'readwrite');
            const store = transaction.objectStore(STORE_NAMES.documents);

            const request = store.add(doc);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

function getAllDocuments() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.documents], 'readonly');
        const store = transaction.objectStore(STORE_NAMES.documents);
        const request = store.getAll();

        request.onsuccess = () => {
            const docs = request.result.sort((a, b) => b.timestamp - a.timestamp);
            resolve(docs);
        };
        request.onerror = () => reject(request.error);
    });
}

function deleteDocument(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.documents], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.documents);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function getOtherUser() {
    return currentUser === 'MKF' ? 'MQF' : 'MKF';
}

function updateDocumentPermissions(docId, hasPermission) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.documents], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.documents);
        const getRequest = store.get(docId);

        getRequest.onsuccess = () => {
            const doc = getRequest.result;
            const otherUser = getOtherUser();
            doc.downloadPermissions = doc.downloadPermissions || {};
            doc.downloadPermissions[otherUser] = hasPermission;

            const updateRequest = store.put(doc);
            updateRequest.onsuccess = () => resolve();
            updateRequest.onerror = () => reject(updateRequest.error);
        };
        getRequest.onerror = () => reject(getRequest.error);
    });
}

function canDownloadDocument(doc) {
    if (doc.uploadedBy === currentUser) return true; // Own documents
    return doc.downloadPermissions && doc.downloadPermissions[currentUser] === true;
}

function renderDocuments() {
    getAllDocuments().then(docs => {
        const grid = document.getElementById('documentsGrid');

        if (docs.length === 0) {
            grid.innerHTML = '<p style="text-align: center; color: var(--dark-text); grid-column: 1/-1;">📭 No documents yet. Upload your files!</p>';
            return;
        }

        grid.innerHTML = docs.map(doc => {
            const icon = getDocumentIcon(doc.filename);
            const isOwner = doc.uploadedBy === currentUser;
            const canDownload = canDownloadDocument(doc);
            const otherUser = getOtherUser();
            const permissionStatus = isOwner ? `📌 Your file` : (canDownload ? '✅ Approved' : '⛔ Pending');

            return `
                <div class="document-card">
                    <div class="doc-icon">${icon}</div>
                    <div class="doc-name">${doc.filename}</div>
                    <div class="doc-size">${formatFileSize(doc.filesize)}</div>
                    <div class="doc-date">📅 ${doc.uploadDate}</div>
                    <div class="doc-date">By: ${USERS[doc.uploadedBy].name}</div>
                    <div class="doc-date" style="color: ${canDownload ? '#4caf50' : '#ff9800'};">${permissionStatus}</div>
                    <div class="doc-actions">
                        ${canDownload ? `<button class="doc-download-btn" onclick="downloadDocument(${doc.id})">📥 Download</button>` : `<button class="doc-download-btn" disabled>❌ No Access</button>`}
                        ${isOwner ? `<button class="doc-share-btn" onclick="requestOrGrantPermission(${doc.id})">🔐 Manage Access</button>` : `<button class="doc-share-btn" onclick="requestDownloadPermission(${doc.id})">📨 Request Access</button>`}
                    </div>
                    ${isOwner ? `<button class="doc-delete" onclick="deleteAndRefresh('document', ${doc.id})" style="width: 100%; margin-top: 8px;">🗑️ Delete</button>` : ''}
                </div>
            `;
        }).join('');
    });
}

function requestOrGrantPermission(docId) {
    getAllDocuments().then(docs => {
        const doc = docs.find(d => d.id === docId);
        if (!doc) return;

        const otherUser = getOtherUser();
        const currentPerm = doc.downloadPermissions && doc.downloadPermissions[otherUser];
        const message = currentPerm ? `Revoke download permission for ${USERS[otherUser].name}?` : `Grant download permission for ${USERS[otherUser].name}?`;

        if (confirm(message)) {
            updateDocumentPermissions(docId, !currentPerm).then(() => {
                renderDocuments();
                alert(currentPerm ? '❌ Permission revoked' : '✅ Permission granted!');
            });
        }
    });
}

function requestDownloadPermission(docId) {
    const otherUser = getOtherUser();
    showPermissionModal(`${USERS[currentUser].name} is requesting permission to download this file`, () => {
        updateDocumentPermissions(docId, true).then(() => {
            renderDocuments();
            alert('✅ Permission granted!');
        });
    }, () => {
        alert('❌ Permission denied');
    });
}

function downloadDocument(docId) {
    getAllDocuments().then(docs => {
        const doc = docs.find(d => d.id === docId);
        if (!doc || !canDownloadDocument(doc)) {
            alert('❌ You do not have permission to download this file');
            return;
        }

        const blob = new Blob([doc.data], { type: doc.type || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function showPermissionModal(message, onAllow, onDeny) {
    const modal = document.getElementById('permissionModal');
    const content = modal.querySelector('.permission-text');
    content.textContent = message;

    document.getElementById('permAllowBtn').onclick = () => {
        modal.style.display = 'none';
        onAllow();
    };

    document.getElementById('permDenyBtn').onclick = () => {
        modal.style.display = 'none';
        onDeny();
    };

    modal.style.display = 'block';
}

function getDocumentIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'pdf': '📕',
        'doc': '📄', 'docx': '📄',
        'xls': '📊', 'xlsx': '📊',
        'ppt': '🎁', 'pptx': '🎁',
        'txt': '📝',
        'zip': '📦', 'rar': '📦'
    };
    return icons[ext] || '📎';
}

function deleteAndRefresh(type, id) {
    if (confirm('Delete this ' + type + '?')) {
        if (type === 'document') {
            deleteDocument(id).then(() => renderDocuments());
        }
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// CHAT MANAGEMENT
function addMessage(text, sender) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.messages], 'readwrite');
        const store = transaction.objectStore(STORE_NAMES.messages);

        const message = {
            text: text,
            sender: sender,
            timestamp: new Date().getTime(),
            date: new Date().toLocaleTimeString()
        };

        const request = store.add(message);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getAllMessages() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAMES.messages], 'readonly');
        const store = transaction.objectStore(STORE_NAMES.messages);
        const request = store.getAll();

        request.onsuccess = () => {
            const msgs = request.result.sort((a, b) => a.timestamp - b.timestamp);
            resolve(msgs);
        };
        request.onerror = () => reject(request.error);
    });
}

function renderMessages() {
    getAllMessages().then(messages => {
        const chatMessages = document.getElementById('chatMessages');

        if (messages.length === 0) {
            chatMessages.innerHTML = '<div class="chat-welcome"><p>💕 Start our beautiful conversation 💕</p></div>';
            return;
        }

        chatMessages.innerHTML = messages.map(msg => {
            const isCurrentUser = msg.sender === currentUser;
            const messageClass = isCurrentUser ? 'message-sender' : 'message-receiver';
            const nameClass = isCurrentUser ? 'message-sender-name' : 'message-receiver-name';

            return `
                <div class="chat-message ${messageClass}">
                    <span class="${nameClass}">${msg.sender}</span>
                    <div class="message-bubble">${escapeHtml(msg.text)}</div>
                    <span class="message-time">${msg.date}</span>
                </div>
            `;
        }).join('');

        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();

    if (text === '') return;

    addMessage(text, currentUser).then(() => {
        input.value = '';
        renderMessages();
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// GAMES
const loveQuestions = [
    'What was your first impression of me?',
    'What is my favorite food?',
    'When did you know I was the one?',
    'What is a quality you love most about me?',
    'What is our favorite memory together?',
    'What do you love doing with me?',
    'What makes me unique?',
    'Where do you see us in 5 years?',
    'What is my favorite color?',
    'How did we first meet?'
];

const rouletteChallenges = [
    '💋 Give the other person a kiss!',
    '🎵 Sing a love song to each other',
    '💑 Hug for 10 seconds without letting go',
    '🎭 Do your best impression of each other',
    '💬 Say 5 things you love about them',
    '🎬 Take a couples selfie',
    '💃 Dance together for 1 minute',
    '🌹 Write a love note together',
    '🎂 Cook something together',
    '⭐ Plan your next date night together'
];

const quizQuestions = [
    {
        q: "What's my favorite song?",
        options: ['A) Romantic Ballad', 'B) Pop Hit', 'C) Rock Song', 'D) Classical'],
        correct: 0
    },
    {
        q: "When is my birthday?",
        options: ['A) Spring', 'B) Summer', 'C) Fall', 'D) Winter'],
        correct: 1
    },
    {
        q: "What's my biggest dream?",
        options: ['A) Travel the world', 'B) Be with you forever', 'C) Career success', 'D) All of the above'],
        correct: 3
    }
];

function startGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    modal.style.display = 'block';

    if (gameType === 'questions') {
        startQuestions(container);
    } else if (gameType === 'memory') {
        startMemoryGame(container);
    } else if (gameType === 'roulette') {
        startRoulette(container);
    } else if (gameType === 'quiz') {
        startQuiz(container);
    }
}

function startQuestions(container) {
    let currentQ = 0;

    const showQuestion = () => {
        if (currentQ >= loveQuestions.length) {
            container.innerHTML = `
                <h3 class="game-title">💕 Questions Complete! 💕</h3>
                <div class="result-text">You answered ${currentQ} questions! Share your thoughts with each other! 💬</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }

        const question = loveQuestions[currentQ];
        container.innerHTML = `
            <h3 class="game-title">❓ Love Question ${currentQ + 1}/${loveQuestions.length}</h3>
            <div class="question-text">${question}</div>
            <button class="roulette-btn-game" onclick="nextQuestion(${currentQ + 1})">Next Question</button>
        `;
    };

    window.nextQuestion = (next) => {
        currentQ = next;
        showQuestion();
    };

    showQuestion();
}

function startMemoryGame(container) {
    const cards = ['❤️', '💕', '💖', '💗', '❤️', '💕', '💖', '💗', '💝', '💓', '💞', '💘', '💝', '💓', '💞', '💘'];
    let flipped = [];
    let matched = 0;
    let attempts = 0;

    const createGame = () => {
        let shuffled = [...cards].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <h3 class="game-title">🎲 Memory Match Game 🎲</h3>
            <div class="result-text">Matches: ${matched}/8 | Attempts: ${attempts}</div>
            <div class="memory-grid-game" id="gameGrid"></div>
        `;

        const grid = document.getElementById('gameGrid');
        shuffled.forEach((card, index) => {
            const btn = document.createElement('button');
            btn.className = 'memory-card-game';
            btn.textContent = '?';
            btn.dataset.index = index;
            btn.dataset.card = card;
            btn.onclick = () => flipCard(btn, index);
            grid.appendChild(btn);
        });
    };

    window.flipCard = (btn, index) => {
        if (flipped.length < 2 && !btn.classList.contains('flipped')) {
            btn.classList.add('flipped');
            btn.textContent = btn.dataset.card;
            flipped.push({ btn, index, card: btn.dataset.card });

            if (flipped.length === 2) {
                attempts++;
                if (flipped[0].card === flipped[1].card) {
                    matched++;
                    flipped = [];
                    if (matched === 8) {
                        container.innerHTML = `
                            <h3 class="game-title">🎉 You Won! 🎉</h3>
                            <div class="result-text">Completed in ${attempts} attempts!</div>
                            <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
                        `;
                    }
                } else {
                    setTimeout(() => {
                        flipped[0].btn.classList.remove('flipped');
                        flipped[1].btn.classList.remove('flipped');
                        flipped[0].btn.textContent = '?';
                        flipped[1].btn.textContent = '?';
                        flipped = [];
                    }, 1000);
                }
            }
        }
    };

    createGame();
}

function startRoulette(container) {
    let currentChallenge = 0;

    const showChallenge = () => {
        if (currentChallenge >= rouletteChallenges.length) {
            container.innerHTML = `
                <h3 class="game-title">🎡 All Challenges Done! 🎡</h3>
                <div class="result-text">You completed ${currentChallenge} romantic challenges! 💕</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }

        const challenge = rouletteChallenges[Math.floor(Math.random() * rouletteChallenges.length)];
        container.innerHTML = `
            <h3 class="game-title">🎡 Love Roulette 🎡</h3>
            <div class="result-text">${challenge}</div>
            <button class="roulette-btn-game" onclick="nextChallenge(${currentChallenge + 1})">Next Challenge</button>
        `;
    };

    window.nextChallenge = (next) => {
        currentChallenge = next;
        showChallenge();
    };

    showChallenge();
}

function startQuiz(container) {
    let currentQ = 0;
    let score = 0;

    const showQuestion = () => {
        if (currentQ >= quizQuestions.length) {
            container.innerHTML = `
                <h3 class="game-title">📊 Quiz Complete! 📊</h3>
                <div class="game-score">Your Score: ${score}/${quizQuestions.length}</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }

        const question = quizQuestions[currentQ];
        container.innerHTML = `
            <h3 class="game-title">Q${currentQ + 1}/${quizQuestions.length}</h3>
            <div class="question-text">${question.q}</div>
            <div class="quiz-options">
                ${question.options.map((opt, idx) => `
                    <button class="quiz-option" onclick="answerQuiz(${idx}, ${question.correct}, ${currentQ})">${opt}</button>
                `).join('')}
            </div>
        `;
    };

    window.answerQuiz = (selected, correct, qIndex) => {
        if (selected === correct) {
            score++;
        }
        currentQ++;
        showQuestion();
    };

    showQuestion();
}

// ===== MULTIPLAYER GAMES =====

function startMultiplayerGame(gameType) {
    const modal = document.getElementById('gameModal');
    const container = document.getElementById('gameContainer');
    modal.style.display = 'block';

    if (gameType === 'tictactoe') {
        startTicTacToe(container);
    } else if (gameType === 'rockpaper') {
        startRockPaperScissors(container);
    } else if (gameType === 'truthdare') {
        startTruthOrDare(container);
    } else if (gameType === 'wordmatch') {
        startWordMatch(container);
    }
}

// TIC TAC TOE - Multiplayer
function startTicTacToe(container) {
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = Math.random() > 0.5 ? 'X' : 'O';
    let gameOver = false;
    let winner = null;

    const setupGame = () => {
        const otherUserName = currentUser === 'MKF' ? 'MQF' : 'MKF';
        const yourSymbol = currentPlayer === 'X' ? 'X' : 'O';
        
        container.innerHTML = `
            <h3 class="game-title">🎮 Tic Tac Toe Battle 🎮</h3>
            <div class="game-info">Your symbol: <strong>${yourSymbol}</strong> | Turn: <span id="turnDisplay">${currentPlayer === 'X' ? 'Player X' : 'Player O'}</span></div>
            <div id="boardDisplay" class="tictactoe-board"></div>
            <button class="next-game-btn" onclick="closeGame()">Exit Game</button>
        `;
        
        renderBoard();
    };

    const renderBoard = () => {
        const boardDisplay = document.getElementById('boardDisplay');
        boardDisplay.innerHTML = board.map((cell, index) => `
            <button class="tictactoe-cell" onclick="playTicTacToe(${index})" 
                    style="pointer-events: ${gameOver ? 'none' : 'auto'}; opacity: ${gameOver ? '0.6' : '1'}">
                ${cell === 'X' ? '❌' : cell === 'O' ? '⭕' : ''}
            </button>
        `).join('');
    };

    const checkWin = () => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return null;
    };

    window.playTicTacToe = (index) => {
        if (board[index] || gameOver) return;
        
        board[index] = currentPlayer;
        winner = checkWin();
        
        if (winner) {
            gameOver = true;
            const winnerName = winner === 'X' ? (currentPlayer === 'X' ? 'You' : 'Your Love') : (currentPlayer === 'O' ? 'You' : 'Your Love');
            container.innerHTML = `
                <h3 class="game-title">🏆 Game Over! 🏆</h3>
                <div class="game-score">${winnerName} Won the Game!</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }
        
        if (board.every(cell => cell)) {
            gameOver = true;
            container.innerHTML = `
                <h3 class="game-title">🤝 It's a Draw! 🤝</h3>
                <div class="game-score">Great game! You're evenly matched! 💕</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        const turnDisplay = document.getElementById('turnDisplay');
        if (turnDisplay) turnDisplay.textContent = currentPlayer === 'X' ? 'Player X' : 'Player O';
        
        renderBoard();
    };

    setupGame();
}

// ROCK PAPER SCISSORS - Multiplayer
function startRockPaperScissors(container) {
    let userScore = 0;
    let computerScore = 0;
    let round = 1;
    const maxRounds = 3;

    const showRound = () => {
        if (round > maxRounds) {
            let resultText = userScore > computerScore ? 'You Won!' : 
                            computerScore > userScore ? 'Your Love Won!' : 'It\'s a Tie!';
            container.innerHTML = `
                <h3 class="game-title">🎊 Match Complete! 🎊</h3>
                <div class="game-score">Your Score: ${userScore} | Their Score: ${computerScore}</div>
                <div class="game-score" style="font-size: 1.2em; margin-top: 10px;">${resultText}</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }

        container.innerHTML = `
            <h3 class="game-title">🎮 Rock Paper Scissors 🎮</h3>
            <div class="game-info">Round ${round}/${maxRounds} | Score: You ${userScore} - ${computerScore} Them</div>
            <div class="rps-buttons">
                <button class="rps-btn" onclick="playRPS('rock')">🪨 Rock</button>
                <button class="rps-btn" onclick="playRPS('paper')">📄 Paper</button>
                <button class="rps-btn" onclick="playRPS('scissors')">✂️ Scissors</button>
            </div>
        `;
    };

    window.playRPS = (userChoice) => {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        const emojis = { rock: '🪨', paper: '📄', scissors: '✂️' };
        
        let result = '';
        if (userChoice === computerChoice) {
            result = 'It\'s a Tie! 🤝';
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result = 'You Won this Round! 🎉';
            userScore++;
        } else {
            result = 'They Won this Round! 😊';
            computerScore++;
        }
        
        container.innerHTML = `
            <h3 class="game-title">🎮 Rock Paper Scissors 🎮</h3>
            <div class="game-info">Round ${round}/${maxRounds}</div>
            <div style="text-align: center; margin: 20px 0;">
                <div style="font-size: 2em; margin-bottom: 10px;">You: ${emojis[userChoice]} vs ${emojis[computerChoice]} :Them</div>
                <div style="font-size: 1.5em; color: #ff69b4; margin: 15px 0;">${result}</div>
                <div style="margin-top: 15px;">Current Score: You ${userScore} - ${computerScore} Them</div>
            </div>
            <button class="roulette-btn-game" onclick="continueRPS()">Next Round</button>
        `;
    };

    window.continueRPS = () => {
        round++;
        showRound();
    };

    showRound();
}

// TRUTH OR DARE - Multiplayer
function startTruthOrDare(container) {
    const truths = [
        "What's the most romantic thing your love has done for you?",
        "What's your favorite memory together?",
        "When did you first know they were the one?",
        "What do you love most about them?",
        "What's your biggest dream together?"
    ];

    const dares = [
        "Give them a 10-second hug right now! 💕",
        "Say something you love about them in a funny voice!",
        "Do a silly dance and they have to join!",
        "Give them a kiss on the forehead! 💋",
        "Tell them your favorite joke to make them laugh!"
    ];

    let currentPlayer = 'A';
    let questionCount = 0;
    const maxQuestions = 4;

    const showQuestion = () => {
        if (questionCount >= maxQuestions) {
            container.innerHTML = `
                <h3 class="game-title">💕 Game Complete! 💕</h3>
                <div class="result-text">You shared ${maxQuestions} exciting moments together! 🎉</div>
                <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
            `;
            return;
        }

        container.innerHTML = `
            <h3 class="game-title">💕 Truth or Dare 💕</h3>
            <div class="game-info">Question ${questionCount + 1}/${maxQuestions} | ${currentPlayer === 'A' ? 'Your Turn' : 'Their Turn'}</div>
            <div style="text-align: center; margin: 30px 0;">
                <button class="rps-btn" style="margin: 10px; width: 200px; font-size: 1.1em;" onclick="playTruthOrDare('truth')">🎯 Ask Truth</button>
                <br>
                <button class="rps-btn" style="margin: 10px; width: 200px; font-size: 1.1em;" onclick="playTruthOrDare('dare')">🎪 Give Dare</button>
            </div>
        `;
    };

    window.playTruthOrDare = (choice) => {
        const question = choice === 'truth' ? truths[Math.floor(Math.random() * truths.length)] : dares[Math.floor(Math.random() * dares.length)];
        const icon = choice === 'truth' ? '🎯' : '🎪';
        
        container.innerHTML = `
            <h3 class="game-title">💕 Truth or Dare 💕</h3>
            <div class="game-info">${icon} ${choice === 'truth' ? 'TRUTH' : 'DARE'} for ${currentPlayer === 'A' ? 'You' : 'Your Love'}</div>
            <div class="question-text" style="font-size: 1.1em; margin: 30px 0; padding: 20px; background: rgba(255, 105, 180, 0.1); border-radius: 10px;">
                ${question}
            </div>
            <button class="roulette-btn-game" onclick="continueTruthOrDare()">Next Challenge</button>
        `;
    };

    window.continueTruthOrDare = () => {
        currentPlayer = currentPlayer === 'A' ? 'B' : 'A';
        questionCount++;
        showQuestion();
    };

    showQuestion();
}

// WORD MATCH - Multiplayer Matching Game
function startWordMatch(container) {
    const wordPairs = [
        { word: 'LOVE', hint: 'The strongest feeling 💕' },
        { word: 'HEART', hint: 'Where love lives ❤️' },
        { word: 'KISS', hint: 'Show affection with this 💋' },
        { word: 'FOREVER', hint: 'How long we\'ll be together ♾️' },
        { word: 'SMILE', hint: 'What they make you do 😊' },
        { word: 'DANCE', hint: 'Move to the rhythm together 💃' }
    ];

    let matchedPairs = [];
    let currentWord = '';
    let attempts = 0;

    const setupGame = () => {
        const shuffled = [...wordPairs].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <h3 class="game-title">🎯 Word Match Game 🎯</h3>
            <div class="game-info">Matches: ${matchedPairs.length}/${wordPairs.length} | Attempts: ${attempts}</div>
            <div class="word-match-grid" id="wordGrid"></div>
        `;

        const grid = document.getElementById('wordGrid');
        shuffled.forEach((pair, index) => {
            const btn = document.createElement('button');
            btn.className = 'word-match-btn';
            btn.textContent = pair.hint;
            btn.onclick = () => selectWordPair(index, pair.word, btn);
            grid.appendChild(btn);
        });
    };

    window.selectWordPair = (index, word, btn) => {
        if (btn.classList.contains('matched')) return;
        
        if (currentWord === '') {
            currentWord = word;
            btn.classList.add('selected');
            btn.style.background = '#ff69b4';
        } else if (currentWord === word && btn.textContent !== document.querySelector('.word-match-btn.selected').textContent) {
            matchedPairs.push(word);
            btn.classList.add('matched');
            document.querySelector('.word-match-btn.selected').classList.add('matched');
            
            if (matchedPairs.length === wordPairs.length) {
                container.innerHTML = `
                    <h3 class="game-title">🎉 You Won! 🎉</h3>
                    <div class="game-score">Completed in ${attempts} attempts!</div>
                    <button class="next-game-btn" onclick="closeGame()">Return to Games</button>
                `;
                return;
            }
            
            currentWord = '';
            attempts++;
            setupGame();
        } else {
            btn.classList.add('selected');
            btn.style.background = '#ff69b4';
            attempts++;
            currentWord = '';
            setTimeout(() => {
                document.querySelector('.word-match-btn.selected')?.classList.remove('selected');
                document.querySelector('.word-match-btn.selected')?.style.removeProperty('background');
                document.querySelectorAll('.word-match-btn.selected').forEach(b => {
                    b.classList.remove('selected');
                    b.style.removeProperty('background');
                });
                setupGame();
            }, 1000);
        }
    };

    setupGame();
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Initialize Firebase first
        initializeFirebase();
        
        await initDB();
        
        // Sync from Firebase if available
        if (isCloudAvailable) {
            await syncMemoriesFromFirebase();
        }

        // Display current date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        document.getElementById('dateDisplay').textContent = `Today: ${today}`;

        // Handle login form submission
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }

        // Upload buttons
        const uploadBtn = document.getElementById('uploadBtn');
        uploadBtn.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        const docUploadBtn = document.getElementById('docUploadBtn');
        docUploadBtn.addEventListener('click', () => {
            document.getElementById('docFileInput').click();
        });

        // File input change
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', (e) => {
            handleFileUpload(e.target.files);
        });

        const docFileInput = document.getElementById('docFileInput');
        docFileInput.addEventListener('change', (e) => {
            handleFileUpload(e.target.files, true);
        });

        // Drag and drop for photos/videos
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            handleFileUpload(e.dataTransfer.files);
        });

        // Drag and drop for documents
        const docUploadArea = document.getElementById('docUploadArea');
        docUploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            docUploadArea.classList.add('drag-over');
        });

        docUploadArea.addEventListener('dragleave', () => {
            docUploadArea.classList.remove('drag-over');
        });

        docUploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            docUploadArea.classList.remove('drag-over');
            handleFileUpload(e.dataTransfer.files, true);
        });

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                renderGallery(filter);
            });
        });

        // Modal controls
        document.querySelector('.close-btn').addEventListener('click', closeModal);

        document.querySelector('.prev-btn').addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                displayMemory(filteredMemories[currentIndex]);
                updateNavigationButtons();
            }
        });

        document.querySelector('.next-btn').addEventListener('click', () => {
            if (currentIndex < filteredMemories.length - 1) {
                currentIndex++;
                displayMemory(filteredMemories[currentIndex]);
                updateNavigationButtons();
            }
        });

        // Chat
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('sendBtn');

        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('modal');
            const gameModal = document.getElementById('gameModal');
            const permissionModal = document.getElementById('permissionModal');
            
            if (e.target === modal) {
                closeModal();
            } else if (e.target === gameModal) {
                closeGame();
            } else if (e.target === permissionModal) {
                permissionModal.style.display = 'none';
            }
        });

    } catch (error) {
        console.error('Failed to initialize application:', error);
        alert('Failed to initialize the memory vault. Please refresh the page.');
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('modal');
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.prev-btn').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.next-btn').click();
        } else if (e.key === 'Escape') {
            closeModal();
        }
    }
});
