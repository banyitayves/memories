// Configuration
const API_CONFIG = {
    // Using Hugging Face API for music generation
    // Get your free API key at: https://huggingface.co/settings/tokens
    API_KEY: 'YOUR_HUGGING_FACE_API_KEY_HERE', // Replace with your actual API key
    INFERENCE_ENDPOINT: 'https://api-inference.huggingface.co/models/',
    MODEL: 'facebook/musicgen-medium' // Music generation model
};

// UI Elements
const lyricsInput = document.getElementById('lyrics');
const styleSelect = document.getElementById('style');
const tempoSlider = document.getElementById('tempo');
const tempoValue = document.getElementById('tempoValue');
const durationSelect = document.getElementById('duration');
const generateBtn = document.getElementById('generateBtn');
const statusContainer = document.getElementById('statusContainer');
const statusMessage = document.getElementById('status');
const progressFill = document.getElementById('progressFill');
const estimatedTime = document.getElementById('estimatedTime');
const playerContainer = document.getElementById('playerContainer');
const audioSource = document.getElementById('audioSource');
const musicPlayer = document.getElementById('musicPlayer');
const downloadBtn = document.getElementById('downloadBtn');
const regenerateBtn = document.getElementById('regenerateBtn');
const musicInfo = document.getElementById('musicInfo');
const errorContainer = document.getElementById('errorContainer');
const errorMessage = document.getElementById('errorMessage');
const retryBtn = document.getElementById('retryBtn');

// Character counter
lyricsInput.addEventListener('input', (e) => {
    const length = e.target.value.length;
    document.querySelector('.char-count').textContent = `${length} / 1000 characters`;
    if (length > 1000) {
        lyricsInput.value = lyricsInput.value.substring(0, 1000);
    }
});

// Tempo slider update
tempoSlider.addEventListener('input', (e) => {
    tempoValue.textContent = e.target.value;
});

// Generate button click
generateBtn.addEventListener('click', generateMusic);
retryBtn.addEventListener('click', generateMusic);
regenerateBtn.addEventListener('click', generateMusic);

// Download button
downloadBtn.addEventListener('click', downloadMusic);

async function generateMusic() {
    // Validation
    const lyrics = lyricsInput.value.trim();
    
    if (!lyrics) {
        showError('Please enter some lyrics first!');
        return;
    }

    if (API_CONFIG.API_KEY === 'YOUR_HUGGING_FACE_API_KEY_HERE') {
        showError('⚠️ API Key not configured. Please follow the setup instructions in the README file!');
        return;
    }

    // Clear previous states
    hideAll();
    generateBtn.disabled = true;
    
    // Show loading state
    showStatus('Analyzing lyrics and preparing music generation...');
    updateProgress(10);

    try {
        // Create description from lyrics and settings
        const style = styleSelect.value;
        const tempo = tempoSlider.value;
        const duration = durationSelect.value;
        
        const prompt = createMusicPrompt(lyrics, style, tempo);
        
        setTimeout(() => {
            updateProgress(25);
            statusMessage.textContent = 'Generating musical composition...';
        }, 1000);

        setTimeout(() => {
            updateProgress(50);
            statusMessage.textContent = 'Adding instruments and effects...';
        }, 3000);

        // Call Hugging Face API for music generation
        const audioData = await generateMusicFromText(prompt);
        
        updateProgress(85);
        statusMessage.textContent = 'Finalizing your music...';

        // Convert to blob and create URL
        const audioBlob = new Blob([audioData], { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        
        updateProgress(100);
        
        // Display player
        setTimeout(() => {
            displayMusicPlayer(audioUrl, lyrics, style, tempo, duration);
            generateBtn.disabled = false;
        }, 500);

    } catch (error) {
        generateBtn.disabled = false;
        showError(`Error generating music: ${error.message}`);
        console.error('Generation error:', error);
    }
}

function createMusicPrompt(lyrics, style, tempo) {
    const tempoDescription = tempo < 90 ? 'slow' : tempo > 140 ? 'fast' : 'moderate';
    
    return `Create a ${style} song with ${tempoDescription} tempo. The song should feature the following lyrics: "${lyrics.substring(0, 200)}...". Make it melodic and emotionally engaging.`;
}

async function generateMusicFromText(prompt) {
    try {
        // Using Hugging Face API
        const response = await fetch(
            `${API_CONFIG.INFERENCE_ENDPOINT}${API_CONFIG.MODEL}`,
            {
                headers: { Authorization: `Bearer ${API_CONFIG.API_KEY}` },
                method: "POST",
                body: JSON.stringify({ inputs: prompt }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            
            if (response.status === 503) {
                throw new Error('Model is loading. Please wait a moment and try again.');
            }
            
            throw new Error(errorData.error || 'Failed to generate music');
        }

        return await response.arrayBuffer();
    } catch (error) {
        throw error;
    }
}

function displayMusicPlayer(audioUrl, lyrics, style, tempo, duration) {
    hideAll();
    playerContainer.classList.remove('hidden');
    
    audioSource.src = audioUrl;
    musicPlayer.load();
    
    // Display music information
    const durationSeconds = parseInt(duration);
    const durationText = durationSeconds < 60 
        ? `${durationSeconds} seconds` 
        : `${Math.floor(durationSeconds / 60)} minute${Math.floor(durationSeconds / 60) > 1 ? 's' : ''}`;
    
    musicInfo.innerHTML = `
        <strong>🎵 Music Details:</strong><br>
        Style: <span style="color: var(--primary-color);">${style.toUpperCase()}</span><br>
        Tempo: <span style="color: var(--primary-color);">${tempo} BPM</span><br>
        Duration: <span style="color: var(--primary-color);">${durationText}</span><br>
        <br>
        <strong>📝 Your Lyrics:</strong><br>
        <em style="color: var(--text-secondary);">"${lyrics.substring(0, 150)}${lyrics.length > 150 ? '...' : ''}"</em>
    `;
    
    // Store data for download
    window.currentAudioUrl = audioUrl;
    window.currentLyrics = lyrics;
}

function downloadMusic() {
    const link = document.createElement('a');
    link.href = window.currentAudioUrl;
    link.download = `ai-music-${Date.now()}.wav`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showStatus(message) {
    statusContainer.classList.remove('hidden');
    playerContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');
    statusMessage.textContent = message;
    
    const estimatedSeconds = Math.floor(Math.random() * 60) + 90; // 90-150 seconds
    estimatedTime.textContent = `⏱️ Estimated time: ${estimatedSeconds} seconds`;
}

function updateProgress(percent) {
    progressFill.style.width = percent + '%';
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

// Alternative implementation using a simple local audio generation fallback
// This creates a basic audio demonstration
async function generateLocalAudio(prompt) {
    // Create a simple audio buffer as a demonstration
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const duration = parseInt(durationSelect.value);
    const sampleRate = audioContext.sampleRate;
    const audioBuffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const channelData = audioBuffer.getChannelData(0);
    
    const tempo = parseInt(tempoSlider.value);
    const frequency = 440; // Base frequency
    
    // Generate simple sine wave
    for (let i = 0; i < audioBuffer.length; i++) {
        channelData[i] = Math.sin(2 * Math.PI * frequency * i / sampleRate) * 0.3;
    }
    
    return audioBuffer;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Music Generator initialized');
    console.log('To enable music generation, configure your Hugging Face API key');
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Enter to generate music
    if (e.ctrlKey && e.key === 'Enter') {
        if (!generateBtn.disabled) {
            generateMusic();
        }
    }
});
