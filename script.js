// Selecting necessary elements
const prevDisplay = document.querySelector('.prev-display');
const currDisplay = document.querySelector('.curr-display');
const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const clearButton = document.querySelector('.clear-btn');
const deleteButton = document.querySelector('.delete');
const equalsButton = document.querySelector('.submit-btn');

// Variables to hold the current values
let currOperand = '';
let prevOperand = '';
let operation = undefined;

// Update the display
function updateDisplay() {
    currDisplay.innerText = currOperand;
    if (operation != null) {
        prevDisplay.innerText = `${prevOperand} ${operation}`;
    } else {
        prevDisplay.innerText = '';
    }
}

// Handle number input
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerText === '.' && currOperand.includes('.')) return;
        currOperand = currOperand.toString() + button.innerText.toString();
        updateDisplay();
    });
});

// Handle operation input
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currOperand === '') return;
        if (prevOperand !== '') {
            compute();
        }
        operation = button.innerText;
        prevOperand = currOperand;
        currOperand = '';
        updateDisplay();
    });
});

// Compute the result
function compute() {
    let computation;
    const prev = parseFloat(prevOperand);
    const curr = parseFloat(currOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (operation) {
        case '+':
            computation = prev + curr;
            break;
        case '-':
            computation = prev - curr;
            break;
        case '*':
            computation = prev * curr;
            break;
        case '/':
            computation = prev / curr;
            break;
        default:
            return;
    }
    currOperand = computation;
    operation = undefined;
    prevOperand = '';
}

// Handle equals button click
equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

// Handle clear button click
clearButton.addEventListener('click', () => {
    currOperand = '';
    prevOperand = '';
    operation = undefined;
    updateDisplay();
});

// Handle delete button click
deleteButton.addEventListener('click', () => {
    currOperand = currOperand.toString().slice(0, -1);
    updateDisplay();
});
