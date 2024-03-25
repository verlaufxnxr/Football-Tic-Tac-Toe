function chooseRandomData(arrays, itemsPerArray) {
    const result = [];
    let remainingItems = itemsPerArray.reduce((acc, val) => acc + val, 0);

    arrays.forEach((array, index) => {
        const numItems = Math.min(array.length, itemsPerArray[index], remainingItems);
        for (let i = 0; i < numItems; i++) {
            const randomIndex = Math.floor(Math.random() * array.length);
            result.push(array[randomIndex]);
            remainingItems--;
        }
    });

    return result;
}

const categories = [    
    "Brasilien",
    "Argentinien",
    "Deutschland",
    "Spanien",
    "Frankreich",
    "England",
    "Italien",
    "Uruguay",
    "EM-Sieger",
];
const categories2 = [    
    "Manchester City",
    "Bayern München",
    "Real Madrid",
    "Paris SG",
    "FC Liverpool",
    "Inter Mailand",
    "FC Chelsea",
    "AS Rom",
    "Manchester Utd.",
    "Borussia Dortmund",
    "FC Barcelona",
    "Atlético Madrid",
    "Juventus Turin",
    "Bayer Leverkusen",
    "FC Arsenal",
    "Ajax Amsterdam",
    "AC Mailand",
    "Tottenham Hotspur",
    "Olympique Marseille",
    "Eintracht Frankfurt",
    "VfL Wolfsburg"
];
const categories3 = ["Bundesliga Meister", "Premier League Meister", "La Liga Meister", "Serie A Meister"];
const categories4 = ["Torwart", "Verteidiger", "Stürmer", "Trainer", "Mittelfeld", "Torschützenkönig"];
const categories5 = ["über 1,80m", "unter 1,75m", "WM-Sieger", "UCL-Sieger", "tätowiert"];

let originalCategories = categories.slice(); // Kopie der ursprünglichen Daten
let originalCategories2 = categories2.slice();
let originalCategories3 = categories3.slice();
let originalCategories4 = categories4.slice();
let originalCategories5 = categories5.slice();

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function generateGameBoard() {
    const gameBoard = document.getElementById('gameBoard');

    const itemsPerArray = [1, 2, 1, 1, 1]; // Anzahl der ausgewählten Elemente pro Array
    const shuffledCategories = chooseRandomData([originalCategories, originalCategories2, originalCategories3, originalCategories4, originalCategories5], itemsPerArray);
    shuffle(shuffledCategories);

    for (let i = 1; i <= 4; i++) {
        for (let j = 1; j <= 4; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            if (i === 1 && j === 1) {
                const status = document.createElement('div');
                status.classList.add('status');
                status.textContent = 'Am Zug: ';
                const currentPlayerSpan = document.createElement('span');
                currentPlayerSpan.id = 'currentPlayer';
                currentPlayerSpan.classList.add('currentPlayerSymbol');
                currentPlayerSpan.textContent = 'X';
                status.appendChild(currentPlayerSpan);
                cell.appendChild(status);
            } else if (i === 1 && j > 1) {
                cell.textContent = shuffledCategories[j - 2];
            } else if (i > 1 && j === 1) {
                cell.textContent = shuffledCategories[i + 1];
            }
            gameBoard.appendChild(cell);
        }
    }
}



function resetGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    // Wiederherstellen der ursprünglichen Daten
    originalCategories = categories.slice();
    originalCategories2 = categories2.slice();
    originalCategories3 = categories3.slice();
    originalCategories4 = categories4.slice();
    originalCategories5 = categories5.slice();
    
    generateGameBoard();
    assignClickHandlers(); // Füge Click-Handler wieder hinzu
}

function skipTurn() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateCurrentPlayerDisplay(); // Aufruf der Funktion zur Aktualisierung der Spieleranzeige
}

generateGameBoard();
assignClickHandlers(); // Initialzuweisung der Click-Handler

function checkWin() {
    const cells = document.querySelectorAll('.cell');

    const winningConditions = [
        // Horizontale Reihen
        [5, 6, 7],
        [9, 10, 11],
        [13, 14, 15],
        // Vertikale Reihen
        [5, 9, 13],
        [6, 10, 14],
        [7, 11, 15],
        // Diagonale Reihen
        [7, 10, 13],
        [5, 10, 15]
    ];

    for (const condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return { winner: cells[a].textContent, cells: condition }; // Rückgabe des Gewinners und der gewinnenden Zellen
        }
    }

    return null;
}

function endGame(winner, winningCells) {
    const currentPlayerText = document.getElementById('currentPlayer');
    currentPlayerText.textContent = `Spieler ${winner.toUpperCase()} hat gewonnen!`;
    currentPlayerText.classList.remove('player-x', 'player-o');

    // Färbe die Gewinnzellen grün ein
    winningCells.forEach(cellIndex => {
        const cell = document.querySelector(`.cell:nth-child(${cellIndex + 1})`);
        cell.style.backgroundColor = 'lightgreen';
    });

    // Verberge das "Am Zug:"-Element
    const statusElement = document.querySelector('.status');
    statusElement.textContent = `Spieler ${winner.toUpperCase()} hat gewonnen!`; // Ändere den Textinhalt auf einen leeren String
}



function checkAndEndGame() {
    const winInfo = checkWin();
    if (winInfo) {
        endGame(winInfo.winner, winInfo.cells);
    }
}

function assignClickHandlers() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent) {
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer);
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                document.getElementById('currentPlayer').textContent = currentPlayer.toUpperCase();
                checkAndEndGame(); // Überprüfe, ob das Spiel beendet ist, nachdem ein Zug gemacht wurde
            }
        });
    });

    document.getElementById('skipButton').addEventListener('click', skipTurn);
}

function skipTurn() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateCurrentPlayerDisplay(); // Aufruf der Funktion zur Aktualisierung der Spieleranzeige
    checkAndEndGame(); // Überprüfe, ob das Spiel beendet ist, nachdem ein Zug übersprungen wurde
}



function updateCurrentPlayerDisplay() {
    const currentPlayerText = document.getElementById('currentPlayer');
    currentPlayerText.textContent = currentPlayer.toUpperCase();
    currentPlayerText.classList.remove('player-x', 'player-o'); // Entferne vorherige Spielerklasse
    currentPlayerText.classList.add('currentPlayerSymbol', 'player-' + currentPlayer); // Füge aktuelle Spielerklasse hinzu
}

let currentPlayer = 'x'; // Spieler 1 (X) beginnt
