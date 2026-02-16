# 🎬 Multi-Avatar Conversation Generator

Create stunning film-like videos with multiple avatars having realistic conversations! Perfect for tutorials, discussions, presentations, and more.

## ✨ Features

### 👥 Multi-Avatar Support
- Create unlimited avatars with unique appearances and voices
- Mix and match different styles in one conversation
- Realistic avatar animations with lip-sync
- Eye blinking and natural gestures

### 🎬 Dialogue-Based Generation
- Write scripts using simple format: `AvatarName: What they say`
- Multiple avatars having natural conversations
- Dialogue boxes showing speaker and text
- Automatic speaker highlighting animation

### 📚 Video Library
- Save all created videos locally in browser
- Search and organize your conversations
- Play videos instantly from library
- Download videos anytime
- Never lose your content

### ⚡ Professional Features
- Multiple background scenes (Office, Studio, Conference, Nature, Abstract)
- Adjustable video duration (30s - 5 minutes)
- Real-time preview before saving
- One-click download and share

## 🚀 Quick Start

### Step 1: Create Avatars
1. Enter an avatar name (e.g., "Alex", "Jordan")
2. Choose avatar style (Professional, Casual, Energetic, etc.)
3. Customize appearance (skin tone, hair, outfit, voice)
4. Click "Add Avatar to Conversation"
5. Repeat to add more avatars

### Step 2: Write Dialogue Script
1. Click in the script box
2. Use format: `AvatarName: What they say`
3. Press Enter for new line
4. Each line = one dialogue

**Example:**
```
Alex: Hello everyone! Welcome to our discussion today.
Jordan: Hi! Great to be here. What's the topic?
Professor: Today we're covering an important subject.
Alex: I'm really excited about this!
Jordan: Me too! Let's get started.
```

### Step 3: Configure Settings
- **Video Title:** Give your conversation a name
- **Duration:** How long the video should be (30s - 5 minutes)
- **Background:** Choose the scene (Office, Studio, etc.)

### Step 4: Generate & Save
1. Click "Generate Conversation Video"
2. Watch the progress indicator
3. Video appears when ready
4. Click "Play" to preview
5. Click "Download Video" to save as `.webm`
6. Click "Save to Library" to store in your browser

## 📖 How It Works

### Script Format
```
Speaker1: First line of dialogue
Speaker2: Second speaker talks
Speaker1: First speaker responds
```

**Important:** Avatar names in your script MUST exactly match the names you created!

### Avatar Positions
- **1 Avatar:** Centered
- **2 Avatars:** Left and Right
- **3+ Avatars:** Arranged in triangle formation

### Video Quality
- Resolution: 1280x720 (720p HD)
- Frame Rate: 30 FPS (smooth animation)
- Format: WebM (all modern browsers)

## 💾 Video Library

### Saving Videos
1. Generate a video
2. Click "Save to Library"
3. Video stores in your browser locally
4. Access anytime from the "Video Library" tab

### Managing Videos
- **Play:** Watch saved videos anytime
- **Download:** Save to your computer
- **Search:** Find videos by title
- **Delete:** Remove individual videos
- **Delete All:** Clear entire library (careful!)

### Storage
- Videos save in browser's local storage
- Up to ~5-10MB typically available
- No internet needed to watch saved videos
- Persists across browser sessions

## 🎨 Customization Guide

### Avatar Styles
| Style | Best For |
|-------|----------|
| Professional | Business, corporate content |
| Casual | Friendly, relaxed conversations |
| Energetic | Dynamic, high-energy content |
| Presenter | Presentations, training |
| Coach | Motivational, inspiring content |
| Teacher | Educational, explanatory videos |

### Outfits
- **Formal Suit** - Business professional
- **Business Casual** - Modern corporate
- **Casual T-Shirt** - Relaxed, friendly
- **Sports Wear** - Energetic, active
- **Creative Look** - Unique, artistic

### Voices
- **Female - Neutral**: Standard professional voice
- **Female - Cheerful**: Upbeat, positive tone
- **Female - Professional**: Corporate, formal
- **Male - Neutral**: Standard professional voice
- **Male - Deep**: Authoritative, commanding
- **Male - Energetic**: Dynamic, enthusiastic

### Backgrounds
- **Office** - Corporate meeting room feel
- **Studio** - Professional recording studio
- **Conference** - Conference/presentation room
- **Nature** - Outdoor, natural setting
- **Abstract** - Creative, modern look

## 💡 Tips for Best Results

### Script Writing
✅ Use natural conversational language
✅ Keep paragraphs short and punchy
✅ Add variations between speakers
✅ Name avatars clearly and consistently
❌ Don't use special characters in avatar names
❌ Don't change capitalization mid-script

### Avatar Setup
✅ Use distinctive outfits for different characters
✅ Mix male and female voices for variety
✅ Create avatars that look different
✅ Choose appropriate presets for content type
❌ Don't use too many avatars (3-4 works best)

### Video Duration
- **30 seconds** - Quick exchanges, intros
- **1 minute** - Short discussions, demos
- **2 minutes** - Full conversations
- **5 minutes** - Extended scenes, detailed discussions

### Background Selection
- Office scenes for business content
- Studio for focused, professional feel
- Conference rooms for presentations
- Nature for casual, friendly vibes

## ⚙️ Technical Details

### Browser Compatibility
- Chrome/Edge 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Mobile browsers (`Chrome Mobile`, `Firefox Mobile`) ✅

### Video Format Information
- **Format:** WebM (VP9 video codec)
- **Codec:** VP9 with Opus audio
- **Resolution:** 1280x720
- **FPS:** 30 frames per second
- **Typical Size:** 2-8 MB per minute

### Converting WebM to MP4
If you need MP4 format:

**Using FFmpeg (free):**
```bash
ffmpeg -i conversation.webm -c:v libx264 -c:a aac output.mp4
```

**Using VLC Media Player:**
1. Open WebM file in VLC
2. Media → Convert
3. Choose MP4 format
4. Click "Save"

**Online converters:**
- CloudConvert.com
- ZamZar.com
- Online-Convert.com

## 🎬 Example Projects

### Educational Discussion
```
Teacher: Welcome students to our biology class.
Student1: Good morning! What are we learning today?
Teacher: We're studying photosynthesis in plants.
Student2: Oh interesting! How does it work?
Teacher: Let me explain step by step.
```

### Product Review
```
Reviewer1: Hi everyone! Today we're reviewing the new gadget.
Reviewer2: I'm excited to see this in action.
Reviewer1: Let's unbox it first.
Reviewer2: Looks premium!
Reviewer1: Check out these features.
```

### Team Meeting
```
Manager: Thanks everyone for joining. Let's discuss Q1 goals.
Employee1: I've prepared the sales report.
Manager: Great! What are the numbers?
Employee1: We're up 25% from last quarter.
Employee2: That's excellent progress!
```

## 🔒 Privacy & Security

- ✅ All processing happens in your browser
- ✅ Videos save locally on your device
- ✅ No data sent to external servers (demo mode)
- ✅ No account required
- ✅ No tracking or analytics

## 🐛 Troubleshooting

### Video won't generate
- Ensure all avatar names in script match created avatars
- Check that script has proper format: `Name: Text`
- Try refreshing the page
- Check browser console (F12) for errors

### Avatar names not recognized
- Make sure capitalization matches exactly
- No extra spaces before or after names
- Names must match what you entered when creating

### Storage full
- Delete old videos to free up space
- Maximum depends on browser and device
- Typically 5-10MB available
- Use "Delete All" button to clear library

### Video playback issues
- Try different browser (Chrome recommended)
- Clear browser cache
- Check if JavaScript is enabled
- Ensure pop-ups aren't blocked

## 📱 Mobile Support

The app works on mobile browsers with limitations:
- Smaller screen requires pinch-zoom for comfort
- Touch works for all buttons and inputs
- Video generation may be slower on mobile
- Storage limits may be lower

## 🚀 Future Enhancements

Planned features:
- ✨ Real-time avatar lip-sync
- ✨ Custom avatar upload
- ✨ More animation styles
- ✨ Background video/image upload
- ✨ Add music and sound effects
- ✨ Export subtitle files
- ✨ Cloud storage backup
- ✨ Social media direct upload

## 💬 Feedback

Have suggestions or found issues? This is a demo application. Feel free to enhance it!

---

**Happy Creating!** 🎬✨

Create engaging conversations with AI avatars. Share meaningful stories. Inspire audiences.
