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
    "Uruguay",];
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
    "VfL Wolfsburg"];
const categories3 = ["Bundesliga Meister", "Premier League Meister", "La Liga Meister", "Serie A Meister",];
const categories4 = ["TW", "LV", "IV", "RV", "Trainer"];
const categories5 = ["über 1,80m", "unter 1,75m", "EM-Sieger", "WM-Sieger", "UCL-Sieger", "tätowiert"];

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
            if (i === 1 && j > 1) {
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

generateGameBoard();
assignClickHandlers(); // Initialzuweisung der Click-Handler

function assignClickHandlers() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent) { // Überprüfen, ob die Zelle leer ist
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer); // Füge entsprechende Klasse hinzu
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x'; // Wechsel Spieler
            }
        });
    });
}

let currentPlayer = 'x'; // Spieler 1 (X) beginnt
