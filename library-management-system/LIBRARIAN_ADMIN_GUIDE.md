# 📖 Library System - Librarian & Admin Management Guide

## Overview

As a Librarian or Administrator, you have access to all system management features including:
- Viewing and approving/denying borrow requests
- Managing the book catalog
- Tracking patron records
- Monitoring circulation
- Generating reports

---

## Managing Borrow Requests

### Accessing Pending Requests

1. **Login to System**
   ```
   Email: librarian@library.com
   Password: lib123
   Role: Librarian
   ```
   OR
   ```
   Email: admin@library.com
   Password: admin123
   Role: Admin
   ```

2. **Navigate to Requestss**
   - Click **"Circulation"** in the sidebar
   - Look for the **"📤 Pending Borrow Requests"** panel at the bottom
   - You'll see a table with all pending requests

### Understanding the Requests Table

| Column | Information |
|--------|-------------|
| **Requester** | Student/Staff name who requested |
| **Role** | Their role (Student/Staff) |
| **Book** | Title of the book requested |
| **Request Date** | When they submitted the request |
| **Status** | Current status (Pending/Approved/Denied) |
| **Actions** | Approve or Deny buttons |

---

## How to Approve a Borrow Request

### Step 1: Review the Request

Check the following before approving:
- ✓ Is the book available?
- ✓ Does the requester have the right to borrow?
- ✓ Are all their current books returned?
- ✓ Do they have overdue fines?

### Step 2: Click "✓ Approve" Button

1. Find the request in the table
2. Click the **"✓ Approve"** button (green)
3. The system will automatically:
   - Create a patron record if needed
   - Register the book checkout
   - Generate a loan record
   - Set the due date (14 days from today)
   - Decrease available book count

### Step 3: Confirmation

You'll see: **"✓ Borrow request approved! [Student Name] can now collect the book."**

### What Happens Next

- Student/Staff can pick up the book from the library
- Book is marked as "Checked Out"
- Due date is set to 14 days from approval
- Loan appears in "Active Loans" table

---

## How to Deny a Borrow Request

### Step 1: Click "✗ Deny" Button

1. Find the request in the table
2. Click the **"✗ Deny"** button (red)

### Step 2: Provide a Reason

A dialog box will ask: **"Please provide a reason for denying this request:"**

**Common Denial Reasons:**
- "Student has overdue fines that must be paid first"
- "Book is already reserved for another student"
- "Student has reached maximum borrowing limit (5 books)"
- "Student needs to clear previous fines"
- "Book is being processed and not available yet"
- "Request does not meet library policy"

### Step 3: Confirmation

You'll see: **"✗ Borrow request denied. Reason: [Your reason]"**

The system will:
- Mark request as "Denied"
- Store the denial reason
- Update the requests table

---

## Managing the Book Catalog

### Viewing All Books

1. Click **"📚 All Books"** in sidebar
2. See complete inventory:
   - ISBN
   - Title
   - Author
   - Category
   - Publisher
   - Available quantity
   - Total quantity

### Adding New Books

1. Click **"Cataloging"** in sidebar
2. Click **"+ Add New Book"** button
3. Fill in the form:

| Field | Required? | Example |
|-------|-----------|---------|
| ISBN | Optional | 978-0-143-03943-3 |
| Title | ✓ Required | A Man of the People |
| Author | ✓ Required | Chinua Achebe |
| Publisher | Optional | Doubleday |
| Category | Optional | Fiction |
| Quantity | Optional (default 1) | 5 |
| Publication Year | Optional | 1966 |
| Language | Optional | English |
| Description | Optional | Story about politics |

4. Click **"Save Book"**
5. Book appears in catalog

### Editing Books

1. Click **"Cataloging"**
2. Find the book in the table
3. Click **"Edit"** button
4. Modify the information
5. Click **"Save Book"**

### Deleting Books

1. Click **"Cataloging"**
2. Find the book in the table
3. Click **"Delete"** button
4. Confirm deletion

---

## Bulk Import: Adding Multiple Books

### Using CSV Import

1. Click **"📥 Import Books"** in sidebar
2. Click **"📥 Download Sample CSV"** to see the format
3. Prepare your CSV file with these columns:

```
ISBN,Title,Author,Publisher,Category,Quantity,PublicationYear,Language,Description
978-0-143-03943-3,"A Man of the People","Chinua Achebe","Doubleday","Fiction",10,1966,"English","Politics and corruption"
978-0-451-52494-2,"1984","George Orwell","Secker & Warburg","Fiction",5,1949,"English","Dystopian novel"
```

4. Select your CSV file
5. Review the preview (shows first 5 rows)
6. Click **"Import Books"**
7. See confirmation: "Successfully imported X books!"

---

## Managing Patrons/Members

### Viewing All Patrons

1. Click **"Patron Management"** in sidebar
2. See all registered patrons:
   - Name
   - Email
   - Category
   - Status
   - Items Borrowed
   - Fines

### Registering New Patron

1. Click **"Patron Management"**
2. Click **"+ Register New Patron"**
3. Fill in the form:

| Field | Required? |
|-------|-----------|
| First Name | ✓ |
| Last Name | ✓ |
| Email | ✓ |
| Phone | Optional |
| Category | Optional (Student/Staff/Faculty/Guest) |
| Address | Optional |
| Membership Duration | Optional (default 365 days) |

4. Click **"Register Patron"**

### Bulk Import: Adding Multiple Members

1. Click **"📥 Import Members"** in sidebar
2. Click **"📥 Download Sample CSV"** to see format
3. Prepare your CSV file:

```
FirstName,LastName,Email,Phone,Category,Address,MembershipDays
John,Doe,john.doe@example.com,+1-555-0101,Student,123 Main St,365
Jane,Smith,jane.smith@example.com,+1-555-0102,Staff,456 Oak Ave,730
```

4. Select your CSV file
5. Review the preview
6. Click **"Import Members"**
7. See confirmation message

---

## Managing Circulation

### Active Loans

1. Click **"Circulation"** in sidebar
2. Look for **"📋 Active Loans"** table
3. See all current checkouts:
   - Patron name
   - Book title
   - Checkout date
   - Due date
   - Status
   - Actions

### Checking In Books

*(Manual checkout/check-in features available for direct librarian use)*

1. Get the patron's ID or email
2. Enter it in "Patron ID / Email" field
3. Click **"Search Patron"**
4. Get the book's ISBN or title
5. Enter it in "Book ISBN / Title" field
6. Click **"Search Book"**
7. Click **"📥 Check-in"** to return the book
8. Click **"📤 Checkout"** to issue a book

### Handling Overdue Items

Overdue items are shown in:
- Dashboard (Overdue Items section)
- Active Loans table with due dates

**Late Fees:**
- Charged at ₱0.50 per day per item
- Calculated automatically

**Actions:**
1. Contact the patron
2. Remind them to return
3. Calculate fines if applicable
4. Process return when received

---

## Reports & Statistics

### Available Reports

1. Click **"Reports"** in sidebar
2. Choose from:

| Report | Shows |
|--------|-------|
| **Circulation Report** | Checkout/return patterns |
| **Collection Usage** | Most popular books |
| **Patron Activity** | Borrowing statistics |
| **Financial Report** | Budget and spending |

3. Click **"View Report"**
4. Review statistics
5. Click **"Print Report"** to print

---

## System Settings

**Admin Only Feature**

1. Click **"Settings"** in sidebar (Admin only)
2. Configure:

| Setting | Default | Description |
|---------|---------|-------------|
| Library Name | GS BUSANZA | Your library name |
| Checkout Duration | 14 days | How long items can be kept |
| Fine per Day | ₱0.50 | Late fee per item per day |
| Max Items | 5 | Maximum books per patron |
| Email Notifications | Enabled | Send notifications |
| SMS Notifications | Disabled | Send text messages |

3. Update values as needed
4. Click **"Save Settings"**

---

## About the System

### School Information

- **School Name:** GS BUSANZA
- **Location:** Kigali, Kicukiro District, Rwanda
- **Sections:** Nursery, Primary, Secondary

### Leadership

- **Head Teacher:** Mukeshimana Vestine
- **Deputy (Studies):** ZIRIMABAGABO Dismas
- **Librarian:** NSHIMIYIMANA Yves

### Featured Book

**"A Man of the People"** by Chinua Achebe
- 10 copies in library
- Available for all to borrow
- About politics and corruption
- Great for class discussions

---

## Common Tasks Checklist

### Daily Tasks
- [ ] Check pending borrow requests
- [ ] Approve legitimate requests
- [ ] Deny requests with clear reasons
- [ ] Process book returns
- [ ] Monitor overdue items

### Weekly Tasks
- [ ] Review borrowing patterns
- [ ] Check for overdue books
- [ ] Follow up with patrons
- [ ] Update book information if needed

### Monthly Tasks
- [ ] Run circulation reports
- [ ] Check budget spending
- [ ] Update library settings if needed
- [ ] Process patron registrations
- [ ] Analyze collection usage

---

## Troubleshooting

### Issue: Can't see pending requests
**Solution:** Make sure you're logged in as Librarian or Admin, then go to Circulation module

### Issue: Book won't import
**Solution:** Check CSV column names match exactly (case-sensitive)

### Issue: Changed a setting but it didn't save
**Solution:** Make sure to click "Save Settings" button after changes

### Issue: Patron count seems wrong
**Solution:** Re-import patron list or manually register missing patrons

---

## Data Management

### Exporting Data

1. Click **"📤 Export Data"** (visible to all roles)
2. Downloads JSON file with all library data
3. Use for backup or data transfer

### Backup Schedule

- **Recommended:** Export data weekly
- **Critical:** Before major changes
- **Storage:** Keep copies in safe location

---

## System Features

✅ **Role-Based Access**
- Admin: Full system access
- Librarian: Library operations
- Staff: Cataloging and circulation
- Student: Search and request only

✅ **Easy Book Management**
- Manual entry or CSV bulk import
- Quick search and filter
- Track availability

✅ **Request Workflow**
- Students/staff submit requests
- Librarian reviews and approves/denies
- Automatic loan creation on approval

✅ **Circulation Tracking**
- Track active loans
- Calculate overdue fines
- Manage due dates

✅ **Data Safety**
- All data stored locally
- Regular exports for backup
- No data loss

---

## Support & Contact

For system issues or questions:
- Check this guide first
- Ask the system administrator
- Review the About Us page in the system
- **WhatsApp:** 💬 +250 791 756 160 (For more information and support)
- **Hours:** Monday-Friday 7:30 AM - 4:00 PM | Saturday 8:00 AM - 12:00 PM

---

**Version:** 2.0 with Role-Based Access & CSV Import
**Last Updated:** February 2026
**Status:** Ready for Production Use

For questions or feedback, contact:
**Library Manager:** NSHIMIYIMANA Yves
**School:** GS BUSANZA, Kigali, Kicukiro District
