/**
 * DSIMA Training Quiz - Logic & Firebase Integration
 */

import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./firebase-config.js";

// State
let quizQuestions = []; // Filtered questions will go here
let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;
let userName = "";
let userLocation = "";
let isSubmitting = false;

// Session-to-Question-Index Mapping (0-indexed)
const sessionMap = {
    1: { name: "Data-Driven Leadership", ranges: [[0, 11]] }
};

/**
 * Utility to shuffle an array
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Utility for Proper Casing
 */
function toProperCase(str) {
    if (!str) return "";
    return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

/**
 * Filter questions based on session parameter
 */
function initializeQuizContent() {
    const params = new URLSearchParams(window.location.search);
    const sessionNum = parseInt(params.get('session')) || 0;

    let filtered = [];
    let sessionName = "Aviation Leadership";

    if (sessionMap[sessionNum]) {
        sessionName = sessionMap[sessionNum].name;
        sessionMap[sessionNum].ranges.forEach(range => {
            for (let i = range[0]; i <= range[1]; i++) {
                if (allQuestions[i]) filtered.push(allQuestions[i]);
            }
        });
    } else {
        filtered = [...allQuestions];
    }

    // Shuffle and pick 12 questions (which is the full bank)
    shuffle(filtered);
    quizQuestions = filtered.slice(0, 12);

    // Update UI Header
    const headerTitle = document.querySelector('.quiz-header h1');
    const headerDesc = document.querySelector('.quiz-header p');
    if (headerTitle) headerTitle.innerText = sessionNum > 0 ? `Session ${sessionNum} Quiz` : "Data-Driven Leadership Quiz";
    if (headerDesc) headerDesc.innerText = sessionName;
}

// DSIMA Questions bank
const allQuestions = [
    {
        question: "What is the primary value of data in modern aviation?",
        options: [
            "To replace the experience of commanders",
            "To provide evidence that supports better operational decisions",
            "To eliminate the need for human judgement",
            "To automate every aviation process"
        ],
        correct: 1,
        explanation: "Data provides the empirical evidence to guide and validate critical operational decisions in aviation."
    },
    {
        question: "Which statement best describes the relationship between Data, Information and Intelligence?",
        options: [
            "They all mean exactly the same thing",
            "Data is analysed into information, while intelligence adds context to support action",
            "Intelligence is raw data collected from aircraft",
            "Information is always more accurate than data"
        ],
        correct: 1,
        explanation: "Data consists of raw facts. Information is structured data. Intelligence goes further by applying analysis and context to enable action."
    },
    {
        question: "A squadron reports that it flew 420 flight hours in July. What does this represent?",
        options: [
            "Data",
            "Information",
            "Intelligence",
            "Prescriptive analytics"
        ],
        correct: 1,
        explanation: "420 flight hours in July is information because it organizes raw flight logs into a meaningful context (a specific squadron and timeframe)."
    },
    {
        question: "A commander discovers that aircraft availability dropped from 78% to 61% over three months. Which type of analytics is being used when the commander asks: 'Why did availability decline?'",
        options: [
            "Descriptive",
            "Diagnostic",
            "Predictive",
            "Prescriptive"
        ],
        correct: 1,
        explanation: "Diagnostic analytics focuses on understanding the root causes behind past events ('Why did it happen?')."
    },
    {
        question: "Which question represents predictive analytics?",
        options: [
            "How many aircraft were available last month?",
            "Why did aircraft availability decline?",
            "Which aircraft is most likely to experience a maintenance issue next month?",
            "Which aircraft should we ground today?"
        ],
        correct: 2,
        explanation: "Predictive analytics forecasts future occurrences based on historical patterns."
    },
    {
        question: "Which question represents prescriptive analytics?",
        options: [
            "What happened to fuel consumption?",
            "Why did fuel consumption increase?",
            "What will fuel consumption be next month?",
            "Given the fuel shortage, which missions should be prioritised?"
        ],
        correct: 3,
        explanation: "Prescriptive analytics recommends specific courses of action in response to scenarios ('What should we do?')."
    },
    {
        question: "Scenario Question: A commander receives two reports:<br><br><b>Report A:</b><br>Aircraft availability = 58%<br><br><b>Report B:</b><br>Aircraft availability declined from 76% to 58%, with 65% of the downtime linked to three recurring defects.<br><br>Which report provides greater analytical value?",
        options: [
            "Report A, because it is simpler",
            "Report B, because it provides context and helps identify where action may be required",
            "Both provide exactly the same information",
            "Neither report is useful"
        ],
        correct: 1,
        explanation: "Report B provides context, trends, and actionable root cause details, making it significantly more valuable for command decisions."
    },
    {
        question: "Why is data quality important in aviation decision-making?",
        options: [
            "It makes dashboards look better",
            "It reduces the need for commanders",
            "Poor-quality data can produce misleading analysis and poor decisions",
            "It increases the amount of data available"
        ],
        correct: 2,
        explanation: "Poor data quality leads to flawed insights and incorrect conclusions, which is dangerous in mission-critical aviation operations."
    },
    {
        question: "Which of the following is NOT a characteristic of good operational data?",
        options: [
            "Accurate",
            "Complete",
            "Timely",
            "Complicated"
        ],
        correct: 3,
        explanation: "Good operational data should be clear and accessible, not unnecessarily complicated."
    },
    {
        question: "What is the main purpose of data governance?",
        options: [
            "To prevent personnel from using data",
            "To establish ownership, accountability, standards and appropriate use of data",
            "To replace operational commanders",
            "To make every dataset public"
        ],
        correct: 1,
        explanation: "Data governance ensures data availability, integrity, security, and usability by setting policies, rules, and responsibilities."
    },
    {
        question: "Command Scenario: A commander is told: 'The squadron is fully ready for operations.' However, the dashboard shows: Aircraft Availability: 54%, Pilot Currency: 68%, Fuel Reserve: 42%, Maintenance Backlog: High. What should the commander do?",
        options: [
            "Ignore the dashboard because the squadron commander said they are ready",
            "Accept the report without question",
            "Investigate the discrepancy and use the available evidence to assess actual readiness",
            "Immediately cancel all operations"
        ],
        correct: 2,
        explanation: "A commander uses dashboard data as a support tool to ask critical questions, cross-reference reports, and make a balanced, evidence-based judgment."
    },
    {
        question: "Which statement best captures the role of a commander in a data-driven organisation?",
        options: [
            "The commander must become a programmer",
            "The commander should rely entirely on algorithms",
            "The commander should understand enough about data to ask the right questions, interpret evidence and make informed decisions",
            "Data analysts should make all operational decisions"
        ],
        correct: 2,
        explanation: "The commander does not need to write code but must have sufficient data literacy to interpret evidence, challenge assumptions, and make final decisions."
    }
];

// --- Initialization and Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    const viewAnswersBtn = document.getElementById('viewAnswersBtn');
    const registrationForm = document.getElementById('registrationForm');
    const quizInterface = document.getElementById('quizInterface');

    // Load Quiz Data
    initializeQuizContent();

    // Start Quiz Button
    startBtn.addEventListener('click', () => {
        userName = document.getElementById('userName').value.trim();
        userLocation = document.getElementById('userLocation').value.trim();

        if (userName && userLocation) {
            if (quizQuestions.length === 0) {
                alert("There is no quiz questions loaded.");
                return;
            }
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
            training: "dsima",
            name: toProperCase(userName),
            location: toProperCase(userLocation),
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
        alert("Firebase Error: " + e.message);
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
