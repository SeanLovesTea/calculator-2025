const operatorsArr = document.querySelectorAll('.ops-btn');
const numbersArr = document.querySelectorAll('.num-btn');
const displayCalc = document.querySelector('.calculations');
const displayResults = document.querySelector('.results');
const equalsBTN = document.getElementById('equals-btn');
const clearBTN = document.getElementById('clear-btn');

let data = {
    currentOperater : null,
    num1 : null,
    num2 : null,
    result : null,
    previousResult: null,
    firstOperator: true,
    previousOperator : null,
    currentInput : null,
}

operatorsArr.forEach(el => {
    el.onclick = () => {
        handleOperater(el.id)
    }
});

numbersArr.forEach(el => {
    el.onclick = () => {
        handleInput (el.id)
        updateCalcDisplay (data.num1);
    }
});
function handleOperater (input) {
    if(data.firstOperator) {
        data.currentInput = "num2";
        data.firstOperator = false;
        data.currentOperater = input;
        clearDisplay ();
        updateCalcDisplay(input);
    } else {
        
        operate (input, data.num1, data.num2);
        console.log("here")
        data.previousOperator = data.currentOperater ;
        data.currentOperater = input;
        data.num1 = data.result;
        data.num2 = null;
        data.currentInput = "num2";
        clearDisplay ();
        updateCalcDisplay();
        
    }
}
function handleInput (inputValue) {
    if(data.currentInput == null) {
        data.currentInput = "num1";
        data.num1 = inputValue;
    } else if(data.currentInput == "num1") {
        data.num1 += inputValue;
    }

    if(data.currentInput == "num2"){
        data.currentInput = "num2+";
        data.num2 = inputValue;
    } else if (data.currentInput == "num2+"){
        data.num2 += inputValue;
    }
    clearDisplay ();
}
equalsBTN.onclick = () => {
   if (data.num1 && data.currentOperater && data.num2) {
    operate (data.currentOperater, data.num1, data.num2)
   }
}
clearBTN.onclick = () => {
    data.currentInput = null;
    data.currentOperater = null;
    data.firstOperator = true;
    data.num1 = null;
    data.num2 = null;
    data.previousOperator = null;
    data.previousResult = null;
    data.result = null;
    clearDisplay();
}

function updateCalcDisplay () {
    displayCalc.innerHTML = `
    ${data.num1 ? data.num1 : ""}
    ${data.currentOperater ? data.currentOperater : ""}
    ${data.num2 !== null ? data.num2 : ""}
    `;
}
function updateResultDisplay () {
    displayResults.innerHTML = data.result;
}
function clearDisplay () {
    displayCalc.innerHTML = '';
    displayResults.innerHTML = '';
}
function add (num1, num2) {
    return num1 + num2;
}

function operate (operater, num1, num2) {

    num1 = Number(num1);
    num2 = Number(num2);
    switch(operater){
        case "+":
            data.result = add(num1, num2);
            updateResultDisplay ();
            break;
    }
}