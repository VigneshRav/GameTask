// Game variables
let cards = [];
let flippedCards = [];
let matchedCards = 0;
let totalMoves = 0;
let gameInProgress = true;

// Symbols for the game cards (8 unique symbols doubled for pairs)
const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const doubledSymbols = [...symbols, ...symbols]; // Doubling the symbols for pairs

// Shuffle function to randomize the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

// Create and render the game board
function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear any existing cards

    shuffle(doubledSymbols); // Shuffle the symbols

    // Create the card elements and append to the game board
    doubledSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    matchedCards = 0;
    totalMoves = 0;
    updateInfo();
    gameInProgress = true;
}

// Flip card function
function flipCard(card) {
    if (!gameInProgress || card.classList.contains('flipped') || flippedCards.length === 2) {
        return; // Don't flip if already flipped or if two cards are already flipped
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.symbol; // Show symbol on the card
    flippedCards.push(card);

    // Check for a match when two cards are flipped
    if (flippedCards.length === 2) {
        totalMoves++;
        updateInfo();
        checkMatch();
    }
}

// Check if the flipped cards match
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.symbol === card2.dataset.symbol) {
        // If cards match, add 'matched' class
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards += 2;
    } else {
        // If cards don't match, flip them back after a delay
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
        }, 1000);
    }

    flippedCards = [];

    // Check if the game is won
    if (matchedCards === doubledSymbols.length) {
        setTimeout(() => {
            alert('Congratulations! You matched all pairs!');
            gameInProgress = false;
        }, 500);
    }
}

// Update the information display (matches and moves)
function updateInfo() {
    document.getElementById('matches-count').textContent = matchedCards /2;
    document.getElementById('moves-count').textContent = totalMoves;
}

// Restart the game when the button is clicked
document.getElementById('restart-btn').addEventListener('click', () => {
    createBoard();
    gameInProgress = true;
});

// Initialize the game
createBoard();
