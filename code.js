// Liste der Kategorien
const kategorien = ['Tor', 'Foul', 'Ecke', 'Freistoß', 'Abseits', 'Elfmeter', 'Kopfball', 'Dribbling', 'Pass'];

// Funktion zum Ziehen von 3 zufälligen, einzigartigen Kategorien
function zieheKategorien() {
  const gezogeneKategorien = [];
  while (gezogeneKategorien.length < 3) {
    const zufallsIndex = Math.floor(Math.random() * kategorien.length);
    const kategorie = kategorien[zufallsIndex];
    if (!gezogeneKategorien.includes(kategorie)) {
      gezogeneKategorien.push(kategorie);
    }
  }
  return gezogeneKategorien;
}

// Erstelle das 4x4 Grid
function erstelleGrid() {
  const grid = Array(4).fill(null).map(() => Array(4).fill(''));
  const obereKategorien = zieheKategorien();
  const seitlicheKategorien = zieheKategorien();

  // Fülle die oberen und seitlichen Kategorien ein
  for (let i = 1; i < 4; i++) {
    grid[0][i] = obereKategorien[i - 1];
    grid[i][0] = seitlicheKategorien[i - 1];
  }

  return grid;
}

// Tic Tac Toe Logik hier einfügen

// Erstelle das Spielbrett im Browser
function erstelleSpielbrett(grid) {
  const spielbrett = document.createElement('table');
  for (let i = 0; i < grid.length; i++) {
    const zeile = document.createElement('tr');
    for (let j = 0; j < grid[i].length; j++) {
      const zelle = document.createElement('td');
      zelle.textContent = grid[i][j];
      zeile.appendChild(zelle);
    }
    spielbrett.appendChild(zeile);
  }
  document.body.appendChild(spielbrett);
}

// Spiel starten
const grid = erstelleGrid();
erstelleSpielbrett(grid);
