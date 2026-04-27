// Data management with localStorage
const DB = {
    users: JSON.parse(localStorage.getItem('users')) || [],
    books: JSON.parse(localStorage.getItem('books')) || [],
    borrows: JSON.parse(localStorage.getItem('borrows')) || [],
    
    save() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('books', JSON.stringify(this.books));
        localStorage.setItem('borrows', JSON.stringify(this.borrows));
    }
};

let currentUser = null;

// Init
document.addEventListener('DOMContentLoaded', () => {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        showPage('dashboardPage');
        loadBooks();
        loadUserBorrows();
        loadProfile();
        checkAdmin();
    } else {
        showPage('authPage');
    }
    
    // Auth listeners
    document.getElementById('loginForm').addEventListener('submit', login);
    document.getElementById('registerForm').addEventListener('submit', register);
});

// Auth functions
function toggleForm() {
    document.getElementById('loginForm').classList.toggle('active');
    document.getElementById('registerForm').classList.toggle('active');
    document.getElementById('authMessage').textContent = '';
}

function login(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const user = DB.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
        showMessage('Invalid email or password', 'error');
        return;
    }
    
    currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    showMessage('Login successful!', 'success');
    setTimeout(() => {
        showPage('dashboardPage');
        loadBooks();
        loadUserBorrows();
        loadProfile();
        checkAdmin();
    }, 500);
}

function register(e) {
    e.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const studentId = document.getElementById('registerStudentId').value;
    
    if (DB.users.find(u => u.email === email)) {
        showMessage('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        studentId,
        isAdmin: false
    };
    
    DB.users.push(newUser);
    DB.save();
    showMessage('Registration successful! Login now.', 'success');
    
    setTimeout(() => {
        toggleForm();
        document.getElementById('registerForm').reset();
        document.getElementById('loginForm').reset();
    }, 500);
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    showPage('authPage');
    document.getElementById('loginForm').classList.add('active');
    document.getElementById('registerForm').classList.remove('active');
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

function switchPage(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    if (section === 'books') {
        document.getElementById('booksSection').classList.add('active');
    } else if (section === 'myBorrows') {
        document.getElementById('borrowsSection').classList.add('active');
        switchBorrowsTab('active');
    } else if (section === 'profile') {
        document.getElementById('profileSection').classList.add('active');
    } else if (section === 'admin') {
        document.getElementById('adminSection').classList.add('active');
        loadAdminBooks();
    }
}

// Books
function loadBooks() {
    const listDiv = document.getElementById('booksList');
    listDiv.innerHTML = DB.books.map(book => {
        const borrowed = DB.borrows.find(b => b.bookId === book.id && !b.returnedAt);
        const status = borrowed ? 'borrowed' : 'available';
        
        return `
            <div class="book-card" onclick="showBookDetail('${book.id}')">
                <div class="book-cover">📖</div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p><strong>${book.author}</strong></p>
                    <span class="book-status ${status}">${status === 'available' ? '✓ Available' : '🔖 Borrowed'}</span>
                    ${status === 'available' ? 
                        `<button class="btn btn-primary btn-small" onclick="borrowBook(event, '${book.id}')">Borrow</button>` :
                        `<button class="btn btn-secondary btn-small" onclick="event.stopPropagation()">Borrowed</button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

function filterBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = DB.books.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.author.toLowerCase().includes(query)
    );
    
    const listDiv = document.getElementById('booksList');
    listDiv.innerHTML = filtered.map(book => {
        const borrowed = DB.borrows.find(b => b.bookId === book.id && !b.returnedAt);
        const status = borrowed ? 'borrowed' : 'available';
        
        return `
            <div class="book-card" onclick="showBookDetail('${book.id}')">
                <div class="book-cover">📖</div>
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p><strong>${book.author}</strong></p>
                    <span class="book-status ${status}">${status === 'available' ? '✓ Available' : '🔖 Borrowed'}</span>
                </div>
            </div>
        `;
    }).join('');
}

function showBookDetail(bookId) {
    const book = DB.books.find(b => b.id === parseInt(bookId));
    if (!book) return;
    
    const borrowed = DB.borrows.find(b => b.bookId === book.id && !b.returnedAt);
    const status = borrowed ? 'borrowed' : 'available';
    
    const detail = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Copies:</strong> ${book.copies}</p>
        <p><strong>Status:</strong> <span class="book-status ${status}">${status}</span></p>
        <hr>
        <p>${book.description}</p>
        ${status === 'available' ? 
            `<button class="btn btn-primary" onclick="borrowBook(null, '${book.id}'); closeModal()">Borrow This Book</button>` :
            ''
        }
    `;
    
    document.getElementById('bookDetail').innerHTML = detail;
    document.getElementById('bookModal').classList.add('active');
}

function closeModal() {
    document.getElementById('bookModal').classList.remove('active');
}

function borrowBook(e, bookId) {
    if (e) e.stopPropagation();
    
    const book = DB.books.find(b => b.id === parseInt(bookId));
    if (!book) return;
    
    if (DB.borrows.find(b => b.userId === currentUser.id && b.bookId === book.id && !b.returnedAt)) {
        showMessage('You already borrowed this book!', 'error');
        return;
    }
    
    const borrow = {
        id: Date.now(),
        userId: currentUser.id,
        bookId: book.id,
        borrowedAt: new Date().toISOString(),
        returnedAt: null,
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    DB.borrows.push(borrow);
    DB.save();
    showMessage('Book borrowed successfully!', 'success');
    loadBooks();
    closeModal();
}

// Borrows
function loadUserBorrows() {
    const active = DB.borrows.filter(b => b.userId === currentUser.id && !b.returnedAt);
    const history = DB.borrows.filter(b => b.userId === currentUser.id && b.returnedAt);
    
    const activeDiv = document.getElementById('activeBorrows');
    activeDiv.innerHTML = active.length === 0 ? '<p>No active borrows</p>' : active.map(b => {
        const book = DB.books.find(bk => bk.id === b.bookId);
        return `
            <div class="borrow-item">
                <div class="borrow-info">
                    <h3>${book.title}</h3>
                    <p><strong>By:</strong> ${book.author}</p>
                    <p><strong>Due:</strong> ${new Date(b.dueDate).toLocaleDateString()}</p>
                </div>
                <button class="btn btn-danger btn-small" onclick="returnBook('${b.id}')">Return</button>
            </div>
        `;
    }).join('');
    
    const historyDiv = document.getElementById('borrowHistory');
    historyDiv.innerHTML = history.length === 0 ? '<p>No history</p>' : history.map(b => {
        const book = DB.books.find(bk => bk.id === b.bookId);
        return `
            <div class="borrow-item">
                <div class="borrow-info">
                    <h3>${book.title}</h3>
                    <p><strong>Returned:</strong> ${new Date(b.returnedAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
    }).join('');
}

function returnBook(borrowId) {
    if (!confirm('Return this book?')) return;
    
    const borrow = DB.borrows.find(b => b.id === parseInt(borrowId));
    if (borrow) {
        borrow.returnedAt = new Date().toISOString();
        DB.save();
        showMessage('Book returned!', 'success');
        loadUserBorrows();
        loadBooks();
    }
}

function switchBorrowsTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.getElementById('activeBorrows').style.display = tab === 'active' ? 'grid' : 'none';
    document.getElementById('borrowHistory').style.display = tab === 'history' ? 'grid' : 'none';
}

// Profile
function loadProfile() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileStudentId').textContent = currentUser.studentId;
}

function enableEditProfile() {
    document.getElementById('profileView').style.display = 'none';
    document.getElementById('profileEdit').style.display = 'block';
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
}

function cancelEditProfile() {
    document.getElementById('profileView').style.display = 'block';
    document.getElementById('profileEdit').style.display = 'none';
}

function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;
    
    const user = DB.users.find(u => u.id === currentUser.id);
    if (user) {
        user.name = name;
        user.email = email;
        if (password) user.password = password;
        
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        DB.save();
        
        showMessage('Profile updated!', 'success');
        loadProfile();
        cancelEditProfile();
    }
}

// Admin
function checkAdmin() {
    const adminLink = document.getElementById('adminLink');
    if (currentUser && currentUser.isAdmin) {
        adminLink.style.display = 'block';
    } else {
        adminLink.style.display = 'none';
    }
}

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const isbn = document.getElementById('bookISBN').value;
    const copies = parseInt(document.getElementById('bookCopies').value);
    const description = document.getElementById('bookDesc').value;
    
    if (!title || !author || !isbn || !copies) {
        showMessage('Fill all fields!', 'error');
        return;
    }
    
    const newBook = {
        id: Date.now(),
        title,
        author,
        isbn,
        copies,
        description: description || 'No description'
    };
    
    DB.books.push(newBook);
    DB.save();
    showMessage('Book added!', 'success');
    
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookISBN').value = '';
    document.getElementById('bookCopies').value = '1';
    document.getElementById('bookDesc').value = '';
    
    loadBooks();
    loadAdminBooks();
}

function loadAdminBooks() {
    const adminBooksDiv = document.getElementById('adminBooks');
    adminBooksDiv.innerHTML = DB.books.map(book => `
        <div class="book-row">
            <div>
                <strong>${book.title}</strong> by ${book.author}
            </div>
            <button class="btn btn-danger btn-small" onclick="deleteBook('${book.id}')">Delete</button>
        </div>
    `).join('');
}

function deleteBook(bookId) {
    if (!confirm('Delete this book?')) return;
    
    DB.books = DB.books.filter(b => b.id !== parseInt(bookId));
    DB.save();
    showMessage('Book deleted!', 'success');
    loadBooks();
    loadAdminBooks();
}

// Utilities
function showMessage(msg, type) {
    const msgDiv = document.getElementById('authMessage');
    msgDiv.textContent = msg;
    msgDiv.className = `message ${type}`;
    
    if (type === 'error') {
        setTimeout(() => msgDiv.className = 'message', 3000);
    }
}
