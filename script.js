// Quiz Game JavaScript - Enhanced UI Version

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    quiz: document.getElementById('quiz-screen'),
    results: document.getElementById('results-screen')
};

const elements = {
    // Welcome screen
    startBtn: document.getElementById('start-btn'),
    categoryCards: document.querySelectorAll('.category-card'),
    timerSelect: document.getElementById('timer'),
    difficultySelect: document.getElementById('difficulty'),
    highScoreValue: document.getElementById('high-score-value'),
    
    // Quiz screen
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    submitQuizBtn: document.getElementById('submit-quiz-btn'),
    questionText: document.getElementById('question-text'),
    optionsContainer: document.getElementById('options-container'),
    fillInContainer: document.getElementById('fill-in-container'),
    fillInAnswer: document.getElementById('fill-in-answer'),
    submitFillAnswer: document.getElementById('submit-fill-answer'),
    progressText: document.getElementById('progress-text'),
    progressFill: document.getElementById('progress-fill'),
    progressPercent: document.getElementById('progress-percent'),
    timerDisplay: document.getElementById('timer-display'),
    currentScore: document.getElementById('current-score'),
    questionType: document.getElementById('question-type'),
    questionDifficulty: document.getElementById('question-difficulty'),
    feedbackMessage: document.getElementById('feedback-message'),
    questionIndicators: document.getElementById('question-indicators'),
    questionPoints: document.getElementById('question-points'),
    quizCategory: document.getElementById('quiz-category'),
    
    // Results screen
    restartBtn: document.getElementById('restart-btn'),
    reviewBtn: document.getElementById('review-btn'),
    newCategoryBtn: document.getElementById('new-category-btn'),
    correctCount: document.getElementById('correct-count'),
    incorrectCount: document.getElementById('incorrect-count'),
    totalScore: document.getElementById('total-score'),
    scorePercentage: document.getElementById('score-percentage'),
    scoreCircle: document.getElementById('score-circle'),
    newHighScore: document.getElementById('new-high-score'),
    highScoreUpdate: document.getElementById('high-score-update'),
    accuracyValue: document.getElementById('accuracy-value'),
    accuracyFill: document.getElementById('accuracy-fill'),
    speedValue: document.getElementById('speed-value'),
    speedFill: document.getElementById('speed-fill'),
    difficultyLevel: document.getElementById('difficulty-level'),
    difficultyTag: document.getElementById('difficulty-tag'),
    maxScore: document.getElementById('max-score'),
    totalQuestions: document.getElementById('total-questions'),
    scoreGrade: document.getElementById('score-grade')
};

// Audio elements
const sounds = {
    correct: document.getElementById('correct-sound'),
    incorrect: document.getElementById('incorrect-sound'),
    click: document.getElementById('click-sound'),
    complete: document.getElementById('complete-sound')
};

// Quiz State Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer;
let timeLeft;
let quizQuestions = [];
let selectedCategory = 'all';
let selectedDifficulty = 'medium';
let timerPerQuestion = 45;
let totalTimeUsed = 0;
let startTime = 0;
let quizStartTime = 0;
let questionStartTime = 0;

// Expanded Questions Database (Same as before, but enhanced for UI)
const questionsDatabase = [
    // ========== EASY QUESTIONS (5) ==========
    // Science - Easy
    {
        id: 1,
        category: 'science',
        type: 'single',
        difficulty: 'easy',
        question: 'What is the chemical symbol for water?',
        options: ['H₂O', 'CO₂', 'NaCl', 'O₂'],
        correctAnswer: ['H₂O'],
        points: 10,
        explanation: 'Water is composed of two hydrogen atoms and one oxygen atom, hence H₂O.'
    },
    {
        id: 2,
        category: 'science',
        type: 'single',
        difficulty: 'easy',
        question: 'Which planet is known as the Red Planet?',
        options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
        correctAnswer: ['Mars'],
        points: 10,
        explanation: 'Mars appears red due to iron oxide (rust) on its surface.'
    },
    // History - Easy
    {
        id: 3,
        category: 'history',
        type: 'single',
        difficulty: 'easy',
        question: 'Who was the first president of the United States?',
        options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'],
        correctAnswer: ['George Washington'],
        points: 10,
        explanation: 'George Washington served as the first U.S. president from 1789 to 1797.'
    },
    {
        id: 4,
        category: 'history',
        type: 'single',
        difficulty: 'easy',
        question: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: ['1945'],
        points: 10,
        explanation: 'World War II ended in 1945 with the surrender of Germany and Japan.'
    },
    // Technology - Easy
    {
        id: 5,
        category: 'tech',
        type: 'single',
        difficulty: 'easy',
        question: 'What does "HTML" stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctAnswer: ['Hyper Text Markup Language'],
        points: 10,
        explanation: 'HTML is the standard markup language for documents designed to be displayed in a web browser.'
    },
    // Mathematics - Easy
    {
        id: 6,
        category: 'math',
        type: 'single',
        difficulty: 'easy',
        question: 'What is 5 + 7?',
        options: ['10', '11', '12', '13'],
        correctAnswer: ['12'],
        points: 10,
        explanation: 'Basic arithmetic: 5 + 7 equals 12.'
    },
    // General Knowledge - Easy
    {
        id: 7,
        category: 'general',
        type: 'single',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: ['Paris'],
        points: 10,
        explanation: 'Paris is the capital and most populous city of France.'
    },
    
    // ========== MEDIUM QUESTIONS (10) ==========
    // Science - Medium
    {
        id: 8,
        category: 'science',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of the following are noble gases?',
        options: ['Helium', 'Oxygen', 'Neon', 'Carbon'],
        correctAnswer: ['Helium', 'Neon'],
        points: 15,
        explanation: 'Noble gases are helium, neon, argon, krypton, xenon, and radon.'
    },
    {
        id: 9,
        category: 'science',
        type: 'fill',
        difficulty: 'medium',
        question: 'What is the powerhouse of the cell?',
        correctAnswer: ['mitochondria', 'mitochondrion'],
        points: 15,
        explanation: 'Mitochondria are organelles that generate most of the cell\'s supply of ATP, used as a source of chemical energy.'
    },
    {
        id: 10,
        category: 'science',
        type: 'single',
        difficulty: 'medium',
        question: 'What is the atomic number of carbon?',
        options: ['6', '8', '12', '14'],
        correctAnswer: ['6'],
        points: 15,
        explanation: 'Carbon has 6 protons in its nucleus, giving it an atomic number of 6.'
    },
    // History - Medium
    {
        id: 11,
        category: 'history',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these events occurred during World War II?',
        options: ['The Great Depression', 'The Holocaust', 'The Moon Landing', 'D-Day Invasion'],
        correctAnswer: ['The Holocaust', 'D-Day Invasion'],
        points: 15,
        explanation: 'The Holocaust was the genocide of European Jews during WWII, and D-Day was the Allied invasion of Normandy.'
    },
    {
        id: 12,
        category: 'history',
        type: 'fill',
        difficulty: 'medium',
        question: 'In what year did the Titanic sink?',
        correctAnswer: ['1912'],
        points: 15,
        explanation: 'The RMS Titanic sank in the North Atlantic Ocean on April 15, 1912.'
    },
    {
        id: 13,
        category: 'history',
        type: 'single',
        difficulty: 'medium',
        question: 'Who invented the telephone?',
        options: ['Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla', 'Guglielmo Marconi'],
        correctAnswer: ['Alexander Graham Bell'],
        points: 15,
        explanation: 'Alexander Graham Bell was awarded the first U.S. patent for the telephone in 1876.'
    },
    // Technology - Medium
    {
        id: 14,
        category: 'tech',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these are programming languages?',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        correctAnswer: ['Python', 'JavaScript'],
        points: 15,
        explanation: 'HTML and CSS are markup and styling languages, while Python and JavaScript are programming languages.'
    },
    {
        id: 15,
        category: 'tech',
        type: 'fill',
        difficulty: 'medium',
        question: 'What does "CPU" stand for in computing?',
        correctAnswer: ['central processing unit'],
        points: 15,
        explanation: 'The CPU is the primary component of a computer that performs most of the processing inside the computer.'
    },
    {
        id: 16,
        category: 'tech',
        type: 'single',
        difficulty: 'medium',
        question: 'Which company developed the Windows operating system?',
        options: ['Apple', 'Microsoft', 'Google', 'IBM'],
        correctAnswer: ['Microsoft'],
        points: 15,
        explanation: 'Microsoft Corporation developed the Windows operating system.'
    },
    // Mathematics - Medium
    {
        id: 17,
        category: 'math',
        type: 'single',
        difficulty: 'medium',
        question: 'What is the value of π (pi) rounded to two decimal places?',
        options: ['3.14', '3.16', '3.18', '3.12'],
        correctAnswer: ['3.14'],
        points: 15,
        explanation: 'π is approximately 3.14159, which rounds to 3.14 to two decimal places.'
    },
    {
        id: 18,
        category: 'math',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these are prime numbers?',
        options: ['1', '2', '9', '11'],
        correctAnswer: ['2', '11'],
        points: 15,
        explanation: 'Prime numbers are greater than 1 and have only two factors: 1 and themselves.'
    },
    // General Knowledge - Medium
    {
        id: 19,
        category: 'general',
        type: 'single',
        difficulty: 'medium',
        question: 'Which is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: ['Pacific Ocean'],
        points: 15,
        explanation: 'The Pacific Ocean is the largest and deepest of Earth\'s oceanic divisions.'
    },
    {
        id: 20,
        category: 'general',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these countries are in Europe?',
        options: ['Germany', 'Brazil', 'Italy', 'Canada'],
        correctAnswer: ['Germany', 'Italy'],
        points: 15,
        explanation: 'Germany and Italy are European countries, while Brazil is in South America and Canada is in North America.'
    },
    
    // ========== HARD QUESTIONS (10) ==========
    // Science - Hard
    {
        id: 21,
        category: 'science',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of the following are subatomic particles?',
        options: ['Proton', 'Neutron', 'Electron', 'Photon'],
        correctAnswer: ['Proton', 'Neutron', 'Electron'],
        points: 20,
        explanation: 'Protons, neutrons, and electrons are subatomic particles. Photons are elementary particles but not subatomic in the same sense.'
    },
    {
        id: 22,
        category: 'science',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the chemical formula for sulfuric acid?',
        correctAnswer: ['h2so4', 'H2SO4'],
        points: 20,
        explanation: 'Sulfuric acid (H₂SO₄) is a strong mineral acid composed of sulfur, oxygen, and hydrogen.'
    },
    {
        id: 23,
        category: 'science',
        type: 'single',
        difficulty: 'hard',
        question: 'What is the speed of light in vacuum (approximately)?',
        options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
        correctAnswer: ['300,000 km/s'],
        points: 20,
        explanation: 'The speed of light in vacuum is exactly 299,792,458 meters per second, approximately 300,000 km/s.'
    },
    {
        id: 24,
        category: 'science',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these elements are transition metals?',
        options: ['Iron', 'Copper', 'Sodium', 'Gold'],
        correctAnswer: ['Iron', 'Copper', 'Gold'],
        points: 20,
        explanation: 'Iron, copper, and gold are transition metals. Sodium is an alkali metal.'
    },
    // History - Hard
    {
        id: 25,
        category: 'history',
        type: 'single',
        difficulty: 'hard',
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1993'],
        correctAnswer: ['1989'],
        points: 20,
        explanation: 'The Berlin Wall fell on November 9, 1989, leading to German reunification.'
    },
    {
        id: 26,
        category: 'history',
        type: 'fill',
        difficulty: 'hard',
        question: 'Who was the Egyptian queen known for her relationships with Julius Caesar and Mark Antony?',
        correctAnswer: ['cleopatra'],
        points: 20,
        explanation: 'Cleopatra VII was the last active ruler of the Ptolemaic Kingdom of Egypt.'
    },
    {
        id: 27,
        category: 'history',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these were ancient civilizations?',
        options: ['Mayan', 'Roman', 'Viking', 'Aztec'],
        correctAnswer: ['Mayan', 'Roman', 'Aztec'],
        points: 20,
        explanation: 'Mayan, Roman, and Aztec were ancient civilizations. Vikings were Norse explorers, traders, and warriors.'
    },
    // Technology - Hard
    {
        id: 28,
        category: 'tech',
        type: 'single',
        difficulty: 'hard',
        question: 'What was the first programming language?',
        options: ['FORTRAN', 'COBOL', 'Assembly', 'Plankalkül'],
        correctAnswer: ['Plankalkül'],
        points: 20,
        explanation: 'Plankalkül, developed by Konrad Zuse in 1948, is considered the first high-level programming language.'
    },
    {
        id: 29,
        category: 'tech',
        type: 'fill',
        difficulty: 'hard',
        question: 'In computer science, what does "API" stand for?',
        correctAnswer: ['application programming interface'],
        points: 20,
        explanation: 'An API is a set of functions and procedures allowing the creation of applications that access features or data of an OS, application, or other service.'
    },
    {
        id: 30,
        category: 'tech',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these are database management systems?',
        options: ['MySQL', 'MongoDB', 'React', 'Oracle'],
        correctAnswer: ['MySQL', 'MongoDB', 'Oracle'],
        points: 20,
        explanation: 'MySQL, MongoDB, and Oracle are DBMS. React is a JavaScript library for building user interfaces.'
    },
    // Mathematics - Hard
    {
        id: 31,
        category: 'math',
        type: 'single',
        difficulty: 'hard',
        question: 'What is the value of e (Euler\'s number) rounded to two decimal places?',
        options: ['2.71', '2.82', '3.14', '1.62'],
        correctAnswer: ['2.71'],
        points: 20,
        explanation: 'e (Euler\'s number) is approximately 2.71828, which rounds to 2.71 to two decimal places.'
    },
    {
        id: 32,
        category: 'math',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the derivative of x²?',
        correctAnswer: ['2x'],
        points: 20,
        explanation: 'Using the power rule, the derivative of x² is 2x.'
    },
    // General Knowledge - Hard
    {
        id: 33,
        category: 'general',
        type: 'single',
        difficulty: 'hard',
        question: 'Which planet has the most moons?',
        options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
        correctAnswer: ['Saturn'],
        points: 20,
        explanation: 'As of 2023, Saturn has 146 confirmed moons, more than any other planet in our solar system.'
    },
    {
        id: 34,
        category: 'general',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these are Nobel Prize categories?',
        options: ['Physics', 'Mathematics', 'Peace', 'Economics'],
        correctAnswer: ['Physics', 'Peace', 'Economics'],
        points: 20,
        explanation: 'Physics, Peace, and Economics are Nobel Prize categories. There is no Nobel Prize in Mathematics.'
    },
    {
        id: 35,
        category: 'general',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the chemical symbol for gold?',
        correctAnswer: ['Au'],
        points: 20,
        explanation: 'Au comes from the Latin word for gold, "aurum."'
    }
];

// Initialize the application
function init() {
    // Load high score from local storage
    loadHighScore();
    
    // Set up event listeners
    setupEventListeners();
    
    // Select the first category by default
    if (elements.categoryCards.length > 0) {
        elements.categoryCards[0].classList.add('active');
    }
    
    // Set default values
    elements.timerSelect.value = timerPerQuestion;
    elements.difficultySelect.value = selectedDifficulty;
    
    // Add animations to elements
    animateElements();
}

// Set up all event listeners
function setupEventListeners() {
    // Start button
    elements.startBtn.addEventListener('click', startQuiz);
    
    // Navigation buttons
    elements.prevBtn.addEventListener('click', showPreviousQuestion);
    elements.nextBtn.addEventListener('click', showNextQuestion);
    elements.submitQuizBtn.addEventListener('click', submitQuiz);
    
    // Results screen buttons
    elements.restartBtn.addEventListener('click', restartQuiz);
    elements.reviewBtn.addEventListener('click', reviewAnswers);
    elements.newCategoryBtn.addEventListener('click', goToCategories);
    
    // Fill in the blank submit button
    elements.submitFillAnswer.addEventListener('click', submitFillAnswerHandler);
    elements.fillInAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitFillAnswerHandler();
        }
    });
    
    // Category selection
    elements.categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            elements.categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
            playSound('click');
        });
    });
    
    // Settings changes
    elements.timerSelect.addEventListener('change', function() {
        timerPerQuestion = parseInt(this.value);
        playSound('click');
    });
    
    elements.difficultySelect.addEventListener('change', function() {
        selectedDifficulty = this.value;
        playSound('click');
    });
    
    // Share buttons
    document.querySelectorAll('.btn-share').forEach(btn => {
        btn.addEventListener('click', function() {
            playSound('click');
            // In a real app, this would open share dialogs
            alert('Share functionality would be implemented here!');
        });
    });
}

// Load high score from local storage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
        elements.highScoreValue.textContent = savedHighScore;
    }
}

// Save high score to local storage
function saveHighScore(score) {
    localStorage.setItem('quizHighScore', score);
    elements.highScoreValue.textContent = score;
}

// Animate elements on page load
function animateElements() {
    // Animate category cards sequentially
    elements.categoryCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
        card.style.opacity = '0';
    });
    
    // Animate feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'fadeIn 0.5s ease-out forwards';
        card.style.opacity = '0';
    });
}

// Start the quiz
function startQuiz() {
    playSound('click');
    
    // Get quiz settings
    timerPerQuestion = parseInt(elements.timerSelect.value);
    selectedDifficulty = elements.difficultySelect.value;
    
    // Record start time
    startTime = Date.now();
    quizStartTime = Date.now();
    questionStartTime = Date.now();
    totalTimeUsed = 0;
    
    // Filter questions based on selected category and difficulty
    quizQuestions = questionsDatabase.filter(q => {
        const categoryMatch = selectedCategory === 'all' || q.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });
    
    // If no questions match the filter, use all questions
    if (quizQuestions.length === 0) {
        quizQuestions = [...questionsDatabase];
    }
    
    // Randomize questions and options
    quizQuestions = shuffleArray(quizQuestions);
    
    // Determine how many questions to show based on difficulty
    let questionCount;
    switch(selectedDifficulty) {
        case 'easy':
            questionCount = 5;
            break;
        case 'medium':
        case 'hard':
            questionCount = 10;
            break;
        default:
            questionCount = 8; // For 'all' difficulty
    }
    
    // Limit to the appropriate number of questions
    quizQuestions = quizQuestions.slice(0, questionCount);
    
    // Initialize user answers array
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    elements.currentScore.textContent = '0';
    
    // Update UI elements
    elements.quizCategory.textContent = document.querySelector('.category-card.active h4').textContent;
    
    // Show quiz screen with animation
    switchScreen('quiz');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Switch between screens with animation
function switchScreen(screenName) {
    // Hide all screens
    Object.values(screens).forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show selected screen
    screens[screenName].classList.add('active');
    
    // Play sound for results screen
    if (screenName === 'results') {
        playSound('complete');
    }
}

// Display the current question
function displayQuestion() {
    // Update question start time
    questionStartTime = Date.now();
    
    // Clear previous question data
    elements.optionsContainer.innerHTML = '';
    elements.fillInContainer.style.display = 'none';
    elements.feedbackMessage.textContent = '';
    elements.feedbackMessage.className = 'feedback-message';
    elements.feedbackMessage.style.display = 'none';
    
    // Get current question
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update question text
    elements.questionText.innerHTML = `<i class="fas fa-question-circle question-icon"></i><span>${currentQuestion.question}</span>`;
    
    // Update question type and difficulty
    elements.questionType.innerHTML = `<i class="fas fa-${getQuestionTypeIcon(currentQuestion.type)}"></i> ${getQuestionTypeText(currentQuestion.type)}`;
    elements.questionDifficulty.textContent = currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1);
    elements.questionDifficulty.className = `badge difficulty-badge ${currentQuestion.difficulty}`;
    
    // Update question points
    elements.questionPoints.textContent = currentQuestion.points;
    
    // Update progress
    elements.progressText.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    const progressPercent = Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);
    elements.progressPercent.textContent = `${progressPercent}%`;
    elements.progressFill.style.width = `${progressPercent}%`;
    
    // Create question indicators
    createQuestionIndicators();
    
    // Display options based on question type
    if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        displayOptions(currentQuestion);
    } else if (currentQuestion.type === 'fill') {
        displayFillInBlank(currentQuestion);
    }
    
    // Update navigation buttons
    elements.prevBtn.disabled = currentQuestionIndex === 0;
    elements.nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
    elements.submitQuizBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'flex' : 'none';
    
    // Restore user's previous answer if exists
    if (userAnswers[currentQuestionIndex] !== null) {
        restoreUserAnswer(currentQuestion);
    }
    
    // Animate question appearance
    elements.questionText.parentElement.style.animation = 'none';
    setTimeout(() => {
        elements.questionText.parentElement.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

// Create question indicators
function createQuestionIndicators() {
    elements.questionIndicators.innerHTML = '';
    
    quizQuestions.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'question-indicator';
        if (index === currentQuestionIndex) {
            indicator.classList.add('current');
        }
        if (userAnswers[index] !== null) {
            // Check if answer is correct
            const question = quizQuestions[index];
            const userAnswer = userAnswers[index];
            let isCorrect = false;
            
            if (userAnswer !== null) {
                if (question.type === 'single' || question.type === 'multiple') {
                    const sortedUserAnswer = [...userAnswer].sort();
                    const sortedCorrectAnswer = [...question.correctAnswer].sort();
                    isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                        sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                } else if (question.type === 'fill') {
                    const userAnswerLower = userAnswer[0].toLowerCase().trim();
                    isCorrect = question.correctAnswer.some(correct => 
                        correct.toLowerCase() === userAnswerLower
                    );
                }
            }
            
            indicator.classList.add(isCorrect ? 'answered' : 'incorrect');
        }
        
        indicator.addEventListener('click', () => {
            if (index !== currentQuestionIndex) {
                currentQuestionIndex = index;
                displayQuestion();
                if (timerPerQuestion > 0) {
                    resetTimer();
                    startTimer();
                }
                playSound('click');
            }
        });
        
        elements.questionIndicators.appendChild(indicator);
    });
}

// Display options for multiple choice questions
function displayOptions(question) {
    // Shuffle the options for this question
    const shuffledOptions = shuffleArray([...question.options]);
    
    shuffledOptions.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.value = option;
        
        let inputElement;
        if (question.type === 'single') {
            inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = 'quiz-option';
            inputElement.id = `option-${currentQuestionIndex}-${index}`;
        } else {
            inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.id = `option-${currentQuestionIndex}-${index}`;
        }
        
        const labelElement = document.createElement('label');
        labelElement.className = 'option-label';
        labelElement.htmlFor = `option-${currentQuestionIndex}-${index}`;
        labelElement.textContent = option;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'option-icon';
        
        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);
        optionElement.appendChild(iconElement);
        
        optionElement.addEventListener('click', () => selectOption(optionElement, question.type));
        elements.optionsContainer.appendChild(optionElement);
    });
    
    // Animate options
    const options = elements.optionsContainer.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.style.animationDelay = `${index * 0.1}s`;
        option.style.animation = 'fadeIn 0.3s ease-out forwards';
        option.style.opacity = '0';
    });
}

// Display fill in the blank input
function displayFillInBlank(question) {
    elements.fillInContainer.style.display = 'block';
    elements.fillInAnswer.value = '';
    elements.fillInAnswer.focus();
    
    // Animate input
    elements.fillInContainer.style.animation = 'fadeIn 0.5s ease-out';
}

// Restore user's previous answer
function restoreUserAnswer(question) {
    const userAnswer = userAnswers[currentQuestionIndex];
    
    if (question.type === 'single') {
        // Find the option that matches the saved value
        document.querySelectorAll('.option').forEach(optionElement => {
            if (optionElement.dataset.value === userAnswer[0]) {
                optionElement.querySelector('input').checked = true;
                optionElement.classList.add('selected');
            }
        });
    } else if (question.type === 'multiple') {
        userAnswer.forEach(answerValue => {
            document.querySelectorAll('.option').forEach(optionElement => {
                if (optionElement.dataset.value === answerValue) {
                    optionElement.querySelector('input').checked = true;
                    optionElement.classList.add('selected');
                }
            });
        });
    } else if (question.type === 'fill') {
        elements.fillInAnswer.value = userAnswer[0] || '';
    }
}

// Handle option selection
function selectOption(optionElement, questionType) {
    const selectedValue = optionElement.dataset.value;
    const input = optionElement.querySelector('input');
    
    if (questionType === 'single') {
        // For single choice, deselect all options first
        document.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
            opt.querySelector('input').checked = false;
        });
        
        // Select the clicked option
        optionElement.classList.add('selected');
        input.checked = true;
        
        // Save answer
        userAnswers[currentQuestionIndex] = [selectedValue];
        
        // Provide immediate feedback in review mode
        if (document.querySelector('.review-mode')) {
            showImmediateFeedback();
        } else {
            // Auto-advance after a short delay for better UX
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    showNextQuestion();
                }
            }, 1000);
        }
        
    } else if (questionType === 'multiple') {
        // For multiple choice, toggle selection
        optionElement.classList.toggle('selected');
        input.checked = !input.checked;
        
        // Save selected answers
        const selectedOptions = [];
        document.querySelectorAll('.option.selected').forEach(opt => {
            selectedOptions.push(opt.dataset.value);
        });
        
        userAnswers[currentQuestionIndex] = selectedOptions;
    }
    
    // Update question indicators
    createQuestionIndicators();
    
    playSound('click');
}

// Handle fill in the blank answer submission
function submitFillAnswerHandler() {
    const answer = elements.fillInAnswer.value.trim();
    
    if (answer) {
        // Save answer
        userAnswers[currentQuestionIndex] = [answer];
        
        // Provide immediate feedback in review mode
        if (document.querySelector('.review-mode')) {
            showImmediateFeedback();
        } else {
            // Auto-advance after a short delay for better UX
            setTimeout(() => {
                if (currentQuestionIndex < quizQuestions.length - 1) {
                    showNextQuestion();
                }
            }, 1000);
        }
        
        playSound('click');
    } else {
        // Show validation message with animation
        elements.feedbackMessage.textContent = 'Please enter an answer before proceeding.';
        elements.feedbackMessage.className = 'feedback-message incorrect';
        elements.feedbackMessage.style.display = 'flex';
        elements.feedbackMessage.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(() => {
            elements.feedbackMessage.style.animation = '';
        }, 500);
    }
}

// Show immediate feedback for answer
function showImmediateFeedback() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    let isCorrect = false;
    
    if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        const sortedUserAnswer = [...userAnswer].sort();
        const sortedCorrectAnswer = [...currentQuestion.correctAnswer].sort();
        isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
            sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
    } else if (currentQuestion.type === 'fill') {
        const userAnswerLower = userAnswer[0].toLowerCase().trim();
        isCorrect = currentQuestion.correctAnswer.some(correct => 
            correct.toLowerCase() === userAnswerLower
        );
    }
    
    // Show feedback
    elements.feedbackMessage.textContent = isCorrect ? 
        `✅ Correct! ${currentQuestion.explanation}` : 
        `❌ Incorrect. ${currentQuestion.explanation}`;
    elements.feedbackMessage.className = `feedback-message ${isCorrect ? 'correct' : 'incorrect'}`;
    elements.feedbackMessage.style.display = 'flex';
    elements.feedbackMessage.style.animation = 'fadeIn 0.3s ease-out';
    
    // Play sound
    playSound(isCorrect ? 'correct' : 'incorrect');
    
    // Highlight correct/incorrect answers
    if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        document.querySelectorAll('.option').forEach(optionElement => {
            const optionValue = optionElement.dataset.value;
            const isUserSelected = userAnswer.includes(optionValue);
            const isCorrectAnswer = currentQuestion.correctAnswer.includes(optionValue);
            
            if (isCorrectAnswer && isUserSelected) {
                optionElement.classList.add('correct');
                optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
            } else if (isCorrectAnswer && !isUserSelected) {
                optionElement.classList.add('correct');
                optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
            } else if (!isCorrectAnswer && isUserSelected) {
                optionElement.classList.add('incorrect');
                optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-times"></i>';
            }
        });
    }
}

// Show next question
function showNextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
        
        // Reset and restart timer
        if (timerPerQuestion > 0) {
            resetTimer();
            startTimer();
        }
    }
    
    playSound('click');
}

// Show previous question
function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
        
        // Reset and restart timer
        if (timerPerQuestion > 0) {
            resetTimer();
            startTimer();
        }
    }
    
    playSound('click');
}

// Start the timer for the current question
function startTimer() {
    timeLeft = timerPerQuestion;
    elements.timerDisplay.textContent = timeLeft;
    elements.timerDisplay.parentElement.parentElement.classList.remove('timer-warning', 'timer-danger');
    
    timer = setInterval(() => {
        timeLeft--;
        elements.timerDisplay.textContent = timeLeft;
        
        // Update timer color when time is running low
        if (timeLeft <= 10 && timeLeft > 5) {
            elements.timerDisplay.parentElement.parentElement.classList.add('timer-warning');
        } else if (timeLeft <= 5) {
            elements.timerDisplay.parentElement.parentElement.classList.remove('timer-warning');
            elements.timerDisplay.parentElement.parentElement.classList.add('timer-danger');
        }
        
        // When time runs out
        if (timeLeft <= 0) {
            clearInterval(timer);
            
            // Auto-advance to next question or submit if last question
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            } else {
                submitQuiz();
            }
        }
    }, 1000);
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    elements.timerDisplay.parentElement.parentElement.classList.remove('timer-warning', 'timer-danger');
}

// Submit the quiz and show results
function submitQuiz() {
    playSound('click');
    resetTimer();
    
    // Calculate total time used
    totalTimeUsed = Date.now() - quizStartTime;
    
    // Calculate score
    calculateScore();
    
    // Show results screen
    switchScreen('results');
    
    // Update results display
    updateResultsDisplay();
    
    // Check for high score
    checkHighScore();
}

// Calculate the final score
function calculateScore() {
    score = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    
    quizQuestions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        
        if (userAnswer !== null) {
            let isCorrect = false;
            
            if (question.type === 'single' || question.type === 'multiple') {
                const sortedUserAnswer = [...userAnswer].sort();
                const sortedCorrectAnswer = [...question.correctAnswer].sort();
                isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                    sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                    
            } else if (question.type === 'fill') {
                const userAnswerLower = userAnswer[0].toLowerCase().trim();
                isCorrect = question.correctAnswer.some(correct => 
                    correct.toLowerCase() === userAnswerLower
                );
            }
            
            if (isCorrect) {
                score += question.points;
                correctAnswers++;
            } else {
                incorrectAnswers++;
            }
        } else {
            // No answer provided
            incorrectAnswers++;
        }
    });
    
    // Update global variables for display
    window.correctAnswersCount = correctAnswers;
    window.incorrectAnswersCount = incorrectAnswers;
    window.totalQuestionsCount = quizQuestions.length;
}

// Update the results display
function updateResultsDisplay() {
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((window.correctAnswersCount / totalQuestions) * 100);
    const maxPossibleScore = quizQuestions.reduce((sum, q) => sum + q.points, 0);
    
    // Update score cards
    elements.correctCount.textContent = window.correctAnswersCount;
    elements.incorrectCount.textContent = window.incorrectAnswersCount;
    elements.totalScore.textContent = score;
    elements.maxScore.textContent = maxPossibleScore;
    elements.totalQuestions.textContent = totalQuestions;
    
    // Update percentage and circle animation
    elements.scorePercentage.textContent = `${percentage}%`;
    
    // Animate the circle
    const circleCircumference = 754; // 2 * π * r (r = 120)
    const offset = circleCircumference - (percentage / 100) * circleCircumference;
    
    // Reset circle first
    elements.scoreCircle.style.strokeDashoffset = circleCircumference;
    
    // Animate to new position
    setTimeout(() => {
        elements.scoreCircle.style.transition = 'stroke-dashoffset 2s ease-in-out';
        elements.scoreCircle.style.strokeDashoffset = offset;
    }, 300);
    
    // Update circle color based on percentage
    if (percentage >= 90) {
        elements.scoreCircle.style.stroke = 'url(#gradient-perfect)';
        elements.scoreGrade.textContent = 'A+';
    } else if (percentage >= 80) {
        elements.scoreCircle.style.stroke = 'var(--success)';
        elements.scoreGrade.textContent = 'A';
    } else if (percentage >= 70) {
        elements.scoreCircle.style.stroke = 'var(--info)';
        elements.scoreGrade.textContent = 'B';
    } else if (percentage >= 60) {
        elements.scoreCircle.style.stroke = 'var(--warning)';
        elements.scoreGrade.textContent = 'C';
    } else if (percentage >= 50) {
        elements.scoreCircle.style.stroke = '#ff9e00';
        elements.scoreGrade.textContent = 'D';
    } else {
        elements.scoreCircle.style.stroke = 'var(--error)';
        elements.scoreGrade.textContent = 'F';
    }
    
    // Update performance metrics
    updatePerformanceMetrics(percentage, maxPossibleScore);
}

// Update performance metrics on results screen
function updatePerformanceMetrics(accuracy, maxPossibleScore) {
    // Accuracy
    elements.accuracyValue.textContent = `${accuracy}%`;
    setTimeout(() => {
        elements.accuracyFill.style.width = `${accuracy}%`;
    }, 500);
    
    // Speed calculation (based on time used vs total available time)
    const totalAvailableTime = timerPerQuestion > 0 ? timerPerQuestion * quizQuestions.length * 1000 : 600000; // 10 minutes default if no timer
    const speedScore = Math.max(0, Math.min(100, Math.round((1 - (totalTimeUsed / totalAvailableTime)) * 100)));
    elements.speedValue.textContent = `${speedScore}%`;
    setTimeout(() => {
        elements.speedFill.style.width = `${speedScore}%`;
    }, 800);
    
    // Difficulty level
    const difficultyText = selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1);
    elements.difficultyLevel.textContent = difficultyText;
    elements.difficultyLevel.style.color = 
        selectedDifficulty === 'easy' ? 'var(--success)' :
        selectedDifficulty === 'medium' ? 'var(--warning)' : 
        'var(--error)';
    
    // Difficulty tag
    let tagText, tagColor;
    switch(selectedDifficulty) {
        case 'easy':
            tagText = 'Beginner';
            tagColor = 'var(--success)';
            break;
        case 'medium':
            tagText = 'Intermediate';
            tagColor = 'var(--warning)';
            break;
        case 'hard':
            tagText = 'Expert';
            tagColor = 'var(--error)';
            break;
        default:
            tagText = 'Mixed';
            tagColor = 'var(--primary)';
    }
    elements.difficultyTag.textContent = tagText;
    elements.difficultyTag.style.color = tagColor;
    elements.difficultyTag.style.background = `${tagColor}20`;
}

// Check if the current score is a high score
function checkHighScore() {
    const currentHighScore = parseInt(localStorage.getItem('quizHighScore') || 0);
    
    if (score > currentHighScore) {
        // New high score!
        saveHighScore(score);
        elements.newHighScore.textContent = score;
        elements.highScoreUpdate.style.display = 'flex';
        
        // Add celebration effect
        celebrateHighScore();
    } else {
        elements.highScoreUpdate.style.display = 'none';
    }
}

// Celebration effect for high score
function celebrateHighScore() {
    // Add more confetti
    const confettiContainer = document.querySelector('.confetti');
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = ['🎉', '🎊', '🏆', '⭐', '🔥'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'absolute';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.fontSize = `${Math.random() * 20 + 20}px`;
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 1}s linear forwards`;
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 200);
    }
}

// Restart the quiz
function restartQuiz() {
    playSound('click');
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    
    // Record new start time
    startTime = Date.now();
    quizStartTime = Date.now();
    totalTimeUsed = 0;
    
    // Remove review mode class
    document.body.classList.remove('review-mode');
    
    // Show quiz screen
    switchScreen('quiz');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Review answers (go back to quiz screen)
function reviewAnswers() {
    playSound('click');
    
    // Go to first question
    currentQuestionIndex = 0;
    
    // Add review mode class
    document.body.classList.add('review-mode');
    
    // Show quiz screen
    switchScreen('quiz');
    
    // Display first question with answers highlighted
    displayQuestion();
    highlightCorrectAnswers();
    
    // Disable timer for review mode
    resetTimer();
    
    // Update navigation buttons for review mode
    elements.prevBtn.disabled = false;
    elements.nextBtn.disabled = false;
    elements.submitQuizBtn.style.display = 'none';
}

// Highlight correct and incorrect answers in review mode
function highlightCorrectAnswers() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    // Clear any previous feedback
    elements.feedbackMessage.textContent = '';
    elements.feedbackMessage.className = 'feedback-message';
    elements.feedbackMessage.style.display = 'none';
    
    if (userAnswer !== null) {
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Highlight all options
            document.querySelectorAll('.option').forEach(optionElement => {
                const optionValue = optionElement.dataset.value;
                const isUserSelected = userAnswer.includes(optionValue);
                const isCorrect = currentQuestion.correctAnswer.includes(optionValue);
                
                if (isCorrect && isUserSelected) {
                    // Correct answer selected by user
                    optionElement.classList.add('correct');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                } else if (isCorrect && !isUserSelected) {
                    // Correct answer not selected by user
                    optionElement.classList.add('correct');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                } else if (!isCorrect && isUserSelected) {
                    // Incorrect answer selected by user
                    optionElement.classList.add('incorrect');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-times"></i>';
                }
                
                // Disable interaction in review mode
                optionElement.style.pointerEvents = 'none';
                optionElement.querySelector('input').disabled = true;
            });
            
            // Show feedback
            const sortedUserAnswer = [...userAnswer].sort();
            const sortedCorrectAnswer = [...currentQuestion.correctAnswer].sort();
            const isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                
            if (isCorrect) {
                elements.feedbackMessage.textContent = `✅ Correct! ${currentQuestion.explanation}`;
                elements.feedbackMessage.className = 'feedback-message correct';
            } else {
                elements.feedbackMessage.textContent = `❌ Incorrect. ${currentQuestion.explanation}`;
                elements.feedbackMessage.className = 'feedback-message incorrect';
            }
            elements.feedbackMessage.style.display = 'flex';
            
        } else if (currentQuestion.type === 'fill') {
            // For fill in the blank
            const userAnswerText = userAnswer[0].toLowerCase().trim();
            const isCorrect = currentQuestion.correctAnswer.some(correct => 
                correct.toLowerCase() === userAnswerText
            );
            
            if (isCorrect) {
                elements.feedbackMessage.textContent = `✅ Correct! ${currentQuestion.explanation}`;
                elements.feedbackMessage.className = 'feedback-message correct';
            } else {
                elements.feedbackMessage.textContent = `❌ Incorrect. The correct answer is: ${currentQuestion.correctAnswer[0]}. ${currentQuestion.explanation}`;
                elements.feedbackMessage.className = 'feedback-message incorrect';
            }
            elements.feedbackMessage.style.display = 'flex';
            
            // Disable interaction
            elements.fillInAnswer.disabled = true;
            elements.submitFillAnswer.disabled = true;
        }
    } else {
        // No answer provided
        elements.feedbackMessage.textContent = `❌ You didn't answer this question. The correct answer is: ${currentQuestion.correctAnswer.join(', ')}. ${currentQuestion.explanation}`;
        elements.feedbackMessage.className = 'feedback-message incorrect';
        elements.feedbackMessage.style.display = 'flex';
        
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Highlight correct answers
            currentQuestion.correctAnswer.forEach(correctValue => {
                document.querySelectorAll('.option').forEach(optionElement => {
                    if (optionElement.dataset.value === correctValue) {
                        optionElement.classList.add('correct');
                        optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                    }
                });
            });
            
            // Disable interaction
            document.querySelectorAll('.option').forEach(optionElement => {
                optionElement.style.pointerEvents = 'none';
                optionElement.querySelector('input').disabled = true;
            });
        } else if (currentQuestion.type === 'fill') {
            // Disable interaction
            elements.fillInAnswer.disabled = true;
            elements.submitFillAnswer.disabled = true;
        }
    }
}

// Go back to category selection
function goToCategories() {
    playSound('click');
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    // Remove review mode class
    document.body.classList.remove('review-mode');
    
    // Show welcome screen
    switchScreen('welcome');
}

// Helper function to get question type text
function getQuestionTypeText(type) {
    switch (type) {
        case 'single': return 'Single Choice';
        case 'multiple': return 'Multiple Choice';
        case 'fill': return 'Fill in the Blank';
        default: return 'Question';
    }
}

// Helper function to get question type icon
function getQuestionTypeIcon(type) {
    switch (type) {
        case 'single': return 'check-circle';
        case 'multiple': return 'tasks';
        case 'fill': return 'keyboard';
        default: return 'question-circle';
    }
}

// Helper function to shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Play sound effects
function playSound(type) {
    try {
        sounds[type].currentTime = 0;
        sounds[type].play();
    } catch (e) {
        // Sound play failed, ignore
        console.log(`Could not play ${type} sound`);
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);

// Add CSS animation for shake effect
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);