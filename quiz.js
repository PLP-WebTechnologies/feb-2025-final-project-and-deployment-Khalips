const quizQuestions = [
    {
        question: "What is the largest part of the brain?",
        options: ["Cerebellum", "Brainstem", "Cerebrum", "Neuron"],
        answer: 2
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
let userAnswers = [];

function loadQuestion() {
    const quizDiv = document.getElementById('quiz');
    const question = quizQuestions[currentQuestion];
    
    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `
            <div class="option" onclick="selectOption(${index})">
                ${option}
            </div>
        `;
    });
    
    quizDiv.innerHTML = `
        <div class="question">
            <h3>Question ${currentQuestion + 1}: ${question.question}</h3>
            <div class="options">
                ${optionsHtml}
            </div>
        </div>
    `;
}

function selectOption(index) {
    // Remove selected class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selected class to clicked option
    options[index].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestion] = index;
}

function checkAnswers() {
    // Calculate score
    score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.answer) {
            score++;
        }
    });
    
    // Display results
    const resultsDiv = document.getElementById('results');
    const scoreMessage = document.getElementById('score-message');
    const resultMessage = document.getElementById('result-message');
    
    scoreMessage.textContent = `You got ${score} out of ${quizQuestions.length} correct!`;
    
    if (score === quizQuestions.length) {
        resultMessage.textContent = "You're a Body Genius! 🌟";
    } else if (score >= quizQuestions.length * 0.7) {
        resultMessage.textContent = "Great job! You know a lot about the body! 👍";
    } else if (score >= quizQuestions.length * 0.4) {
        resultMessage.textContent = "Good try! Keep learning! 😊";
    } else {
        resultMessage.textContent = "Nice try! Explore BioBuddy more and try again! 🌱";
    }
    
    resultsDiv.style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('try-again-btn').style.display = 'block';
}

function tryAgain() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    document.getElementById('results').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'block';
    document.getElementById('try-again-btn').style.display = 'none';
    
    loadQuestion();
}

// Initialize quiz
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
    
    document.getElementById('submit-btn').addEventListener('click', checkAnswers);
    document.getElementById('try-again-btn').addEventListener('click', tryAgain);
});