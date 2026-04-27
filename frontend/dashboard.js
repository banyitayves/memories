let currentUser = null;
let allBooks = [];
let userBorrows = [];

// On page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

// Initialize dashboard
async function initializeDashboard() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    currentUser = JSON.parse(user);
    document.getElementById('userName').textContent = currentUser.name;

    // Load initial data
    await loadBooks();
    await loadAnalytics();
    await loadUserBorrows();
    await loadUserProfile();

    // Check if admin (you can modify this logic as needed)
    const adminMenu = document.getElementById('adminMenu');
    if (currentUser.email === 'admin@library.com') {
        adminMenu.style.display = 'block';
        setupAdminPanel();
    }

    // Load dashboard by default
    loadPage('dashboard');
}

// Load all books
async function loadBooks() {
    try {
        allBooks = await apiCall('/books');
        displayBooks(allBooks);
    } catch (error) {
        console.error('Failed to load books:', error);
    }
}

// Display books in grid
function displayBooks(books) {
    const booksList = document.getElementById('booksList');
    if (!booksList) return;

    booksList.innerHTML = books.map(book => `
        <div class="book-card" onclick="openBookModal('${book.id}')">
            <div class="book-cover">📖</div>
            <div class="book-info">
                <h4>${book.title}</h4>
                <p><strong>By:</strong> ${book.author}</p>
                <div class="book-status ${book.status}">
                    ${book.status === 'available' ? '✓ Available' : '🔖 Borrowed'}
                </div>
                ${book.status === 'available' ? 
                    `<button class="btn btn-success btn-small" onclick="borrowBook(event, '${book.id}')">Borrow</button>` :
                    `<button class="btn btn-secondary btn-small" onclick="readBook(event, '${book.id}')">Read Online</button>`
                }
            </div>
        </div>
    `).join('');
}

// Filter books by search
function filterBooks() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase();
    const filtered = allBooks.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    displayBooks(filtered);
}

// Open book modal
async function openBookModal(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;

    const modal = document.getElementById('bookModal');
    const modalBody = document.getElementById('bookModalBody');

    const borrowBtn = book.status === 'available' ?
        `<button class="btn btn-success" onclick="borrowBook(null, '${book.id}')">Borrow This Book</button>` :
        `<button class="btn btn-secondary" onclick="readBook(null, '${book.id}')">Read Online</button>`;

    modalBody.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>ISBN:</strong> ${book.isbn}</p>
        <p><strong>Available Copies:</strong> ${book.availableCopies}</p>
        <p><strong>Status:</strong> <span class="book-status ${book.status}">${book.status}</span></p>
        <hr>
        <h3>Description</h3>
        <p>${book.description}</p>
        ${borrowBtn}
    `;

    modal.classList.add('active');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('bookModal');
    modal.classList.remove('active');
}

// Borrow book
async function borrowBook(e, bookId) {
    if (e) e.stopPropagation();

    try {
        const borrow = await apiCall('/borrows', {
            method: 'POST',
            body: JSON.stringify({
                userId: currentUser.id,
                bookId: bookId
            })
        });

        showToast('Book borrowed successfully!', 'success');
        closeModal();
        await loadBooks();
        await loadUserBorrows();
    } catch (error) {
        showToast('Failed to borrow book', 'error');
    }
}

// Return book
async function returnBook(borrowId) {
    if (!confirm('Are you sure you want to return this book?')) return;

    try {
        await apiCall(`/borrows/${borrowId}/return`, {
            method: 'POST'
        });

        showToast('Book returned successfully!', 'success');
        await loadUserBorrows();
        await loadBooks();
    } catch (error) {
        showToast('Failed to return book', 'error');
    }
}

// Read book online
function readBook(e, bookId) {
    if (e) e.stopPropagation();
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;

    const modal = document.getElementById('bookModal');
    const modalBody = document.getElementById('bookModalBody');

    modalBody.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>By:</strong> ${book.author}</p>
        <hr>
        <div style="max-height: 400px; overflow-y: auto; background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${book.content || '<p>No content available for this book.</p>'}
        </div>
        <button class="btn btn-secondary" style="width: 100%; margin-top: 15px;" onclick="closeModal()">Close</button>
    `;

    modal.classList.add('active');
}

// Load user borrows
async function loadUserBorrows() {
    try {
        userBorrows = await apiCall(`/users/${currentUser.id}/borrows`);
        displayUserBorrows();
    } catch (error) {
        console.error('Failed to load user borrows:', error);
    }
}

// Display user borrows
function displayUserBorrows() {
    const activeBorrows = userBorrows.filter(b => !b.returnedAt);
    const returnedBorrows = userBorrows.filter(b => b.returnedAt);

    // Active borrows
    const activeBorrowsDiv = document.getElementById('activeBorrows');
    if (activeBorrowsDiv) {
        activeBorrowsDiv.innerHTML = activeBorrows.length === 0 ?
            '<p>No active borrows</p>' :
            activeBorrows.map(borrow => `
                <div class="borrow-item">
                    <div class="borrow-info">
                        <h4>${borrow.book.title}</h4>
                        <p><strong>Author:</strong> ${borrow.book.author}</p>
                        <p><strong>Borrowed on:</strong> ${new Date(borrow.borrowedAt).toLocaleDateString()}</p>
                        <p><strong>Due date:</strong> ${new Date(borrow.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div class="borrow-actions">
                        <button class="btn btn-danger btn-small" onclick="returnBook('${borrow.id}')">Return</button>
                        <button class="btn btn-secondary btn-small" onclick="readBook(null, '${borrow.bookId}')">Read</button>
                    </div>
                </div>
            `).join('');
    }

    // Returned borrows
    const returnedBorrowsDiv = document.getElementById('returnedBorrows');
    if (returnedBorrowsDiv) {
        returnedBorrowsDiv.innerHTML = returnedBorrows.length === 0 ?
            '<p>No returned books yet</p>' :
            returnedBorrows.map(borrow => `
                <div class="borrow-item">
                    <div class="borrow-info">
                        <h4>${borrow.book.title}</h4>
                        <p><strong>Author:</strong> ${borrow.book.author}</p>
                        <p><strong>Borrowed on:</strong> ${new Date(borrow.borrowedAt).toLocaleDateString()}</p>
                        <p><strong>Returned on:</strong> ${new Date(borrow.returnedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            `).join('');
    }

    // Dashboard current borrows
    const currentBorrowsDiv = document.getElementById('currentBorrows');
    if (currentBorrowsDiv) {
        const current = activeBorrows.slice(0, 3);
        currentBorrowsDiv.innerHTML = current.length === 0 ?
            '<p>No books borrowed yet</p>' :
            current.map(borrow => `
                <div class="borrow-item">
                    <div class="borrow-info">
                        <h4>${borrow.book.title}</h4>
                        <p>Due: ${new Date(borrow.dueDate).toLocaleDateString()}</p>
                    </div>
                    <button class="btn btn-danger btn-small" onclick="returnBook('${borrow.id}')">Return</button>
                </div>
            `).join('');
    }
}

// Load analytics
async function loadAnalytics() {
    try {
        const analytics = await apiCall('/analytics');

        document.getElementById('totalBooks').textContent = analytics.totalBooks;
        document.getElementById('availableBooks').textContent = analytics.availableCopies;
        document.getElementById('borrowedBooks').textContent = analytics.borrowedCopies;
        document.getElementById('totalUsers').textContent = analytics.totalUsers;

        // Top books
        const topBooksDiv = document.getElementById('topBooks');
        if (topBooksDiv) {
            topBooksDiv.innerHTML = analytics.mostBorrowedBooks.length === 0 ?
                '<p>No books borrowed yet</p>' :
                analytics.mostBorrowedBooks.map(item => `
                    <div class="book-card" onclick="openBookModal('${item.book.id}')">
                        <div class="book-cover">📖</div>
                        <div class="book-info">
                            <h4>${item.book.title}</h4>
                            <p><strong>By:</strong> ${item.book.author}</p>
                            <p>⭐ Borrowed ${item.borrowCount} times</p>
                        </div>
                    </div>
                `).join('');
        }
    } catch (error) {
        console.error('Failed to load analytics:', error);
    }
}

// Load user profile
async function loadUserProfile() {
    try {
        const user = await apiCall(`/users/${currentUser.id}`);
        document.getElementById('profileName').value = user.name;
        document.getElementById('profileEmail').value = user.email;
        document.getElementById('profileStudentId').value = user.studentId;
        document.getElementById('profileMemberSince').value = new Date(user.createdAt).toLocaleDateString();

        // Set edit form values
        document.getElementById('editName').value = user.name;
        document.getElementById('editEmail').value = user.email;
    } catch (error) {
        console.error('Failed to load profile:', error);
    }
}

// Enable profile edit
function enableProfileEdit() {
    document.querySelector('.profile-info').style.display = 'none';
    document.getElementById('profileEditForm').classList.add('active');
}

// Cancel profile edit
function cancelProfileEdit() {
    document.querySelector('.profile-info').style.display = 'block';
    document.getElementById('profileEditForm').classList.remove('active');
}

// Save profile
async function saveProfile() {
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const password = document.getElementById('editPassword').value;

    try {
        const updateData = {
            name,
            email,
            ...(password && { password })
        };

        const updated = await apiCall(`/users/${currentUser.id}`, {
            method: 'PUT',
            body: JSON.stringify(updateData)
        });

        currentUser = { ...currentUser, name: updated.name, email: updated.email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        showToast('Profile updated successfully!', 'success');
        await loadUserProfile();
        cancelProfileEdit();
    } catch (error) {
        showToast('Failed to update profile', 'error');
    }
}

// Load page (navigation)
function loadPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const page = document.getElementById(pageName);
    if (page) {
        page.classList.add('active');
    }

    // Reload data for specific pages
    if (pageName === 'books') {
        filterBooks();
    } else if (pageName === 'myBorrows') {
        switchTab('active');
    } else if (pageName === 'dashboard') {
        loadAnalytics();
    }
}

// Switch tabs
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (tab === 'active') {
        document.getElementById('activeBorrows').style.display = 'block';
        document.getElementById('returnedBorrows').style.display = 'none';
    } else {
        document.getElementById('activeBorrows').style.display = 'none';
        document.getElementById('returnedBorrows').style.display = 'block';
    }
}

// ADMIN PANEL SETUP
function setupAdminPanel() {
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', handleAddBook);
    }
}

// Handle add book
async function handleAddBook(e) {
    e.preventDefault();

    const newBook = {
        title: document.getElementById('bookTitle').value,
        author: document.getElementById('bookAuthor').value,
        isbn: document.getElementById('bookISBN').value,
        totalCopies: parseInt(document.getElementById('bookCopies').value),
        description: document.getElementById('bookDescription').value,
        content: document.getElementById('bookContent').value
    };

    try {
        await apiCall('/books', {
            method: 'POST',
            body: JSON.stringify(newBook)
        });

        showToast('Book added successfully!', 'success');
        e.target.reset();
        await loadBooks();
        await loadAnalytics();
        displayManageBooks();
    } catch (error) {
        showToast('Failed to add book', 'error');
    }
}

// Display manage books (admin)
async function displayManageBooks() {
    const manageBooksDiv = document.getElementById('manageBooks');
    if (!manageBooksDiv) return;

    manageBooksDiv.innerHTML = allBooks.map(book => `
        <div class="admin-book-item">
            <div>
                <h4>${book.title}</h4>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Available:</strong> ${book.totalCopies}</p>
            </div>
            <div class="admin-actions">
                <button class="btn btn-danger btn-small" onclick="deleteBook('${book.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Delete book
async function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
        await apiCall(`/books/${bookId}`, {
            method: 'DELETE'
        });

        showToast('Book deleted successfully!', 'success');
        await loadBooks();
        await loadAnalytics();
        displayManageBooks();
    } catch (error) {
        showToast('Failed to delete book', 'error');
    }
}

// Load manage books when admin panel loads
const originalLoadPage = loadPage;
loadPage = function(pageName) {
    originalLoadPage(pageName);
    if (pageName === 'admin') {
        displayManageBooks();
    }
};
