const gameBoard = document.getElementById('gameBoard');
const cells = Array.from(document.querySelectorAll('.cell'));
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;
const winningConditions = [
    [0, 1, 2,],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];

const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cells.indexOf(cell);
    if (cell.textContent || !gameActive) return;
    
    cell.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

const checkWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        alert(`Player ${currentPlayer} has won!`);
        gameActive = false;
        return;
    }

    const roundDraw = cells.every(cell => cell.textContent);
    if (roundDraw) {
        alert('Draw!');
        gameActive = false;
    }
};

const restartGame = () => {
    cells.forEach(cell => cell.textContent = '');
    gameActive = true;
    currentPlayer = 'X';
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
