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
    1: { name: "Data-Driven Leadership", ranges: [[0, 11]] },
    2: { name: "Excel Cleaning & Analysis", ranges: [[12, 23]] },
    3: { name: "Executive Dashboard", ranges: [[24, 35]] }
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

    // Shuffle and pick 12 questions
    shuffle(filtered);
    quizQuestions = filtered.slice(0, 12);

    // Update UI Header
    const headerTitle = document.querySelector('.quiz-header h1');
    const headerDesc = document.querySelector('.quiz-header p');
    if (headerTitle) headerTitle.innerText = "Data-Driven Leadership Quiz";
    if (headerDesc) headerDesc.innerText = sessionNum > 0 ? `Session ${sessionNum}` : "Aviation Leadership";
}

// DSIMA Questions bank - Revised to match Day 1 slides exactly
const allQuestions = [
    {
        question: "Which definition best describes Data Science?",
        options: [
            "A technical coding paradigm with no business application",
            "The process of collecting, organizing, analyzing, and interpreting data to support better decisions",
            "A system that automates decisions to eliminate human commanders",
            "The study of crude oil refining processes"
        ],
        correct: 1,
        explanation: "As defined in Slide 4, Data Science is the process of collecting, organizing, analyzing, and interpreting data to support better decisions."
    },
    {
        question: "Which industrial revolution phase is characterized by Artificial Intelligence (AI) and Big Data?",
        options: [
            "The First Industrial Revolution",
            "The Second Industrial Revolution",
            "The Third Industrial Revolution",
            "The Fourth Industrial Revolution (4IR)"
        ],
        correct: 3,
        explanation: "Slide 3 highlights that the Fourth Industrial Revolution (4IR) is the phase centered on Artificial Intelligence & Big Data."
    },
    {
        question: "Why is data compared to 'Crude Oil' in modern aviation management?",
        options: [
            "It is thick and clutters engines in its raw state",
            "It is expensive to buy and sell on the open market",
            "It has little value until it is cleaned, analyzed, and refined into action",
            "It is used primarily as a fuel source for aircraft"
        ],
        correct: 2,
        explanation: "Slide 6 notes that like crude oil, raw data has little value until it is cleaned, analyzed, and refined to support operational decisions."
    },
    {
        question: "In the context of the Tucano fuel remaining example, what does the unstructured value '5000' represent?",
        options: [
            "Raw Data",
            "Information",
            "Intelligence",
            "Analytics Continuum"
        ],
        correct: 0,
        explanation: "Slide 9 indicates that raw data represents unstructured values and metrics in isolation with zero situational context."
    },
    {
        question: "The statement 'The Tucano currently has 5000 kg of fuel remaining' represents which level of the data hierarchy?",
        options: [
            "Raw Data",
            "Information",
            "Intelligence",
            "Prescriptive Analytics"
        ],
        correct: 1,
        explanation: "Slide 9 explains that Information is processed and refined data that has context and meaning (e.g. knowing the value refers to a Tucano's fuel)."
    },
    {
        question: "An aviation commander determines: 'The Tucano can safely reach base with a 45-minute reserve.' Under the hierarchy, what is this considered?",
        options: [
            "Raw Data",
            "Information",
            "Intelligence",
            "Descriptive Analytics"
        ],
        correct: 2,
        explanation: "Intelligence is information put into action and used as the backbone of operational decisions (Slide 9)."
    },
    {
        question: "A leader expects clear data standards, ownership, accountability, and rules. Which data pillar is this?",
        options: [
            "Data Security",
            "Data Governance",
            "Data Privacy",
            "Data Analytics"
        ],
        correct: 1,
        explanation: "Slide 8 defines Data Governance as establishing clear ownership, standards, accountability, and rules for data."
    },
    {
        question: "Which of the following is NOT one of the six key criteria for operational data quality?",
        options: [
            "Accuracy and Completeness",
            "Consistency and Reliability",
            "Complexity and Length",
            "Timeliness and Relevance"
        ],
        correct: 2,
        explanation: "According to Slide 10, the data quality criteria are Accuracy, Completeness, Consistency, Reliability, Timeliness, and Relevance. Complexity is not a quality standard."
    },
    {
        question: "Under the 'Garbage In, Garbage Out' principle, what is the main consequence of poor data quality?",
        options: [
            "Aircraft maintenance turnaround times will decrease",
            "Data storage costs will immediately double",
            "Unreliable data will cause analytical models and Artificial Intelligence to fail",
            "Weather records will become inaccessible"
        ],
        correct: 2,
        explanation: "Slide 10 highlights that if operational data is unreliable, analytical tools and Artificial Intelligence will fail to work effectively as expected."
    },
    {
        question: "Which KPI represents the aviation leadership principle that 'You can only manage what you measure'?",
        options: [
            "Maintenance Turnaround Time (e.g., 6.4 days)",
            "Total Flight Hours (e.g., 1,284 hrs)",
            "Mission Success Rate (e.g., 94%)",
            "All of the above"
        ],
        correct: 3,
        explanation: "Slide 14 outlines key KPIs (Flight Hours, Success Rate, Maintenance Time, Cost, etc.) to reinforce that leaders must measure what they intend to manage."
    },
    {
        question: "A commander isolates maintenance delays or transit bottlenecks using root-cause analysis to answer: 'Why is aircraft availability declining?' Which type of analytics is this?",
        options: [
            "Descriptive Analytics",
            "Diagnostic Analytics",
            "Predictive Analytics",
            "Prescriptive Analytics"
        ],
        correct: 1,
        explanation: "Diagnostic analytics answers the question 'Why did it happen?' by utilizing root-cause analysis to isolate operational bottlenecks (Slide 15)."
    },
    {
        question: "Which match between an analytical question and its continuum stage is correct?",
        options: [
            "Descriptive: 'Why did hydraulic leaks occur?'",
            "Predictive: 'How many aircraft were available last month?'",
            "Prescriptive: 'Given a fuel shortage, which combat sorties should automated algorithms prioritize?'",
            "Diagnostic: 'Which aircraft will experience maintenance issues next month?'"
        ],
        correct: 2,
        explanation: "Slide 15 identifies Descriptive as 'What happened?', Predictive as forecasting ('What will happen?'), and Prescriptive as recommending actions ('What should we do?') such as automated sorting algorithms."
    },
    {
        question: "What are the three steps in moving from raw operational data to decision-making?",
        options: [
            "Raw Data -> Cleaning & Analysis -> Insights",
            "Raw Data -> Pivot Tables -> Formatting",
            "Data Collection -> Data Entry -> Data Deletion",
            "Programming -> Scripting -> Automation"
        ],
        correct: 0,
        explanation: "Slide 5 states that Excel allows us to move from Raw Data, through Cleaning & Analysis (removing errors, sorting, filtering), to Insights."
    },
    {
        question: "Which part of the Excel interface shows the cell address of the currently active cell (for example, A1)?",
        options: [
            "Title Bar",
            "Formula Bar",
            "Name Box",
            "Scroll Bar"
        ],
        correct: 2,
        explanation: "Slide 14 explains that the Name Box shows the cell address of the currently active cell (e.g., A1)."
    },
    {
        question: "What is the primary purpose of the Formula Bar in Microsoft Excel?",
        options: [
            "To display the name of the active file",
            "To make it easy to view or edit the content or formula inside a cell",
            "To scroll through data horizontally",
            "To switch between multiple sheets"
        ],
        correct: 1,
        explanation: "Slide 13 states that the Formula Bar makes it easy to view or edit what is inside any cell, showing its content or formula."
    },
    {
        question: "In an Excel worksheet, how are columns and rows labelled?",
        options: [
            "Columns are labelled with colors; rows are labelled with letters",
            "Columns are labelled with letters; rows are labelled with digits",
            "Columns are labelled with digits; rows are labelled with letters",
            "Both are labelled with letters only"
        ],
        correct: 1,
        explanation: "Slide 15 shows that Columns are labelled with letters (A, B, C etc.) and Rows/Records are labelled with digits."
    },
    {
        question: "What is a 'cell' in Microsoft Excel?",
        options: [
            "A row of data spanning the entire sheet",
            "A single unit that can hold data or information, referenced by a column letter and row number",
            "A menu tab on the top ribbon",
            "An error message tray"
        ],
        correct: 1,
        explanation: "Slide 18 defines a cell as a single unit that can hold data or information, referenced by the column letter and row number."
    },
    {
        question: "Which feature allows you to see only the data you want to view without deleting or changing the rest of your sheet?",
        options: [
            "Sorting",
            "Formatting",
            "Filtering",
            "Title Bar"
        ],
        correct: 2,
        explanation: "Slide 20 notes that filters let you select and see only the data you want to view without deleting or changing the rest of your sheet."
    },
    {
        question: "What is the process of rearranging rows or columns of data based on specific criteria (like alphabetical, numerical, or dates)?",
        options: [
            "Formatting",
            "Filtering",
            "Sorting",
            "Deleting"
        ],
        correct: 2,
        explanation: "Slide 20 defines sorting as the process of rearranging rows or columns of data based on specific criteria."
    },
    {
        question: "In aviation analysis, which Excel function would you use to calculate the typical or average maintenance turnaround time?",
        options: [
            "=SUM()",
            "=AVERAGE()",
            "=COUNT()",
            "=SUMIF()"
        ],
        correct: 1,
        explanation: "Slide 28 explains that =AVERAGE() finds the typical value, which is useful for average maintenance turnaround time."
    },
    {
        question: "If you want to count the number of aircraft that are currently unserviceable (meeting a specific condition), which function is best?",
        options: [
            "=SUM()",
            "=COUNT()",
            "=COUNTIF()",
            "=SUMIF()"
        ],
        correct: 2,
        explanation: "Slide 28 notes that =COUNTIF() counts records that meet a condition, such as the number of unserviceable aircraft."
    },
    {
        question: "Which function would you use to add up flying hours specifically for a particular squadron or aircraft type based on a condition?",
        options: [
            "=SUM()",
            "=AVERAGE()",
            "=SUMIF() or =SUMIFS()",
            "=COUNTIF()"
        ],
        correct: 2,
        explanation: "Slide 28 explains that =SUMIF() or =SUMIFS() adds values based on conditions, like total flying hours for a particular squadron."
    },
    {
        question: "What is the main benefit of a Pivot Table in Excel?",
        options: [
            "It automatically deletes duplicate rows from the workbook",
            "It allows you to group, sort, and summarize large amounts of raw data into a clear summary table without complex formulas",
            "It protects your file with administrative passwords",
            "It draws 3D flight paths on maps"
        ],
        correct: 1,
        explanation: "Slide 30 explains that a Pivot Table lets you group, sort, and summarize large amounts of raw data into a clear summary table without needing any complex math formulas."
    },
    {
        question: "Which part of the Pivot Table feature is used to select the fields/data that the pivot table will summarize automatically?",
        options: [
            "Pivot Table Field List",
            "Scroll Bar",
            "Formula Bar",
            "Name Box"
        ],
        correct: 0,
        explanation: "Slide 32 notes that the pivot table field list is used to select data that the pivot table will summarize automatically."
    },
    {
        question: "What is the ultimate purpose of analytics?",
        options: [
            "To produce colorful charts and diagrams",
            "To improve decisions",
            "To automate all flight operations",
            "To store large amounts of data in the cloud"
        ],
        correct: 1,
        explanation: "Slide 2 highlights that 'The purpose of analytics is not to produce charts. It is to improve decisions.'"
    },
    {
        question: "What definition best describes an operational dashboard?",
        options: [
            "A computer code editor",
            "A visual summary of important information designed to help leaders monitor performance and identify issues requiring attention",
            "A spreadsheet listing raw, unorganized numbers",
            "A radar system showing aircraft positions in real time"
        ],
        correct: 1,
        explanation: "Slide 3 defines an operational dashboard as a visual summary of important information designed to help leaders monitor performance and identify issues requiring attention."
    },
    {
        question: "A dashboard should aim to reduce the time between which two events?",
        options: [
            "Entering data and saving the file",
            "Seeing a problem and responding to it",
            "Aircraft takeoff and landing",
            "Writing a formula and calculating the sum"
        ],
        correct: 1,
        explanation: "Slide 3 explicitly states: 'A dashboard should reduce the time between seeing a problem and responding to it.'"
    },
    {
        question: "Which section of an operational dashboard provides a quick snapshot of key performance indicators so commanders can understand the current situation at a glance?",
        options: [
            "Slicers Section",
            "KPI Section",
            "Scroll Bar",
            "Title Bar"
        ],
        correct: 1,
        explanation: "Slide 5 states that the KPI section provides a quick snapshot of key performance indicators, allowing commanders to understand the current situation at a glance."
    },
    {
        question: "In an operational logistics dashboard, what is the purpose of Slicers/Filters?",
        options: [
            "To permanently delete unused columns from the spreadsheet",
            "To allow users to focus the dashboard on specific information like a date, squadron, or aircraft type",
            "To speed up the aircraft engine startup time",
            "To calculate the average of a selected range"
        ],
        correct: 1,
        explanation: "Slide 6 explains that Slicers/Filters allow users to focus the dashboard on specific information such as a particular date, squadron, aircraft type, base, or status."
    },
    {
        question: "Which section of the dashboard uses visual summaries to reveal trends, comparisons, patterns, relationships, and exceptions?",
        options: [
            "Title Section",
            "Chart Section",
            "Name Box",
            "Notification Tray"
        ],
        correct: 1,
        explanation: "Slide 7 states that the Chart Section uses charts and visual summaries to reveal trends, comparisons, patterns, relationships, and exceptions."
    },
    {
        question: "What is the key question leaders should ask when reading a dashboard?",
        options: [
            "\"How do I print this chart?\"",
            "\"What does the chart mean?\" instead of only \"What does the chart say?\"",
            "\"Who entered this data?\"",
            "\"Which font style was used?\""
        ],
        correct: 1,
        explanation: "Slide 9 instructs leaders: 'Don't ask only “What does the chart say?” Ask “What does it mean?”'"
    },
    {
        question: "In the dashboard reading framework, which term refers to identifying 'what stands out' in the data?",
        options: [
            "Trend",
            "Status",
            "Exception",
            "Implication"
        ],
        correct: 2,
        explanation: "Slide 9 links 'Exception' to the question: 'What stands out?'"
    },
    {
        question: "If a commander sees a decline in aircraft availability, what should the logical decision-making path be?",
        options: [
            "Delete the dashboard and start over",
            "KPI -> Trend -> Cause -> Implication -> Action",
            "Action -> KPI -> Trend -> Cause",
            "Ignore the trend until next month"
        ],
        correct: 1,
        explanation: "Slide 10 outlines the progression: KPI -> Trend -> Cause -> Implication -> Action (from KPI to Insight)."
    },
    {
        question: "What does a good command recommendation need to be?",
        options: [
            "Complex and detailed",
            "Traceable to evidence",
            "Based purely on intuition",
            "Created without using data"
        ],
        correct: 1,
        explanation: "Slide 12 states that 'A good recommendation is traceable to evidence.'"
    },
    {
        question: "What is the role of data in the commander's decision-making process?",
        options: [
            "Data makes the decision for the Commander automatically",
            "Data replaces the need for a commander",
            "Data does not make the decision, but gives the Commander better evidence to make it",
            "Data has no role in decisions"
        ],
        correct: 2,
        explanation: "Slide 13 states: 'Data does not make the decision for the Commander. It gives the Commander better evidence with which to make the decision.'"
    },
    {
        question: "If aircraft availability is declining and maintenance turnaround times (TAT) are increasing, what operational story might connect these numbers?",
        options: [
            "Low flying hours are leaving aircraft idle",
            "Higher flying activity is increasing utilization and maintenance demand, leading to longer turnaround times",
            "The weather is preventing maintenance teams from working",
            "Pilot currency is too low"
        ],
        correct: 1,
        explanation: "Slide 11 shows that 'Higher flying activity may be increasing aircraft utilisation and maintenance demand, contributing to longer turnaround times and declining availability.'"
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
        const locationSelect = document.getElementById('userLocation');
        userLocation = locationSelect.options[locationSelect.selectedIndex].value;

        if (userName && userLocation) {
            if (quizQuestions.length === 0) {
                alert("There is no quiz questions loaded.");
                return;
            }
            registrationForm.classList.add('hidden');
            quizInterface.classList.remove('hidden');
            showQuestion();
        } else {
            alert("Please enter both your name and select your rank to begin.");
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

        const params = new URLSearchParams(window.location.search);
        const sessionNum = parseInt(params.get('session')) || 0;

        const docRef = await addDoc(collection(db, "quiz_results"), {
            training: "dsima",
            session: sessionNum,
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
