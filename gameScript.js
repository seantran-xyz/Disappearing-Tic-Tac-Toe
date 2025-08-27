// =========================
// Tic Tac Toe Game Script
// =========================

// Grab references to important elements in the HTML
const cells = document.querySelectorAll("[data-cell]"); // all 9 tic tac toe cells
const messageElement = document.querySelector("#message"); // the "Player X's Turn" text
const restartButton = document.querySelector("#restartButton"); // restart button at bottom
let numOfMoves = 0;
let movesRecord = [];

// Keep track of whose turn it is (true = X's turn, false = O's turn)
let isXTurn = true;

// List of winning combinations
const winningCombinations = [
  // vertical combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // horizontal combinations
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //diagonal combinations
  [0, 4, 8],
  [6, 4, 2]

];

// -------------------------
// Function: startGame
// -------------------------
// This resets the board and prepares for a new round
function startGame() {
  isXTurn = true; // X always starts
  messageElement.textContent = "Player X's Turn"; // show starting message

  //reinitialize (in case of game restart)
  numOfMoves = 0;
  movesRecord = [];

  // Reset each cell
  cells.forEach(cell => {
    cell.textContent = "";                 // clear the "X" or "O"
    cell.classList.remove("x", "o");       // clear any styling classes
    // Add click listener — { once: true } means the cell can be clicked only once
    cell.addEventListener("click", handleClick, { once: true });
  });
}

// -------------------------
// Function: handleClick
// -------------------------
// This runs whenever a player clicks on a cell
function handleClick(e) {
  const cell = e.target; // the cell that was clicked
  const currentPlayer = isXTurn ? "x" : "o"; // if it's X's turn → "X", else "O"

  // Place the player's mark
  cell.classList.add(currentPlayer); // add class "x" or "o" for CSS styling
  numOfMoves++;
  movesRecord.push([...cells].indexOf(cell));

  // Delete the current player's last move
  // runs once both players have placed 3 marks each
  if(numOfMoves > 6){
    const oldestCell = cells[movesRecord[0]];
    oldestCell.classList.remove(currentPlayer);
    oldestCell.addEventListener("click", handleClick, { once: true });
    movesRecord.shift();
    // updates page and tab title once players realize the true function of the game
    document.title = 'Disappearing Tic Tac Toe';
    document.querySelector("#pageTitle").textContent = "Disappearing Tic Tac Toe";

  }

  // check if there is winner/draw/game continues and update message
  if (checkWin(currentPlayer)){
    messageElement.textContent = `Player ${isXTurn ? "X" : "O"} wins!`;
    cells.forEach(cell => {
      cell.removeEventListener("click", handleClick);
    });
  } else if (checkDraw()){
    messageElement.textContent = `Draw...`;
  } else {
    // Switch turns
    isXTurn = !isXTurn; // flip true ↔ false
    messageElement.textContent = `Player ${isXTurn ? "X" : "O"}'s Turn`;
  }
}

// -------------------------
// Function: checkWin
// -------------------------
// runs whenever a player clicks on a cell and checks if they made a winning combo
function checkWin(currentPlayer) {
  return winningCombinations.some(combination =>{
    return combination.every(index => {
      return cells[index].classList.contains(currentPlayer);
    });
  });
}

// -------------------------
// Function: checkDraw
// -------------------------
// runs whenever a player clicks on a cell and if they didn't make a winning combo,
// checks if all nine cells are marked
function checkDraw(){
  return [...cells].every(cell => 
    cell.classList.contains("x") || cell.classList.contains("o")
  );
}

// -------------------------
// Event: Restart Button
// -------------------------
// When the restart button is clicked, reset the game
restartButton.addEventListener("click", startGame);

// -------------------------
// Game Initialization
// -------------------------
// Start the game automatically when the page loads
startGame();
