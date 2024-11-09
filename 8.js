// Set of questions for the survey
const questions = [
    { 
        question: "What is your favorite color?", 
        type: "radio", 
        options: ["Red", "Blue", "Green", "Yellow"] 
    },
    { 
        question: "How often do you exercise?", 
        type: "radio", 
        options: ["Every day", "Few times a week", "Rarely", "Never"] 
    },
    { 
        question: "What is your favorite programming language?", 
        type: "checkbox", 
        options: ["JavaScript", "Python", "Java", "C++"] 
    },
    { 
        question: "Do you enjoy traveling?", 
        type: "radio", 
        options: ["Yes", "No"] 
    },
    { 
        question: "How many hours per day do you spend on social media?", 
        type: "radio", 
        options: ["Less than 1 hour", "1-2 hours", "3-4 hours", "More than 4 hours"] 
    },
    { 
        question: "What is your preferred mode of transportation?", 
        type: "radio", 
        options: ["Car", "Bike", "Public Transport", "Walking"] 
    },
    { 
        question: "What is your current occupation?", 
        type: "radio", 
        options: ["Student", "Employee", "Freelancer", "Unemployed"] 
    },
    { 
        question: "Do you like reading books?", 
        type: "radio", 
        options: ["Yes", "No"] 
    }
];

// Function to randomly select 5 questions
function getRandomQuestions() {
    const selectedQuestions = [];
    const usedIndices = new Set();
    while (selectedQuestions.length <=6) {
        const index = Math.floor(Math.random() * questions.length);
        if (!usedIndices.has(index)) {
            selectedQuestions.push(questions[index]);
            usedIndices.add(index);
        }
    }
    return selectedQuestions;
}

// Function to generate and display the survey questions
function generateSurveyForm() {
    const surveyForm = document.getElementById('surveyForm');
    const randomQuestions = getRandomQuestions();

    randomQuestions.forEach((q, index) => {
        const questionCard = document.createElement('div');
        questionCard.classList.add('question-card');
        questionCard.id = `question-${index}`;

        const questionText = document.createElement('h3');
        questionText.classList.add('question-text');
        questionText.textContent = q.question;
        questionCard.appendChild(questionText);

        q.options.forEach((option, optIndex) => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = q.type;
            input.name = `question${index}`;
            input.value = option;
            input.id = `q${index}-opt${optIndex}`;

            label.appendChild(input);
            label.appendChild(document.createTextNode(option));
            questionCard.appendChild(label);
            questionCard.appendChild(document.createElement('br'));
        });

        surveyForm.appendChild(questionCard);
    });

    document.getElementById('question-0').style.display = "block"; // Show first question
}

// Global variables to track progress
let currentQuestionIndex = 0;
const totalQuestions = 6;

// Function to show the next question and update the progress bar
function nextQuestion() {
    const currentQuestion = document.getElementById(`question-${currentQuestionIndex}`);
    currentQuestion.style.display = "none"; // Hide current question

    currentQuestionIndex++;

    if (currentQuestionIndex < totalQuestions) {
        const nextQuestion = document.getElementById(`question-${currentQuestionIndex}`);
        nextQuestion.style.display = "block"; // Show next question
        updateProgress();
    } else {
        document.getElementById('nextBtn').style.display = "none";
        document.getElementById('submitBtn').style.display = "block";
        document.getElementById('thankYouMessage').style.display = "block";
    }
}

// Function to update the progress bar as user advances through the questions
function updateProgress() {
    const progress = (currentQuestionIndex / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Function to handle survey submission
function submitSurvey() {
    const form = document.getElementById('surveyForm');
    const formData = new FormData(form);
    let resultMessage = "Thank you for completing the survey!\n\nYour answers:\n";

    formData.forEach((value, key) => {
        resultMessage += `${key}: ${value}\n`;
    });

    // Display the result
    alert(resultMessage);
    document.getElementById('thankYouMessage').innerHTML = `<h2>Survey Submitted!</h2><p>Thanks again for participating.</p>`;
    document.getElementById('submitBtn').disabled = true; // Disable submit button after submission
}

// Initialize the survey form when the page loads
generateSurveyForm();
