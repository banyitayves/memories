// ==================== Authentication System ====================

// Demo account for testing
const DEMO_ACCOUNT = {
    email: 'admin@reb.edu',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin'
};

// Current logged-in user
let currentUser = null;

// Initialize users from localStorage
function initializeAuth() {
    const users = JSON.parse(localStorage.getItem('reb_users') || '[]');
    
    // Add demo account if not exists
    const adminExists = users.some(u => u.email === DEMO_ACCOUNT.email);
    if (!adminExists) {
        users.push({
            id: generateId(),
            name: DEMO_ACCOUNT.name,
            email: DEMO_ACCOUNT.email,
            password: DEMO_ACCOUNT.password,
            teacherId: 'ADMIN001',
            role: 'admin',
            createdAt: new Date().toISOString()
        });
        localStorage.setItem('reb_users', JSON.stringify(users));
    }
    
    // Check for existing session
    const savedUser = localStorage.getItem('reb_currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            showApp();
        } catch (e) {
            console.error('Error loading user session:', e);
        }
    }
}

// Switch between auth tabs
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.auth-tab-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tab + '-tab').classList.add('active');
    event.target.classList.add('active');
}

// Handle login
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('❌ Please fill in all fields', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('reb_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            teacherId: user.teacherId
        };
        localStorage.setItem('reb_currentUser', JSON.stringify(currentUser));
        showToast(`✅ Welcome, ${user.name}!`, 'success');
        showApp();
    } else {
        showToast('❌ Invalid email or password', 'error');
    }
}

// Handle registration
function handleRegister() {
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const teacherId = document.getElementById('teacherId').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (!name || !email || !teacherId || !password) {
        showToast('❌ Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showToast('❌ Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('❌ Password must be at least 6 characters', 'error');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('reb_users') || '[]');
    
    if (users.some(u => u.email === email)) {
        showToast('❌ Email already registered', 'error');
        return;
    }
    
    const newUser = {
        id: generateId(),
        name: name,
        email: email,
        password: password,
        teacherId: teacherId,
        role: 'teacher',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('reb_users', JSON.stringify(users));
    
    // Auto-login after registration
    currentUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        teacherId: newUser.teacherId
    };
    localStorage.setItem('reb_currentUser', JSON.stringify(currentUser));
    
    showToast(`✅ Account created successfully! Welcome, ${name}!`, 'success');
    showApp();
}

// Handle demo login
function handleDemoLogin() {
    currentUser = {
        id: 'demo-' + generateId(),
        name: 'Demo Teacher',
        email: 'demo@example.com',
        role: 'teacher',
        teacherId: 'DEMO001'
    };
    localStorage.setItem('reb_currentUser', JSON.stringify(currentUser));
    showToast('✅ Welcome to Demo Mode!', 'success');
    showApp();
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('reb_currentUser');
        location.reload();
    }
}

// Show app and hide auth modal
function showApp() {
    document.getElementById('authModal').style.display = 'none';
    document.getElementById('appContainer').style.display = 'flex';
    
    // Update user display
    if (currentUser) {
        document.getElementById('userDisplay').textContent = `👤 ${currentUser.name}`;
        
        // Show admin nav if user is admin
        if (currentUser.role === 'admin') {
            document.getElementById('adminNav').style.display = 'block';
            // Initialize admin panel
            setTimeout(() => {
                displayAdminStats();
                displayUsersList();
            }, 100);
        }
    }
    
    // Initialize form with current date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    document.getElementById('teacherName').value = currentUser.name;
}

// Admin: Get all users
function getAllUsers() {
    return JSON.parse(localStorage.getItem('reb_users') || '[]');
}

// Admin: Get user statistics
function getUserStats() {
    const users = getAllUsers();
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    
    return {
        totalUsers: users.length,
        totalPlans: plans.length,
        adminCount: users.filter(u => u.role === 'admin').length,
        teacherCount: users.filter(u => u.role === 'teacher').length
    };
}

// Admin: Display users list
function displayUsersList() {
    const users = getAllUsers();
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-item';
        userDiv.innerHTML = `
            <div style="margin-bottom: 10px; padding: 10px; background: #f5f5f5; border-radius: 6px;">
                <p><strong>${user.name}</strong> (${user.role})</p>
                <p style="font-size: 0.9em; color: #666;">${user.email} - ID: ${user.teacherId}</p>
                <small style="color: #999;">Joined: ${new Date(user.createdAt).toLocaleDateString()}</small>
            </div>
        `;
        usersList.appendChild(userDiv);
    });
    
    document.getElementById('userCountDisplay').textContent = `Total Users: ${users.length}`;
}

// Admin: Display statistics
function displayAdminStats() {
    const stats = getUserStats();
    const userCountDisplay = document.getElementById('userCountDisplay');
    const plansCountDisplay = document.getElementById('plansCountDisplay');
    const usersCountDisplay = document.getElementById('usersCountDisplay');
    const adminsCountDisplay = document.getElementById('adminsCountDisplay');
    
    if (userCountDisplay) userCountDisplay.textContent = `Total Users: ${stats.totalUsers}`;
    if (plansCountDisplay) plansCountDisplay.textContent = stats.totalPlans;
    if (usersCountDisplay) usersCountDisplay.textContent = stats.totalUsers;
    if (adminsCountDisplay) adminsCountDisplay.textContent = stats.adminCount;
}

// Admin: Reset all data
function resetAllData() {
    if (confirm('⚠️ This will delete ALL data! Are you absolutely sure?')) {
        if (confirm('⚠️ THIS CANNOT BE UNDONE! Type "RESET" in the next prompt to confirm')) {
            const confirmation = prompt('Type RESET to confirm:');
            if (confirmation === 'RESET') {
                localStorage.removeItem('reb_users');
                localStorage.removeItem('reb_lessonPlans');
                localStorage.removeItem('reb_currentUser');
                showToast('🔄 All data has been reset. Please refresh the page.', 'info');
                setTimeout(() => location.reload(), 2000);
            }
        }
    }
}

// Admin: Export all data
function exportAllData() {
    const users = getAllUsers();
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    
    const data = {
        exportDate: new Date().toISOString(),
        users: users,
        lessonPlans: plans,
        statistics: getUserStats()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `reb-lesson-planner-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showToast('✅ Data exported successfully!', 'success');
}

// Utility function to generate unique IDs
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Initialize authentication when page loads
document.addEventListener('DOMContentLoaded', initializeAuth);
