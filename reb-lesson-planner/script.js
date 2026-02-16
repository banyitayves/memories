// ==================== State Management ====================
const state = {
    lessonPlan: {
        // Basic Information
        schoolName: '',
        teacherName: '',
        date: '',
        unitNumber: '',
        subject: '',
        class: '',
        duration: '',
        classSize: '',
        senNeeds: '',
        
        // Unit Details
        unitTitle: '',
        keyCompetencies: '',
        lessonTitle: '',
        numberOfLessons: '',
        instructionalObjective: '',
        
        // Teaching Activities
        introduction: {
            teacher: '',
            learner: '',
            competencies: ''
        },
        development: {
            teacher: '',
            learner: '',
            competencies: ''
        },
        conclusion: {
            teacher: '',
            learner: '',
            competencies: ''
        },
        
        // Other sections
        genericCompetencies: '',
        crossCuttingIssues: '',
        formativeAssessment: '',
        summativeAssessment: '',
        assessmentMethods: [],
        lessons: [],
        resources: [],
        references: [],
        teacherRemarks: '',
        remarks: ''
    }
};

// ==================== DOM Elements ====================
const navLinks = document.querySelectorAll('.nav-link');
const formSections = document.querySelectorAll('.form-section');
const previewContent = document.getElementById('previewContent');
const toast = document.getElementById('toast');
const saveBtn = document.getElementById('saveBtn');
const downloadPDFBtn = document.getElementById('downloadPDFBtn');
const downloadWordBtn = document.getElementById('downloadWordBtn');
const resetBtn = document.getElementById('resetBtn');
const addLessonBtn = document.getElementById('addLessonBtn');
const addResourceBtn = document.getElementById('addResourceBtn');
const addReferenceBtn = document.getElementById('addReferenceBtn');

// ==================== Event Listeners ====================
// Navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href');
        switchSection(sectionId);
    });
});

// Action buttons
saveBtn.addEventListener('click', saveLessonPlan);
downloadPDFBtn.addEventListener('click', downloadPDF);
downloadWordBtn.addEventListener('click', downloadWord);
resetBtn.addEventListener('click', resetForm);

// Dynamic add buttons
addLessonBtn.addEventListener('click', addLesson);
addResourceBtn.addEventListener('click', addResource);
addReferenceBtn.addEventListener('click', addReference);

// Form inputs - Auto-save to state for basic info
const basicInputs = ['schoolName', 'teacherName', 'date', 'unitNumber', 'subject', 'class', 'duration', 'classSize', 'senNeeds'];
basicInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('change', (e) => {
            state.lessonPlan[id] = e.target.value;
        });
    }
});

// Unit Details inputs
const unitInputs = ['unitTitle', 'keyCompetencies', 'lessonTitle', 'numberOfLessons', 'instructionalObjective'];
unitInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('change', (e) => {
            state.lessonPlan[id] = e.target.value;
        });
    }
});

// Activities section inputs
document.addEventListener('change', (e) => {
    if (e.target.classList.contains('activity-textarea')) {
        updateActivitiesFromTable();
    }
    if (e.target.classList.contains('resource-input')) {
        updateResources();
    }
    if (e.target.classList.contains('reference-input')) {
        updateReferences();
    }
    if (e.target.classList.contains('lesson-num') || e.target.classList.contains('lesson-title') || 
        e.target.classList.contains('lesson-timing') || e.target.classList.contains('lesson-resources')) {
        updateLessons();
    }
});

// Other sections
const otherInputs = ['genericCompetencies', 'crossCuttingIssues', 'formativeAssessment', 'summativeAssessment', 'teacherRemarks', 'remarks'];
otherInputs.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('change', (e) => {
            state.lessonPlan[id] = e.target.value;
        });
    }
});

// Assessment methods checkboxes
document.querySelectorAll('.assessment-method').forEach(checkbox => {
    checkbox.addEventListener('change', updateAssessmentMethods);
});

// Preview click
document.getElementById('section-preview').addEventListener('click', generatePreview);

// ==================== Navigation ====================
function switchSection(sectionId) {
    formSections.forEach(section => section.classList.remove('active'));
    navLinks.forEach(link => link.classList.remove('active'));
    
    const section = document.querySelector(sectionId);
    if (section) {
        section.classList.add('active');
    }
    
    const activeLink = document.querySelector(`[href="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    if (sectionId === '#section-preview') {
        generatePreview();
    }
    
    if (sectionId === '#section-library') {
        loadLessonLibrary();
    }
}

// ==================== Dynamic Form Elements ====================
function addLesson() {
    const container = document.getElementById('lessonsContainer');
    const newItem = document.createElement('div');
    newItem.className = 'lesson-item';
    const lessonNum = container.children.length + 1;
    newItem.innerHTML = `
        <div class="lesson-grid">
            <div class="form-group">
                <label>Lesson #</label>
                <input type="text" class="lesson-num" placeholder="${lessonNum}" value="${lessonNum}">
            </div>
            <div class="form-group">
                <label>Topic/Title</label>
                <input type="text" class="lesson-title" placeholder="Lesson topic">
            </div>
            <div class="form-group">
                <label>Timing (minutes)</label>
                <input type="number" class="lesson-timing" placeholder="45" min="1">
            </div>
            <div class="form-group">
                <label>Resources</label>
                <input type="text" class="lesson-resources" placeholder="Materials needed">
            </div>
        </div>
        <button class="btn-remove" onclick="removeLesson(this)">✕</button>
    `;
    container.appendChild(newItem);
}

function removeLesson(btn) {
    btn.parentElement.remove();
    updateLessons();
}

function updateLessons() {
    const lessons = [];
    document.querySelectorAll('.lesson-item').forEach((item, index) => {
        const inputs = item.querySelectorAll('input');
        if (inputs[1].value.trim()) {
            lessons.push({
                number: inputs[0].value.trim() || (index + 1),
                title: inputs[1].value.trim(),
                timing: inputs[2].value.trim() || '-',
                resources: inputs[3].value.trim()
            });
        }
    });
    state.lessonPlan.lessons = lessons;
}

function addResource() {
    const container = document.getElementById('resourcesContainer');
    const newItem = document.createElement('div');
    newItem.className = 'dynamic-item';
    newItem.innerHTML = `
        <input type="text" class="resource-input" placeholder="Resource or material needed">
        <button class="btn-remove" onclick="removeResource(this)">✕</button>
    `;
    container.appendChild(newItem);
}

function removeResource(btn) {
    btn.parentElement.remove();
    updateResources();
}

function updateResources() {
    const resources = [];
    document.querySelectorAll('.resource-input').forEach(input => {
        if (input.value.trim()) {
            resources.push(input.value.trim());
        }
    });
    state.lessonPlan.resources = resources;
}

function addReference() {
    const container = document.getElementById('referencesContainer');
    const newItem = document.createElement('div');
    newItem.className = 'dynamic-item';
    newItem.innerHTML = `
        <input type="text" class="reference-input" placeholder="Author, Title, Pages/Chapter">
        <button class="btn-remove" onclick="removeReference(this)">✕</button>
    `;
    container.appendChild(newItem);
}

function removeReference(btn) {
    btn.parentElement.remove();
    updateReferences();
}

function updateReferences() {
    const references = [];
    document.querySelectorAll('.reference-input').forEach(input => {
        if (input.value.trim()) {
            references.push(input.value.trim());
        }
    });
    state.lessonPlan.references = references;
}

function updateActivitiesFromTable() {
    const textareas = document.querySelectorAll('.activity-textarea');
    if (textareas.length >= 12) {
        state.lessonPlan.introduction.teacher = textareas[0].value;
        state.lessonPlan.introduction.learner = textareas[1].value;
        state.lessonPlan.introduction.competencies = textareas[2].value;
        
        state.lessonPlan.development.teacher = textareas[3].value;
        state.lessonPlan.development.learner = textareas[4].value;
        state.lessonPlan.development.competencies = textareas[5].value;
        
        state.lessonPlan.conclusion.teacher = textareas[6].value;
        state.lessonPlan.conclusion.learner = textareas[7].value;
        state.lessonPlan.conclusion.competencies = textareas[8].value;
    }
}

function updateAssessmentMethods() {
    const methods = [];
    document.querySelectorAll('.assessment-method:checked').forEach(checkbox => {
        methods.push(checkbox.value);
    });
    state.lessonPlan.assessmentMethods = methods;
}

// ==================== Preview Generation ====================
function generatePreview() {
    updateLessons();
    updateResources();
    updateReferences();
    updateActivitiesFromTable();
    updateAssessmentMethods();
    
    const plan = state.lessonPlan;
    
    let html = `<div class="lesson-plan-document">
        <div class="plan-header">
            <h2>LESSON PLAN</h2>
            <p>Rwanda Education Board (REB) Format</p>
        </div>
        
        <div style="margin-bottom: 20px; border: 1px solid #ddd; padding: 15px;">
            <h3 style="margin-bottom: 10px;">📋 Basic Information</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div><strong>School:</strong> ${plan.schoolName || '-'}</div>
                <div><strong>Teacher:</strong> ${plan.teacherName || '-'}</div>
                <div><strong>Date:</strong> ${plan.date || '-'}</div>
                <div><strong>Unit #:</strong> ${plan.unitNumber || '-'}</div>
                <div><strong>Subject:</strong> ${plan.subject || '-'}</div>
                <div><strong>Class:</strong> ${plan.class || '-'}</div>
                <div><strong>Duration:</strong> ${plan.duration || '-'}</div>
                <div><strong>Class Size:</strong> ${plan.classSize || '-'}</div>
                <div><strong>SEN Needs:</strong> ${plan.senNeeds || 'None'}</div>
            </div>
        </div>
        
        ${plan.unitTitle ? `<div style="margin-bottom: 15px;"><strong>Unit Title:</strong> ${plan.unitTitle}</div>` : ''}
        ${plan.keyCompetencies ? `<div style="margin-bottom: 15px;"><strong>Key Competencies:</strong> ${plan.keyCompetencies}</div>` : ''}
        ${plan.lessonTitle ? `<div style="margin-bottom: 15px;"><strong>Lesson Title:</strong> ${plan.lessonTitle}</div>` : ''}
        ${plan.numberOfLessons ? `<div style="margin-bottom: 15px;"><strong>Number of Lessons:</strong> ${plan.numberOfLessons}</div>` : ''}
        ${plan.instructionalObjective ? `<div style="margin-bottom: 15px;"><strong>Instructional Objective:</strong> ${plan.instructionalObjective}</div>` : ''}
    `;
    
    // Teaching & Learning Activities
    html += `<div style="margin-bottom: 20px;">
        <h3>✏️ Teaching & Learning Activities</h3>
        <table class="preview-table" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;"><strong>Phase</strong></th>
                    <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;"><strong>Teacher Activities</strong></th>
                    <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;"><strong>Learner Activities</strong></th>
                    <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;"><strong>Competencies</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;"><strong>Introduction</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.introduction.teacher || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.introduction.learner || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.introduction.competencies || '-'}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;"><strong>Development</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.development.teacher || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.development.learner || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.development.competencies || '-'}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 8px;"><strong>Conclusion</strong></td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.conclusion.teacher || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.conclusion.learner || '-'}</td>
                    <td style="border: 1px solid #ddd; padding: 8px;">${plan.conclusion.competencies || '-'}</td>
                </tr>
            </tbody>
        </table>
    </div>`;
    
    // Lessons
    if (plan.lessons.length > 0) {
        html += `<div style="margin-bottom: 20px;">
            <h3>📅 Plan for Lessons</h3>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;">Lesson #</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;">Topic</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;">Timing</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background: #f0f0f0;">Resources</th>
                    </tr>
                </thead>
                <tbody>
                    ${plan.lessons.map(lesson => `<tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${lesson.number}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${lesson.title}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${lesson.timing} min</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${lesson.resources}</td>
                    </tr>`).join('')}
                </tbody>
            </table>
        </div>`;
    }
    
    // Assessment
    html += `<div style="margin-bottom: 20px;">
        <h3>✅ Assessment Methods</h3>
        ${plan.formativeAssessment ? `<div><strong>Formative:</strong> ${plan.formativeAssessment}</div>` : ''}
        ${plan.summativeAssessment ? `<div><strong>Summative:</strong> ${plan.summativeAssessment}</div>` : ''}
        ${plan.assessmentMethods.length > 0 ? `<div><strong>Methods:</strong> ${plan.assessmentMethods.join(', ')}</div>` : ''}
    </div>`;
    
    // Resources
    if (plan.resources.length > 0) {
        html += `<div style="margin-bottom: 20px;">
            <h3>📦 Teaching & Learning Resources</h3>
            <ul>${plan.resources.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>`;
    }
    
    // References
    if (plan.references.length > 0) {
        html += `<div style="margin-bottom: 20px;">
            <h3>📚 References</h3>
            <ul>${plan.references.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>`;
    }
    
    // Teacher Remarks
    if (plan.teacherRemarks) {
        html += `<div style="margin-bottom: 20px;">
            <h3>📝 Teacher Self-Evaluation</h3>
            <p>${plan.teacherRemarks}</p>
        </div>`;
    }
    
    html += '</div>';
    previewContent.innerHTML = html;
}

// ==================== PDF Export ====================
function downloadPDF() {
    updateLessons();
    updateResources();
    updateReferences();
    updateActivitiesFromTable();
    updateAssessmentMethods();
    
    const plan = state.lessonPlan;
    
    if (!plan.schoolName || !plan.teacherName) {
        showToast('Please fill in School Name and Teacher Name before downloading', 'error');
        return;
    }
    
    // Generate HTML content for PDF
    const element = document.createElement('div');
    element.id = 'pdf-content';
    element.style.padding = '20px';
    element.style.fontSize = '12px';
    element.innerHTML = `
        <h1 style="text-align: center; margin-bottom: 20px;">LESSON PLAN</h1>
        <p style="text-align: center; margin-bottom: 20px; font-weight: bold;">Rwanda Education Board (REB) Format</p>
        
        <table style="width: 100%; margin-bottom: 20px; border-collapse: collapse;">
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>School:</strong> ${plan.schoolName}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Teacher:</strong> ${plan.teacherName}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Date:</strong> ${plan.date}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Unit #:</strong> ${plan.unitNumber}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Subject:</strong> ${plan.subject}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Class:</strong> ${plan.class}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Duration:</strong> ${plan.duration}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Class Size:</strong> ${plan.classSize}</td>
                <td style="padding: 5px; border: 1px solid #000;"><strong>SEN Needs:</strong> ${plan.senNeeds || 'None'}</td>
            </tr>
        </table>
        
        <h3 style="margin-top: 15px; margin-bottom: 10px;">Unit Details</h3>
        <table style="width: 100%; margin-bottom: 15px; border-collapse: collapse;">
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Unit Title:</strong> ${plan.unitTitle}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Lesson Title:</strong> ${plan.lessonTitle}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Number of Lessons:</strong> ${plan.numberOfLessons}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Key Competencies:</strong> ${plan.keyCompetencies}</td>
            </tr>
            <tr>
                <td style="padding: 5px; border: 1px solid #000;"><strong>Instructional Objective:</strong> ${plan.instructionalObjective}</td>
            </tr>
        </table>
        
        <h3 style="margin-top: 15px; margin-bottom: 10px;">Teaching & Learning Activities</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <thead>
                <tr style="background-color: #e0e0e0;">
                    <th style="border: 1px solid #000; padding: 8px; width: 20%;"><strong>Phase</strong></th>
                    <th style="border: 1px solid #000; padding: 8px; width: 26.7%;"><strong>Teacher Activities</strong></th>
                    <th style="border: 1px solid #000; padding: 8px; width: 26.7%;"><strong>Learner Activities</strong></th>
                    <th style="border: 1px solid #000; padding: 8px; width: 26.7%;"><strong>Generic Competencies</strong></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Introduction</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.introduction.teacher}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.introduction.learner}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.introduction.competencies}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Development of the Lesson</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.development.teacher}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.development.learner}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.development.competencies}</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; padding: 8px; font-weight: bold;">Conclusion</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.conclusion.teacher}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.conclusion.learner}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${plan.conclusion.competencies}</td>
                </tr>
            </tbody>
        </table>
        
        ${plan.genericCompetencies ? `<div style="margin-bottom: 15px;"><strong>Generic Competencies to be Developed:</strong> ${plan.genericCompetencies}</div>` : ''}
        ${plan.crossCuttingIssues ? `<div style="margin-bottom: 15px;"><strong>Cross-Cutting Issues:</strong> ${plan.crossCuttingIssues}</div>` : ''}
        
        ${plan.lessons.length > 0 ? `<h3 style="margin-top: 15px; margin-bottom: 10px;">Plan for Lessons</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
            <thead>
                <tr style="background-color: #e0e0e0;">
                    <th style="border: 1px solid #000; padding: 8px;">Lesson #</th>
                    <th style="border: 1px solid #000; padding: 8px;">Topic/Title</th>
                    <th style="border: 1px solid #000; padding: 8px;">Timing (min)</th>
                    <th style="border: 1px solid #000; padding: 8px;">Resources</th>
                </tr>
            </thead>
            <tbody>
                ${plan.lessons.map(l => `<tr>
                    <td style="border: 1px solid #000; padding: 8px;">${l.number}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${l.title}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${l.timing}</td>
                    <td style="border: 1px solid #000; padding: 8px;">${l.resources}</td>
                </tr>`).join('')}
            </tbody>
        </table>` : ''}
        
        <h3 style="margin-top: 15px; margin-bottom: 10px;">Assessment Methods</h3>
        ${plan.formativeAssessment ? `<div style="margin-bottom: 8px;"><strong>Formative Assessment:</strong> ${plan.formativeAssessment}</div>` : ''}
        ${plan.summativeAssessment ? `<div style="margin-bottom: 8px;"><strong>Summative Assessment:</strong> ${plan.summativeAssessment}</div>` : ''}
        ${plan.assessmentMethods.length > 0 ? `<div><strong>Methods:</strong> ${plan.assessmentMethods.join(', ')}</div>` : ''}
        
        ${plan.resources.length > 0 ? `<h3 style="margin-top: 15px; margin-bottom: 10px;">Teaching & Learning Resources</h3>
        <ul>${plan.resources.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
        
        ${plan.references.length > 0 ? `<h3 style="margin-top: 15px; margin-bottom: 10px;">References</h3>
        <ul>${plan.references.map(r => `<li>${r}</li>`).join('')}</ul>` : ''}
        
        ${plan.teacherRemarks ? `<h3 style="margin-top: 15px; margin-bottom: 10px;">Teacher Self-Evaluation</h3>
        <p>${plan.teacherRemarks}</p>` : ''}
        
        ${plan.remarks ? `<h3 style="margin-top: 15px; margin-bottom: 10px;">Special Needs/Inclusive Education Notes</h3>
        <p>${plan.remarks}</p>` : ''}
    `;
    
    document.body.appendChild(element);
    
    const options = {
        margin: 10,
        filename: `${plan.subject}_Lesson_Plan_${plan.lessonTitle || 'Plan'}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(options).from(element).save().then(() => {
        document.body.removeChild(element);
        showToast('PDF downloaded successfully!', 'success');
    }).catch(error => {
        console.error('PDF generation error:', error);
        document.body.removeChild(element);
        showToast('Error generating PDF. Please try again.', 'error');
    });
}

// ==================== Word Export ====================
function downloadWord() {
    updateLessons();
    updateResources();
    updateReferences();
    updateActivitiesFromTable();
    updateAssessmentMethods();
    
    const plan = state.lessonPlan;
    
    if (!plan.schoolName || !plan.teacherName) {
        showToast('Please fill in School Name and Teacher Name before downloading', 'error');
        return;
    }
    
    try {
        // Create document sections
        const sections = [];
        
        // Title
        sections.push(new docx.Paragraph({
            text: 'LESSON PLAN',
            alignment: docx.AlignmentType.CENTER,
            bold: true,
            size: 28
        }));
        
        sections.push(new docx.Paragraph({
            text: 'Rwanda Education Board (REB) Format',
            alignment: docx.AlignmentType.CENTER,
            size: 20
        }));
        
        sections.push(new docx.Paragraph({ text: '' }));
        
        // Basic Information Table
        const basicTable = new docx.Table({
            rows: [
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'School', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.schoolName })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Teacher', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.teacherName })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Date', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.date })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Unit #', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.unitNumber })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Subject', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.subject })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Class', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.class })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Duration', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.duration })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Class Size', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.classSize })] })
                    ]
                })
            ],
            width: { size: 100, type: docx.WidthType.PERCENT }
        });
        
        sections.push(basicTable);
        sections.push(new docx.Paragraph({ text: '' }));
        
        // Unit Details
        sections.push(new docx.Paragraph({ text: 'Unit Details', size: 22, bold: true }));
        sections.push(new docx.Paragraph({ text: `Unit Title: ${plan.unitTitle}` }));
        sections.push(new docx.Paragraph({ text: `Lesson Title: ${plan.lessonTitle}` }));
        sections.push(new docx.Paragraph({ text: `Number of Lessons: ${plan.numberOfLessons}` }));
        sections.push(new docx.Paragraph({ text: `Key Competencies: ${plan.keyCompetencies}` }));
        sections.push(new docx.Paragraph({ text: `Instructional Objective: ${plan.instructionalObjective}` }));
        sections.push(new docx.Paragraph({ text: '' }));
        
        // Teaching & Learning Activities Table
        sections.push(new docx.Paragraph({ text: 'Teaching & Learning Activities', size: 22, bold: true }));
        
        const activitiesTable = new docx.Table({
            rows: [
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Phase', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Teacher Activities', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Learner Activities', bold: true })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Generic Competencies', bold: true })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Introduction' })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.introduction.teacher })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.introduction.learner })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.introduction.competencies })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Development' })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.development.teacher })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.development.learner })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.development.competencies })] })
                    ]
                }),
                new docx.TableRow({
                    cells: [
                        new docx.TableCell({ children: [new docx.Paragraph({ text: 'Conclusion' })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.conclusion.teacher })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.conclusion.learner })] }),
                        new docx.TableCell({ children: [new docx.Paragraph({ text: plan.conclusion.competencies })] })
                    ]
                })
            ],
            width: { size: 100, type: docx.WidthType.PERCENT }
        });
        
        sections.push(activitiesTable);
        sections.push(new docx.Paragraph({ text: '' }));
        
        // Assessment
        sections.push(new docx.Paragraph({ text: 'Assessment Methods', size: 22, bold: true }));
        if (plan.formativeAssessment) {
            sections.push(new docx.Paragraph({ text: `Formative Assessment: ${plan.formativeAssessment}` }));
        }
        if (plan.summativeAssessment) {
            sections.push(new docx.Paragraph({ text: `Summative Assessment: ${plan.summativeAssessment}` }));
        }
        if (plan.assessmentMethods.length > 0) {
            sections.push(new docx.Paragraph({ text: `Methods: ${plan.assessmentMethods.join(', ')}` }));
        }
        sections.push(new docx.Paragraph({ text: '' }));
        
        // Resources
        if (plan.resources.length > 0) {
            sections.push(new docx.Paragraph({ text: 'Teaching & Learning Resources', size: 22, bold: true }));
            plan.resources.forEach(resource => {
                sections.push(new docx.Paragraph({
                    text: resource,
                    bullet: { level: 0 }
                }));
            });
            sections.push(new docx.Paragraph({ text: '' }));
        }
        
        // References
        if (plan.references.length > 0) {
            sections.push(new docx.Paragraph({ text: 'References', size: 22, bold: true }));
            plan.references.forEach(reference => {
                sections.push(new docx.Paragraph({
                    text: reference,
                    bullet: { level: 0 }
                }));
            });
            sections.push(new docx.Paragraph({ text: '' }));
        }
        
        // Teacher Self-Evaluation
        if (plan.teacherRemarks) {
            sections.push(new docx.Paragraph({ text: 'Teacher Self-Evaluation', size: 22, bold: true }));
            sections.push(new docx.Paragraph({ text: plan.teacherRemarks }));
        }
        
        // Create document
        const doc = new docx.Document({
            sections: [{
                children: sections
            }]
        });
        
        // Save document
        docx.Packer.toBlob(doc).then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${plan.subject}_Lesson_Plan_${plan.lessonTitle || 'Plan'}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            showToast('Word document downloaded successfully!', 'success');
        });
    } catch (error) {
        console.error('Word generation error:', error);
        showToast('Error generating Word document. Please try again.', 'error');
    }
}

// ==================== Save & Reset ====================
function resetForm() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
        document.querySelectorAll('input, select, textarea').forEach(input => {
            input.value = '';
            if (input.type === 'checkbox') {
                input.checked = false;
            }
        });
        
        // Reset state
        state.lessonPlan = {
            schoolName: '',
            teacherName: '',
            date: '',
            unitNumber: '',
            subject: '',
            class: '',
            duration: '',
            classSize: '',
            senNeeds: '',
            unitTitle: '',
            keyCompetencies: '',
            lessonTitle: '',
            numberOfLessons: '',
            instructionalObjective: '',
            introduction: { teacher: '', learner: '', competencies: '' },
            development: { teacher: '', learner: '', competencies: '' },
            conclusion: { teacher: '', learner: '', competencies: '' },
            genericCompetencies: '',
            crossCuttingIssues: '',
            formativeAssessment: '',
            summativeAssessment: '',
            assessmentMethods: [],
            lessons: [],
            resources: [],
            references: [],
            teacherRemarks: '',
            remarks: ''
        };
        
        previewContent.innerHTML = '<p class="placeholder">Fill in the form and click here to generate preview...</p>';
        showToast('All data cleared!', 'info');
    }
}

// ==================== Toast Notifications ====================
function showToast(message, type = 'info') {
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==================== Integration with Auth System ====================

// Enhanced lesson save - AI ONLY
function saveLessonPlan() {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    
    if (!user.id) {
        showToast('Please log in to save lesson plans', 'error');
        return;
    }

    // Only allow saving AI-generated plans
    if (!currentAIPlan) {
        showToast('❌ Only AI-generated lesson plans can be saved. Generate one using AI first!', 'error');
        return;
    }

    // Save the AI-generated plan
    const lessonData = {
        id: generateId(),
        userId: user.id,
        timestamp: new Date().toISOString(),
        aiGenerated: true,
        ...currentAIPlan
    };

    // Load existing plans
    let plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    
    // Add new plan
    plans.push(lessonData);
    localStorage.setItem('reb_lessonPlans', JSON.stringify(plans));
    
    // Clear form and AI plan after save
    currentAIPlan = null;
    resetForm();
    
    // Reload library to show new plan
    loadLessonLibrary();
    
    showToast(`✅ AI Lesson plan "${lessonData.unitTitle || lessonData.lessonTitle}" saved successfully!`, 'success');
    
    // Navigate to library
    switchSection('#section-library');
}

// Load user's lesson plans
function loadUserLessonPlans() {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (!user.id) return [];
    
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    return plans.filter(plan => plan.userId === user.id);
}

// Load specific lesson plan
function loadLessonPlan(lessonId) {
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    const plan = plans.find(p => p.id === lessonId);
    
    if (!plan) {
        showToast('Lesson plan not found', 'error');
        return;
    }

    state.lessonPlan = plan;
    
    // Populate form with loaded data
    const fieldsToFill = [
        'schoolName', 'teacherName', 'date', 'unitNumber', 'subject', 'class', 
        'duration', 'classSize', 'senNeeds', 'unitTitle', 'keyCompetencies', 
        'lessonTitle', 'numberOfLessons', 'instructionalObjective'
    ];
    
    fieldsToFill.forEach(id => {
        const element = document.getElementById(id);
        if (element && plan[id]) {
            element.value = plan[id];
        }
    });
    
    showToast('✅ Lesson plan loaded successfully!', 'success');
}

// Admin: Load all lesson plans
function loadAllLessonPlans() {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (user.role !== 'admin') {
        showToast('Admin access required', 'error');
        return [];
    }
    return JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
}

// Admin: Delete lesson plan
function deleteLessonPlan(lessonId) {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (user.role !== 'admin') {
        showToast('Admin access required', 'error');
        return;
    }
    
    let plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    plans = plans.filter(p => p.id !== lessonId);
    localStorage.setItem('reb_lessonPlans', JSON.stringify(plans));
    
    showToast('✅ Lesson plan deleted', 'success');
}

// Admin: Delete user and their plans
function deleteUserAndPlans(userId) {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (user.role !== 'admin') {
        showToast('Admin access required', 'error');
        return;
    }
    
    if (!confirm('Are you sure? This will delete the user and all their lesson plans.')) return;
    if (!confirm('Click OK again to confirm deletion.')) return;
    
    // Delete user
    let users = JSON.parse(localStorage.getItem('reb_users') || '[]');
    users = users.filter(u => u.id !== userId);
    localStorage.setItem('reb_users', JSON.stringify(users));
    
    // Delete user's plans
    let plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    plans = plans.filter(p => p.userId !== userId);
    localStorage.setItem('reb_lessonPlans', JSON.stringify(plans));
    
    showToast('✅ User and all their lesson plans deleted', 'success');
}

// Admin: Initialize admin panel
function initializeAdminPanel() {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (user.role !== 'admin') return;
    
    const statsDiv = document.querySelector('[data-stats]');
    if (statsDiv) {
        const stats = getUserStats();
        statsDiv.innerHTML = `
            <div class="stat-box">
                <div class="stat-value">${stats.totalUsers}</div>
                <div class="stat-label">Total Teachers</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${stats.totalLessonPlans}</div>
                <div class="stat-label">Lesson Plans</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">${stats.adminCount}</div>
                <div class="stat-label">Admins</div>
            </div>
        `;
    }
}

// ==================== Lesson Library Management ====================

// Load and display lesson library
function loadLessonLibrary() {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    if (!user.id) return;
    
    const container = document.getElementById('lessonLibraryContainer');
    const emptyState = document.getElementById('emptyLibrary');
    
    if (!container) return;
    
    // Get user's lesson plans
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    const userPlans = plans.filter(plan => plan.userId === user.id);
    
    if (userPlans.length === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    container.style.display = 'grid';
    container.innerHTML = '';
    
    // Create lesson cards
    userPlans.forEach(plan => {
        const card = createLessonCard(plan);
        container.appendChild(card);
    });
}

// Create lesson card element
function createLessonCard(plan) {
    const card = document.createElement('div');
    card.className = 'lesson-card';
    
    const createdDate = plan.timestamp ? new Date(plan.timestamp).toLocaleDateString('en-US') : 'Unknown';
    
    card.innerHTML = `
        <div class="lesson-card-header">
            <span class="lesson-type-badge ai-generated">⚡ AI Generated</span>
            <h3 class="lesson-card-title">${plan.unitTitle || 'Untitled Lesson'}</h3>
            <p class="lesson-card-subtitle">${plan.subject || 'No subject'} • ${plan.class || 'No class'}</p>
        </div>
        <div class="lesson-card-details">
            <div class="lesson-detail-row">
                <span class="lesson-detail-label">Duration:</span>
                <span class="lesson-detail-value">${plan.duration || 'N/A'} min</span>
            </div>
            <div class="lesson-detail-row">
                <span class="lesson-detail-label">Teacher:</span>
                <span class="lesson-detail-value">${plan.teacherName || 'N/A'}</span>
            </div>
            <div class="lesson-detail-row">
                <span class="lesson-detail-label">Created:</span>
                <span class="lesson-detail-value">${createdDate}</span>
            </div>
            <div class="lesson-detail-row">
                <span class="lesson-detail-label">School:</span>
                <span class="lesson-detail-value">${plan.schoolName || 'N/A'}</span>
            </div>
        </div>
        <div class="lesson-card-actions">
            <button class="lesson-btn-load" onclick="loadLessonToEdit('${plan.id}')">📂 Load</button>
            <button class="lesson-btn-download" onclick="downloadLessonREB('${plan.id}', 'pdf')">📄 PDF</button>
            <button class="lesson-btn-delete" onclick="deleteLessonPlan('${plan.id}')">🗑️ Delete</button>
        </div>
    `;
    
    return card;
}

// Load lesson plan into editor
function loadLessonToEdit(lessonId) {
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    const plan = plans.find(p => p.id === lessonId);
    
    if (!plan) {
        showToast('❌ Lesson plan not found', 'error');
        return;
    }
    
    state.lessonPlan = { ...plan };
    
    // Populate ALL form fields
    const fieldsToFill = [
        'schoolName', 'teacherName', 'date', 'unitNumber', 'subject', 'class',
        'duration', 'classSize', 'senNeeds', 'unitTitle', 'keyCompetencies',
        'lessonTitle', 'numberOfLessons', 'instructionalObjective',
        'genericCompetencies', 'crossCuttingIssues', 'formativeAssessment', 'summativeAssessment'
    ];
    
    fieldsToFill.forEach(id => {
        const element = document.getElementById(id);
        if (element && plan[id] !== undefined) {
            element.value = plan[id];
        }
    });
    
    // Restore dynamic lessons if they exist
    if (plan.lessons && Array.isArray(plan.lessons) && plan.lessons.length > 0) {
        const lessonsContainer = document.getElementById('lessonsContainer');
        if (lessonsContainer) {
            // Clear existing lessons
            lessonsContainer.innerHTML = '';
            
            // Restore each lesson
            plan.lessons.forEach((lesson, index) => {
                const lessonDiv = document.createElement('div');
                lessonDiv.className = 'lesson-item';
                lessonDiv.innerHTML = `
                    <div class="form-group">
                        <h4>Lesson ${lesson.number}</h4>
                        <textarea placeholder="Lesson content..." rows="4">${lesson.content || ''}</textarea>
                        <textarea placeholder="Teaching activities..." rows="3" class="activities-input">${lesson.activities || ''}</textarea>
                        <textarea placeholder="Assessment methods..." rows="3" class="assessment-input">${lesson.assessment || ''}</textarea>
                        <textarea placeholder="Required resources..." rows="2" class="resources-input">${lesson.resources || ''}</textarea>
                        <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.parentElement.remove()">Remove Lesson</button>
                    </div>
                `;
                lessonsContainer.appendChild(lessonDiv);
            });
        }
    }
    
    // Restore AI plan if it was AI-generated
    if (plan.aiPlan !== null && plan.aiPlan !== undefined) {
        currentAIPlan = plan.aiPlan;
    }
    
    // Switch to basic info section
    switchSection('#section-basic');
    showToast(`✅ Lesson "${plan.unitTitle || plan.lessonTitle}" loaded for editing!`, 'success');
}

// Download lesson plan in REB format PDF
async function downloadLessonREB(lessonId, format = 'pdf') {
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    const plan = plans.find(p => p.id === lessonId);
    
    if (!plan) {
        showToast('❌ Lesson plan not found', 'error');
        return;
    }
    
    showToast('⏳ Generating ' + format.toUpperCase() + '...', 'info');
    
    const rebContent = generateREBFormat(plan);
    
    if (format === 'pdf') {
        downloadPDFFromHTML(rebContent, `${plan.unitTitle || 'Lesson-Plan'}.pdf`);
    } else if (format === 'word') {
        downloadWord(plan);
    }
    
    showToast(`✅ ${format.toUpperCase()} downloaded successfully!`, 'success');
}

// Generate REB-formatted content
function generateREBFormat(plan) {
    // Build lesson delivery content from saved lessons
    let lessonsHtml = '';
    if (plan.lessons && Array.isArray(plan.lessons) && plan.lessons.length > 0) {
        lessonsHtml = plan.lessons.map(lesson => `
            <div style="margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 4px solid #2a5298;">
                <h4>Lesson ${lesson.number}</h4>
                <p><strong>Content:</strong> ${lesson.content || 'N/A'}</p>
                <p><strong>Activities:</strong> ${lesson.activities || 'N/A'}</p>
                <p><strong>Assessment:</strong> ${lesson.assessment || 'N/A'}</p>
                <p><strong>Resources:</strong> ${lesson.resources || 'N/A'}</p>
            </div>
        `).join('');
    }
    
    return `
    <div style="font-family: Arial, sans-serif; max-width: 1000px; margin: 0 auto; padding: 20px; line-height: 1.6;">
        <style>
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #000; padding: 10px; text-align: left; }
            th { background-color: #e0e0e0; font-weight: bold; }
            h1 { text-align: center; font-size: 18px; margin: 20px 0; }
            h2 { font-size: 14px; margin: 15px 0 10px 0; }
            .section { margin: 20px 0; }
            .header-row { display: flex; justify-content: space-between; margin: 10px 0; }
        </style>
        
        <h1>LESSON PLAN</h1>
        
        <!-- Header Information -->
        <div class="header-row">
            <div><strong>School Name:</strong> ${plan.schoolName || '_________________'}</div>
            <div><strong>Date:</strong> ${plan.date || '_________________'}</div>
        </div>
        <div class="header-row">
            <div><strong>Teacher's Name:</strong> ${plan.teacherName || '_________________'}</div>
        </div>
        
        <!-- Top Information Table -->
        <table>
            <tr>
                <th colspan="6">LESSON INFORMATION</th>
            </tr>
            <tr>
                <td colspan="2"><strong>Unit N°:</strong> ${plan.unitNumber || ''}</td>
                <td colspan="2"><strong>Subject:</strong> ${plan.subject || ''}</td>
                <td colspan="2"><strong>Class:</strong> ${plan.class || ''}</td>
            </tr>
            <tr>
                <td colspan="3"><strong>Duration:</strong> ${plan.duration || ''} minutes</td>
                <td colspan="3"><strong>Class size:</strong> ${plan.classSize || ''}</td>
            </tr>
        </table>
        
        <!-- Unit Details Section -->
        <div class="section">
            <h2>UNIT DETAILS</h2>
            <table>
                <tr>
                    <td><strong>Type of Special Educational Needs (SEN):</strong></td>
                    <td>${plan.senNeeds || 'N/A'}</td>
                </tr>
                <tr>
                    <td><strong>Unit Title:</strong></td>
                    <td>${plan.unitTitle || ''}</td>
                </tr>
                <tr>
                    <td><strong>Lesson Title:</strong></td>
                    <td>${plan.lessonTitle || ''}</td>
                </tr>
                <tr>
                    <td><strong>Key Unit Competencies:</strong></td>
                    <td>${plan.keyCompetencies || ''}</td>
                </tr>
                <tr>
                    <td><strong>Number of Lessons:</strong></td>
                    <td>${plan.numberOfLessons || ''}</td>
                </tr>
            </table>
        </div>
        
        <!-- Instructional Objective -->
        <div class="section">
            <h2>INSTRUCTIONAL OBJECTIVE</h2>
            <p>${plan.instructionalObjective || ''}</p>
        </div>
        
        <!-- Generic Competencies & Cross-cutting Issues -->
        <div class="section">
            <h2>GENERIC COMPETENCIES & CROSS-CUTTING ISSUES</h2>
            <p><strong>Generic Competencies:</strong> ${plan.genericCompetencies || 'N/A'}</p>
            <p><strong>Cross-cutting Issues:</strong> ${plan.crossCuttingIssues || 'N/A'}</p>
        </div>
        
        <!-- Teaching & Learning Activities -->
        <div class="section">
            <h2>LESSON DELIVERY - CONTENT & ACTIVITIES</h2>
            ${lessonsHtml || '<p>No lesson content provided.</p>'}
        </div>
        
        <!-- Assessment Methods -->
        <div class="section">
            <h2>ASSESSMENT METHODS</h2>
            <p>Students will be assessed through the activities and tasks outlined in each lesson phase.</p>
        </div>
        
        <!-- Footer -->
        <p style="text-align: center; margin-top: 40px; color: #999; font-size: 12px;">
            Generated on ${new Date().toLocaleDateString()} using REB Lesson Plan Generator
        </p>
    </div>
    `;
}

// Download PDF using html2pdf
function downloadPDFFromHTML(htmlContent, filename) {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;
    
    const opt = {
        margin: 10,
        filename: filename,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    html2pdf().set(opt).from(element).save();
}

// Delete lesson plan with confirmation
function deleteLessonPlan(lessonId) {
    const user = JSON.parse(localStorage.getItem('reb_currentUser') || '{}');
    const plans = JSON.parse(localStorage.getItem('reb_lessonPlans') || '[]');
    const plan = plans.find(p => p.id === lessonId);
    
    if (!plan) {
        showToast('❌ Lesson plan not found', 'error');
        return;
    }
    
    if (!confirm(`Delete "${plan.unitTitle || 'Untitled'}"? This cannot be undone.`)) {
        return;
    }
    
    const updatedPlans = plans.filter(p => p.id !== lessonId);
    localStorage.setItem('reb_lessonPlans', JSON.stringify(updatedPlans));
    
    showToast('✅ Lesson plan deleted!', 'success');
    loadLessonLibrary();
}

// Search lesson library
function searchLessonLibrary(query) {
    const cards = document.querySelectorAll('.lesson-card');
    const searchTerm = query.toLowerCase();
    
    cards.forEach(card => {
        const title = card.querySelector('.lesson-card-title')?.textContent.toLowerCase() || '';
        const subtitle = card.querySelector('.lesson-card-subtitle')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter lesson library by type
function filterLessonLibrary(type) {
    const cards = document.querySelectorAll('.lesson-card');
    
    cards.forEach(card => {
        const badge = card.querySelector('.lesson-type-badge');
        const isAI = badge?.classList.contains('ai-generated');
        
        if (type === '') {
            card.style.display = '';
        } else if (type === 'ai-generated' && isAI) {
            card.style.display = '';
        } else if (type === 'manual' && !isAI) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('REB Lesson Planner loaded');
    
    // Set up event listeners after auth is complete
    setTimeout(() => {
        // Only load if not in auth modal
        if (document.getElementById('appContainer')?.style.display !== 'none') {
            const saved = localStorage.getItem('rebLessonPlan');
            if (saved) {
                const loaded = JSON.parse(saved);
                state.lessonPlan = loaded;
                
                // Populate basic info
                ['schoolName', 'teacherName', 'date', 'unitNumber', 'subject', 'class', 'duration', 'classSize', 'senNeeds'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element && loaded[id]) {
                        element.value = loaded[id];
                    }
                });
                
                // Populate unit details
                ['unitTitle', 'keyCompetencies', 'lessonTitle', 'numberOfLessons', 'instructionalObjective'].forEach(id => {
                    const element = document.getElementById(id);
                    if (element && loaded[id]) {
                        element.value = loaded[id];
                    }
                });
                
                showToast('✅ Previous lesson plan loaded!', 'success');
            }
            
            // Initialize admin panel if user is admin
            initializeAdminPanel();
            
            // Load lesson library
            loadLessonLibrary();
            
            // Add search and filter listeners
            const librarySearch = document.getElementById('librarySearch');
            const libraryFilter = document.getElementById('libraryFilter');
            
            if (librarySearch) {
                librarySearch.addEventListener('input', (e) => {
                    searchLessonLibrary(e.target.value);
                });
            }
        }
    }, 500);
});
