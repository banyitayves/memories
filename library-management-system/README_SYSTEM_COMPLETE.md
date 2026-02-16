# 📚 GS BUSANZA Library Management System

## Complete Documentation & User Guides

Welcome to the **GS BUSANZA Library Management System** - a comprehensive, role-based library solution for managing books, patrons, and borrowing requests.

---

## 🚀 Quick Start

### First Time Users?

**Choose your role and get started:**

| Role | Tasks | Start Here |
|------|-------|-----------|
| **📖 Student** | Borrow books, search catalog | [Student Guide](USER_GUIDE_STUDENTS.md) |
| **👔 Staff** | Borrow books, assist in library | [Student Guide](USER_GUIDE_STUDENTS.md) |
| **📚 Librarian** | Manage catalog, approve requests | [Librarian Guide](LIBRARIAN_ADMIN_GUIDE.md) |
| **🔐 Admin** | Full system access, settings | [Librarian Guide](LIBRARIAN_ADMIN_GUIDE.md) |

---

## 📖 Documentation Files

### For Students & Staff

1. **[USER_GUIDE_STUDENTS.md](USER_GUIDE_STUDENTS.md)** (REQUIRED READ)
   - How to login with demo credentials
   - How to find books in the library
   - Step-by-step borrowing request workflow
   - FAQ and troubleshooting
   - Timeline for book approval
   - **Start here if you're new!**

2. **[BORROWING_QUICK_REFERENCE.md](BORROWING_QUICK_REFERENCE.md)** (QUICK REFERENCE)
   - 3-step borrowing process
   - Important rules (Do's & Don'ts)
   - Common problems and solutions
   - Quick answers (one-page cheat sheet)
   - **Keep this handy while using the system**

### For Librarians & Administrators

3. **[LIBRARIAN_ADMIN_GUIDE.md](LIBRARIAN_ADMIN_GUIDE.md)** (COMPREHENSIVE)
   - Accessing and managing pending requests
   - How to approve/deny borrow requests
   - Adding and editing books
   - Bulk import (CSV) for books and members
   - Viewing all patrons and registering new ones
   - Circulation tracking and loan management
   - System settings configuration (Admin only)
   - School information and featured books
   - **Must-read for library staff**

### For Testing & Verification

4. **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** (VERIFICATION)
   - Complete test scenarios
   - Feature validation checkpoints
   - End-to-end workflow testing
   - Performance and compatibility testing
   - Data persistence verification
   - **Use this to verify system is working**

### Technical Documentation

5. **[README_ROLES.md](README_ROLES.md)**
   - Role descriptions and permissions
   - Feature matrix by role
   - Dashboard content for each role

6. **[QUICK_START.md](QUICK_START.md)**
   - System overview
   - Login credentials
   - Basic navigation
   - Key features summary

7. **[IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)**
   - Technical architecture
   - Technology stack
   - Database structure
   - Function overview

---

## 🔐 Demo Login Credentials

### Student Account
```
Email:    student@school.com
Password: student123
```

### Staff Account
```
Email:    staff@school.com
Password: staff123
```

### Librarian Account
```
Email:    librarian@library.com
Password: lib123
```

### Admin Account
```
Email:    admin@library.com
Password: admin123
```

> **Note:** Use these credentials to test all features

---

## 📚 Sample Data Files

### Book Catalog
- **[books_sample.csv](books_sample.csv)** - 10 sample books (original)
- **[books_sample_extended.csv](books_sample_extended.csv)** - 30 sample books (expanded set with more titles)
  - Includes African literature, classics, and modern fiction
  - Perfect for initial system load
  - Import via: Librarian/Admin → Import Books

### Member Directory
- **[members_sample.csv](members_sample.csv)** - 10 sample members
  - Import via: Librarian/Admin → Import Members

**How to Import:**
1. Login as Librarian or Admin
2. Click "📥 Import Books" or "📥 Import Members"
3. Select the CSV file
4. Review the preview
5. Click "Import"

---

## 🎯 Key Features

### ✅ For All Users
- 🔍 **Browse & Search** - Find books by title, author, or ISBN
- 📤 **Request to Borrow** - Easy one-click borrowing requests
- 📊 **Dashboard** - See your activity and library stats
- 📖 **About Us** - Learn about GS BUSANZA school

### ✅ For Librarians
- 📋 **Manage Requests** - View pending, approve/deny requests
- 📚 **Catalog Management** - Add, edit, delete books
- 👥 **Patron Management** - Register members, view history
- 📤 **Bulk Import** - Upload books and members via CSV
- 💾 **Data Export** - Backup all library data
- 📊 **Reports** - View circulation and collection stats

### ✅ For Administrators
- 🔧 **Full System Access** - All librarian features plus more
- ⚙️ **Settings** - Configure library policies
- 📊 **Advanced Reports** - Financial and usage analytics
- 🛡️ **System Management** - User roles and permissions
- 💾 **Backup & Recovery** - Data management and export

---

## 🏫 About GS BUSANZA

**Institution:** GS BUSANZA School  
**Location:** Kigali, Kicukiro District, Rwanda  
**Sections:** Nursery, Primary, Secondary  

### Leadership
- **Head Teacher:** Mukeshimana Vestine
- **Deputy (Studies):** ZIRIMABAGABO Dismas
- **School Librarian:** NSHIMIYIMANA Yves

### Library Highlights
- **Mission:** Providing access to quality reading materials for all students and staff
- **Featured Book:** "A Man of the People" by Chinua Achebe (10 copies available)
- **Collection:** Diverse mix of fiction, non-fiction, science, and African literature

---

## 📖 Featured Book

### "A Man of the People" by Chinua Achebe

**About:**
A satirical novel exploring politics and corruption in post-colonial Africa. This novel is essential reading for understanding African literature and contemporary political themes.

**Details:**
- **Author:** Chinua Achebe
- **Year:** 1966
- **Category:** Fiction
- **ISBN:** 978-0-143-03943-3
- **Copies Available:** 10
- **Why Read:** Great for class discussions, understanding corruption themes, and appreciating African authors

**Perfect for:** Students studying literature, those interested in African stories, leaders exploring political and social themes

---

## 🔄 Borrowing Workflow

### Simple 3-Step Process

```
1️⃣ FIND THE BOOK
   ↓
   Click "📚 All Books" or "Search OPAC"
   Search for the book you want
   
2️⃣ REQUEST TO BORROW
   ↓
   Click "📤 Request to Borrow" button
   Fill in the form (reason optional)
   Click "✓ Submit Request"
   
3️⃣ WAIT FOR APPROVAL
   ↓
   Librarian reviews your request (1-2 days)
   Collection-ready notification
   Collect your book from the library!
```

**Duration:** 14 days to read  
**Renewal:** Available (ask librarian)  
**Late Fee:** ₱0.50 per day per book  
**Max Books:** 5 at a time

---

## ❓ Frequently Asked Questions

### Getting Started
**Q: How do I login?**
A: Use the email and password for your role (see Demo Credentials above)

**Q: Why can't I see the patron list?**
A: Only admins and librarians can see patrons. Students/Staff can only see books.

**Q: Where do I find books?**
A: Click "📚 All Books" or "Search OPAC" in the sidebar

### Borrowing Books
**Q: How long can I keep a book?**
A: 14 days from approval. You can renew it by asking the librarian.

**Q: What if I want to renew a book?**
A: Ask the librarian - they can extend your due date by 14 more days

**Q: Why was my borrow request denied?**
A: Check the denial reason from your request. Common reasons include overdue fines, reaching the borrowing limit, or the book not being available.

**Q: Can I request a book that's already borrowed?**
A: Yes! If the library has multiple copies, your request will be approved.

### Returns & Fines
**Q: What happens if I return a book late?**
A: Late fees accumulate at ₱0.50 per day per item

**Q: What if I lose a book?**
A: Report it to the librarian immediately. You may be charged replacement cost.

**Q: Can I return books outside library hours?**
A: Ask your librarian about returns procedures and system access

### Technical
**Q: How do I export my data?**
A: Click "📤 Export Data" button - your browser will download a JSON file

**Q: Does the system work without internet?**
A: The system is client-based but requires browser access. Once loaded, it uses browser storage.

**Q: Can I use this on my phone?**
A: Yes, the system is responsive and works on tablets and phones

More FAQs: See [USER_GUIDE_STUDENTS.md](USER_GUIDE_STUDENTS.md) and [LIBRARIAN_ADMIN_GUIDE.md](LIBRARIAN_ADMIN_GUIDE.md)

---

## 🛠️ Technical Information

| Aspect | Details |
|--------|---------|
| **Technology** | HTML5, CSS3, Vanilla JavaScript |
| **Database** | Browser LocalStorage (client-side) |
| **Data Import** | CSV format for books and members |
| **Data Export** | JSON format for backup |
| **Compatibility** | Chrome, Firefox, Safari, Edge |
| **Storage** | 5-10 MB per browser |
| **Backup** | Manual export recommended weekly |

**Note:** System uses browser storage, so clearing browser data will erase records. Always export backups!

---

## 📋 System Modules

### Available to All
- ✅ Dashboard (role-specific)
- ✅ 📚 All Books (browse & search)
- ✅ Search OPAC (online catalog)
- ✅ About Us (school information)

### Available to Librarian/Admin
- ✅ Cataloging (manage books)
- ✅ Circulation (loans & requests)
- ✅ Patron Management (member database)
- ✅ Acquisitions (purchase orders)
- ✅ Reports (statistics)

### Available to Admin Only
- ✅ Settings (system configuration)
- ✅ Advanced Reports (analytics)

---

## 📞 Support & Contact

### For Library Questions
- **Location:** School Library
- **Librarian:** NSHIMIYIMANA Yves
- **Contact:** Ask at the library desk

### For System Issues
- Review the relevant guide above
- Check the [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) for troubleshooting
- Contact your system administrator

### WhatsApp Support
- 💬 **+250 791 756 160** - For more information and support
- Available: Monday-Friday 7:30 AM - 4:00 PM | Saturday 8:00 AM - 12:00 PM

### For Feedback
- Suggestions for improvement welcome
- Contact school administration via WhatsApp
- Feedback helps us serve you better

---

## 📊 System Status

| Component | Status |
|-----------|--------|
| Database | ✅ Fully Functional |
| Authentication | ✅ Working |
| Book Browsing | ✅ Working |
| Borrow Requests | ✅ Working |
| Approvals | ✅ Working |
| CSV Import | ✅ Working |
| Data Export | ✅ Working |
| All Modules | ✅ Ready to Use |

**Last Updated:** February 2026  
**Version:** 2.0 - Production Ready

---

## 📚 Documentation Quick Links

| Purpose | Link |
|---------|------|
| I'm a student/staff | [User Guide](USER_GUIDE_STUDENTS.md) |
| I'm a librarian | [Librarian Guide](LIBRARIAN_ADMIN_GUIDE.md) |
| Quick reference | [Quick Reference](BORROWING_QUICK_REFERENCE.md) |
| Testing system | [Testing Checklist](TESTING_CHECKLIST.md) |
| Role information | [Role Descriptions](README_ROLES.md) |
| Quick start | [Quick Start](QUICK_START.md) |
| Technical details | [Implementation](IMPLEMENTATION_SUMMARY.md) |

---

## ✨ System Highlights

🎯 **User-Friendly Design**
- Simple login process
- Intuitive navigation
- Clear instructions throughout
- Role-based customization

📱 **Accessible Anywhere**
- Works in any web browser
- Responsive design (desktop, tablet, mobile)
- No special software needed
- Fast and lightweight

🔒 **Role-Based Security**
- 4 distinct user roles with different features
- Role-appropriate dashboards
- Restricted access to sensitive features
- Demo accounts for testing

💾 **Data Management**
- Easy CSV bulk import
- JSON data export for backup
- All data persists in browser
- No external dependencies

📚 **Complete Library Features**
- Book catalog management
- Member registration
- Borrowing request system
- Approval workflow
- Circulation tracking
- Reports & statistics

---

## 🎓 Educational Value

This system demonstrates:
- ✅ Role-based access control (RBAC)
- ✅ Data management and persistence
- ✅ CSV import/export workflows
- ✅ Responsive web design
- ✅ Real-world library operations
- ✅ User authentication & authorization
- ✅ Complete CRUD operations
- ✅ Advanced UI patterns

Perfect for learning modern web development!

---

## 🚀 Getting Started Right Now

### Step 1: Login
Use credentials from the [Demo Login Credentials](#-demo-login-credentials) section above

### Step 2: Explore
- Students: Check "📚 All Books" and practice requesting a book
- Librarians: View pending requests in Circulation module
- Admins: Check Settings and import sample data

### Step 3: Read Your Guide
- Link to your role's guide in [Documentation Files](#-documentation-files) section

### Step 4: Test Features
Use [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) to verify everything works

### Step 5: Import Sample Data
- Librarian/Admin → Import Books → Select books_sample_extended.csv
- Librarian/Admin → Import Members → Select members_sample.csv

---

## 📌 Important Notes

⚠️ **Browser Storage Note:**
- All data stored locally in your browser
- Clearing browser data will erase records
- **Always export backups regularly!**
- Use different browsers for different test scenarios

💡 **Best Practices:**
- Test with demo accounts first
- Import sample data before live use
- Export data weekly for backup
- Review reports regularly
- Keep documentation available

---

## 🎉 Welcome to GS BUSANZA Library!

Thank you for using our library management system. We hope it helps you discover great books and manage your reading efficiently.

**Happy Reading!** 📖

---

**GS BUSANZA School**  
Kigali, Kicukiro District, Rwanda  
*Your Gateway to Knowledge*

Digital Library Management System v2.0  
Last Updated: February 2026
