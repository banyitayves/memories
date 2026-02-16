// ==================== Translations ====================
const translations = {
    en: {
        subtitle: "Summarize documents and answer academic questions instantly",
        documents: "Documents",
        dragFiles: "Drag files here or",
        browse: "Browse Files",
        acceptedFormats: "Accepted: PDF, TXT, DOC, DOCX",
        uploadedDocuments: "Uploaded Documents",
        noDocuments: "No documents yet",
        summarizer: "📋 Summarizer",
        qaAssistant: "❓ Q&A Assistant",
        summarizerTitle: "Document Summarizer",
        selectDoc: "Select a document to summarize...",
        short: "Short (3-5 points)",
        medium: "Medium (5-10 points)",
        long: "Long (10+ points)",
        generateSummary: "Generate Summary",
        placeholderSummary: "Select a document and click \"Generate Summary\" to get started",
        qaTitle: "Academic Q&A Assistant",
        selectAny: "Ask questions about any topic...",
        qaHint: "Tip: Select a document above for context-based answers",
        welcomeMessage: "Hello! I'm your Academic Assistant. Ask me any questions about your documents or general academic topics. How can I help you today?",
        askQuestion: "Ask your academic question...",
        send: "Send",
        documentUploaded: "uploaded successfully!",
        documentRemoved: "Document removed",
        selectDocument: "Please select a document to summarize",
        selectQuestion: "Please enter a question",
        noDocumentSelected: "Document already",
        summary: "Summary",
        mainTopics: "Main Topics",
        relevance: "Relevance",
        documentStats: "Document Statistics",
        wordCount: "Total Word Count",
        words: "words",
        sentenceCount: "Total Sentences",
        sentences: "sentences",
        avgSentence: "Average Sentence Length",
        readingTime: "Estimated Reading Time",
        minutes: "minutes",
        readability: "Readability Score",
        definition: "Definition/Explanation",
        explanation: "Explanation",
        answer: "Answer",
        steps: "Steps/Process",
        timeline: "When/Timeline",
        location: "Location/Place",
        basedonContent: "Based on content from your document",
        informationSource: "Information sourced from your document",
        basedondoc: "Information from your uploaded document",
        responseFrom: "Response based on your document content"
    },
    fr: {
        subtitle: "Résumez des documents et répondez à des questions académiques instantanément",
        documents: "Documents",
        dragFiles: "Faites glisser les fichiers ici ou",
        browse: "Parcourir les fichiers",
        acceptedFormats: "Formats acceptés: PDF, TXT, DOC, DOCX",
        uploadedDocuments: "Documents téléchargés",
        noDocuments: "Aucun document pour le moment",
        summarizer: "📋 Résumé",
        qaAssistant: "❓ Assistant Q&A",
        summarizerTitle: "Résumé de document",
        selectDoc: "Sélectionnez un document à résumer...",
        short: "Court (3-5 points)",
        medium: "Moyen (5-10 points)",
        long: "Long (10+ points)",
        generateSummary: "Générer le résumé",
        placeholderSummary: "Sélectionnez un document et cliquez sur \"Générer le résumé\" pour commencer",
        qaTitle: "Assistant Q&A académique",
        selectAny: "Posez des questions sur n'importe quel sujet...",
        qaHint: "Conseil: Sélectionnez un document ci-dessus pour des réponses contextuelles",
        welcomeMessage: "Bonjour! Je suis votre assistant académique. Posez-moi des questions sur vos documents ou des sujets académiques généraux. Comment puis-je vous aider?",
        askQuestion: "Posez votre question académique...",
        send: "Envoyer",
        documentUploaded: "téléchargé avec succès!",
        documentRemoved: "Document supprimé",
        selectDocument: "Veuillez sélectionner un document à résumer",
        selectQuestion: "Veuillez entrer une question",
        noDocumentSelected: "Document déjà",
        summary: "Résumé",
        mainTopics: "Sujets principaux",
        relevance: "Pertinence",
        documentStats: "Statistiques du document",
        wordCount: "Nombre total de mots",
        words: "mots",
        sentenceCount: "Nombre total de phrases",
        sentences: "phrases",
        avgSentence: "Longueur moyenne de la phrase",
        readingTime: "Temps de lecture estimé",
        minutes: "minutes",
        readability: "Score de lisibilité",
        definition: "Définition/Explication",
        explanation: "Explication",
        answer: "Réponse",
        steps: "Étapes/Processus",
        timeline: "Quand/Chronologie",
        location: "Lieu/Place",
        basedonContent: "Basé sur le contenu de votre document",
        informationSource: "Informations tirées de votre document",
        basedondoc: "Information de votre document téléchargé",
        responseFrom: "Réponse basée sur le contenu de votre document"
    },
    sw: {
        subtitle: "Muhtasari wa nyaraka na jibu maswali ya elimu mara moja",
        documents: "Nyaraka",
        dragFiles: "Buruta faili hapa au",
        browse: "Fungua Faili",
        acceptedFormats: "Muundo unaokubalika: PDF, TXT, DOC, DOCX",
        uploadedDocuments: "Nyaraka Zilizokutana",
        noDocuments: "Hakuna nyaraka bado",
        summarizer: "📋 Muhtasari",
        qaAssistant: "❓ Msaada wa Maswali",
        summarizerTitle: "Muhtasari wa Nyaraka",
        selectDoc: "Chagua nyaraka ya kutengeneza muhtasari...",
        short: "Fupi (3-5 pointi)",
        medium: "Midway (5-10 pointi)",
        long: "Ndefu (10+ pointi)",
        generateSummary: "Tengeneza Muhtasari",
        placeholderSummary: "Chagua nyaraka na ubofye \"Tengeneza Muhtasari\" kuanza",
        qaTitle: "Msaada wa Maswali ya Elimu",
        selectAny: "Uliza maswali kuhusu mada yoyote...",
        qaHint: "Kidokezo: Chagua nyaraka hapo juu kwa majibu ya muktadha",
        welcomeMessage: "Habari! Mimi ni Msaada wako wa Elimu. Niulize maswali kuhusu nyaraka zako au mada za elimu ya jumla. Je, naweza kukusaidia vipi leo?",
        askQuestion: "Uliza swali lako la elimu...",
        send: "Tuma",
        documentUploaded: "iliyofanya haraka!",
        documentRemoved: "Nyaraka imeondolewa",
        selectDocument: "Tafadhali chagua nyaraka ya kutengeneza muhtasari",
        selectQuestion: "Tafadhali ingiza swali",
        noDocumentSelected: "Nyaraka tayari",
        summary: "Muhtasari",
        mainTopics: "Mada Kuu",
        relevance: "Uhusiano",
        documentStats: "Takwimu za Nyaraka",
        wordCount: "Jumla ya Maneno",
        words: "maneno",
        sentenceCount: "Jumla ya Sentensi",
        sentences: "sentensi",
        avgSentence: "Urefu wa Wastani wa Sentensi",
        readingTime: "Muda wa Kusoma Unatarajiwa",
        minutes: "dakika",
        readability: "Alama ya Kusoma",
        definition: "Ufafanuzi/Maelezo",
        explanation: "Maelezo",
        answer: "Jibu",
        steps: "Hatua/Mchakato",
        timeline: "Wakati/Mtindo wa Wakati",
        location: "Eneo/Mahali",
        basedonContent: "Kulingana na maudhui ya nyaraka yako",
        informationSource: "Habari iliyotoka kwa nyaraka yako",
        basedondoc: "Habari kutoka kwa nyaraka yako iliyotumuwa",
        responseFrom: "Jibu kulingana na maudhui ya nyaraka yako"
    },
    rw: {
        subtitle: "Muryango ny inyandiko no magire ibibazo by'amashuri kirahure",
        documents: "Inyandiko",
        dragFiles: "Sumuza inyandiko hano cyangwa",
        browse: "Rébuka Inyandiko",
        acceptedFormats: "Imiterere ishyikiranwa: PDF, TXT, DOC, DOCX",
        uploadedDocuments: "Inyandiko Zahayeko",
        noDocuments: "Nta nyandiko kugirango",
        summarizer: "📋 Muryango",
        qaAssistant: "❓ Umugabane w'Ibibazo",
        summarizerTitle: "Muryango ry'Inyandiko",
        selectDoc: "Hitamo inyandiko yo gukora muryango...",
        short: "Kafi (3-5 ingingo)",
        medium: "Hagati (5-10 ingingo)",
        long: "Kirekire (10+ ingingo)",
        generateSummary: "Kora Muryango",
        placeholderSummary: "Hitamo inyandiko hanyuma ubike \"Kora Muryango\" kuva",
        qaTitle: "Umugabane w'Ibibazo by'Amashuri",
        selectAny: "Baza ibibazo ku nthu yose...",
        qaHint: "Iyifatiro: Hitamo inyandiko haruguru nta magire yizera",
        welcomeMessage: "Muraho! Ndi Umugabane wacu w'Amashuri. Ndi baze ibibazo bijyanye n'inyandiko zacu cyangwa inthu z'amashuri nimwega. Nigute nshobora gukugabana?",
        askQuestion: "Baza ibibazo by'amashuri...",
        send: "Ohereza",
        documentUploaded: "yashyikiwe neza!",
        documentRemoved: "Inyandiko yasibwe",
        selectDocument: "Nyine hitamo inyandiko yo gukora muryango",
        selectQuestion: "Nyine injiza ibibazo",
        noDocumentSelected: "Inyandiko ari",
        summary: "Muryango",
        mainTopics: "Ingingo Nyinshi",
        relevance: "Uko bijyanye",
        documentStats: "Igisubizo cy'Inyandiko",
        wordCount: "Umubare w'Amagambo",
        words: "amagambo",
        sentenceCount: "Umubare w'Imyumvire",
        sentences: "imyumvire",
        avgSentence: "Uburebure Bwa Gisubizo",
        readingTime: "Igihe Cy'I Soma Giteganywa",
        minutes: "iminota",
        readability: "Ikipimo cy'I Soma",
        definition: "Ibisobanuro/Ibisobanuro",
        explanation: "Ibisobanuro",
        answer: "Isubizo",
        steps: "Intambwe/Inzira",
        timeline: "Igihe/Uko Igihe Kigenda",
        location: "Aho/Aho",
        basedonContent: "Ukurikije ibintu muri inyandiko yacu",
        informationSource: "Ibimenyetso bivuye kuri inyandiko yacu",
        basedondoc: "Ibimenyetso biva kuri inyandiko yacu yashyikiwe",
        responseFrom: "Isubizo kurikije ibintu muri inyandiko yacu"
    }
};

// ==================== State Management ====================
const state = {
    documents: [],
    currentDocument: null,
    chatHistory: [],
    currentLanguage: localStorage.getItem('language') || 'en'
};

// ==================== DOM Elements ====================
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const documentList = document.getElementById('documentList');
const documentSelect = document.getElementById('documentSelect');
const qaDocumentSelect = document.getElementById('qaDocumentSelect');
const summarizeBtn = document.getElementById('summarizeBtn');
const summaryOutput = document.getElementById('summaryOutput');
const chatMessages = document.getElementById('chatMessages');
const questionInput = document.getElementById('questionInput');
const sendBtn = document.getElementById('sendBtn');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const languageSelect = document.getElementById('languageSelect');

// ==================== Event Listeners ====================
uploadArea.addEventListener('click', () => fileInput.click());
uploadArea.addEventListener('dragover', handleDragOver);
uploadArea.addEventListener('dragleave', handleDragLeave);
uploadArea.addEventListener('drop', handleDrop);
fileInput.addEventListener('change', handleFileSelect);

summarizeBtn.addEventListener('click', generateSummary);
sendBtn.addEventListener('click', sendQuestion);
questionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendQuestion();
});

documentSelect.addEventListener('change', (e) => {
    state.currentDocument = e.target.value;
});

qaDocumentSelect.addEventListener('change', (e) => {
    state.currentDocument = e.target.value;
    updateQuestionPaperDisplay();
});

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

languageSelect.addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// ==================== File Upload Handling ====================
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    handleFiles(files);
}

function handleFileSelect(e) {
    handleFiles(e.target.files);
}

function handleFiles(files) {
    Array.from(files).forEach(file => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            const content = e.target.result;
            addDocument({
                name: file.name,
                type: file.type,
                size: file.size,
                content: content,
                uploadDate: new Date().toLocaleDateString()
            });
        };
        
        if (file.type === 'text/plain') {
            fileReader.readAsText(file);
        } else {
            fileReader.readAsText(file); // Simplified for demo
        }
    });
}

function addDocument(doc) {
    // Check if document already exists
    if (state.documents.some(d => d.name === doc.name)) {
        showAlert(t('noDocumentSelected') + ' uploaded', 'error');
        return;
    }
    
    // Detect if this is a question paper
    const isQuestionPaper = detectQuestionPaper(doc.content);
    doc.isQuestionPaper = isQuestionPaper;
    
    if (isQuestionPaper) {
        doc.questions = extractQuestionsFromPaper(doc.content);
    }
    
    state.documents.push(doc);
    updateDocumentLists();
    
    showAlert(`"${doc.name}" ${t('documentUploaded')}`, 'success');
}

function removeDocument(name) {
    state.documents = state.documents.filter(d => d.name !== name);
    updateDocumentLists();
    showAlert(t('documentRemoved'), 'success');
}

function updateDocumentLists() {
    // Update sidebar document list
    if (state.documents.length === 0) {
        documentList.innerHTML = `<li class="empty-state">${t('noDocuments')}</li>`;
    } else {
        documentList.innerHTML = state.documents.map(doc => `
            <li>
                <span class="doc-name" title="${doc.name}">
                    ${doc.isQuestionPaper ? '❓ ' : '📄 '}${doc.name}
                </span>
                <button class="doc-delete" onclick="removeDocument('${doc.name}')">Delete</button>
            </li>
        `).join('');
    }
    
    // Update select dropdowns
    const docOptions = state.documents
        .filter(doc => !doc.isQuestionPaper) // Exclude question papers from summarizer
        .map(doc => `<option value="${doc.name}">${doc.name}</option>`)
        .join('');
    
    documentSelect.innerHTML = `<option value="">${t('selectDoc')}</option>` + docOptions;
    
    // For Q&A: show all documents
    const qaOptions = state.documents.map(doc => {
        const label = doc.isQuestionPaper ? `${doc.name} (❓)` : doc.name;
        return `<option value="${doc.name}">${label}</option>`;
    }).join('');
    
    qaDocumentSelect.innerHTML = `<option value="">${t('selectAny')}</option>` + qaOptions;
    
    // Update question paper selector if they exist
    const questionPapers = state.documents.filter(d => d.isQuestionPaper);
    if (questionPapers.length > 0) {
        updateQuestionPaperButtons(questionPapers);
    }
}

// ==================== Summarization ====================
function generateSummary() {
    const selectedDoc = state.documents.find(d => d.name === state.currentDocument);
    
    if (!selectedDoc) {
        showAlert(t('selectDocument'), 'error');
        return;
    }
    
    const summaryLength = document.querySelector('input[name="summaryLength"]:checked').value;
    summarizeBtn.disabled = true;
    summaryOutput.innerHTML = '';
    
    // Show progress bar
    const progressContainer = document.getElementById('summaryProgress');
    progressContainer.style.display = 'block';
    
    const processingTime = 800; // 800ms
    startProgressTimer('summaryTimer', 'summaryProgressFill', processingTime);
    
    // Generate summary
    setTimeout(() => {
        const summary = createSummary(selectedDoc.content, summaryLength);
        summaryOutput.innerHTML = summary;
        progressContainer.style.display = 'none';
        summarizeBtn.disabled = false;
    }, processingTime);
}

function createSummary(content, length) {
    // Extract and clean sentences
    const sentences = extractSentences(content);
    const numSentences = length === 'short' ? 3 : length === 'medium' ? 5 : 8;
    
    // Score sentences based on importance
    const scoredSentences = scoreSentences(sentences, content);
    
    // Get top sentences for summary
    const topSentences = scoredSentences
        .slice(0, numSentences)
        .sort((a, b) => a.original_index - b.original_index)
        .map(s => s.sentence);
    
    // Calculate TF-IDF to find main topics
    const keywords = extractKeywords(content, 8);
    
    let summary = `<h3>📌 ${t('summary')}</h3>`;
    summary += `<p><strong>${t('documents')}:</strong> ${state.currentDocument}</p>`;
    summary += '<div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 15px;">';
    summary += `<h4>🔑 ${t('summary')} ${t('short')}:</h4><ol>`;
    
    topSentences.forEach(sentence => {
        summary += `<li>${sentence.trim()}</li>`;
    });
    
    summary += '</ol></div>';
    
    // Main topics
    summary += `<h3>🎯 ${t('mainTopics')}</h3>`;
    summary += '<ul>';
    keywords.forEach(kw => {
        summary += `<li><strong>${kw.word}</strong> (${t('relevance')}: ${(kw.score * 100).toFixed(0)}%)</li>`;
    });
    summary += '</ul>';
    
    // Add metadata
    summary += `<h3>📊 ${t('documentStats')}</h3>`;
    summary += '<ul>';
    summary += `<li><strong>${t('wordCount')}:</strong> ${content.split(/\s+/).length} ${t('words')}</li>`;
    summary += `<li><strong>${t('sentenceCount')}:</strong> ${sentences.length} ${t('sentences')}</li>`;
    summary += `<li><strong>${t('avgSentence')}:</strong> ${Math.round(content.split(/\s+/).length / sentences.length)} ${t('words')}</li>`;
    summary += `<li><strong>${t('readingTime')}:</strong> ${Math.ceil(content.split(/\s+/).length / 200)} ${t('minutes')}</li>`;
    summary += `<li><strong>${t('readability')}:</strong> ${calculateReadability(content)}</li>`;
    summary += '</ul>';
    
    return summary;
}

function extractSentences(text) {
    // Remove extra whitespace and split by sentence delimiters
    const cleaned = text.replace(/\s+/g, ' ').trim();
    const sentenceRegex = /[^.!?]*[.!?]+/g;
    const sentences = cleaned.match(sentenceRegex) || [];
    
    return sentences
        .map(s => s.trim())
        .filter(s => s.length > 20); // Filter out very short sentences
}

function scoreSentences(sentences, fullText) {
    const words = fullText.toLowerCase().split(/\s+/);
    const wordFreq = {};
    
    // Build word frequency map
    words.forEach(word => {
        const cleaned = word.replace(/[^a-z0-9]/g, '');
        if (cleaned.length > 3) {
            wordFreq[cleaned] = (wordFreq[cleaned] || 0) + 1;
        }
    });
    
    // Score each sentence
    const scoredSentences = sentences.map((sentence, index) => {
        let score = 0;
        const sentenceWords = sentence.toLowerCase().split(/\s+/);
        
        sentenceWords.forEach(word => {
            const cleaned = word.replace(/[^a-z0-9]/g, '');
            if (wordFreq[cleaned]) {
                score += wordFreq[cleaned];
            }
        });
        
        // Normalize score by sentence length
        score = score / (sentenceWords.length || 1);
        
        return { sentence, score, original_index: index };
    });
    
    // Sort by score
    return scoredSentences.sort((a, b) => b.score - a.score);
}

function extractKeywords(text, topN = 8) {
    const words = text.toLowerCase().split(/\s+/);
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
        'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do',
        'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can',
        'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
        'from', 'by', 'as', 'if', 'which', 'who', 'what', 'when', 'where', 'why', 'how'
    ]);
    
    const wordFreq = {};
    words.forEach(word => {
        const cleaned = word.replace(/[^a-z0-9]/g, '');
        if (cleaned.length > 4 && !stopWords.has(cleaned)) {
            wordFreq[cleaned] = (wordFreq[cleaned] || 0) + 1;
        }
    });
    
    const maxFreq = Math.max(...Object.values(wordFreq), 1);
    
    return Object.entries(wordFreq)
        .map(([word, freq]) => ({ word, score: freq / maxFreq }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}

function calculateReadability(text) {
    const words = text.split(/\s+/).length;
    const sentences = (text.match(/[.!?]+/g) || []).length;
    const syllables = countSyllables(text);
    
    // Flesch Kincaid Grade Level (simplified)
    if (words === 0 || sentences === 0) return 'N/A';
    
    const fleschKincaid = (0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59);
    const grade = Math.max(0, Math.round(fleschKincaid));
    
    const levels = ['Elementary', 'Elementary', 'Elementary', 'Middle School', 'High School', 'College', 'Graduate'];
    return levels[Math.min(grade, 6)];
}

function countSyllables(text) {
    const words = text.match(/\b[a-z]+\b/gi) || [];
    let count = 0;
    
    words.forEach(word => {
        count += Math.max(1, (word.match(/[aeiouy]/gi) || []).length);
    });
    
    return count;
}

// ==================== Question Paper Detection ====================
function detectQuestionPaper(content) {
    const lines = content.split('\n');
    let questionPatterns = 0;
    
    // Look for common question patterns
    const patterns = [
        /^\s*\d+[\.\)]\s+/,  // "1. " or "1) "
        /^\s*[a-z][\.\)]\s+/i,  // "a. " or "a) "
        /^(q|question|q\.)\s*\d+/i,  // "Q.1" or "Question 1"
        /^\s*(multiple\s+choice|true.*false|fill.*blank|short\s+answer|essay)/i,
        /^\s*(options|a\)|b\)|c\)|d\))/i
    ];
    
    for (let i = 0; i < Math.min(30, lines.length); i++) {
        const line = lines[i];
        for (let pattern of patterns) {
            if (pattern.test(line)) {
                questionPatterns++;
                break;
            }
        }
    }
    
    // If more than 30% of lines match question patterns, it's likely a question paper
    const threshold = Math.min(10, Math.ceil(lines.length * 0.3));
    return questionPatterns >= 3;
}

function extractQuestionsFromPaper(content) {
    const lines = content.split('\n').filter(l => l.trim());
    const questions = [];
    let currentQuestion = '';
    let questionNumber = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check if line is a question start
        const questionMatch = line.match(/^(\d+[\.\)]\s+|[a-z][\.\)]\s+|q[\.\s]*\d+[\.\)]\s+)(.*)/i);
        
        if (questionMatch || /^\s*(what|which|how|why|who|where|when|true.*false|fill|match)/i.test(line)) {
            // Save previous question
            if (currentQuestion) {
                questions.push({
                    number: questionNumber,
                    text: currentQuestion.trim()
                });
                questionNumber++;
            }
            
            // Start new question
            currentQuestion = questionMatch ? questionMatch[2] : line;
        } else if (currentQuestion && line) {
            // Continue current question
            if (!line.match(/^[a-z]\)/i)) {
                currentQuestion += ' ' + line;
            }
        }
    }
    
    // Add last question
    if (currentQuestion) {
        questions.push({
            number: questionNumber,
            text: currentQuestion.trim()
        });
    }
    
    return questions;
}

// ==================== Q&A Functionality ====================
function sendQuestion() {
    const question = questionInput.value.trim();
    
    if (!question) {
        showAlert(t('selectQuestion'), 'error');
        return;
    }
    
    // Add user message
    addMessage(question, 'user');
    questionInput.value = '';
    sendBtn.disabled = true;
    
    // Show progress bar
    const progressContainer = document.getElementById('qaProgress');
    progressContainer.style.display = 'block';
    chatMessages.appendChild(progressContainer);
    
    const processingTime = 800; // 800ms
    startProgressTimer('qaTimer', 'qaProgressFill', processingTime);
    
    // Process question with actual document content
    setTimeout(() => {
        const selectedDoc = state.documents.find(d => d.name === state.currentDocument);
        const answer = generateAnswerFromContent(question, selectedDoc);
        
        // Hide progress bar
        progressContainer.style.display = 'none';
        
        // Add answer message
        addMessage(answer, 'bot');
        sendBtn.disabled = false;
    }, processingTime);
}

function generateAnswerFromContent(question, document) {
    if (!document) {
        return generateGeneralAnswer(question);
    }
    
    const docContent = document.content;
    const lowerQuestion = question.toLowerCase();
    
    // Find relevant sentences from the document
    const relevantSentences = findRelevantSentences(question, docContent, 3);
    
    if (relevantSentences.length === 0) {
        return `I couldn't find specific information about "<strong>${question}</strong>" in the selected document. Please try: <ul>
            <li>Selecting a different document that might contain this information</li>
            <li>Rephrasing your question</li>
            <li>Uploading additional related documents</li>
        </ul>`;
    }
    
    // Determine question type and format answer accordingly
    if (lowerQuestion.includes('what') || lowerQuestion.includes('define')) {
        return formatDefinitionAnswer(question, relevantSentences);
    } else if (lowerQuestion.includes('why') || lowerQuestion.includes('explain')) {
        return formatExplanationAnswer(question, relevantSentences);
    } else if (lowerQuestion.includes('how')) {
        return formatHowAnswer(question, relevantSentences);
    } else if (lowerQuestion.includes('when')) {
        return formatWhenAnswer(question, relevantSentences);
    } else if (lowerQuestion.includes('where')) {
        return formatWhereAnswer(question, relevantSentences);
    } else {
        return formatGeneralAnswer(question, relevantSentences);
    }
}

function findRelevantSentences(question, content, numSentences = 3) {
    const sentences = extractSentences(content);
    const questionWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    
    // Score sentences based on keyword matching
    const scoredSentences = sentences.map((sentence, index) => {
        let score = 0;
        const sentenceWords = sentence.toLowerCase().split(/\s+/);
        
        // Count matching words
        questionWords.forEach(qWord => {
            sentenceWords.forEach(sWord => {
                if (sWord.includes(qWord) || qWord.includes(sWord)) {
                    score += 2;
                }
            });
        });
        
        // Give higher score to sentences with more main topic words
        const mainWords = extractKeywords(content, 5);
        mainWords.forEach(mw => {
            if (sentence.toLowerCase().includes(mw.word)) {
                score += 1.5;
            }
        });
        
        return { sentence, score, index };
    });
    
    // Return top scored sentences in original order
    return scoredSentences
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, numSentences)
        .sort((a, b) => a.index - b.index)
        .map(s => s.sentence);
}

function formatDefinitionAnswer(question, sentences) {
    return `<strong>📖 ${t('definition')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        ${sentences.map(s => `<p>${s}</p>`).join('')}
    </div>
    <p><em>${t('basedonContent')}</em></p>`;
}

function formatExplanationAnswer(question, sentences) {
    return `<strong>🔍 ${t('explanation')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        ${sentences.map((s, i) => `<p><strong>${i + 1}.</strong> ${s}</p>`).join('')}
    </div>
    <p><em>${t('informationSource')}</em></p>`;
}

function formatHowAnswer(question, sentences) {
    return `<strong>📋 ${t('steps')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        <ol style="margin: 0; padding-left: 20px;">
            ${sentences.map(s => `<li style="margin-bottom: 8px;">${s}</li>`).join('')}
        </ol>
    </div>
    <p><em>${t('informationSource')}</em></p>`;
}

function formatWhenAnswer(question, sentences) {
    return `<strong>⏳ ${t('timeline')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        ${sentences.map(s => `<p>• ${s}</p>`).join('')}
    </div>
    <p><em>${t('basedondoc')}</em></p>`;
}

function formatWhereAnswer(question, sentences) {
    return `<strong>📍 ${t('location')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        ${sentences.map(s => `<p>• ${s}</p>`).join('')}
    </div>
    <p><em>${t('basedondoc')}</em></p>`;
}

function formatGeneralAnswer(question, sentences) {
    return `<strong>✅ ${t('answer')}:</strong><br/>
    <div style="background: #f0f4ff; padding: 12px; border-left: 4px solid #667eea; border-radius: 4px; margin: 10px 0;">
        ${sentences.map(s => `<p>${s}</p>`).join('')}
    </div>
    <p><em>${t('responseFrom')}</em></p>`;
}

function addMessage(content, sender, isLoading = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    if (isLoading) {
        messageDiv.innerHTML = `<div class="loading"><span class="loading"></span><span class="loading"></span><span class="loading"></span></div>`;
    } else {
        messageDiv.innerHTML = `<p>${content}</p>`;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    state.chatHistory.push({ content, sender, timestamp: new Date() });
}

// ==================== Tab Switching ====================
function switchTab(tabName) {
    // Hide all tabs
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Remove active class from all buttons
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Focus on input when switching to Q&A
    if (tabName === 'qa') {
        setTimeout(() => questionInput.focus(), 100);
    }
}

function updateQuestionPaperDisplay() {
    const selectedDoc = state.documents.find(d => d.name === state.currentDocument);
    
    if (selectedDoc && selectedDoc.isQuestionPaper) {
        // Show all questions from the paper
        displayQuestionPaperQuestions(selectedDoc);
    }
}

function displayQuestionPaperQuestions(questionPaper) {
    const questionsContainer = document.createElement('div');
    questionsContainer.className = 'questions-from-paper';
    questionsContainer.style.cssText = `
        background: #f5f7ff;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 2px solid #667eea;
    `;
    
    let html = `<h4 style="margin-top: 0; color: #667eea;">📋 Questions from: ${questionPaper.name}</h4>`;
    html += '<div style="max-height: 250px; overflow-y: auto;">';
    
    if (questionPaper.questions && questionPaper.questions.length > 0) {
        html += '<ul style="list-style: none; padding: 0; margin: 0;">';
        questionPaper.questions.forEach(q => {
            const safeQuestion = q.text.replace(/"/g, '&quot;');
            html += `<li style="padding: 8px; margin-bottom: 8px; background: white; border-radius: 4px; cursor: pointer; transition: all 0.3s;" 
                      onmouseover="this.style.background='#e8eaf6'; this.style.boxShadow='0 2px 4px rgba(102, 126, 234, 0.3)'"
                      onmouseout="this.style.background='white'; this.style.boxShadow='none'"
                      onclick="loadQuestionFromPaper('${safeQuestion}')">
                      <strong>Q${q.number + 1}:</strong> ${q.text.substring(0, 80)}${q.text.length > 80 ? '...' : ''}
                  </li>`;
        });
        html += '</ul>';
    } else {
        html += '<p style="color: #888; margin: 0;">No questions detected in this paper. Try rephrasing questions in standard format.</p>';
    }
    
    html += '</div>';
    questionsContainer.innerHTML = html;
    
    // Insert after the document selector
    const existingContainer = document.querySelector('.questions-from-paper');
    const qaContext = document.querySelector('.qa-context');
    
    if (existingContainer) {
        existingContainer.replaceWith(questionsContainer);
    } else {
        qaContext.parentElement.insertBefore(questionsContainer, qaContext.nextElementSibling);
    }
}

function loadQuestionFromPaper(question) {
    questionInput.value = question;
    questionInput.focus();
    showAlert('Question loaded. Click Send to get the answer!', 'info');
}

// ==================== Language Management ====================
function changeLanguage(lang) {
    state.currentLanguage = lang;
    localStorage.setItem('language', lang);
    languageSelect.value = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = translations[lang][key];
        
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update option text in select dropdowns
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        element.placeholder = translations[lang][key];
    });
    
    // Update radio button labels
    document.querySelectorAll('label span[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = translations[lang][key];
        element.textContent = text;
    });
    
    // Update select options
    document.querySelectorAll('select option[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const text = translations[lang][key];
        element.textContent = text;
    });
    
    // Re-render document lists and chat with translations
    updateDocumentLists();
    chartMessagesDisplay();
}

function t(key) {
    return translations[state.currentLanguage][key] || translations['en'][key];
}

function chartMessagesDisplay() {
    // Clear current messages except first one
    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length === 1) {
        const welcomeMsg = messages[0].querySelector('p');
        welcomeMsg.textContent = t('welcomeMessage');
    }
}

// ==================== Progress Timer ====================
function startProgressTimer(timerId, progressBarId, totalTime) {
    const timerElement = document.getElementById(timerId);
    const progressFill = document.getElementById(progressBarId);
    let elapsed = 0;
    const updateInterval = 50; // Update every 50ms for smooth animation
    
    const interval = setInterval(() => {
        elapsed += updateInterval;
        const remainingTime = Math.max(0, totalTime - elapsed);
        const remainingSeconds = (remainingTime / 1000).toFixed(1);
        const progressPercent = (elapsed / totalTime) * 100;
        
        // Update progress bar
        progressFill.style.width = progressPercent + '%';
        
        // Update timer text
        if (remainingSeconds > 0) {
            timerElement.textContent = `Processing... ${remainingSeconds}s remaining`;
        } else {
            timerElement.textContent = 'Completing...';
        }
        
        // Clear interval when done
        if (elapsed >= totalTime) {
            clearInterval(interval);
            progressFill.style.width = '100%';
        }
    }, updateInterval);
}

// ==================== Utility Functions ====================
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.main-content');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// ==================== Initialize Application ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Academic Library Chat initialized');
    
    // Set language selector to current language
    if (languageSelect) {
        languageSelect.value = state.currentLanguage;
    }
    
    // Apply current language
    changeLanguage(state.currentLanguage);
    
    // Add sample documents for testing
    addSampleDocuments();
});

function addSampleDocuments() {
    // Add sample documents to demonstrate functionality
    const sampleDocs = [
        {
            name: 'Introduction to Psychology',
            type: 'application/pdf',
            size: 1024000,
            content: `Psychology is the scientific study of human behavior and mental processes. It encompasses the investigation of consciousness, perception, learning, memory, intelligence, reasoning, creativity, personality, motivation, emotion, and psychopathology. The field emerged as an independent discipline in the 19th century when Wilhelm Wundt established the first psychological laboratory. Modern psychology employs empirical methods and is divided into numerous specializations including cognitive psychology, developmental psychology, social psychology, clinical psychology, and organizational psychology. Psychologists use various research methods including experiments, observations, surveys, case studies, and correlational analyses to understand behavior and mental processes.`,
            uploadDate: new Date().toLocaleDateString(),
            isQuestionPaper: false
        },
        {
            name: 'History of Ancient Rome',
            type: 'application/pdf',
            size: 2048000,
            content: `Ancient Rome was one of the greatest civilizations in human history, lasting from the 8th century BC to the 5th century AD. It began as a small settlement on seven hills along the Tiber River and eventually grew into an empire that encompassed three continents. The Roman Republic, established in 509 BC, created a system of government based on checks and balances that influenced modern democracies. Key periods include the Regal period, the Republic, and the Empire under leaders like Augustus, Trajan, and Constantine. Roman civilization made significant contributions to law, architecture, literature, engineering, and governance. The fall of the Western Roman Empire in 476 AD marked the beginning of the Medieval period in Europe.`,
            uploadDate: new Date().toLocaleDateString(),
            isQuestionPaper: false
        },
        {
            name: 'Sample Exam Questions',
            type: 'text/plain',
            size: 512000,
            content: `1. What is the definition of psychology?
2. Explain the role of Wilhelm Wundt in establishing psychology as a discipline.
3. What are the major specializations within modern psychology?
4. Define the Roman Republic and its significance.
5. How did the Roman Empire expand and what were its consequences?
6. Compare the governance systems of the Republic and the Empire.
7. What factors led to the fall of the Western Roman Empire?
8. Discuss the contributions of Augustus to Roman civilization.
9. How did Roman law influence modern legal systems?
10. Analyze the impact of Roman engineering on contemporary architecture.`,
            uploadDate: new Date().toLocaleDateString(),
            isQuestionPaper: true,
            questions: [
                { number: 0, text: 'What is the definition of psychology?' },
                { number: 1, text: 'Explain the role of Wilhelm Wundt in establishing psychology as a discipline.' },
                { number: 2, text: 'What are the major specializations within modern psychology?' },
                { number: 3, text: 'Define the Roman Republic and its significance.' },
                { number: 4, text: 'How did the Roman Empire expand and what were its consequences?' },
                { number: 5, text: 'Compare the governance systems of the Republic and the Empire.' },
                { number: 6, text: 'What factors led to the fall of the Western Roman Empire?' },
                { number: 7, text: 'Discuss the contributions of Augustus to Roman civilization.' },
                { number: 8, text: 'How did Roman law influence modern legal systems?' },
                { number: 9, text: 'Analyze the impact of Roman engineering on contemporary architecture.' }
            ]
        }
    ];
    
    // Only add samples if no documents exist yet
    if (state.documents.length === 0) {
        sampleDocs.forEach(doc => state.documents.push(doc));
        updateDocumentLists();
        showAlert('Sample documents loaded. Try selecting and summarizing, or load a question paper!', 'info');
    }
}

// ==================== Keyboard Shortcuts ====================
document.addEventListener('keydown', (e) => {
    // Ctrl+K to focus search/question input
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        questionInput.focus();
    }
    
    // Clear documents with Ctrl+D (with confirmation)
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        if (confirm('Are you sure you want to clear all documents?')) {
            state.documents = [];
            updateDocumentLists();
            showAlert('All documents cleared', 'info');
        }
    }
});
