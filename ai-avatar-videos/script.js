// Configuration
const API_CONFIG = {
    // Using D-ID API for avatar videos
    // Get your API key at: https://www.d-id.com/
    API_KEY: 'YOUR_D_ID_API_KEY_HERE',
    D_ID_ENDPOINT: 'https://api.d-id.com/talks',
    // Alternative: HeyGen API
    // HEYGEN_API_KEY: 'YOUR_HEYGEN_API_KEY_HERE',
    // HEYGEN_ENDPOINT: 'https://api.heygen.com/v1/video_talks'
};

// UI Elements
const avatarPreset = document.getElementById('avatarPreset');
const skinTone = document.getElementById('skinTone');
const hairColor = document.getElementById('hairColor');
const outfit = document.getElementById('outfit');
const background = document.getElementById('background');
const script = document.getElementById('script');
const voiceGender = document.getElementById('voiceGender');
const speechRate = document.getElementById('speechRate');
const videoDuration = document.getElementById('videoDuration');
const videoQuality = document.getElementById('videoQuality');
const animationStyle = document.getElementById('animationStyle');
const generateBtn = document.getElementById('generateBtn');
const statusContainer = document.getElementById('statusContainer');
const statusMessage = document.getElementById('status');
const progressFill = document.getElementById('progressFill');
const estimatedTime = document.getElementById('estimatedTime');
const playerContainer = document.getElementById('playerContainer');
const videoSource = document.getElementById('videoSource');
const videoPlayer = document.getElementById('videoPlayer');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const videoInfo = document.getElementById('videoInfo');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');
const avatarHead = document.getElementById('avatarHead');
const avatarBody = document.getElementById('avatarBody');

// Event Listeners
skinTone.addEventListener('change', updateAvatarPreview);
hairColor.addEventListener('change', updateAvatarPreview);
outfit.addEventListener('change', updateAvatarPreview);
background.addEventListener('change', updateAvatarPreview);
avatarPreset.addEventListener('change', applyAvatarPreset);

speechRate.addEventListener('input', (e) => {
    const rate = parseFloat(e.target.value);
    let label = 'Normal';
    if (rate < 0.8) label = 'Slow';
    else if (rate > 1.2) label = 'Fast';
    document.getElementById('speechRateValue').textContent = label;
});

script.addEventListener('input', (e) => {
    const length = e.target.value.length;
    document.querySelector('.char-count').textContent = `${length} / 5000 characters`;
    if (length > 5000) {
        script.value = script.value.substring(0, 5000);
    }
});

generateBtn.addEventListener('click', generateAvatarVideo);
retryBtn.addEventListener('click', generateAvatarVideo);
regenerateBtn.addEventListener('click', generateAvatarVideo);
downloadBtn.addEventListener('click', downloadVideo);
shareBtn.addEventListener('click', shareVideo);

function updateAvatarPreview() {
    const skin = skinTone.value;
    const hair = hairColor.value;
    const outfitValue = outfit.value;
    
    avatarHead.style.backgroundColor = skin;
    
    // Hair color simulation
    const bgStyle = `linear-gradient(to bottom, ${hair}, ${hair})`;
    avatarHead.style.backgroundImage = bgStyle;
    
    // Outfit colors
    const outfitColors = {
        'formal': 'linear-gradient(to bottom, #1a1a2e, #16213e)',
        'business': 'linear-gradient(to bottom, #4c1d95, #7c3aed)',
        'casual': 'linear-gradient(to bottom, #475569, #64748b)',
        'sports': 'linear-gradient(to bottom, #dc2626, #7c3aed)',
        'creative': 'linear-gradient(to bottom, #ee6a4d, #f97316)'
    };
    
    avatarBody.style.background = outfitColors[outfitValue] || outfitColors['formal'];
}

function applyAvatarPreset() {
    const preset = avatarPreset.value;
    const presets = {
        'professional': {
            skin: '#d4a574',
            hair: '#3d3d3d',
            outfit: 'formal',
            background: 'studio',
            voice: 'male-professional'
        },
        'casual': {
            skin: '#c4956b',
            hair: '#5a4a42',
            outfit: 'casual',
            background: 'home',
            voice: 'female-cheerful'
        },
        'energetic': {
            skin: '#d4a574',
            hair: '#1a1a1a',
            outfit: 'sports',
            background: 'abstract',
            voice: 'male-energetic'
        },
        'presenter': {
            skin: '#c4956b',
            hair: '#3d3d3d',
            outfit: 'business',
            background: 'studio',
            voice: 'female-professional'
        },
        'coach': {
            skin: '#8b6f47',
            hair: '#4a4a4a',
            outfit: 'sports',
            background: 'nature',
            voice: 'male-deep'
        },
        'teacher': {
            skin: '#d4a574',
            hair: '#5a4a42',
            outfit: 'business',
            background: 'office',
            voice: 'female-neutral'
        }
    };
    
    const selectedPreset = presets[preset];
    if (selectedPreset) {
        skinTone.value = selectedPreset.skin;
        hairColor.value = selectedPreset.hair;
        outfit.value = selectedPreset.outfit;
        background.value = selectedPreset.background;
        voiceGender.value = selectedPreset.voice;
        updateAvatarPreview();
    }
}

async function generateAvatarVideo() {
    // Validation
    const scriptText = script.value.trim();
    
    if (!scriptText) {
        showError('Please enter a script for your avatar!');
        return;
    }
    
    if (scriptText.length < 10) {
        showError('Script is too short! Please provide at least 10 characters.');
        return;
    }
    
    if (API_CONFIG.API_KEY === 'YOUR_D_ID_API_KEY_HERE') {
        // Demo mode - generate real playable video
        await generateDemoVideo();
        return;
    }
    
    // Clear previous states
    hideAll();
    generateBtn.disabled = true;
    
    // Show loading state
    showStatus('Preparing your avatar...');
    updateProgress(5);
    activateStep(1);
    
    try {
        const voiceType = voiceGender.value;
        const speechRateValue = parseFloat(speechRate.value);
        const quality = videoQuality.value;
        const duration = videoDuration.value;
        
        // Step 1: Process script
        setTimeout(() => {
            updateProgress(15);
            statusMessage.textContent = 'Generating speech from script...';
            activateStep(2);
        }, 1000);
        
        // Step 2: Generate audio/speech
        const audioUrl = await generateSpeech(scriptText, voiceType, speechRateValue);
        
        setTimeout(() => {
            updateProgress(40);
            statusMessage.textContent = 'Creating avatar animation...';
            activateStep(3);
        }, 2000);
        
        // Step 3: Get avatar video from API
        const videoUrl = await generateAvatarFromAPI(audioUrl, quality);
        
        setTimeout(() => {
            updateProgress(75);
            statusMessage.textContent = 'Composing final video...';
            activateStep(4);
        }, 3000);
        
        // Step 4: Display video
        setTimeout(() => {
            updateProgress(100);
            displayVideo(videoUrl, scriptText, voiceType);
            generateBtn.disabled = false;
        }, 4000);
        
    } catch (error) {
        generateBtn.disabled = false;
        showError(`Error generating video: ${error.message}`);
        console.error('Generation error:', error);
    }
}

async function generateDemoVideo() {
    // Demo mode - create a real playable video
    hideAll();
    generateBtn.disabled = true;
    showStatus('Creating your avatar video...');
    
    let progress = 10;
    const progressInterval = setInterval(() => {
        if (progress < 85) {
            progress += Math.random() * 15;
            updateProgress(Math.min(progress, 85));
        }
    }, 400);
    
    try {
        // Generate actual video blob
        const videoBlob = await createRealAvatarVideo();
        
        clearInterval(progressInterval);
        updateProgress(100);
        
        // Create proper blob URL for playback
        const videoUrl = URL.createObjectURL(videoBlob);
        window.currentVideoBlob = videoBlob; // Store for download
        
        setTimeout(() => {
            displayVideo(videoUrl, script.value, voiceGender.value);
            generateBtn.disabled = false;
        }, 500);
    } catch (error) {
        clearInterval(progressInterval);
        generateBtn.disabled = false;
        showError(`Failed to generate video: ${error.message}`);
        console.error('Video generation error:', error);
    }
}

async function createRealAvatarVideo() {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d', { preserveDrawingBuffer: true });
            
            if (!ctx) {
                reject(new Error('Canvas context not available'));
                return;
            }
            
            // Get video settings
            const duration = parseInt(videoDuration.value);
            const fps = 30;
            const totalFrames = duration * fps;
            const skinColor = skinTone.value;
            const bgColor = getBackgroundColor(background.value);
            
            const stream = canvas.captureStream(fps);
            
            if (!stream) {
                reject(new Error('Canvas capture stream not available'));
                return;
            }
            
            // Determine supported MIME type
            let mimeType = 'video/webm;codecs=vp9,opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm;codecs=vp8,opus';
            }
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm';
            }
            
            console.log('Using MIME type:', mimeType);
            
            let mediaRecorder;
            try {
                mediaRecorder = new MediaRecorder(stream, { mimeType: mimeType });
            } catch (e) {
                console.warn('MediaRecorder creation with MIME type failed, trying without:', e);
                mediaRecorder = new MediaRecorder(stream);
            }
            
            const chunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunks.push(e.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                // Create blob from recorded chunks
                const mimeTypeUsed = mediaRecorder.mimeType || 'video/webm';
                const blob = new Blob(chunks, { type: mimeTypeUsed });
                
                if (blob.size === 0) {
                    reject(new Error('Video blob is empty'));
                    return;
                }
                
                console.log('Video blob created:', blob.size, 'bytes');
                resolve(blob);
            };
            
            mediaRecorder.onerror = (error) => {
                console.error('MediaRecorder error:', error);
                reject(new Error(`Recording error: ${error.error}`));
            };
            
            // Draw frames and record
            let frameCount = 0;
            mediaRecorder.start();
            
            const drawFrame = () => {
                if (frameCount >= totalFrames) {
                    mediaRecorder.stop();
                    return;
                }
                
                // Background
                ctx.fillStyle = bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                // Draw avatar with animation
                const animationProgress = frameCount / totalFrames;
                drawAvatarFrame(ctx, canvas.width, canvas.height, skinColor, animationProgress);
                
                // Draw script text
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.font = 'bold 32px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                
                const maxCharsPerLine = 80;
                const scriptText = script.value;
                let currentY = canvas.height - 80;
                
                for (let i = 0; i < scriptText.length; i += maxCharsPerLine) {
                    const line = scriptText.substring(i, i + maxCharsPerLine);
                    ctx.fillText(line, canvas.width / 2, currentY);
                    currentY -= 45;
                }
                
                frameCount++;
                requestAnimationFrame(drawFrame);
            };
            
            drawFrame();
            
        } catch (error) {
            reject(error);
        }
    });
}

function drawAvatarFrame(ctx, width, height, skinColor, progress) {
    const centerX = width / 2;
    const centerY = height / 2.5;
    
    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 50, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Hair
    ctx.fillStyle = hairColor.value || '#3d3d3d';
    ctx.fillRect(centerX - 85, centerY - 130, 170, 90);
    ctx.beginPath();
    ctx.arc(centerX, centerY - 130, 85, 0, Math.PI);
    ctx.fill();
    
    // Eyes with animation
    const eyeOffset = Math.sin(progress * Math.PI * 2) * 5;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX - 30, centerY - 70, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 30, centerY - 70, 20, 0, Math.PI * 2);
    ctx.fill();
    
    // Pupils
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(centerX - 30 + eyeOffset, centerY - 70, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + 30 + eyeOffset, centerY - 70, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Mouth with animation
    const mouthOpen = Math.sin(progress * Math.PI * 4) * 15;
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(centerX, centerY - 20, 30, 0, Math.PI);
    ctx.stroke();
    
    // Body (outfit)
    const outfitColor = getOutfitColor(outfit.value);
    ctx.fillStyle = outfitColor;
    ctx.fillRect(centerX - 90, centerY + 30, 180, 150);
    
    // Shoulders
    ctx.fillRect(centerX - 100, centerY + 25, 200, 30);
    
    // Arms with animation
    const armRotation = Math.sin(progress * Math.PI * 2) * 0.3;
    ctx.save();
    ctx.translate(centerX - 100, centerY + 60);
    ctx.rotate(armRotation);
    ctx.fillRect(0, 0, 30, 120);
    ctx.restore();
    
    ctx.save();
    ctx.translate(centerX + 100, centerY + 60);
    ctx.rotate(-armRotation);
    ctx.fillRect(-30, 0, 30, 120);
    ctx.restore();
}

function getBackgroundColor(bgType) {
    const backgrounds = {
        'office': '#2c3e50',
        'studio': '#34495e',
        'nature': '#27ae60',
        'abstract': '#c0392b',
        'home': '#8b7355'
    };
    return backgrounds[bgType] || '#2c3e50';
}

function getOutfitColor(outfitType) {
    const outfits = {
        'formal': '#1a1a2e',
        'business': '#4c1d95',
        'casual': '#475569',
        'sports': '#dc2626',
        'creative': '#ee6a4d'
    };
    return outfits[outfitType] || '#1a1a2e';
}

async function generateSpeech(text, voiceType, rate) {
    // This would call a TTS API (Google Cloud TTS, Azure Speech, etc.)
    return 'data:audio/mp3;base64,//...';
}

async function generateAvatarFromAPI(audioUrl, quality) {
    try {
        const response = await fetch(API_CONFIG.D_ID_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                source_url: 'https://example.com/avatar.jpeg',
                audio_url: audioUrl,
                quality: quality
            })
        });
        
        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        return data.video_url || data.result_url;
    } catch (error) {
        throw new Error(`Failed to generate avatar video: ${error.message}`);
    }
}

function displayVideo(videoUrl, scriptText, voiceType) {
    hideAll();
    playerContainer.classList.remove('hidden');
    
    // Set video source
    videoSource.src = videoUrl;
    videoPlayer.load();
    
    // Ensure video can play
    videoPlayer.addEventListener('loadedmetadata', function() {
        console.log('Video metadata loaded - ready to play');
    });
    
    videoPlayer.addEventListener('error', function() {
        console.error('Video error:', videoPlayer.error);
        showError('Video failed to load. Try generating again.');
    });
    
    const voiceLabels = {
        'female-neutral': 'Female (Neutral)',
        'female-cheerful': 'Female (Cheerful)',
        'female-professional': 'Female (Professional)',
        'male-neutral': 'Male (Neutral)',
        'male-deep': 'Male (Deep)',
        'male-energetic': 'Male (Energetic)'
    };
    
    const outfitLabels = {
        'formal': 'Formal Suit',
        'business': 'Business Casual',
        'casual': 'Casual T-Shirt',
        'sports': 'Sports Wear',
        'creative': 'Creative Look'
    };
    
    videoInfo.innerHTML = `
        <strong>🎬 Video Details:</strong><br>
        <span style="color: var(--text-secondary);">Voice:</span> <span style="color: var(--primary-color);">${voiceLabels[voiceType]}</span><br>
        <span style="color: var(--text-secondary);">Outfit:</span> <span style="color: var(--primary-color);">${outfitLabels[outfit.value]}</span><br>
        <span style="color: var(--text-secondary);">Quality:</span> <span style="color: var(--primary-color);">${videoQuality.value}</span><br>
        <span style="color: var(--text-secondary);">Duration:</span> <span style="color: var(--primary-color);">${videoDuration.value} seconds</span><br>
        <span style="color: var(--text-secondary);">Format:</span> <span style="color: var(--primary-color);">WebM Video</span><br>
        <br>
        <strong>📝 Script Excerpt:</strong><br>
        <em style="color: var(--text-secondary); display: block; padding: 10px; background: var(--bg-primary); border-radius: 5px; margin-top: 8px;">"${scriptText.substring(0, 200)}${scriptText.length > 200 ? '...' : ''}"</em>
    `;
    
    // Store for download
    window.currentVideoUrl = videoUrl;
    window.currentScript = scriptText;
    window.currentVideoBlob = window.currentVideoBlob || null;
    
    showToast('✅ Video ready! Play above before downloading.', 'success');
}

function downloadVideo() {
    if (!window.currentVideoBlob && !window.currentVideoUrl) {
        showError('No video to download. Generate a video first!');
        return;
    }
    
    try {
        const link = document.createElement('a');
        
        // Use blob if available, otherwise use URL
        if (window.currentVideoBlob) {
            link.href = URL.createObjectURL(window.currentVideoBlob);
            link.download = `avatar-video-${Date.now()}.webm`;
        } else {
            link.href = window.currentVideoUrl;
            link.download = `avatar-video-${Date.now()}.webm`;
        }
        
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
        }, 100);
        
        showToast('📥 Video downloading...', 'success');
    } catch (error) {
        showError(`Download failed: ${error.message}`);
        console.error('Download error:', error);
    }
}

function shareVideo() {
    if (navigator.share) {
        navigator.share({
            title: 'Avatar Video',
            text: 'Check out my AI avatar video!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    } else {
        alert('Share functionality not supported in your browser');
    }
}

function showStatus(message) {
    statusContainer.classList.remove('hidden');
    playerContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    statusMessage.textContent = message;
    
    const estimatedSeconds = Math.floor(Math.random() * 60) + 120; // 120-180 seconds
    estimatedTime.textContent = `⏱️ Estimated time: ${estimatedSeconds} seconds (~${Math.floor(estimatedSeconds / 60)} minutes)`;
}

function updateProgress(percent) {
    progressFill.style.width = percent + '%';
}

function activateStep(stepNum) {
    // Deactivate all steps
    document.querySelectorAll('.step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Activate current step
    document.getElementById(`step${stepNum}`).classList.add('active');
}

function showError(message) {
    hideAll();
    errorContainer.classList.remove('hidden');
    errorMessage.textContent = message;
}

function hideAll() {
    statusContainer.classList.add('hidden');
    playerContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Avatar Video Generator initialized');
    applyAvatarPreset(); // Apply default preset
    updateAvatarPreview(); // Update preview
});

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { 
            transform: translateX(400px);
            opacity: 0;
        }
        to { 
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from { 
            transform: translateX(0);
            opacity: 1;
        }
        to { 
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to generate video
    if (e.ctrlKey && e.key === 'Enter') {
        if (!generateBtn.disabled) {
            generateAvatarVideo();
        }
    }
});
