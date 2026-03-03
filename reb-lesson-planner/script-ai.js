// ==================== REB AI Lesson Generation System ====================
// Complete AI-powered lesson plan generation with REB standards compliance

let currentAIPlan = null;
let demoModeEnabled = true;

// ==================== Initialize Page ====================
document.addEventListener('DOMContentLoaded', () => {
    initializeGradeSubjectSelectors();
    setupAPINotice();
});

// ==================== Grade & Subject Selection ====================
function initializeGradeSubjectSelectors() {
    updateGradeOptions();
    const levelSelect = document.getElementById('aiEducationLevel');
    const gradeSelect = document.getElementById('aiGrade');
    
    if (levelSelect) levelSelect.addEventListener('change', updateGradeOptions);
    if (gradeSelect) gradeSelect.addEventListener('change', updateSubjectOptions);
}

function updateGradeOptions() {
    const levelSelect = document.getElementById('aiEducationLevel');
    const gradeSelect = document.getElementById('aiGrade');
    
    if (!levelSelect || !gradeSelect) return;
    
    const level = levelSelect.value;
    let grades = [];
    
    if (level === 'PRIMARY') {
        grades = APP_CONFIG.GRADES.PRIMARY || [];
    } else if (level === 'SECONDARY') {
        grades = APP_CONFIG.GRADES.SECONDARY || [];
    }
    
    gradeSelect.innerHTML = '<option value="">Select Grade...</option>';
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade.code;
        option.textContent = grade.label;
        gradeSelect.appendChild(option);
    });
    
    const subjectSelect = document.getElementById('aiSubject');
    if (subjectSelect) {
        subjectSelect.innerHTML = '<option value="">Select Subject...</option>';
    }
}

function updateSubjectOptions() {
    const gradeSelect = document.getElementById('aiGrade');
    const subjectSelect = document.getElementById('aiSubject');
    
    if (!gradeSelect || !subjectSelect) return;
    
    const grade = gradeSelect.value;
    const subjects = APP_CONFIG.SUBJECTS[grade] || [];
    
    subjectSelect.innerHTML = '<option value="">Select Subject...</option>';
    subjects.forEach(subject => {
        const option = document.createElement('option');
        option.value = subject;
        option.textContent = subject;
        subjectSelect.appendChild(option);
    });
}

// ==================== API Setup Functionss ====================
function setupAPINotice() {
    const checkbox = document.getElementById('useDemoMode');
    if (checkbox) {
        checkbox.checked = demoModeEnabled;
        checkbox.addEventListener('change', (e) => {
            demoModeEnabled = e.target.checked;
            localStorage.setItem('demo_mode', demoModeEnabled);
            showToast(demoModeEnabled ? '📌 Demo Mode enabled' : '💻 API Mode enabled', 'info');
        });
    }
}

function openAPISetup() {
    const modal = document.getElementById('apiSetupModal');
    if (modal) modal.style.display = 'flex';
}

function closeAPISetup() {
    const modal = document.getElementById('apiSetupModal');
    if (modal) modal.style.display = 'none';
}

function switchAPITab(tab) {
    document.querySelectorAll('.api-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.api-tab-btn').forEach(b => b.classList.remove('active'));
    const tabElement = document.getElementById(`api-${tab}-tab`);
    if (tabElement) tabElement.style.display = 'block';
    if (event && event.target) event.target.classList.add('active');
}

function saveOpenAIKey() {
    const key = document.getElementById('openaiApiKey')?.value?.trim();
    if (!key) {
        showToast('❌ Please enter an API key', 'error');
        return;
    }
    setAPIKey('openai', key);
    APP_CONFIG.AI.DEMO_MODE = false;
    demoModeEnabled = false;
    showToast('✅ OpenAI Key saved!', 'success');
    setTimeout(() => closeAPISetup(), 1000);
}

function saveClaudeKey() {
    const key = document.getElementById('claudeApiKey')?.value?.trim();
    if (!key) {
        showToast('❌ Please enter an API key', 'error');
        return;
    }
    setAPIKey('claude', key);
    APP_CONFIG.AI.DEMO_MODE = false;
    demoModeEnabled = false;
    showToast('✅ Claude Key saved!', 'success');
    setTimeout(() => closeAPISetup(), 1000);
}

// ==================== Main AI Generation ====================
async function generateLessonWithAI() {
    const aiGrade = document.getElementById('aiGrade')?.value?.trim();
    const aiSubject = document.getElementById('aiSubject')?.value?.trim();
    const aiLessonTitle = document.getElementById('aiLessonTitle')?.value?.trim();
    const aiDuration = document.getElementById('aiDuration')?.value?.trim();
    const aiKeyCompetence =document.getElementById('aiKeyCompetence')?.value?.trim();
    const aiObjective = document.getElementById('aiObjective')?.value?.trim();
    
    if (!aiGrade || !aiSubject || !aiLessonTitle || !aiDuration || !aiKeyCompetence || !aiObjective) {
        showToast('❌ Please fill all required fields (*)', 'error');
        return;
    }

    const generateBtn = document.querySelector('[onclick="generateLessonWithAI()"]');
    const resultDiv = document.getElementById('aiResultContainer');
    
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="spinner"></span> Generating...';
    }
    
    if (resultDiv) {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<div class="loading-spinner">⏳ Generating REB-compliant lesson plan...</div>';
    }

    try {
        let aiResponse;
        
        if (demoModeEnabled) {
            aiResponse = generateDemoLessonPlan({
                grade: aiGrade,
                subject: aiSubject,
                lessonTitle: aiLessonTitle,
                duration: parseInt(aiDuration),
                keyCompetence: aiKeyCompetence,
                objective: aiObjective
            });
        } else {
            const prompt = buildRebCompliantPrompt({
                grade: aiGrade,
                subject: aiSubject,
                lessonTitle: aiLessonTitle,
                duration: parseInt(aiDuration),
                keyCompetence: aiKeyCompetence,
                objective: aiObjective
            });
            aiResponse = await callAIAPI(prompt);
        }

        if (aiResponse) {
            let parsed = typeof aiResponse === 'string' ? JSON.parse(aiResponse) : aiResponse;
            currentAIPlan = parsed;
            displayAIPlan(parsed);
            
            // AUTO-SAVE generated lesson
            autoSaveGeneratedLesson(parsed, {
                grade: aiGrade,
                subject: aiSubject,
                title: aiLessonTitle,
                duration: aiDuration
            });
            
            showToast('✅ Lesson plan generated and saved!', 'success');
        }
    } catch (error) {
        console.error('Generation Error:', error);
        showToast(`❌ ${error.message}`, 'error');
    } finally {
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '🤖 Generate Lesson Plan with AI';
        }
    }
}

function buildRebCompliantPrompt(params) {
    const { grade, subject, lessonTitle, duration, keyCompetence, objective } = params;
    return `Create an REB-compliant lesson plan:
- Grade: ${grade}, Subject: ${subject}
- Title: ${lessonTitle}, Duration: ${duration}min
- Key Competence: ${keyCompetence}
- Objective: ${objective}

Include: Introduction/Development/Conclusion phases, REB competencies, cross-cutting issues, and inclusive education notes.
Return as JSON with: basicInfo, lessonActivities, genericCompetencies, crossCuttingIssues, inclusiveEducation, assessment.`;
}

async function callAIAPI(prompt) {
    if (demoModeEnabled) return generateDemoLessonPlan({});
    
    const config = APP_CONFIG.AI[APP_CONFIG.AI.ACTIVE_PROVIDER === 'claude' ? 'CLAUDE' : 'OPENAI'];
    if (!config.apiKey) return null;
    
    try {
        if (APP_CONFIG.AI.ACTIVE_PROVIDER === 'openai') {
            const res = await fetch(config.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.7,
                    max_tokens: config.maxTokens
                })
            });
            const data = await res.json();
            return data.choices[0]?.message?.content;
        }
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

function generateDemoLessonPlan(params) {
    const grade = params.grade || 'P3';
    const subject = params.subject || 'Mathematics';
    const duration = params.duration || 45;
    
    return JSON.stringify({
        basicInfo: {
            grade, subject,
            lessonTitle: params.lessonTitle || 'Sample Lesson',
            duration,
            keyCompetence: params.keyCompetence || 'Critical Thinking'
        },
        lessonActivities: {
            introduction: {
                teacher: `Start with a question about ${subject}. Activate prior knowledge.`,
                learner: 'Listen and share experiences',
                duration: Math.ceil(duration * 0.15)
            },
            development: {
                teacher: `Explain key concepts using examples. Engage through pair/group work.`,
                learner: 'Participate in activities and discussions',
                duration: Math.ceil(duration * 0.65)
            },
            conclusion: {
                teacher: `Summarize key points. Assign reflection.`,
                learner: 'Summarize and reflect on learning',
                duration: Math.ceil(duration * 0.2)
            }
        },
        genericCompetencies: ['Communication', 'Collaboration', 'Critical Thinking'],
        crossCuttingIssues: ['Inclusive Education', 'ICT Integration', 'Values Education'],
        inclusiveEducation: {
            adaptations: 'Provide differentiated activities and materials for all learners.',
            universalDesign: 'Use multiple means of representation and engagement.'
        },
        assessment: {
            formative: ['Observation', 'Q&A', 'Group discussion'],
            summative: 'Practical demonstration or quiz'
        }
    });
}

function displayAIPlan(plan) {
    const resultDiv = document.getElementById('aiResultContainer');
    if (!resultDiv || !plan) return;

    let html = `<div class="ai-result-content" style="max-height: 500px; overflow-y: auto;">`;
    
    if (plan.basicInfo) {
        html += `<div class="ai-section">
            <h4>📋 Lesson Info</h4>
            <p><strong>Grade:</strong> ${plan.basicInfo.grade} | <strong>Subject:</strong> ${plan.basicInfo.subject}</p>
            <p><strong>Title:</strong> ${plan.basicInfo.lessonTitle}</p>
            <p><strong>Duration:</strong> ${plan.basicInfo.duration} min</p>
        </div>`;
    }

    if (plan.lessonActivities) {
        html += `<div class="ai-section">
            <h4>🎯 Lesson Activities (REB Format)</h4>`;
        ['introduction', 'development', 'conclusion'].forEach(phase => {
            const act = plan.lessonActivities[phase];
            if (act) {
                html += `<p><strong>${phase.toUpperCase()}:</strong><br>
                    Teacher: ${act.teacher}<br>
                    Learner: ${act.learner}</p>`;
            }
        });
        html += `</div>`;
    }

    if (plan.genericCompetencies) {
        html += `<div class="ai-section">
            <h4>💡 REB Competencies</h4>
            <ul>`;
        plan.genericCompetencies.forEach(c => html += `<li>${c}</li>`);
        html += `</ul></div>`;
    }

    if (plan.inclusiveEducation) {
        html += `<div class="ai-section">
            <h4>♿ Inclusive Education</h4>
            <p>${plan.inclusiveEducation.adaptations || 'Differentiated instruction for all learners'}</p>
        </div>`;
    }

    if (plan.assessment) {
        html += `<div class="ai-section">
            <h4>✅ Assessment</h4>
            <p><strong>Formative:</strong> ${(plan.assessment.formative || []).join(', ')}</p>
            <p><strong>Summative:</strong> ${plan.assessment.summative || 'To be determined'}</p>
        </div>`;
    }

    html += `</div>
        <button onclick="useGeneratedPlan()" class="btn btn-success" style="margin-top: 15px;">✅ Use This Plan</button>`;
    
    resultDiv.innerHTML = html;
    resultDiv.style.display = 'block';
}

function useGeneratedPlan() {
    if (!currentAIPlan) {
        showToast('❌ No plan to use', 'error');
        return;
    }
    
    const plan = currentAIPlan;
    
    // Fill form fields
    if (plan.basicInfo) {
        document.getElementById('subject') && (document.getElementById('subject').value = plan.basicInfo.subject);
        document.getElementById('unitTitle') && (document.getElementById('unitTitle').value = plan.basicInfo.lessonTitle);
        document.getElementById('duration') && (document.getElementById('duration').value = plan.basicInfo.duration);
        document.getElementById('keyCompetencies') && (document.getElementById('keyCompetencies').value = plan.basicInfo.keyCompetence);
    }
    
    if (plan.genericCompetencies) {
        document.getElementById('genericCompetencies') && (document.getElementById('genericCompetencies').value = plan.genericCompetencies.join(', '));
    }
    
    if (plan.crossCuttingIssues) {
        document.getElementById('crossCuttingIssues') && (document.getElementById('crossCuttingIssues').value = plan.crossCuttingIssues.join(', '));
    }
    
    if (plan.inclusiveEducation && document.getElementById('remarks')) {
        document.getElementById('remarks').value = plan.inclusiveEducation.adaptations || '';
    }
    
    switchSection('#section-outcomes');
    showToast('✅ Form populated! Review and customize as needed.', 'success');
}

// Utility function to display toast (in case it's missing from main script)
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.style.display = 'block';
        setTimeout(() => toast.style.display = 'none', 3000);
    } else {
        console.log(message);
    }
}
// ==================== AUTO-SAVE Generated Lessons ====================
/**
 * Automatically saves generated lessons to browser localStorage
 * Triggered immediately after AI generation completes
 */
function autoSaveGeneratedLesson(plan, metadata) {
    try {
        const lessonId = 'lesson_' + Date.now();
        const lessonData = {
            id: lessonId,
            title: metadata.title || 'Untitled Lesson',
            subject: metadata.subject || 'Unknown',
            grade: metadata.grade || 'Unknown',
            duration: metadata.duration || '45',
            dateCreated: new Date().toLocaleDateString(),
            timeCreated: new Date().toLocaleTimeString(),
            timestamp: Date.now(),
            fullPlan: plan,
            metadata: metadata
        };
        
        // Save individual lesson
        localStorage.setItem(lessonId, JSON.stringify(lessonData));
        
        // Add to lessons index for library display
        addToLessonIndex(lessonData);
        
        // Log to console
        console.log(`✅ Lesson "${metadata.title}" auto-saved (ID: ${lessonId})`);
        
        return lessonId;
    } catch (error) {
        console.error('❌ Failed to save lesson:', error);
        showToast('⚠️ Could not save lesson locally', 'warning');
        return null;
    }
}

/**
 * Maintains an index of all saved lessons for quick library display
 */
function addToLessonIndex(lessonData) {
    try {
        let index = JSON.parse(localStorage.getItem('lessonsIndex') || '[]');
        
        const indexEntry = {
            id: lessonData.id,
            title: lessonData.title,
            subject: lessonData.subject,
            grade: lessonData.grade,
            dateCreated: lessonData.dateCreated,
            timeCreated: lessonData.timeCreated,
            timestamp: lessonData.timestamp
        };
        
        index.unshift(indexEntry); // Add to beginning (newest first)
        
        // Keep only last 50 lessons in index
        if (index.length > 50) {
            index = index.slice(0, 50);
        }
        
        localStorage.setItem('lessonsIndex', JSON.stringify(index));
    } catch (error) {
        console.error('Error updating lesson index:', error);
    }
}

/**
 * Retrieves all saved lessons from browser storage
 */
function getAllSavedLessons() {
    try {
        const index = JSON.parse(localStorage.getItem('lessonsIndex') || '[]');
        const lessons = [];
        
        index.forEach(entry => {
            const lessonData = localStorage.getItem(entry.id);
            if (lessonData) {
                lessons.push(JSON.parse(lessonData));
            }
        });
        
        return lessons;
    } catch (error) {
        console.error('Error retrieving saved lessons:', error);
        return [];
    }
}

/**
 * Loads a saved lesson and populates the form
 */
function loadSavedLesson(lessonId) {
    try {
        const lessonData = JSON.parse(localStorage.getItem(lessonId));
        if (!lessonData) {
            showToast('❌ Lesson not found', 'error');
            return;
        }
        
        // Populate form fields
        if (document.getElementById('aiLessonTitle')) {
            document.getElementById('aiLessonTitle').value = lessonData.title;
        }
        if (document.getElementById('aiGrade')) {
            document.getElementById('aiGrade').value = lessonData.grade;
        }
        if (document.getElementById('aiSubject')) {
            document.getElementById('aiSubject').value = lessonData.subject;
        }
        if (document.getElementById('aiDuration')) {
            document.getElementById('aiDuration').value = lessonData.duration;
        }
        
        // Display the plan
        currentAIPlan = lessonData.fullPlan;
        displayAIPlan(lessonData.fullPlan);
        
        showToast(`✅ Loaded: ${lessonData.title}`, 'success');
    } catch (error) {
        console.error('Error loading lesson:', error);
        showToast('❌ Error loading lesson', 'error');
    }
}

/**
 * Delete a saved lesson from browser storage
 */
function deleteSavedLesson(lessonId) {
    try {
        localStorage.removeItem(lessonId);
        
        // Remove from index
        let index = JSON.parse(localStorage.getItem('lessonsIndex') || '[]');
        index = index.filter(entry => entry.id !== lessonId);
        localStorage.setItem('lessonsIndex', JSON.stringify(index));
        
        showToast('🗑️ Lesson deleted', 'info');
        
        // Refresh library display if it exists
        if (typeof displayLessonLibrary === 'function') {
            displayLessonLibrary();
        }
    } catch (error) {
        console.error('Error deleting lesson:', error);
        showToast('❌ Error deleting lesson', 'error');
    }
}

/**
 * Display saved lessons in the library section
 */
function displayLessonLibrary() {
    try {
        const libraryContainer = document.getElementById('lessonLibraryContainer');
        if (!libraryContainer) return;
        
        const lessons = getAllSavedLessons();
        
        if (lessons.length === 0) {
            libraryContainer.innerHTML = `
                <div class="empty-state">
                    <p>📚 No saved lesson plans yet</p>
                    <p>Generate your first AI lesson to see it here!</p>
                </div>
            `;
            return;
        }
        
        let html = '<div class="lessons-grid">';
        lessons.forEach(lesson => {
            html += `
                <div class="lesson-card">
                    <div class="lesson-header">
                        <h3>${lesson.title}</h3>
                        <small>${lesson.dateCreated}</small>
                    </div>
                    <div class="lesson-meta">
                        <span class="badge grade">${lesson.grade}</span>
                        <span class="badge subject">${lesson.subject}</span>
                        <span class="badge duration">${lesson.duration} min</span>
                    </div>
                    <div class="lesson-actions">
                        <button class="btn-small" onclick="loadSavedLesson('${lesson.id}')">📖 Open</button>
                        <button class="btn-small" onclick="downloadLesson('${lesson.id}')">⬇️ Download</button>
                        <button class="btn-small btn-danger" onclick="deleteSavedLesson('${lesson.id}')">🗑️ Delete</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        
        libraryContainer.innerHTML = html;
    } catch (error) {
        console.error('Error displaying library:', error);
    }
}

/**
 * Download a saved lesson as PDF or Word document
 */
function downloadLesson(lessonId, format = 'pdf') {
    try {
        const lessonData = JSON.parse(localStorage.getItem(lessonId));
        if (!lessonData) {
            showToast('❌ Lesson not found', 'error');
            return;
        }
        
        // Use existing download functions from main script
        currentAIPlan = lessonData.fullPlan;
        
        if (format === 'pdf' && typeof downloadPDF === 'function') {
            downloadPDF();
        } else if (format === 'word' && typeof downloadWord === 'function') {
            downloadWord();
        } else {
            showToast('❌ Download not available', 'error');
        }
    } catch (error) {
        console.error('Error downloading lesson:', error);
        showToast('❌ Error downloading lesson', 'error');
    }
}

console.log('%c✅ Auto-Save System Initialized', 'color: #4CAF50; font-weight: bold;');