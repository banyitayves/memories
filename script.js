const STORAGE_KEYS = {
  journal: 'forever-us-journal',
  timeline: 'forever-us-timeline',
  gallery: 'forever-us-gallery',
  countdown: 'forever-us-countdown',
  calendar: 'forever-us-calendar',
  bucket: 'forever-us-bucket',
  map: 'forever-us-map',
  settings: 'forever-us-settings',
  touch: 'forever-us-touch',
  unlocked: 'forever-us-unlocked'
};

const unlockForm = document.getElementById('unlock-form');
const unlockPassword = document.getElementById('unlock-password');
const unlockMessage = document.getElementById('unlock-message');
const lockScreen = document.getElementById('lock-screen');
const settingsForm = document.getElementById('settings-form');
const playlistInput = document.getElementById('playlist-id');
const passwordInput = document.getElementById('settings-password');
const spotifyEmbed = document.getElementById('spotify-embed');
const sendTouchButton = document.getElementById('send-touch');
const touchStatus = document.getElementById('touch-status');

const timelineForm = document.getElementById('timeline-form');
const timelineTitle = document.getElementById('timeline-title');
const timelineDate = document.getElementById('timeline-date');
const timelineList = document.getElementById('timeline-list');

const photoForm = document.getElementById('photo-form');
const photoAlbum = document.getElementById('photo-album');
const photoInput = document.getElementById('photo-input');
const galleryGrid = document.getElementById('gallery-grid');

const journalForm = document.getElementById('journal-form');
const journalTitle = document.getElementById('journal-title');
const journalText = document.getElementById('journal-text');
const journalList = document.getElementById('journal-list');

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatResults = document.getElementById('chat-results');
const meetCounter = document.getElementById('meet-counter');

const countdownForm = document.getElementById('countdown-form');
const countdownTitle = document.getElementById('countdown-title');
const countdownDate = document.getElementById('countdown-date');
const countdownList = document.getElementById('countdown-list');

const calendarForm = document.getElementById('calendar-form');
const calendarTitle = document.getElementById('calendar-title');
const calendarDate = document.getElementById('calendar-date');
const calendarList = document.getElementById('calendar-list');

const portraitForm = document.getElementById('portrait-form');
const portraitInput = document.getElementById('portrait-input');
const portraitStyle = document.getElementById('portrait-style');
const portraitPreview = document.getElementById('portrait-preview');
const portraitImage = document.getElementById('portrait-image');
const portraitNote = document.getElementById('portrait-note');

const bucketForm = document.getElementById('bucket-form');
const bucketItem = document.getElementById('bucket-item');
const bucketListItems = document.getElementById('bucket-list-items');

const mapForm = document.getElementById('map-form');
const mapLocation = document.getElementById('map-location');
const mapLat = document.getElementById('map-lat');
const mapLng = document.getElementById('map-lng');
const mapPins = document.getElementById('map-pins');
const mapContainer = document.getElementById('map-container');

const playlistUrlPattern = /(?:https:\/\/open\.spotify\.com\/playlist\/)?([A-Za-z0-9]{22})/;
let mapInstance;
let pinLayer;

function loadData(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.settings)) || {};
  } catch {
    return {};
  }
}

function setSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function renderJournal() {
  const entries = loadData(STORAGE_KEYS.journal);
  journalList.innerHTML = entries.length
    ? entries.map(entry => `
        <article class="note-card">
          <h3>${escapeHtml(entry.title)}</h3>
          <p>${escapeHtml(entry.text)}</p>
          <p class="small-text">${new Date(entry.createdAt).toLocaleDateString()}</p>
        </article>
      `).join('')
    : '<p class="small-text">Your private scrapbook is empty. Write a note to each other to get started.</p>';
}

function renderTimeline() {
  const items = loadData(STORAGE_KEYS.timeline);
  timelineList.innerHTML = items.length
    ? items.map(item => `
        <article class="timeline-card">
          <time>${escapeHtml(item.date)}</time>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.note)}</p>
        </article>
      `).join('')
    : '<p class="small-text">Add a milestone to begin your timeline.</p>';
}

function renderGallery() {
  const photos = loadData(STORAGE_KEYS.gallery);
  galleryGrid.innerHTML = photos.length
    ? photos.map(photo => `
        <div class="gallery-item">
          <img src="${photo.dataUrl}" alt="${escapeHtml(photo.name)}" />
          <div class="gallery-meta">
            <strong>${escapeHtml(photo.name)}</strong>
            <p>${escapeHtml(photo.album)}</p>
          </div>
        </div>
      `).join('')
    : '<p class="small-text">Upload your first photo to store it safely here.</p>';
}

function renderCountdown() {
  const events = loadData(STORAGE_KEYS.countdown);
  countdownList.innerHTML = events.length
    ? events.map(event => {
        const days = Math.max(0, Math.ceil((new Date(event.date) - new Date()) / 86400000));
        return `
          <article class="countdown-card">
            <h3>${escapeHtml(event.title)}</h3>
            <p>${new Date(event.date).toLocaleDateString()}</p>
            <strong>${days} day${days === 1 ? '' : 's'} remaining</strong>
          </article>
        `;
      }).join('')
    : '<p class="small-text">Add a special date to start a countdown.</p>';
}

function renderCalendar() {
  const events = loadData(STORAGE_KEYS.calendar);
  calendarList.innerHTML = events.length
    ? events.map(event => {
        return `
          <article class="countdown-card">
            <h3>${escapeHtml(event.title)}</h3>
            <p>${new Date(event.date).toLocaleDateString()}</p>
            <p class="small-text">${escapeHtml(event.note || 'Shared calendar event')}</p>
          </article>
        `;
      }).join('')
    : '<p class="small-text">Your shared calendar is empty. Add a date to keep your plans together.</p>';
}

function renderBucketList() {
  const items = loadData(STORAGE_KEYS.bucket);
  bucketListItems.innerHTML = items.length
    ? items.map((item, index) => `
        <li class="bucket-item">
          <label>
            <input type="checkbox" data-index="${index}" ${item.done ? 'checked' : ''} />
            <span>${escapeHtml(item.text)}</span>
          </label>
          <button type="button" class="btn btn-small remove-bucket" data-index="${index}">Remove</button>
        </li>
      `).join('')
    : '<li class="small-text">Your bucket list is waiting. Add one dream together.</li>';
}

function renderMapPins() {
  const pins = loadData(STORAGE_KEYS.map);
  mapPins.innerHTML = pins.length
    ? pins.map((pin, index) => `
        <li class="map-pin">
          <h3>${escapeHtml(pin.location)}</h3>
          <p>${escapeHtml(pin.lat)}, ${escapeHtml(pin.lng)}</p>
          <button type="button" class="btn btn-small remove-pin" data-index="${index}">Remove</button>
        </li>
      `).join('')
    : '<li class="small-text">Pin a trip or destination to see it on the map.</li>';

  if (mapInstance) {
    pinLayer.clearLayers();
    pins.forEach(pin => {
      const marker = L.marker([parseFloat(pin.lat), parseFloat(pin.lng)]).addTo(pinLayer);
      marker.bindPopup(`<strong>${escapeHtml(pin.location)}</strong>`);
    });
    if (pins.length) {
      const bounds = pinLayer.getBounds();
      mapInstance.fitBounds(bounds, { padding: [50, 50] });
    }
  }
}

function applyPlaylist() {
  const settings = getSettings();
  const playlistId = settings.playlistId || '37i9dQZF1DXcBWIGoYBM5M';
  const match = playlistId.match(playlistUrlPattern);
  const id = match ? match[1] : playlistId;
  spotifyEmbed.src = `https://open.spotify.com/embed/playlist/${id}`;
  playlistInput.value = playlistId;
}

function updateTouchStatus() {
  const touches = loadData(STORAGE_KEYS.touch).length;
  touchStatus.textContent = touches
    ? `Touch sent ${touches} time${touches === 1 ? '' : 's'}.`
    : 'No touches sent yet.';
}

function updateMeetCounter() {
  if (!meetCounter) return;
  const met = new Date('2024-09-28T14:00:00');
  const now = new Date();
  const diff = now - met;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  meetCounter.textContent = `Since 28 September 2024: ${days} day${days === 1 ? '' : 's'}, ${hours} hour${hours === 1 ? '' : 's'}, ${minutes} minute${minutes === 1 ? '' : 's'}`;
}

function initializeMap() {
  if (!window.L) return;
  mapInstance = L.map(mapContainer, { zoomControl: false }).setView([2.0, 30.0], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(mapInstance);
  pinLayer = L.layerGroup().addTo(mapInstance);
  renderMapPins();
}

function previewPortrait(dataUrl, style) {
  portraitImage.src = dataUrl;
  portraitImage.style.filter = style === 'anime'
    ? 'contrast(1.2) saturate(1.4) hue-rotate(10deg)'
    : style === 'watercolor'
    ? 'brightness(1.05) saturate(0.9) blur(0.2px)'
    : style === 'pastel'
    ? 'contrast(0.95) saturate(1.1) sepia(0.15)'
    : 'contrast(1.15) saturate(1.3)';
  portraitNote.textContent = `Preview style: ${style.charAt(0).toUpperCase() + style.slice(1)}.`;
  portraitPreview.classList.remove('hidden');
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function checkLock() {
  const settings = getSettings();
  const password = settings.password;
  const unlocked = localStorage.getItem(STORAGE_KEYS.unlocked) === 'true';
  if (password && !unlocked) {
    lockScreen.classList.remove('hidden');
  } else {
    lockScreen.classList.add('hidden');
  }
}

unlockForm.addEventListener('submit', event => {
  event.preventDefault();
  const settings = getSettings();
  if (unlockPassword.value === settings.password) {
    localStorage.setItem(STORAGE_KEYS.unlocked, 'true');
    lockScreen.classList.add('hidden');
    unlockMessage.textContent = '';
  } else {
    unlockMessage.textContent = 'Password not recognized. Please try again.';
  }
  unlockPassword.value = '';
});

settingsForm.addEventListener('submit', event => {
  event.preventDefault();
  const settings = getSettings();
  if (playlistInput.value.trim()) settings.playlistId = playlistInput.value.trim();
  if (passwordInput.value.trim()) settings.password = passwordInput.value.trim();
  setSettings(settings);
  applyPlaylist();
  checkLock();
  passwordInput.value = '';
  alert('Settings saved. If you set a password, refresh the page to test the lock screen.');
});

sendTouchButton.addEventListener('click', () => {
  const touches = loadData(STORAGE_KEYS.touch);
  touches.unshift({ date: new Date().toISOString() });
  saveData(STORAGE_KEYS.touch, touches);
  updateTouchStatus();
  window.navigator.vibrate?.(100);
});

timelineForm.addEventListener('submit', event => {
  event.preventDefault();
  const items = loadData(STORAGE_KEYS.timeline);
  items.unshift({ title: timelineTitle.value.trim(), date: timelineDate.value, note: 'A special memory on this day.' });
  saveData(STORAGE_KEYS.timeline, items);
  timelineTitle.value = '';
  timelineDate.value = '';
  renderTimeline();
});

photoForm.addEventListener('submit', event => {
  event.preventDefault();
  const file = photoInput.files[0];
  if (!file || !photoAlbum.value.trim()) return;
  const reader = new FileReader();
  reader.onload = () => {
    const gallery = loadData(STORAGE_KEYS.gallery);
    gallery.unshift({
      id: Date.now(),
      album: photoAlbum.value.trim(),
      name: file.name,
      dataUrl: reader.result
    });
    saveData(STORAGE_KEYS.gallery, gallery);
    photoInput.value = '';
    photoAlbum.value = '';
    renderGallery();
  };
  reader.readAsDataURL(file);
});

portraitForm.addEventListener('submit', event => {
  event.preventDefault();
  const file = portraitInput.files[0];
  const style = portraitStyle.value;
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    previewPortrait(reader.result, style);
  };
  reader.readAsDataURL(file);
});

journalForm.addEventListener('submit', event => {
  event.preventDefault();
  const entries = loadData(STORAGE_KEYS.journal);
  entries.unshift({ title: journalTitle.value.trim(), text: journalText.value.trim(), createdAt: new Date().toISOString() });
  saveData(STORAGE_KEYS.journal, entries);
  journalTitle.value = '';
  journalText.value = '';
  renderJournal();
});

chatForm.addEventListener('submit', event => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
  const counts = { love: 0, you: 0, miss: 0 };
  let yves = 0;
  let yvonne = 0;

  lines.forEach(line => {
    const lower = line.toLowerCase();
    counts.love += (lower.match(/love/g) || []).length;
    counts.you += (lower.match(/you/g) || []).length;
    counts.miss += (lower.match(/miss/g) || []).length;
    if (line.startsWith('Yves:')) yves += 1;
    if (line.startsWith('Yvonne:')) yvonne += 1;
  });

  const speakerMessage = yves === yvonne ? 'You both are equally expressive.' : yves > yvonne ? 'Yves sends more messages in this sample.' : 'Yvonne sends more messages in this sample.';

  chatResults.classList.remove('hidden');
  chatResults.innerHTML = `
    <div class="stats-row">
      <div class="stat-bar"><label>Love count<span>${counts.love}</span></label><progress value="${counts.love}" max="10"></progress></div>
      <div class="stat-bar"><label>You count<span>${counts.you}</span></label><progress value="${counts.you}" max="10"></progress></div>
    </div>
    <div class="stats-row">
      <div class="stat-bar"><label>Miss count<span>${counts.miss}</span></label><progress value="${counts.miss}" max="10"></progress></div>
      <div class="stat-bar"><label>Messages by speaker<span>${yves} / ${yvonne}</span></label><progress value="${Math.min(10, Math.max(yves, yvonne))}" max="10"></progress></div>
    </div>
    <p class="small-text">${speakerMessage}</p>
  `;
});

countdownForm.addEventListener('submit', event => {
  event.preventDefault();
  const events = loadData(STORAGE_KEYS.countdown);
  events.unshift({ title: countdownTitle.value.trim(), date: countdownDate.value });
  saveData(STORAGE_KEYS.countdown, events);
  countdownTitle.value = '';
  countdownDate.value = '';
  renderCountdown();
});

calendarForm.addEventListener('submit', event => {
  event.preventDefault();
  const events = loadData(STORAGE_KEYS.calendar);
  events.unshift({ title: calendarTitle.value.trim(), date: calendarDate.value, note: 'Shared calendar entry' });
  saveData(STORAGE_KEYS.calendar, events);
  calendarTitle.value = '';
  calendarDate.value = '';
  renderCalendar();
});

bucketForm.addEventListener('submit', event => {
  event.preventDefault();
  const items = loadData(STORAGE_KEYS.bucket);
  items.unshift({ text: bucketItem.value.trim(), done: false });
  saveData(STORAGE_KEYS.bucket, items);
  bucketItem.value = '';
  renderBucketList();
});

bucketListItems.addEventListener('change', event => {
  if (!event.target.matches('input[type="checkbox"]')) return;
  const index = Number(event.target.dataset.index);
  const items = loadData(STORAGE_KEYS.bucket);
  items[index].done = event.target.checked;
  saveData(STORAGE_KEYS.bucket, items);
  renderBucketList();
});

bucketListItems.addEventListener('click', event => {
  if (!event.target.matches('.remove-bucket')) return;
  const index = Number(event.target.dataset.index);
  const items = loadData(STORAGE_KEYS.bucket);
  items.splice(index, 1);
  saveData(STORAGE_KEYS.bucket, items);
  renderBucketList();
});

mapForm.addEventListener('submit', event => {
  event.preventDefault();
  const pins = loadData(STORAGE_KEYS.map);
  pins.unshift({ location: mapLocation.value.trim(), lat: mapLat.value.trim(), lng: mapLng.value.trim() });
  saveData(STORAGE_KEYS.map, pins);
  mapLocation.value = '';
  mapLat.value = '';
  mapLng.value = '';
  renderMapPins();
});

mapPins.addEventListener('click', event => {
  if (!event.target.matches('.remove-pin')) return;
  const index = Number(event.target.dataset.index);
  const pins = loadData(STORAGE_KEYS.map);
  pins.splice(index, 1);
  saveData(STORAGE_KEYS.map, pins);
  renderMapPins();
});

function initializePage() {
  applyPlaylist();
  renderJournal();
  renderTimeline();
  renderGallery();
  renderCountdown();
  renderCalendar();
  renderBucketList();
  initializeMap();
  updateTouchStatus();
  updateMeetCounter();
  setInterval(updateMeetCounter, 60000);
  checkLock();
}

window.addEventListener('DOMContentLoaded', initializePage);
