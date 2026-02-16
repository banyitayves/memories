// Storage key
const STORAGE_KEY = 'avatarConversationLibrary';

// State management
let projectAvatars = [];
let currentVideoBlob = null;
let currentVideoData = null;

// UI Elements
const avatarName = document.getElementById('avatarName');
const avatarPreset = document.getElementById('avatarPreset');
const skinTone = document.getElementById('skinTone');
const hairColor = document.getElementById('hairColor');
const outfit = document.getElementById('outfit');
const voiceGender = document.getElementById('voiceGender');
const script = document.getElementById('script');
const videoTitle = document.getElementById('videoTitle');
const videoDuration = document.getElementById('videoDuration');
const background = document.getElementById('background');
const generateBtn = document.getElementById('generateBtn');
const addAvatarBtn = document.getElementById('addAvatarBtn');
const projectAvatarsDisplay = document.getElementById('projectAvatars');
const avatarHead = document.getElementById('avatarHead');
const avatarBody = document.getElementById('avatarBody');

// Event Listeners
skinTone.addEventListener('change', updateAvatarPreview);
hairColor.addEventListener('change', updateAvatarPreview);
outfit.addEventListener('change', updateAvatarPreview);
avatarPreset.addEventListener('change', applyAvatarPreset);

script.addEventListener('input', (e) => {
    const length = e.target.value.length;
    document.querySelector('.char-count').textContent = `${length} / 5000 characters`;
    if (length > 5000) {
        script.value = script.value.substring(0, 5000);
    }
});

generateBtn.addEventListener('click', generateConversationVideo);

// Tab switching
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    event.target.classList.add('active');

    // Load library when switching to library tab
    if (tabName === 'library') {
        loadVideoLibrary();
    }

    // Update settings when switching to settings tab
    if (tabName === 'settings') {
        updateStorageInfo();
    }
}

// Avatar Management
function updateAvatarPreview() {
    const skin = skinTone.value;
    const hair = hairColor.value;
    
    avatarHead.style.backgroundColor = skin;
    avatarBody.style.background = `linear-gradient(to bottom, ${hair}, ${hair})`;
}

function applyAvatarPreset() {
    const preset = avatarPreset.value;
    const presets = {
        'professional': { skin: '#d4a574', hair: '#3d3d3d', outfit: 'formal' },
        'casual': { skin: '#c4956b', hair: '#5a4a42', outfit: 'casual' },
        'energetic': { skin: '#d4a574', hair: '#1a1a1a', outfit: 'sports' },
        'presenter': { skin: '#c4956b', hair: '#3d3d3d', outfit: 'business' },
        'coach': { skin: '#8b6f47', hair: '#4a4a4a', outfit: 'sports' },
        'teacher': { skin: '#d4a574', hair: '#5a4a42', outfit: 'business' }
    };

    const selectedPreset = presets[preset];
    if (selectedPreset) {
        skinTone.value = selectedPreset.skin;
        hairColor.value = selectedPreset.hair;
        outfit.value = selectedPreset.outfit;
        updateAvatarPreview();
    }
}

function addAvatarToProject() {
    const name = avatarName.value.trim();
    
    if (!name) {
        showToast('Please enter an avatar name!', 'error');
        return;
    }

    // Check if avatar name already exists
    if (projectAvatars.find(a => a.name.toLowerCase() === name.toLowerCase())) {
        showToast('Avatar name already exists! Use a different name.', 'error');
        return;
    }

    const newAvatar = {
        id: Date.now(),
        name: name,
        preset: avatarPreset.value,
        skinTone: skinTone.value,
        hairColor: hairColor.value,
        outfit: outfit.value,
        voice: voiceGender.value
    };

    projectAvatars.push(newAvatar);
    updateAvatarsList();
    resetAvatarForm();
    showToast(`✅ Avatar "${name}" added!`, 'success');
}

function removeAvatarFromProject(avatarId) {
    const avatar = projectAvatars.find(a => a.id === avatarId);
    projectAvatars = projectAvatars.filter(a => a.id !== avatarId);
    updateAvatarsList();
    showToast(`Avatar "${avatar.name}" removed`, 'success');
}

function updateAvatarsList() {
    if (projectAvatars.length === 0) {
        projectAvatarsDisplay.innerHTML = '<p class="empty-message">No avatars added yet. Add your first avatar!</p>';
        return;
    }

    projectAvatarsDisplay.innerHTML = projectAvatars.map(avatar => `
        <div class="avatar-card">
            <div class="avatar-card-mini" style="background: ${avatar.skinTone};">
                ${avatar.name.charAt(0).toUpperCase()}
            </div>
            <div class="avatar-card-name">${avatar.name}</div>
            <div class="avatar-card-voice">${getVoiceLabel(avatar.voice)}</div>
            <button class="avatar-card-remove" onclick="removeAvatarFromProject(${avatar.id})">Remove</button>
        </div>
    `).join('');
}

function getVoiceLabel(voice) {
    const labels = {
        'female-neutral': '♀️ Neutral',
        'female-cheerful': '♀️ Cheerful',
        'female-professional': '♀️ Pro',
        'male-neutral': '♂️ Neutral',
        'male-deep': '♂️ Deep',
        'male-energetic': '♂️ Energetic'
    };
    return labels[voice] || voice;
}

function resetAvatarForm() {
    avatarName.value = '';
    applyAvatarPreset();
}

// Video Generation
async function generateConversationVideo() {
    // Validation
    if (projectAvatars.length < 1) {
        showError('Please add at least one avatar to the conversation!');
        return;
    }

    const scriptText = script.value.trim();
    if (!scriptText) {
        showError('Please write a dialogue script!');
        return;
    }

    const title = videoTitle.value.trim() || 'Conversation Video';

    // Hide other elements
    hideAllOutputs();
    generateBtn.disabled = true;

    showStatus('Processing dialogue...');
    updateProgress(5);
    activateStep(1);

    try {
        // Parse dialogue script
        const dialogueLines = parseDialogue(scriptText);
        if (dialogueLines.length === 0) {
            throw new Error('Could not parse dialogue. Use format: AvatarName: What they say');
        }

        setTimeout(() => {
            updateProgress(25);
            statusMessage.textContent = 'Creating animation frames...';
            activateStep(2);
        }, 1000);

        // Generate video
        const videoBlob = await createMultiAvatarVideo(dialogueLines);

        setTimeout(() => {
            updateProgress(75);
            statusMessage.textContent = 'Finalizing video...';
            activateStep(3);
        }, 2000);

        setTimeout(() => {
            updateProgress(100);
            activateStep(4);
            displayVideo(videoBlob, title, dialogueLines);
            generateBtn.disabled = false;
        }, 3000);

    } catch (error) {
        generateBtn.disabled = false;
        showError(`Error: ${error.message}`);
        console.error('Generation error:', error);
    }
}

function parseDialogue(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const dialogue = [];

    lines.forEach(line => {
        const match = line.match(/^(.+?):\s*(.+)$/);
        if (match) {
            const speaker = match[1].trim();
            const text = match[2].trim();
            dialogue.push({ speaker, text });
        }
    });

    return dialogue;
}

async function createMultiAvatarVideo(dialogueLines) {
    return new Promise((resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = 1280;
            canvas.height = 720;
            const ctx = canvas.getContext('2d');

            const duration = parseInt(videoDuration.value);
            const fps = 30;
            const totalFrames = duration * fps;
            const bgColor = getBackgroundColor(background.value);
            const avatarCount = Math.min(projectAvatars.length, 3); // Max 3 avatars visible

            // Determine supported MIME type
            let mimeType = 'video/webm;codecs=vp9,opus';
            if (!MediaRecorder.isTypeSupported(mimeType)) {
                mimeType = 'video/webm';
            }

            const stream = canvas.captureStream(fps);
            const mediaRecorder = new MediaRecorder(stream, { mimeType });
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: mediaRecorder.mimeType || 'video/webm' });
                resolve(blob);
            };

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

                // Draw avatars
                const progress = frameCount / totalFrames;
                const currentLineIndex = Math.floor(progress * dialogueLines.length);
                const currentLine = dialogueLines[currentLineIndex];

                // Position avatars
                const avatarPositions = getAvatarPositions(avatarCount);
                
                for (let i = 0; i < Math.min(projectAvatars.length, avatarCount); i++) {
                    const avatar = projectAvatars[i];
                    const pos = avatarPositions[i];
                    const isSpeaking = currentLine && currentLine.speaker === avatar.name;
                    
                    drawAvatar(ctx, pos.x, pos.y, avatar, progress, isSpeaking);
                }

                // Draw current dialogue
                if (currentLine) {
                    drawDialogueText(ctx, currentLine.speaker, currentLine.text);
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

function getAvatarPositions(count) {
    if (count === 1) {
        return [{ x: 640, y: 350 }];
    } else if (count === 2) {
        return [
            { x: 320, y: 350 },
            { x: 960, y: 350 }
        ];
    } else {
        return [
            { x: 200, y: 350 },
            { x: 640, y: 280 },
            { x: 1080, y: 350 }
        ];
    }
}

function drawAvatar(ctx, x, y, avatar, progress, isSpeaking) {
    const scale = isSpeaking ? 1.08 : 1;
    const headSize = 65 * scale;
    const bodyHeight = 90 * scale;

    // Draw shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(x, y + 115, 50, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // HEAD BACKGROUND - Skin tone with gradient
    const headGradient = ctx.createRadialGradient(x - 15, y - 60, 10, x, y - 40, headSize);
    headGradient.addColorStop(0, '#ffffff');
    headGradient.addColorStop(0.5, avatar.skinTone);
    headGradient.addColorStop(1, '#c0a0a0');
    ctx.fillStyle = headGradient;
    ctx.beginPath();
    ctx.arc(x, y - 40, headSize, 0, Math.PI * 2);
    ctx.fill();

    // HAIR - Better representation
    ctx.fillStyle = avatar.hairColor || '#3d3d3d';
    // Top of head
    ctx.fillRect(x - headSize, y - 85, headSize * 2, headSize * 0.4);
    ctx.beginPath();
    ctx.arc(x, y - 90, headSize * 0.8, 0, Math.PI);
    ctx.fill();
    // Side hair
    ctx.beginPath();
    ctx.arc(x - headSize * 0.7, y - 50, headSize * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + headSize * 0.7, y - 50, headSize * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Eyes - White part
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(x - 20, y - 55, 12, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 20, y - 55, 12, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eye outline
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x - 20, y - 55, 12, 14, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x + 20, y - 55, 12, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Iris/Pupils with look direction
    const eyeLook = Math.sin(progress * Math.PI * 2) * 3;
    ctx.fillStyle = '#8B4513';
    ctx.beginPath();
    ctx.arc(x - 20 + eyeLook, y - 55, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20 + eyeLook, y - 55, 8, 0, Math.PI * 2);
    ctx.fill();

    // Pupil highlight
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x - 20 + eyeLook + 2, y - 57, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + 20 + eyeLook + 2, y - 57, 2, 0, Math.PI * 2);
    ctx.fill();

    // Eyelids for blink
    const blinkAmount = Math.max(0, Math.sin(progress * Math.PI * 10) - 0.9) * 5;
    if (blinkAmount > 0) {
        ctx.fillStyle = avatar.skinTone;
        ctx.fillRect(x - 32, y - 65, 64, blinkAmount);
        ctx.fillRect(x - 32, y - 45, 64, blinkAmount);
    }

    // NOSE
    ctx.fillStyle = '#d4a58a';
    ctx.beginPath();
    ctx.moveTo(x, y - 40);
    ctx.lineTo(x - 5, y - 25);
    ctx.lineTo(x, y - 23);
    ctx.lineTo(x + 5, y - 25);
    ctx.closePath();
    ctx.fill();

    // CHEEKS - Blush
    ctx.fillStyle = 'rgba(255, 100, 100, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x - 35, y - 35, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + 35, y - 35, 15, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // MOUTH - Expressions
    const mouthSmile = Math.sin(progress * Math.PI * 2) * 5;
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    
    if (isSpeaking) {
        // Speaking - open mouth
        const mouthOpen = Math.sin(progress * Math.PI * 4) * 6;
        ctx.ellipse(x, y - 15, 12, 8 + mouthOpen, 0, 0, Math.PI);
        ctx.stroke();
        
        // Tongue hint
        ctx.fillStyle = '#ff9999';
        ctx.beginPath();
        ctx.ellipse(x, y - 8, 8, 4, 0, 0, Math.PI);
        ctx.fill();
    } else {
        // Neutral/Smile mouth
        ctx.arc(x, y - 15, 15, 0, Math.PI);
        ctx.stroke();
    }

    // BODY - Clothing with gradient
    const bodyGradient = ctx.createLinearGradient(x - 30, y + 20, x + 30, y + bodyHeight);
    const outfitColor = getOutfitColor(avatar.outfit);
    bodyGradient.addColorStop(0, '#ffffff');
    bodyGradient.addColorStop(0.5, outfitColor);
    bodyGradient.addColorStop(1, '#000000');
    ctx.fillStyle = bodyGradient;
    ctx.fillRect(x - 35, y + 20, 70, bodyHeight);

    // Clothing details - button/tie area
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(x - 3, y + 30, 6, 50);

    // NECK
    ctx.fillStyle = avatar.skinTone;
    ctx.fillRect(x - 12, y + 5, 24, 15);

    // ARMS - Advanced
    const armRotation = Math.sin(progress * Math.PI * 2) * 0.25;
    
    // Left arm
    ctx.save();
    ctx.translate(x - 35, y + 35);
    ctx.rotate(armRotation);
    ctx.fillStyle = avatar.skinTone;
    ctx.fillRect(0, 0, 15, 45);
    // Hand
    ctx.fillStyle = avatar.skinTone;
    ctx.beginPath();
    ctx.arc(7, 45, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Right arm
    ctx.save();
    ctx.translate(x + 35, y + 35);
    ctx.rotate(-armRotation);
    ctx.fillStyle = avatar.skinTone;
    ctx.fillRect(-15, 0, 15, 45);
    // Hand
    ctx.fillStyle = avatar.skinTone;
    ctx.beginPath();
    ctx.arc(-7, 45, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // LEGS
    ctx.fillStyle = outfitColor;
    ctx.fillRect(x - 20, y + bodyHeight + 20, 15, 40);
    ctx.fillRect(x + 5, y + bodyHeight + 20, 15, 40);

    // SHOES
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(x - 22, y + bodyHeight + 60, 18, 10);
    ctx.fillRect(x + 4, y + bodyHeight + 60, 18, 10);

    // NAME LABEL - Enhanced
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(x - 50, y + 130, 100, 25);
    
    ctx.fillStyle = isSpeaking ? '#a78bfa' : '#ffffff';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(avatar.name, x, y + 142);

    // SPEAKING INDICATOR - Animated
    if (isSpeaking) {
        ctx.strokeStyle = '#a78bfa';
        ctx.lineWidth = 2;
        const pulse = Math.sin(progress * Math.PI * 4) * 3;
        for (let i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.arc(x, y - 40, 75 + (i * 10) + pulse, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
}

function drawDialogueText(ctx, speaker, text) {
    const boxPadding = 15;
    const boxX = 40;
    const boxY = 580;
    const boxWidth = 1200;
    const boxHeight = 120;

    // Dialogue box background with gradient
    const dialogueGradient = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
    dialogueGradient.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
    dialogueGradient.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = dialogueGradient;
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight);

    // Dialogue box border
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);

    // Corner accents
    ctx.fillStyle = '#a78bfa';
    ctx.fillRect(boxX, boxY, 3, 20);
    ctx.fillRect(boxX, boxY, 20, 3);
    ctx.fillRect(boxX + boxWidth - 3, boxY, 3, 20);
    ctx.fillRect(boxX + boxWidth - 20, boxY, 20, 3);

    // Speaker name with avatar indicator
    ctx.fillStyle = '#a78bfa';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('● ' + speaker, boxX + boxPadding + 5, boxY + boxPadding);

    // Dialogue text
    ctx.fillStyle = '#ffffff';
    ctx.font = '15px Arial';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    
    const maxCharsPerLine = 90;
    const words = text.split(' ');
    let line = '';
    let lineNum = 0;
    const lineHeight = 25;
    const startY = boxY + boxPadding + 35;

    words.forEach((word, index) => {
        const testLine = line + (line ? ' ' : '') + word;
        
        if (ctx.measureText(testLine).width > boxWidth - 2 * boxPadding - 20) {
            if (line) {
                ctx.fillText(line, boxX + boxPadding + 5, startY + (lineNum * lineHeight));
                lineNum++;
            }
            line = word;
        } else {
            line = testLine;
        }

        // Only show 2 lines max
        if (lineNum >= 2) return;
    });

    // Draw remaining text
    if (line && lineNum < 2) {
        ctx.fillText(line, boxX + boxPadding + 5, startY + (lineNum * lineHeight));
    }

    // Typing indicator if currently speaking
    ctx.fillStyle = '#a78bfa';
    ctx.font = '20px Arial';
    ctx.fillText('', boxX + boxWidth - boxPadding - 20, boxY + boxPadding + 30);
}

function getBackgroundColor(bgType) {
    const backgrounds = {
        'office': '#2c3e50',
        'studio': '#34495e',
        'conference': '#3d5a80',
        'nature': '#27ae60',
        'abstract': '#c0392b'
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

// Display Video
function displayVideo(videoBlob, title, dialogueLines) {
    hideAllOutputs();
    
    const playerContainer = document.getElementById('playerContainer');
    playerContainer.classList.remove('hidden');

    const videoSource = document.getElementById('videoSource');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoInfo = document.getElementById('videoInfo');

    // Create blob URL
    const videoUrl = URL.createObjectURL(videoBlob);
    videoSource.src = videoUrl;
    videoPlayer.load();

    currentVideoBlob = videoBlob;
    currentVideoData = {
        title: title,
        dialogueCount: dialogueLines.length,
        avatarCount: projectAvatars.length,
        created: new Date().toLocaleString(),
        duration: videoDuration.value
    };

    videoInfo.innerHTML = `
        <strong>🎬 Video Details:</strong><br>
        <span style="color: var(--text-secondary);">Title:</span> <span style="color: var(--primary-color);">${title}</span><br>
        <span style="color: var(--text-secondary);">Avatars:</span> <span style="color: var(--primary-color);">${projectAvatars.map(a => a.name).join(', ')}</span><br>
        <span style="color: var(--text-secondary);">Dialogue Lines:</span> <span style="color: var(--primary-color);">${dialogueLines.length}</span><br>
        <span style="color: var(--text-secondary);">Duration:</span> <span style="color: var(--primary-color);">${videoDuration.value} seconds</span><br>
        <hr style="border: 1px solid var(--border-color); margin: 10px 0;">
        <strong>📝 Script Preview:</strong><br>
        <em>${dialogueLines.slice(0, 3).map(d => `${d.speaker}: ${d.text.substring(0, 50)}...`).join('<br>')}</em>
    `;

    showToast('✅ Video created! Play it below.', 'success');
}

function downloadVideo() {
    if (!currentVideoBlob) {
        showError('No video to download');
        return;
    }

    const link = document.createElement('a');
    link.href = URL.createObjectURL(currentVideoBlob);
    link.download = `conversation-${Date.now()}.webm`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('📥 Video downloading...', 'success');
}

function saveVideoToLibrary() {
    if (!currentVideoBlob || !currentVideoData) {
        showError('No video to save');
        return;
    }

    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const videoEntry = {
        id: Date.now(),
        ...currentVideoData,
        blobData: currentVideoBlob.type // Store type for reference
    };

    videos.push(videoEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));

    // Store blob separately with ID
    localStorage.setItem(`video_${videoEntry.id}`, JSON.stringify({
        data: Array.from(new Uint8Array(currentVideoBlob)),
        type: currentVideoBlob.type
    }));

    showToast('💾 Video saved to library!', 'success');
}

function loadVideoLibrary() {
    const videoLibrary = document.getElementById('videoLibrary');
    const emptyLibrary = document.getElementById('emptyLibrary');
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    if (videos.length === 0) {
        videoLibrary.innerHTML = '';
        emptyLibrary.style.display = 'block';
        return;
    }

    emptyLibrary.style.display = 'none';
    videoLibrary.innerHTML = videos.map((video, index) => `
        <div class="video-card">
            <div class="video-card-thumbnail">🎬</div>
            <div class="video-card-info">
                <div class="video-card-title">${video.title}</div>
                <div class="video-card-date">${new Date(video.created).toLocaleDateString()}</div>
                <div class="video-card-actions">
                    <button class="video-card-btn" onclick="playLibraryVideo(${video.id})">▶️ Play</button>
                    <button class="video-card-btn" onclick="downloadLibraryVideo(${video.id})" style="background: var(--success-color);">⬇️</button>
                    <button class="video-card-btn" onclick="deleteLibraryVideo(${video.id})" style="background: var(--error-color);">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function playLibraryVideo(videoId) {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const video = videos.find(v => v.id === videoId);

    if (!video) return;

    // Try to retrieve stored blob
    const storedData = localStorage.getItem(`video_${videoId}`);
    if (storedData) {
        const { data, type } = JSON.parse(storedData);
        const blob = new Blob([new Uint8Array(data)], { type });

        // Switch to create tab and display video
        document.getElementById('create-tab').classList.add('active');
        document.getElementById('library-tab').classList.remove('active');
        document.querySelectorAll('.nav-tab')[0].classList.add('active');
        document.querySelectorAll('.nav-tab')[1].classList.remove('active');

        const playerContainer = document.getElementById('playerContainer');
        playerContainer.classList.remove('hidden');

        const videoSource = document.getElementById('videoSource');
        const videoPlayer = document.getElementById('videoPlayer');
        const videoUrl = URL.createObjectURL(blob);
        videoSource.src = videoUrl;
        videoPlayer.load();

        showToast(`▶️ Playing: ${video.title}`, 'success');
    }
}

function downloadLibraryVideo(videoId) {
    const storedData = localStorage.getItem(`video_${videoId}`);
    if (storedData) {
        const { data, type } = JSON.parse(storedData);
        const blob = new Blob([new Uint8Array(data)], { type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `conversation-${videoId}.webm`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('📥 Video downloading...', 'success');
    }
}

function deleteLibraryVideo(videoId) {
    if (confirm('Delete this video?')) {
        const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        const filtered = videos.filter(v => v.id !== videoId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        localStorage.removeItem(`video_${videoId}`);
        loadVideoLibrary();
        showToast('Video deleted', 'success');
    }
}

function deleteAllVideos() {
    if (confirm('Delete ALL videos from library? This cannot be undone!')) {
        localStorage.removeItem(STORAGE_KEY);
        const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        videos.forEach(v => localStorage.removeItem(`video_${v.id}`));
        loadVideoLibrary();
        showToast('All videos deleted', 'success');
    }
}

function searchVideos() {
    const query = document.getElementById('searchVideos').value.toLowerCase();
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const filtered = videos.filter(v => v.title.toLowerCase().includes(query));

    const videoLibrary = document.getElementById('videoLibrary');
    if (filtered.length === 0) {
        videoLibrary.innerHTML = '<div class="empty-state"><p>No videos found</p></div>';
        return;
    }

    videoLibrary.innerHTML = filtered.map(video => `
        <div class="video-card">
            <div class="video-card-thumbnail">🎬</div>
            <div class="video-card-info">
                <div class="video-card-title">${video.title}</div>
                <div class="video-card-date">${new Date(video.created).toLocaleDateString()}</div>
                <div class="video-card-actions">
                    <button class="video-card-btn" onclick="playLibraryVideo(${video.id})">▶️</button>
                    <button class="video-card-btn" onclick="downloadLibraryVideo(${video.id})">⬇️</button>
                    <button class="video-card-btn" onclick="deleteLibraryVideo(${video.id})">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

// UI Helper Functions
function showStatus(message) {
    document.getElementById('statusContainer').classList.remove('hidden');
    document.getElementById('status').textContent = message;
    const estimatedSeconds = Math.floor(Math.random() * 60) + 120;
    document.getElementById('estimatedTime').textContent = `⏱️ Creating video...`;
}

function updateProgress(percent) {
    document.getElementById('progressFill').style.width = percent + '%';
}

function activateStep(stepNum) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById(`step${stepNum}`)?.classList.add('active');
}

function showError(message) {
    hideAllOutputs();
    const errorContainer = document.getElementById('errorContainer');
    document.getElementById('errorMessage').textContent = message;
    errorContainer.classList.remove('hidden');
}

function hideError() {
    document.getElementById('errorContainer').classList.add('hidden');
}

function hideAllOutputs() {
    document.getElementById('statusContainer').classList.add('hidden');
    document.getElementById('playerContainer').classList.add('hidden');
    document.getElementById('errorContainer').classList.add('hidden');
}

function resetForm() {
    projectAvatars = [];
    script.value = '';
    videoTitle.value = '';
    updateAvatarsList();
    hideAllOutputs();
    showToast('Form cleared', 'success');
}

function updateStorageInfo() {
    const videos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    document.getElementById('videoCount').textContent = videos.length;
}

function clearAllData() {
    if (confirm('Clear ALL data including videos? This cannot be undone!')) {
        localStorage.clear();
        resetForm();
        updateStorageInfo();
        showToast('All data cleared', 'success');
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#7c3aed';
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateAvatarsList();
    updateStorageInfo();
    applyAvatarPreset();
    updateAvatarPreview();
    showToast('Welcome! Create conversation avatars to get started.', 'success');
});
