const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Create upload directory if it doesn't exist
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// In-memory database for metadata (in production, use a real database)
let memoriesDB = [];
let documentsDB = [];
let nextMemoryId = 1;
let nextDocumentId = 1;

// Load data on startup
function loadData() {
    try {
        if (fs.existsSync(path.join(__dirname, 'memories.json'))) {
            const data = fs.readFileSync(path.join(__dirname, 'memories.json'), 'utf8');
            memoriesDB = JSON.parse(data);
            nextMemoryId = Math.max(...memoriesDB.map(m => m.id), 0) + 1;
        }
        if (fs.existsSync(path.join(__dirname, 'documents.json'))) {
            const data = fs.readFileSync(path.join(__dirname, 'documents.json'), 'utf8');
            documentsDB = JSON.parse(data);
            nextDocumentId = Math.max(...documentsDB.map(d => d.id), 0) + 1;
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Save data to files
function saveData() {
    try {
        fs.writeFileSync(path.join(__dirname, 'memories.json'), JSON.stringify(memoriesDB, null, 2));
        fs.writeFileSync(path.join(__dirname, 'documents.json'), JSON.stringify(documentsDB, null, 2));
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// =====================
// AUTHENTICATION ROUTES
// =====================

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Simple auth check
    const validUsers = {
        '0791756160': 'MKFLOVE',  // MKF
        '0794780083': 'MQFLOVE'   // MQF
    };
    
    if (validUsers[username] && validUsers[username] === password) {
        res.json({ 
            success: true, 
            user: username === '0791756160' ? 'MKF' : 'MQF',
            message: 'Login successful'
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// =====================
// MEMORY ROUTES
// =====================

// Upload memory (image/video as base64)
app.post('/api/memories/upload', (req, res) => {
    try {
        const { filename, type, data, filesize, uploadDate, uploadedBy } = req.body;
        
        if (!filename || !type || !data || !uploadedBy) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const id = nextMemoryId++;
        const memory = {
            id,
            filename,
            type,
            filesize,
            uploadDate: uploadDate || new Date().toLocaleDateString(),
            uploadedBy,
            timestamp: new Date().getTime(),
            dataSize: data.length
        };
        
        // Save file data
        const fileName = `memory_${id}_${filename}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        
        // Convert base64 to buffer and save
        const buffer = Buffer.from(data, 'base64');
        fs.writeFileSync(filePath, buffer);
        
        memory.filePath = fileName;
        memoriesDB.push(memory);
        saveData();
        
        res.json({ success: true, id, message: 'Memory uploaded successfully' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed', details: error.message });
    }
});

// Get all memories
app.get('/api/memories', (req, res) => {
    try {
        // Sort by timestamp descending
        const sorted = memoriesDB.sort((a, b) => b.timestamp - a.timestamp);
        res.json(sorted);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch memories' });
    }
});

// Get memory data by ID
app.get('/api/memories/:id/data', (req, res) => {
    try {
        const memory = memoriesDB.find(m => m.id === parseInt(req.params.id));
        if (!memory) {
            return res.status(404).json({ error: 'Memory not found' });
        }
        
        const filePath = path.join(UPLOADS_DIR, memory.filePath);
        const data = fs.readFileSync(filePath);
        const base64 = data.toString('base64');
        
        res.json({ 
            success: true, 
            data: {
                ...memory,
                data: base64
            }
        });
    } catch (error) {
        console.error('Error fetching memory:', error);
        res.status(500).json({ error: 'Failed to fetch memory' });
    }
});

// Delete memory
app.delete('/api/memories/:id', (req, res) => {
    try {
        const index = memoriesDB.findIndex(m => m.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Memory not found' });
        }
        
        const memory = memoriesDB[index];
        const filePath = path.join(UPLOADS_DIR, memory.filePath);
        
        // Delete file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        memoriesDB.splice(index, 1);
        saveData();
        
        res.json({ success: true, message: 'Memory deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete memory' });
    }
});

// =====================
// DOCUMENT ROUTES
// =====================

// Upload document
app.post('/api/documents/upload', (req, res) => {
    try {
        const { filename, data, uploadedBy } = req.body;
        
        if (!filename || !data || !uploadedBy) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const id = nextDocumentId++;
        const document = {
            id,
            filename,
            uploadedBy,
            timestamp: new Date().getTime(),
            uploadDate: new Date().toLocaleDateString(),
            dataSize: data.length
        };
        
        // Save file data
        const fileName = `doc_${id}_${filename}`;
        const filePath = path.join(UPLOADS_DIR, fileName);
        
        const buffer = Buffer.from(data, 'base64');
        fs.writeFileSync(filePath, buffer);
        
        document.filePath = fileName;
        documentsDB.push(document);
        saveData();
        
        res.json({ success: true, id, message: 'Document uploaded successfully' });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed', details: error.message });
    }
});

// Get all documents
app.get('/api/documents', (req, res) => {
    try {
        const sorted = documentsDB.sort((a, b) => b.timestamp - a.timestamp);
        res.json(sorted);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch documents' });
    }
});

// Get document data by ID
app.get('/api/documents/:id/data', (req, res) => {
    try {
        const document = documentsDB.find(d => d.id === parseInt(req.params.id));
        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        const filePath = path.join(UPLOADS_DIR, document.filePath);
        const data = fs.readFileSync(filePath);
        const base64 = data.toString('base64');
        
        res.json({ 
            success: true, 
            data: {
                ...document,
                data: base64
            }
        });
    } catch (error) {
        console.error('Error fetching document:', error);
        res.status(500).json({ error: 'Failed to fetch document' });
    }
});

// Delete document
app.delete('/api/documents/:id', (req, res) => {
    try {
        const index = documentsDB.findIndex(d => d.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Document not found' });
        }
        
        const document = documentsDB[index];
        const filePath = path.join(UPLOADS_DIR, document.filePath);
        
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        documentsDB.splice(index, 1);
        saveData();
        
        res.json({ success: true, message: 'Document deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete document' });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Load data on startup
loadData();

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Memory Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${UPLOADS_DIR}`);
});
