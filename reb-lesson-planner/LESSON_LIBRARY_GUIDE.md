# 📂 Lesson Library Feature - Complete Guide

## Overview

The **Lesson Library** is a new feature that allows teachers to:
- 📚 View all their saved and AI-generated lesson plans in one place
- 📥 Load any lesson plan to continue editing
- 📄 Download lesson plans in professional REB format PDF
- 🔍 Search and filter lesson plans
- 🗑️ Delete lesson plans they no longer need

## Features

### 1. Lesson Library View
- Accessible from sidebar: **"📂 My Lessons"**
- Displays all lesson plans the teacher has created
- Shows lesson information on cards:
  - Lesson title
  - Subject and class
  - Duration
  - Teacher name
  - School name
  - Creation date
  - Type badge (AI Generated or Manual)

### 2. Search Functionality
- **Search by title or subject** in the library
- Real-time search as you type
- Filters cards instantly

### 3. Filter by Type
- **All Plans** - Shows all lessons
- **AI Generated** - Only shows lessons created using AI generation
- **Manually Created** - Only shows lessons created manually

### 4. Lesson Card Actions

Each lesson card has 3 action buttons:

#### 📂 Load Button
- Loads the lesson plan into the editor
- Populates all form fields
- Switches to "Basic Info" section for quick editing
- Perfect for continuing work on a lesson

#### 📄 PDF Button
- Downloads the lesson in REB-formatted PDF
- Includes:
  - School information
  - Student details (Term, Unit, Lesson numbers)
  - Unit information
  - Teaching activities (Introduction, Development, Conclusion)
  - Assessment methods
  - References
  - Teacher self-evaluation
  - Special needs notes
- Professional formatting matching REB standards

#### 🗑️ Delete Button
- Permanently removes the lesson plan
- Asks for confirmation before deleting
- Cannot be undone

## How to Use

### View Your Lesson Plans
1. Click **"📂 My Lessons"** in the left navigation
2. See all your saved lesson plans as cards
3. Lesson cards show:
   - 📌 Lesson title
   - 🏫 Subject & Class
   - ⏱️ Duration
   - 👨‍🏫 Teacher & School
   - 📅 Created date
   - 🏷️ Type badge (AI or Manual)

### Search for a Lesson
1. In the library, use the **Search box** (top)
2. Type lesson title or subject
3. Results filter in real-time
4. Clear the search to see all lessons again

### Filter by Type
1. Use the **dropdown filter** next to search box
2. Select:
   - "All Plans" - See everything
   - "AI Generated" - Only AI-created lessons
   - "Manually Created" - Only manual lessons
3. Cards update instantly

### Load a Lesson to Edit
1. Find the lesson you want to edit
2. Click **"📂 Load"** button
3. Lesson opens in the editor
4. Make changes as needed
5. Click **"💾 Save Plan"** to save changes

**Note:** Loading an existing lesson and saving again creates a NEW lesson entry (doesn't overwrite the original).

### Download a Lesson as PDF
1. Find the lesson in library
2. Click **"📄 PDF"** button
3. Browser downloads the PDF file
4. File name: "{Lesson Title}.pdf"
5. Open in any PDF viewer

### The REB Format PDF Includes:

```
┌─────────────────────────────────────────┐
│          LESSON PLAN HEADER             │
│  School Name | Date | Teacher Name      │
├─────────────────────────────────────────┤
│  LESSON INFORMATION TABLE                │
│  Term | Unit # | Lesson # | Duration    │
├─────────────────────────────────────────┤
│  UNIT DETAILS                           │
│  - Special needs                        │
│  - Unit title                           │
│  - Subject & Class                      │
│  - Key competencies                     │
│  - Number of lessons                    │
├─────────────────────────────────────────┤
│  INSTRUCTIONAL OBJECTIVE                │
│  [Detailed learning objective]          │
├─────────────────────────────────────────┤
│  LESSON DELIVERY & ACTIVITIES           │
│  Introduction | Development | Conclusion│
│  ├─ Teacher activities                  │
│  └─ Learner activities                  │
├─────────────────────────────────────────┤
│  ASSESSMENT METHODS                     │
│  ├─ Formative                           │
│  └─ Summative                           │
├─────────────────────────────────────────┤
│  TEACHING & LEARNING REFERENCES         │
│  - Textbooks                            │
│  - Curriculum documents                 │
├─────────────────────────────────────────┤
│  TEACHER SELF-EVALUATION                │
│  [Teacher remarks]                      │
├─────────────────────────────────────────┤
│  SPECIAL NEEDS / INCLUSIVE EDUCATION    │
│  [Inclusive notes]                      │
└─────────────────────────────────────────┘
```

### Delete a Lesson
1. Find the lesson in library
2. Click **"🗑️ Delete"** button
3. Confirm deletion in popup
4. Lesson is removed permanently
5. Lesson library updates automatically

## Lesson Card Information

Each lesson card shows:

| Item | Meaning |
|------|---------|
| **Title** | The lesson/unit title |
| **Subtitle** | Subject and Class/Grade |
| **Type Badge** | 🎬 AI Generated (green) or 📝 Manual (blue) |
| **Duration** | Length of lesson in minutes |
| **Teacher** | Teacher who created it (usually you) |
| **Created Date** | When the lesson was created |
| **School** | School the lesson is for |

## Important Notes

### Auto-Save Not Included
- The library does NOT auto-save
- Click **"💾 Save Plan"** to save lessons
- Closing the page without saving loses changes

### Loading & Re-saving
- Loading a lesson and saving it creates a **new entry**
- Original lesson plan remains unchanged
- Use **"📂 Load → Edit → Save"** to create multiple versions

### PDF Download Format
- PDFs are formatted according to **REB standards**
- All fields from your lesson are included
- Professional layout suitable for printing
- Includes generated date/time at bottom

### Search & Filter Tips
- Search is **case-insensitive**
- Searches both title and subject
- Filter works with search (combine both)
- Clearing search shows all (respecting filter)

### Storage Limit
- Browser localStorage has ~5-10MB limit
- Approximately ~100-200 lessons before full
- Clear old lessons if running out of space

## Common Issues

| Problem | Solution |
|---------|----------|
| Lessons not showing | Go to "📂 My Lessons" section |
| Can't find lesson | Use search box to find by title |
| PDF won't download | Check file download settings in browser |
| Lesson disappears after delete | Reload page to refresh library |
| Too many lessons | Delete old ones to free space |

## Workflow Example

### Scenario: Create & Save a Lesson

**Step 1: Generate with AI**
```
1. Click "⚡ AI Generate"
2. Fill in: Title, Subject, Class, Duration, Objective
3. Click "🤖 Generate"
4. Review and click "📥 Use This Plan"
```

**Step 2: Customize (Optional)**
```
1. Click "📋 Basic Info"
2. Fill in school name, teacher name, etc.
3. Click "🎯 Lesson Details"
4. Add unit info and lesson topics
5. Click "✏️ Activities"
6. Customize teaching activities
```

**Step 3: Save to Library**
```
1. Click "💾 Save Plan" (left sidebar)
2. See success toast notification
3. Lesson appears in "📂 My Lessons"
4. Shows as "AI Generated" type
```

**Step 4: Download**
```
1. Go to "📂 My Lessons"
2. Find your lesson
3. Click "📄 PDF"
4. File downloads automatically
```

## Feature Architecture

### Data Storage
```
localStorage['reb_lessonPlans'] = [
  {
    id: "unique_id_12345",
    userId: "teacher_user_id",
    unitTitle: "Fractions",
    subject: "Mathematics",
    class: "Primary 5",
    duration: "45",
    teacherName: "John Doe",
    schoolName: "Example School",
    timestamp: "2024-01-15T10:30:00Z",
    aiGenerated: true,  // ← Marks if AI-created
    ... (rest of lesson data)
  },
  ...
]
```

### Functions Used
- `loadLessonLibrary()` - Loads all lessons from storage
- `createLessonCard()` - Creates the visual card
- `loadLessonToEdit()` - Loads a lesson into editor
- `downloadLessonREB()` - Downloads lesson as PDF
- `deleteLessonPlan()` - Deletes a lesson
- `searchLessonLibrary()` - Searches lessons
- `filterLessonLibrary()` - Filters by type

## Tips & Best Practices

✅ **DO:**
- Download important lessons regularly
- Use descriptive lesson titles
- Save frequently while editing
- Search if you have many lessons
- Delete old lessons to save space

❌ **DON'T:**
- Rely only on browser storage (no backup)
- Create too many similar lessons
- Close page without saving
- Expect PDF downloads to auto-open (browser dependent)

## Integration with Other Features

### With AI Generation
- AI-generated lessons automatically marked in library
- Type badge shows: 🎬 AI Generated
- Easy to find all AI-created lessons

### With Authentication
- Lessons stored per-user
- Only your lessons show in your library
- Teachers can't see other teachers' lessons
- Admin can see all lessons across system

### With Multi-Language
- Library interface changes with language selection
- Search works in any language
- PDF exports in current language

## Future Enhancements (Optional)

Possible improvements for future versions:
- [ ] Sort lessons (by date, name, subject)
- [ ] Tags/categories for organization
- [ ] Export multiple lessons at once
- [ ] Lesson sharing with other teachers
- [ ] Version history/duplicate lessons
- [ ] Lesson templates
- [ ] Backup to cloud storage
- [ ] Schedule lesson for specific date

---

**Lesson Library makes it easy to manage your lesson plans!** 📂✨

For more help, see the main QUICKSTART.md or README_COMPLETE.md files.
