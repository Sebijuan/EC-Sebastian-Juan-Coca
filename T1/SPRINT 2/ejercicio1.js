// Obtener los elementos del DOM
const startButton = document.getElementById('startButton');
const secondsInput = document.getElementById('secondsInput');
const timeDisplay = document.getElementById('timeDisplay');

let timer; // Variable para el temporizador

// Función para iniciar la cuenta regresiva
function startCountdown() {
    // Obtener el número de segundos ingresado por el usuario
    let seconds = parseInt(secondsInput.value);

    // Verificar si el valor es válido
    if (isNaN(seconds) || seconds <= 0) {
        timeDisplay.textContent = "Por favor, introduce un número de segundos válido.";
        return;
    }

    // Limpiar cualquier temporizador previo
    clearInterval(timer);

    // Mostrar el tiempo inicial
    timeDisplay.textContent = `Tiempo restante: ${seconds} segundos`;

    // Iniciar la cuenta regresiva
    timer = setInterval(() => {
        seconds--;
        
        // Actualizar el tiempo restante
        if (seconds > 0) {
            timeDisplay.textContent = `Tiempo restante: ${seconds} segundos`;
        } else {
            clearInterval(timer); // Detener el temporizador
            timeDisplay.textContent = "¡Tiempo finalizado!"; // Mostrar mensaje al finalizar
            alert("¡Tiempo finalizado!"); // Mostrar alerta
        }
    }, 1000);
}

// Añadir el evento al botón de inicio
startButton.addEventListener('click', startCountdown);
