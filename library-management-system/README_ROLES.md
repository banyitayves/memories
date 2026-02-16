# GS BUSANZA - Library Management System with Role-Based Access Control

## Overview
A comprehensive library management system with role-based access control, featuring four distinct user roles (Admin, Librarian, Staff, Student) with specialized dashboards and CSV import/export functionality.

## Features

### 1. Authentication & Role-Based Access Control

#### User Roles & Permissions

**Admin** - Full system access
- Complete access to all modules
- System user management
- Settings and configuration
- Financial and budget management
- All import/export features

**Librarian** - Library operations management
- Book cataloging and management
- Circulation management
- Patron/member management
- Acquisitions and purchase orders
- Serials management
- Reports and statistics
- CSV import for books and members
- OPAC (public catalog search)

**Staff** - Operational support
- Book cataloging assistance
- Circulation management (checkouts/check-ins)
- OPAC search access
- CSV book imports

**Student** - Student member
- OPAC (catalog search) access only
- View available books
- Check borrowing status

### 2. Demo Credentials

Use these credentials to test different user roles:

```
Admin Account:
Email: admin@library.com
Password: admin123
Role: Admin

Librarian Account:
Email: librarian@library.com
Password: lib123
Role: Librarian

Staff Account:
Email: staff@library.com
Password: staff123
Role: Staff

Student Account:
Email: student@library.com
Password: student123
Role: Student
```

### 3. Role-Specific Dashboards

Each role gets a customized dashboard showing relevant metrics:

- **Admin Dashboard**: System users, system health status
- **Librarian Dashboard**: Reserved items, purchase orders, circulation metrics
- **Staff Dashboard**: Active tasks and items to process
- **Student Dashboard**: Personal borrowing count

### 4. CSV Import/Export Functionality

#### Books Import
- Import multiple books from CSV file
- Required columns: ISBN, Title, Author, Publisher, Category, Quantity, PublicationYear, Language, Description
- Preview imported data before confirming
- Sample CSV file provided: `books_sample.csv`

#### Members Import
- Import multiple library members/patrons from CSV file
- Required columns: FirstName, LastName, Email, Phone, Category, Address, MembershipDays
- Preview imported data before confirming
- Sample CSV file provided: `members_sample.csv`

#### Data Export
- Export all library data as JSON backup
- Useful for data backup and system recovery
- Includes: books, patrons, loans, purchase orders, serials, settings

### 5. Sample CSV Files

Two sample CSV files are included to help you understand the format:

#### books_sample.csv
```
ISBN,Title,Author,Publisher,Category,Quantity,PublicationYear,Language,Description
978-0-06-112008-4,"To Kill a Mockingbird","Harper Lee","J. B. Lippincott","Fiction",5,1960,"English","A gripping tale of racial injustice and childhood innocence"
...
```

#### members_sample.csv
```
FirstName,LastName,Email,Phone,Category,Address,MembershipDays
"John","Doe","john.doe@example.com","+1-555-0101","Student","123 Main St, Springfield",365
...
```

## How to Use Import Features

### Importing Books

1. Login as Admin or Librarian
2. Check that you see "📥 Import Books" button in the sidebar
3. Click the "📥 Import Books" button
4. Click "📥 Download Sample CSV" to download template
5. Fill in your book data following the same format
6. Upload your CSV file
7. Review the preview of data to be imported
8. Click "Import Books" to add all books to the system

### Importing Members

1. Login as Admin or Librarian
2. Click the "📥 Import Members" button in the sidebar
3. Click "📥 Download Sample CSV" to download template
4. Fill in your member data following the same format
5. Upload your CSV file
6. Review the preview of data to be imported
7. Click "Import Members" to add all members to the system

### Exporting Data

1. Click the "📤 Export Data" button (available to all roles)
2. This downloads a JSON file with all your library data
3. Use this for backups or data transfer to another system

## System Modules

### 1. Dashboard
Role-specific overview with key metrics and recent activities

### 2. Book Cataloging
- Add/edit books manually or via CSV import
- Search and filter books
- Manage book status (available, checked out, reserved, missing)
- View quantity and availability

### 3. Circulation Management
- Checkout books to patrons
- Check-in returned books
- Renew existing loans
- View active loans and overdue items
- Track due dates and fines

### 4. OPAC (Public Catalog Search)
- Search books by title, author, or ISBN
- Filter by category and language
- Available to all user roles

### 5. Patron Management
- Register new patrons/members
- Import members via CSV
- Search and filter patrons
- Track patron status and history

### 6. Acquisitions
- Create and manage purchase orders
- Track budget allocation and spending
- Manage vendor relationships
- Monitor book acquisitions

### 7. Serials Management
- Manage journal, magazine, and newspaper subscriptions
- Track serial issues and frequencies
- Manage subscription information

### 8. Reports & Statistics
- Generate circulation reports
- View collection usage statistics
- Access patron activity reports
- Generate financial reports

### 9. Settings
- Configure library name and contact information
- Set checkout duration and fine amounts
- Manage notification preferences
- Select language preferences

## Technical Details

### Data Storage
- All data stored in browser's LocalStorage
- Data persists across sessions
- Can be exported as JSON for backup

### CSV Format Requirements

**Books CSV:**
- ISBN (optional)
- Title (required)
- Author (optional)
- Publisher (optional)
- Category (optional - defaults to "General")
- Quantity (optional - defaults to 1)
- PublicationYear (optional - defaults to current year)
- Language (optional - defaults to "English")
- Description (optional)

**Members CSV:**
- FirstName (required)
- LastName (required)
- Email (optional)
- Phone (optional)
- Category (optional - Student, Staff, Faculty, Guest)
- Address (optional)
- MembershipDays (optional - defaults to 365)

### Role-Based Route Protection
Navigation menu items automatically shown/hidden based on user role:
- Students only see Dashboard and OPAC
- Staff see Dashboard, Cataloging, Circulation, and OPAC
- Librarians have full access except Settings
- Admins have complete system access

## Security Notes

1. This is a demo system using hardcoded users
2. In production, implement proper authentication
3. Use secure password hashing
4. Add role-based API authorization
5. Implement proper access control lists (ACL)

## Troubleshooting

**Import not working?**
- Verify CSV column names match exactly (case-sensitive)
- Ensure required fields are filled
- Check file is in CSV format (not Excel)

**Data not saving?**
- Check browser's LocalStorage is not full
- Try exporting data and clearing storage
- Use a different browser if issues persist

**Can't see menu items?**
- Remember different roles have different access levels
- Try logging in with a different role
- Use demo credentials provided

## Future Enhancements

- Backend server integration
- User management interface for Admins
- Real database support
- Email notifications
- Mobile app
- Advanced reporting with charts
- Digital library features
- Integration with ISBN databases

## Support

For issues or questions about this library management system, please contact your system administrator.

---

**Version**: 2.0 with Role-Based Access & CSV Import
**Last Updated**: 2026
