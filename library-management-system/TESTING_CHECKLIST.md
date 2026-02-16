# ✅ Library Management System - Testing Checklist

## Complete Verification of All Features

---

## Authentication & Login

### Test: Student Login
- [ ] Open system in browser
- [ ] See login page with email, password fields
- [ ] Enter: `student@school.com` / `student123`
- [ ] Click Login
- [ ] ✓ Dashboard displays (should say "Dashboard - Student")
- [ ] ✓ Sidebar shows student-specific menu items only

### Test: Staff Login
- [ ] Login with: `staff@school.com` / `staff123`
- [ ] ✓ Dashboard displays (should say "Dashboard - Staff")
- [ ] ✓ Sidebar shows staff-specific menu items

### Test: Librarian Login
- [ ] Login with: `librarian@library.com` / `lib123`
- [ ] ✓ Dashboard displays (should say "Dashboard - Librarian")
- [ ] ✓ Can see Circulation and Patron Management

### Test: Admin Login
- [ ] Login with: `admin@library.com` / `admin123`
- [ ] ✓ Dashboard displays (should say "Dashboard - Admin")
- [ ] ✓ Can see all menu items including Settings

### Test: Invalid Login
- [ ] Enter wrong email or password
- [ ] ✓ See error message
- [ ] ✓ Cannot proceed

---

## Book Discovery - Student/Staff

### Test: All Books View (Student)
1. Login as student
2. Click **"📚 All Books"** in sidebar
3. [ ] ✓ Table displays with all books
4. [ ] ✓ Shows: Title, Author, Category, Quantity, Available
5. [ ] ✓ Can see "A Man of the People" in list
6. [ ] ✓ "Request to Borrow" buttons visible for available books

### Test: Search All Books
1. In "📚 All Books" module
2. Scroll to top, find search box
3. [ ] Type: "A Man"
4. [ ] ✓ See only "A Man of the People" in results
5. [ ] Type: "Achebe"
6. [ ] ✓ See only "A Man of the People" in results

### Test: Filter by Category
1. In "📚 All Books" module
2. Find category dropdown
3. [ ] Select "Fiction"
4. [ ] ✓ See only fiction books
5. [ ] Select "All Categories"
6. [ ] ✓ See all books again

### Test: OPAC Search (Student)
1. Click **"Search OPAC"** in sidebar
2. [ ] ✓ See books listed automatically
3. [ ] Type in search: "1984"
4. [ ] ✓ See only "1984" by George Orwell
5. [ ] ✓ "Request to Borrow" button visible

---

## Book Borrowing Workflow

### Test: Submit Borrow Request
1. Login as **student**
2. Click "📚 All Books"
3. Find "A Man of the People"
4. Click **"📤 Request to Borrow"** button (green)
5. [ ] ✓ Modal dialog appears titled "Request to Borrow"
6. [ ] ✓ Form shows:
   - Book title: "A Man of the People"
   - Your Email: "student@school.com"
   - Your Role: "student"
   - Reason field (empty text area)
7. [ ] Enter reason: "For class discussion"
8. [ ] Click **"✓ Submit Request"** button
9. [ ] ✓ Success message appears: "Borrow request submitted successfully!"
10. [ ] ✓ Modal closes

### Test: Submit Another Request (Different Book - Staff)
1. Logout and login as staff: `staff@school.com` / `staff123`
2. Click "📚 All Books"
3. Find "1984"
4. Click **"📤 Request to Borrow"**
5. [ ] ✓ Form appears with staff email
6. [ ] Enter reason: "Personal reading"
7. [ ] Submit
8. [ ] ✓ Success message appears

---

## Librarian Review & Approval

### Test: View Pending Requests (Librarian)
1. Logout, login as librarian: `librarian@library.com` / `lib123`
2. Click **"Circulation"** in sidebar
3. Scroll down to **"📤 Pending Borrow Requests"** section
4. [ ] ✓ Table displays with 2 pending requests:
   - Row 1: Student name, "A Man of the People"
   - Row 2: Staff name, "1984"
5. [ ] ✓ Both show status: "pending"
6. [ ] ✓ Each has "✓ Approve" and "✗ Deny" buttons

### Test: Approve First Request
1. In Pending Borrow Requests table
2. Find student's request for "A Man of the People"
3. Click **"✓ Approve"** button
4. [ ] ✓ Success message: "Borrow request approved!"
5. [ ] ✓ Status changes to "approved"
6. [ ] ✓ Request moves out of pending (or shows as approved)

### Test: Deny Second Request
1. Find staff's request for "1984"
2. Click **"✗ Deny"** button
3. [ ] ✓ Dialog asks: "Please provide a reason for denying this request:"
4. [ ] Enter reason: "Student has reached borrowing limit"
5. [ ] Click OK/Confirm
6. [ ] ✓ Success message: "Borrow request denied"
7. [ ] ✓ Status changes to "denied"

---

## Student Collects Approved Book

### Test: Verify Approval (Student)
1. Logout, login as student again
2. System should show notification or indication that request was approved
3. Student goes to library to collect book
4. [ ] ✓ Book is ready for pickup
5. [ ] ✓ Librarian confirms the approval

### Test: Verify Denial (Staff)
1. Logout, login as staff
2. System should show notification or indication that request was denied with reason
3. [ ] ✓ Reason visible: "Student has reached borrowing limit"
4. [ ] Can submit new request for different book

---

## Book Catalog Management (Admin/Librarian)

### Test: View Cataloging Module
1. Login as admin or librarian
2. Click **"Cataloging"** in sidebar
3. [ ] ✓ Table shows all books with columns:
   - ISBN, Title, Author, Publisher, Category, Quantity, Published Year, Language

### Test: Add New Book Manually
1. In Cataloging module
2. Scroll to "Add New Book" form
3. [ ] Fill in:
   - Title: "The Great Gatsby"
   - Author: "F. Scott Fitzgerald"
   - Category: "Fiction"
   - Quantity: 3
4. [ ] Click "✓ Add Book"
5. [ ] ✓ Success message
6. [ ] ✓ Book appears in table

### Test: Edit Existing Book
1. Find "A Man of the People" in table
2. Click "Edit" button
3. [ ] Form loads with current data
4. [ ] Change quantity from 10 to 15
5. [ ] Click "✓ Save Changes"
6. [ ] ✓ Updates in table

### Test: Delete a Book
1. Find test book in table
2. Click "Delete" button
3. [ ] Confirm deletion dialog appears
4. [ ] Click "Yes, Delete"
5. [ ] ✓ Book removed from table

---

## CSV Import - Books

### Test: Download Sample CSV
1. Click **"📥 Import Books"** button/menu
2. [ ] See "📥 Download Sample CSV" link
3. [ ] Click it
4. [ ] ✓ File downloaded: `books_sample.csv`
5. [ ] ✓ File opens and shows book columns

### Test: Preview Import
1. In Import Books section
2. Select the **books_sample_extended.csv** file
3. [ ] ✓ Preview shows first 5 books
4. [ ] ✓ Shows all columns correctly

### Test: Import Books
1. After preview, click **"Import Books"** button
2. [ ] ✓ Loading indicator shows
3. [ ] ✓ Success message: "Successfully imported X books!"
4. [ ] Check Cataloging table
5. [ ] ✓ New books appear (should see titles from extended CSV)

---

## CSV Import - Members

### Test: Download Sample Members CSV
1. Click **"📥 Import Members"** button/menu
2. [ ] See "📥 Download Sample CSV" link
3. [ ] Click it
4. [ ] ✓ File downloaded: `members_sample.csv`

### Test: Preview Members Import
1. Select **members_sample.csv** file
2. [ ] ✓ Preview shows first 5 members
3. [ ] ✓ All columns visible

### Test: Import Members
1. After preview, click **"Import Members"** button
2. [ ] ✓ Success message
3. [ ] Click "Patron Management"
4. [ ] ✓ New patrons appear in list

---

## Patron Management (Admin/Librarian Only)

### Test: Patron Management Visibility
1. Login as student
2. [ ] ✓ "Patron Management" NOT visible in sidebar
3. Logout, login as admin
4. [ ] ✓ "Patron Management" IS visible in sidebar

### Test: View All Patrons
1. Click **"Patron Management"**
2. [ ] ✓ Table shows all patrons with:
   - Name, Email, Phone, Category, Status, Items Borrowed, Fines

### Test: Register New Patron
1. Scroll to register form
2. [ ] Fill in:
   - First Name: "James"
   - Last Name: "Brown"
   - Email: "james@school.com"
   - Category: "Student"
3. [ ] Click "✓ Register Patron"
4. [ ] ✓ New patron appears in table

---

## Dashboard & Statistics

### Test: Student Dashboard
1. Login as student
2. [ ] ✓ Shows role: "Student"
3. [ ] ✓ Shows relevant cards (e.g., You have 0 active loans)
4. [ ] ✓ Shows featured book info

### Test: Librarian Dashboard
1. Login as librarian
2. [ ] ✓ Shows role: "Librarian"
3. [ ] ✓ Shows statistics (total books, active loans, pending requests)
4. [ ] ✓ Shows pending requests count

### Test: Admin Dashboard
1. Login as admin
2. [ ] ✓ Shows role: "Admin"
3. [ ] ✓ Shows complete system statistics
4. [ ] ✓ Shows all relevant metrics

---

## About Page

### Test: View About Us
1. Click **"About Us"** in sidebar
2. [ ] ✓ Page shows school information
3. [ ] ✓ Shows: "GS BUSANZA"
4. [ ] ✓ Shows location: "Kigali, Kicukiro District"
5. [ ] ✓ Shows leadership:
   - Head Teacher: Mukeshimana Vestine
   - Deputy (Studies): ZIRIMABAGABO Dismas
   - Librarian: NSHIMIYIMANA Yves
6. [ ] ✓ Shows system features list

---

## Data Export & Backup

### Test: Export Data
1. Look for **"📤 Export Data"** button (should be visible to all)
2. [ ] Click it
3. [ ] ✓ Download starts for JSON file
4. [ ] ✓ File contains all books, patrons, loans data

---

## Error Handling

### Test: Duplicate ISBN
1. Try adding a book with existing ISBN
2. [ ] System either prevents or warns about duplicate

### Test: Missing Required Fields
1. Try adding book without title
2. [ ] ✓ Error message: "Title is required"

### Test: Invalid Email Format
1. Try registering patron with invalid email
2. [ ] ✓ Error or warning shown

### Test: Negative Quantity
1. Try adding book with -5 quantity
2. [ ] ✓ System prevents or warns

---

## Browser Compatibility

### Test: Chrome
- [ ] All features work
- [ ] No console errors

### Test: Firefox
- [ ] All features work
- [ ] No console errors

### Test: Safari
- [ ] All features work
- [ ] No console errors

### Test: Edge
- [ ] All features work
- [ ] No console errors

---

## Complex Workflows

### Test: Complete End-to-End Borrow Workflow
1. **Student Action:** Request "Things Fall Apart"
   - [ ] Request submitted
2. **Librarian Action:** View and approve request
   - [ ] Sees request in Circulation
   - [ ] Clicks Approve
   - [ ] [ ] ✓ Loan created
3. **Verify:** Book availability decreases
   - [ ] Check "📚 All Books"
   - [ ] "Things Fall Apart" available count decreased by 1
   - [ ] [ ] ✓ Student can see active loan

### Test: Deny a Request Workflow
1. **Student Action:** Request "1984"
2. **Librarian Action:** Deny with reason
   - [ ] Click Deny
   - [ ] [ ] ✓ Provide reason
3. **Verify:** Request shows as denied
   - [ ] [ ] ✓ Status changes in table

### Test: Multiple Students, Same Book
1. **Student 1:** Request book X
2. **Student 2:** Request same book X
3. **Librarian:** Approve both
4. [ ] ✓ First student gets first copy
5. [ ] ✓ Second student gets second copy (if quantity allows)

---

## Performance

### Test: Large Dataset
1. Import both sample CSVs (30 books, 10+ patrons)
2. [ ] ✓ System remains responsive
3. [ ] [ ] Tables display quickly
4. [ ] Search/filter works smoothly

### Test: Page Load Speed
1. [ ] First page load: < 3 seconds
2. [ ] Module switching: < 1 second
3. [ ] Search results: < 1 second

---

## Data Persistence

### Test: LocalStorage
1. Add a book
2. [ ] Refresh page (F5)
3. [ ] ✓ Book still there (data persisted)
4. [ ] Make another change
5. [ ] Refresh
6. [ ] ✓ Change persisted

### Test: Multiple Tabs
1. Open system in Tab 1
2. Open system in Tab 2
3. Add book in Tab 1
4. [ ] Refresh Tab 2
5. [ ] ✓ New book appears in Tab 2

---

## Accessibility

### Test: Keyboard Navigation
1. [ ] Tab through all buttons
2. [ ] [ ] ✓ All buttons accessible
3. [ ] Press Enter on focused button
4. [ ] [ ] ✓ Action triggers

### Test: Color Contrast
1. [ ] Buttons readable
2. [ ] [ ] ✓ Text has good contrast
3. [ ] Status colors meaningful (not color-only)

---

## Summary Score

Total Checks: ____  
Passed: ____  
Failed: ____  
Success Rate: ____ %

### Pass Criteria
- [ ] ✅ 95%+ features working
- [ ] ✅ No blocking errors
- [ ] ✅ All workflows functional
- [ ] ✅ Data persists correctly

### Status:
- [ ] ✅ READY FOR PRODUCTION
- [ ] ⚠️ NEEDS FIXES
- [ ] ❌ NOT READY

---

**Test Date:** ___________  
**Tester Name:** ___________  
**Notes:**

```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

**System Version:** 2.0 with Role-Based Access & CSV Import  
**Last Updated:** February 2026
