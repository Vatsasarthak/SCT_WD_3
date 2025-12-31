// Quiz Game JavaScript

// DOM Elements
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const submitQuizBtn = document.getElementById('submit-quiz-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');
const newCategoryBtn = document.getElementById('new-category-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const fillInContainer = document.getElementById('fill-in-container');
const fillInAnswer = document.getElementById('fill-in-answer');
const submitFillAnswer = document.getElementById('submit-fill-answer');
const progressText = document.getElementById('progress-text');
const progressFill = document.getElementById('progress-fill');
const timerDisplay = document.getElementById('timer-display');
const currentScore = document.getElementById('current-score');
const questionType = document.getElementById('question-type');
const questionDifficulty = document.getElementById('question-difficulty');
const feedbackMessage = document.getElementById('feedback-message');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalScore = document.getElementById('total-score');
const scorePercentage = document.getElementById('score-percentage');
const scoreCircle = document.getElementById('score-circle');
const highScoreValue = document.getElementById('high-score-value');
const highScoreUpdate = document.getElementById('high-score-update');
const newHighScore = document.getElementById('new-high-score');
const categoryCards = document.querySelectorAll('.category-card');
const timerSelect = document.getElementById('timer');
const difficultySelect = document.getElementById('difficulty');

// Audio elements
const correctSound = document.getElementById('correct-sound');
const incorrectSound = document.getElementById('incorrect-sound');
const clickSound = document.getElementById('click-sound');

// Quiz State Variables
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let timer;
let timeLeft;
let quizQuestions = [];
let selectedCategory = 'all';
let selectedDifficulty = 'easy';
let timerPerQuestion = 45;

// Questions Database
const questionsDatabase = [
    // Science Questions
    {
        id: 1,
        category: 'science',
        type: 'single',
        difficulty: 'easy',
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'O2'],
        correctAnswer: ['H2O'],
        points: 10
    },
    {
        id: 2,
        category: 'science',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of the following are planets in our solar system?',
        options: ['Mars', 'Venus', 'Pluto', 'Titan'],
        correctAnswer: ['Mars', 'Venus'],
        points: 15
    },
    {
        id: 3,
        category: 'science',
        type: 'fill',
        difficulty: 'hard',
        question: 'What is the powerhouse of the cell?',
        correctAnswer: ['mitochondria', 'mitochondrion'],
        points: 20
    },
    
    // History Questions
    {
        id: 4,
        category: 'history',
        type: 'single',
        difficulty: 'easy',
        question: 'Who was the first president of the United States?',
        options: ['George Washington', 'Abraham Lincoln', 'Thomas Jefferson', 'John Adams'],
        correctAnswer: ['George Washington'],
        points: 10
    },
    {
        id: 5,
        category: 'history',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these events occurred during World War II?',
        options: ['The Great Depression', 'The Holocaust', 'The Moon Landing', 'D-Day Invasion'],
        correctAnswer: ['The Holocaust', 'D-Day Invasion'],
        points: 15
    },
    {
        id: 6,
        category: 'history',
        type: 'fill',
        difficulty: 'hard',
        question: 'In what year did the Titanic sink?',
        correctAnswer: ['1912'],
        points: 20
    },
    
    // Technology Questions
    {
        id: 7,
        category: 'tech',
        type: 'single',
        difficulty: 'easy',
        question: 'What does "HTML" stand for?',
        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
        correctAnswer: ['Hyper Text Markup Language'],
        points: 10
    },
    {
        id: 8,
        category: 'tech',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Which of these are programming languages?',
        options: ['Python', 'HTML', 'CSS', 'JavaScript'],
        correctAnswer: ['Python', 'JavaScript'],
        points: 15
    },
    {
        id: 9,
        category: 'tech',
        type: 'fill',
        difficulty: 'hard',
        question: 'What does "CPU" stand for in computing?',
        correctAnswer: ['central processing unit'],
        points: 20
    },
    
    // Mixed Questions
    {
        id: 10,
        category: 'all',
        type: 'single',
        difficulty: 'medium',
        question: 'Which gas do plants absorb from the atmosphere?',
        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
        correctAnswer: ['Carbon Dioxide'],
        points: 15
    },
    {
        id: 11,
        category: 'all',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Which of these are primary colors of light?',
        options: ['Red', 'Green', 'Blue', 'Yellow'],
        correctAnswer: ['Red', 'Green', 'Blue'],
        points: 20
    },
    {
        id: 12,
        category: 'all',
        type: 'fill',
        difficulty: 'easy',
        question: 'What is the capital of France?',
        correctAnswer: ['paris'],
        points: 10
    }
];

// Initialize the application
function init() {
    // Load high score from local storage
    loadHighScore();
    
    // Set up event listeners
    setupEventListeners();
    
    // Select the first category by default
    if (categoryCards.length > 0) {
        categoryCards[0].classList.add('active');
    }
    
    // Set default values
    timerSelect.value = timerPerQuestion;
    difficultySelect.value = selectedDifficulty;
}

// Set up all event listeners
function setupEventListeners() {
    // Start button
    startBtn.addEventListener('click', startQuiz);
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousQuestion);
    nextBtn.addEventListener('click', showNextQuestion);
    submitQuizBtn.addEventListener('click', submitQuiz);
    
    // Results screen buttons
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
    newCategoryBtn.addEventListener('click', goToCategories);
    
    // Fill in the blank submit button
    submitFillAnswer.addEventListener('click', submitFillAnswerHandler);
    fillInAnswer.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitFillAnswerHandler();
        }
    });
    
    // Category selection
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
            selectedCategory = this.getAttribute('data-category');
            playClickSound();
        });
    });
    
    // Settings changes
    timerSelect.addEventListener('change', function() {
        timerPerQuestion = parseInt(this.value);
        playClickSound();
    });
    
    difficultySelect.addEventListener('change', function() {
        selectedDifficulty = this.value;
        playClickSound();
    });
}

// Load high score from local storage
function loadHighScore() {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
        highScoreValue.textContent = savedHighScore;
    }
}

// Save high score to local storage
function saveHighScore(score) {
    localStorage.setItem('quizHighScore', score);
    highScoreValue.textContent = score;
}

// Start the quiz
function startQuiz() {
    playClickSound();
    
    // Get quiz settings
    timerPerQuestion = parseInt(timerSelect.value);
    selectedDifficulty = difficultySelect.value;
    
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
    quizQuestions = shuffleArray(quizQuestions).slice(0, 10); // Take 10 random questions
    
    // Initialize user answers array
    userAnswers = new Array(quizQuestions.length).fill(null);
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    currentScore.textContent = '0';
    
    // Show quiz screen
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    resultsScreen.classList.remove('active');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Display the current question
function displayQuestion() {
    // Clear previous question data
    optionsContainer.innerHTML = '';
    fillInContainer.style.display = 'none';
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    
    // Get current question
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Update question text
    questionText.textContent = currentQuestion.question;
    
    // Update question type and difficulty
    questionType.textContent = getQuestionTypeText(currentQuestion.type);
    questionDifficulty.textContent = currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1);
    questionDifficulty.className = `question-difficulty ${currentQuestion.difficulty}`;
    
    // Update progress
    progressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    const progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = `${progressPercent}%`;
    
    // Display options based on question type
    if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
        displayOptions(currentQuestion);
    } else if (currentQuestion.type === 'fill') {
        displayFillInBlank(currentQuestion);
    }
    
    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === quizQuestions.length - 1;
    submitQuizBtn.style.display = currentQuestionIndex === quizQuestions.length - 1 ? 'flex' : 'none';
    
    // Restore user's previous answer if exists
    if (userAnswers[currentQuestionIndex] !== null) {
        restoreUserAnswer(currentQuestion);
    }
}

// Display options for multiple choice questions
function displayOptions(question) {
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.index = index;
        
        let inputElement;
        if (question.type === 'single') {
            inputElement = document.createElement('input');
            inputElement.type = 'radio';
            inputElement.name = 'quiz-option';
            inputElement.id = `option-${index}`;
        } else {
            inputElement = document.createElement('input');
            inputElement.type = 'checkbox';
            inputElement.id = `option-${index}`;
        }
        
        const labelElement = document.createElement('label');
        labelElement.className = 'option-label';
        labelElement.htmlFor = `option-${index}`;
        labelElement.textContent = option;
        
        const iconElement = document.createElement('div');
        iconElement.className = 'option-icon';
        
        optionElement.appendChild(inputElement);
        optionElement.appendChild(labelElement);
        optionElement.appendChild(iconElement);
        
        optionElement.addEventListener('click', () => selectOption(optionElement, question.type));
        optionsContainer.appendChild(optionElement);
    });
}

// Display fill in the blank input
function displayFillInBlank(question) {
    fillInContainer.style.display = 'flex';
    fillInAnswer.value = '';
    fillInAnswer.focus();
}

// Restore user's previous answer
function restoreUserAnswer(question) {
    const userAnswer = userAnswers[currentQuestionIndex];
    
    if (question.type === 'single') {
        const optionElement = document.querySelector(`.option[data-index="${userAnswer[0]}"]`);
        if (optionElement) {
            optionElement.querySelector('input').checked = true;
            optionElement.classList.add('selected');
        }
    } else if (question.type === 'multiple') {
        userAnswer.forEach(index => {
            const optionElement = document.querySelector(`.option[data-index="${index}"]`);
            if (optionElement) {
                optionElement.querySelector('input').checked = true;
                optionElement.classList.add('selected');
            }
        });
    } else if (question.type === 'fill') {
        fillInAnswer.value = userAnswer[0] || '';
    }
}

// Handle option selection
function selectOption(optionElement, questionType) {
    const index = parseInt(optionElement.dataset.index);
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
        userAnswers[currentQuestionIndex] = [index];
        
        // Auto-advance after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            }
        }, 800);
        
    } else if (questionType === 'multiple') {
        // For multiple choice, toggle selection
        optionElement.classList.toggle('selected');
        input.checked = !input.checked;
        
        // Save selected answers
        const selectedOptions = [];
        document.querySelectorAll('.option.selected').forEach(opt => {
            selectedOptions.push(parseInt(opt.dataset.index));
        });
        
        userAnswers[currentQuestionIndex] = selectedOptions;
    }
    
    playClickSound();
}

// Handle fill in the blank answer submission
function submitFillAnswerHandler() {
    const answer = fillInAnswer.value.trim();
    
    if (answer) {
        // Save answer
        userAnswers[currentQuestionIndex] = [answer];
        
        // Auto-advance after a short delay for better UX
        setTimeout(() => {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                showNextQuestion();
            }
        }, 800);
        
        playClickSound();
    } else {
        // Show validation message
        feedbackMessage.textContent = 'Please enter an answer before proceeding.';
        feedbackMessage.className = 'feedback incorrect';
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
    
    playClickSound();
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
    
    playClickSound();
}

// Start the timer for the current question
function startTimer() {
    timeLeft = timerPerQuestion;
    timerDisplay.textContent = timeLeft;
    timerDisplay.parentElement.classList.remove('warning', 'danger');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Update timer color when time is running low
        if (timeLeft <= 10 && timeLeft > 5) {
            timerDisplay.parentElement.classList.add('warning');
        } else if (timeLeft <= 5) {
            timerDisplay.parentElement.classList.add('warning', 'danger');
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
    timerDisplay.parentElement.classList.remove('warning', 'danger');
}

// Submit the quiz and show results
function submitQuiz() {
    playClickSound();
    resetTimer();
    
    // Calculate score
    calculateScore();
    
    // Show results screen
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
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
                // For single and multiple choice, compare selected indices
                const correctIndices = question.options
                    .map((opt, idx) => question.correctAnswer.includes(opt) ? idx : -1)
                    .filter(idx => idx !== -1);
                
                // Sort arrays for comparison
                const sortedUserAnswer = [...userAnswer].sort((a, b) => a - b);
                const sortedCorrectAnswer = [...correctIndices].sort((a, b) => a - b);
                
                // Check if arrays are equal
                isCorrect = sortedUserAnswer.length === sortedCorrectAnswer.length &&
                    sortedUserAnswer.every((value, idx) => value === sortedCorrectAnswer[idx]);
                    
            } else if (question.type === 'fill') {
                // For fill in the blank, compare lowercase answers
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
}

// Update the results display
function updateResultsDisplay() {
    const totalQuestions = quizQuestions.length;
    const percentage = Math.round((window.correctAnswersCount / totalQuestions) * 100);
    
    // Update score cards
    correctCount.textContent = window.correctAnswersCount;
    incorrectCount.textContent = window.incorrectAnswersCount;
    totalScore.textContent = score;
    
    // Update percentage and circle animation
    scorePercentage.textContent = `${percentage}%`;
    
    // Animate the circle
    const circleCircumference = 565.48; // 2 * π * r (r = 90)
    const offset = circleCircumference - (percentage / 100) * circleCircumference;
    
    // Reset circle first
    scoreCircle.style.strokeDashoffset = circleCircumference;
    
    // Animate to new position
    setTimeout(() => {
        scoreCircle.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
        scoreCircle.style.strokeDashoffset = offset;
    }, 300);
    
    // Update circle color based on percentage
    if (percentage >= 80) {
        scoreCircle.style.stroke = '#00b894'; // Green
    } else if (percentage >= 60) {
        scoreCircle.style.stroke = '#fdcb6e'; // Yellow
    } else if (percentage >= 40) {
        scoreCircle.style.stroke = '#e17055'; // Orange
    } else {
        scoreCircle.style.stroke = '#d63031'; // Red
    }
}

// Check if the current score is a high score
function checkHighScore() {
    const currentHighScore = parseInt(localStorage.getItem('quizHighScore') || 0);
    
    if (score > currentHighScore) {
        // New high score!
        saveHighScore(score);
        newHighScore.textContent = score;
        highScoreUpdate.style.display = 'flex';
    } else {
        highScoreUpdate.style.display = 'none';
    }
}

// Restart the quiz
function restartQuiz() {
    playClickSound();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    
    // Show quiz screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Display first question
    displayQuestion();
    
    // Start timer if enabled
    if (timerPerQuestion > 0) {
        startTimer();
    }
}

// Review answers (go back to quiz screen)
function reviewAnswers() {
    playClickSound();
    
    // Go to first question
    currentQuestionIndex = 0;
    
    // Show quiz screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Display first question with answers highlighted
    displayQuestion();
    highlightCorrectAnswers();
    
    // Disable timer and navigation for review mode
    resetTimer();
    prevBtn.disabled = false;
    nextBtn.disabled = false;
    submitQuizBtn.style.display = 'none';
}

// Highlight correct and incorrect answers in review mode
function highlightCorrectAnswers() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];
    
    // Clear any previous feedback
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback';
    
    if (userAnswer !== null) {
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Get correct indices
            const correctIndices = currentQuestion.options
                .map((opt, idx) => currentQuestion.correctAnswer.includes(opt) ? idx : -1)
                .filter(idx => idx !== -1);
            
            // Highlight all options
            document.querySelectorAll('.option').forEach((optionElement, index) => {
                const isUserSelected = userAnswer.includes(index);
                const isCorrect = correctIndices.includes(index);
                
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
            const isCorrect = JSON.stringify([...userAnswer].sort()) === JSON.stringify([...correctIndices].sort());
            if (isCorrect) {
                feedbackMessage.textContent = 'Correct!';
                feedbackMessage.className = 'feedback correct';
            } else {
                feedbackMessage.textContent = 'Incorrect. The correct answer is highlighted.';
                feedbackMessage.className = 'feedback incorrect';
            }
            
        } else if (currentQuestion.type === 'fill') {
            // For fill in the blank
            const userAnswerText = userAnswer[0].toLowerCase().trim();
            const isCorrect = currentQuestion.correctAnswer.some(correct => 
                correct.toLowerCase() === userAnswerText
            );
            
            if (isCorrect) {
                feedbackMessage.textContent = 'Correct!';
                feedbackMessage.className = 'feedback correct';
            } else {
                feedbackMessage.textContent = `Incorrect. The correct answer is: ${currentQuestion.correctAnswer[0]}`;
                feedbackMessage.className = 'feedback incorrect';
            }
            
            // Disable interaction
            fillInAnswer.disabled = true;
            submitFillAnswer.disabled = true;
        }
    } else {
        // No answer provided
        feedbackMessage.textContent = `You didn't answer this question. The correct answer is: ${currentQuestion.correctAnswer.join(', ')}`;
        feedbackMessage.className = 'feedback incorrect';
        
        if (currentQuestion.type === 'single' || currentQuestion.type === 'multiple') {
            // Highlight correct answers
            const correctIndices = currentQuestion.options
                .map((opt, idx) => currentQuestion.correctAnswer.includes(opt) ? idx : -1)
                .filter(idx => idx !== -1);
            
            correctIndices.forEach(index => {
                const optionElement = document.querySelector(`.option[data-index="${index}"]`);
                if (optionElement) {
                    optionElement.classList.add('correct');
                    optionElement.querySelector('.option-icon').innerHTML = '<i class="fas fa-check"></i>';
                }
            });
            
            // Disable interaction
            document.querySelectorAll('.option').forEach(optionElement => {
                optionElement.style.pointerEvents = 'none';
                optionElement.querySelector('input').disabled = true;
            });
        } else if (currentQuestion.type === 'fill') {
            // Disable interaction
            fillInAnswer.disabled = true;
            submitFillAnswer.disabled = true;
        }
    }
}

// Go back to category selection
function goToCategories() {
    playClickSound();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = [];
    score = 0;
    
    // Show welcome screen
    resultsScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    welcomeScreen.classList.add('active');
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
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => console.log("Audio play failed:", e));
}

function playCorrectSound() {
    correctSound.currentTime = 0;
    correctSound.play().catch(e => console.log("Audio play failed:", e));
}

function playIncorrectSound() {
    incorrectSound.currentTime = 0;
    incorrectSound.play().catch(e => console.log("Audio play failed:", e));
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', init);