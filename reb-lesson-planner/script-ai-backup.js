// ==================== REB AI Lesson Generation System ====================
// This module handles all AI-powered lesson plan generation
// Supports both API calls and demo mode for offline use

let demoModeEnabled = true; // Default to demo mode

// ==================== Initialize Grade/Subject Selectors ====================
function initializeGradeSubjectSelectors() {
    updateGradeOptions();
    document.getElementById('aiEducationLevel')?.addEventListener('change', updateGradeOptions);
    document.getElementById('aiGrade')?.addEventListener('change', updateSubjectOptions);
}

function updateGradeOptions() {
    const levelSelect = document.getElementById('aiEducationLevel');
    const gradeSelect = document.getElementById('aiGrade');
    if (!levelSelect || !gradeSelect) return;
    const level = levelSelect.value;
    let grades = level === 'PRIMARY' ? APP_CONFIG.GRADES.PRIMARY : APP_CONFIG.GRADES.SECONDARY;
    gradeSelect.innerHTML = '<option value="">Select Grade...</option>';
    grades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade.code;
        option.textContent = grade.label;
        gradeSelect.appendChild(option);
    });
    const subjectSelect = document.getElementById('aiSubject');
    if (subjectSelect) subjectSelect.innerHTML = '<option value="">Select Subject...</option>';
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

// ==================== API Setup Functions ====================
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
    event.target.classList.add('active');
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
    showToast('✅ OpenAI API Key saved successfully!', 'success');
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
    showToast('✅ Claude API Key saved successfully!', 'success');
    setTimeout(() => closeAPISetup(), 1000);
}

// ==================== Check for Valid API Key ====================
function hasValidAPIKey() {
    const provider = APP_CONFIG.AI.ACTIVE_PROVIDER;
    if (provider === 'openai') {
        return APP_CONFIG.AI.OPENAI.apiKey && !APP_CONFIG.AI.OPENAI.apiKey.includes('YOUR-KEY');
    } else if (provider === 'claude') {
        return APP_CONFIG.AI.CLAUDE.apiKey && !APP_CONFIG.AI.CLAUDE.apiKey.includes('YOUR-KEY');
    }
    return false;
}

// ==================== Main AI Generation Function ====================
let currentAIPlan = null;

async function generateLessonWithAI() {
    const aiSubject = document.getElementById('aiSubject')?.value?.trim();
    const aiClass = document.getElementById('aiClass')?.value?.trim();
    const aiDuration = document.getElementById('aiDuration')?.value?.trim();
    const aiClassSize = document.getElementById('aiClassSize')?.value?.trim();
    const aiObjective = document.getElementById('aiObjective')?.value?.trim();
    
    const includeActivities = document.getElementById('includeActivities')?.checked || false;
    const includeAssessment = document.getElementById('includeAssessment')?.checked || false;
    const includeResources = document.getElementById('includeResources')?.checked || false;

    // Validation
    if (!aiLessonTitle || !aiSubject || !aiClass || !aiDuration || !aiObjective) {
        showToast('❌ Please fill in all required fields (Title, Subject, Class, Duration, Objective)', 'error');
        return;
    }

    // Show loading state
    const generateBtn = document.querySelector('[onclick="generateLessonWithAI()"]');
    const resultDiv = document.getElementById('aiResultContainer');
    
    if (generateBtn) {
        generateBtn.disabled = true;
        generateBtn.innerHTML = '<span class="spinner"></span> ' + t('generating');
    }
    
    if (resultDiv) {
        resultDiv.innerHTML = '<div class="loading-spinner">⏳ Generating your lesson plan...</div>';
    }

    try {
        // Create prompt for AI
        const prompt = buildAIPrompt(
            aiLessonTitle,
            aiSubject,
            aiClass,
            aiDuration,
            aiClassSize,
            aiObjective,
            includeActivities,
            includeAssessment,
            includeResources
        );

        // Call AI API (using OpenAI as example)
        const aiResponse = await callAIAPI(prompt);

        if (aiResponse) {
            currentAIPlan = parseAIResponse(aiResponse);
            displayAIPlan(currentAIPlan);
            showToast('✅ Lesson plan generated successfully!', 'success');
        } else {
            showToast('❌ Failed to generate lesson plan. Please try again.', 'error');
        }
    } catch (error) {
        console.error('AI Generation Error:', error);
        showToast(`❌ Error generating lesson: ${error.message}`, 'error');
    } finally {
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.innerHTML = t('generateBtn');
        }
    }
}

// Build prompt for AI
function buildAIPrompt(title, subject, classLevel, duration, classSize, objective, activities, assessment, resources) {
    let prompt = `You are an expert REB (Rwanda Education Board) lesson planner. Generate a structured lesson plan based on these inputs:

Lesson Title: ${title}
Subject: ${subject}
Class/Grade: ${classLevel}
Duration: ${duration} minutes
Class Size: ${classSize || 'Not specified'} students
Learning Objective: ${objective}

Please provide the lesson plan in the following JSON format (all fields must be present):
{
  "basicInfo": {
    "schoolName": "Example School",
    "teacherName": "To be filled by teacher",
    "subject": "${subject}",
    "class": "${classLevel}",
    "duration": "${duration}",
    "unitTitle": "",
    "keyCompetencies": ""
  },
  "lessonDetails": {
    "lessonTopics": [
      { "lessonNum": "1", "title": "", "duration": "${duration}", "resources": "" }
    ],
    "instructionalObjective": "${objective}",
    "senNeeds": ""
  },
  "activities": {
    "introduction": "",
    "development": "",
    "conclusion": ""
  }${activities ? ',\n  "teachingActivities": {\n    "activities": []\n  }' : ''}${assessment ? ',\n  "assessmentMethods": {\n    "formative": [],\n    "summative": ""\n  }' : ''}${resources ? ',\n  "resources": {\n    "resourcesList": []\n  }' : ''}
}

Make the content relevant to ${subject} for ${classLevel} students. Ensure all activities align with the learning objective: ${objective}`;

    return prompt;
}

// Call AI API
async function callAIAPI(prompt) {
    // DEMO MODE: Return mock response if API key not configured
    if (AI_CONFIG.apiKey === 'sk-YOUR-KEY-HERE' || !AI_CONFIG.apiKey) {
        return generateMockLessonPlan();
    }

    try {
        const response = await fetch(AI_CONFIG.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: AI_CONFIG.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert REB lesson plan generator. Always respond with valid JSON.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: AI_CONFIG.maxTokens
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.choices && data.choices[0]?.message?.content) {
            return data.choices[0].message.content;
        } else {
            throw new Error('Invalid API response format');
        }
    } catch (error) {
        console.error('API Call Error:', error);
        // Fall back to mock plan on error
        return generateMockLessonPlan();
    }
}

// Parse AI response
function parseAIResponse(responseText) {
    try {
        // Extract JSON from response (may be wrapped in text)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('No JSON found in response');
        }
        
        return JSON.parse(jsonMatch[0]);
    } catch (error) {
        console.error('Parse Error:', error);
        return generateMockLessonPlan();
    }
}

// Generate mock lesson plan for demo
function generateMockLessonPlan() {
    const title = document.getElementById('aiLessonTitle')?.value || 'Sample Lesson';
    const subject = document.getElementById('aiSubject')?.value || 'English';
    const classLevel = document.getElementById('aiClass')?.value || 'Form 1';
    const duration = document.getElementById('aiDuration')?.value || '45';
    const objective = document.getElementById('aiObjective')?.value || 'Students will understand the topic';

    return JSON.stringify({
        basicInfo: {
            schoolName: 'Your School Name',
            teacherName: 'Teacher Name',
            subject: subject,
            class: classLevel,
            duration: duration,
            unitTitle: title,
            keyCompetencies: 'Critical thinking, communication, collaboration'
        },
        lessonDetails: {
            lessonTopics: [
                {
                    lessonNum: '1',
                    title: title,
                    duration: duration,
                    resources: 'Textbook, whiteboard, markers, projector'
                }
            ],
            instructionalObjective: objective,
            senNeeds: 'Provide visual aids and written materials for visual learners'
        },
        activities: {
            introduction: `Begin with a real-world scenario or question related to ${subject}. Ask students to share their prior knowledge. This activates prior learning and creates interest.`,
            development: `Explain key concepts step-by-step using examples from daily life. Engage students through group discussions and pair work. Use multisensory approaches for different learning styles.`,
            conclusion: `Summarize the main learning points. Have students create a mind map or concept map. Assign a brief reflection task asking what they learned.`
        },
        teachingActivities: {
            activities: [
                {
                    phase: 'Introduction',
                    teacherTime: '5',
                    learnerTime: '5',
                    activity: 'Teacher asks guiding questions to activate prior knowledge'
                },
                {
                    phase: 'Development',
                    teacherTime: '25',
                    learnerTime: '20',
                    activity: 'Students work in pairs to analyze case studies and discuss findings'
                },
                {
                    phase: 'Conclusion',
                    teacherTime: '5',
                    learnerTime: '10',
                    activity: 'Group presentations where students share their learning'
                }
            ]
        },
        assessmentMethods: {
            formative: [
                'Classroom observation during group work',
                'Question and answer sessions',
                'Peer assessment during presentations'
            ],
            summative: 'Written quiz on main concepts or practical demonstration'
        },
        resources: {
            resourcesList: [
                'Textbook chapters related to the topic',
                'Whiteboard and markers',
                'Projector or smart board',
                'Activity worksheets',
                'Real-world examples and case studies'
            ]
        }
    });
}

// Display AI plan
function displayAIPlan(plan) {
    const resultDiv = document.getElementById('aiResultContainer');
    if (!resultDiv) return;

    let html = `<div class="ai-result-box">
        <h3>📋 ${t('generatedPlan')}</h3>
        <div class="ai-result-content">`;

    if (plan.basicInfo) {
        html += `<div class="ai-section">
            <h4>Basic Information</h4>
            <p><strong>Unit Title:</strong> ${plan.basicInfo.unitTitle || ''}</p>
            <p><strong>Subject:</strong> ${plan.basicInfo.subject || ''}</p>
            <p><strong>Class:</strong> ${plan.basicInfo.class || ''}</p>
            <p><strong>Duration:</strong> ${plan.basicInfo.duration || ''} minutes</p>
            <p><strong>Key Competencies:</strong> ${plan.basicInfo.keyCompetencies || ''}</p>
        </div>`;
    }

    if (plan.lessonDetails) {
        html += `<div class="ai-section">
            <h4>Lesson Details</h4>
            <p><strong>Objective:</strong> ${plan.lessonDetails.instructionalObjective || ''}</p>
            <p><strong>Special Needs Notes:</strong> ${plan.lessonDetails.senNeeds || 'None specified'}</p>
        </div>`;
    }

    if (plan.activities) {
        html += `<div class="ai-section">
            <h4>Lesson Activities</h4>
            <p><strong>Introduction:</strong> ${plan.activities.introduction || ''}</p>
            <p><strong>Development:</strong> ${plan.activities.development || ''}</p>
            <p><strong>Conclusion:</strong> ${plan.activities.conclusion || ''}</p>
        </div>`;
    }

    if (plan.teachingActivities?.activities?.length > 0) {
        html += `<div class="ai-section">
            <h4>Teaching Activities Timeline</h4>
            <table class="ai-table">
                <tr><th>Phase</th><th>Teacher (min)</th><th>Learner (min)</th><th>Activity</th></tr>`;
        plan.teachingActivities.activities.forEach(act => {
            html += `<tr><td>${act.phase}</td><td>${act.teacherTime}</td><td>${act.learnerTime}</td><td>${act.activity}</td></tr>`;
        });
        html += `</table></div>`;
    }

    if (plan.assessmentMethods) {
        html += `<div class="ai-section">
            <h4>Assessment Methods</h4>
            <p><strong>Formative:</strong> ${(plan.assessmentMethods.formative || []).join(', ') || 'None'}</p>
            <p><strong>Summative:</strong> ${plan.assessmentMethods.summative || 'None specified'}</p>
        </div>`;
    }

    if (plan.resources?.resourcesList?.length > 0) {
        html += `<div class="ai-section">
            <h4>Resources</h4>
            <ul>`;
        plan.resources.resourcesList.forEach(res => {
            html += `<li>${res}</li>`;
        });
        html += `</ul></div>`;
    }

    html += `</div>
        <button onclick="useGeneratedPlan()" class="btn-primary" style="margin-top: 15px;">📥 ${t('fillAndPreview')}</button>
    </div>`;

    resultDiv.innerHTML = html;
}

// Use generated plan - populate form with AI results
function useGeneratedPlan() {
    if (!currentAIPlan) {
        showToast('❌ No lesson plan found. Generate one first.', 'error');
        return;
    }

    try {
        const plan = currentAIPlan;

        // Fill basic info section
        if (plan.basicInfo) {
            document.getElementById('schoolName').value = plan.basicInfo.schoolName || '';
            document.getElementById('teacherName').value = plan.basicInfo.teacherName || '';
            document.getElementById('subject').value = plan.basicInfo.subject || '';
            document.getElementById('class').value = plan.basicInfo.class || '';
            document.getElementById('duration').value = plan.basicInfo.duration || '';
            document.getElementById('unitTitle').value = plan.basicInfo.unitTitle || '';
            document.getElementById('keyCompetencies').value = plan.basicInfo.keyCompetencies || '';
        }

        // Fill lesson details
        if (plan.lessonDetails) {
            document.getElementById('instructionalObjective').value = plan.lessonDetails.instructionalObjective || '';
            document.getElementById('senNeeds').value = plan.lessonDetails.senNeeds || '';
        }

        // Fill lesson topics if available
        if (plan.lessonDetails?.lessonTopics && plan.lessonDetails.lessonTopics.length > 0) {
            const lessonContainer = document.getElementById('lessonsContainer');
            if (lessonContainer) {
                lessonContainer.innerHTML = '';
                plan.lessonDetails.lessonTopics.forEach((topic, index) => {
                    addLessonRow();
                    const rows = lessonContainer.querySelectorAll('.lesson-row');
                    if (rows[index]) {
                        rows[index].querySelector('input[placeholder*="Lesson"]')?.setAttribute('value', topic.lessonNum);
                        rows[index].querySelector('input[placeholder*="Title"]')?.setAttribute('value', topic.title);
                        rows[index].querySelector('input[placeholder*="Duration"]')?.setAttribute('value', topic.duration);
                        rows[index].querySelector('input[placeholder*="Resources"]')?.setAttribute('value', topic.resources);
                    }
                });
            }
        }

        // Scroll to section
        const basicInfoSection = document.querySelector('[data-section="basicInfo"]');
        if (basicInfoSection) {
            basicInfoSection.scroll({ top: 0, behavior: 'smooth' });
        }

        showToast('✅ Lesson form populated with generated content! Review and customize as needed.', 'success');
    } catch (error) {
        console.error('Error using generated plan:', error);
        showToast('❌ Error populating form. Please check the generated plan.', 'error');
    }
}

// Add lesson row dynamically
function addLessonRow() {
    const container = document.getElementById('lessonsContainer');
    if (!container) return;

    const rowCount = container.querySelectorAll('.lesson-row').length + 1;
    const row = document.createElement('div');
    row.className = 'lesson-row';
    row.innerHTML = `
        <input type="text" placeholder="Lesson #" value="${rowCount}" style="width: 60px;">
        <input type="text" placeholder="Topic/Title" style="flex: 1;">
        <input type="number" placeholder="Duration (min)" style="width: 120px;">
        <input type="text" placeholder="Resources" style="flex: 1;">
        <button type="button" onclick="this.parentElement.remove()" style="background-color: #ff6b6b; color: white; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer;">×</button>
    `;
    container.appendChild(row);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.querySelector('[onclick="generateLessonWithAI()"]');
    if (generateBtn) {
        generateBtn.className = 'btn-primary';
    }
});
