# GS BUSANZA - Library Management System

A comprehensive, open-source library management system built with HTML, CSS, and JavaScript. Designed for schools and educational institutions, this system supports international standards and provides a complete solution for managing library operations.

## Features

### 📚 Core Modules

#### 1. **Cataloging**
- Add, edit, and delete books
- Support for ISBN and MARC-style metadata
- Multi-language support (English, French, Spanish)
- Batch editing capabilities
- Status tracking (available, checked-out, reserved, missing)
- Category organization (Fiction, Non-Fiction, Science, History, Technology, Reference, Children)
- Publication year and publisher tracking

#### 2. **Circulation Management**
- **Checkout/Check-in**: Quick patron and book search with instant checkout
- **Loan Management**: Track active loans with checkout and due dates
- **Renewals**: Support for up to 3 renewals per item
- **Automatic Fine Calculation**: Calculate overdue fines automatically
- **Multiple Items**: Configurable maximum items per patron
- Offline mode capable (browser-based storage)

#### 3. **Online Public Access Catalog (OPAC)**
- Mobile-responsive search interface
- Search by title, author, or ISBN
- Filter by category and language
- Real-time availability status
- Beautiful book result cards
- Patron hold requests (notifications)

#### 4. **Patron Management**
- Register new patrons with full details
- Categories: Student, Staff, Faculty, Guest
- Track membership expiry dates
- View borrowing history
- Monitor fines and fees
- Automatic fine calculation

#### 5. **Acquisitions & Budget Management**
- Create and track purchase orders (POs)
- Vendor management
- Annual budget tracking
- Real-time budget utilization reports
- EDI-ready for vendor integration
- Item-level purchase tracking

#### 6. **Serials Management**
- Track journals, magazines, newspapers, and newsletters
- Subscription management
- Frequency tracking (Daily, Weekly, Monthly, Quarterly, Annual)
- Issue prediction patterns
- Vendor association
- Flexible notes and documentation

#### 7. **Reports & Statistics**
- **Circulation Report**: Checkout and return statistics
- **Collection Usage**: Top books and categories by usage
- **Patron Activity**: Member borrowing patterns
- **Financial Report**: Budget and acquisition spending
- Custom report generation with SQL-like capabilities

#### 8. **Settings & Configuration**
- Library name and contact information
- Configurable checkout duration
- Fine amount per day
- Maximum items per patron
- Email/SMS notification settings
- Language preferences
- Multi-language interface support

### 💾 Data Management
- **Export Data**: Full backup in JSON format
- **Import Data**: Restore from previous backups
- **Local Storage**: All data stored in browser (no server needed)
- **Global Search**: Quick search across all modules

## Technical Features

### Standards Support
- ISBN compliance
- Category Dewey-like classification system
- International language support (40+ languages capable)

### System Architecture
- **Frontend Only**: No backend required for basic operations
- **Browser Storage**: localStorage for persistent data
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Professional, intuitive interface

### Security & Privacy
- Client-side data storage (no cloud sync required)
- Local backup and restore capabilities
- Session-based user management

## Getting Started

### Installation
1. Extract or clone the library management system files
2. Open `index.html` in a modern web browser
3. No server or installation required!

### Quick Start

#### Adding Books
1. Click "Cataloging" in the sidebar
2. Click "+ Add New Book"
3. Fill in book details (Title, Author, ISBN required)
4. Click "Save Book"

#### Registering Patrons
1. Click "Patron Management"
2. Click "+ Register New Patron"
3. Enter patron information and category
4. Click "Register Patron"

#### Checking Out Books
1. Click "Circulation"
2. Search for a patron by ID or email
3. Search for a book by ISBN or title
4. Click "Checkout"
5. System automatically calculates due date

#### Searching the Catalog
1. Click "Search OPAC"
2. Enter search term (title, author, or ISBN)
3. Filter by category or language
4. View availability and item details

### Configuration
Visit the "Settings" module to configure:
- Library name and contact info
- Checkout duration (default: 14 days)
- Fine per day (default: $0.50)
- Maximum items per patron (default: 5)
- Notification preferences
- Language preference

## Data Structure

### Books
```
{
  id: unique identifier,
  isbn: ISBN number,
  title: book title,
  author: author name,
  publisher: publisher name,
  category: book category,
  quantity: number of copies,
  pubYear: publication year,
  language: book language,
  description: book description,
  status: current status,
  dateAdded: when added to catalog
}
```

### Patrons
```
{
  id: unique identifier,
  firstName: patron first name,
  lastName: patron last name,
  email: patron email,
  phone: patron phone,
  category: patron category (Student/Staff/Faculty/Guest),
  address: patron address,
  membershipDate: registration date,
  membershipExpiry: membership expiry date,
  status: patron status
}
```

### Loans
```
{
  id: unique identifier,
  patronId: patron ID,
  bookId: book ID,
  checkoutDate: checkout date,
  dueDate: due date,
  returnDate: return date (null if not returned),
  renewCount: number of renewals
}
```

## Features by Module

| Module | Features |
|--------|----------|
| **Dashboard** | Stats cards, recent checkouts, overdue alerts |
| **Cataloging** | Add/Edit/Delete books, search, filter by status |
| **Circulation** | Checkout, check-in, renewals, fine tracking |
| **OPAC** | Public search, availability check, holds |
| **Patrons** | Registration, categories, borrowing history |
| **Acquisitions** | PO creation, budget tracking, vendor management |
| **Serials** | Subscription tracking, frequency management |
| **Reports** | Circulation, usage, patron activity, financial |
| **Settings** | System configuration, preferences, language |

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Requires localStorage support

## Data Storage

All data is stored locally in your browser using localStorage. This means:
- ✅ No internet required for basic operations
- ✅ All data stays on your device
- ✅ Regular backups recommended (use Export feature)
- ⚠️ Clearing browser data will erase library data
- ⚠️ Different browsers/devices maintain separate databases

## Backup & Recovery

### Creating Backups
1. Click the "📥 Export Data" button in the sidebar
2. A JSON file will be downloaded automatically
3. Store in a safe location

### Restoring from Backup
1. Click the "📤 Import Data" button
2. Select the previously exported JSON file
3. Data will be restored

## Tips for Effective Use

1. **Regular Backups**: Export your data weekly
2. **Patron Categories**: Use appropriate categories for accurate reporting
3. **Fine Management**: Set appropriate fine rates in settings
4. **Overdue Monitoring**: Check dashboard regularly for overdue items
5. **Report Generation**: Use monthly reports for decision making

## Customization

The system is fully customizable:
- Edit HTML for layout changes
- Modify CSS (styles.css) for branding
- Update JavaScript for additional features
- Add new categories and options

## Known Limitations

- Single-device operation (no cloud sync)
- Limited to browser storage capacity (~5-10MB)
- No user authentication built-in
- No multi-user conflict resolution

## System Requirements

- Modern web browser with localStorage support
- ~10MB available browser storage
- No server required
- No database software needed

## License

This system is open-source and can be freely modified and distributed for educational use at GS BUSANZA and similar institutions.

## Future Enhancements

Planned features for future versions:
- Cloud backup integration
- Email notifications for due dates
- Barcode scanning support
- RFID integration
- Advanced analytics with charts
- Multi-user support with authentication
- API for third-party integrations
- Mobile app version

## Support

For questions or issues:
1. Check the inline form validation
2. Review exported data for corruption
3. Try clearing cache and reimporting backups
4. Verify browser JavaScript is enabled

## Version Info

**Current Version**: 1.0  
**Last Updated**: February 2026  
**Institution**: GS BUSANZA School Library

---

**Happy Library Management! 📚**
