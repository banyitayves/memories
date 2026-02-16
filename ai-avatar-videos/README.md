# 🎬 AI Avatar Video Generator

A powerful web application that creates stunning avatar videos with AI-generated speech and animations. Input your script, customize your avatar, and generate professional videos in minutes!

## Features

✨ **Customizable Avatars**
- Multiple avatar styles (Professional, Casual, Energetic, Presenter, Coach, Teacher)
- Skin tone, hair color, and outfit customization
- Real-time avatar preview
- Multiple background options (Office, Studio, Nature, Abstract, Home)

🎙️ **AI Voice Generation**
- Multiple voice options (Male/Female with different tones)
- Adjustable speech speed
- Natural-sounding speech synthesis
- Emotional voice variations

🎬 **Professional Video Creation**
- HD video quality (480p, 720p, 1080p)
- Multiple animation styles (Natural, Expressive, Minimal, Energetic)
- Customizable video duration (15s - 5 minutes)
- Smooth lip-sync animations

⚡ **Quick & Easy**
- No video editing experience needed
- Generate videos in minutes
- One-click download
- Share options

## Setup Instructions

### 1. Basic Usage (Demo Mode)

The application works in **demo mode** without API keys configured. You can:
- Customize avatars
- Enter scripts
- Adjust all settings
- See the full UI experience

However, to **generate actual videos**, you need to configure an API.

### 2. Production Setup (Real Video Generation)

Choose one of these APIs:

#### Option A: D-ID API (Recommended)

D-ID provides high-quality avatar video generation with natural lip-sync.

1. **Get API Key:**
   - Visit [https://www.d-id.com/](https://www.d-id.com/)
   - Sign up for a free account
   - Navigate to API settings and copy your API key

2. **Configure in script.js:**
   ```javascript
   const API_CONFIG = {
       API_KEY: 'YOUR_ACTUAL_D_ID_API_KEY_HERE',
       D_ID_ENDPOINT: 'https://api.d-id.com/talks',
       MODEL: 'facebook/musicgen-medium'
   };
   ```

3. **Pricing:** D-ID offers free tier for testing

#### Option B: HeyGen API

HeyGen is another excellent option for avatar video generation.

1. **Get API Key:**
   - Visit [https://www.heygen.com/](https://www.heygen.com/)
   - Create account and get API credentials
   - Copy your API key

2. **Configure in script.js:**
   ```javascript
   const API_CONFIG = {
       HEYGEN_API_KEY: 'YOUR_HEYGEN_API_KEY_HERE',
       HEYGEN_ENDPOINT: 'https://api.heygen.com/v1/video_talks'
   };
   ```

#### Option C: Custom Avatar Service

You can integrate any avatar service by modifying the `generateAvatarFromAPI()` function in script.js.

### 3. Text-to-Speech (Optional)

For voice generation, integrate one of these TTS services:

**Google Cloud TTS:**
```javascript
const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'YOUR_GOOGLE_API_KEY'
    },
    body: JSON.stringify({
        input: { text: scriptText },
        voice: { languageCode: 'en-US', name: 'en-US-Neural2-C' }
    })
});
```

**Azure Speech Services:**
```javascript
const response = await fetch('https://YOUR-REGION.tts.speech.microsoft.com/cognitiveservices/v1', {
    method: 'POST',
    headers: {
        'Ocp-Apim-Subscription-Key': 'YOUR_AZURE_KEY',
        'Content-Type': 'application/ssml+xml'
    },
    body: ssmlBody
});
```

## Video Playback & Download

### Playing Videos on Website
1. **Generate Video** - Click "Generate Avatar Video" to create your video
2. **Preview Video** - The video appears automatically in the player
3. **Play** - Use the built-in video player controls:
   - Click play button to start
   - Adjust volume with volume slider
   - Pause, seek, or go to fullscreen
   - Video plays at 30 FPS with smooth animations

### Downloading Videos
1. **Click Download** - After previewing, click "📥 Download Video"
2. **File Format** - Downloads as `.webm` (WebM video format)
   - Fully playable on all modern browsers
   - Compatible with media players (VLC, Windows Media Player, etc.)
   - High-quality video with avatar animation

### Video Playback Issues?

**If video doesn't play on website:**
- Refresh the page
- Try a different browser (Chrome/Firefox recommended)
- Ensure JavaScript is enabled
- Check browser console for errors (F12)

**If downloaded video doesn't play:**
- WebM format works in: Chrome, Firefox, Edge, Opera
- For other players, convert using:
  - **VLC Media Player** (free) - Select Convert option
  - **FFmpeg** - Run: `ffmpeg -i video.webm output.mp4`
  - **Online converter** - Go to CloudConvert or similar

**Converting Downloaded Video to MP4:**
```bash
# Using FFmpeg (free, install from ffmpeg.org)
ffmpeg -i avatar-video-*.webm -c:v libx264 -c:a aac output.mp4
```

## How to Use

### Step 1: Create Your Avatar
- Select an avatar preset or customize manually
- Choose skin tone, hair color, and outfit
- Select background (Office, Studio, Nature, Abstract, Home)
- Avatar preview updates in real-time

### Step 2: Write Your Script
- Enter the text you want your avatar to say
- Keep under 5000 characters
- Character count updates automatically
- The text will appear as subtitles in the video

### Step 3: Configure Voice & Settings
- Select voice type and tone (6 options available)
- Adjust speech speed (0.5x to 1.5x)
- Choose video duration (15s to 5 minutes)
- Select video quality (480p, 720p, 1080p)
- Pick animation style (Natural, Expressive, Minimal, Energetic)

### Step 4: Generate
- Click "Generate Avatar Video" button
- Watch the progress tracker showing 4 steps
- Video creates locally in your browser
- Instant delivery when complete

### Step 5: Preview, Download & Share
1. **Preview** - Video plays automatically in the player
2. **Play Controls** - Use standard video controls (play, pause, seek, fullscreen, volume)
3. **Download** - Click "⬇️ Download Video" to save as `.webm` file
4. **Share** - Click "📤 Share" to share via social media or copy link

## Tips for Best Results

1. **Script Quality** 📝
   - Use natural, conversational language
   - Break long sentences with pauses [...]
   - Keep videos under 2 minutes for best quality

2. **Avatar Customization** 👤
   - Match avatar outfit to the content type
   - Professional outfit for business videos
   - Sports wear for energetic content

3. **Voice Selection** 🎙️
   - Professional voice for business content
   - Cheerful voice for promotional videos
   - Deep voice for authority and credibility

4. **Settings** ⚙️
   - Use 720p for best quality/speed balance
   - 60s duration works well for most content
   - Natural animation is most versatile

5. **Editing Tips** ✂️
   - Keep scripts concise
   - Use punctuation for natural pauses
   - Match animation style to voice tone

## File Structure

```
ai-avatar-videos/
├── index.html          # Main HTML structure
├── styles.css          # Modern styling
├── script.js           # Core functionality & API integration
└── README.md           # This file
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Keyboard Shortcuts

- **Ctrl + Enter:** Generate video quickly

## Troubleshooting

### "API Key not configured" Error
- Replace `YOUR_D_ID_API_KEY_HERE` with your actual API key
- Restart your browser after adding the key
- Check that the key is valid on the API service

### Video not generating
- Check internet connection
- Verify API key is correct
- Check browser console for detailed errors (F12)
- Ensure script is at least 10 characters

### Audio/Voice not working
- Confirm TTS service is configured
- Check API quota hasn't been exceeded
- Verify voice type is supported by your TTS service

### Video quality is low
- Select 1080p quality (may be slower)
- Use shorter scripts
- Check your internet connection

## Limitations

- Maximum script length: 5000 characters
- Video duration: 15 seconds - 5 minutes
- Supported formats: MP4 video
- API-dependent features require internet connection

## Privacy & Data

- Video generation happens server-side
- Your scripts may be logged by API services
- No personal data is stored locally
- Downloaded videos are only stored on your device

## Support & Updates

- For API issues, check official documentation:
  - D-ID: https://docs.d-id.com/
  - HeyGen: https://docs.heygen.com/
  
- For JavaScript issues, open browser console (F12)

## Future Enhancements

Planned features:
- ✅ Multi-language support
- ✅ Avatar emotion control
- ✅ Custom background upload
- ✅ Video templates
- ✅ Batch video generation
- ✅ Social media direct upload
- ✅ Subtitle generation
- ✅ Video branding/watermarks

## License

This project is open source. Feel free to customize and extend it!

## Feedback

Have suggestions or found bugs? Feel free to improve this project!

---

**Happy Video Creating!** 🎬✨
