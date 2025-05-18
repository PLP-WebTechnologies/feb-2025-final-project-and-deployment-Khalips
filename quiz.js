// quiz.js
const quizQuestions = [
    {
        question: "What is the largest part of the brain?",
        options: ["Cerebellum", "Brainstem", "Cerebrum", "Neuron"],
        answer: 2 // Index of correct answer (0-based)
    },
    {
        question: "How many chambers does the heart have?",
        options: ["2", "3", "4", "5"],
        answer: 2
    },
    {
        question: "What is the smallest bone in the human body?",
        options: ["Finger bone", "Toe bone", "Stirrup in ear", "Nose bone"],
        answer: 2
    },
    {
        question: "What do muscles do when they work?",
        options: ["Contract and relax", "Stay still", "Only contract", "Only relax"],
        answer: 0
    },
    {
        question: "What does blood carry to your body parts?",
        options: ["Only oxygen", "Only nutrients", "Oxygen and nutrients", "Water only"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = Array(quizQuestions.length).fill(null);

function loadQuestion() {
    const quizDiv = document.getElementById('quiz');
    const question = quizQuestions[currentQuestion];
    
    // Update progress indicator
    document.getElementById('progress').textContent = 
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
    
    let optionsHtml = question.options.map((option, index) => `
        <div class="option" data-index="${index}">
            ${option}
        </div>
    `).join('');
    
    quizDiv.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${optionsHtml}
            </div>
        </div>
    `;
    
    // Highlight previously selected answer if exists
    if (userAnswers[currentQuestion] !== null) {
        const options = document.querySelectorAll('.option');
        options[userAnswers[currentQuestion]].classList.add('selected');
    }
    
    // Add click event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            this.classList.add('selected');
            userAnswers[currentQuestion] = parseInt(this.getAttribute('data-index'));
            
            // Enable next button
            document.getElementById('next-btn').disabled = false;
        });
    });
    
    // Update button states
    document.getElementById('prev-btn').disabled = currentQuestion === 0;
    document.getElementById('next-btn').disabled = userAnswers[currentQuestion] === null;
    document.getElementById('submit-btn').style.display = 
        currentQuestion === quizQuestions.length - 1 ? 'block' : 'none';
}

function navigateQuestions(direction) {
    if (direction === 'next' && currentQuestion < quizQuestions.length - 1) {
        currentQuestion++;
    } else if (direction === 'prev' && currentQuestion > 0) {
        currentQuestion--;
    }
    loadQuestion();
}

function showResults() {
    // Calculate score
    score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });
    
    // Display results
    document.getElementById('quiz').innerHTML = `
        <div class="results">
            <h2>Quiz Completed!</h2>
            <p id="score-message">You got ${score} out of ${quizQuestions.length} correct!</p>
            <p id="result-message">
                ${score === quizQuestions.length ? "Perfect! You're a Body Genius! " :
                 score >= quizQuestions.length * 0.7 ? "Great job! " :
                 score >= quizQuestions.length * 0.4 ? "Good try! " :
                 "Keep learning! "}
            </p>
            <button id="try-again-btn">Try Again</button>
        </div>
    `;
    
    document.getElementById('try-again-btn').addEventListener('click', () => {
        currentQuestion = 0;
        score = 0;
        userAnswers = Array(quizQuestions.length).fill(null);
        loadQuestion();
        document.getElementById('navigation').style.display = 'flex';
    });
}

// Initialize the quiz
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    
    document.getElementById('prev-btn').addEventListener('click', () => navigateQuestions('prev'));
    document.getElementById('next-btn').addEventListener('click', () => navigateQuestions('next'));
    document.getElementById('submit-btn').addEventListener('click', () => {
        document.getElementById('navigation').style.display = 'none';
        showResults();
    });
});