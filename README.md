# 📚 Library Management System

A simple, lightweight library management system built with **HTML, CSS, and JavaScript only**. No backend server required—everything runs in the browser using localStorage!

## ✨ Features

✅ **User Authentication**
- Register new account
- Secure login/logout
- User profiles

✅ **Book Management**
- Browse all books
- Search by title or author
- View book details

✅ **Borrowing System**
- Borrow available books
- 14-day lending period
- Return books
- Track borrowing history

✅ **Admin Panel**
- Add books to library
- Delete books
- Manage inventory

✅ **Responsive Design**
- Works on mobile, tablet, desktop

## 🚀 Quick Start

1. **Open in browser:**
   - Simply open `frontend/index.html` in any web browser

2. **Or use a local server:**
   ```bash
   cd frontend
   python -m http.server 8000
   # Then visit http://localhost:8000
   ```

3. **Register and explore:**
   - Click "Register" to create an account
   - Browse books and borrow them
   - Return books when done

## 📁 File Structure

```
frontend/
├── index.html    (Main application)
├── app.js        (All logic)
├── style.css     (Styling)
```

That's it! No build process, no dependencies, no server needed.

## 🎮 How to Use

### For Students:
1. Register with email, password, and student ID
2. Browse available books
3. Borrow books (14-day period)
4. Return books from "My Borrows"
5. View borrowing history
6. Edit profile

### For Admins:
1. Register normally
2. Edit your account in browser console:
   ```javascript
   let user = JSON.parse(localStorage.getItem('currentUser'));
   user.isAdmin = true;
   localStorage.setItem('currentUser', JSON.stringify(user));
   location.reload();
   ```
3. Access Admin Panel to add/delete books

## 💾 Data Storage

All data is stored in **browser localStorage**:
- User accounts
- Book catalog
- Borrowing records

Data persists across browser sessions but is lost if localStorage is cleared.

## 🔒 Admin Setup

After registering, make yourself admin:

1. Open browser console (F12)
2. Paste this code:
```javascript
let user = JSON.parse(localStorage.getItem('currentUser'));
user.isAdmin = true;
localStorage.setItem('currentUser', JSON.stringify(user));
location.reload();
```

## 🎨 Customization

### Change Colors
Edit `style.css`:
```css
:root {
    --primary: #3498db;
    --dark: #2c3e50;
    --success: #27ae60;
    --danger: #e74c3c;
}
```

### Change Lending Period
Edit `app.js`, find this line:
```javascript
dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)  // Change 14 to desired days
```

## 🧪 Test Data

To add test books, register as admin and use the Admin Panel.

Sample books to add:
- **The Great Gatsby** by F. Scott Fitzgerald
- **To Kill a Mockingbird** by Harper Lee
- **1984** by George Orwell

## 📊 Features Overview

| Feature | Status |
|---------|--------|
| Register/Login | ✅ |
| Browse Books | ✅ |
| Search | ✅ |
| Borrow Books | ✅ |
| Return Books | ✅ |
| Profile | ✅ |
| Admin Panel | ✅ |
| Responsive | ✅ |

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari
- Opera

## ⚡ Performance

- **Load time:** < 100ms
- **Size:** ~20KB (combined)
- **No dependencies:** 100% vanilla JS

## 🔐 Security Notes

This is a frontend-only demo:
- Passwords stored in localStorage (not encrypted)
- For production, add backend authentication
- For real use, encrypt sensitive data

## 📱 Responsive Design

Optimized for:
- **Desktop:** Full experience
- **Tablet:** Touch-friendly
- **Mobile:** Fully responsive

## 🎓 Learning Resources

Perfect for learning:
- HTML5 structure
- CSS3 styling
- Vanilla JavaScript (no frameworks)
- localStorage API
- DOM manipulation
- Event handling

## 📄 License

Free to use and modify!

## 🚀 Upgrade Path

Want to add a backend?

1. Create Node.js/Express server
2. Replace localStorage with API calls
3. Add database (MongoDB, PostgreSQL)
4. Deploy to cloud (Heroku, AWS, etc.)

## 💡 Tips

- Open DevTools (F12) to inspect localStorage
- Use Console to debug
- Check Application tab to see stored data
- Refresh page to reload from storage

## 🎯 Next Steps

1. Try borrowing a book
2. Return it from "My Borrows"
3. Add books as admin
4. Customize the colors
5. Deploy to web hosting

---

**Enjoy your library system!** 📚✨

No server required. No installation needed. Just open and use!

