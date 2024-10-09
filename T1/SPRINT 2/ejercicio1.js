const startButton = document.getElementById('startButton');
const secondsInput = document.getElementById('secondsInput');
const timeDisplay = document.getElementById('timeDisplay');

let timer; 


function startCountdown() {
    
    let seconds = parseInt(secondsInput.value);

    
    if (isNaN(seconds) || seconds <= 0) {
        timeDisplay.textContent = "Por favor, introduce un número de segundos válido.";
        return;
    }

    
    clearInterval(timer);

    
    timeDisplay.textContent = `Tiempo restante: ${seconds} segundos`;

   
    timer = setInterval(() => {
        seconds--;
        
        
        if (seconds > 0) {
            timeDisplay.textContent = `Tiempo restante: ${seconds} segundos`;
        } else {
            clearInterval(timer); 
            timeDisplay.textContent = "¡Tiempo finalizado!"; 
            alert("¡Tiempo finalizado!"); 
        }
    }, 1000);
}


startButton.addEventListener('click', startCountdown);
