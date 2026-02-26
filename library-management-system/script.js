// ========== AUTHENTICATION & ROLES ==========
const AUTH_USERS = {
    'admin@library.com': { password: 'admin123', role: 'admin', name: 'Administrator' },
    'librarian@library.com': { password: 'lib123', role: 'librarian', name: 'Librarian' },
    'staff@library.com': { password: 'staff123', role: 'staff', name: 'Staff Member' },
    'student@library.com': { password: 'student123', role: 'student', name: 'Student' }
};

let currentUser = null;
let currentUserRole = null;

// ========== DATABASE & LOCAL STORAGE ==========
class LibraryDB {
    constructor() {
        this.books = this.loadData('books') || [];
        this.patrons = this.loadData('patrons') || [];
        this.loans = this.loadData('loans') || [];
        this.borrowRequests = this.loadData('borrowRequests') || [];
        this.purchaseOrders = this.loadData('purchaseOrders') || [];
        this.serials = this.loadData('serials') || [];
        this.settings = this.loadData('settings') || this.getDefaultSettings();
        this.chatMessages = this.loadData('chatMessages') || [];
        this.inboxMessages = this.loadData('inboxMessages') || [];
        
        // Add default books if none exist
        if (this.books.length === 0) {
            this.addDefaultBooks();
        } else {
            // Migrate existing books - add pdfLinks if missing
            this.migrateBooksWithPdfLinks();
        }
    }

    migrateBooksWithPdfLinks() {
        // Map of book titles to their official REB e-learning platform resources
        const pdfLinksMap = {
            // Literary Works - External Resources
            'A Man of the People': 'https://www.pdfdrive.com/a-man-of-the-people-chinua-achebe-e174886.html',
            'Julius Caesar': 'https://www.gutenberg.org/cache/epub/2263/pg2263-images.html',
            'The Pearl': 'https://openlibrary.org/books/OL7262571M/The_Pearl',
            'An Enemy of the People': 'https://www.gutenberg.org/cache/epub/2618/pg2618-images.html',
            'Mine Boy': 'https://openlibrary.org/works/OL1797827W/Mine_Boy',
            'Animal Farm': 'https://www.planetebook.com/free-ebooks/animal-farm.pdf',
            'When the Sun Goes Down': 'https://archive.org/details/when-the-sun-goes-down-short-stories',
            
            // REB Official E-Learning Platform - Primary Books
            'PRIMARY - P1 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P1 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P1 SET': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P1 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P2 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P2 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P2 SET': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P2 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P2 FRENCH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P3 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P3 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P3 SET': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P3 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P3 FRENCH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 SET': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 CREATIVE ARTS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P4 FRENCH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 SET': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 CREATIVE ARTS': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
            'PRIMARY - P5 FRENCH': 'https://elearning.reb.rw/course/index.php',
            
            // REB Official E-Learning Platform - Nursery Books
            'NURSERY - NUMERACY': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - PHYSICAL DEVELOPMENT AND HEALTH': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - DISCOVERY OF THE WORLD': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - CREATIVE ARTS AND CULTURE': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - SOCIAL AND EMOTIONAL DEVELOPMENT': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - IBIRIBWA': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - IBIDUKIKIJE KAMERE': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - IMAGO N\'IMIRIMO': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - AMATUNGO': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - INYAMANSWA ZO MU GASOZI': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - INYAMANSWA ZO MU MAZI': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - NGEWE N\'UMURYANGO WANGE 1': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - NGEWE N\'UMURYANGO WANGE 2': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - NGEWE N\'UMURYANGO WANGE 3': 'https://elearning.reb.rw/course/index.php',
            'NURSERY - INYOBORABAREZI': 'https://elearning.reb.rw/course/index.php',
            
            // REB Official E-Learning Platform - Secondary Books
            'SECONDARY - S1 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'SECONDARY - S2 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'SECONDARY - S3 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'SECONDARY - S4 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'SECONDARY - S5 ENGLISH': 'https://elearning.reb.rw/course/index.php',
            'SECONDARY - S6 ENGLISH': 'https://elearning.reb.rw/course/index.php'
        };
        
        let updated = false;
        this.books = this.books.map(book => {
            if (!book.pdfLink) {
                // Try exact match first
                if (pdfLinksMap[book.title]) {
                    book.pdfLink = pdfLinksMap[book.title];
                    updated = true;
                }
                // REB fallback for any other REB curriculum books
                else if (book.category === 'REB Curriculum' || book.category === 'Primary' || book.category === 'Nursery' || book.category === 'Secondary') {
                    // Link to official REB E-Learning Platform
                    book.pdfLink = 'https://elearning.reb.rw/course/index.php';
                    updated = true;
                }
            }
            return book;
        });
        
        if (updated) {
            this.saveData('books', this.books);
        }
    }

    addDefaultBooks() {
        // REB Curriculum Books
        const rebBooks = [
            {
                id: this.generateId(),
                isbn: '978-0-143-03943-3',
                title: 'A Man of the People',
                author: 'Chinua Achebe',
                publisher: 'Doubleday',
                category: 'REB Curriculum',
                quantity: 15,
                available: 15,
                pubYear: 1966,
                language: 'English',
                description: 'A satirical novel about politics and corruption in post-independence Africa.',
                pdfLink: 'https://www.pdfdrive.com/a-man-of-the-people-chinua-achebe-e174886.html',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-140-18952-6',
                title: 'Julius Caesar',
                author: 'William Shakespeare',
                publisher: 'Penguin Classics',
                category: 'REB Curriculum',
                quantity: 12,
                available: 12,
                pubYear: 1599,
                language: 'English',
                description: 'A tragedy depicting the life and death of Julius Caesar in ancient Rome.',
                pdfLink: 'https://www.gutenberg.org/cache/epub/2263/pg2263-images.html',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-141-39015-0',
                title: 'The Pearl',
                author: 'John Steinbeck',
                publisher: 'Penguin Classics',
                category: 'REB Curriculum',
                quantity: 14,
                available: 14,
                pubYear: 1947,
                language: 'English',
                description: 'A novella about a pearl diver and the profound impact of finding a valuable pearl.',
                pdfLink: 'https://openlibrary.org/books/OL7262571M/The_Pearl',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-140-44104-6',
                title: 'An Enemy of the People',
                author: 'Henrik Ibsen',
                publisher: 'Penguin Classics',
                category: 'REB Curriculum',
                quantity: 10,
                available: 10,
                pubYear: 1882,
                language: 'English',
                description: 'A play about an individual\'s struggle against society when confronting uncomfortable truths.',
                pdfLink: 'https://www.gutenberg.org/cache/epub/2618/pg2618-images.html',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-435-90841-8',
                title: 'Mine Boy',
                author: 'Peter Abrahams',
                publisher: 'Macmillan',
                category: 'REB Curriculum',
                quantity: 13,
                available: 13,
                pubYear: 1946,
                language: 'English',
                description: 'A novel set in South Africa about a young man working in the mines and navigating racial tensions.',
                pdfLink: 'https://openlibrary.org/works/OL1797827W/Mine_Boy',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-451-52686-2',
                title: 'Animal Farm',
                author: 'George Orwell',
                publisher: 'Penguin',
                category: 'REB Curriculum',
                quantity: 16,
                available: 16,
                pubYear: 1945,
                language: 'English',
                description: 'An allegorical novella that satirizes the Russian Revolution through the story of farm animals.',
                pdfLink: 'https://www.planetebook.com/free-ebooks/animal-farm.pdf',
                status: 'available',
                dateAdded: new Date().toISOString()
            },
            {
                id: this.generateId(),
                isbn: '978-0-141-40097-9',
                title: 'When the Sun Goes Down',
                author: 'Various/Local Authors',
                publisher: 'Educational Publishers',
                category: 'Short Stories',
                quantity: 20,
                available: 20,
                pubYear: 2005,
                language: 'English',
                description: 'A collection of engaging short stories perfect for students studying literature and comprehension.',
                pdfLink: 'https://archive.org/details/when-the-sun-goes-down-short-stories',
                status: 'available',
                dateAdded: new Date().toISOString()
            }
        ];

        this.books = rebBooks;
        this.saveData('books', this.books);
    }

    loadData(key) {
        try {
            return JSON.parse(localStorage.getItem(`lms_${key}`));
        } catch (e) {
            console.error(`Error loading ${key}:`, e);
            return null;
        }
    }

    saveData(key, data) {
        try {
            localStorage.setItem(`lms_${key}`, JSON.stringify(data));
        } catch (e) {
            console.error(`Error saving ${key}:`, e);
            alert('Storage quota exceeded!');
        }
    }

    getDefaultSettings() {
        return {
            libraryName: 'GS BUSANZA',
            checkoutDays: 14,
            finePerDay: 0.50,
            maxItems: 5,
            emailNotifications: true,
            smsNotifications: false,
            reminderDays: 3,
            language: 'en'
        };
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Initialize Database
const db = new LibraryDB();

// ========== UI STATE MANAGEMENT ==========
let currentModule = 'dashboard';
let selectedBook = null;
let selectedPatron = null;

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('currentUserRole');
    
    if (storedUser && storedRole) {
        currentUser = storedUser;
        currentUserRole = storedRole;
        showMainApp();
        initializeEventListeners();
        loadDashboard();
        loadSettings();
    } else {
        showLoginPage();
        setupLoginHandler();
    }
});

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('mainContainer').style.display = 'none';
}

function showMainApp() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'flex';
    updateUserDisplay();
    updateRoleBasedVisibility();
}

function setupLoginHandler() {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const selectedRole = document.getElementById('loginRole').value;
        
        const user = AUTH_USERS[email];
        
        if (!user) {
            alert('User not found!');
            return;
        }
        
        if (user.password !== password) {
            alert('Incorrect password!');
            return;
        }
        
        if (user.role !== selectedRole) {
            alert(`Role mismatch! This account is: ${user.role}`);
            return;
        }
        
        // Login successful
        currentUser = email;
        currentUserRole = selectedRole;
        localStorage.setItem('currentUser', currentUser);
        localStorage.setItem('currentUserRole', currentUserRole);
        
        showMainApp();
        initializeEventListeners();
        loadDashboard();
        loadSettings();
    });
}

function updateUserDisplay() {
    const user = AUTH_USERS[currentUser];
    document.getElementById('currentUser').textContent = user.name;
    const roleDisplay = document.getElementById('currentRole');
    roleDisplay.textContent = currentUserRole.toUpperCase();
    roleDisplay.className = `role-badge role-${currentUserRole}`;
}

function updateRoleBasedVisibility() {
    // Hide all role elements
    document.querySelectorAll('[class*="role-"]').forEach(el => {
        el.classList.remove('visible');
    });
    
    // Show elements for current role
    document.querySelectorAll(`.role-${currentUserRole}`).forEach(el => {
        el.classList.add('visible');
    });
}

function initializeEventListeners() {
    // Module Navigation
    document.querySelectorAll('[data-module]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const module = e.target.dataset.module;
            switchModule(module);
        });
    });

    // Close modals
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('show');
        });
    });

    // Cataloging
    document.getElementById('addNewBook').addEventListener('click', openBookModal);
    document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('bookModal').classList.remove('show');
    });
    document.getElementById('bookForm').addEventListener('submit', saveBook);
    document.getElementById('catalogSearch').addEventListener('input', searchCatalog);
    document.getElementById('statusFilter').addEventListener('change', filterCatalog);

    // All Books Module
    const booksSearchInput = document.getElementById('booksSearch');
    if (booksSearchInput) {
        booksSearchInput.addEventListener('input', searchAllBooks);
    }
    const booksCategoryFilter = document.getElementById('booksCategoryFilter');
    if (booksCategoryFilter) {
        booksCategoryFilter.addEventListener('change', filterAllBooks);
    }

    // Circulation
    document.getElementById('searchPatronBtn').addEventListener('click', searchPatron);
    document.getElementById('searchBookBtn').addEventListener('click', searchBook);
    document.getElementById('checkoutBtn').addEventListener('click', performCheckout);
    document.getElementById('checkinBtn').addEventListener('click', performCheckin);
    document.getElementById('renewBtn').addEventListener('click', renewLoan);
    document.getElementById('batchCheckoutBtn').addEventListener('click', openBatchCheckoutModal);
    
    // Batch Checkout Modal
    document.getElementById('batchCheckoutModal').querySelector('.close').addEventListener('click', closeBatchCheckoutModal);

    // Patrons
    document.getElementById('addNewPatron').addEventListener('click', openPatronModal);
    document.getElementById('closePatronModalBtn').addEventListener('click', () => {
        document.getElementById('patronModal').classList.remove('show');
    });
    document.getElementById('patronForm').addEventListener('submit', savePatron);
    document.getElementById('patronSearch').addEventListener('input', searchPatrons);
    document.getElementById('patronCategoryFilter').addEventListener('change', filterPatrons);

    // OPAC
    document.getElementById('opacSearch').parentElement.querySelector('button').addEventListener('click', searchOpac);
    document.getElementById('opacCategory').addEventListener('change', filterOpac);
    document.getElementById('opacLanguage').addEventListener('change', filterOpac);

    // Acquisitions
    document.getElementById('createPOBtn').addEventListener('click', openPoModal);
    document.getElementById('closePoModalBtn').addEventListener('click', () => {
        document.getElementById('poModal').classList.remove('show');
    });
    document.getElementById('poForm').addEventListener('submit', createPO);

    // Serials
    document.getElementById('addSerialBtn').addEventListener('click', openSerialModal);
    document.getElementById('closeSerialModalBtn').addEventListener('click', () => {
        document.getElementById('serialModal').classList.remove('show');
    });
    document.getElementById('serialForm').addEventListener('submit', addSerial);

    // Data Management - Import/Export
    document.getElementById('exportBtn').addEventListener('click', exportData);
    
    // Import Books
    const importBooksBtn = document.getElementById('importBooksBtn');
    if (importBooksBtn) {
        importBooksBtn.addEventListener('click', () => {
            document.getElementById('importBooksModal').classList.add('show');
        });
    }
    
    // Import Members
    const importMembersBtn = document.getElementById('importMembersBtn');
    if (importMembersBtn) {
        importMembersBtn.addEventListener('click', () => {
            document.getElementById('importMembersModal').classList.add('show');
        });
    }

    // Close import modals
    const closeBooksBtn = document.getElementById('closeBooksImportBtn');
    if (closeBooksBtn) {
        closeBooksBtn.addEventListener('click', () => {
            document.getElementById('importBooksModal').classList.remove('show');
        });
    }

    const closeMembersBtn = document.getElementById('closeMembersImportBtn');
    if (closeMembersBtn) {
        closeMembersBtn.addEventListener('click', () => {
            document.getElementById('importMembersModal').classList.remove('show');
        });
    }

    // Books CSV import handling
    const booksFileInput = document.getElementById('booksImportFile');
    if (booksFileInput) {
        booksFileInput.addEventListener('change', previewBooksCSV);
    }

    const confirmBooksBtn = document.getElementById('confirmBooksImport');
    if (confirmBooksBtn) {
        confirmBooksBtn.addEventListener('click', importBooksFromCSV);
    }

    // Members CSV import handling
    const membersFileInput = document.getElementById('membersImportFile');
    if (membersFileInput) {
        membersFileInput.addEventListener('change', previewMembersCSV);
    }

    const confirmMembersBtn = document.getElementById('confirmMembersImport');
    if (confirmMembersBtn) {
        confirmMembersBtn.addEventListener('click', importMembersFromCSV);
    }

    // Download sample files
    document.getElementById('downloadBooksSample').addEventListener('click', (e) => {
        e.preventDefault();
        downloadBooksSampleCSV();
    });

    document.getElementById('downloadMembersSample').addEventListener('click', (e) => {
        e.preventDefault();
        downloadMembersSampleCSV();
    });

    // Borrow Request Modal
    const closeBorrowBtn = document.getElementById('closeBorrowRequestBtn');
    if (closeBorrowBtn) {
        closeBorrowBtn.addEventListener('click', () => {
            document.getElementById('borrowRequestModal').classList.remove('show');
        });
    }

    const submitBorrowBtn = document.getElementById('submitBorrowRequest');
    if (submitBorrowBtn) {
        submitBorrowBtn.addEventListener('click', submitBorrowRequest);
    }

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserRole');
            currentUser = null;
            currentUserRole = null;
            location.reload();
        }
    });

    // Global Search
    document.getElementById('globalSearch').addEventListener('input', performGlobalSearch);
}

// ========== MODULE MANAGEMENT ==========
function switchModule(moduleName) {
    // Hide all modules
    document.querySelectorAll('.module').forEach(m => m.classList.remove('active'));
    
    // Show selected module
    document.getElementById(`${moduleName}-module`).classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.module === moduleName) {
            link.classList.add('active');
        }
    });

    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        books: 'All Books in Library',
        cataloging: 'Book Cataloging',
        circulation: 'Circulation Management',
        opac: 'Search Library Catalog',
        patrons: 'Patron Management',
        acquisitions: 'Acquisitions',
        serials: 'Serials Management',
        reports: 'Reports & Statistics',
        settings: 'Settings',
        chat: 'Library Chat',
        inbox: 'Inbox - Message Librarian',
        about: 'About GS BUSANZA'
    };
    document.getElementById('pageTitle').textContent = titles[moduleName];

    currentModule = moduleName;

    // Load module data
    switch(moduleName) {
        case 'books':
            loadAllBooks();
            break;
        case 'cataloging':
            loadCatalog();
            break;
        case 'circulation':
            loadCirculation();
            break;
        case 'opac':
            displayOpacResults(db.books);
            break;
        case 'patrons':
            loadPatrons();
            break;
        case 'acquisitions':
            loadAcquisitions();
            break;
        case 'serials':
            loadSerials();
            break;
        case 'chat':
            loadChat();
            break;
        case 'inbox':
            loadInbox();
            break;
        case 'about':
            // About page loads automatically, no additional data needed
            break;
    }
}

// ========== DASHBOARD ==========
function loadDashboard() {
    const availableBooks = db.books.filter(b => b.status === 'available').length;
    const checkedOut = db.loans.filter(l => !l.returnDate).length;
    
    document.getElementById('totalBooks').textContent = db.books.length;
    document.getElementById('checkedOut').textContent = checkedOut;
    document.getElementById('available').textContent = availableBooks;
    document.getElementById('totalPatrons').textContent = db.patrons.length;

    // Load role-specific dashboard
    loadRoleSpecificDashboard();

    // Recent Checkouts
    const recentCheckouts = db.loans
        .filter(l => !l.returnDate)
        .sort((a, b) => new Date(b.checkoutDate) - new Date(a.checkoutDate))
        .slice(0, 5);

    const checkoutsList = document.getElementById('recentCheckouts');
    checkoutsList.innerHTML = recentCheckouts.length > 0 
        ? recentCheckouts.map(loan => {
            const book = db.books.find(b => b.id === loan.bookId);
            const patron = db.patrons.find(p => p.id === loan.patronId);
            return `
                <div class="activity-item">
                    <strong>${patron?.firstName} ${patron?.lastName}</strong> borrowed <em>${book?.title}</em>
                    <br><small>${new Date(loan.checkoutDate).toLocaleDateString()}</small>
                </div>
            `;
        }).join('')
        : '<p style="color: #7f8c8d;">No recent checkouts</p>';

    // Overdue Items
    const today = new Date();
    const overdueLoans = db.loans.filter(l => {
        if (l.returnDate) return false;
        const dueDate = new Date(l.dueDate);
        return dueDate < today;
    });

    const overdueList = document.getElementById('overdueItems');
    overdueList.innerHTML = overdueLoans.length > 0
        ? overdueLoans.map(loan => {
            const book = db.books.find(b => b.id === loan.bookId);
            const patron = db.patrons.find(p => p.id === loan.patronId);
            const daysOverdue = Math.floor((today - new Date(loan.dueDate)) / (1000 * 60 * 60 * 24));
            const fines = daysOverdue * db.settings.finePerDay;
            return `
                <div class="activity-item" style="border-left-color: #e74c3c;">
                    <strong>${patron?.firstName} ${patron?.lastName}</strong> - <em>${book?.title}</em>
                    <br><small>Overdue: ${daysOverdue} days | Fines: $${fines.toFixed(2)}</small>
                </div>
            `;
        }).join('')
        : '<p style="color: #7f8c8d;">No overdue items</p>';
}

// ========== ROLE-SPECIFIC DASHBOARD ==========
function loadRoleSpecificDashboard() {
    const dashboardGrid = document.querySelector('.dashboard-grid');
    let dashboardHTML = '';

    switch(currentUserRole) {
        case 'admin':
            dashboardHTML = `
                <div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <h3>System Users</h3>
                    <p class="stat-value">${Object.keys(AUTH_USERS).length}</p>
                    <small>Total accounts</small>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                    <h3>System Health</h3>
                    <p class="stat-value">Active</p>
                    <small>All systems operational</small>
                </div>
            `;
            document.getElementById('pageTitle').textContent = 'Admin Dashboard';
            break;
            
        case 'librarian':
            dashboardHTML = `
                <div class="stat-card" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                    <h3>On Hold</h3>
                    <p class="stat-value">${db.books.filter(b => b.status === 'reserved').length}</p>
                    <small>Reserved items</small>
                </div>
                <div class="stat-card" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                    <h3>Acquisitions</h3>
                    <p class="stat-value">${db.purchaseOrders.length}</p>
                    <small>Purchase orders</small>
                </div>
            `;
            document.getElementById('pageTitle').textContent = 'Librarian Dashboard';
            break;
            
        case 'staff':
            dashboardHTML = `
                <div class="stat-card" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
                    <h3>My Tasks</h3>
                    <p class="stat-value">${checkedOut}</p>
                    <small>Items to process</small>
                </div>
            `;
            document.getElementById('pageTitle').textContent = 'Staff Dashboard';
            break;
            
        case 'student':
            dashboardHTML = `
                <div class="stat-card" style="background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);">
                    <h3>My Borrowings</h3>
                    <p class="stat-value">${db.loans.filter(l => !l.returnDate).length}</p>
                    <small>Active loans</small>
                </div>
            `;
            document.getElementById('pageTitle').textContent = 'Student Dashboard';
            break;
    }
    
    // Add role-specific cards to dashboard
    if (dashboardHTML) {
        dashboardGrid.innerHTML += dashboardHTML;
    }
}

// ========== CSV IMPORT/EXPORT FUNCTIONS ==========
function downloadBooksSampleCSV() {
    const sampleData = [
        ['ISBN', 'Title', 'Author', 'Publisher', 'Category', 'Quantity', 'PublicationYear', 'Language', 'Description'],
        ['978-0-06-112008-4', 'To Kill a Mockingbird', 'Harper Lee', 'J. B. Lippincott', 'Fiction', '5', '1960', 'English', 'A gripping tale of racial injustice and childhood innocence'],
        ['978-0-451-52494-2', '1984', 'George Orwell', 'Secker & Warburg', 'Fiction', '3', '1949', 'English', 'Dystopian novel about totalitarianism'],
        ['978-0-14-028329-7', 'The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 'Fiction', '4', '1925', 'English', 'Jazz Age romance and social commentary'],
        ['978-0-262-03384-8', 'Introduction to Algorithms', 'Cormen et al', 'MIT Press', 'Technology', '2', '2009', 'English', 'Comprehensive computer science algorithms textbook'],
        ['978-3-16-148410-0', 'A Brief History of Time', 'Stephen Hawking', 'Bantam Dell', 'Science', '3', '1988', 'English', 'Popular science exploration of cosmology']
    ];

    let csvContent = sampleData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'books_sample.csv';
    link.click();
}

function downloadMembersSampleCSV() {
    const sampleData = [
        ['FirstName', 'LastName', 'Email', 'Phone', 'Category', 'Address', 'MembershipDays'],
        ['John', 'Doe', 'john.doe@example.com', '+1-555-0101', 'Student', '123 Main St, City', '365'],
        ['Jane', 'Smith', 'jane.smith@example.com', '+1-555-0102', 'Faculty', '456 Oak Ave, City', '365'],
        ['Robert', 'Johnson', 'robert.j@example.com', '+1-555-0103', 'Staff', '789 Pine Rd, City', '730'],
        ['Mary', 'Williams', 'mary.w@example.com', '+1-555-0104', 'Student', '321 Elm St, City', '365'],
        ['Michael', 'Brown', 'michael.b@example.com', '+1-555-0105', 'Guest', '654 Maple Dr, City', '30']
    ];

    let csvContent = sampleData.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'members_sample.csv';
    link.click();
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = [];
    
    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // Handle quoted CSV values
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                values.push(current.trim().replace(/"/g, ''));
                current = '';
            } else {
                current += char;
            }
        }
        values.push(current.trim().replace(/"/g, ''));
        
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index];
        });
        rows.push(row);
    }
    
    return rows;
}

function previewBooksCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const rows = parseCSV(event.target.result);
            let previewHTML = '<table><thead><tr>';
            
            const headers = ['ISBN', 'Title', 'Author', 'Category', 'Quantity'];
            headers.forEach(h => {
                previewHTML += `<th>${h}</th>`;
            });
            previewHTML += '</tr></thead><tbody>';
            
            rows.slice(0, 5).forEach(row => {
                previewHTML += '<tr>';
                headers.forEach(h => {
                    previewHTML += `<td>${row[h] || ''}</td>`;
                });
                previewHTML += '</tr>';
            });
            
            previewHTML += '</tbody></table>';
            if (rows.length > 5) previewHTML += `<p>... and ${rows.length - 5} more rows</p>`;
            
            document.getElementById('importBooksPreview').innerHTML = previewHTML;
        } catch (err) {
            alert('Error parsing CSV: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function previewMembersCSV(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const rows = parseCSV(event.target.result);
            let previewHTML = '<table><thead><tr>';
            
            const headers = ['FirstName', 'LastName', 'Email', 'Category'];
            headers.forEach(h => {
                previewHTML += `<th>${h}</th>`;
            });
            previewHTML += '</tr></thead><tbody>';
            
            rows.slice(0, 5).forEach(row => {
                previewHTML += '<tr>';
                headers.forEach(h => {
                    previewHTML += `<td>${row[h] || ''}</td>`;
                });
                previewHTML += '</tr>';
            });
            
            previewHTML += '</tbody></table>';
            if (rows.length > 5) previewHTML += `<p>... and ${rows.length - 5} more rows</p>`;
            
            document.getElementById('importMembersPreview').innerHTML = previewHTML;
        } catch (err) {
            alert('Error parsing CSV: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function importBooksFromCSV() {
    // Only admin and librarian can import books
    if (currentUserRole !== 'admin' && currentUserRole !== 'librarian') {
        alert('Only administrators and librarians can import books.');
        return;
    }
    const fileInput = document.getElementById('booksImportFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file first!');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const rows = parseCSV(event.target.result);
            let importedCount = 0;
            
            rows.forEach(row => {
                if (!row.Title) return;
                
                // Generate PDF link based on title for REB books
                let pdfLink = `https://example.com/${row.Title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
                
                // Provide direct links for known REB curriculum books
                const rebLinksMap = {
                    // Literary Works
                    'A Man of the People': 'https://www.pdfdrive.com/a-man-of-the-people-chinua-achebe-e174886.html',
                    'Julius Caesar': 'https://www.gutenberg.org/cache/epub/2263/pg2263-images.html',
                    'The Pearl': 'https://openlibrary.org/books/OL7262571M/The_Pearl',
                    'An Enemy of the People': 'https://www.gutenberg.org/cache/epub/2618/pg2618-images.html',
                    'Mine Boy': 'https://openlibrary.org/works/OL1797827W/Mine_Boy',
                    'Animal Farm': 'https://www.planetebook.com/free-ebooks/animal-farm.pdf',
                    'When the Sun Goes Down': 'https://archive.org/details/when-the-sun-goes-down-short-stories',
                    
                    // REB Primary Books - Official REB E-Learning Platform
                    'PRIMARY - P1 ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P1 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P1 SET': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P1 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P2 ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P2 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P2 SET': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P2 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P2 FRENCH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P3 ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P3 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P3 SET': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P3 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P3 FRENCH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 SET': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 CREATIVE ARTS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P4 FRENCH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 MATHEMATICS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 SET': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 CREATIVE ARTS': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 KINYARWANDA': 'https://elearning.reb.rw/course/index.php',
                    'PRIMARY - P5 FRENCH': 'https://elearning.reb.rw/course/index.php',
                    
                    // REB Nursery Books - Official REB E-Learning Platform
                    'NURSERY - NUMERACY': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - ENGLISH': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - PHYSICAL DEVELOPMENT AND HEALTH': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - DISCOVERY OF THE WORLD': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - CREATIVE ARTS AND CULTURE': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - SOCIAL AND EMOTIONAL DEVELOPMENT': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - IBIRIBWA': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - IBIDUKIKIJE KAMERE': 'https://elearning.reb.rw/course/index.php',
                    'NURSERY - IMAGO N\'IMIRIMO': 'https://elearning.reb.rw/course/index.php'
                };
                
                if (rebLinksMap[row.Title]) {
                    pdfLink = rebLinksMap[row.Title];
                } else if (row.Category === 'REB Curriculum' || row.Category === 'Primary' || row.Category === 'Nursery' || row.Category === 'Secondary') {
                    // Default to official REB E-Learning Platform for all REB books
                    pdfLink = 'https://elearning.reb.rw/course/index.php';
                }
                
                const book = {
                    id: db.generateId(),
                    isbn: row.ISBN || '',
                    title: row.Title,
                    author: row.Author || '',
                    publisher: row.Publisher || '',
                    category: row.Category || 'General',
                    quantity: parseInt(row.Quantity) || 1,
                    available: parseInt(row.Quantity) || 1,
                    pubYear: parseInt(row.PublicationYear) || new Date().getFullYear(),
                    language: row.Language || 'English',
                    description: row.Description || '',
                    pdfLink: pdfLink,
                    status: 'available',
                    dateAdded: new Date().toISOString()
                };
                
                db.books.push(book);
                importedCount++;
            });
            
            db.saveData('books', db.books);
            alert(`Successfully imported ${importedCount} books!`);
            document.getElementById('importBooksModal').classList.remove('show');
            fileInput.value = '';
            document.getElementById('importBooksPreview').innerHTML = '';
            loadDashboard();
            loadCatalog();
        } catch (err) {
            alert('Error importing books: ' + err.message);
        }
    };
    reader.readAsText(file);
}

function importMembersFromCSV() {
    const fileInput = document.getElementById('membersImportFile');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select a file first!');
        return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const rows = parseCSV(event.target.result);
            let importedCount = 0;
            
            rows.forEach(row => {
                if (!row.FirstName || !row.LastName) return;
                
                const joinDate = new Date();
                const membershipDays = parseInt(row.MembershipDays) || 365;
                const expiryDate = new Date(joinDate);
                expiryDate.setDate(expiryDate.getDate() + membershipDays);
                
                const member = {
                    id: db.generateId(),
                    firstName: row.FirstName,
                    lastName: row.LastName,
                    email: row.Email || '',
                    phone: row.Phone || '',
                    category: row.Category || 'Guest',
                    address: row.Address || '',
                    joinDate: joinDate.toISOString(),
                    expiryDate: expiryDate.toISOString(),
                    status: 'active',
                    itemsBorrowed: 0,
                    fines: 0
                };
                
                db.patrons.push(member);
                importedCount++;
            });
            
            db.saveData('patrons', db.patrons);
            alert(`Successfully imported ${importedCount} members!`);
            document.getElementById('importMembersModal').classList.remove('show');
            fileInput.value = '';
            document.getElementById('importMembersPreview').innerHTML = '';
            loadDashboard();
            if (document.getElementById('patronsTable')) {
                loadPatrons();
            }
        } catch (err) {
            alert('Error importing members: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// ========== BORROW REQUEST FUNCTIONS ==========
function openBorrowRequestModal(bookId) {
    const book = db.books.find(b => b.id === bookId);
    if (!book) {
        alert('Book not found!');
        return;
    }

    if (currentUserRole === 'student' || currentUserRole === 'staff') {
        document.getElementById('borrowBookTitle').textContent = book.title + ' by ' + book.author;
        document.getElementById('borrowerEmail').value = currentUser;
        document.getElementById('borrowerRole').value = currentUserRole;
        document.getElementById('borrowReason').value = '';
        document.getElementById('borrowRequestModal').classList.add('show');
    } else {
        alert('Only students and staff can request to borrow books.');
    }
}

function submitBorrowRequest() {
    const bookTitle = document.getElementById('borrowBookTitle').textContent;
    const reason = document.getElementById('borrowReason').value;
    
    // Find the book
    const bookMatch = bookTitle.split(' by ');
    const book = db.books.find(b => b.title === bookMatch[0].trim());
    
    if (!book) {
        alert('Book not found!');
        return;
    }

    // Create borrow request
    const request = {
        id: db.generateId(),
        bookId: book.id,
        requesterEmail: currentUser,
        requesterRole: currentUserRole,
        requesterName: AUTH_USERS[currentUser]?.name || currentUser,
        reason: reason,
        requestDate: new Date().toISOString(),
        status: 'pending'
    };

    db.borrowRequests.push(request);
    db.saveData('borrowRequests', db.borrowRequests);

    alert('Your borrow request has been submitted! The librarian will review it soon.');
    document.getElementById('borrowRequestModal').classList.remove('show');
    
    // Refresh OPAC if visible
    if (currentModule === 'opac') {
        filterOpac();
    }
}

function approveBorrowRequest(requestId) {
    const request = db.borrowRequests.find(r => r.id === requestId);
    if (!request) {
        alert('Request not found!');
        return;
    }

    const book = db.books.find(b => b.id === request.bookId);
    if (!book || book.available <= 0) {
        alert('This book is not available for checkout!');
        return;
    }

    // Create a patron if one doesn't exist for this user
    let patron = db.patrons.find(p => p.email === request.requesterEmail);
    if (!patron) {
        patron = {
            id: db.generateId(),
            firstName: request.requesterName.split(' ')[0] || 'User',
            lastName: request.requesterName.split(' ')[1] || request.requesterRole,
            email: request.requesterEmail,
            phone: '',
            category: request.requesterRole,
            address: '',
            joinDate: new Date().toISOString(),
            expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
            status: 'active',
            itemsBorrowed: 0,
            fines: 0
        };
        db.patrons.push(patron);
        db.saveData('patrons', db.patrons);
    }

    // Create loan
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + db.settings.checkoutDays);

    const loan = {
        id: db.generateId(),
        patronId: patron.id,
        bookId: book.id,
        checkoutDate: new Date().toISOString(),
        dueDate: dueDate.toISOString(),
        returnDate: null,
        renewCount: 0
    };

    db.loans.push(loan);
    book.available--;
    db.saveData('loans', db.loans);
    db.saveData('books', db.books);

    // Mark request as approved
    request.status = 'approved';
    db.saveData('borrowRequests', db.borrowRequests);

    alert(`✓ Borrow request approved! ${request.requesterName} can now collect the book.`);
    displayBorrowRequestsTable();
    displayLoansTable();
}

function denyBorrowRequest(requestId) {
    const reason = prompt('Please provide a reason for denying this request:');
    if (reason === null) return; // User cancelled

    const request = db.borrowRequests.find(r => r.id === requestId);
    if (!request) {
        alert('Request not found!');
        return;
    }

    request.status = 'denied';
    request.denialReason = reason;
    db.saveData('borrowRequests', db.borrowRequests);

    alert(`✗ Borrow request denied. Reason: ${reason}`);
    displayBorrowRequestsTable();
}

// ========== ALL BOOKS VIEW ==========
function loadAllBooks() {
    displayAllBooksTable(db.books);
}

function displayAllBooksTable(books) {
    const tbody = document.getElementById('allBooksTable');
    tbody.innerHTML = books.length > 0
        ? books.map(book => `
            <tr>
                <td>${book.isbn || 'N/A'}</td>
                <td><strong>${book.title}</strong></td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>${book.publisher || 'N/A'}</td>
                <td>${book.pubYear || 'N/A'}</td>
                <td><span class="availability-badge available">${book.available}</span></td>
                <td>${book.quantity}</td>
                <td>
                    ${book.pdfLink ? `<a href="${book.pdfLink}" target="_blank" class="btn-link">📖 Read</a>` : 'N/A'}
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="9" style="text-align: center; color: #7f8c8d;">No books in library</td></tr>';
}

function searchAllBooks(e) {
    const query = e.target.value.toLowerCase();
    const category = document.getElementById('booksCategoryFilter').value;

    let filtered = db.books.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        (book.isbn && book.isbn.includes(query))
    );

    if (category) {
        filtered = filtered.filter(book => book.category === category);
    }

    displayAllBooksTable(filtered);
}

function filterAllBooks() {
    const query = document.getElementById('booksSearch').value.toLowerCase();
    const category = document.getElementById('booksCategoryFilter').value;

    let filtered = db.books;

    if (query) {
        filtered = filtered.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            (book.isbn && book.isbn.includes(query))
        );
    }

    if (category) {
        filtered = filtered.filter(book => book.category === category);
    }

    displayAllBooksTable(filtered);
}

// ========== CATALOGING ==========
function loadCatalog() {
    displayCatalogTable(db.books);
}

function displayCatalogTable(books) {
    const tbody = document.getElementById('catalogTable');
    tbody.innerHTML = books.length > 0
        ? books.map(book => `
            <tr>
                <td>${book.isbn || 'N/A'}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td><span class="status ${book.status}">${book.status}</span></td>
                <td>${book.quantity}</td>
                <td>
                    <button class="btn-secondary" onclick="editBook('${book.id}')">Edit</button>
                    <button class="btn-secondary" onclick="deleteBook('${book.id}')">Delete</button>
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="7" style="text-align: center; color: #7f8c8d;">No books in catalog</td></tr>';
}

function openBookModal() {
    // Only admin and librarian can add/edit books
    if (currentUserRole !== 'admin' && currentUserRole !== 'librarian') {
        alert('Only administrators and librarians can manage books.');
        return;
    }
    selectedBook = null;
    document.getElementById('modalTitle').textContent = 'Add New Book';
    document.getElementById('bookForm').reset();
    document.getElementById('bookModal').classList.add('show');
}

function editBook(id) {
    // Only admin and librarian can edit books
    if (currentUserRole !== 'admin' && currentUserRole !== 'librarian') {
        alert('Only administrators and librarians can manage books.');
        return;
    }
    const book = db.books.find(b => b.id === id);
    if (!book) return;

    selectedBook = book;
    document.getElementById('modalTitle').textContent = 'Edit Book';
    document.getElementById('isbn').value = book.isbn || '';
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('publisher').value = book.publisher || '';
    document.getElementById('category').value = book.category;
    document.getElementById('quantity').value = book.quantity;
    document.getElementById('pubYear').value = book.pubYear || '';
    document.getElementById('language').value = book.language || 'English';
    document.getElementById('description').value = book.description || '';
    document.getElementById('pdfLink').value = book.pdfLink || '';

    document.getElementById('bookModal').classList.add('show');
}

function saveBook(e) {
    e.preventDefault();

    const bookData = {
        isbn: document.getElementById('isbn').value,
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        publisher: document.getElementById('publisher').value,
        category: document.getElementById('category').value,
        quantity: parseInt(document.getElementById('quantity').value),
        pubYear: document.getElementById('pubYear').value,
        language: document.getElementById('language').value,
        description: document.getElementById('description').value,
        pdfLink: document.getElementById('pdfLink').value,
        status: 'available'
    };

    if (selectedBook) {
        // Update existing book
        Object.assign(selectedBook, bookData);
    } else {
        // Add new book
        const newBook = {
            id: db.generateId(),
            ...bookData,
            available: parseInt(document.getElementById('quantity').value),
            dateAdded: new Date().toISOString()
        };
        db.books.push(newBook);
    }

    db.saveData('books', db.books);
    document.getElementById('bookModal').classList.remove('show');
    document.getElementById('bookForm').reset();
    loadCatalog();
    loadDashboard();
    alert('Book saved successfully!');
}

function deleteBook(id) {
    // Only admin and librarian can delete books
    if (currentUserRole !== 'admin' && currentUserRole !== 'librarian') {
        alert('Only administrators and librarians can manage books.');
        return;
    }
    if (confirm('Are you sure you want to delete this book?')) {
        db.books = db.books.filter(b => b.id !== id);
        db.saveData('books', db.books);
        loadCatalog();
        loadDashboard();
    }
}

function searchCatalog(e) {
    const query = e.target.value.toLowerCase();
    const filtered = db.books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(query)
    );
    displayCatalogTable(filtered);
}

function filterCatalog() {
    const status = document.getElementById('statusFilter').value;
    const filtered = status 
        ? db.books.filter(b => b.status === status)
        : db.books;
    displayCatalogTable(filtered);
}

// ========== CIRCULATION ==========
function loadCirculation() {
    displayLoansTable();
    if (currentUserRole === 'admin' || currentUserRole === 'librarian') {
        displayBorrowRequestsTable();
    }
}

function displayLoansTable() {
    const tbody = document.getElementById('loansTable');
    tbody.innerHTML = db.loans.length > 0
        ? db.loans.map(loan => {
            const book = db.books.find(b => b.id === loan.bookId);
            const patron = db.patrons.find(p => p.id === loan.patronId);
            const status = loan.returnDate ? 'Returned' : 'Active';
            
            return `
                <tr>
                    <td>${patron ? patron.firstName + ' ' + patron.lastName : 'Unknown'}</td>
                    <td>${book ? book.title : 'Unknown'}</td>
                    <td>${new Date(loan.checkoutDate).toLocaleDateString()}</td>
                    <td>${new Date(loan.dueDate).toLocaleDateString()}</td>
                    <td><span class="status ${status.toLowerCase()}">${status}</span></td>
                    <td>
                        ${!loan.returnDate ? `<button class="btn-secondary" onclick="viewLoanDetails('${loan.id}')">Details</button>` : 'N/A'}
                    </td>
                </tr>
            `;
        }).join('')
        : '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">No loans</td></tr>';
}

function displayBorrowRequestsTable() {
    const tbody = document.getElementById('borrowRequestsTable');
    if (!tbody) return;
    
    const pendingRequests = db.borrowRequests.filter(r => r.status === 'pending');
    
    tbody.innerHTML = pendingRequests.length > 0
        ? pendingRequests.map(request => {
            const book = db.books.find(b => b.id === request.bookId);
            return `
                <tr>
                    <td>${request.requesterName}</td>
                    <td><span class="role-badge role-${request.requesterRole}">${request.requesterRole}</span></td>
                    <td>${book ? book.title : 'Unknown Book'}</td>
                    <td>${new Date(request.requestDate).toLocaleDateString()}</td>
                    <td><span class="status pending">${request.status}</span></td>
                    <td>
                        <button class="btn-primary" onclick="approveBorrowRequest('${request.id}')" style="padding: 5px 10px; font-size: 0.85rem;">✓ Approve</button>
                        <button class="btn-danger" onclick="denyBorrowRequest('${request.id}')" style="padding: 5px 10px; font-size: 0.85rem;">✗ Deny</button>
                    </td>
                </tr>
            `;
        }).join('')
        : '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">No pending requests</td></tr>';
}

function searchPatron() {
    try {
        const query = document.getElementById('patronId').value.trim().toLowerCase();
        if (!query) {
            alert('Please enter a patron ID, email, or name');
            return;
        }

        // Search by ID, email, first name, or last name
        const patron = db.patrons.find(p => {
            const firstName = p.firstName ? p.firstName.toLowerCase() : '';
            const lastName = p.lastName ? p.lastName.toLowerCase() : '';
            const email = p.email ? p.email.toLowerCase() : '';
            const fullName = `${firstName} ${lastName}`;
            
            return (
                p.id.toLowerCase().includes(query) || 
                email === query ||
                firstName.includes(query) ||
                lastName.includes(query) ||
                fullName.includes(query)
            );
        });

        const patronInfo = document.getElementById('patronInfo');
        if (patron) {
            selectedPatron = patron;
            const active = db.loans.filter(l => l.patronId === patron.id && !l.returnDate).length;
            patronInfo.innerHTML = `
                <strong>${patron.firstName} ${patron.lastName}</strong><br>
                Email: ${patron.email}<br>
                Category: ${patron.category}<br>
                Active Loans: ${active}/${db.settings.maxItems}
            `;
            patronInfo.style.display = 'block';
            updateCirculationButtons();
        } else {
            alert('Patron not found. Try searching by:\n- Full name (e.g., "John Doe")\n- First or last name\n- Email address\n- Patron ID');
            patronInfo.style.display = 'none';
            selectedPatron = null;
            updateCirculationButtons();
        }
    } catch(error) {
        console.error('Error searching patron:', error);
        alert('Error searching patron: ' + error.message);
    }
}

function searchBook() {
    const query = document.getElementById('bookIdCirc').value.trim();
    if (!query) {
        alert('Please enter an ISBN or title');
        return;
    }

    const book = db.books.find(b => 
        b.isbn === query || b.title.toLowerCase().includes(query.toLowerCase())
    );

    const bookInfo = document.getElementById('bookInfo');
    if (book) {
        selectedBook = book;
        bookInfo.innerHTML = `
            <strong>${book.title}</strong><br>
            Author: ${book.author}<br>
            ISBN: ${book.isbn}<br>
            Status: <span class="status ${book.status}">${book.status}</span>
        `;
        bookInfo.style.display = 'block';
        updateCirculationButtons();
    } else {
        alert('Book not found');
        bookInfo.style.display = 'none';
        selectedBook = null;
    }
}

function updateCirculationButtons() {
    const hasPatron = selectedPatron !== null;
    const hasBook = selectedBook !== null;
    
    document.getElementById('checkoutBtn').disabled = !(hasPatron && hasBook && selectedBook.status === 'available');
    document.getElementById('checkinBtn').disabled = !(hasPatron && hasBook);
    document.getElementById('renewBtn').disabled = !(hasPatron && hasBook);
    document.getElementById('batchCheckoutBtn').disabled = !hasPatron;
}

function performCheckout() {
    if (!selectedPatron || !selectedBook) return;

    const activeLoanCount = db.loans.filter(l => 
        l.patronId === selectedPatron.id && !l.returnDate
    ).length;

    if (activeLoanCount >= db.settings.maxItems) {
        alert(`Patron has reached maximum item limit (${db.settings.maxItems})`);
        return;
    }

    const checkoutDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + db.settings.checkoutDays);

    const loan = {
        id: db.generateId(),
        patronId: selectedPatron.id,
        bookId: selectedBook.id,
        checkoutDate: checkoutDate.toISOString(),
        dueDate: dueDate.toISOString(),
        returnDate: null,
        renewCount: 0
    };

    db.loans.push(loan);
    selectedBook.status = 'checked-out';
    selectedBook.quantity--;

    db.saveData('loans', db.loans);
    db.saveData('books', db.books);

    alert(`Book checked out successfully. Due date: ${dueDate.toLocaleDateString()}`);
    resetCirculation();
}

function performCheckin() {
    if (!selectedPatron || !selectedBook) return;

    const loan = db.loans.find(l => 
        l.patronId === selectedPatron.id && 
        l.bookId === selectedBook.id && 
        !l.returnDate
    );

    if (!loan) {
        alert('No active loan found for this book');
        return;
    }

    const returnDate = new Date();
    const dueDate = new Date(loan.dueDate);
    const daysOverdue = Math.max(0, Math.floor((returnDate - dueDate) / (1000 * 60 * 60 * 24)));
    const fines = daysOverdue * db.settings.finePerDay;

    loan.returnDate = returnDate.toISOString();
    selectedBook.status = 'available';
    selectedBook.quantity++;

    db.saveData('loans', db.loans);
    db.saveData('books', db.books);

    const message = fines > 0 
        ? `Book returned. Fine due: $${fines.toFixed(2)} (${daysOverdue} days overdue)`
        : 'Book returned successfully!';

    alert(message);
    resetCirculation();
}

function renewLoan() {
    if (!selectedPatron || !selectedBook) return;

    const loan = db.loans.find(l => 
        l.patronId === selectedPatron.id && 
        l.bookId === selectedBook.id && 
        !l.returnDate
    );

    if (!loan) {
        alert('No active loan found');
        return;
    }

    if (loan.renewCount >= 3) {
        alert('Maximum renewals reached (3)');
        return;
    }

    const newDueDate = new Date(loan.dueDate);
    newDueDate.setDate(newDueDate.getDate() + db.settings.checkoutDays);

    loan.dueDate = newDueDate.toISOString();
    loan.renewCount++;

    db.saveData('loans', db.loans);
    alert(`Loan renewed. New due date: ${newDueDate.toLocaleDateString()}`);
    resetCirculation();
}

function resetCirculation() {
    document.getElementById('patronId').value = '';
    document.getElementById('bookIdCirc').value = '';
    document.getElementById('patronInfo').style.display = 'none';
    document.getElementById('bookInfo').style.display = 'none';
    updateCirculationButtons();
    displayLoansTable();
    loadDashboard();
}

// ========== BATCH CHECKOUT FUNCTIONS ==========
let batchCheckoutBooks = [];

function openBatchCheckoutModal() {
    if (!selectedPatron) {
        alert('Please search for a patron first');
        return;
    }

    batchCheckoutBooks = [];
    const activeLoanCount = db.loans.filter(l => l.patronId === selectedPatron.id && !l.returnDate).length;
    const remainingSlots = db.settings.maxItems - activeLoanCount;

    if (remainingSlots <= 0) {
        alert(`Patron has reached maximum item limit (${db.settings.maxItems})`);
        return;
    }

    document.getElementById('batchPatronInfo').innerHTML = `
        <p><strong>${selectedPatron.firstName} ${selectedPatron.lastName}</strong> - ${selectedPatron.email}</p>
        <p>Can borrow up to <strong>${remainingSlots}</strong> more book(s)</p>
    `;

    document.getElementById('maxBooksAllowed').textContent = remainingSlots;
    document.getElementById('selectedBooksCount').textContent = '0';
    document.getElementById('selectedBooksTable').innerHTML = '';
    document.getElementById('batchCheckoutModal').classList.add('show');
    updateCheckoutInfo();
}

function closeBatchCheckoutModal() {
    document.getElementById('batchCheckoutModal').classList.remove('show');
    batchCheckoutBooks = [];
}

function searchBooksForBatch() {
    try {
        const query = document.getElementById('batchBookSearch').value.toLowerCase().trim();
        if (!query || query.length < 2) {
            alert('Please enter at least 2 characters to search');
            return;
        }

        const activeLoanCount = db.loans.filter(l => l.patronId === selectedPatron.id && !l.returnDate).length;
        const remainingSlots = db.settings.maxItems - activeLoanCount;

        const results = db.books.filter(book => {
            if (batchCheckoutBooks.some(b => b.id === book.id)) return false; // Skip already selected
            if (book.available <= 0) return false; // Skip if not available
            
            const title = book.title ? book.title.toLowerCase() : '';
            const author = book.author ? book.author.toLowerCase() : '';
            const isbn = book.isbn ? book.isbn.toLowerCase() : '';
            return title.includes(query) || author.includes(query) || isbn.includes(query);
        }).slice(0, 15); // Show max 15 results

        const resultsDiv = document.getElementById('batchBookResults');
        if (results.length === 0) {
            resultsDiv.innerHTML = '<div style="padding: 15px; text-align: center; color: #7f8c8d;">No available books found</div>';
            return;
        }

        resultsDiv.innerHTML = results.map(book => `
            <div style="padding: 12px; border-bottom: 1px solid #ecf0f1; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex: 1;">
                    <strong>${book.title}</strong><br>
                    <small style="color: #7f8c8d;">${book.author} (${book.isbn || 'No ISBN'})</small>
                </div>
                <button class="btn-secondary" onclick="addBookToBatch('${book.id}')" style="padding: 6px 12px;">+ Add</button>
            </div>
        `).join('');
    } catch(error) {
        console.error('Error searching books:', error);
        alert('Error searching books: ' + error.message);
    }
}

function addBookToBatch(bookId) {
    try {
        const activeLoanCount = db.loans.filter(l => l.patronId === selectedPatron.id && !l.returnDate).length;
        const remainingSlots = db.settings.maxItems - activeLoanCount;

        if (batchCheckoutBooks.length >= remainingSlots) {
            alert(`Cannot add more books. Patron can only borrow ${remainingSlots} more item(s)`);
            return;
        }

        if (batchCheckoutBooks.some(b => b.id === bookId)) {
            alert('This book is already selected');
            return;
        }

        const book = db.books.find(b => b.id === bookId);
        if (!book || book.available <= 0) {
            alert('Book is no longer available');
            return;
        }

        batchCheckoutBooks.push(book);
        updateBatchCheckoutUI();
        document.getElementById('batchBookSearch').value = '';
        document.getElementById('batchBookResults').innerHTML = '';
        document.getElementById('batchBookSearch').focus();
    } catch(error) {
        console.error('Error adding book to batch:', error);
        alert('Error adding book: ' + error.message);
    }
}

function removeBookFromBatch(bookId) {
    batchCheckoutBooks = batchCheckoutBooks.filter(b => b.id !== bookId);
    updateBatchCheckoutUI();
}

function updateBatchCheckoutUI() {
    document.getElementById('selectedBooksCount').textContent = batchCheckoutBooks.length;
    
    const tbody = document.getElementById('selectedBooksTable');
    if (batchCheckoutBooks.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #7f8c8d;">No books selected yet</td></tr>';
        return;
    }

    tbody.innerHTML = batchCheckoutBooks.map((book, index) => `
        <tr>
            <td>${book.isbn || 'N/A'}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td><button class="btn-secondary delete" onclick="removeBookFromBatch('${book.id}')" style="padding: 4px 8px;">Remove</button></td>
        </tr>
    `).join('');

    updateCheckoutInfo();
}

function updateCheckoutInfo() {
    const daysCheckout = db.settings.checkoutDays;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + daysCheckout);
    
    document.getElementById('checkoutInfoText').innerHTML = `
        <strong>${batchCheckoutBooks.length}</strong> book(s) will be checked out<br>
        <strong>Due Date:</strong> ${dueDate.toLocaleDateString()}<br>
        <strong>Checkout Duration:</strong> ${daysCheckout} days
    `;
}

function confirmBatchCheckout() {
    try {
        if (!selectedPatron || batchCheckoutBooks.length === 0) {
            alert('Please select at least one book');
            return;
        }

        const activeLoanCount = db.loans.filter(l => l.patronId === selectedPatron.id && !l.returnDate).length;
        const remainingSlots = db.settings.maxItems - activeLoanCount;

        if (batchCheckoutBooks.length > remainingSlots) {
            alert(`Cannot checkout ${batchCheckoutBooks.length} books. Patron can only borrow ${remainingSlots} more item(s)`);
            return;
        }

        if (!confirm(`Checkout ${batchCheckoutBooks.length} book(s) to ${selectedPatron.firstName} ${selectedPatron.lastName}?`)) {
            return;
        }

        const checkoutDate = new Date();
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + db.settings.checkoutDays);

        let successCount = 0;
        const failedBooks = [];

        batchCheckoutBooks.forEach(book => {
            try {
                const loan = {
                    id: db.generateId(),
                    patronId: selectedPatron.id,
                    bookId: book.id,
                    checkoutDate: checkoutDate.toISOString(),
                    dueDate: dueDate.toISOString(),
                    returnDate: null,
                    renewCount: 0
                };

                db.loans.push(loan);
                book.available = Math.max(0, (book.available || 1) - 1);
                successCount++;
            } catch(err) {
                failedBooks.push(book.title);
                console.error('Error checking out book:', book, err);
            }
        });

        db.saveData('loans', db.loans);
        db.saveData('books', db.books);
        updateSyncData();

        let message = `✅ Successfully checked out ${successCount} book(s)!\nDue date: ${dueDate.toLocaleDateString()}`;
        if (failedBooks.length > 0) {
            message += `\n\n❌ Failed to checkout:\n${failedBooks.join('\n')}`;
        }

        alert(message);
        closeBatchCheckoutModal();
        resetCirculation();
    } catch(error) {
        console.error('Error in batch checkout:', error);
        alert('Error during checkout: ' + error.message);
    }
}

// ========== PATRONS ==========

function loadPatrons() {
    displayPatronsTable(db.patrons);
}

function displayPatronsTable(patrons) {
    const tbody = document.getElementById('patronsTable');
    tbody.innerHTML = patrons.length > 0
        ? patrons.map(patron => {
            const borrowedCount = db.loans.filter(l => 
                l.patronId === patron.id && !l.returnDate
            ).length;
            const finesAmount = calculateFines(patron.id);

            return `
                <tr>
                    <td>${patron.id.substr(0, 8)}</td>
                    <td>${patron.firstName} ${patron.lastName}</td>
                    <td>${patron.email}</td>
                    <td>${patron.category}</td>
                    <td>
                        <span class="status available">${patron.status}</span>
                    </td>
                    <td>${borrowedCount}</td>
                    <td>$${finesAmount.toFixed(2)}</td>
                    <td>
                        <button class="btn-secondary" onclick="editPatron('${patron.id}')">Edit</button>
                        <button class="btn-secondary" onclick="deletePatron('${patron.id}')">Delete</button>
                    </td>
                </tr>
            `;
        }).join('')
        : '<tr><td colspan="8" style="text-align: center; color: #7f8c8d;">No patrons registered</td></tr>';
}

function openPatronModal() {
    selectedPatron = null;
    document.getElementById('patronModalTitle').textContent = 'Register New Patron';
    document.getElementById('patronForm').reset();
    document.getElementById('patronModal').classList.add('show');
}

function editPatron(id) {
    const patron = db.patrons.find(p => p.id === id);
    if (!patron) return;

    selectedPatron = patron;
    document.getElementById('patronModalTitle').textContent = 'Edit Patron';
    document.getElementById('patronFirstName').value = patron.firstName;
    document.getElementById('patronLastName').value = patron.lastName;
    document.getElementById('patronEmail').value = patron.email;
    document.getElementById('patronPhone').value = patron.phone || '';
    document.getElementById('patronCategory').value = patron.category;
    document.getElementById('patronAddress').value = patron.address || '';

    document.getElementById('patronModal').classList.add('show');
}

function savePatron(e) {
    e.preventDefault();

    const patronData = {
        firstName: document.getElementById('patronFirstName').value,
        lastName: document.getElementById('patronLastName').value,
        email: document.getElementById('patronEmail').value,
        phone: document.getElementById('patronPhone').value,
        category: document.getElementById('patronCategory').value,
        address: document.getElementById('patronAddress').value,
        status: 'active'
    };

    if (selectedPatron) {
        Object.assign(selectedPatron, patronData);
    } else {
        const newPatron = {
            id: db.generateId(),
            ...patronData,
            membershipDate: new Date().toISOString(),
            membershipExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        };
        db.patrons.push(newPatron);
    }

    db.saveData('patrons', db.patrons);
    document.getElementById('patronModal').classList.remove('show');
    document.getElementById('patronForm').reset();
    loadPatrons();
    loadDashboard();
    alert('Patron saved successfully!');
}

function deletePatron(id) {
    if (confirm('Are you sure you want to delete this patron?')) {
        db.patrons = db.patrons.filter(p => p.id !== id);
        db.saveData('patrons', db.patrons);
        loadPatrons();
        loadDashboard();
    }
}

function searchPatrons(e) {
    const query = e.target.value.toLowerCase();
    const filtered = db.patrons.filter(patron =>
        patron.firstName.toLowerCase().includes(query) ||
        patron.lastName.toLowerCase().includes(query) ||
        patron.email.toLowerCase().includes(query)
    );
    displayPatronsTable(filtered);
}

function filterPatrons() {
    const category = document.getElementById('patronCategoryFilter').value;
    const filtered = category
        ? db.patrons.filter(p => p.category === category)
        : db.patrons;
    displayPatronsTable(filtered);
}

function calculateFines(patronId) {
    const today = new Date();
    const overdueLoans = db.loans.filter(l => {
        if (l.returnDate || l.patronId !== patronId) return false;
        const dueDate = new Date(l.dueDate);
        return dueDate < today;
    });

    return overdueLoans.reduce((total, loan) => {
        const daysOverdue = Math.floor((today - new Date(loan.dueDate)) / (1000 * 60 * 60 * 24));
        return total + (daysOverdue * db.settings.finePerDay);
    }, 0);
}

// ========== OPAC ==========
function searchOpac() {
    const query = document.getElementById('opacSearch').value.toLowerCase();
    const category = document.getElementById('opacCategory').value;
    const language = document.getElementById('opacLanguage').value;

    let results = db.books;

    if (query) {
        results = results.filter(book =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.isbn.includes(query)
        );
    }

    if (category) {
        results = results.filter(book => book.category === category);
    }

    if (language) {
        results = results.filter(book => book.language === language);
    }

    displayOpacResults(results);
}

function filterOpac() {
    searchOpac();
}

function displayOpacResults(books) {
    const resultsDiv = document.getElementById('opacResults');
    resultsDiv.innerHTML = books.length > 0
        ? books.map(book => `
            <div class="book-result">
                <h4>${book.title}</h4>
                <div class="book-author">By ${book.author}</div>
                <div class="book-isbn">ISBN: ${book.isbn || 'N/A'}</div>
                <div class="book-availability">
                    <span class="availability ${book.status}">${book.status === 'available' ? '✓ Available' : '✗ Not Available'}</span>
                </div>
                <small>${book.description || 'No description available'}</small><br>
                <div style="margin-top: 10px; display: flex; gap: 10px; flex-wrap: wrap;">
                    ${book.pdfLink ? 
                        `<a href="${book.pdfLink}" target="_blank" class="btn-primary" style="text-decoration: none; display: inline-block; padding: 8px 15px; border-radius: 4px; background: #3498db; color: white; border: none; cursor: pointer; text-align: center;">📖 Read Online</a>` 
                        : ''
                    }
                    ${book.status === 'available' ? 
                        (currentUserRole === 'student' || currentUserRole === 'staff' 
                            ? `<button class="btn-primary" onclick="openBorrowRequestModal('${book.id}')">📤 Request to Borrow</button>` 
                            : `<button class="btn-secondary" onclick="alert('Login as a student or staff to request books')" disabled>Request</button>`
                        ) 
                        : `<button class="btn-danger" disabled>Not Available</button>`
                    }
                </div>
            </div>
        `).join('')
        : '<p style="grid-column: 1/-1; text-align: center; color: #7f8c8d;">No results found</p>';
}

// ========== ACQUISITIONS ==========
function loadAcquisitions() {
    const totalSpent = db.purchaseOrders.reduce((sum, po) => sum + po.amount, 0);
    const budget = parseFloat(document.getElementById('annualBudget').value) || 0;
    
    document.getElementById('budgetSpent').textContent = `$${totalSpent.toFixed(2)}`;
    document.getElementById('budgetRemaining').textContent = `$${(budget - totalSpent).toFixed(2)}`;

    displayPosTable();
}

function displayPosTable() {
    const tbody = document.getElementById('posTable');
    tbody.innerHTML = db.purchaseOrders.length > 0
        ? db.purchaseOrders.map(po => `
            <tr>
                <td>${po.id.substr(0, 8)}</td>
                <td>${po.vendor}</td>
                <td>$${po.amount.toFixed(2)}</td>
                <td><span class="status available">${po.status}</span></td>
                <td>${new Date(po.date).toLocaleDateString()}</td>
                <td>
                    <button class="btn-secondary" onclick="alert('PO Details: ${po.items}')">Details</button>
                    <button class="btn-secondary" onclick="deletePO('${po.id}')">Delete</button>
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="6" style="text-align: center; color: #7f8c8d;">No purchase orders</td></tr>';
}

function openPoModal() {
    document.getElementById('poForm').reset();
    document.getElementById('poModal').classList.add('show');
}

function createPO(e) {
    e.preventDefault();

    const po = {
        id: db.generateId(),
        vendor: document.getElementById('vendor').value,
        vendorEmail: document.getElementById('vendorEmail').value,
        items: document.getElementById('poItems').value,
        amount: parseFloat(document.getElementById('poAmount').value),
        status: 'pending',
        date: new Date().toISOString()
    };

    db.purchaseOrders.push(po);
    db.saveData('purchaseOrders', db.purchaseOrders);
    document.getElementById('poModal').classList.remove('show');
    document.getElementById('poForm').reset();
    loadAcquisitions();
    alert('Purchase Order created successfully!');
}

function deletePO(id) {
    if (confirm('Delete this PO?')) {
        db.purchaseOrders = db.purchaseOrders.filter(po => po.id !== id);
        db.saveData('purchaseOrders', db.purchaseOrders);
        loadAcquisitions();
    }
}

// ========== SERIALS ==========
function loadSerials() {
    displaySerialsTable(db.serials);
}

function displaySerialsTable(serials) {
    const tbody = document.getElementById('serialsTable');
    tbody.innerHTML = serials.length > 0
        ? serials.map(serial => `
            <tr>
                <td>${serial.title}</td>
                <td>${serial.type}</td>
                <td>${serial.vendor || 'N/A'}</td>
                <td>${serial.currentIssue || 'N/A'}</td>
                <td>${serial.frequency}</td>
                <td><span class="status available">Active</span></td>
                <td>
                    <button class="btn-secondary" onclick="deleteSerial('${serial.id}')">Delete</button>
                </td>
            </tr>
        `).join('')
        : '<tr><td colspan="7" style="text-align: center; color: #7f8c8d;">No serials</td></tr>';
}

function openSerialModal() {
    document.getElementById('serialForm').reset();
    document.getElementById('serialModal').classList.add('show');
}

function addSerial(e) {
    e.preventDefault();

    const serial = {
        id: db.generateId(),
        title: document.getElementById('serialTitle').value,
        type: document.getElementById('serialType').value,
        vendor: document.getElementById('serialVendor').value,
        frequency: document.getElementById('serialFrequency').value,
        notes: document.getElementById('serialNotes').value,
        currentIssue: 1,
        dateAdded: new Date().toISOString()
    };

    db.serials.push(serial);
    db.saveData('serials', db.serials);
    document.getElementById('serialModal').classList.remove('show');
    document.getElementById('serialForm').reset();
    loadSerials();
    alert('Serial added successfully!');
}

function deleteSerial(id) {
    if (confirm('Delete this serial?')) {
        db.serials = db.serials.filter(s => s.id !== id);
        db.saveData('serials', db.serials);
        loadSerials();
    }
}

// ========== REPORTS ==========
function generateCirculationReport() {
    const loans = db.loans;
    const totalCheckouts = loans.length;
    const totalReturns = loans.filter(l => l.returnDate).length;
    const activeLoans = loans.filter(l => !l.returnDate).length;

    showReport('Circulation Report', `
        Total Checkouts: ${totalCheckouts}
        Total Returns: ${totalReturns}
        Active Loans: ${activeLoans}
        Checkout Success Rate: ${((totalReturns / totalCheckouts) * 100).toFixed(1)}%
    `);
}

function generateUsageReport() {
    const bookUsage = db.books.map(book => ({
        title: book.title,
        category: book.category,
        loaned: db.loans.filter(l => l.bookId === book.id).length
    })).sort((a, b) => b.loaned - a.loaned).slice(0, 10);

    showReport('Collection Usage Report', bookUsage.map(b =>
        `${b.title} (${b.category}): ${b.loaned} times`
    ).join('\n'));
}

function generatePatronReport() {
    const patronActivity = db.patrons.map(patron => ({
        name: `${patron.firstName} ${patron.lastName}`,
        borrowed: db.loans.filter(l => l.patronId === patron.id).length,
        active: db.loans.filter(l => l.patronId === patron.id && !l.returnDate).length
    })).sort((a, b) => b.borrowed - a.borrowed).slice(0, 10);

    showReport('Patron Activity Report', patronActivity.map(p =>
        `${p.name}: ${p.borrowed} total (${p.active} active)`
    ).join('\n'));
}

function generateFinancialReport() {
    const totalSpent = db.purchaseOrders.reduce((sum, po) => sum + po.amount, 0);
    const budget = parseFloat(document.getElementById('annualBudget').value) || 0;

    showReport('Financial Report', `
        Annual Budget: $${budget.toFixed(2)}
        Total Spent: $${totalSpent.toFixed(2)}
        Remaining: $${(budget - totalSpent).toFixed(2)}
        Budget Utilization: ${budget > 0 ? ((totalSpent / budget) * 100).toFixed(1) : 0}%
    `);
}

function showReport(title, content) {
    document.getElementById('reportResults').style.display = 'block';
    const reportTable = document.getElementById('reportTable');
    reportTable.innerHTML = `<tr><td>${content.toString().replace(/\n/g, '<br>')}</td></tr>`;
    alert(title + '\n\n' + content);
}

function printReport() {
    window.print();
}

// ========== SETTINGS ==========
function loadSettings() {
    document.getElementById('libName').value = db.settings.libraryName;
    document.getElementById('checkoutDays').value = db.settings.checkoutDays;
    document.getElementById('finePerDay').value = db.settings.finePerDay;
    document.getElementById('maxItems').value = db.settings.maxItems;
    document.getElementById('emailNotifications').checked = db.settings.emailNotifications;
    document.getElementById('smsNotifications').checked = db.settings.smsNotifications;
    document.getElementById('reminderDays').value = db.settings.reminderDays;
    document.getElementById('language').value = db.settings.language;
}

function saveSettings() {
    db.settings.libraryName = document.getElementById('libName').value;
    db.settings.checkoutDays = parseInt(document.getElementById('checkoutDays').value);
    db.settings.finePerDay = parseFloat(document.getElementById('finePerDay').value);
    db.settings.maxItems = parseInt(document.getElementById('maxItems').value);
    db.settings.emailNotifications = document.getElementById('emailNotifications').checked;
    db.settings.smsNotifications = document.getElementById('smsNotifications').checked;
    db.settings.reminderDays = parseInt(document.getElementById('reminderDays').value);
    db.settings.language = document.getElementById('language').value;

    db.saveData('settings', db.settings);
    alert('Settings saved successfully!');
}

function resetToDefaults() {
    if (confirm('Reset all settings to defaults?')) {
        db.settings = db.getDefaultSettings();
        db.saveData('settings', db.settings);
        loadSettings();
        alert('Settings reset to defaults!');
    }
}

// ========== DATA MANAGEMENT ==========
function exportData() {
    const data = {
        books: db.books,
        patrons: db.patrons,
        loans: db.loans,
        purchaseOrders: db.purchaseOrders,
        serials: db.serials,
        settings: db.settings,
        exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `library_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
}

function importData(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        try {
            const data = JSON.parse(event.target.result);
            db.books = data.books || [];
            db.patrons = data.patrons || [];
            db.loans = data.loans || [];
            db.purchaseOrders = data.purchaseOrders || [];
            db.serials = data.serials || [];
            if (data.settings) db.settings = data.settings;

            db.saveData('books', db.books);
            db.saveData('patrons', db.patrons);
            db.saveData('loans', db.loans);
            db.saveData('purchaseOrders', db.purchaseOrders);
            db.saveData('serials', db.serials);
            db.saveData('settings', db.settings);

            alert('Data imported successfully!');
            loadDashboard();
        } catch (err) {
            alert('Error importing data: ' + err.message);
        }
    };
    reader.readAsText(file);
}

// ========== GLOBAL SEARCH ==========
function performGlobalSearch(e) {
    const query = e.target.value.toLowerCase();
    if (!query) return;

    const results = {
        books: db.books.filter(b => b.title.toLowerCase().includes(query)),
        patrons: db.patrons.filter(p => `${p.firstName} ${p.lastName}`.toLowerCase().includes(query)),
        serials: db.serials.filter(s => s.title.toLowerCase().includes(query))
    };

    const totalResults = results.books.length + results.patrons.length + results.serials.length;
    alert(`Found ${totalResults} results:\n\nBooks: ${results.books.length}\nPatrons: ${results.patrons.length}\nSerials: ${results.serials.length}`);
}

// ========== UTILITY FUNCTIONS ==========
function viewLoanDetails(loanId) {
    const loan = db.loans.find(l => l.id === loanId);
    if (loan) {
        const book = db.books.find(b => b.id === loan.bookId);
        const patron = db.patrons.find(p => p.id === loan.patronId);
        alert(`
            Book: ${book.title}
            Patron: ${patron.firstName} ${patron.lastName}
            Checked Out: ${new Date(loan.checkoutDate).toLocaleDateString()}
            Due Date: ${new Date(loan.dueDate).toLocaleDateString()}
            Renewals: ${loan.renewCount}
        `);
    }
}

// ========== CHAT FUNCTIONALITY ==========
function loadChat() {
    document.getElementById('pageTitle').innerText = 'Library Chat';
    loadOnlineUsers();
    loadChatMessages();
    
    // Setup send button
    document.getElementById('sendChatBtn').onclick = sendChatMessage;
    document.getElementById('chatMessageInput').onkeypress = (e) => {
        if (e.key === 'Enter') sendChatMessage();
    };
}

function loadOnlineUsers() {
    const usersList = document.getElementById('onlineUsers');
    const users = [
        { id: 1, name: 'NSHIMIYIMANA Yves', role: 'Librarian', status: 'online' },
        { id: 2, name: 'Library Staff', role: 'Staff', status: 'online' },
        ...db.patrons.map(p => ({ 
            id: p.id, 
            name: `${p.firstName} ${p.lastName}`, 
            role: p.category,
            status: Math.random() > 0.5 ? 'online' : 'offline'
        }))
    ];
    
    usersList.innerHTML = users.map(user => `
        <div class="user-item" style="padding: 10px; margin: 5px 0; background: #f0f8ff; border-radius: 5px; cursor: pointer;" onclick="startPrivateChat('${user.name}')">
            <div style="font-weight: bold;">${user.name}</div>
            <div style="font-size: 12px; color: #666;">
                <span style="color: ${user.status === 'online' ? '#27ae60' : '#95a5a6'};">● ${user.status}</span> - ${user.role}
            </div>
        </div>
    `).join('');
}

function loadChatMessages() {
    const messagesDiv = document.getElementById('chatMessages');
    if (db.chatMessages.length === 0) {
        messagesDiv.innerHTML = '<div class="system-message">Welcome to Library Chat! Start typing to join the conversation.</div>';
    } else {
        messagesDiv.innerHTML = db.chatMessages.map(msg => `
            <div class="chat-message" style="margin: 10px 0; padding: 10px; background: ${msg.sender === currentUser ? '#e3f2fd' : '#f5f5f5'}; border-radius: 5px;">
                <div style="font-weight: bold; color: #333;">${msg.sender}</div>
                <div style="color: #666; font-size: 12px;">${new Date(msg.timestamp).toLocaleTimeString()}</div>
                <div style="margin-top: 5px; color: #000;">${msg.text}</div>
            </div>
        `).join('');
    }
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatMessageInput');
    const text = input.value.trim();
    
    if (!text) return;
    
    const message = {
        id: db.generateId(),
        sender: currentUser,
        text: text,
        timestamp: new Date().toISOString(),
        type: 'public'
    };
    
    db.chatMessages.push(message);
    db.saveData('chatMessages', db.chatMessages);
    input.value = '';
    loadChatMessages();
}

function startPrivateChat(username) {
    alert(`Starting private chat with ${username}. This would open a direct message conversation.`);
}

// ========== INBOX FUNCTIONALITY ==========
function loadInbox() {
    document.getElementById('pageTitle').innerText = 'Inbox - Message Librarian';
    setupInboxTabs();
    displayInboxMessages();
    
    // Setup compose button and modal
    document.getElementById('composeNewMessage').onclick = () => {
        document.getElementById('composeModal').style.display = 'block';
        document.getElementById('borrowerEmail').value = currentUser;
        document.getElementById('borrowerRole').value = currentUserRole;
    };
    
    // Close compose modal
    document.getElementById('closeComposeBtn').onclick = () => {
        document.getElementById('composeModal').style.display = 'none';
    };
    
    // Handle compose form
    document.getElementById('composeForm').onsubmit = (e) => {
        e.preventDefault();
        sendInboxMessage();
    };
    
    // Close message view modal
    document.getElementById('closeViewMessageBtn').onclick = () => {
        document.getElementById('messageViewModal').style.display = 'none';
    };
}

function setupInboxTabs() {
    document.getElementById('inboxTab').onclick = () => {
        document.querySelectorAll('.inbox-tab').forEach(t => t.classList.remove('active'));
        document.getElementById('inboxTab').classList.add('active');
        displayInboxMessages('received');
    };
    
    document.getElementById('sentTab').onclick = () => {
        document.querySelectorAll('.inbox-tab').forEach(t => t.classList.remove('active'));
        document.getElementById('sentTab').classList.add('active');
        displayInboxMessages('sent');
    };
    
    document.getElementById('draftsTab').onclick = () => {
        document.querySelectorAll('.inbox-tab').forEach(t => t.classList.remove('active'));
        document.getElementById('draftsTab').classList.add('active');
        displayInboxMessages('drafts');
    };
}

function displayInboxMessages(type = 'received') {
    const messagesDiv = document.getElementById('inboxMessages');
    let messages = db.inboxMessages.filter(m => m.status === type);
    
    if (type === 'received') {
        messages = messages.filter(m => m.recipientId === currentUser);
    } else if (type === 'sent') {
        messages = messages.filter(m => m.senderId === currentUser);
    }
    
    if (messages.length === 0) {
        messagesDiv.innerHTML = `<div style="text-align: center; padding: 20px; color: #999;">No ${type} messages yet.</div>`;
        updateInboxBadge();
        return;
    }
    
    messagesDiv.innerHTML = messages.map(msg => `
        <div class="message-item" style="padding: 15px; margin: 10px 0; background: ${msg.read ? '#fff' : '#fffacd'}; border-left: 4px solid ${msg.read ? '#ccc' : '#27ae60'}; border-radius: 5px; cursor: pointer;" onclick="viewMessage('${msg.id}')">
            <div class="message-header" style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span class="message-subject" style="font-weight: bold; flex: 1;">${msg.subject}</span>
                <span class="message-date" style="font-size: 12px; color: #999;">${new Date(msg.date).toLocaleDateString()}</span>
            </div>
            <div class="message-from" style="font-size: 12px; color: #666; margin-bottom: 5px;">
                <strong>${type === 'sent' ? 'To' : 'From'}:</strong> ${type === 'sent' ? msg.recipientName : msg.senderName}
            </div>
            <div class="message-preview" style="color: #666; font-size: 13px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${msg.body}</div>
        </div>
    `).join('');
    
    updateInboxBadge();
}

function viewMessage(messageId) {
    const message = db.inboxMessages.find(m => m.id === messageId);
    if (!message) return;
    
    // Mark as read
    if (!message.read) {
        message.read = true;
        db.saveData('inboxMessages', db.inboxMessages);
        updateInboxBadge();
    }
    
    // Display message
    document.getElementById('viewMessageSubject').innerText = message.subject;
    document.getElementById('viewMessageFrom').innerText = message.senderName;
    document.getElementById('viewMessageDate').innerText = new Date(message.date).toLocaleString();
    document.getElementById('viewMessageBody').innerText = message.body;
    
    // Setup reply button
    document.getElementById('replyBtn').onclick = () => {
        document.getElementById('messageRecipient').value = message.senderName;
        document.getElementById('messageSubject').value = `Re: ${message.subject}`;
        document.getElementById('composeModal').style.display = 'block';
        document.getElementById('messageViewModal').style.display = 'none';
    };
    
    // Setup delete button
    document.getElementById('deleteMessageBtn').onclick = () => {
        if (confirm('Delete this message?')) {
            db.inboxMessages = db.inboxMessages.filter(m => m.id !== messageId);
            db.saveData('inboxMessages', db.inboxMessages);
            document.getElementById('messageViewModal').style.display = 'none';
            displayInboxMessages();
        }
    };
    
    document.getElementById('messageViewModal').style.display = 'block';
}

function sendInboxMessage() {
    const recipient = document.getElementById('messageRecipient').value;
    const subject = document.getElementById('messageSubject').value;
    const body = document.getElementById('messageBody').value;
    
    if (!recipient || !subject || !body) {
        alert('Please fill in all fields');
        return;
    }
    
    const message = {
        id: db.generateId(),
        senderId: currentUser,
        senderName: currentUser,
        recipientId: recipient === 'librarian' ? 'librarian@library.com' : 'admin@library.com',
        recipientName: recipient === 'librarian' ? 'Librarian (NSHIMIYIMANA Yves)' : 'Administrator',
        subject: subject,
        body: body,
        date: new Date().toISOString(),
        read: false,
        status: 'sent'
    };
    
    db.inboxMessages.push(message);
    db.saveData('inboxMessages', db.inboxMessages);
    
    // Also add a received copy for verification
    const receivedCopy = {
        ...message,
        id: db.generateId(),
        senderId: recipient === 'librarian' ? 'librarian@library.com' : 'admin@library.com',
        senderName: recipient === 'librarian' ? 'Librarian (NSHIMIYIMANA Yves)' : 'Administrator',
        recipientId: currentUser,
        recipientName: currentUser,
        status: 'received'
    };
    db.inboxMessages.push(receivedCopy);
    db.saveData('inboxMessages', db.inboxMessages);
    
    alert('Message sent successfully!');
    document.getElementById('composeForm').reset();
    document.getElementById('composeModal').style.display = 'none';
    displayInboxMessages('sent');
}

function updateInboxBadge() {
    const unreadCount = db.inboxMessages.filter(m => m.status === 'received' && !m.read && m.recipientId === currentUser).length;
    const badge = document.getElementById('inboxBadge');
    if (unreadCount > 0) {
        badge.innerText = unreadCount;
        badge.style.display = 'inline';
    } else {
        badge.style.display = 'none';
    }
}

