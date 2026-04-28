/**
 * JCI Training Quiz - Logic & Firebase Integration
 */

import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

// Questions Bank
const quizQuestions = [
    {
        question: "Which Excel function would you use to add all numbers in a range (e.g., A1 to A10)?",
        options: ["=ADD(A1:A10)", "=SUM(A1:A10)", "=TOTAL(A1:A10)", "=SUMMATION(A1:A10)"],
        correct: 1,
        explanation: "The =SUM() function is the standard way to add a range of cells in Excel."
    },
    {
        question: "What does the '$' symbol do when used in a cell reference like '$A$1'?",
        options: ["It formats the cell as Currency", "It locks the cell reference (Absolute Reference)", "It makes the formula hidden", "It increases the value by 10%"],
        correct: 1,
        explanation: "The dollar sign locks the reference so it doesn't change when copied or dragged."
    },
    {
        question: "If you want to find the mathematical mean of a dataset, which function should you use?",
        options: ["=MEAN()", "=MEDIAN()", "=AVERAGE()", "=SUM()/COUNT()"],
        correct: 2,
        explanation: "The =AVERAGE() function calculates the arithmetic mean."
    },
    {
        question: "How do you cycle through relative, absolute, and mixed references quickly on your keyboard?",
        options: ["Press F1", "Press F2", "Press F4", "Press CTRL + R"],
        correct: 2,
        explanation: "Pressing F4 while a cell reference is selected in a formula cycles through the lock types."
    },
    {
        question: "Which of these is a 'Mixed Reference' that locks the COLUMN but allows the ROW to move?",
        options: ["$A$1", "A$1", "$A1", "A1"],
        correct: 2,
        explanation: "$A1 locks the column (A) because the $ is immediately to the left of the A."
    },
    {
        question: "What is the correct order of arguments for the IF function?",
        options: ["=IF(value_if_true, value_if_false, logical_test)", "=IF(logical_test, value_if_true, value_if_false)", "=IF(logical_test, value_if_false, value_if_true)", "=IF(range, criteria, result)"],
        correct: 1,
        explanation: "The syntax is: Logical Test, then what to do if True, then what to do if False."
    },
    {
        question: "You want to count how many times 'Lagos' appears in a column. Which function is best?",
        options: ["=COUNT()", "=COUNTA()", "=COUNTIF()", "=SUMIF()"],
        correct: 2,
        explanation: "=COUNTIF() counts cells based on a single condition."
    },
    {
        question: "In =SUMIF(B2:B10, 'Kano', H2:H10), what does 'H2:H10' represent?",
        options: ["The range to check for 'Kano'", "The criteria", "The range of numbers to actually sum", "The result column"],
        correct: 2,
        explanation: "The third argument in SUMIF is the 'sum_range'—the actual numbers to be added."
    },
    {
        question: "Which function would transform 'kano' or 'PORT HARCOURT' into 'Kano' or 'Port Harcourt'?",
        options: ["=UPPER()", "=LOWER()", "=PROPER()", "=TEXT()"],
        correct: 2,
        explanation: "=PROPER() capitalizes the first letter of each word and lowers the rest."
    },
    {
        question: "What does the =TRIM() function do?",
        options: ["It deletes the entire cell content", "It removes extra spaces from the start, end, and middle (leaving single spaces)", "It cuts the text to 10 characters", "It removes all numbers from the text"],
        correct: 1,
        explanation: "=TRIM() is essential for cleaning 'phantom' spaces that break formulas like VLOOKUP."
    },
    {
        question: "To extract the first 3 letters from a code in cell A2, which formula is correct?",
        options: ["=MID(A2, 1, 3)", "=LEFT(A2, 3)", "=RIGHT(A2, 3)", "Both A and B"],
        correct: 3,
        explanation: "=LEFT(A2, 3) is the direct way, but =MID(A2, 1, 3) also works. However, LEFT is more common for prefixes."
    },
    {
        question: "If you have a code 'PHC-2023-SLS' in A2, how do you extract the year '2023'?",
        options: ["=LEFT(A2, 4)", "=RIGHT(A2, 4)", "=MID(A2, 5, 4)", "=SUBSTITUTE(A2, '-', '')"],
        correct: 2,
        explanation: "The year starts at character 5 and is 4 characters long, so =MID(A2, 5, 4) is correct."
    },
    {
        question: "What does the 'E' in ETL stand for in Data Analysis?",
        options: ["Edit", "Extract", "Evaluate", "Execute"],
        correct: 1,
        explanation: "ETL stands for Extract, Transform, and Load."
    },
    {
        question: "What is the primary benefit of using Power Query for data cleaning?",
        options: ["It makes Excel look better", "It automates the steps so you can 'Refresh' them later", "It allows you to play games in Excel", "It makes formulas run slower"],
        correct: 1,
        explanation: "Power Query records your steps so you don't have to repeat manual cleaning every time data changes."
    },
    {
        question: "Does formatting a cell (e.g., changing to Currency) change the actual numerical value used in math?",
        options: ["Yes, always", "No, it only changes how the data looks", "Only if you use a Mac", "Only for the SUM function"],
        correct: 1,
        explanation: "Formatting is purely visual; the underlying value remains the same for calculations."
    },
    {
        question: "What does the principle 'GIGO' stand for?",
        options: ["Great Input, Great Output", "Garbage In, Garbage Out", "Go In, Go Out", "General Input, General Output"],
        correct: 1,
        explanation: "Garbage In, Garbage Out means if your raw data is messy/wrong, your analysis results will also be wrong."
    },
    {
        question: "Which function returns the SMALLEST value in a range?",
        options: ["=SMALL()", "=MIN()", "=LOW()", "=BOTTOM()"],
        correct: 1,
        explanation: "=MIN() returns the minimum value in a range."
    },
    {
        question: "In the formula =COUNTIF(A1:A5, '>10'), what is being counted?",
        options: ["Cells equal to 10", "Cells with text '10'", "Cells containing numbers greater than 10", "All cells"],
        correct: 2,
        explanation: "The criteria '>10' tells Excel to count only numbers strictly greater than 10."
    },
    {
        question: "Which function is used to extract characters from the END of a string?",
        options: ["=END()", "=LAST()", "=RIGHT()", "=BACK()"],
        correct: 2,
        explanation: "=RIGHT(text, num_chars) grabs text from the right edge."
    },
    {
        question: "What is the 'Transform' stage of ETL mainly about?",
        options: ["Moving data to a database", "Downloading data from the internet", "Cleaning, reformatting, and preparing the data", "Deleting the data"],
        correct: 2,
        explanation: "Transforming is where you fix the 'garbage' in your data before loading it for analysis."
    }
];


// State
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let userName = "";
let userLocation = "";
let isSubmitting = false; // Anti-spam flag

// Initialize UI Elements
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const quizInterface = document.getElementById('quizInterface');
    const resultsSection = document.getElementById('resultsSection');
    
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const viewAnswersBtn = document.getElementById('viewAnswersBtn');
    
    // Start Quiz
    startBtn.addEventListener('click', () => {
        userName = document.getElementById('userName').value.trim();
        userLocation = document.getElementById('userLocation').value.trim();
        
        if (userName && userLocation) {
            registrationForm.classList.add('hidden');
            quizInterface.classList.remove('hidden');
            showQuestion();
        } else {
            alert("Please enter both your name and location to begin.");
        }
    });

    // Back Question
    backBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion();
        }
    });

    // Next Question
    nextBtn.addEventListener('click', () => {
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
            alert("Please select an answer!");
            return;
        }

        const answerIndex = parseInt(selectedOption.dataset.index);
        
        // Update or add answer
        userAnswers[currentQuestionIndex] = answerIndex;

        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            // Calculate final score before finishing
            score = userAnswers.reduce((total, ans, idx) => {
                return total + (ans === quizQuestions[idx].correct ? 1 : 0);
            }, 0);
            finishQuiz();
        }
    });

    // View Detailed Answers
    viewAnswersBtn.addEventListener('click', () => {
        showReview();
    });
});

function showQuestion() {
    const q = quizQuestions[currentQuestionIndex];
    const container = document.getElementById('questionContainer');
    const progress = document.getElementById('progressBar');
    const counter = document.getElementById('questionCounter');
    const backBtn = document.getElementById('backBtn');

    // Handle Back Button Visibility
    if (currentQuestionIndex > 0) {
        backBtn.classList.remove('hidden');
    } else {
        backBtn.classList.add('hidden');
    }

    // Update Progress
    const percent = ((currentQuestionIndex) / quizQuestions.length) * 100;
    progress.style.width = `${percent}%`;
    counter.innerText = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

    // Update Content
    const savedAnswer = userAnswers[currentQuestionIndex];
    
    container.innerHTML = `
        <div class="question-card animate-in">
            <h2>${q.question}</h2>
            <div class="options-list">
                ${q.options.map((opt, i) => `
                    <div class="option ${savedAnswer === i ? 'selected' : ''}" data-index="${i}">
                        <div class="option-letter">${String.fromCharCode(65 + i)}</div>
                        <div class="option-text">${opt}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Option Selection
    const options = container.querySelectorAll('.option');
    options.forEach(opt => {
        opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
        });
    });
}

async function finishQuiz() {
    if (isSubmitting) return; // Prevent double clicks
    isSubmitting = true;

    // Show loading state
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.innerHTML = `<i class="ri-loader-4-line animate-spin"></i> Saving...`;
    }

    document.getElementById('quizInterface').classList.add('hidden');
    document.getElementById('resultsSection').classList.remove('hidden');
    
    const displayScore = document.getElementById('finalScore');
    displayScore.innerText = score;
    document.getElementById('totalQuestions').innerText = quizQuestions.length;

    // Save to Firebase
    try {
        console.log("Attempting to save to Firebase...", { db, userName, score });
        
        const docRef = await addDoc(collection(db, "quiz_results"), {
            name: userName,
            location: userLocation,
            score: score,
            total: quizQuestions.length,
            results: userAnswers.map((ans, i) => ({
                question: quizQuestions[i].question,
                userChoice: quizQuestions[i].options[ans],
                correctChoice: quizQuestions[i].options[quizQuestions[i].correct],
                isCorrect: ans === quizQuestions[i].correct
            })),
            timestamp: serverTimestamp()
        });
        
        console.log("Result saved successfully! Doc ID:", docRef.id);
    } catch (e) {
        console.error("FULL FIREBASE ERROR:", e);
        alert("Firebase Error: " + e.message + "\n\nCheck if your Firestore is enabled and rules are set to 'allow create'.");
    }
}

function showReview() {
    const reviewContainer = document.getElementById('reviewContainer');
    const reviewList = document.getElementById('reviewList');
    
    reviewContainer.classList.remove('hidden');
    document.getElementById('viewAnswersBtn').classList.add('hidden');

    reviewList.innerHTML = quizQuestions.map((q, i) => {
        const isCorrect = userAnswers[i] === q.correct;
        return `
            <div class="review-item animate-in" style="animation-delay: ${i * 0.1}s">
                <div class="status-badge ${isCorrect ? 'status-correct' : 'status-incorrect'}">
                    ${isCorrect ? 'Correct' : 'Incorrect'}
                </div>
                <h3>${i + 1}. ${q.question}</h3>
                <p style="margin-top: 10px;"><strong>Your Answer:</strong> ${q.options[userAnswers[i]]}</p>
                ${!isCorrect ? `<p class="correct-answer-text"><strong>Correct Answer:</strong> ${q.options[q.correct]}</p>` : ''}
                <p style="margin-top: 10px; font-size: 0.9rem; color: var(--text-muted); font-style: italic;">
                    ${q.explanation}
                </p>
            </div>
        `;
    }).join('');
}
