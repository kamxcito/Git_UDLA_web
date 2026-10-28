const display = document.querySelector("#display");

// Conservan el primer número y la operación mientras se escribe el segundo.
let primerNumero = null;
let operacion = null;
let iniciarNumero = true;

// Actualiza el texto de la pantalla.
function mostrarEnDisplay(valor) {
    display.value = String(valor);
}

// Agrega un dígito; después de un resultado comienza un número nuevo.
function agregarNumero(numero) {
    const digito = String(numero);
    if (!/^[0-9]$/.test(digito)) return;
    if (iniciarNumero || display.value === "0") {
        mostrarEnDisplay(digito);
        iniciarNumero = false;
    } else {
        mostrarEnDisplay(display.value + digito);
    }
}

// Guarda la operación y prepara la entrada del siguiente número.
function seleccionarOperacion(simbolo) {
    if (!["+", "-", "*", "/"].includes(simbolo)) return;
    if (!Number.isFinite(Number(display.value))) return;
    if (operacion !== null && !iniciarNumero) {
        calcularResultado();
        if (!Number.isFinite(Number(display.value))) return;
    }
    primerNumero = Number(display.value);
    operacion = simbolo;
    iniciarNumero = true;
}

// Calcula con ambos números, sin ejecutar el texto de la pantalla como código.
function calcularResultado() {
    if (operacion === null || iniciarNumero) return;
    const segundoNumero = Number(display.value);
    let resultado;
    switch (operacion) {
        case "+": resultado = primerNumero + segundoNumero; break;
        case "-": resultado = primerNumero - segundoNumero; break;
        case "*": resultado = primerNumero * segundoNumero; break;
        // Dividir entre cero produce un mensaje de error en la pantalla.
        case "/": resultado = segundoNumero === 0 ? NaN : primerNumero / segundoNumero; break;
    }
    mostrarEnDisplay(Number.isFinite(resultado) ? resultado : "Error");
    primerNumero = null;
    operacion = null;
    iniciarNumero = true;
}

// Borra la operación anterior y devuelve la pantalla a su estado inicial.
function limpiarDisplay() {
    mostrarEnDisplay(0);
    primerNumero = null;
    operacion = null;
    iniciarNumero = true;
}

// Ejemplo para probar en la consola del navegador:
// agregarNumero(8); seleccionarOperacion("+"); agregarNumero(2); calcularResultado();
// La pantalla mostrará 10. limpiarDisplay() permite volver a empezar.

// Cada botón numérico envía su número a la función que actualiza el display.
for (let numero = 0; numero <= 9; numero++) {
    document.querySelector(`#btn${numero}`).addEventListener("click", () => {
        agregarNumero(numero);
    });
}

// Relacionamos los identificadores de los botones con su operación.
const botonesOperacion = {
    btnSuma: "+",
    btnResta: "-",
    btnMultiplicacion: "*",
    btnDivision: "/"
};

for (const id in botonesOperacion) {
    document.querySelector(`#${id}`).addEventListener("click", () => {
        seleccionarOperacion(botonesOperacion[id]);
    });
}

// Igual resuelve la operación pendiente y C reinicia la calculadora.
document.querySelector("#btnIgual").addEventListener("click", calcularResultado);
document.querySelector("#btnLimpiar").addEventListener("click", limpiarDisplay);
