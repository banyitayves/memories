# Library Management System - Quick Start Guide

## What's New in Version 2.0

### ✅ Role-Based Access Control Implemented

Your library system now supports 4 different user roles with customized access and dashboards!

---

## 🚀 Getting Started

### Step 1: Open the System
Open `index.html` in your web browser

### Step 2: Login
Use one of these demo accounts:

**Admin Account:**
- Email: `admin@library.com`
- Password: `admin123`
- Role: `Admin`

**Librarian Account:**
- Email: `librarian@library.com`
- Password: `lib123`
- Role: `Librarian`

**Staff Account:**
- Email: `staff@library.com`
- Password: `staff123`
- Role: `Staff`

**Student Account:**
- Email: `student@library.com`
- Password: `student123`
- Role: `Student`

---

## 📊 User Roles Overview

### 👨‍💼 Admin
- **Full System Access**
- Can access all modules and settings
- View system health
- Manage all library operations

**Visible Menu:**
- Dashboard
- Cataloging
- Circulation
- OPAC (Search)
- Patron Management
- Acquisitions
- Serials
- Reports
- Settings

---

### 👨‍💼 Librarian
- **Library Operations Manager**
- Full access to library operations (except Settings)
- Can import books and members
- Manage acquisitions and budgets

**Visible Menu:**
- Dashboard
- Cataloging
- Circulation
- OPAC (Search)
- Patron Management
- Acquisitions
- Serials
- Reports

**Import/Export Features:**
- 📥 Import Books (from CSV)
- 📥 Import Members (from CSV)
- 📤 Export Data (as JSON)

---

### 👨‍💼 Staff
- **Operational Support**
- Can perform circulation tasks
- Assist with cataloging
- Can import books

**Visible Menu:**
- Dashboard
- Cataloging
- Circulation
- OPAC (Search)

**Import/Export Features:**
- 📥 Import Books (from CSV)
- 📤 Export Data (as JSON)

---

### 👨 Student
- **Limited Access (Read-Only)**
- Can only search the library catalog
- View available books

**Visible Menu:**
- Dashboard
- OPAC (Search)

---

## 📥 How to Import Books

### Option 1: Using Sample Data

1. Login as **Librarian** or **Admin**
2. Look for **📥 Import Books** button in the left sidebar
3. Click the button to open import dialog
4. Click **📥 Download Sample CSV** link
5. This downloads `books_sample.csv`
6. Click "Choose File" and select the downloaded file
7. Preview the data
8. Click **Import Books** button

### Option 2: Import Your Own Books

1. Prepare a CSV file with columns:
   - ISBN
   - Title
   - Author
   - Publisher
   - Category
   - Quantity
   - PublicationYear
   - Language
   - Description

2. Open the Import Books dialog
3. Select your CSV file
4. Review the preview
5. Click Import

**See `books_sample.csv` for exact format**

---

## 👥 How to Import Members

### Option 1: Using Sample Data

1. Login as **Librarian** or **Admin**
2. Look for **📥 Import Members** button in the left sidebar
3. Click the button to open import dialog
4. Click **📥 Download Sample CSV** link
5. This downloads `members_sample.csv`
6. Click "Choose File" and select the downloaded file
7. Preview the data
8. Click **Import Members** button

### Option 2: Import Your Own Members

1. Prepare a CSV file with columns:
   - FirstName
   - LastName
   - Email
   - Phone
   - Category (Student, Staff, Faculty, Guest)
   - Address
   - MembershipDays

2. Open the Import Members dialog
3. Select your CSV file
4. Review the preview
5. Click Import

**See `members_sample.csv` for exact format**

---

## 💾 How to Export Data

1. Click **📤 Export Data** button (available to all roles)
2. This downloads a JSON file with all library data:
   - All books
   - All members/patrons
   - All loans/checkouts
   - Purchase orders
   - Serials/Subscriptions
   - Settings

3. Use this file for:
   - Data backup
   - System migration
   - Data sharing

---

## 🔄 Role-Specific Dashboards

Each role sees a customized dashboard with relevant information:

### Admin Dashboard Shows:
- Total Books
- Checked Out Items
- Available Books
- Total Patrons
- System Users Count
- System Health Status

### Librarian Dashboard Shows:
- Total Books
- Checked Out Items
- Available Books
- Total Patrons
- Reserved Items Count
- Purchase Orders Count

### Staff Dashboard Shows:
- Total Books
- Checked Out Items
- Available Books
- Total Patrons
- Tasks to Process

### Student Dashboard Shows:
- Dashboard greeting
- My Borrowings count
- Available Books
- Total Patrons

---

## 🗂️ File Structure

```
library-management-system/
├── index.html              # Main application file
├── script.js               # JavaScript with authentication & CSV import
├── styles.css              # Stylesheets including login page
├── books_sample.csv        # Sample books for import
├── members_sample.csv      # Sample members for import
├── README_ROLES.md         # Detailed documentation
└── QUICK_START.md          # This file
```

---

## 🔐 Security Notes

⚠️ **This is a Demo System**

- Credentials are hardcoded for demo purposes
- Data stored in browser's LocalStorage (not encrypted)
- For production use, implement:
  - Secure backend authentication
  - Database encryption
  - HTTPS connection
  - Proper access control
  - Audit logging

---

## 📋 CSV File Requirements

### Books CSV Format:
```
ISBN,Title,Author,Publisher,Category,Quantity,PublicationYear,Language,Description
978-0-06-112008-4,"To Kill a Mockingbird","Harper Lee","J. B. Lippincott","Fiction",5,1960,"English","Description here"
```

**Required Columns:**
- Title ✓ (Required)

**Optional Columns:**
- ISBN, Author, Publisher, Category, Quantity, PublicationYear, Language, Description

### Members CSV Format:
```
FirstName,LastName,Email,Phone,Category,Address,MembershipDays
"John","Doe","john@example.com","+1-555-0101","Student","123 Main St",365
```

**Required Columns:**
- FirstName ✓ (Required)
- LastName ✓ (Required)

**Optional Columns:**
- Email, Phone, Category, Address, MembershipDays

---

## ❓ Troubleshooting

**Q: I see a blank dashboard**
- A: Try refreshing the page or clearing browser cache

**Q: Import button is not visible**
- A: You may need to login as Librarian or Admin

**Q: CSV file won't import**
- A: Check column names match exactly (case-sensitive)
- Ensure required fields have values
- File must be in CSV format (not XLSX)

**Q: Data disappeared after refresh**
- A: Export your data first using the Export button
- This is a browser-based system; clearing cache removes data

**Q: Logout not working**
- A: Confirmation dialog may be hidden; check your screen
- Try refreshing if it's not responding

---

## 🎯 Next Steps

1. ✅ Login with different roles to see how access changes
2. ✅ Download and import sample books
3. ✅ Download and import sample members
4. ✅ Try creating new books and members manually
5. ✅ Test checkout/check-in functionality
6. ✅ Export your data for backup
7. ✅ Explore reports and statistics

---

## 📞 Support

For detailed information about roles and features, see:
- `README_ROLES.md` - Complete feature documentation
- `README.md` - Original system documentation

---

**Happy Library Managing! 📚**
