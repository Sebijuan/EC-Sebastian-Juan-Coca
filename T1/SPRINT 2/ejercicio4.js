let timer; 
let seconds = 0; 
let isRunning = false; 


function startTimer() {
    if (!isRunning) {
        isRunning = true; 
        timer = setInterval(() => {
            seconds++; 
            updateDisplay(); 
        }, 1000);
    }
}


function pauseTimer() {
    isRunning = false; 
    clearInterval(timer);
}


function resetTimer() {
    pauseTimer(); 
    seconds = 0; 
    updateDisplay(); 
}


function updateDisplay() {
    const minutes = Math.floor(seconds / 60); 
    const secs = seconds % 60; 
    document.getElementById("timer").textContent = 
        `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`; 
}


document.getElementById("startButton").addEventListener("click", startTimer);
document.getElementById("pauseButton").addEventListener("click", pauseTimer);
document.getElementById("resetButton").addEventListener("click", resetTimer);
