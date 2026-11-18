// Primero guardamos la pantalla y el grupo de botones que vamos a controlar.
const display = document.getElementById("display");
const keys = document.querySelector(".calculator__keys");

// Estas variables recuerdan el primer número y la operación pendiente.
let firstNumber = null;
let selectedOperator = null;
let resetDisplay = false;

// Agrega un dígito a la pantalla, reemplazando el resultado si corresponde.
function addNumber(number) {
    if (resetDisplay || display.value === "Error") {
        display.value = number;
        resetDisplay = false;
        return;
    }

    if (display.value === "0") {
        display.value = number;
    } else {
        display.value += number;
    }
}

// Agrega un punto decimal solo si el número todavía no tiene uno.
function addDecimalPoint() {
    if (resetDisplay || display.value === "Error") {
        display.value = "0.";
        resetDisplay = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

// Realiza una de las cuatro operaciones y devuelve null si no se puede calcular.
function calculate(number1, number2, operator) {
    let result;

    if (operator === "+") {
        result = number1 + number2;
    } else if (operator === "-") {
        result = number1 - number2;
    } else if (operator === "*") {
        result = number1 * number2;
    } else if (operator === "/") {
        if (number2 === 0) {
            return null;
        }
        result = number1 / number2;
    } else {
        return null;
    }

    // Redondeamos para evitar mostrar algunos residuos de decimales de JavaScript.
    return Number.isFinite(result) ? Number(result.toFixed(10)) : null;
}

// Muestra un error y deja la calculadora lista para empezar otra operación.
function showError() {
    display.value = "Error";
    firstNumber = null;
    selectedOperator = null;
    resetDisplay = true;
}

// Guarda el operador; si ya había uno pendiente, calcula primero de izquierda a derecha.
function chooseOperator(operator) {
    if (display.value === "Error") {
        return;
    }

    const currentNumber = Number(display.value);

    if (selectedOperator !== null && firstNumber !== null && !resetDisplay) {
        const result = calculate(firstNumber, currentNumber, selectedOperator);

        if (result === null) {
            showError();
            return;
        }

        display.value = String(result);
        firstNumber = result;
    } else {
        firstNumber = currentNumber;
    }

    selectedOperator = operator;
    resetDisplay = true;
}

// Calcula el resultado cuando se presiona el botón igual.
function showResult() {
    if (selectedOperator === null || firstNumber === null || resetDisplay) {
        return;
    }

    const secondNumber = Number(display.value);
    const result = calculate(firstNumber, secondNumber, selectedOperator);

    if (result === null) {
        showError();
        return;
    }

    display.value = String(result);
    firstNumber = null;
    selectedOperator = null;
    resetDisplay = true;
}

// Borra el último dígito; si no quedan dígitos, la pantalla vuelve a cero.
function deleteLastDigit() {
    if (display.value === "Error") {
        display.value = "0";
        resetDisplay = false;
        return;
    }

    if (resetDisplay) {
        return;
    }

    display.value = display.value.length > 1
        ? display.value.slice(0, -1)
        : "0";

    if (display.value === "-") {
        display.value = "0";
    }
}

// Restablece la pantalla y todas las variables guardadas.
function clearCalculator() {
    display.value = "0";
    firstNumber = null;
    selectedOperator = null;
    resetDisplay = false;
}

// Un solo listener sirve para todos los botones y decide la acción según sus atributos.
keys.addEventListener("click", function (event) {
    const button = event.target.closest("button");

    if (button === null) {
        return;
    }

    if (button.dataset.number !== undefined) {
        addNumber(button.dataset.number);
        return;
    }

    const action = button.dataset.action;

    if (action === "clear") {
        clearCalculator();
    } else if (action === "delete") {
        deleteLastDigit();
    } else if (action === "decimal") {
        addDecimalPoint();
    } else if (action === "operator") {
        chooseOperator(button.dataset.value);
    } else if (action === "equals") {
        showResult();
    }
});
