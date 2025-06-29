console.log("hey there!");
const buttons = document.getElementById("buttons-container");
const stored = document.getElementById("stored");
const operationElement = document.getElementById("operation");
const display = document.getElementById("display");
let operationSign="", storedVariableStr="";
let operation=null, storedVariable=null, variable="0";

function UpdateDisplay(){
    if (!operation)
        operationElement.innerText="";
    else
        operationElement.innerText=operationSign;

    if (storedVariable===null)
        stored.innerText="";
    else
        stored.innerText=storedVariable;

    display.innerText=variable;
}

UpdateDisplay();

function add(a, b){
    return a+b;
}
function subtract(a, b){
    return a-b;
}
function multiply(a, b){
    return a*b;
}
function divide(a, b){
    return a/b;
}

function operate(operator, a, b){
    if (operator===divide)
        return "ERR";
    return operator(a, b)
}

function addDigit(d){
    if ((d==="0")&&(variable==="0"))
        return;

    if (variable==="0"){
        variable=d;
        return;
    }

    if (variable.length<9)
        variable+=d;
    
    return;
}

function addOperation(operator){
    storedVariable=variable;
    variable="0";
    operationSign=operator;

    if (operator==="+"){
        operation=add;
    }
    if (operator==="-"){
        operation=subtract;
    }
    if (operator==="*"){
        operation=multiply;
    }
    if (operator==="/"){
        operation=divide;
    }
    return;
}

buttons.addEventListener("click", (event)=>{
    const target=event.target;
    if (target.tagName!=="BUTTON")
        return;

    const text=target.innerText;
    const digitString="1234567890";
    const operationsString="+-*/";

    if (digitString.includes(text)){
        addDigit(text);
        UpdateDisplay();
    }

    if (operationsString.includes(text)){
        addOperation(text);
        UpdateDisplay();
    }
    
});