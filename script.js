// Data Storage
let courses = JSON.parse(localStorage.getItem('courses')) || [];
let notes = JSON.parse(localStorage.getItem('notes')) || [];
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
let currentUser = localStorage.getItem('currentUser') || 'Student';
let currentEditingNoteId = null;

// Sample Data - Initialize if empty
function initializeSampleData() {
    if (courses.length === 0) {
        courses = [
            {
                id: 1,
                name: 'Introduction to Mathematics',
                subject: 'Mathematics',
                instructor: 'Dr. Smith',
                description: 'Learn the fundamentals of mathematics',
                lessons: 4,
                completed: 2,
                progress: 50
            },
            {
                id: 2,
                name: 'Physics Basics',
                subject: 'Science',
                instructor: 'Prof. Johnson',
                description: 'Understanding the laws of motion',
                lessons: 5,
                completed: 3,
                progress: 60
            },
            {
                id: 3,
                name: 'English Literature',
                subject: 'English',
                instructor: 'Ms. Davis',
                description: 'Explore classic and modern literature',
                lessons: 6,
                completed: 2,
                progress: 33
            }
        ];
        localStorage.setItem('courses', JSON.stringify(courses));
    }

    if (Object.keys(userProgress).length === 0) {
        userProgress = {
            lessonsCompleted: 7,
            quizzesTaken: 5,
            notesCreated: 0,
            averageScore: 78
        };
        localStorage.setItem('userProgress', JSON.stringify(userProgress));
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleData();
    updateUserName();
    renderDashboard();
    renderCourses();
    renderNotes();
    updateSidebar();
    populateCourseSelects();
});

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Add active class to nav link
    event.target.classList.add('active');

    // Re-render based on section
    if (sectionId === 'dashboard') {
        renderDashboard();
    } else if (sectionId === 'courses') {
        renderCourses();
    } else if (sectionId === 'notes') {
        renderNotes();
    } else if (sectionId === 'progress') {
        renderProgress();
    }
}

// Modal Functions
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Toast Notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast active ${type}`;
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// User Functions
function updateUserName() {
    document.getElementById('userName').textContent = currentUser;
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = 'Student';
        localStorage.removeItem('currentUser');
        showToast('Logged out successfully!');
        location.reload();
    }
}

// Dashboard
function renderDashboard() {
    // Update stats
    const enrolledCount = courses.length;
    const completedCount = courses.filter(c => c.progress === 100).length;
    const avgScore = userProgress.averageScore || 0;

    document.getElementById('enrolledCount').textContent = enrolledCount;
    document.getElementById('completedCount').textContent = completedCount;
    document.getElementById('overallScore').textContent = avgScore + '%';

    document.getElementById('lessonsCompleted').textContent = userProgress.lessonsCompleted || 0;
    document.getElementById('quizzesTaken').textContent = userProgress.quizzesTaken || 0;
    document.getElementById('notesCreated').textContent = notes.length;

    // Render ongoing courses
    const ongoingList = document.getElementById('ongoingCoursesList');
    const ongoingCourses = courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 3);
    
    if (ongoingCourses.length === 0) {
        ongoingList.innerHTML = '<p class="empty-state">No courses in progress</p>';
    } else {
        ongoingList.innerHTML = ongoingCourses.map(course => `
            <div class="course-item">
                <strong>${course.name}</strong>
                <div class="progress-bar" style="margin-top: 5px;">
                    <div class="progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <span style="font-size: 11px; color: var(--text-gray);">${course.progress}% complete</span>
            </div>
        `).join('');
    }

    // Render activity
    const activityList = document.getElementById('activityList');
    if (userProgress.lessonsCompleted > 0) {
        activityList.innerHTML = `
            <div class="announcement-item">
                <strong>Latest: Completed lesson</strong>
                <p>You completed a lesson in ${courses[0]?.name || 'a course'}</p>
            </div>
            <div class="announcement-item">
                <strong>Quiz Results</strong>
                <p>Your average score: ${userProgress.averageScore}%</p>
            </div>
        `;
    }
}

// Courses Management
function addCourse() {
    const name = document.getElementById('courseName').value;
    const subject = document.getElementById('courseSubject').value;
    const instructor = document.getElementById('courseInstructor').value;

    if (!name.trim()) {
        showToast('Please enter a course name', 'warning');
        return;
    }

    const newCourse = {
        id: Date.now(),
        name,
        subject,
        instructor,
        description: `Learn ${subject.toLowerCase()}`,
        lessons: Math.floor(Math.random() * 8) + 3,
        completed: 0,
        progress: 0
    };

    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Clear form
    document.getElementById('courseName').value = '';
    document.getElementById('courseInstructor').value = '';

    closeModal('addCourseModal');
    renderCourses();
    populateCourseSelects();
    showToast('Course added successfully!');
}

function renderCourses() {
    const coursesList = document.getElementById('coursesList');
    
    if (courses.length === 0) {
        coursesList.innerHTML = '<p class="empty-state">No courses available. Start by adding a course!</p>';
        return;
    }

    coursesList.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <h3>${course.name}</h3>
                <div class="course-subject">${course.subject}</div>
            </div>
            <div class="course-body">
                <div class="course-info">👨‍🏫 ${course.instructor}</div>
                <div class="course-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${course.completed}/${course.lessons} lessons</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    <button onclick="startLesson(${course.id})">📖 Start</button>
                    <button onclick="deleteCourse(${course.id})">🗑️ Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const filtered = courses.filter(c => 
        c.name.toLowerCase().includes(searchTerm) || 
        c.subject.toLowerCase().includes(searchTerm)
    );

    const coursesList = document.getElementById('coursesList');
    if (filtered.length === 0) {
        coursesList.innerHTML = '<p class="empty-state">No courses found</p>';
        return;
    }

    coursesList.innerHTML = filtered.map(course => `
        <div class="course-card">
            <div class="course-header">
                <h3>${course.name}</h3>
                <div class="course-subject">${course.subject}</div>
            </div>
            <div class="course-body">
                <div class="course-info">👨‍🏫 ${course.instructor}</div>
                <div class="course-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${course.completed}/${course.lessons} lessons</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
                <div class="course-actions">
                    <button onclick="startLesson(${course.id})">📖 Start</button>
                    <button onclick="deleteCourse(${course.id})">🗑️ Remove</button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteCourse(courseId) {
    if (confirm('Are you sure you want to remove this course?')) {
        courses = courses.filter(c => c.id !== courseId);
        localStorage.setItem('courses', JSON.stringify(courses));
        renderCourses();
        populateCourseSelects();
        showToast('Course removed successfully!');
    }
}

function startLesson(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    // Update progress
    course.completed = Math.min(course.completed + 1, course.lessons);
    course.progress = Math.round((course.completed / course.lessons) * 100);
    localStorage.setItem('courses', JSON.stringify(courses));

    // Show lesson modal
    document.getElementById('lessonTitle').textContent = `${course.name} - Lesson ${course.completed}`;
    document.getElementById('lessonText').innerHTML = `
        <h4>${course.name}</h4>
        <p>Lesson ${course.completed} of ${course.lessons}</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is the lesson content for ${course.subject}.</p>
        <p>Key concepts covered in this lesson:</p>
        <ul>
            <li>Understanding basic principles</li>
            <li>Practical applications</li>
            <li>Real-world examples</li>
        </ul>
    `;

    // Generate quiz
    generateQuiz(course);

    showModal('lessonModal');
    renderCourses();
}

function generateQuiz(course) {
    const questions = [
        {
            question: 'What is the main topic of this lesson?',
            options: [course.name, 'General Science', 'Mathematics', 'History'],
            correct: 0
        },
        {
            question: 'Which of the following is correct?',
            options: ['Option A', 'Option B', 'Option C', 'Option D'],
            correct: 1
        },
        {
            question: 'How would you apply this concept?',
            options: ['In daily life', 'In academics', 'Both', 'Neither'],
            correct: 2
        }
    ];

    let quizHTML = '<div style="margin-top: 20px;">';
    questions.forEach((q, index) => {
        quizHTML += `
            <div style="margin-bottom: 15px; padding: 15px; background: var(--bg-light); border-radius: 6px;">
                <strong>Q${index + 1}: ${q.question}</strong>
                <div style="margin-top: 10px;">
                    ${q.options.map((opt, optIndex) => `
                        <label style="display: block; margin-bottom: 8px;">
                            <input type="radio" name="q${index}" value="${optIndex}"> ${opt}
                        </label>
                    `).join('')}
                </div>
            </div>
        `;
    });
    quizHTML += '</div>';

    document.getElementById('quizContent').innerHTML = quizHTML;
    window.currentQuiz = questions;
}

function submitQuiz() {
    const quizContent = document.getElementById('quizContent');
    let score = 0;
    let total = window.currentQuiz?.length || 0;

    if (!window.currentQuiz) return;

    window.currentQuiz.forEach((q, index) => {
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        if (selected && parseInt(selected.value) === q.correct) {
            score++;
        }
    });

    const percentage = Math.round((score / total) * 100);
    
    // Update progress
    userProgress.quizzesTaken = (userProgress.quizzesTaken || 0) + 1;
    userProgress.averageScore = Math.round(
        ((userProgress.averageScore || 0) + percentage) / 2
    );
    localStorage.setItem('userProgress', JSON.stringify(userProgress));

    showToast(`Quiz completed! Score: ${percentage}%`);
    closeModal('lessonModal');
    renderDashboard();
    renderProgress();
}

// Notes Management
function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const courseId = document.getElementById('noteCourse').value;
    const content = document.getElementById('noteContent').value;
    const tags = document.getElementById('noteTags').value;

    if (!title.trim() || !content.trim()) {
        showToast('Please fill in title and content', 'warning');
        return;
    }

    const newNote = {
        id: Date.now(),
        title,
        courseId: courseId || 'general',
        content,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
        createdAt: new Date().toLocaleDateString(),
        updatedAt: new Date().toLocaleDateString()
    };

    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    // Clear form
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTags').value = '';

    closeModal('addNoteModal');
    renderNotes();
    updateSidebar();
    showToast('Note saved successfully!');
}

function renderNotes() {
    const notesList = document.getElementById('notesList');

    if (notes.length === 0) {
        notesList.innerHTML = '<p class="empty-state">No notes yet. Create your first study note!</p>';
        return;
    }

    notesList.innerHTML = notes.map(note => {
        const course = courses.find(c => c.id == note.courseId);
        const courseLabel = course ? course.name : 'General Notes';

        return `
            <div class="note-card">
                <div class="note-header">
                    <div class="note-title">${note.title}</div>
                    <div class="note-course">📚 ${courseLabel}</div>
                </div>
                <div class="note-content">${note.content}</div>
                ${note.tags.length > 0 ? `
                    <div class="note-tags">
                        ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <div style="font-size: 11px; color: var(--text-gray); margin-bottom: 10px;">
                    Updated: ${note.updatedAt}
                </div>
                <div class="note-actions">
                    <button onclick="editNote(${note.id})">✏️ Edit</button>
                    <button onclick="deleteNote(${note.id})">🗑️ Delete</button>
                </div>
            </div>
        `;
    }).join('');
}

function editNote(noteId) {
    const note = notes.find(n => n.id === noteId);
    if (!note) return;

    currentEditingNoteId = noteId;
    document.getElementById('editNoteTitle').value = note.title;
    document.getElementById('editNoteContent').value = note.content;
    document.getElementById('editNoteTags').value = note.tags.join(', ');

    showModal('editNoteModal');
}

function updateNote() {
    const note = notes.find(n => n.id === currentEditingNoteId);
    if (!note) return;

    const title = document.getElementById('editNoteTitle').value;
    const content = document.getElementById('editNoteContent').value;
    const tags = document.getElementById('editNoteTags').value;

    if (!title.trim() || !content.trim()) {
        showToast('Please fill in title and content', 'warning');
        return;
    }

    note.title = title;
    note.content = content;
    note.tags = tags.split(',').map(t => t.trim()).filter(t => t);
    note.updatedAt = new Date().toLocaleDateString();

    localStorage.setItem('notes', JSON.stringify(notes));
    closeModal('editNoteModal');
    renderNotes();
    showToast('Note updated successfully!');
}

function deleteNote(noteId) {
    if (confirm('Are you sure you want to delete this note?')) {
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes();
        updateSidebar();
        showToast('Note deleted successfully!');
    }
}

// Progress Tracking
function renderProgress() {
    const progressList = document.getElementById('progressList');

    if (courses.length === 0) {
        progressList.innerHTML = '<p class="empty-state">No course progress to display</p>';
        return;
    }

    progressList.innerHTML = courses.map(course => `
        <div class="progress-item">
            <div class="progress-header">
                <div class="progress-title">${course.name}</div>
                <div class="progress-meta">
                    <span>${course.completed}/${course.lessons} lessons completed</span>
                    <span>•</span>
                    <span>Instructor: ${course.instructor}</span>
                </div>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${course.progress}%"></div>
            </div>
            <div style="text-align: right; margin-top: 5px; font-size: 12px; color: var(--text-gray);">
                ${course.progress}% Complete
            </div>
            <div class="progress-stats">
                <div class="stat-block">
                    <span class="stat-block-value">${course.lessons}</span>
                    <span class="stat-block-label">Total Lessons</span>
                </div>
                <div class="stat-block">
                    <span class="stat-block-value">${course.completed}</span>
                    <span class="stat-block-label">Completed</span>
                </div>
                <div class="stat-block">
                    <span class="stat-block-value">${course.lessons - course.completed}</span>
                    <span class="stat-block-label">Remaining</span>
                </div>
                <div class="stat-block">
                    <span class="stat-block-value">${course.progress}%</span>
                    <span class="stat-block-label">Progress</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Sidebar Updates
function updateSidebar() {
    document.getElementById('enrolledCount').textContent = courses.length;
    document.getElementById('completedCount').textContent = courses.filter(c => c.progress === 100).length;
    document.getElementById('overallScore').textContent = (userProgress.averageScore || 0) + '%';
}

// Populate course selects
function populateCourseSelects() {
    const noteCourseSelect = document.getElementById('noteCourse');
    noteCourseSelect.innerHTML = '<option value="">General Notes</option>' + 
        courses.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
}
