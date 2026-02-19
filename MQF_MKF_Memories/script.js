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
        name: 'TUYISHIME Yvonbe Faida',
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
    renderGallery();
    updateStorageInfo();
    renderDocuments();
    renderMessages();
    
    // Initialize daily romantic message and notifications
    initializeDailyMessage();
    startNotificationListener();
    scheduleAutomaticMessages();
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

        reader.onload = () => {
            const transaction = db.transaction([STORE_NAMES.memories], 'readwrite');
            const store = transaction.objectStore(STORE_NAMES.memories);

            const memory = {
                filename: file.name,
                type: file.type.startsWith('image') ? 'image' : 'video',
                data: reader.result,
                timestamp: new Date().getTime(),
                filesize: file.size,
                uploadDate: new Date().toLocaleDateString(),
                uploadedBy: currentUser
            };

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

        reader.onload = () => {
            const transaction = db.transaction([STORE_NAMES.documents], 'readwrite');
            const store = transaction.objectStore(STORE_NAMES.documents);

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

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// INITIALIZE APP
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initDB();

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
