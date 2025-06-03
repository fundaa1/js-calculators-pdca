// JavaScript logic will go here
// console.log("NeoCalc script loaded."); // Keep or remove as you prefer

const displayInputElement = document.querySelector('.display-input');
const displayHistoryElement = document.querySelector('.display-history'); // For later use
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.key-equals'); // Select the equals button
const allClearButton = document.querySelector('.key-ac'); // AC button
const deleteButton = document.querySelector('.key-del'); // DEL button
const percentButton = document.querySelector('.key-percent'); // Select Percentage button
const signButton = document.querySelector('.key-sign'); // Select Sign Toggle button
const historyLogListElement = document.getElementById('historyLogList'); // Select history UL
const themeToggleButton = document.getElementById('themeToggleButton'); // Select theme toggle button
// We'll select AC, DEL, Percent buttons later when we implement their functionality

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let displayNeedsReset = false; // Flag to reset display before new number input after an operation or equals
let calculationHistoryLog = []; // Array to store history strings
const HISTORY_STORAGE_KEY = 'neoCalc.historyLog';
const THEME_STORAGE_KEY = 'neoCalc.theme'; // Key for storing selected theme

// --- Theme Toggle Functions ---
function applyTheme(themeName) {
    document.body.classList.remove('dark-theme', 'light-theme');
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;

    if (themeName === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleButton) {
            // themeToggleButton.textContent = "Dark Theme"; // Keep if you want text alongside icon
            if (themeIcon) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            }
        }
    } else {
        // document.body.classList.add('light-theme'); // Default, no specific class needed if it's the base
        if (themeToggleButton) {
            // themeToggleButton.textContent = "Light Theme"; // Keep if you want text alongside icon
            if (themeIcon) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        }
    }
}

function toggleTheme() {
    let currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    if (currentTheme === 'dark') {
        applyTheme('light');
        localStorage.setItem(THEME_STORAGE_KEY, 'light');
    } else {
        applyTheme('dark');
        localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    }
}

function loadThemeFromLocalStorage() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme) {
        applyTheme(storedTheme);
    } else {
        applyTheme('light'); // Default to light theme if nothing stored
    }
}

// --- LocalStorage Functions for History ---
function saveHistoryToLocalStorage() {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(calculationHistoryLog));
}

function loadHistoryFromLocalStorage() {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (storedHistory) {
        calculationHistoryLog = JSON.parse(storedHistory);
    }
    // Ensure it's always an array, even if localStorage was somehow corrupted/null
    if (!Array.isArray(calculationHistoryLog)) {
        calculationHistoryLog = [];
    }
    renderHistoryLog(); // Render after loading
}

// --- Display Update ---
function updateDisplay() {
    displayInputElement.textContent = formatNumber(currentOperand);
    if (operation != null && currentOperand !== 'Error') { // Don't show pending op if current is Error
        displayHistoryElement.textContent = `${formatNumber(previousOperand)} ${operation}`;
    } else if (currentOperand === 'Error' && previousOperand) { // If error, show context from previousOperand
        displayHistoryElement.textContent = previousOperand; // previousOperand will hold the error context expression
    } else if (operation == null && !displayNeedsReset && displayHistoryElement.textContent.endsWith('=')) {
        // Keep history after equals if no new op started, unless it's an error state cleared by new num
        // This is already handled by equalsButton logic, generally history clears or is specific
    }
    else {
        // For other cases (e.g. after AC, or after a number is input post-equals)
        if (!displayHistoryElement.textContent.endsWith('=') || displayNeedsReset) {
             // Clear history if not showing a completed calculation or if display needs reset
             // displayHistoryElement.textContent = '';
        }
        // If currentOperand is 'Error', previousOperand should already be set by calculate()
        // If not an error and operation is null (e.g. after AC, or after equals and new number typed)
        // history should be clear or reflect the just-completed op if that's desired.
        // The current logic in equalsButton and AC handles history clearing appropriately.
        // If `previousOperand` is set (e.g. by error handling in calculate) and op is null, it will show.
        // Let's simplify: if not an error and no operation, history is what it was or cleared by AC/equals.
        if (currentOperand !== 'Error' && operation == null && !displayHistoryElement.textContent.endsWith('=')) {
             displayHistoryElement.textContent = '';
        }

    }
}

// --- Helper to format number (optional for now, can be expanded) ---
function formatNumber(numberString) {
    if (numberString === 'Error' || numberString === undefined || numberString === null) return numberString; // Added null check
    const stringNumber = numberString.toString();
    // Basic large number handling for display (can be improved with toLocaleString limitations)
    // if (stringNumber.length > 12 && stringNumber.includes('.')) {
    // return parseFloat(stringNumber).toPrecision(10);
    // }
    return stringNumber;
}

// --- Calculation Logic ---
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    const originalOperationForHistory = operation; // Keep for error reporting

    // It's unlikely this isNaN check for prev/current will be hit if input is well-managed,
    // as chooseOperation and appendNumber ensure numbers before calculation.
    // But as a safeguard:
    if (isNaN(prev) || isNaN(current)) {
        currentOperand = 'Error';
        operation = undefined;
        previousOperand = "Invalid input"; // Generic error for history
        updateDisplay(); // Update display immediately to show error context
        return 'Error';
    }

    switch (originalOperationForHistory) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                currentOperand = 'Error';
                operation = undefined;
                // Set previousOperand to the expression that caused the error for history display
                previousOperand = `${formatNumber(prev)} ${originalOperationForHistory} ${formatNumber(current)}`;
                // updateDisplay(); // updateDisplay is called by the caller (equalsButton or chooseOperation)
                return 'Error'; // Indicates an error occurred
            }
            computation = prev / current;
            break;
        default:
            // This case should ideally not be reached if 'operation' is always valid
            currentOperand = 'Error';
            operation = undefined;
            previousOperand = "Unknown operation";
            // updateDisplay();
            return 'Error';
    }

    // Check for Infinity or -Infinity, or if computation somehow resulted in NaN again
    if (!isFinite(computation) || isNaN(computation)) {
        currentOperand = 'Error';
        operation = undefined;
        // Set previousOperand to the expression for history display
        previousOperand = `${formatNumber(prev)} ${originalOperationForHistory} ${formatNumber(current)}`;
        // updateDisplay();
        return 'Error';
    }

    // Round to a sensible number of decimal places
    computation = parseFloat(computation.toFixed(10));
    return computation.toString();
}

// --- Input Handling Functions ---
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.' || displayNeedsReset || currentOperand === 'Error') {
        currentOperand = number;
        displayNeedsReset = false;
        // If resetting from error, clear history if it was showing the error context
        if (previousOperand && previousOperand.toLowerCase().includes('error')) previousOperand = ''; 
        if (displayHistoryElement.textContent.toLowerCase().includes('error=')) displayHistoryElement.textContent = '';
    } else {
        if (currentOperand.length >= 15 && !displayNeedsReset) return; 
        currentOperand = currentOperand.toString() + number.toString();
    }
}

function chooseOperation(selectedOperator) {
    if (currentOperand === 'Error') { 
        previousOperand = ''; 
        operation = selectedOperator;
        currentOperand = '0'; 
        displayNeedsReset = true; 
        updateDisplay();
        return;
    }
    if (currentOperand === '' && previousOperand !== '' && operation !== undefined) {
        operation = selectedOperator;
        updateDisplay();
        return;
    }
    if (currentOperand === '') return;

    if (previousOperand !== '' && operation !== undefined) { 
        const result = calculate();
        if (currentOperand === 'Error') { 
            // history is set by calculate() on error
            updateDisplay(); 
            displayNeedsReset = true;
            return;
        }
        currentOperand = result;
    }

    operation = selectedOperator;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

// --- Clear and Delete Functions ---
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    displayNeedsReset = false;
    displayHistoryElement.textContent = '';
    calculationHistoryLog = [];
    renderHistoryLog();
    saveHistoryToLocalStorage(); // Save after clearing
    updateDisplay();
}

function deleteLastDigit() {
    if (currentOperand === 'Error' || displayNeedsReset) {
        // If Error, or if result is shown and DEL is pressed, treat as AC
        // clearAll(); // Option 1: full clear
        currentOperand = '0'; // Option 2: just reset current input to 0
        displayNeedsReset = false;
        if (currentOperand === 'Error') displayHistoryElement.textContent = ''; // Clear history if it was an error
    } else if (currentOperand.length > 1) {
        currentOperand = currentOperand.toString().slice(0, -1);
    } else {
        currentOperand = '0'; // If only one digit (or becomes empty), set to '0'
    }
    updateDisplay();
}

// --- Percentage Function ---
function handlePercentage() {
    if (currentOperand === 'Error' || currentOperand === '') {
        return; // Do nothing if error or empty string
    }
    const currentValue = parseFloat(currentOperand);
    if (isNaN(currentValue)) {
        return; // Do nothing if currentOperand is not a valid number
    }

    let result = currentValue / 100;
    result = parseFloat(result.toFixed(10)); // Apply similar rounding as in calculate
    currentOperand = result.toString();
    
    // displayNeedsReset = false; // The number is actively transformed, not a final calc result
    // Let's test behavior. If user does 50 + 10 %, result of % is 0.1 for currentOperand.
    // Then if user types another number, it should append to 0.1 or start new?
    // Standard behavior implies it modifies the current number, and it's ready for use.
    // So displayNeedsReset should remain false or be explicitly set to false.
    // If displayNeedsReset was true (e.g. after an equals), pressing % should operate on the result.
    // And the result of % is a new current number.
    displayNeedsReset = false; // New number is ready, don't reset on next digit.
    updateDisplay();
}

// --- Sign Toggle Function ---
function toggleSign() {
    if (currentOperand === 'Error' || currentOperand === '' || currentOperand === '0') {
        // Do nothing if error, empty, or zero (toggling sign of 0 is still 0)
        return;
    }
    const currentValue = parseFloat(currentOperand);
    if (isNaN(currentValue)) {
        return; // Should not happen if input is controlled, but good practice
    }

    currentOperand = (currentValue * -1).toString();
    // displayNeedsReset = false; // Similar to percentage, this is a direct modification
    updateDisplay();
}

// --- History Log Functions ---
function addCalculationToLog(expressionString) {
    calculationHistoryLog.unshift(expressionString);
    if (calculationHistoryLog.length > 20) {
        calculationHistoryLog.pop();
    }
    renderHistoryLog();
    saveHistoryToLocalStorage(); // Save after adding
}

function renderHistoryLog() {
    if (!historyLogListElement) return;
    historyLogListElement.innerHTML = '';

    calculationHistoryLog.forEach(entry => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        historyLogListElement.appendChild(listItem);
    });
}

// --- Event Listeners ---
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.dataset.number);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedOperator = button.dataset.operator;
        // Percentage is handled by its own button event listener now
        if (selectedOperator !== '=' ) { // Removed % check here
             chooseOperation(selectedOperator);
        }
    });
});

equalsButton.addEventListener('click', () => {
    if (operation == null || currentOperand === '' || previousOperand === '' || currentOperand === 'Error') {
        return; 
    }
    
    const logPrev = previousOperand;
    const logCurr = currentOperand; 
    const logOp = operation;
    
    const result = calculate(); // calculate() sets currentOperand to 'Error' or the result.

    if (currentOperand === 'Error') {
        // previousOperand is set by calculate() for error context.
        // Construct the string that led to error for the log
        addCalculationToLog(`${formatNumber(logPrev)} ${logOp} ${formatNumber(logCurr)} = Error`);
    } else {
        currentOperand = result; // Update currentOperand with the successful result.
        displayHistoryElement.textContent = `${formatNumber(logPrev)} ${logOp} ${formatNumber(logCurr)} =`; 
        addCalculationToLog(`${formatNumber(logPrev)} ${logOp} ${formatNumber(logCurr)} = ${formatNumber(result)}`);
        previousOperand = ''; 
    }
    
    operation = undefined; 
    displayNeedsReset = true; 
    updateDisplay();

    if(currentOperand !== 'Error') {
        // For successful ops, .display-history is already set above to show full eq. momentarily.
        // updateDisplay clears .display-history because 'operation' is now undefined. This is okay.
    }
});

allClearButton.addEventListener('click', clearAll);

deleteButton.addEventListener('click', deleteLastDigit);

percentButton.addEventListener('click', handlePercentage); // Add listener for percent button

signButton.addEventListener('click', toggleSign); // Add listener for sign toggle button

// --- Event Listeners for Controls ---
if (themeToggleButton) { // Add listener only if button exists
    themeToggleButton.addEventListener('click', toggleTheme);
}

// --- Keyboard Support ---
function handleKeyboardInput(event) {
    const key = event.key;
    let handled = true; // Assume we'll handle the key, prevent default if so for some keys

    if (key >= '0' && key <= '9') {
        appendNumber(key);
        updateDisplay();
    } else if (key === '.') {
        appendNumber(key);
        updateDisplay();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        chooseOperation(key);
        // updateDisplay() is called within chooseOperation
    } else if (key === 'Enter' || key === '=') {
        if (equalsButton) equalsButton.click(); // Simulate click on equals button
    } else if (key === 'Escape') {
        if (allClearButton) allClearButton.click(); // Simulate click on AC button
    } else if (key === 'Backspace') {
        if (deleteButton) deleteButton.click(); // Simulate click on DEL button
    } else if (key === '%') {
        if (percentButton) percentButton.click(); // Simulate click on % button
    }
    // Add more mappings if desired, e.g., for sign toggle (±)
    // else if (key === 's' || key === '_') { // Example for sign toggle
    // if (signButton) signButton.click();
    // }
    else {
        handled = false; // Key was not one of our calculator keys
    }

    // Prevent default action for certain keys if we handled them,
    // e.g. Backspace for navigation, Enter for form submission (though not applicable here).
    // Slash for quick find in Firefox.
    if (handled && (key === 'Backspace' || key === '/' || key === 'Enter' || key === '=' || key === 'Escape')) {
        event.preventDefault();
    }
}

window.addEventListener('keydown', handleKeyboardInput); // Add keyboard listener to window

// --- Initial Load ---
loadHistoryFromLocalStorage();
loadThemeFromLocalStorage(); // Load theme when script starts
updateDisplay();
