const scoreboardDiv = document.getElementById("scoreboardDiv");
const scoreboardMessage = document.getElementById("scoreboardMessage");
const gameBoradDiv = document.getElementById("gameBoradDiv");
const playerOnePoints = document.getElementById("playerOnePoints");
const playerTwoPoints = document.getElementById("playerTwoPoints");

const gameboard = ["", "", "", "", "", "", "", "", ""];
let turns = 0;

renderBoard();

function renderBoard() {
  for (let i = 0; i < gameboard.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(i);
    cell.classList.add("empty");
    cell.onclick = () => addSymbolToCell(cell);
    gameBoradDiv.appendChild(cell);
  }
}

function addSymbolToCell(activeCell) {
  if (activeCell.classList.item(2) === "empty") {
    activeCell.classList.remove("empty");
    activeCell.innerHTML += activePlayer.symbol;
    turns += 1;
    fillGameboardArray(activeCell);
  } else {
    return;
  }
}

const players = [
  { name: "playerOne", symbol: "X", points: 0 },
  { name: "playerTwo", symbol: "O", points: 0 },
];

let activePlayer = players[0];

const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];
};

function fillGameboardArray(filledDiv) {
  let cellNumber = filledDiv.classList.item(1);
  gameboard[parseInt(cellNumber)] = activePlayer.symbol;
  playRound(cellNumber);
}

const playRound = (cellNumber) => {
  if (checkWinner(cellNumber)) {
    declareWinner();
  } else if (turns === 9) {
    declareTie();
  }
  switchPlayerTurn();
};

const checkWinner = (cellNumber) => {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let possibleWinConditions = [];

  for (let i = 0; i < winConditions.length; i++) {
    for (let j = 0; j < winConditions[i].length; j++) {
      if (winConditions[i][j] == cellNumber) {
        possibleWinConditions.push(winConditions[i]);
      }
    }
  }

  for (let k = 0; k < possibleWinConditions.length; k++) {
    let condition = possibleWinConditions[k];
    let conditionIndex1 = condition[0];
    let conditionIndex2 = condition[1];
    let conditionIndex3 = condition[2];

    if (
      gameboard[conditionIndex1] === activePlayer.symbol &&
      gameboard[conditionIndex2] === activePlayer.symbol &&
      gameboard[conditionIndex3] === activePlayer.symbol
    ) {
      activePlayer.points += 1;
      return true;
    }
  }
  return false;
};

function declareWinner() {
  if (activePlayer.symbol == "X") {
    clearScoreboard(playerOnePoints);
    clearScoreboard(scoreboardMessage);

    playerOnePoints.innerHTML = players[0].points;
    scoreboardMessage.innerHTML += "Player X has won this round!";
  } else if (activePlayer.symbol == "O") {
    clearScoreboard(playerTwoPoints);
    clearScoreboard(scoreboardMessage);

    playerTwoPoints.innerHTML = players[1].points;
    scoreboardMessage.innerHTML += "Player O has won this round!";
  }
}

function declareTie() {
  clearScoreboard(scoreboardMessage);
  scoreboardMessage.innerHTML += "It's a tie!";
}

function clearScoreboard(divToClear) {
  divToClear.innerHTML == "";
}

function playAgain() {}
