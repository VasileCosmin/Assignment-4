const buttons = document.querySelectorAll('button');

let firstInput = null;
let secondInput = null;
let firstOperator = null;
let secondOperator = null;
let result = null;
let displayText = '0';

function updateDisplay() {
  const display = document.querySelector('.display');
  display.innerText = displayText;
  if(displayText.length > 9) {
    display.innerText = displayText.substring(0, 9);
  }
}
updateDisplay();

function clickButton() {
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if(button.classList.contains('number')) {
        inputNumber(button.innerText);
        updateDisplay();
      }else if(button.classList.contains('operator')) {
        inputOperator(button.innerText);
        updateDisplay();
      }else if(button.innerText == 'AC') {
        deleteAll();
        updateDisplay();
      }else if (button.innerText == 'DEL') {
        deleteLastNumber();
        updateDisplay();
      }else if(button.innerText == '=') {
        inputEqual();
        updateDisplay();
      }else if(button.classList.contains('dot')) {
        inputDot(button.innerText);
        updateDisplay();
      }
    })
  })
}
clickButton();

function deleteAll() {
  displayText = '0'
  firstInput = null;
  secondInput = null;
  firstOperator = null;
  secondOperator = null;
  result = null;
}

function deleteLastNumber() {
  displayText = displayText.slice(0, -1)
  if(displayText.length < 1) {
    updateDisplay();
  }
}

function inputNumber(number) {
  if(firstOperator == null) {
    if(displayText == '0' || displayText == 0) {
      displayText = number;
    }else if(displayText == firstInput) {
      displayText = number;
    }else {
      displayText += number;
    }
  }else {
    if(displayText == firstInput) {
      displayText = number;
    }else {
      displayText += number;
    }
  }
}

function inputOperator(operator) {
  if(firstOperator != null && secondOperator == null) {
    secondOperator = operator;
    secondInput = displayText;
    result = operate(firstOperator, Number(firstInput), Number(secondInput));
    displayText = result;
    firstInput = displayText;
    result = null;
  }else if(firstOperator != null && secondOperator != null) {
    secondInput = displayText;
    result = operate(secondOperator, Number(firstInput), Number(secondInput));
    secondOperator = operator;
    displayText = result;
    firstInput = displayText;
    result = null;
  }else {
    firstOperator = operator;
    firstInput = displayText;
  }
}

function inputEqual() {
  if(firstOperator == null) {
    displayText = displayText;
  }else if(secondOperator != null) {
    secondInput == displayText;
    result = operate(secondOperator, Number(firstInput), Number(secondInput));
    displayText = result;
    firstInput = null;
    secondInput = null;
    secondOperator = null;
    result = null;
  }else {
    secondInput = displayText;
    result = operate(firstOperator, Number(firstInput), Number(secondInput));
    displayText = result;
    firstInput = displayText;
    secondInput = null;
    firstOperator = null;
    secondOperator = null;
    result = null
  }
}

function operate(operator, num1, num2) {
  if(operator == '+') {
    return num1 + num2;
  }else if(operator == '-') {
    return num1 - num2;
  }else if(operator == '*') {
    return num1 * num2;
  }else if(operator == '/') {
    return num1 / num2;
  }
}

function inputDot(dot) {
  if(displayText == firstInput || displayText == secondInput){
    displayText = '0';
    displayText += dot;
  }else if(!displayText.includes(dot)) {
    displayText += dot;
  }
}
