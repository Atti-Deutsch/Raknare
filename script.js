const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button'); 
const clearBtn = document.getElementById('clear-btn');

// Calculate first and second values, depending on operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

    '=': (firstNumber, secondNumber) => secondNumber,
};

let firstValue = 0; //number
let operatorValue = ''; //empty string
let awaitingNextValue = false; // boolean

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false; //only true again when a operator is pressed
    } else {
        // If current display value is 0, replace it, if not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    // If operator pressed, don´t add decimal
    if (awaitingNextValue) return;  // (awaitNextValue === true) don´t run rest of function
    // If no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    } 
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) return;  
    // Assign first value if no value exist (loading page first time value = 0 "let firstValue")
    if (!firstValue) {
       firstValue = currentValue; 
    } else {
        // Store result calc object
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    // ready for nex value, store operator
    awaitingNextValue = true;  //triggered after operator press(second value)
    operatorValue = operator;
}

// Reset all values, display
function resetAll() {
    firstValue = 0; //number
    operatorValue = ''; //empty string
    awaitingNextValue = false; // boolean
    calculatorDisplay.textContent = '0';
}

// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => { 
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
     } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Event Listener
clearBtn.addEventListener('click', resetAll);
