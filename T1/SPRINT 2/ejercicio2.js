
const calculateButton = document.getElementById('calculateButton');
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const resultDisplay = document.getElementById('result');


function calculate() {
    
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = "Por favor, introduce números válidos.";
        return;
    }

    
    let result;

   
    switch (operation) {
        case "sum":
            result = num1 + num2;
            break;
        case "sub":
            result = num1 - num2;
            break;
        case "mul":
            result = num1 * num2;
            break;
        case "div":
          
            if (num2 === 0) {
                result = "INDEFINIDO";
            } else {
                result = num1 / num2;
            }
            break;
        default:
            result = "Operación no válida";
    }

   
    resultDisplay.textContent = `Resultado: ${result}`;
}


calculateButton.addEventListener('click', calculate);
