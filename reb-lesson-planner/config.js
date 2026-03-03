// ==================== REB AI Lesson Planner Configuration ====================
// This file contains all configuration settings for the application

const APP_CONFIG = {
    // Application Settings
    APP_NAME: 'REB AI Lesson Plan Generator',
    VERSION: '2.0.0',
    
    // Rwandan Education System Structure
    GRADES: {
        PRIMARY: [
            { code: 'P1', label: 'Primary 1', level: 1 },
            { code: 'P2', label: 'Primary 2', level: 2 },
            { code: 'P3', label: 'Primary 3', level: 3 },
            { code: 'P4', label: 'Primary 4', level: 4 },
            { code: 'P5', label: 'Primary 5', level: 5 },
            { code: 'P6', label: 'Primary 6', level: 6 }
        ],
        SECONDARY: [
            { code: 'S1', label: 'Secondary 1', level: 7 },
            { code: 'S2', label: 'Secondary 2', level: 8 },
            { code: 'S3', label: 'Secondary 3', level: 9 },
            { code: 'S4', label: 'Secondary 4', level: 10 },
            { code: 'S5', label: 'Secondary 5', level: 11 },
            { code: 'S6', label: 'Secondary 6', level: 12 }
        ]
    },

    // REB Subjects by Level
    SUBJECTS: {
        P1: ['English', 'Kinyarwanda', 'Mathematics', 'Integrated Science', 'Social Studies', 'Physical Education', 'Arts & Crafts'],
        P2: ['English', 'Kinyarwanda', 'Mathematics', 'Integrated Science', 'Social Studies', 'Physical Education', 'Arts & Crafts'],
        P3: ['English', 'Kinyarwanda', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Physical Education', 'Arts & Crafts'],
        P4: ['English', 'Kinyarwanda', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Physical Education', 'Arts & Crafts'],
        P5: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Physical Education', 'Arts & Crafts'],
        P6: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Science', 'Social Studies', 'ICT', 'Physical Education', 'Arts & Crafts'],
        S1: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Civics', 'ICT', 'Physical Education', 'Career Guidance'],
        S2: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Civics', 'ICT', 'Physical Education', 'Career Guidance'],
        S3: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Civics', 'ICT', 'Physical Education', 'Career Guidance'],
        S4: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Economics', 'ICT', 'Physical Education', 'Literature'],
        S5: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Economics', 'Entrepreneurship', 'ICT', 'Literature'],
        S6: ['English', 'Kinyarwanda', 'French', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Economics', 'Entrepreneurship', 'ICT', 'Literature']
    },

    // REB Cross-Cutting Issues (Must be integrated in all lessons)
    CROSS_CUTTING_ISSUES: [
        'Inclusive Education (Learners with Special Needs)',
        'Gender & Equality',
        'Genocide Ideology & Reconciliation',
        'Environment and Sustainability',
        'Standardization Culture',
        'ICT Integration',
        'Values & Peace Education',
        'Financial Literacy'
    ],

    // Generic Competencies as per REB Framework
    GENERIC_COMPETENCIES: [
        'Criticality and Creative Thinking',
        'Communication',
        'Collaboration',
        'Information and Digital Literacy',
        'Lifelong Learning'
    ],

    // Learning Activities Types
    ACTIVITY_TYPES: [
        'Whole Class Teaching',
        'Pair Work',
        'Group Work',
        'Individual Task',
        'Practical Demonstration',
        'Simulation',
        'Project-Based Learning',
        'Cooperative Learning',
        'Peer Teaching',
        'Think-Pair-Share'
    ],

    // Assessment Methods as per REB Standards
    ASSESSMENT_METHODS: [
        'Observation',
        'Questioning & Discussion',
        'Written Tests/Quizzes',
        'Practical Activities',
        'Projects/Assignments',
        'Group Work/Presentations',
        'Portfolio Assessment',
        'Self-Assessment',
        'Peer Assessment',
        'Performance Tasks'
    ],

    // Special Needs Categories
    SPECIAL_NEEDS_CATEGORIES: [
        'Visual Impairment',
        'Hearing Impairment',
        'Physical Disability',
        'Learning Disabilities',
        'Speech/Language Impairment',
        'Emotional/Behavioral Disorders',
        'Intellectually Gifted',
        'Multiple Disabilities'
    ],

    // Teaching Resources Categories
    RESOURCE_CATEGORIES: [
        'Textbooks & Reference Materials',
        'Manipulatives & Models',
        'Laboratory Equipment',
        'Charts & Posters',
        'Audio-Visual Materials',
        'Digital Resources',
        'Community Resources',
        'Learner-Made Materials'
    ],

    // AI Configuration
    AI: {
        // OpenAI Configuration
        OPENAI: {
            apiEndpoint: 'https://api.openai.com/v1/chat/completions',
            model: 'gpt-3.5-turbo',
            maxTokens: 3000,
            temperature: 0.7,
            // Get API key from: https://platform.openai.com/api-keys
            apiKey: localStorage.getItem('openai_api_key') || ''
        },

        // Alternative: Claude API Configuration
        CLAUDE: {
            apiEndpoint: 'https://api.anthropic.com/v1/messages',
            model: 'claude-3-sonnet-20240229',
            maxTokens: 3000,
            // Get API key from: https://console.anthropic.com/
            apiKey: localStorage.getItem('claude_api_key') || ''
        },

        // Use demo mode when no API key is available
        DEMO_MODE: true,
        ACTIVE_PROVIDER: 'openai' // 'openai' or 'claude'
    },

    // Local Storage Keys
    STORAGE_KEYS: {
        USER: 'reb_user',
        LESSONS: 'reb_lessons',
        PREFERENCES: 'reb_preferences',
        OPENAI_KEY: 'openai_api_key',
        CLAUDE_KEY: 'claude_api_key'
    },

    // Lesson Plan Template Structure
    LESSON_PLAN_TEMPLATE: {
        // Administrative Details
        administrativeDetails: {
            schoolName: '',
            teacherName: '',
            date: '',
            calendar: '',
            term: '',
            subject: '',
            class: '',
            classSize: '',
            duration: ''
        },

        // Unit & Lesson Information
        unitInfo: {
            unitNumber: '',
            unitTitle: '',
            keyCompetencies: '',
            numberOfLessons: '',
            duration: ''
        },

        // Lesson Details
        lessonInfo: {
            lessonNumber: '',
            lessonTitle: '',
            instructionalObjective: '',
            duration: ''
        },

        // Learning Outcomes
        learningOutcomes: {
            knowledge: [],
            skills: [],
            attitudes: []
        },

        // Generic Competencies
        genericCompetencies: [],

        // Cross-Cutting Issues
        crossCuttingIssues: [],

        // Teaching & Learning Resources
        resources: [],

        // Teaching & Learning Activities
        activities: {
            introduction: {
                teacher: '',
                learner: '',
                time: '',
                competencies: ''
            },
            development: {
                teacher: '',
                learner: '',
                time: '',
                competencies: ''
            },
            conclusion: {
                teacher: '',
                learner: '',
                time: '',
                competencies: ''
            }
        },

        // Assessment
        assessment: {
            formative: '',
            summative: '',
            methods: []
        },

        // Special Needs / Inclusive Education
        inclusiveEducation: {
            adaptations: '',
            supportStrategies: '',
            targetedNeeds: []
        },

        // Teacher Self-Evaluation
        reflection: {
            wellDone: '',
            improvements: '',
            nextLessonPlan: ''
        }
    },

    // Export Settings
    EXPORT: {
        FORMATS: ['PDF', 'Word', 'Google Docs'],
        PDF_PAGE_SIZE: 'A4',
        INCLUDE_LOGO: true,
        INCLUDE_FOOTER: true
    }
};

// ==================== Function to update API keys ====================
function setAPIKey(provider, key) {
    if (provider.toLowerCase() === 'openai') {
        APP_CONFIG.AI.OPENAI.apiKey = key;
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.OPENAI_KEY, key);
        APP_CONFIG.AI.ACTIVE_PROVIDER = 'openai';
    } else if (provider.toLowerCase() === 'claude') {
        APP_CONFIG.AI.CLAUDE.apiKey = key;
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.CLAUDE_KEY, key);
        APP_CONFIG.AI.ACTIVE_PROVIDER = 'claude';
    }
}

// ==================== Function to enable/disable demo mode ====================
function toggleDemoMode(enabled) {
    APP_CONFIG.AI.DEMO_MODE = enabled;
    localStorage.setItem('demo_mode', enabled);
}

console.log('%cREB Lesson Planner Configuration Loaded', 'color: #4CAF50; font-weight: bold; font-size: 14px;');
