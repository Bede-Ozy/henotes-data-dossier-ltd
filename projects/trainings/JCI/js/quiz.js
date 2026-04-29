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
    },

    {
        question: "What is the intersection of a row and a column in Excel called?",
        options: ["Sheet", "Cell", "Range", "Table"],
        correct: 1,
        explanation: "A cell is formed where a row and a column meet."
    },
    {
        question: "What is the default file extension for modern Excel workbooks?",
        options: [".xls", ".xlsx", ".docx", ".csv"],
        correct: 1,
        explanation: "Modern Excel files are saved with the .xlsx extension."
    },
    {
        question: "Which symbol is used to begin a formula in Excel?",
        options: ["#", "@", "=", "&"],
        correct: 2,
        explanation: "All Excel formulas must start with an equals (=) sign."
    },
    {
        question: "What is a workbook in Excel?",
        options: ["A single cell", "A collection of worksheets", "A formula", "A chart"],
        correct: 1,
        explanation: "A workbook is the entire Excel file that can contain multiple worksheets."
    },
    {
        question: "What is a worksheet in Excel?",
        options: ["A page within a workbook", "A formula", "A file", "A chart"],
        correct: 0,
        explanation: "A worksheet is a single sheet (page) inside a workbook."
    },
    {
        question: "Which function is used to add numbers in Excel?",
        options: ["COUNT", "SUM", "AVERAGE", "MAX"],
        correct: 1,
        explanation: "The SUM function adds a range of numbers together."
    },
    {
        question: "What does CTRL + C do?",
        options: ["Paste", "Copy", "Cut", "Save"],
        correct: 1,
        explanation: "CTRL + C copies selected content."
    },
    {
        question: "What does CTRL + V do?",
        options: ["Copy", "Paste", "Cut", "Undo"],
        correct: 1,
        explanation: "CTRL + V pastes copied or cut content."
    },
    {
        question: "Which function calculates the average of numbers?",
        options: ["SUM", "COUNT", "AVERAGE", "MAX"],
        correct: 2,
        explanation: "AVERAGE calculates the mean of a set of values."
    },
    {
        question: "What is a range in Excel?",
        options: ["A single cell", "A group of multiple cells", "A chart", "A worksheet"],
        correct: 1,
        explanation: "A range refers to a selection of two or more cells."
    },
    {
        question: "Which tab contains most formatting tools in Excel?",
        options: ["Data", "Insert", "Home", "Review"],
        correct: 2,
        explanation: "The Home tab contains common formatting tools like font, alignment, and styles."
    },
    {
        question: "What does AutoFill do in Excel?",
        options: ["Deletes data", "Fills cells based on patterns", "Sorts data", "Formats cells"],
        correct: 1,
        explanation: "AutoFill automatically fills data based on detected patterns."
    },
    {
        question: "Which function counts numeric values?",
        options: ["COUNT", "SUM", "LEN", "IF"],
        correct: 0,
        explanation: "COUNT counts only cells containing numbers."
    },
    {
        question: "What does CTRL + Z do?",
        options: ["Redo", "Undo", "Save", "Copy"],
        correct: 1,
        explanation: "CTRL + Z undoes the last action."
    },
    {
        question: "What does CTRL + S do?",
        options: ["Save", "Open", "Close", "Print"],
        correct: 0,
        explanation: "CTRL + S saves your current workbook."
    },
    {
        question: "Which function returns the highest value in a range?",
        options: ["MIN", "MAX", "SUM", "COUNT"],
        correct: 1,
        explanation: "MAX returns the largest number in a dataset."
    },
    {
        question: "What is the formula bar used for?",
        options: ["Viewing and editing formulas", "Creating charts", "Formatting cells", "Sorting data"],
        correct: 0,
        explanation: "The formula bar allows you to view and edit cell content and formulas."
    },
    {
        question: "Which function returns the smallest value?",
        options: ["MAX", "MIN", "SUM", "COUNT"],
        correct: 1,
        explanation: "MIN returns the smallest number in a dataset."
    },
    {
        question: "How do columns run in Excel?",
        options: ["Horizontally", "Vertically", "Diagonally", "Circular"],
        correct: 1,
        explanation: "Columns run vertically from top to bottom."
    },
    {
        question: "How do rows run in Excel?",
        options: ["Vertically", "Horizontally", "Diagonally", "Circular"],
        correct: 1,
        explanation: "Rows run horizontally from left to right."
    },
    {
        question: "What is the Name Box used for?",
        options: ["Naming cells or ranges", "Formatting", "Sorting", "Filtering"],
        correct: 0,
        explanation: "The Name Box allows you to name and navigate to cells or ranges."
    },
    {
        question: "Which tab is used to insert charts?",
        options: ["Data", "Insert", "Home", "Review"],
        correct: 1,
        explanation: "Charts are created from the Insert tab."
    },
    {
        question: "What is a cell address?",
        options: ["Column only", "Row only", "Column and row (e.g., A1)", "Sheet name"],
        correct: 2,
        explanation: "A cell address combines the column letter and row number."
    },
    {
        question: "Which key is used to edit a cell?",
        options: ["F1", "F2", "F3", "F4"],
        correct: 1,
        explanation: "F2 allows you to edit the contents of a selected cell."
    },
    {
        question: "What does Freeze Panes do?",
        options: ["Deletes rows", "Keeps rows or columns visible while scrolling", "Sorts data", "Formats text"],
        correct: 1,
        explanation: "Freeze Panes locks selected rows or columns in place while scrolling."
    },

    // LOGICAL FUNCTIONS

    {
        question: "What is the IF function used for?",
        options: ["Formatting", "Logical testing", "Counting", "Sorting"],
        correct: 1,
        explanation: "The IF function evaluates a condition and returns different results based on TRUE or FALSE."
    },
    {
        question: "What is the correct syntax of the IF function?",
        options: ["IF(test,yes,no)", "IF(logical_test,value_if_true,value_if_false)", "IF(condition)", "IF(value)"],
        correct: 1,
        explanation: "The correct syntax includes a logical test and two possible outcomes."
    },
    {
        question: "What will =IF(2>1,\"Yes\",\"No\") return?",
        options: ["Yes", "No", "TRUE", "FALSE"],
        correct: 0,
        explanation: "Since 2 is greater than 1, the condition is TRUE, so 'Yes' is returned."
    },
    {
        question: "When does the AND function return TRUE?",
        options: ["When one condition is true", "When all conditions are true", "When none are true", "Always"],
        correct: 1,
        explanation: "AND returns TRUE only if all conditions are TRUE."
    },
    {
        question: "When does the OR function return TRUE?",
        options: ["When all conditions are true", "When at least one condition is true", "When none are true", "Always false"],
        correct: 1,
        explanation: "OR returns TRUE if at least one condition is TRUE."
    },
    {
        question: "What does the NOT function do?",
        options: ["Adds values", "Reverses a logical result", "Counts values", "Sorts data"],
        correct: 1,
        explanation: "NOT changes TRUE to FALSE and FALSE to TRUE."
    },
    {
        question: "What will =AND(1=1,2=3) return?",
        options: ["TRUE", "FALSE", "1", "Error"],
        correct: 1,
        explanation: "One condition is FALSE, so AND returns FALSE."
    },
    {
        question: "What will =OR(1=1,2=3) return?",
        options: ["TRUE", "FALSE", "Error", "0"],
        correct: 0,
        explanation: "At least one condition is TRUE, so OR returns TRUE."
    },
    {
        question: "What is a nested IF statement?",
        options: ["An IF inside another IF", "IF combined with SUM", "IF combined with COUNT", "IF combined with MAX"],
        correct: 0,
        explanation: "Nested IFs allow multiple conditions to be tested."
    },
    {
        question: "What will =NOT(FALSE) return?",
        options: ["TRUE", "FALSE", "0", "Error"],
        correct: 0,
        explanation: "NOT reverses FALSE to TRUE."
    },
    {
        question: "What does a logical test return?",
        options: ["Text", "TRUE or FALSE", "Numbers only", "Blank"],
        correct: 1,
        explanation: "Logical tests always evaluate to TRUE or FALSE."
    },
    {
        question: "What will =IF(5=5,10,0) return?",
        options: ["10", "0", "TRUE", "FALSE"],
        correct: 0,
        explanation: "Since the condition is TRUE, the function returns 10."
    },
    {
        question: "Can IF be combined with AND?",
        options: ["Yes", "No", "Only in charts", "Only in VBA"],
        correct: 0,
        explanation: "IF can be combined with AND to evaluate multiple conditions."
    },
    {
        question: "What will =IF(AND(1<2,3<4),\"OK\",\"NO\") return?",
        options: ["OK", "NO", "TRUE", "FALSE"],
        correct: 0,
        explanation: "Both conditions are TRUE, so AND returns TRUE and IF returns 'OK'."
    },
    {
        question: "What will =IF(OR(1>2,2>1),\"Yes\",\"No\") return?",
        options: ["Yes", "No", "TRUE", "FALSE"],
        correct: 0,
        explanation: "One condition is TRUE, so OR returns TRUE and IF returns 'Yes'."
    },
    {
        question: "In Excel logic, what does FALSE equal?",
        options: ["1", "0", "TRUE", "Error"],
        correct: 1,
        explanation: "FALSE is represented as 0 in Excel."
    },
    {
        question: "In Excel logic, what does TRUE equal?",
        options: ["1", "0", "Blank", "Error"],
        correct: 0,
        explanation: "TRUE is represented as 1 in Excel."
    },
    {
        question: "What does =IF(A1>50,\"Pass\",\"Fail\") check?",
        options: ["If A1 equals 50", "If A1 is less than 50", "If A1 is blank", "If A1 is greater than 50"],
        correct: 3,
        explanation: "The formula checks whether the value in A1 is greater than 50."
    },
    {
        question: "How many levels can IF statements be nested?",
        options: ["2", "5", "Many levels", "1 only"],
        correct: 2,
        explanation: "Excel allows multiple nested IF statements (within limits depending on version)."
    },
    {
        question: "What will =IF(10<5,\"A\",\"B\") return?",
        options: ["A", "TRUE", "B", "FALSE"],
        correct: 2,
        explanation: "Since the condition is FALSE, the function returns 'B'."
    },
    {
        question: "Logical functions in Excel are mainly used for?",
        options: ["Making decisions", "Drawing charts", "Formatting cells", "Printing sheets"],
        correct: 0,
        explanation: "Logical functions help make decisions based on conditions."
    },

    // DATA CLEANING

    {
        question: "What does data cleaning primarily improve?",
        options: ["Data design", "Data colors", "Data headers", "Data accuracy"],
        correct: 3,
        explanation: "Data cleaning improves the accuracy and reliability of your data."
    },
    {
        question: "Where is the 'Remove Duplicates' feature located?",
        options: ["Insert tab", "Home tab", "Data tab", "Review tab"],
        correct: 2,
        explanation: "Remove Duplicates is found in the Data tab."
    },
    {
        question: "What does the TRIM() function remove?",
        options: ["Numbers", "Errors", "Extra spaces", "Rows"],
        correct: 2,
        explanation: "TRIM removes extra spaces from text, leaving single spaces between words."
    },
    {
        question: "What does the CLEAN() function remove?",
        options: ["Spaces", "Non-printable characters", "Rows", "Columns"],
        correct: 1,
        explanation: "CLEAN removes non-printable or hidden characters from text."
    },
    {
        question: "What does the LEN() function count?",
        options: ["Words in a cell", "Characters in a cell", "Cells", "Rows"],
        correct: 1,
        explanation: "LEN returns the total number of characters in a cell."
    },
    {
        question: "What does the UPPER() function do?",
        options: ["Converts to lowercase", "Converts to dates", "Converts to numbers", "Converts text to uppercase"],
        correct: 3,
        explanation: "UPPER changes all text to capital letters."
    },
    {
        question: "What does the LOWER() function do?",
        options: ["Converts to uppercase", "Converts text to lowercase", "Converts to numbers", "Converts to dates"],
        correct: 1,
        explanation: "LOWER changes all text to lowercase."
    },
    {
        question: "What does the PROPER() function do?",
        options: ["Capitalizes the first letter of each word", "Converts all text to uppercase", "Converts text to lowercase", "Deletes text"],
        correct: 0,
        explanation: "PROPER capitalizes the first letter of each word."
    },
    {
        question: "What is the shortcut for Find and Replace?",
        options: ["Ctrl+F", "Ctrl+F+R", "Ctrl+H", "Ctrl+Shift+L"],
        correct: 2,
        explanation: "Ctrl + H opens the Find and Replace dialog."
    },
    {
        question: "What does the Filter feature display?",
        options: ["All data", "Only selected data", "Charts", "Errors"],
        correct: 1,
        explanation: "Filtering shows only data that meets specific criteria."
    },
    {
        question: "What is sorting used for?",
        options: ["Arranging data", "Arranging charts", "Changing colors", "Nothing"],
        correct: 0,
        explanation: "Sorting organizes data in a specific order."
    },
    {
        question: "What does data validation ensure?",
        options: ["Clean data", "Valid inputs", "Charts", "Sorting"],
        correct: 1,
        explanation: "Data validation restricts input to acceptable values."
    },
    {
        question: "What does the LEFT() function return?",
        options: ["Text from the end", "Text from the beginning", "Text from the middle", "Numbers"],
        correct: 1,
        explanation: "LEFT extracts text starting from the beginning."
    },
    {
        question: "What does the RIGHT() function return?",
        options: ["Text from the end", "Text from the beginning", "Text from the middle", "Numbers"],
        correct: 0,
        explanation: "RIGHT extracts text starting from the end."
    },
    {
        question: "What does the MID() function return?",
        options: ["Text from the end", "Text from the beginning", "Text from the middle", "Numbers"],
        correct: 2,
        explanation: "MID extracts text from a specified position."
    },
    {
        question: "What does data cleaning remove?",
        options: ["Errors", "Invalid inputs", "Bad formatting", "All of the above"],
        correct: 3,
        explanation: "Data cleaning removes all forms of inconsistencies."
    },
    {
        question: "Clean data helps with?",
        options: ["Analysis", "Printing", "Formatting", "Drawing"],
        correct: 0,
        explanation: "Clean data makes analysis more accurate and efficient."
    },

    // POWER QUERY

    {
        question: "What is Power Query primarily used for?",
        options: ["Charts", "Data transformation", "Formatting", "Printing"],
        correct: 1,
        explanation: "Power Query is used to import, clean, and transform data."
    },
    {
        question: "Where can you access Power Query in Excel?",
        options: ["Home tab", "Data tab", "Insert tab", "Review tab"],
        correct: 1,
        explanation: "Power Query tools are located in the Data tab."
    },
    {
        question: "Power Query can import data from which sources?",
        options: ["Excel", "CSV", "Web", "All of the above"],
        correct: 3,
        explanation: "Power Query supports multiple data sources."
    },
    {
        question: "What does 'Close & Load' do in Power Query?",
        options: ["Exits Power Query", "Loads transformed data into Excel", "Deletes data", "Saves worksheet"],
        correct: 1,
        explanation: "It loads the processed data into the workbook."
    },
    {
        question: "What do 'Applied Steps' show in Power Query?",
        options: ["Charts created", "Sheets", "Files", "Transformation steps"],
        correct: 3,
        explanation: "Applied Steps track all transformations made to the data."
    },
    {
        question: "What does 'Refresh' do in Power Query?",
        options: ["Updates charts", "Updates data", "Updates cells", "Updates rows"],
        correct: 1,
        explanation: "Refresh pulls in updated data from the source."
    },
    {
        question: "Power Query improves what?",
        options: ["Efficiency", "Colors", "Fonts", "Shapes"],
        correct: 0,
        explanation: "Power Query automates repetitive tasks, improving efficiency."
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
