
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];  
let cards = [...cardValues, ...cardValues]; 
let firstCard = null;
let secondCard = null;
let flippedCards = 0;  
let lockBoard = false;  


const gameBoard = document.getElementById('gameBoard');
const winMessage = document.getElementById('winMessage');
const resetButton = document.getElementById('resetButton');

// Crear las cartas en el tablero
function initializeGame() {
    // Mezclar las cartas
    cards = [...cardValues, ...cardValues];
    cards = cards.sort(() => 0.5 - Math.random());

    // Limpiar el tablero
    gameBoard.innerHTML = '';
    winMessage.classList.add('hidden');
    flippedCards = 0;
    resetBoard();

    // Crear las cartas y agregarlas al tablero
    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value);
        card.setAttribute('id', `card-${index}`);
        card.textContent = '';  // Inicialmente vacías
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Función para voltear una carta
function flipCard() {
    if (lockBoard || this === firstCard) return;  
    this.textContent = this.getAttribute('data-value');  
    this.classList.add('flipped');

    if (!firstCard) {
        // Asignar la primera carta seleccionada
        firstCard = this;
    } else {
        // Asignar la segunda carta y bloquear el tablero
        secondCard = this;
        lockBoard = true;

        // Comparar cartas
        if (firstCard.getAttribute('data-value') === secondCard.getAttribute('data-value')) {
            disableCards();  // Si coinciden, desactivarlas
        } else {
            unflipCards();  // Si no coinciden, voltearlas nuevamente
        }
    }
}

// Función para desactivar las cartas que han sido emparejadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();

    flippedCards += 2;  
    if (flippedCards === cards.length) {
        winMessage.classList.remove('hidden');  
    }
}

// Función para voltear las cartas que no coinciden
function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '';  
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);  
}

// Función para reiniciar el estado del tablero
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Añadir evento al botón de reinicio
resetButton.addEventListener('click', initializeGame);

// Inicializar el juego la primera vez
initializeGame();
