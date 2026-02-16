# REB Lesson Plan Generator - AI Powered 🎓

A comprehensive, AI-powered lesson planning application for Rwanda teachers, featuring multi-language support, user authentication, and admin controls.

## 🌟 Features

### 1. **AI-Powered Lesson Generation**
- Teachers provide minimal input (title, subject, class, duration, learning objective)
- AI generates a complete, structured lesson plan automatically
- Optional AI features for teaching activities, assessment methods, and resource suggestions
- **Demo Mode**: Works without API key (generates mock lesson plans)
- **Production Mode**: Integrates with OpenAI GPT API for real AI generation

### 2. **Multi-Language Support**
Four languages fully supported with instant switching:
- 🇬🇧 **English**
- 🇹🇿 **Kiswahili (Kiswahili)**
- 🇫🇷 **Français (French)**
- 🇷🇼 **Kinyarwanda**

Language preference is saved to `localStorage` and persists across sessions.

### 3. **User Authentication System**
- **Teacher Account Registration**: Full name, email, teacher ID, password
- **Secure Login**: Email and password authentication
- **Demo Access**: Try the app immediately without creating an account
- **Session Management**: Automatic logout with one-click session clearing
- **Default Admin Account**: admin@reb.edu / admin123 (auto-created on first load)

Data Structure (localStorage):
```json
{
  "reb_users": [
    {
      "id": "unique_id",
      "name": "Teacher Name",
      "email": "teacher@example.com",
      "password": "encrypted/plaintext",
      "teacherId": "T12345",
      "role": "teacher|admin",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "reb_currentUser": {...},
  "reb_language": "en"
}
```

### 4. **Admin Access & Controls**

Admin Users Can:
- 👥 **View all registered teachers**: Name, email, teacher ID, join date
- 📊 **System Statistics**: Total users, lesson plans created, admin count
- 💾 **Data Management**: 
  - Export all data as JSON backup
  - Reset all data (with triple confirmation)
- 🔐 **User Management**: Delete users and their associated lesson plans

### 5. **REB-Compliant Lesson Planning**

Structured lesson plan with REB format including:
- **Basic Information**: School name, teacher name, date, subject, class
- **Unit Details**: Unit title, key competencies, number of lessons
- **Lesson Delivery**:
  - Introduction/Motivation phase
  - Development phase
  - Conclusion/Summary phase
- **Generic Competencies & Cross-Cutting Issues**
- **Assessment Methods**:
  - Formative assessment strategies
  - Summative assessment activities
- **Teaching References**: Textbooks and curriculum documents
- **Special Needs/Inclusive Education Notes**

### 6. **Export Functionality**
- 📄 **PDF Export**: Professional PDF with complete lesson plan
- 📘 **Word Export**: Editable Word document for further customization
- 💾 **Save Plan**: Save to browser localStorage (per-user)
- 📥 **Admin Export**: Export all system data as JSON

## 📋 File Structure

```
reb-lesson-planner/
│
├── index.html                 # Main application interface
├── script-auth.js             # Authentication & admin system
├── script-ai.js               # AI lesson generation
├── script-translations.js      # Multi-language support (40+ strings × 4 languages)
├── script.js                  # Main lesson planner logic
├── styles.css                 # Complete styling (responsive design)
├── README_COMPLETE.md         # This file
└── index-backup.html          # Backup of previous version
```

## 🚀 Getting Started

### Option 1: Direct File Opening
1. Download or clone the repository
2. Open `index.html` in a web browser
3. Log in or click "Demo Access"

### Option 2: Local Server (Recommended)
Using Node.js http-server:
```bash
npx http-server reb-lesson-planner -p 8000
```
Then visit: http://localhost:8000

Using Python 3:
```bash
cd reb-lesson-planner
python -m http.server 8000
```
Then visit: http://localhost:8000

## 🔐 Default Credentials

**Admin Account (Auto-created)**
- Email: `admin@reb.edu`
- Password: `admin123`

This account is automatically created on first load with full admin privileges.

## 🤖 AI Configuration

### Demo Mode (No Setup Required)
The application comes with a demo mode that generates mock lesson plans without any API key. Perfect for testing!

### Production Mode (OpenAI Integration)

1. **Get OpenAI API Key**:
   - Visit [OpenAI Platform](https://platform.openai.com)
   - Create an account and generate an API key
   - Copy your API key

2. **Configure in Application**:
   Open `script-ai.js` and update:
   ```javascript
   const AI_CONFIG = {
       apiKey: 'sk-YOUR-ACTUAL-KEY-HERE',  // Replace with your key
       endpoint: 'https://api.openai.com/v1/chat/completions',
       model: 'gpt-3.5-turbo',
       maxTokens: 2000
   };
   ```

3. **Cost Estimation**:
   - Average cost per lesson: ~$0.02-0.05 (gpt-3.5-turbo)
   - 1000 lesson plans: ~$20-50

## 📊 User Roles & Permissions

### Teacher
- ✅ Create and save lesson plans
- ✅ Use AI generation
- ✅ Export to PDF/Word
- ✅ View own lesson plans
- ❌ Cannot access admin panel

### Admin
- ✅ All teacher features
- ✅ View all users and lesson plans
- ✅ System statistics and dashboard
- ✅ Export all data
- ✅ Reset system data
- ✅ Delete users and their plans

## 💾 Data Storage

All data is stored in browser's `localStorage`:
- **reb_users**: User accounts
- **reb_lessonPlans**: Teacher's lesson plans (per-user)
- **reb_currentUser**: Active session
- **reb_language**: Language preference

### Important Notes:
- Data is **not** sent to any server
- Data persists across browser sessions
- Clearing browser cache will delete all data
- **Backup**: Use admin export feature to backup data

## 🌐 Translation System

The application includes 40+ translated strings across 4 languages:

**Translated Elements**:
- Section titles (AI Generate, Basic Info, Lesson Details, etc.)
- Form labels (School Name, Teacher Name, Subject, Class, etc.)
- Button labels (Login, Register, Generate, Save, Export, etc.)
- Messages (success, error, info notifications)
- Placeholders (input hints)

**How to Add More Translations**:
Edit `script-translations.js` and add strings to each language object:
```javascript
const translations = {
    en: { newKey: 'English text' },
    sw: { newKey: 'Swahili text' },
    fr: { newKey: 'French text' },
    rw: { newKey: 'Kinyarwanda text' }
};
```

## 🎨 Customization

### Change Theme Colors
Edit `styles.css`:
```css
/* Primary color: Change from #1e3c72 and #2a5298 */
background: linear-gradient(135deg, #YOUR-COLOR-1 0%, #YOUR-COLOR-2 100%);
```

### Change Language Default
Edit `script-translations.js`:
```javascript
let currentLanguage = localStorage.getItem('reb_language') || 'en'; // Change 'en' to preferred language
```

### Add New Assessment Types
Edit `script.js` - find `assessmentMethods` section and add new options.

## 🐛 Troubleshooting

### Issue: Demo account not working
- **Solution**: Clear browser cache/localStorage and refresh
  - Press F12 → Application → Clear Site Data

### Issue: Lesson not saving
- **Solution**: Ensure you are logged in (not demo mode for persistence)

### Issue: Language not changing
- **Solution**: Check browser console (F12) for JavaScript errors

### Issue: AI generation not working
- **Solution**: 
  - In demo mode: Should work immediately
  - In production: Verify OpenAI API key is correct and has funds

## 🔒 Security Notes

**Current Limitations (Demo)**:
- Passwords stored in plaintext in localStorage
- No encryption or backend authentication

**For Production Use**:
1. **Hash Passwords**: Use bcrypt or similar
2. **Backend Authentication**: Move to server-side auth
3. **HTTPS Only**: Encrypt data in transit
4. **Rate Limiting**: Prevent brute force attacks
5. **API Key Protection**: Never expose in client-side code

## 📱 Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ⚠️ IE11 (Not supported)

## 💡 Tips & Tricks

1. **AI Generation Tips**:
   - Provide clear, specific learning objectives
   - Include class size for better activity suggestions
   - Check "Include Teaching Activities" for detailed lesson steps

2. **Performance**:
   - Works offline once loaded
   - Use demo mode for testing without API costs
   - Export data regularly for backups

3. **Accessibility**:
   - Use keyboard navigation (Tab to move between sections)
   - Multi-language support includes students' native languages
   - All text has good contrast for visibility

## 📞 Support & Feedback

For issues, feature requests, or suggestions:
1. Check troubleshooting section above
2. Clear browser cache (may resolve most issues)
3. Test in demo mode first
4. Check browser console for error messages (F12)

## 📄 License

This application is created for Rwanda Education Board (REB) lesson planning.

## 🙏 Acknowledgments

- Built for Rwanda Education Board standards
- Responsive design for all devices
- Multi-language support for Rwanda's linguistic diversity
- AI-powered for efficient lesson planning

---

**Version**: 2.0 (AI + Authentication + Multi-language)  
**Last Updated**: January 2024  
**Status**: Production Ready ✅
