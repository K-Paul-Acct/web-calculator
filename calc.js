let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
let operators = ['+', '-', '*', '/', '%', '^'];
let func = ['sin', 'arcsin', 'cos', 'arccos', 'tan', 'arctan',
    'cot', 'arccot'];

function clearAll() {
    up = '';
    bottom = ''; 
    operator = '';
    clearOutBeforeTyping = false;
    clearSubBeforeTyping = false;
    upIsFilled = false;
    out.textContent = 0;
    subout.textContent = '';
}

function DivisionCheck(a, b) {
    if (a === '0' && b === '0') {
        return 'Result is undefined';
    } else if (b === '0') {
        return 'Can not divide by zero';
    }
    return 'true';
}

function ComputeOperator(a, b, operator) {
    switch (operator) {
        case "+":
            return (+a) + (+b);
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "^":
            return Math.pow(a, b);
        case "%":
            if (DivisionCheck(a, b) === 'true')
                return a % b;
            else
                return DivisionCheck(a, b);
        case "/":
            if (DivisionCheck(a, b) === 'true')
                return a / b;
            else
                return DivisionCheck(a, b);
    }
    return '';
}

function ComputeFunc(a, func) {
    switch (func) {
        case "sin":
            return Math.sin(a);
        case "cos":
            return Math.cos(a);
        case "tan":
            return Math.tan(a);
        case "cot":
            return 1 / Math.tan(a);
        case "arcsin":
            return Math.asin(a);
        case "arccos":
            return Math.acos(a);
        case "arctan":
            return Math.atan(a);
        case "arccot":
            return Math.PI / 2 - Math.atan(a);
    }
}

function Factorial(s) {
    n = parseInt(s);
    let f = 1;
    for (i = 2; i <= n; i++) {
        f *= i;
    }
    return f;
  }

function AddZeroToDecimalPoint(a , s) {
    if (a === '' && s === '.')
        return '0';
    return '';
}
function OnClick(event) {
    if (!event.target.classList.contains('btn')) return;
    if (event.target.classList.contains('clear')) {
        clearAll();
        return;
    }

    let key = event.target.textContent;
    if (key.includes('x'))
        key = '^';

    if (clearSubBeforeTyping && !digits.includes(key)) {
        subout.textContent = '';
        clearSubBeforeTyping = false;
    }
    if (clearOutBeforeTyping) {
        out.textContent = up;
        clearOutBeforeTyping = false;
    }

    if (digits.includes(key)) {
        if (!upIsFilled) {
            up += AddZeroToDecimalPoint(up, key) + key;
            out.textContent = up;
        } else {
            bottom += AddZeroToDecimalPoint(bottom, key) + key;
            out.textContent = bottom;
        }
        return;
    }
    if (operators.includes(key)) {
        if (upIsFilled && operator !== '')
            up = ComputeOperator(up, bottom, operator);
        operator = key;
        console.log('1');
        subout.textContent = up + ' ' + operator + ' ';
        upIsFilled = true;
        bottom = '';
        return;
    }
    if (func.includes(key)) {
        if (operator !== '')
            up = ComputeOperator(up, bottom, operator);
        subout.textContent = key + '(' + up + ')=';
        up = ComputeFunc(up, key);
        out.textContent = up;
        upIsFilled = true;
        operator = '';
        bottom = '';
        clearOutBeforeTyping = true;
        clearSubBeforeTyping = true;
        return;
    }
    if (key === 'n!') {
        if (operator !== '')
            up = ComputeOperator(up, bottom, operator);
        subout.textContent = up + '! =';
        up = Factorial(up);
        out.textContent = up;
        upIsFilled = true;
        operator = '';
        bottom = '';
        clearOutBeforeTyping = true;
        clearSubBeforeTyping = true;
        return;
    }
    if (key === '=') {
        if (operator !== '')
            up = ComputeOperator(up, bottom, operator);
        subout.textContent += '' + bottom + ' =';
        out.textContent = up;
        operator = '';
        bottom = ''
        clearOutBeforeTyping = true;
        clearSubBeforeTyping = true;
        return;
    }
    if (key === '←') {
        if (clearSubBeforeTyping)
            return;
        let s = '';
        if (out.textContent !== '0') {
            s = out.textContent;
            s = s.slice(0, -1);
        }
        if (upIsFilled)
            bottom = s;
        else
            up = s;
        out.textContent = s;
        if (out.textContent === '')
            out.textContent = '0';
        return;
    }
    if (key === 'π') {
        if (upIsFilled) {
            bottom = Math.PI;
            out.textContent = bottom;
        } else {
            up = Math.PI;
            out.textContent = up;
        }
        return;
    }
    if (key === 'e') {
        if (upIsFilled) {
            bottom = Math.E;
            out.textContent = bottom;
        } else {
            up = Math.E;
            out.textContent = up;
        }
        return;
    }
    if (key === '+/-') {
        if (operator !== '')
            up = ComputeOperator(up, bottom, operator);
        up = up * (-1);
        subout.textContent = up ;
        out.textContent = up;
        upIsFilled = true;
        operator = '';
        bottom = '';
        clearOutBeforeTyping = true;
        clearSubBeforeTyping = true;
        return;
    }
}


let up = ' ';
let bottom = ''; 
let operator = '';
let clearOutBeforeTyping = false;
let clearSubBeforeTyping = false;
let upIsFilled = false;

let subout = document.querySelector('.subout');
let out = document.querySelector('.out');   

document.querySelector('.buttons').onclick = (event) => OnClick(event);
