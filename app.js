const gameBoradDiv = document.getElementById("gameBoradDiv");
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
  { name: "playerOne", symbol: "X" },
  { name: "playerTwo", symbol: "O" },
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
    alert("Player ... have won!");
  } else if (turns === 9) {
    alert("That's a draw!");
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
      return true;
    }
  }
  return false;
};
