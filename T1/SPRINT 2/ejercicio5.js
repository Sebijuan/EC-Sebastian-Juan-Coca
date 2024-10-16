// Configuración del tablero de juego
const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];  // Cartas únicas
let cards = [...cardValues, ...cardValues];  // Duplicamos las cartas para hacer parejas
let firstCard = null;
let secondCard = null;
let flippedCards = 0;  // Cartas que ya han sido volteadas correctamente
let lockBoard = false;  // Para evitar que se hagan clics durante la comparación

// Referencia al tablero y al botón de reinicio
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
    if (lockBoard || this === firstCard) return;  // Prevenir doble clic o clics mientras comparamos
    this.textContent = this.getAttribute('data-value');  // Mostrar valor de la carta
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

    flippedCards += 2;  // Actualizar el conteo de cartas volteadas
    if (flippedCards === cards.length) {
        winMessage.classList.remove('hidden');  // Mostrar mensaje de victoria
    }
}

// Función para voltear las cartas que no coinciden
function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '';  // Ocultar valor de la carta
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);  // Esperar 1 segundo antes de voltear las cartas
}

// Función para reiniciar el estado del tablero
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Añadir evento al botón de reinicio
resetButton.addEventListener('click', initializeGame);

// Inicializar el juego la primera vez
initializeGame();
