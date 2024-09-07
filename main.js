let num1 = ''; 
let num2 = ''; 
let operation = ''; 
let resultReady = false;

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['-', '+', 'X', '/', '+/-','%'];

// экран 
const display = document.querySelector('.display p');

function clearAll() {
    num1 = '';
    num2 = ''; 
    operation = ''; 
    resultReady = false;
    display.textContent = 0;
}

document.querySelector('.clear').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) => {
 
    if (!event.target.classList.contains('btn')) return;

    if (event.target.classList.contains('clear')) return;

    display.textContent = '';

    const input = event.target.textContent;

    if (digits.includes(input)) {
        if (input === '.' && (num1.includes('.') || (num2 !== '' && num2.includes('.')))) return;
        if (num2 === '' && operation === '') {
            num1 += input;
            display.textContent = num1;
        } else if (num1 !== '' && num2 !== '' && resultReady) {
            num2 = input;
            resultReady = false;
            display.textContent = num2;
        } else {
            num2 += input;
            display.textContent = num2;
        }
        console.table(num1, num2, operation);
        return;
    }


    if (operators.includes(input)) {
        if (input === '+/-') { 
            if (num2 !== '') { 
                num2 = -parseFloat(num2);
                display.textContent = num2;
            } else { 
                num1 = -parseFloat(num1);
                display.textContent = num1;
            }
            console.table(num1, num2, operation);
            return;
        } else {
            operation = input;
            display.textContent = operation;
            console.table(num1, num2, operation);
            return;
        }
    }

    if (input === '=') {
        if (num2 === '') num2 = num1;
        switch (operation) {
            case "+":
                num1 = (+num1) + (+num2);
                break;
            case "-":
                num1 = num1 - num2;
                break;
            case "%":
                num1 = num1 % num2;
                break
            case "X":
                num1 = num1 * num2;
                break;
            case "/":
                if (num2 === '0') {
                    display.textContent = 'Ошибка';
                    num1 = '';
                    num2 = '';
                    operation = '';
                    return;
                }
                num1 = num1 / num2;
                break;
        }
        
        num1 = parseFloat(num1.toFixed(2));
        resultReady = true;
        display.textContent = num1;
        console.table(num1, num2, operation);
    }
};