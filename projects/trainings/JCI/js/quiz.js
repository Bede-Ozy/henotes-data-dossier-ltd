/**
 * JCI Training Quiz - Logic & Firebase Integration
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
// Note: This matches the grouping in the original quizQuestions bank
const sessionMap = {
    1: { name: "Excel Fundamentals", ranges: [[0, 4], [14, 14], [16, 16], [20, 44]] },
    2: { name: "Logical Functions", ranges: [[5, 7], [17, 17], [45, 65]] },
    3: { name: "Data Cleaning", ranges: [[8, 11], [15, 15], [18, 18], [66, 82]] },
    4: { name: "Power Query", ranges: [[12, 13], [19, 19], [83, 102]] },
    5: { name: "Data Visualization", ranges: [[103, 122]] },
    6: { name: "Advanced Formulas", ranges: [[123, 142]] },
    7: { name: "PivotTables & Slicers", ranges: [[143, 162]] },
    8: { name: "Final Project", ranges: [] }
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
    let sessionName = "General Knowledge";

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

    // Pick 20 random questions
    shuffle(filtered);
    quizQuestions = filtered.slice(0, 20);

    // Update UI Header
    const headerTitle = document.querySelector('.quiz-header h1');
    const headerDesc = document.querySelector('.quiz-header p');
    if (headerTitle) headerTitle.innerText = sessionNum > 0 ? `Session ${sessionNum} Quiz` : "General Data Quiz";
    if (headerDesc) headerDesc.innerText = sessionName;
}

// Rename the original bank to allQuestions
const allQuestions = [
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
    },

    // POWER QUERY (Continued)
    {
        question: "What does the 'Load' stage of ETL primarily involve?",
        options: ["Cleaning data", "Extracting from source", "Importing transformed data into the final destination (Excel)", "Deleting the source file"],
        correct: 2,
        explanation: "Loading is the final step where the clean data is brought into your workbook."
    },
    {
        question: "Can Power Query merge two different tables from two different Excel files?",
        options: ["No, only from one file", "Yes, it can combine data from multiple sources", "Only if the files are open", "Only in the Pro version"],
        correct: 1,
        explanation: "Power Query is designed to connect to and combine data from many different files and formats."
    },
    {
        question: "What language does Power Query use behind the scenes to record its transformation steps?",
        options: ["Python", "Java", "M Language", "SQL"],
        correct: 2,
        explanation: "The 'M' language is the functional language used by the Power Query engine."
    },
    {
        question: "Does Power Query change or modify your original raw source file?",
        options: ["Yes, it overwrites it", "No, it only reads the data and transforms it in its own environment", "Only if you click Save", "Only for CSV files"],
        correct: 1,
        explanation: "Power Query is non-destructive; it never changes your original source data."
    },
    {
        question: "What is 'Query Folding' in Power Query?",
        options: ["Hiding the query", "Pushing transformations back to the source database for efficiency", "Grouping steps", "Deleting duplicate steps"],
        correct: 1,
        explanation: "Query folding allows Power Query to let the source database do the heavy lifting."
    },
    {
        question: "Can you 'Unpivot' columns in Power Query to turn wide data into long data?",
        options: ["No", "Yes, it is a key feature for normalizing data", "Only in PivotTables", "Only with a special plugin"],
        correct: 1,
        explanation: "Unpivoting is essential for preparing 'human-friendly' tables for 'machine-friendly' analysis."
    },
    {
        question: "What is a 'Parameter' in Power Query used for?",
        options: ["A mathematical constant", "A dynamic variable that can change data sources or filter values", "A type of chart", "A cleaning tool"],
        correct: 1,
        explanation: "Parameters allow you to make your queries flexible and reusable."
    },
    {
        question: "How does Power Query handle errors in specific cells?",
        options: ["It crashes Excel", "It allows you to 'Remove Errors' or 'Replace Errors' with specific values", "It ignores them", "It highlights them in red in the spreadsheet"],
        correct: 1,
        explanation: "Power Query provides specific tools to clean and manage data errors during transformation."
    },
    {
        question: "Can Power Query connect to a folder and combine all files inside it automatically?",
        options: ["No", "Yes, using the 'From Folder' connector", "Only if the files are named 'Data'", "Only if there are exactly 2 files"],
        correct: 1,
        explanation: "The 'From Folder' feature is a powerful way to automate monthly reports."
    },
    {
        question: "Does Power Query work in Excel for Mac?",
        options: ["No, it is Windows only", "Yes, but with limited features compared to Windows", "Yes, it is exactly the same", "Only in the web version"],
        correct: 1,
        explanation: "Power Query is available on Mac but currently has fewer connectors and features than the Windows version."
    },
    {
        question: "What happens when you 'Duplicate' a query in Power Query?",
        options: ["It creates an exact copy of the query and its steps", "It moves the query to another file", "It deletes the first query", "It merges two queries"],
        correct: 0,
        explanation: "Duplicating is useful for creating a new version of a query without starting over."
    },
    {
        question: "What is the 'Advanced Editor' in Power Query used for?",
        options: ["Writing Excel formulas", "Viewing and editing the raw M code of the query", "Creating charts", "Formatting columns"],
        correct: 1,
        explanation: "The Advanced Editor allows experts to write complex custom logic in M."
    },
    {
        question: "What does 'Merge Queries' do in Power Query?",
        options: ["Appends rows one after another", "Combines columns from two tables based on a matching key (like a VLOOKUP)", "Deletes duplicates", "Sorts data"],
        correct: 1,
        explanation: "Merging is the Power Query equivalent of joining tables in a database."
    },

    // SESSION 5: DATA VISUALIZATION
    {
        question: "Which chart type is best for showing trends or changes over a period of time?",
        options: ["Pie Chart", "Line Chart", "Bar Chart", "Scatter Plot"],
        correct: 1,
        explanation: "Line charts are the standard for visualizing time-series data and trends."
    },
    {
        question: "Which of the following is a type of chart?",
        options: ["Pie Chart", "Bearish Chart", "", "Bullish Chart", "All of the above"],
        correct: 0,
        explanation: "Pie chart is a type of chart that represents data in circular using segments."
    },
    {
        question: "Which chart type is best for showing 'parts of a whole' (e.g., percentage of market share)?",
        options: ["Column Chart", "Pie Chart", "Histogram", "Area Chart"],
        correct: 1,
        explanation: "Pie charts effectively show how individual categories contribute to a 100% total."
    },
    {
        question: "In Excel charts, what does the 'Data Source' refer to?",
        options: ["The person who entered the data", "The range of cells providing the numbers for the chart", "The file name", "The chart title"],
        correct: 1,
        explanation: "The data source is the underlying table or range that the chart visualizes."
    },
    {
        question: "What chart is best used for showing and comparing quantities of items?",
        options: ["Line chart", "Bar Chart", "Scatter Plot", "Pie Chart"],
        correct: 1,
        explanation: "Bar charts are the standard for comparing quantities of items."
    },
    {
        question: "What happens when you present data without visualization?",
        options: ["It becomes easier to understand", "It may be harder to spot insights", "It becomes more colorful", "Nothing changes"],
        correct: 1,
        explanation: "Without visualization, it can be difficult to quickly identify insights and patterns."
    },
    {
        question: "How do you add a 'Chart Title' if it is missing?",
        options: ["Type it in a cell", "Use the 'Chart Elements' (+) button", "Use the Home tab", "Right-click the taskbar"],
        correct: 1,
        explanation: "The 'Chart Elements' menu allows you to toggle titles, legends, and labels."
    },
    {
        question: "What is a 'Legend' in a chart used for?",
        options: ["Explaining what the colors or patterns represent", "Giving the chart a name", "Adding a signature", "Sorting data"],
        correct: 0,
        explanation: "The legend identifies the data series represented in the chart."
    },
    {
        question: "Why is visualization useful for presentations?",
        options: ["It adds animations only", "It makes slides longer", "It communicates insights clearly to others", "It replaces speaking"],
        correct: 2,
        explanation: "Visuals help communicate insights clearly and effectively to an audience."
    },
    {
        question: "What is a 'Combo Chart' in Excel?",
        options: ["A chart with many colors", "A chart that combines two different types (e.g., Column and Line)", "A chart that includes images", "A chart with no data"],
        correct: 1,
        explanation: "Combo charts are useful for showing two different types of metrics (e.g., Sales and Growth %) together."
    },
    {
        question: "What are 'Data Labels' used for?",
        options: ["Naming the chart", "Showing the value of each data point on the chart", "Creating a legend", "Filtering data"],
        correct: 1,
        explanation: "Data labels make a chart more precise by displaying the actual numbers directly."
    },
    {
        question: "Which chart is best for comparing values across different categories?",
        options: ["Line Chart", "Bar or Column Chart", "Stock Chart", "Surface Chart"],
        correct: 1,
        explanation: "Bar and Column charts are the most effective for categorical comparisons."
    },
    {
        question: "How does visualization help in decision-making?",
        options: ["It delays decisions", "It hides important data", "It makes trends and patterns clearer", "It removes errors automatically"],
        correct: 2,
        explanation: "Clear visuals help decision-makers quickly identify trends and act on them."
    },
    {
        question: "Why is data visualization important?",
        options: ["It makes data look colorful", "It helps people understand data quickly", "It increases file size", "It replaces formulas"],
        correct: 1,
        explanation: "Visualization helps people quickly understand patterns and insights in data."
    },
    {
        question: "Can you create a 'Map Chart' in Excel to visualize data by country or state?",
        options: ["No", "Yes, if your data contains geographic names", "Only with a plugin", "Only in 3D"],
        correct: 1,
        explanation: "Excel can automatically recognize geographic names and plot data on a map."
    },
    {
        question: "If your chart looks wrong, what is the most likely issue?",
        options: ["Wrong font", "Wrong data selected", "Too many colors", "Excel is broken"],
        correct: 1,
        explanation: "Most chart issues come from selecting incorrect data."
    },
    {
        question: "What is the purpose of a chart title?",
        options: ["To decorate the chart", "To explain what the chart is about", "To change colors", "To sort data"],
        correct: 1,
        explanation: "A chart title helps the viewer understand what the chart represents."
    },
    {
        question: "How can you move a chart to its own dedicated sheet?",
        options: ["Copy and Paste", "Right-click > Move Chart > New Sheet", "Drag and drop", "Save as PDF"],
        correct: 1,
        explanation: "The Move Chart feature allows you to give a chart its own space for better viewing."
    },
    {
        question: "What is a 'Clustered Column' chart?",
        options: ["Columns stacked on top of each other", "Columns grouped side-by-side for comparison", "A column with a shadow", "A 3D column"],
        correct: 1,
        explanation: "Clustered columns allow for direct comparison between multiple series in each category."
    },
    {
        question: "What is the first step to create a chart in Excel?",
        options: ["Insert a chart first", "Select your data", "Format the chart", "Add colors"],
        correct: 1,
        explanation: "You must select your data before inserting a chart."
    },

    // SESSION 6: ADVANCED FORMULAS
    {
        question: "What does VLOOKUP stand for?",
        options: ["Value Lookup", "Variable Lookup", "Vertical Lookup", "Virtual Lookup"],
        correct: 2,
        explanation: "VLOOKUP looks for a value vertically down the first column of a table."
    },
    {
        question: "In =VLOOKUP(A2, D2:F10, 3, FALSE), what does the number '3' represent?",
        options: ["The row number", "The column index number (to return the value from)", "The number of matches", "A random number"],
        correct: 1,
        explanation: "The third argument tells Excel which column in the range contains the data you want to retrieve."
    },
    {
        question: "What is the difference between TRUE and FALSE for the 4th argument in VLOOKUP?",
        options: ["FALSE is for exact matches; TRUE is for approximate matches", "TRUE is for exact matches; FALSE is for approximate matches", "They do the same thing", "One is for numbers, one is for text"],
        correct: 0,
        explanation: "Always use FALSE for IDs or names where you need an exact match."
    },
    {
        question: "What does the INDEX function do?",
        options: ["Finds the position of a value", "Returns a value at a specific row and column intersection", "Sorts the data", "Deletes data"],
        correct: 1,
        explanation: "INDEX acts like a map reference, retrieving data from a specific 'coordinate' in a range."
    },
    {
        question: "What does the MATCH function do?",
        options: ["Returns the value in a cell", "Returns the relative position of a value in a range", "Combines two cells", "Checks for errors"],
        correct: 1,
        explanation: "MATCH tells you *where* an item is located (e.g., 'Row 5')."
    },
    {
        question: "Why is INDEX/MATCH often considered superior to VLOOKUP?",
        options: ["It is easier to type", "It can look to the left and is more flexible for large datasets", "It only works with numbers", "It creates charts automatically"],
        correct: 1,
        explanation: "INDEX/MATCH is more powerful because it doesn't require the lookup value to be in the first column."
    },
    {
        question: "What is the main advantage of SUMIFS over SUMIF?",
        options: ["It is faster", "It allows for multiple criteria instead of just one", "It only sums text", "It works without a range"],
        correct: 1,
        explanation: "SUMIFS can sum data based on multiple conditions (e.g., Region = Lagos AND Category = Phone)."
    },
    {
        question: "In SUMIF, which argument comes first?",
        options: ["Criteria_range1", "Criteria1", "Sum_range (the numbers to add)", "The sheet name"],
        correct: 2,
        explanation: "Unlike SUMIF, SUMIFS starts with the range of numbers you want to sum."
    },
    {
        question: "What is the purpose of the COUNTIF function?",
        options: ["To count the number of cells that meet a specific criterion", "To fix the math automatically", "To count the number of cells that meet a specific criterion", "To delete the cell if it has an error"],
        correct: 2,
        explanation: "COUNTIF is used to count cells that meet a specific criterion."
    },
    {
        question: "What is the advantage of INDEX/MATCH over VLOOKUP?",
        options: ["It can look to the left", "It is more flexible for large datasets", "It only works with numbers", "It creates charts automatically"],
        correct: 1,
        explanation: "INDEX/MATCH is more powerful because it doesn't require the lookup value to be in the first column."
    },
    {
        question: "How many criteria do you need for SUMIF/COUNTIF?",
        options: ["3", "1", "4", "5"],
        correct: 1,
        explanation: "SUMIF/COUNTIF requires only one criterion."
    },
    {
        question: "How do you write the index/match functions in order?",
        options: ["=index(match)", "=match(index)", "=match(match)", "=index(index)"],
        correct: 0,
        explanation: "The match function is nested inside the index function."
    },
    {
        question: "How can you count how many times 'Shawarma' appears in A2:A20?",
        options: ["=COUNTIF(A2:A20, Shawarma)", "=COUNTIF(A2:A20, \"Shawarma\")", "=COUNT(A2:A20, \"Shawarma\")", "=COUNTIF(\"Shawarma\", A2:A20)"],
        correct: 1,
        explanation: "COUNTIF needs a range and a criteria. Text criteria must be in quotes."
    },
    {
        question: "How do you count values greater than 50 in the column B2:B30?",
        options: ["=COUNTIF(B2:B30, >50)", "=COUNTIF(B2:B30, \"50>\")", "=COUNTIF(B2:B30, \">50\")", "=COUNT(B2:B30, \">50\")"],
        correct: 2,
        explanation: "Criteria with operators like > must be inside quotes."
    },
    {
        question: "How do you calculate total sales for 'Rice' in A2:A20 (product_name) and B2:B20 (sales)?",
        options: ["=SUMIF(A2:A20, \"Rice\", B2:B20)", "=SUMIF(B2:B20, \"Rice\", A2:A20)", "=SUM(A2:A20, \"Rice\")", "=SUMIF(A2:A20, Rice, B2:B20)"],
        correct: 0,
        explanation: "SUMIF uses the range (product_name column) as well as the criteria (\"Rice\"), and the sum_range (the sales column). So anywhere there's a \"rice\" in column A2:A20 it gets the sum of the corresponding sales in column B."
    },
    {
        question: "With Salary in column C,How do you find the salary of Employee_ID 102 in a table A2:C10?",
        options: ["=VLOOKUP(102, A2:C10, 3, FALSE)", "=VLOOKUP(102, A2:C10, 2, FALSE)", "=VLOOKUP(A2:C10, 102, 3, FALSE)", "=LOOKUP(102, A2:C10, 3)"],
        correct: 0,
        explanation: "Column 3 contains salary, and FALSE ensures exact match."
    },
    {
        question: "How do you 'lock' a table range in a VLOOKUP formula so it doesn't move when copied?",
        options: ["Use bold text", "Use absolute references ($A$1:$C$10)", "Hide the columns", "Protect the sheet"],
        correct: 1,
        explanation: "Absolute references are critical in lookups to keep the table array fixed."
    },
    {
        question: "Which formula correctly looks up a value in column A and returns a value from column H?",
        options: ["=VLOOKUP(value, A:C, 10, FALSE)", "=VLOOKUP(value, C:A, 3, FALSE)", "=VLOOKUP(value, A:H, 8, FALSE)", "=LOOKUP(value, A:C, 3)"],
        correct: 2,
        explanation: "Column H is the 8th column in the selected range."
    },
    {
        question: "Does VLOOKUP return the first match it finds or the last match?",
        options: ["The first match", "The last match", "All matches", "A random match"],
        correct: 0,
        explanation: "VLOOKUP stops at the first instance of a match it encounters in the column."
    },
    {
        question: "Which function would you use to find the average of sales for 'Lagos' only?",
        options: ["=AVERAGE()", "=AVERAGEIF()", "=MEAN()", "=SUMIF()"],
        correct: 1,
        explanation: "AVERAGEIF calculates the mean of cells that meet a specific condition."
    },

    // SESSION 7: PIVOT TABLES
    {
        question: "What is the primary purpose of a PivotTable?",
        options: ["Drawing shapes", "Summarizing and analyzing large datasets quickly", "Sending emails", "Managing passwords"],
        correct: 1,
        explanation: "PivotTables allow you to group, aggregate, and slice data without writing complex formulas."
    },
    {
        question: "Where is the 'PivotTable' button located?",
        options: ["Home tab", "Insert tab", "Data tab", "Review tab"],
        correct: 1,
        explanation: "You can create PivotTables from the Insert tab in the Tables group."
    },
    {
        question: "What are the four 'Areas' in the PivotTable Fields pane?",
        options: ["Rows, Columns, Values, Filters", "Top, Bottom, Left, Right", "Header, Footer, Body, Side", "SUM, COUNT, MIN, MAX"],
        correct: 0,
        explanation: "You drag fields into these four areas to structure your summary or chart."
    },
    {
        question: "How do you delete an axis in a chart in excel?",
        options: ["click on the axis and click on backspace", "click on the axis and move it away from the chart", "right click on the axis and click add", "right click on the axis and click delete"],
        correct: 3,
        explanation: "Grouping dates is a powerful way to see monthly or quarterly performance trends."
    },
    {
        question: "Does a PivotTable update automatically when you change the raw source data?",
        options: ["Yes, instantly", "No, you must right-click and select 'Refresh'", "Only if you save the file", "Only if you restart Excel"],
        correct: 1,
        explanation: "PivotTables use a data 'cache' and must be manually refreshed to see new changes."
    },
    {
        question: "What is a 'PivotChart'?",
        options: ["A regular chart", "A dynamic chart linked directly to a PivotTable", "A chart with no data", "A type of table"],
        correct: 1,
        explanation: "PivotCharts update automatically as you change the layout or filters of their parent PivotTable."
    },
    {
        question: "Can you add a 'Slicer' to a PivotTable for interactive filtering?",
        options: ["No", "Yes, it is a key feature for dashboards", "Only in Power BI", "Only for numbers"],
        correct: 1,
        explanation: "Slicers connected to PivotTables make for highly interactive and user-friendly reports."
    },
    {
        question: "How do you add a field to a PivotTable?",
        options: ["Type it in manually", "Drag and drop the field from the Fields pane into an area", "Use the Home tab", "Right-click the taskbar"],
        correct: 1,
        explanation: "You build PivotTables by dragging fields into the Rows, Columns, or Values areas."
    },
    {
        question: "How do you change a PivotTable from 'Sum of Sales' to 'Average of Sales'?",
        options: ["Retype the numbers", "Value Field Settings > Summarize Values By", "Change the title", "Use a different tab"],
        correct: 1,
        explanation: "Value Field Settings allow you to change the aggregation type (Sum, Count, Average, etc.)."
    },
    {
        question: "What does 'Show Values As' (e.g., % of Grand Total) do in a PivotTable?",
        options: ["Changes the font color", "Displays values as a calculation (sum, average, etc.)", "Hides the values", "Creates a chart"],
        correct: 1,
        explanation: "This feature allows for powerful relative analysis like market share or growth %."
    },
    {
        question: "How do you sort your chart in ascending order?",
        options: ["right click on the values columns in the pivot table and click filter", "use the sort and filter option in the home ribbon", "right click on the values column, click sort, click on smallest to largest", "use ctrl + shift + L"],
        correct: 2,
        explanation: "Using the sort and filter option in the home ribbon only works for single columns, not for charts. Right clicking on the values column in the pivot table and clicking filter only allows you to filter by value, not sort by value. Ctrl + shift + L is a shortcut to filter by value, not sort by value. Right clicking on the values column, click sort, click on smallest to largest is the correct way to sort your chart in ascending order is the right option to order your chart in ascending order."
    },
    {
        question: "Can you 'Drill Down' into a specific value in a PivotTable to see the underlying rows?",
        options: ["No", "Yes, by double-clicking any value cell in the PivotTable", "Only if you have the source file", "Only with a macro"],
        correct: 1,
        explanation: "Double-clicking a PivotTable value creates a new sheet with the specific records that make up that total."
    },
    {
        question: "To pick a chart for your pivot table, which option do you click on?",
        options: ["Bar Chart", "Pie Chart", "Pivot Charts", "Scatter Chart"],
        correct: 2,
        explanation: "PivotChart option is used to create a chart for your pivot table. It allows you to create a chart that is linked to your pivot table and will update automatically when you change the data in your pivot table."
    },
    {
        question: "What happens to your data before you activate the pivot table?",
        options: ["A new row is created", "Converts the selected data into a table", "Clears the data from the original table", "The data is sorted in ascending order"],
        correct: 1,
        explanation: "Before you activate the pivot table, the data is summarized and aggregated. This means that the data is grouped together and the values are added up. This is done so that the pivot table can display the data in a way that is easy to understand."
    },
    {
        question: "Where can you change the color and style of a PivotTable?",
        options: ["Data tab", "PivotTable Design tab", "Formula tab", "Insert tab"],
        correct: 1,
        explanation: "The Design tab provides various color schemes and layout options to make your report look professional."
    },
    {
        question: "How do you adjust the transparency of gridlines in a chart?",
        options: ["Use the format chart area options", "Use the format gridlines options", "Right click on the gridlines and click on fill options", "Use the fill color options"],
        correct: 1,
        explanation: "Use the format gridlines options to adjust the transparency of gridlines in a chart."
    },
    {
        question: "Which of the following can be done in the format chart area options?",
        options: ["fill color", "Border formatting", "Effects formatting", "All of the above"],
        correct: 3,
        explanation: "You can use the format chart area options to do all. fill color allows you to adjust colors, border formatting to adjust borders, and effects formatting to adjust effects."
    },
    {
        question: "Can you sort a PivotTable by the calculated values (e.g., Highest Sales to Lowest Sales)?",
        options: ["No", "Yes, right-click a value and select 'Sort'", "Only manually", "Only by names"],
        correct: 1,
        explanation: "Sorting by values is essential for creating 'Top 10' or 'Bottom 10' reports."
    },
    {
        question: "How do you choose the colors of the chart?",
        options: ["Use the format chart area options", "right click on the bar and click the format data series", "Use the fill color option", "Use the border formatting option"],
        correct: 1,
        explanation: "Right click on the bar and click the format data series to choose the colors of the chart. Use the format chart area options to do all. fill color allows you to adjust colors, border formatting to adjust borders, and effects formatting to adjust effects."
    },
    {
        question: "How do you add data labels to a chart?",
        options: ["right click on the chart area and click on add data labels", "right click on the table range and click insert", "click on the chart and start typing", "go to the insert tab and click on data labels"],
        correct: 0,
        explanation: "Right click on the chart area and click on add data labels to add data labels to a chart."
    }

];

// Initialize UI Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quiz Content (Filtering & Randomization)
    initializeQuizContent();

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
            if (quizQuestions.length === 0) {
                alert("There is no quiz for this session. Please proceed to the Capstone project.");
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
