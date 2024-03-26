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

// geänderte generateGameBoard Funktion
function generateGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; // Lösche vorhandene Inhalte

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
            } else if ((i === 1 && j > 1) || (j === 1 && i > 1)) {
                cell.classList.add('editable');
                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Kategorie eingeben';
                input.classList.add('category-input');
                cell.appendChild(input);
            } else {
                cell.classList.add('game-cell'); // Füge 'game-cell' Klasse für Spielfeld-Zellen hinzu
            }

            gameBoard.appendChild(cell);
        }
    }
}

// Neue Funktion, um Kategorien für die bestimmten Felder einzugeben
function enterCategories() {
    const inputs = document.querySelectorAll('.editable input');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            checkAndEndGame(); // Überprüfe, ob das Spiel beendet ist, nachdem eine Kategorie eingegeben wurde
        });
    });
}


function resetGame() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    generateGameBoard();
    assignClickHandlers(); // Füge Click-Handler wieder hinzu
}

function skipTurn() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    updateCurrentPlayerDisplay(); // Aufruf der Funktion zur Aktualisierung der Spieleranzeige
}

generateGameBoard();
enterCategories();
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

// Erstellen Sie einen Stapel, um die Indizes der Zellen zu speichern
const moveStack = [];

// Funktion, um einen Zug hinzuzufügen
function addMove(index) {
    moveStack.push(index); // Fügen Sie den Index der aktuellen Zelle zum Stapel hinzu
}
// Funktion, um die Hintergrundfarbe aller Zellen zurückzusetzen
function resetWinningCells(winningCells) {
    winningCells.forEach(cellIndex => {
        const cell = document.querySelector(`.cell:nth-child(${cellIndex + 1})`);
        cell.style.backgroundColor = 'white';
    });
}

function undoLastMove() {
    const cells = document.querySelectorAll('.cell');

    if (moveStack.length > 0) {
        const lastMoveIndex = moveStack.pop(); // Entferne den letzten Zug vom Stapel

        // Lösche den letzten Zug
        cells[lastMoveIndex].textContent = '';
        cells[lastMoveIndex].classList.remove('x', 'o');
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        updateCurrentPlayerDisplay();

        // Setze die Hintergrundfarbe der gewinnenden Zellen zurück
        const winInfo = checkWin();
        if (winInfo) {
            resetWinningCells(winInfo.cells);
        }
    }
}

function updateCurrentPlayerDisplay() {
    const currentPlayerText = document.getElementById('currentPlayer');
    currentPlayerText.textContent = currentPlayer.toUpperCase();
    currentPlayerText.classList.remove('player-x', 'player-o');
    currentPlayerText.classList.add(`player-${currentPlayer}`);
}

function assignClickHandlers() {
    const playableCells = [5, 6, 7, 9, 10, 11, 13, 14, 15]; // Indizes der spielbaren Zellen

    document.querySelectorAll('.cell').forEach((cell, index) => {
        if (playableCells.includes(index)) {
            cell.addEventListener('click', () => {
                if (!cell.textContent) {
                    cell.textContent = currentPlayer;
                    cell.classList.add(currentPlayer);
                    addMove(index); // Füge den Zug zum Stapel hinzu
                    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
                    document.getElementById('currentPlayer').textContent = currentPlayer.toUpperCase();
                    checkAndEndGame(); // Überprüfe, ob das Spiel beendet ist, nachdem ein Zug gemacht wurde
                }
            });
        } else {
            cell.classList.add('category-cell'); // Füge 'category-cell' Klasse für Kategorien-Zellen hinzu
        }
    });

    document.getElementById('skipButton').addEventListener('click', skipTurn);
}

// Weisen Sie dem Button das Event-Handler zu
document.getElementById('undoButton').addEventListener('click', undoLastMove);



let currentPlayer = 'x'; // Spieler 1 (X) beginnt
