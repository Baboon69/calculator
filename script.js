console.log("hey there!");
const buttons = document.getElementById("buttons-container");
const stored = document.getElementById("stored");
const operationElement = document.getElementById("operation");
const display = document.getElementById("display");
let operationSign="", storedVariableStr="";
let operation=null, storedVariable=null, variable="0";
let actualNumber,actualStoredNumber;
let longFlag=false,resetFlag=false,operationUpdateFlag=false;
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
    if ((operator===divide)&&(b===0))
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

function setOperation(o){
    if (o==="+"){
        operation=add;
    }
    if (o==="-"){
        operation=subtract;
    }
    if (o==="*"){
        operation=multiply;
    }
    if (o==="/"){
        operation=divide;
    }
}

function addOperation(operator){
    if(operationUpdateFlag){
        operationSign=operator;
        setOperation(operator);
        return;
    }

    if (operation!==null)
        sendOperate();
    if (longFlag){
        actualStoredNumber=actualNumber;
        actualNumber=0;
    }
    storedVariable=variable;
    variable="0";
    operationSign=operator;

    setOperation(operator);
    return;
}

function clear(){
    operation=null;
    operationSign="";
    storedVariable="";
    actualNumber=0;
    actualStoredNumber=0;
    variable="0";
    longFlag=false;
    resetFlag=false;
    operationUpdateFlag=false;
    return;
}

function sendOperate(){
    if(operation===null){
        return;
    }
    let res;
    if (longFlag)
        res=operate(operation,actualStoredNumber,Number(variable));
    
    else
        res=operate(operation,Number(storedVariable),Number(variable));
    clear();
    let resStr=String(res);
    if (resStr.length>9){
        actualNumber=res;
        variable=res.toExponential(5);
        longFlag=true;
        return;
    }
    variable=String(res);
}

function backspace(){
    if (variable==="0")
        return;
    if (variable.length===1){
        variable="0";
        return;
    }
    variable=variable.slice(0,-1);
    return;
}

function addPoint(){
    if(variable.includes("."))
        return;

    operationUpdateFlag=false;
    variable+=".";
    return;
}

buttons.addEventListener("click", (event)=>{
    const target=event.target;
    if (target.tagName!=="BUTTON")
        return;

    const text=target.innerText;
    const digitString="1234567890";
    const operationsString="+-*/";

    if (resetFlag){
        clear();
    }

    if (target.classList.contains("amen")){
        if (text==="A/C"){
            clear();
            UpdateDisplay();
            return;
        }

        if (variable==="ERR")
            return;

        if (text==="⌫"){
            backspace();
            UpdateDisplay();
            return;
        }
        
        if (text==="."){
            addPoint();
            UpdateDisplay();
        }
    }

    if (variable==="ERR")
        return;

    if (digitString.includes(text)){
        addDigit(text);
        operationUpdateFlag=false;
        UpdateDisplay();
    }

    if (operationsString.includes(text)){
        addOperation(text);
        operationUpdateFlag=true;
        UpdateDisplay();
    }
    
    if (text==="="){
        sendOperate();
        UpdateDisplay();
        resetFlag=true;
    }
});