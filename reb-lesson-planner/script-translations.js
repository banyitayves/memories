// ==================== Complete Multi-Language Translation System ====================

let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

const translations = {
    en: {
        // Header & Navigation
        appTitle: 'REB AI Lesson Plan Generator',
        appSubtitle: 'AI-Powered Lesson Planning System',
        logout: 'Logout',
        language: 'Language',
        demoMode: 'Demo Mode',
        
        // Auth
        login: 'Login',
        register: 'Register',
        demoAccess: 'Demo Access',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        teacherId: 'Teacher ID / School Code',
        fullName: 'Full Name',
        loginBtn: 'Login',
        registerBtn: 'Create Account',
        continueDemo: 'Continue as Demo User',
        
        // Sidebar Navigation
        sections: 'Sections',
        aiGenerateNav: 'AI Generate',
        lessonDetailsNav: 'Lesson Details',
        activitiesNav: 'Activities',
        assessmentNav: 'Assessment',
        resourcesNav: 'References',
        previewNav: 'Preview',
        libraryNav: 'My Lessons',
        adminNav: 'Admin',
        
        // Action Buttons
        savePlan: 'Save Plan',
        downloadPDF: 'PDF',
        downloadWord: 'Word',
        clearForm: 'Clear',
        
        // AI Generate Section
        aiGenerate: 'AI-Powered Lesson Generation',
        aiDescribe: 'Fill in the details and let AI generate a complete REB-compliant lesson plan for you!',
        apiSetupNotice: 'Need to use AI? Configure API Key or use Demo Mode',
        configureAPI: 'Configure API Key',
        
        // Grade & Subject Selection
        educationLevel: 'Education Level',
        selectLevel: 'Select Level...',
        primary: 'Primary (P1-P6)',
        secondary: 'Secondary (S1-S6)',
        grade: 'Grade/Class',
        selectGrade: 'Select Grade...',
        subject: 'Subject',
        selectSubject: 'Select Subject...',
        
        // Lesson Information
        lessonTitle: 'Lesson Title',
        enterLessonTitle: 'e.g., Introduction to Fractions',
        duration: 'Duration (minutes)',
        enterDuration: '45',
        schoolName: 'School Name',
        enterSchoolName: 'Your school name',
        teacherName: 'Teacher Name',
        enterTeacherName: 'Your name',
        classSize: 'Class Size',
        enterClassSize: '30',
        
        // Competencies & Objectives
        keyCompetence: 'Key Unit Competence (from REB Syllabus)',
        pasteCompetence: 'Paste the Key Unit Competence from the REB syllabus. This ensures AI alignment with official curriculum.',
        findCompetence: 'Find this in your REB subject syllabus document',
        
        learningObjective: 'Specific Learning Objective for this Lesson',
        enterObjective: 'What should learners be able to do after this lesson? (Use action verbs: Create, Analyze, Evaluate, etc.)',
        
        // Special Needs
        specialNeeds: 'Special Needs & Inclusive Education Considerations',
        specialNeedsDesc: 'The AI will provide specific adaptations and support strategies for learners with these needs.',
        visualImpairment: 'Visual Impairment',
        hearingImpairment: 'Hearing Impairment',
        physicalDisability: 'Physical Disability',
        learningDisabilities: 'Learning Disabilities',
        speechImpairment: 'Speech/Language Disorder',
        behavioralDisorders: 'Emotional/Behavioral',
        gifted: 'Gifted/Accelerated Learners',
        
        // AI Options
        aiOptions: 'AI Generation Options',
        includeActivities: 'Include Detailed Teaching & Learning Activities',
        includeAssessment: 'Include Assessment Methods & Rubrics',
        includeResources: 'Suggest Teaching & Learning Resources',
        includeReflection: 'Include Teacher Reflection Template',
        
        generateBtn: 'Generate Lesson Plan with AI',
        generating: 'Generating...',
        
        // Generated Plan
        generatedPlan: 'Generated Lesson Plan',
        useThisPlan: 'Use This Plan & Fill Form',
        closePlan: 'Close Preview',
        
        // Lesson Details Tab
        lessonDetailsSection: 'Lesson Plan Details',
        planForLessons: 'Plan for Lessons',
        lessonNum: 'Lesson #',
        topicTitle: 'Topic/Title',
        lessonTiming: 'Timing (minutes)',
        lessonResources: 'Resources',
        removeLesson: '✕',
        addLessonBtn: 'Add Lesson',
        
        genericCompetenciesLabel: 'Generic Competencies',
        crossCuttingIssuesLabel: 'Cross Cutting Issues',
        
        // Activities Tab
        activitiesSection: 'Teaching & Learning Activities (REB Format)',
        lessonDeliveryTimeline: 'Lesson Delivery Timeline & Activities',
        phase: 'Phase',
        teacherActivities: 'Teacher Activities (min)',
        learnerActivities: 'Learner Activities (min)',
        competenciesCol: 'Generic Competencies',
        
        introductionPhase: 'Introduction/Motivation',
        developmentPhase: 'Development of the Lesson',
        conclusionPhase: 'Conclusion/Wrap-up',
        
        whatTeacherDo: 'What will the teacher do?',
        howLearnerRespond: 'How will learners respond?',
        whichCompetencies: 'Which competencies?',
        
        // Assessment Tab
        assessmentSection: 'Assessment Methods',
        formativeAssessmentLabel: 'Formative Assessment Strategies',
        formativeDesc: 'How will you assess learners during the lesson?',
        
        summativeAssessmentLabel: 'Summative Assessment Activity',
        summativeDesc: 'What will learners do to demonstrate achievement?',
        
        assessmentMethodsLabel: 'Assessment Methods (Select All That Apply)',
        observation: 'Classroom Observation',
        questioning: 'Questioning & Discussion',
        writtenTests: 'Written Tests/Quizzes',
        practical: 'Practical Activities',
        projects: 'Projects/Assignments',
        groupWork: 'Group Work/Presentations',
        
        // Resources Tab
        resourcesSection: 'Teaching & Learning References',
        tlResources: 'Teaching & Learning Resources',
        resourcePlaceholder: 'Resource or material needed',
        addResourceBtn: 'Add Resource',
        removeResource: '✕',
        
        referencesLabel: 'References',
        referencePlaceholder: 'Author, Title, Pages/Chapter',
        addReferenceBtn: 'Add Reference',
        
        teacherSelfEval: 'Teacher Self-Evaluation',
        evalPlaceholder: 'What went well? What could be improved? How did learners respond?',
        
        inclusiveEducationLabel: 'Special Needs/Inclusive Education Notes',
        inclusiveEdPlaceholder: 'Adaptations for learners with special needs...',
        
        // Library
        librarySection: 'My Lesson Plans Library',
        libraryDesc: 'All your saved and generated lesson plans. Click to load, download, or delete.',
        searchPlaceholder: 'Search lesson plans...',
        emptyLibrary: 'No lesson plans yet.',
        noLessonsMsg: 'Generate your first AI lesson plan to get started!',
        
        // Preview
        previewSection: 'Preview Lesson Plan',
        previewPlaceholder: 'Fill in the form and click here to generate preview...',
        
        // Messages
        success: 'Success!',
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
        
        fillRequired: 'Please fill in all required fields (*)',
        lessonSaved: 'Lesson plan saved successfully!',
        lessonGenerated: 'Lesson plan generated successfully!',
        lessonAdded: 'Lesson added!',
        lessonRemoved: 'Lesson removed!',
        resourceAdded: 'Resource added!',
        resourceRemoved: 'Resource removed!',
        referenceAdded: 'Reference added!',
        referenceRemoved: 'Reference removed!',
        
        generatingLesson: 'Generating your REB-compliant lesson plan...',
        generatingError: 'Error generating lesson: ',
        downloadSuccess: 'Lesson plan downloaded successfully!',
        downloadError: 'Error downloading lesson plan.',
    },
    
    rw: {
        // Header & Navigation
        appTitle: 'REB AI - Guhanga Imipango y\'Amasomo',
        appSubtitle: 'Sisitemu y\'Ubwenge-Ifuzwa ho Guhanga Imipango y\'Amasomo',
        logout: 'Injira inyuma',
        language: 'Ururimi',
        demoMode: 'Ubwenge Demo',
        
        // Auth
        login: 'Injira',
        register: 'Iyandikishe',
        demoAccess: 'Iyandikishe Demo',
        email: 'Aderesi y\'Imeri',
        password: 'Ijambo ry\'ibanga',
        confirmPassword: 'Emeza Ijambo ry\'ibanga',
        teacherId: 'Nomero y\'Umwalimu / Code y\'Ishuri',
        fullName: 'Izina Ryose',
        loginBtn: 'Injira',
        registerBtn: 'Iyandikishe',
        continueDemo: 'Komeza nka Mwanamwali wa Demo',
        
        // Sidebar Navigation
        sections: 'Ibice',
        aiGenerateNav: 'AI Ihanga',
        lessonDetailsNav: 'Ibyifuzo byo Guhanga',
        activitiesNav: 'Ibikorwa',
        assessmentNav: 'Gusuzuma',
        resourcesNav: 'Ibijyanye',
        previewNav: 'Reba',
        libraryNav: 'Amasomo Yange',
        adminNav: 'Admin',
        
        // Action Buttons
        savePlan: 'Kubika Impango',
        downloadPDF: 'PDF',
        downloadWord: 'Word',
        clearForm: 'Kuvutsa',
        
        // AI Generate Section
        aiGenerate: 'Ihanga ry\'Amasomo Ifuzwa n\'ubwenge',
        aiDescribe: 'Jaza ibyifuzo maze AI ihange impango ryose y\'amasomo rwiyunge mu REB!',
        apiSetupNotice: 'Ukeneye gukoresha AI? Shyiramo API Key cyangwa gukoreshamo Demo Mode',
        configureAPI: 'Shyira API Key',
        
        // Grade & Subject Selection
        educationLevel: 'Icyiciro cy\'amashuri',
        selectLevel: 'Hitamo icyiciro...',
        primary: 'Abanza (P1-P6)',
        secondary: 'Yambere (S1-S6)',
        grade: 'Impyikino/Icyiciro',
        selectGrade: 'Hitamo impyikino...',
        subject: 'Isomo',
        selectSubject: 'Hitamo isomo...',
        
        // Lesson Information
        lessonTitle: 'Izina ry\'ikinini',
        enterLessonTitle: 'Urugero: Ibisanzwe bijyanye n\'Imibare',
        duration: 'Igihe (iminota)',
        enterDuration: '45',
        schoolName: 'Izina rya Shuri',
        enterSchoolName: 'Izina rya shuri ryawe',
        teacherName: 'Izina ry\'umwalimu',
        enterTeacherName: 'Izina ryawe',
        classSize: 'Ubwunzi bwa Cyigire',
        enterClassSize: '30',
        
        // Competencies & Objectives
        keyCompetence: 'Ubwenge Buna bwa Sehemu (kumva mu REB Syllabus)',
        pasteCompetence: 'Kopesha Ubwenge Buna bwa Sehemu kumva mu REB syllabus. Ibi bisuguza ko AI ihange ikinini cyifuzwa n\'umuryango w\'igihugu.',
        findCompetence: 'Shakira muri REB subject syllabus ijambo ryawe',
        
        learningObjective: 'Inzira Nyinshi y\'Ikigire mu Kinini',
        enterObjective: 'Ufiteyo byumva ku gihugu cyo kwigana icyo kinini? (Koreshamo ijambo risomeka: Gushiraho, Gusuzuma, Gufata ibyemezo, n\'ibindi)',
        
        // Special Needs
        specialNeeds: 'Ibyihariye by\'Abiga & Ibyo Kumatanya Abiga Bose',
        specialNeedsDesc: 'AI ihange inzira nyinshi n\'inzira zo gusobanukiranya abiga barimo n\'ibyihariye.',
        visualImpairment: 'Ihangayikire ry\'amaso',
        hearingImpairment: 'Ihangayikire ry\'amadifo',
        physicalDisability: 'Ikibazo cy\'imibiri',
        learningDisabilities: 'Ikibazo cy\'kwigana',
        speechImpairment: 'Ikibazo cy\'ikigezo',
        behavioralDisorders: 'Ikibazo cy\'imyitwarire',
        gifted: 'Abiga bafite ubwenge bwihutiriwe',
        
        // AI Options
        aiOptions: 'Ibyisano byo mu AI',
        includeActivities: 'Jyamo Ibikorwa by\'Amwalimu & Abiga',
        includeAssessment: 'Jyamo Inzira zo Gusuzuma & Intambwe',
        includeResources: 'Tema Ibijyanye by\'Amwalimu & Abiga',
        includeReflection: 'Jyamo Ubwenge bw\'Umwalimu',
        
        generateBtn: 'Ihange Impango y\'Amasomo Ifuzwa n\'AI',
        generating: 'Inze inzira...',
        
        // Generated Plan
        generatedPlan: 'Impango y\'Amasomo Ihambwe',
        useThisPlan: 'Koreshamo Impango Ijyamo Fatihe',
        closePlan: 'Funga Reba',
        
        // Lesson Details Tab
        lessonDetailsSection: 'Ibyifuzo byo Guhanga Amasomo',
        planForLessons: 'Panja Amasomo',
        lessonNum: 'Ikinini #',
        topicTitle: 'Umutwe/Insangano',
        lessonTiming: 'Igihe (iminota)',
        lessonResources: 'Ibijyanye',
        removeLesson: '✕',
        addLessonBtn: 'Ongeraho Ikinini',
        
        genericCompetenciesLabel: 'Ubwenge Bufatanye',
        crossCuttingIssuesLabel: 'Ibibazo biyoboye',
        
        // Activities Tab
        activitiesSection: 'Ibikorwa byo Kufundisha & Kwigana (REB Kubwenge)',
        lessonDeliveryTimeline: 'Icyerekezo cyo Guhabwa n\'Ibikorwa',
        phase: 'Icyiciro',
        teacherActivities: 'Ibikorwa by\'Umwalimu (iminota)',
        learnerActivities: 'Ibikorwa by\'Abiga (iminota)',
        competenciesCol: 'Ubwenge Bufatanye',
        
        introductionPhase: 'Gutangira/Kwiyereka',
        developmentPhase: 'Iterambere ry\'Ikinini',
        conclusionPhase: 'Gukomeza/Gukusanya',
        
        whatTeacherDo: 'Ese umwalimu azakora iki?',
        howLearnerRespond: 'Ese abiga bazayakubwira bite?',
        whichCompetencies: 'Ubwenge buwhe bwifuzwa?',
        
        // Assessment Tab
        assessmentSection: 'Inzira zo Gusuzuma',
        formativeAssessmentLabel: 'Inzira zo Gusuzuma mu Gihe cy\'Ikinini',
        formativeDesc: 'Ese uzasuzuma iki abiga mu gihe cy\'ikinini?',
        
        summativeAssessmentLabel: 'Ibikorwa by\'Irambaye byo Gusuzuma',
        summativeDesc: 'Ese abiga bazakora iki kugaragaza ko basom\'ikinini?',
        
        assessmentMethodsLabel: 'Inzira zo Gusuzuma (Hitamo Zose Zurambye)',
        observation: 'Kubona mu gihe cy\'ikinini',
        questioning: 'Kubuza & Gusobanura',
        writtenTests: 'Ibisanzwe Byanditswe/Ibisezerwa',
        practical: 'Ibikorwa by\'Imubumbe',
        projects: 'Imishinga/Imisezerwa',
        groupWork: 'Ibikorwa mu Mahiga/Kwerekana',
        
        // Resources Tab
        resourcesSection: 'Ibijyanye byo Kufundisha & Kwigana',
        tlResources: 'Ibijyanye by\'Amwalimu & Abiga',
        resourcePlaceholder: 'Ibijyanye cyangwa ibikoresho bifuzwa',
        addResourceBtn: 'Ongeraho Ibijyanye',
        removeResource: '✕',
        
        referencesLabel: 'Ibijyanye',
        referencePlaceholder: 'Uwanditse, Umutwe, Irangiro/Icyiciro',
        addReferenceBtn: 'Ongeraho Ibijyanye',
        
        teacherSelfEval: 'Kubwiyerekeye n\'Umwalimu',
        evalPlaceholder: 'Ese byakomeye? Ese hari ibibazo? Ese abiga babwiyerekeye bite?',
        
        inclusiveEducationLabel: 'Ibijyanye by\'Ibyihariye/Kumatanya Bose',
        inclusiveEdPlaceholder: 'Inzira zo gufatanya abiga barimo n\'ibyihariye...',
        
        // Library
        librarySection: 'Igikumi cy\'Amasomo Yange',
        libraryDesc: 'Amasomo yose yajibwemo cyangwa ahambwe na AI. Hitamo kugurisha, gukungurikira, cyangwa gukuraho.',
        searchPlaceholder: 'Shakira amasomo...',
        emptyLibrary: 'Nta masomo yamakuru.',
        noLessonsMsg: 'Ihange ikinini cy\'AI kugira ngo ugere kuri ino!',
        
        // Preview
        previewSection: 'Reba Impango y\'Amasomo',
        previewPlaceholder: 'Jyamo fatihe maze icyerekezo kigere...',
        
        // Messages
        success: 'Byakomeye!',
        error: 'Ikibazo',
        warning: 'Ikirangirire',
        info: 'Iyandike',
        
        fillRequired: 'Jyamo ibice byose bifuzwa (*)',
        lessonSaved: 'Impango y\'amasomo yajibwemo neza!',
        lessonGenerated: 'Impango y\'amasomo ihambwe neza!',
        lessonAdded: 'Ikinini kongeraho!',
        lessonRemoved: 'Ikinini gukuraho!',
        resourceAdded: 'Ibijyanye kongeraho!',
        resourceRemoved: 'Ibijyanye gukuraho!',
        referenceAdded: 'Ibijyanye kongeraho!',
        referenceRemoved: 'Ibijyanye gukuraho!',
        
        generatingLesson: 'Ihange impango nyinshi y\'amasomo ifuzwa n\'ubwenge...',
        generatingError: 'Ikibazo mu guhanga: ',
        downloadSuccess: 'Impango y\'amasomo yagenewe neza!',
        downloadError: 'Ikibazo mu kugukungurikira impango.',
    },
    
    fr: {
        // Header & Navigation
        appTitle: 'Générateur de Plan de Cours IA REB',
        appSubtitle: 'Système de Planification de Cours Alimenté par IA',
        logout: 'Déconnexion',
        language: 'Langue',
        demoMode: 'Mode Démo',
        
        // Auth
        login: 'Connexion',
        register: 'S\'inscrire',
        demoAccess: 'Accès Démo',
        email: 'Adresse E-mail',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        teacherId: 'ID Enseignant / Code d\'école',
        fullName: 'Nom Complet',
        loginBtn: 'Se Connecter',
        registerBtn: 'Créer un Compte',
        continueDemo: 'Continuer en tant qu\'utilisateur de démonstration',
        
        // Sidebar Navigation
        sections: 'Sections',
        aiGenerateNav: 'Générer avec IA',
        lessonDetailsNav: 'Détails de la Leçon',
        activitiesNav: 'Activités',
        assessmentNav: 'Évaluation',
        resourcesNav: 'Ressources',
        previewNav: 'Aperçu',
        libraryNav: 'Mes Leçons',
        adminNav: 'Administration',
        
        // Action Buttons
        savePlan: 'Enregistrer le Plan',
        downloadPDF: 'PDF',
        downloadWord: 'Word',
        clearForm: 'Effacer',
        
        // AI Generate Section
        aiGenerate: 'Génération de Plan de Cours Alimentée par IA',
        aiDescribe: 'Remplissez les détails et laissez l\'IA générer un plan de cours conforme à REB!',
        apiSetupNotice: 'Besoin d\'utiliser l\'IA? Configurez la Clé API ou utilisez le Mode Démo',
        configureAPI: 'Configurer la Clé API',
        
        // Grade & Subject Selection
        educationLevel: 'Niveau d\'Éducation',
        selectLevel: 'Sélectionner un niveau...',
        primary: 'Primaire (P1-P6)',
        secondary: 'Secondaire (S1-S6)',
        grade: 'Classe/Niveau',
        selectGrade: 'Sélectionner une classe...',
        subject: 'Matière',
        selectSubject: 'Sélectionner une matière...',
        
        // Lesson Information
        lessonTitle: 'Titre de la Leçon',
        enterLessonTitle: 'Ex: Introduction aux Fractions',
        duration: 'Durée (minutes)',
        enterDuration: '45',
        schoolName: 'Nom de l\'École',
        enterSchoolName: 'Le nom de votre école',
        teacherName: 'Nom de l\'Enseignant',
        enterTeacherName: 'Votre nom',
        classSize: 'Effectif de la Classe',
        enterClassSize: '30',
        
        // Competencies & Objectives
        keyCompetence: 'Compétence Clé de l\'Unité (du Syllabus REB)',
        pasteCompetence: 'Collez la Compétence Clé de l\'Unité du syllabus REB. Cela garantit l\'alignement IA avec le curriculum officiel.',
        findCompetence: 'Trouvez ceci dans votre document syllabus de la matière REB',
        
        learningObjective: 'Objectif d\'Apprentissage Spécifique pour cette Leçon',
        enterObjective: 'Que devraient pouvoir faire les apprenants après cette leçon? (Utilisez des verbes d\'action: Créer, Analyser, Évaluer, etc.)',
        
        // Special Needs
        specialNeeds: 'Besoins Spéciaux et Considérations d\'Éducation Inclusive',
        specialNeedsDesc: 'L\'IA fournira des adaptations spécifiques et des stratégies de soutien pour les apprenants ayant ces besoins.',
        visualImpairment: 'Déficience Visuelle',
        hearingImpairment: 'Déficience Auditive',
        physicalDisability: 'Handicap Physique',
        learningDisabilities: 'Troubles d\'Apprentissage',
        speechImpairment: 'Trouble du Langage/Parole',
        behavioralDisorders: 'Troubles Comportementaux/Émotionnels',
        gifted: 'Apprenants Doués/Accélérés',
        
        // AI Options
        aiOptions: 'Options de Génération IA',
        includeActivities: 'Inclure les Activités d\'Enseignement et d\'Apprentissage',
        includeAssessment: 'Inclure les Méthodes d\'Évaluation et Rubriques',
        includeResources: 'Suggérer les Ressources d\'Enseignement et d\'Apprentissage',
        includeReflection: 'Inclure le Modèle d\'Auto-Évaluation de l\'Enseignant',
        
        generateBtn: 'Générer le Plan de Cours avec IA',
        generating: 'Génération en cours...',
        
        // Generated Plan
        generatedPlan: 'Plan de Cours Généré',
        useThisPlan: 'Utiliser ce Plan et Remplir le Formulaire',
        closePlan: 'Fermer l\'Aperçu',
        
        // Lesson Details Tab
        lessonDetailsSection: 'Détails du Plan de Cours',
        planForLessons: 'Plan pour les Leçons',
        lessonNum: 'Leçon #',
        topicTitle: 'Titre/Sujet',
        lessonTiming: 'Durée (minutes)',
        lessonResources: 'Ressources',
        removeLesson: '✕',
        addLessonBtn: 'Ajouter une Leçon',
        
        genericCompetenciesLabel: 'Compétences Génériques',
        crossCuttingIssuesLabel: 'Problèmes Transversaux',
        
        // Activities Tab
        activitiesSection: 'Activités d\'Enseignement et d\'Apprentissage (Format REB)',
        lessonDeliveryTimeline: 'Chronologie et Activités de la Leçon',
        phase: 'Phase',
        teacherActivities: 'Activités de l\'Enseignant (min)',
        learnerActivities: 'Activités de l\'Apprenant (min)',
        competenciesCol: 'Compétences Génériques',
        
        introductionPhase: 'Introduction/Motivation',
        developmentPhase: 'Développement de la Leçon',
        conclusionPhase: 'Conclusion/Récapitulatif',
        
        whatTeacherDo: 'Que va faire l\'enseignant?',
        howLearnerRespond: 'Comment les apprenants vont-ils réagir?',
        whichCompetencies: 'Quelles compétences?',
        
        // Assessment Tab
        assessmentSection: 'Méthodes d\'Évaluation',
        formativeAssessmentLabel: 'Stratégies d\'Évaluation Formative',
        formativeDesc: 'Comment allez-vous évaluer les apprenants pendant la leçon?',
        
        summativeAssessmentLabel: 'Activité d\'Évaluation Sommative',
        summativeDesc: 'Que feront les apprenants pour démontrer leurs apprentissages?',
        
        assessmentMethodsLabel: 'Méthodes d\'Évaluation (Sélectionner Toutes les Applicables)',
        observation: 'Observation en Classe',
        questioning: 'Questionnement et Discussion',
        writtenTests: 'Tests/Quiz Écrits',
        practical: 'Activités Pratiques',
        projects: 'Projets/Assignments',
        groupWork: 'Travail de Groupe/Présentations',
        
        // Resources Tab
        resourcesSection: 'Références d\'Enseignement et d\'Apprentissage',
        tlResources: 'Ressources d\'Enseignement et d\'Apprentissage',
        resourcePlaceholder: 'Ressource ou matériel nécessaire',
        addResourceBtn: 'Ajouter une Ressource',
        removeResource: '✕',
        
        referencesLabel: 'Références',
        referencePlaceholder: 'Auteur, Titre, Pages/Chapitre',
        addReferenceBtn: 'Ajouter une Référence',
        
        teacherSelfEval: 'Auto-Évaluation de l\'Enseignant',
        evalPlaceholder: 'Qu\'est-ce qui s\'est bien passé? Qu\'est-ce qui pourrait être amélioré? Comment les apprenants ont-ils réagi?',
        
        inclusiveEducationLabel: 'Notes sur les Besoins Spéciaux/Éducation Inclusive',
        inclusiveEdPlaceholder: 'Adaptations pour les apprenants ayant des besoins spéciaux...',
        
        // Library
        librarySection: 'Ma Bibliothèque de Plans de Cours',
        libraryDesc: 'Tous vos plans de cours sauvegardés et générés. Cliquez pour charger, télécharger ou supprimer.',
        searchPlaceholder: 'Rechercher des plans de cours...',
        emptyLibrary: 'Aucun plan de cours pour le moment.',
        noLessonsMsg: 'Générez votre premier plan de cours IA pour commencer!',
        
        // Preview
        previewSection: 'Aperçu du Plan de Cours',
        previewPlaceholder: 'Remplissez le formulaire et cliquez ici pour générer l\'aperçu...',
        
        // Messages
        success: 'Succès!',
        error: 'Erreur',
        warning: 'Avertissement',
        info: 'Info',
        
        fillRequired: 'Veuillez remplir tous les champs obligatoires (*)',
        lessonSaved: 'Plan de cours enregistré avec succès!',
        lessonGenerated: 'Plan de cours généré avec succès!',
        lessonAdded: 'Leçon ajoutée!',
        lessonRemoved: 'Leçon supprimée!',
        resourceAdded: 'Ressource ajoutée!',
        resourceRemoved: 'Ressource supprimée!',
        referenceAdded: 'Référence ajoutée!',
        referenceRemoved: 'Référence supprimée!',
        
        generatingLesson: 'Génération de votre plan de cours conforme à REB...',
        generatingError: 'Erreur lors de la génération: ',
        downloadSuccess: 'Plan de cours téléchargé avec succès!',
        downloadError: 'Erreur lors du téléchargement du plan de cours.',
    },
    
    sw: {
        // Header & Navigation
        appTitle: 'Jenereta ya Mpango wa Somo wa AI ya REB',
        appSubtitle: 'Mfumo wa Kupanga Somo na Msaada wa AI',
        logout: 'Toka nje',
        language: 'Lugha',
        demoMode: 'Njia ya Kucheza',
        
        // Auth
        login: 'Ingia',
        register: 'Jiandikishe',
        demoAccess: 'Kufikia Kucheza',
        email: 'Anwani ya Barua Pepe',
        password: 'Neno la Siri',
        confirmPassword: 'Thibitisha Neno la Siri',
        teacherId: 'Kitambulisho cha Mwalimu / Nambari ya Shule',
        fullName: 'Jina Kamili',
        loginBtn: 'Ingia',
        registerBtn: 'Tengeneza Akaunti',
        continueDemo: 'Endelea kama Mtumiaji wa Kucheza',
        
        // Sidebar Navigation
        sections: 'Sehemu',
        aiGenerateNav: 'AI Tengeneza',
        lessonDetailsNav: 'Maelezo ya Somo',
        activitiesNav: 'Shughuli',
        assessmentNav: 'Tathmini',
        resourcesNav: 'Rasilimali',
        previewNav: 'Angalia',
        libraryNav: 'Masomeni Yangu',
        adminNav: 'Msimamizi',
        
        // Action Buttons
        savePlan: 'Hifadhi Mpango',
        downloadPDF: 'PDF',
        downloadWord: 'Word',
        clearForm: 'Futa',
        
        // AI Generate Section
        aiGenerate: 'Kuzalisha Mpango wa Somo kwa Msaada wa AI',
        aiDescribe: 'Jaza maelezo na AI itazalisha mpango kamili wa somo unaofuata REB!',
        apiSetupNotice: 'Je unahitaji kutumia AI? Sanidi Kibonyo cha API au tumia Njia ya Kucheza',
        configureAPI: 'Sanidi Kibonyo cha API',
        
        // Grade & Subject Selection
        educationLevel: 'Kiwango cha Elimu',
        selectLevel: 'Chagua kiwango...',
        primary: 'Msingi (P1-P6)',
        secondary: 'Sekondari (S1-S6)',
        grade: 'Darasa/Kiwango',
        selectGrade: 'Chagua darasa...',
        subject: 'Somo',
        selectSubject: 'Chagua somo...',
        
        // Lesson Information
        lessonTitle: 'Kichwa cha Somo',
        enterLessonTitle: 'Mfano: Utangulizi wa Sehemu',
        duration: 'Muda (dakika)',
        enterDuration: '45',
        schoolName: 'Jina la Shule',
        enterSchoolName: 'Jina la shule yako',
        teacherName: 'Jina la Mwalimu',
        enterTeacherName: 'Jina lako',
        classSize: 'Idadi ya Wanafunzi',
        enterClassSize: '30',
        
        // Competencies & Objectives
        keyCompetence: 'Ubugumu Muhimu wa Sehemu (kutoka kwa REB Syllabus)',
        pasteCompetence: 'Nakili Ubugumu Muhimu wa Sehemu kutoka kwa syllabus ya REB. Hii inahakikisha kuwa AI inatuzalisha somo kwa mujibu wa mtaala rasmi.',
        findCompetence: 'Pata hii katika hati ya REB ya mtaala wa somo lako',
        
        learningObjective: 'Lengo Mahususi la Kujifunza kwa Somo hili',
        enterObjective: 'Nini wanatakiwa wanafunzi waweze kufanya baada ya somo hili? (Tumia vitenzi vya hatua: Tengeneza, Changanua, Tathmini, nk)',
        
        // Special Needs
        specialNeeds: 'Mahitaji Maalum na Utoaji wa Huduma ya Kielimu kwa Wote',
        specialNeedsDesc: 'AI itabidisha njia maalum na mikakati ya msaada kwa wanafunzi wenye mahitaji haya.',
        visualImpairment: 'Upungufu wa Macho',
        hearingImpairment: 'Upungufu wa Sikio',
        physicalDisability: 'Kilema cha Kimwili',
        learningDisabilities: 'Matatizo ya Kujifunza',
        speechImpairment: 'Matatizo ya Hotuba',
        behavioralDisorders: 'Matatizo ya Tabia',
        gifted: 'Wanafunzi Wenye Talanta',
        
        // AI Options
        aiOptions: 'Chaguzi za Kuzalisha kwa AI',
        includeActivities: 'Jumuisha Shughuli Mahususi za Kufundisha na Kujifunza',
        includeAssessment: 'Jumuisha Njia za Tathmini na Kiwango',
        includeResources: 'Pendekeza Rasilimali za Kufundisha na Kujifunza',
        includeReflection: 'Jumuisha Muundo wa Kujitathmini kwa Mwalimu',
        
        generateBtn: 'Zalisha Mpango wa Somo kwa Msaada wa AI',
        generating: 'Inazalisha...',
        
        // Generated Plan
        generatedPlan: 'Mpango wa Somo Uzalishwacho',
        useThisPlan: 'Tumia Mpango huu & Jaza Fomu',
        closePlan: 'Funga Angalia',
        
        // Lesson Details Tab
        lessonDetailsSection: 'Maelezo ya Mpango wa Somo',
        planForLessons: 'Panga Masomo',
        lessonNum: 'Somo #',
        topicTitle: 'Kichwa/Mada',
        lessonTiming: 'Muda (dakika)',
        lessonResources: 'Rasilimali',
        removeLesson: '✕',
        addLessonBtn: 'Ongeza Somo',
        
        genericCompetenciesLabel: 'Ubugumu wa Kawaida',
        crossCuttingIssuesLabel: 'Masuala Yamjinga',
        
        // Activities Tab
        activitiesSection: 'Shughuli za Kufundisha na Kujifunza (Muundo wa REB)',
        lessonDeliveryTimeline: 'Wakati na Shughuli za Somo',
        phase: 'Sehemu',
        teacherActivities: 'Shughuli za Mwalimu (dakika)',
        learnerActivities: 'Shughuli za Mwanafunzi (dakika)',
        competenciesCol: 'Ubugumu wa Kawaida',
        
        introductionPhase: 'Utangulizi/Motisha',
        developmentPhase: 'Maendeleo ya Somo',
        conclusionPhase: 'Kumalizia/Muhtasari',
        
        whatTeacherDo: 'Mwalimu atafanya nini?',
        howLearnerRespond: 'Wanafunzi watajibu vipi?',
        whichCompetencies: 'Ubugumu upi?',
        
        // Assessment Tab
        assessmentSection: 'Njia za Tathmini',
        formativeAssessmentLabel: 'Mikakati ya Tathmini Inayoendelea',
        formativeDesc: 'Je utatathmini vipi wanafunzi wakati wa somo?',
        
        summativeAssessmentLabel: 'Shughuli ya Tathmini ya Kumalizia',
        summativeDesc: 'Je wanafunzi watafanya nini kuthibitisha wamefundishwa?',
        
        assessmentMethodsLabel: 'Njia za Tathmini (Chagua Zote Zinazotumika)',
        observation: 'Uchunguzi katika Darasani',
        questioning: 'Kuuliza Swali na Mijadala',
        writtenTests: 'Mtihani Uliojandilishwa/Jaribio',
        practical: 'Shughuli za Vitendo',
        projects: 'Miradi/Kazi za Nyumbani',
        groupWork: 'Kazi ya Kikundi/Kuwasilisha',
        
        // Resources Tab
        resourcesSection: 'Marejeo ya Kufundisha na Kujifunza',
        tlResources: 'Rasilimali za Kufundisha na Kujifunza',
        resourcePlaceholder: 'Rasilimali au nyenzo inayohitajika',
        addResourceBtn: 'Ongeza Rasilimali',
        removeResource: '✕',
        
        referencesLabel: 'Marejeo',
        referencePlaceholder: 'Mpenzi, Kichwa, Ukurasa/Sura',
        addReferenceBtn: 'Ongeza Marejeleo',
        
        teacherSelfEval: 'Kujitathmini kwa Mwalimu',
        evalPlaceholder: 'Nini kiliendana vizuri? Nini kinachoweza kuboreswa? Wanafunzi walijibu vipi?',
        
        inclusiveEducationLabel: 'Maelezo ya Mahitaji Maalum/Kielimu kwa Wote',
        inclusiveEdPlaceholder: 'Mabadiliko kwa wanafunzi wenye mahitaji maalum...',
        
        // Library
        librarySection: 'Maktaba Yangu ya Masomo',
        libraryDesc: 'Masomo yote yaliyohifadhiwa na yaliyozalishwa. Bonyeza kuandika, kupakmia, au kufuta.',
        searchPlaceholder: 'Tafuta masomo...',
        emptyLibrary: 'Hamna masomo kwa sasa.',
        noLessonsMsg: 'Zalisha somo lako la kwanza la AI kuanza!',
        
        // Preview
        previewSection: 'Angalia Mpango wa Somo',
        previewPlaceholder: 'Jaza fomu na bonyeza hapa ili kuzalisha angalia...',
        
        // Messages
        success: 'Mafanikio!',
        error: 'Hitilafu',
        warning: 'Onyo',
        info: 'Habari',
        
        fillRequired: 'Tafadhali jaza sehemu zote zinazohitajika (*)',
        lessonSaved: 'Mpango wa somo umehifadhiwa kwa mafanikio!',
        lessonGenerated: 'Mpango wa somo umezalishwa kwa mafanikio!',
        lessonAdded: 'Somo limeongezwa!',
        lessonRemoved: 'Somo limefutwa!',
        resourceAdded: 'Rasilimali imeongezwa!',
        resourceRemoved: 'Rasilimali imefutwa!',
        referenceAdded: 'Marejeleo yameongezwa!',
        referenceRemoved: 'Marejeleo yamefutwa!',
        
        generatingLesson: 'Inazalisha mpango wako wa somo kwa mujibu wa REB...',
        generatingError: 'Hitilafu wakati wa kuzalisha: ',
        downloadSuccess: 'Mpango wa somo umoletea kwa mafanikio!',
        downloadError: 'Hitilafu wakati wa kupakmia mpango wa somo.',
        unitTitle: 'Titre de l\'Unité',
        keyCompetencies: 'Compétences Clés de l\'Unité',
        numberOfLessons: 'Nombre de Leçons',
        instructionalObjective: 'Objectif d\'Enseignement',
        planLessons: 'Planifier les Leçons',
        lessonNum: 'Leçon #',
        topicTitle: 'Titre/Sujet',
        timing: 'Durée (minutes)',
        resources: 'Ressources',
        addLesson: 'Ajouter une Leçon',
        genericCompetencies: 'Compétences Génériques et Problèmes Transversaux',
        crossCutting: 'Problèmes Transversaux',
        lessonDelivery: 'Calendrier et Activités de Distribution',
        phase: 'Phase',
        teacherActivities: 'Activités de l\'Enseignant (min)',
        learnerActivities: 'Activités de l\'Apprenant (min)',
        competencies: 'Compétences Génériques',
        introduction: 'Introduction/Motivation',
        development: 'Développement de la Leçon',
        conclusion: 'Conclusion/Résumé',
        assessmentMethods: 'Méthodes d\'Évaluation',
        formativeAssessment: 'Stratégies d\'Évaluation Formative',
        summativeAssessment: 'Activité d\'Évaluation Sommative',
        observation: 'Observation de l\'Académie',
        questioning: 'Questions et Discussion',
        writtenTests: 'Tests/Quiz Écrits',
        practical: 'Activités Pratiques',
        projects: 'Projets/Devoirs',
        groupWork: 'Travail de Groupe/Présentations',
        teachingReferences: 'Références d\'Enseignement et d\'Apprentissage',
        references: 'Références (Manuels et Documents du Curriculum)',
        referencesSection: 'Références',
        addResource: 'Ajouter une Ressource',
        addReference: 'Ajouter une Référence',
        teacherEvaluation: 'Auto-Évaluation de l\'Enseignant',
        specialNeeds: 'Notes sur les Besoins Spéciaux/Éducation Inclusive',
        previewLesson: 'Aperçu du Plan de Cours',
        fillAndPreview: 'Remplissez le formulaire et cliquez ici pour générer un aperçu...',
        admin: 'Panneau d\'Administration'
    },
    rw: {
        sections: 'Ingingo',
        aiGenerate: 'Kubyara Ibisasi by\'Amashuri Ukoresha AI',
        aiDescribe: 'Uzuza ibyinformasi bike maze AI itakubyara ibisasi kompletike by\'amashuri!',
        lessonTitle: 'Umutwe w\'Isomo',
        subject: 'Isomo',
        class: 'Icyiciro/Urwego',
        duration: 'Igihe (iminota)',
        classSize: 'Umubare w\'Abanyeshuri',
        learningObjective: 'Intego y\'Kwigira',
        aiOptions: 'Ibigaragambire by\'AI',
        includeActivities: 'Gumemukabyara Igikorwa cy\'Imfundikazi',
        includeAssessment: 'Gumemukabyara Inzira z\'Ipimishaji',
        includeResources: 'Tanga Inzira za Serivise',
        generateBtn: 'Byara Ibisasi by\'Isomo',
        generating: 'Byarwaho ibisasi byacu by\'isomo...',
        generatedPlan: 'Ibisasi by\'Isomo Byabyawe',
        basicInfo: 'Iyambere Amakuru (Imiterere ya REB)',
        schoolName: 'Izina ry\'Ishuri',
        teacherName: 'Izina ry\'Umfundikazi',
        date: 'UbwiBahe',
        unitNumber: 'Umubare w\'Igice',
        unitDetails: 'Ibyinformasi by\'Igice',
        lessonDetails: 'Ibyinformasi by\'Ibisasi by\'Isomo',
        senNeeds: 'Ubwoko bwa Serivise za Kwirukirana (SEN)',
        unitTitle: 'Umutwe w\'Igice',
        keyCompetencies: 'Iyobozi Ibigize Igice',
        numberOfLessons: 'Umubare w\'Amasomo',
        instructionalObjective: 'Intego y\'Imfundikazi',
        planLessons: 'Hasira Amasomo',
        lessonNum: 'Isomo #',
        topicTitle: 'Umutwe/Ingingo',
        timing: 'Igihe (iminota)',
        resources: 'Inzira',
        addLesson: 'Yongera Isomo',
        genericCompetencies: 'Ubugisha Bumvikane n\'Ikibazo Kiyambura',
        crossCutting: 'Ikibazo Kiyambura',
        lessonDelivery: 'Igenekerezo ry\'Igihe n\'Igikorwa',
        phase: 'Icyiciro',
        teacherActivities: 'Igikorwa cya Mfundikazi (iminota)',
        learnerActivities: 'Igikorwa cy\'Umwigire (iminota)',
        competencies: 'Ubugisha Bumvikane',
        introduction: 'Ubwiyunge/Ubushwebi',
        development: 'Gaturuka ry\'Isomo',
        conclusion: 'Intsinzi/Imigambi',
        assessmentMethods: 'Inzira z\'Ipimishaji',
        formativeAssessment: 'Inzira z\'Ipimishaji Mu Gihe cy\'Isomo',
        summativeAssessment: 'Igikorwa cy\'Ipimishaji mu Rihire',
        observation: 'Gukuramo Kwishuri',
        questioning: 'Kubuza n\'Gusobanura',
        writtenTests: 'Iteste/Quiz y\'Ikinyamakuru',
        practical: 'Igikorwa cy\'Ukuri',
        projects: 'Sisitemu/Yishyiramo',
        groupWork: 'Akazi k\'Itsinda/Kwigaragambira',
        teachingReferences: 'Amenya Imfundikazi n\'Kwigira',
        references: 'Amenya (Ibitabo n\'Dokumentimasangano)',
        referencesSection: 'Amenya',
        addResource: 'Yongera Inzira',
        addReference: 'Yongera Amenya',
        teacherEvaluation: 'Ipimishaji ry\'Umfundikazi ku w\'Ubwakire',
        specialNeeds: 'Inyandiko z\'Serivise za Kwirukirana/Imyigire Yambuka',
        previewLesson: 'Reba Ibisasi by\'Isomo',
        fillAndPreview: 'Uzuza fomu hanyuma ubike hano kugira ingiro...',
        admin: 'Ubwenge bw\'Ibigize'
    }
};

// Current language
let currentLanguage = localStorage.getItem('reb_language') || 'en';

// Change language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('reb_language', lang);
    updateUILanguage();
    showToast(`✅ Language changed to ${lang === 'en' ? 'English' : lang === 'sw' ? 'Kiswahili' : lang === 'fr' ? 'Français' : 'Kinyarwanda'}`, 'success');
    }
};

// Function to get translation
function t(key) {
    const lang = currentLanguage || 'en';
    return translations[lang]?.[key] || translations['en']?.[key] || key;
}

// Function to change language - Updates ALL system elements
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        el.textContent = t(key);
    });
    
    // Update form placeholders
    document.querySelectorAll('[data-placeholder]').forEach(el => {
        const key = el.getAttribute('data-placeholder');
        el.placeholder = t(key);
    });
    
    // Trigger UI refresh
    if (typeof updateUILanguage === 'function') {
        updateUILanguage();
    }
    
    // Update language selector dropdown
    const langSelect = document.getElementById('languageSelect');
    if (langSelect) {
        langSelect.value = lang;
    }
    
    // Update direction for any RTL languages (if needed in future)
    document.documentElement.lang = lang;
    
    // Show confirmation
    showToast(t('success'), 'Language updated to ' + lang.toUpperCase(), 'info');
}

// Update UI language on demand
function updateUILanguage() {
    const translationMap = translations[currentLanguage] || translations['en'];
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translationMap[key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translationMap[key];
            } else {
                element.textContent = translationMap[key];
            }
        }
    });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
        languageSelect.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
    updateUILanguage();
});

console.log(`%cTranslation System Loaded - Current Language: ${currentLanguage}`, 'color: #4CAF50; font-weight: bold;');
