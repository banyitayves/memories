
# 🎓 REB AI Lesson Plan Generator - Complete Setup Guide

## Quick Start (5 minutes)

### 1. Open with Live Server
- Install the **Live Server** extension in VS Code (if not already installed)
- Right-click on `index.html` → **Open with Live Server**
- Your browser will open at `http://localhost:5500`

### 2. Try Demo Mode (No API Key Needed!)
- The app comes with **Demo Mode enabled** by default
- Click on the **⚡ AI Generate** tab
- Fill in your lesson details:
  - **Select Grade** (P1-P6 or S1-S6)
  - **Select Subject** (automatically populated based on grade)
  - **Key Unit Competence** (paste from REB syllabus)
  - **Learning Objective** (what students should learn)
  - Other optional details
- Click **🤖 Generate Lesson Plan with AI**
- Review the generated REB-compliant lesson plan!

### 3. Fill Your Lesson Form
- Click **✅ Use This Plan & Fill Form** from the generated plan preview
- The form is automatically populated with AI-generated content
- Customize, review, and save as needed
- Export to **PDF** or **Word Document**

---

## 🔑 How to Use Real AI (Optional)

### Option A: OpenAI (GPT-4o or GPT-3.5)

**Get your API key:**
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up or log in to your OpenAI account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

**Add to the app:**
1. Click 🔑 **Configure API Key** button on the AI Generate tab
2. Select the **OpenAI** tab
3. Paste your API key
4. Click **Save OpenAI Key**
5. Uncheck "Demo Mode" to use your real API key

### Option B: Anthropic Claude

**Get your API key:**
1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API keys
4. Create and copy your key (starts with `sk-ant-`)

**Add to the app:**
1. Click 🔑 **Configure API Key** button
2. Select the **Claude** tab
3. Paste your API key
4. Click **Save Claude Key**
5. Uncheck "Demo Mode"

---

## 📚 REB Compliance Features

### ✅ What This App Does

The REB AI Lesson Plan Generator ensures every generated lesson plan complies with Rwanda Education Board standards:

1. **Grade & Subject Selection**
   - P1-P6 (Primary) and S1-S6 (Secondary)
   - REB-approved subjects for each grade
   - Proper curriculum alignment

2. **REB Lesson Plan Format**
   - Introduction/Motivation phase
   - Development phase with teacher and learner activities
   - Conclusion/Wrap-up phase
   - Timings for each phase

3. **Generic Competencies**
   - Communication
   - Collaboration
   - Criticality and Creative Thinking
   - Information & Digital Literacy
   - Lifelong Learning

4. **Cross-Cutting Issues**
   - Inclusive Education (Special Needs)
   - Gender & Equality
   - Genocide Ideology & Reconciliation
   - Environment & Sustainability
   - Standardization Culture
   - ICT Integration
   - Values & Peace Education
   - Financial Literacy

5. **Inclusive Education**
   - Adaptations for learners with special needs
   - Visual Impairment
   - Hearing Impairment
   - Physical Disability
   - Learning Disabilities
   - Speech/Language Impairment
   - Emotional/Behavioral Disorders
   - Support for Intellectually Gifted learners

6. **Assessment Methods**
   - Formative assessments (observation, Q&A, peer assessment)
   - Summative assessments (tests, projects, demonstrations)
   - REB-aligned rubrics and success criteria

---

## 📋 Using the Key Competence Field

The **Key Unit Competence** field is crucial for REB compliance:

### Where to Find REB Competencies:
1. Download REB subject syllabi from the [REB E-learning Platform](https://elearning.reb.rw/)
2. Find your subject and grade
3. Look for "Key Unit Competence" in the syllabus
4. Paste it into the app

### Example:
**Subject:** Mathematics | **Grade:** P5 | **Unit:** Fractions
```
Key Unit Competence: "Learners will be able to identify, create
and use fractions to solve various problems in daily life."
```

---

## 🎯 Lesson Planning Steps

### Step 1: Generate with AI
- Fill in basic information
- AI generates REB-compliant lesson plan in seconds
- Review the generated content

### Step 2: Use & Customize
- Click "Use This Plan & Fill Form"
- Form auto-fills with AI content
- Edit all sections as needed:
  - ✏️ **Teaching & Learning Activities** - teacher/learner tasks
  - **✅ Assessment** - formative and summative methods
  - **📚 Resources** - teaching materials needed
  - **♿ Special Needs** - inclusive education adaptations

### Step 3: Save & Export
- **💾 Save Plan** - saves to browser storage
- **📄 Export to PDF** - creates a printable lesson plan
- **📘 Export to Word** - creates an editable document
- **📂 My Lessons** - access all saved plans

---

##💡 Pro Tips

### Tips for Better AI Lessons:

1. **Be Specific with Key Competence**
   - Paste the actual REB syllabus competence
   - Don't use paraphrased versions
   - This ensures perfect curriculum alignment

2. **Include Special Needs Considerations**
   - Check the special needs categories relevant to your class
   - AI will suggest specific adaptations
   - Ensures inclusive education compliance

3. **Use Suggested Resources**
   - Let AI suggest resources
   - Adapt to what's available in your school
   - Mix digital and non-digital resources

4. **Customize Knowledge/Skills/Attitudes**
   - Knowledge: What students should know
   - Skills: What students should do
   - Attitudes: Values and behaviors to develop

5. **Review Cross-Cutting Issues**
   - Every lesson should address at least 1-2 cross-cutting issues
   - Use AI suggestions as a starting point
   - Customize based on your class context

### Example: Complete Lesson Generation

```
Grade: P3
Subject: Science
Lesson Title: "Introduction to Living Things"
Duration: 45 minutes
Key Competence: "Use the five senses to describe living and non-living
things and distinguish between them in various contexts."
Objective: "By the end of this lesson, learners will be able to identify
and classify living and non-living things using their senses."
Special Needs: Check "Visual Impairment" and "Learning Disabilities"
Include Options: All checked ✓
```

Result: A complete, customizable REB-compliant lesson plan ready to teach!

---

## 📖 Lessons Saved in Browser

All your lesson plans are automatically saved in your browser's local storage.

### Access Saved Lessons:
1. Click **📂 My Lessons** tab
2. Search by lesson title
3. Click to load any lesson
4. Export or delete as needed

**Note:** Data saved only on this computer. To transfer to another device:
- Use PDF/Word export
- Use File upload feature when available

---

## 🔧 Troubleshooting

### "I'm getting 'API Error'" 
- Check that your API key is correct
- Ensure Demo Mode is unchecked if using real API
- Try toggling back to Demo Mode to continue

### " Can't see grade/subject options"
- Make sure `config.js` is loaded correctly
- Refresh the page (Ctrl+F5)
- Check browser console for errors (F12)

### "Lesson form not filling after AI generation"
- Click **✅ Use This Plan & Fill Form** button
- Scroll to see if form was filled above current view
- Try "View → Zoom → Reset" if display is broken

### "Can't export to PDF/Word"
- JavaScript must be enabled
- Try exporting to PDF first (more reliable)
- For Word, ensure the generated content is shown first

---

## 🚀 Deployment (Optional)

### Deploy to Vercel (Free)
1. Push files to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy with one click
5. Share the Vercel URL with teachers

### Deploy to Netlify (Free)
1. Use "Deploy to Netlify" button on GitHub
2. Or drag-and-drop folder at [netlify.com](https://netlify.com)
3. Get a public URL instantly

---

## 📞 Support & Feedback

### Reporting Issues:
- Check browser console (F12 → Console tab) for error messages
- Screenshot the error
- Note which step you were on
- Contact your administrator

### Feature Requests:
- More subjects
- Export to Google Docs
- Lesson templates
- Curriculum mapping tools

---

## 📚 Resources

### REB Official Resources:
- [REB Homepage](https://www.reb.rw/)
- [REB E-learning Platform](https://elearning.reb.rw/)
- [Rwanda Curriculum Framework](https://www.reb.rw/curriculum/)
- [Teacher Training Guides](https://www.reb.rw/teacher-guides/)

### Additional Learning:
- [Rwanda Basic Education Examination Board (RUBEB)](https://rubeb.rw/)
- [ICE Rwanda](http://www.ice.rw/)

---

## ⚖️ License & Terms

This REB Lesson Planner is designed to assist teachers in creating REB-compliant lesson plans. Always review and customize AI-generated content to match your specific classroom context and student needs.

**Remember:** AI is a helper, not a replacement for teacher expertise and experience.

---

**Happy Teaching! 🎓📚**

Last Updated: March 2026
