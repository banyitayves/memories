// IndexedDB setup for large storage capacity
const DB_NAME = 'MQF_MKF_Memories';
const DB_VERSION = 1;
const STORE_NAME = 'memories';

let db;
let currentIndex = 0;
let filteredMemories = [];
let allMemories = [];

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
            if (!database.objectStoreNames.contains(STORE_NAME)) {
                const store = database.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
                store.createIndex('timestamp', 'timestamp', { unique: false });
                store.createIndex('type', 'type', { unique: false });
            }
        };
    });
}

// Add memory to database
function addMemory(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const memory = {
                filename: file.name,
                type: file.type.startsWith('image') ? 'image' : 'video',
                data: reader.result,
                timestamp: new Date().getTime(),
                filesize: file.size,
                uploadDate: new Date().toLocaleDateString()
            };

            const request = store.add(memory);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        };

        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}

// Get all memories
function getAllMemories() {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            const memories = request.result.sort((a, b) => b.timestamp - a.timestamp);
            resolve(memories);
        };
        request.onerror = () => reject(request.error);
    });
}

// Delete memory
function deleteMemory(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

// Get memory by ID
function getMemoryById(id) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Calculate total storage used
async function updateStorageInfo() {
    const memories = await getAllMemories();
    let totalSize = 0;

    memories.forEach(memory => {
        totalSize += memory.filesize || 0;
    });

    const usedMB = (totalSize / (1024 * 1024)).toFixed(2);
    const percentUsed = Math.min((totalSize / (1024 * 1024 * 10)) * 100, 100); // Assuming 10GB limit display

    document.getElementById('storageUsed').style.width = percentUsed + '%';
    document.getElementById('storageText').textContent = 
        `Used: ${usedMB} MB / Available: Virtually Unlimited (IndexedDB Storage)`;
}

// Render gallery
async function renderGallery(filter = 'all') {
    const memories = await getAllMemories();
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
}

// Open modal
function openModal(index) {
    currentIndex = index;
    const memory = filteredMemories[index];
    displayMemory(memory);
    document.getElementById('modal').style.display = 'block';
    updateNavigationButtons();
}

// Display memory in modal
function displayMemory(memory) {
    const blob = new Blob([memory.data], { type: memory.type === 'image' ? 'image/jpeg' : 'video/mp4' });
    const url = URL.createObjectURL(blob);

    const modalBody = document.getElementById('modalBody');
    if (memory.type === 'image') {
        modalBody.innerHTML = `<img src="${url}" style="max-width: 100%; max-height: 100%; object-fit: contain;">`;
    } else {
        modalBody.innerHTML = `<video controls style="max-width: 100%; max-height: 100%; object-fit: contain;"><source src="${url}" type="video/mp4"></video>`;
    }
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === filteredMemories.length - 1;
}

// Close modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Handle file upload
async function handleFileUpload(files) {
    if (files.length === 0) return;

    const uploadProgress = document.getElementById('uploadProgress');
    const progressBar = document.getElementById('progressBar');
    const uploadStatus = document.getElementById('uploadStatus');

    uploadProgress.style.display = 'block';

    let completed = 0;
    for (const file of files) {
        // Validate file type
        if (!file.type.startsWith('image') && !file.type.startsWith('video')) {
            uploadStatus.textContent = `⚠️ Invalid file type: ${file.name}. Only images and videos allowed.`;
            continue;
        }

        try {
            await addMemory(file);
            completed++;
            const progress = (completed / files.length) * 100;
            progressBar.style.width = progress + '%';
            uploadStatus.textContent = `Uploading: ${completed}/${files.length} files...`;

            if (completed === files.length) {
                uploadStatus.textContent = `✅ Successfully uploaded ${completed} memory(ies)! 💕`;
                await renderGallery();
                await updateStorageInfo();

                setTimeout(() => {
                    uploadProgress.style.display = 'none';
                }, 2000);
            }
        } catch (error) {
            console.error('Upload error:', error);
            uploadStatus.textContent = `❌ Error uploading ${file.name}`;
        }
    }
}

// Setup event listeners
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await initDB();
        await renderGallery();
        await updateStorageInfo();

        // Display current date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        document.getElementById('dateDisplay').textContent = `Today: ${today}`;

        // Upload button
        const uploadBtn = document.getElementById('uploadBtn');
        uploadBtn.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        // File input change
        const fileInput = document.getElementById('fileInput');
        fileInput.addEventListener('change', (e) => {
            handleFileUpload(e.target.files);
        });

        // Drag and drop
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

        // Filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                await renderGallery(filter);
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

        // Delete button
        document.getElementById('deleteBtn').addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this precious memory? 😢')) {
                const memoryId = filteredMemories[currentIndex].id;
                await deleteMemory(memoryId);
                closeModal();
                await renderGallery();
                await updateStorageInfo();
            }
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('modal');
            if (e.target === modal) {
                closeModal();
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
