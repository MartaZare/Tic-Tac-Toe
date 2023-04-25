const playersTurn = document.getElementById("playersTurn") as HTMLElement;
const scoreboardDiv = document.getElementById("scoreboardDiv") as HTMLElement;
const scoreboardMessage = document.getElementById(
  "scoreboardMessage"
) as HTMLElement;
const gameBoradDiv = document.getElementById("gameBoradDiv") as HTMLElement;
const playerOnePoints = document.getElementById(
  "playerOnePoints"
) as HTMLElement;
const playerTwoPoints = document.getElementById(
  "playerTwoPoints"
) as HTMLElement;
const playAgainBtn = document.getElementById("playAgainBtn") as HTMLElement;
const restartGameBtn = document.getElementById("restartGameBtn") as HTMLElement;

const gameboard: string[] = new Array(9);
let turns: number = 0;
let gameOver: boolean = false;

const players: { name: string; symbol: string; points: number }[] = [
  { name: "playerOne", symbol: "X", points: 0 },
  { name: "playerTwo", symbol: "O", points: 0 },
];
let activePlayer: { name: string; symbol: string; points: number } = players[0];

renderBoard();

function renderBoard(): void {
  for (let i = 0; i < gameboard.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(i.toString());
    cell.classList.add("empty");
    cell.onclick = () => addSymbolToCell(cell);
    gameBoradDiv.appendChild(cell);
  }
}

function addSymbolToCell(activeCell: HTMLDivElement): void {
  if (gameOver) {
    return;
  } else {
    if (activeCell.classList.item(2) === "empty") {
      activeCell.classList.remove("empty");
      activeCell.innerHTML += activePlayer.symbol;
      if (activePlayer.symbol === "X") {
        activeCell.style.color = "#4ab6d5";
        activeCell.style.textShadow = "0 0 30px #919bd3";
      } else if (activePlayer.symbol === "O") {
        activeCell.style.color = "#db52b4";
        activeCell.style.textShadow = "0 0 30px #919bd3";
      }
      turns += 1;
      fillGameboardArray(activeCell);
    } else {
      return;
    }
  }
}

const switchPlayerTurn = () => {
  activePlayer = activePlayer === players[0] ? players[1] : players[0];

  if (activePlayer.symbol === "X") {
    playersTurn.innerHTML = "X";
  } else if (activePlayer.symbol === "O") {
    playersTurn.innerHTML = "O";
  }
};

function fillGameboardArray(filledDiv: HTMLElement) {
  let cellNumber: string | null = null;
  cellNumber = filledDiv.classList.item(1);
  gameboard[parseInt(cellNumber!)] = activePlayer.symbol;
  playRound(cellNumber!);
}

const playRound = (cellNumber: string): void => {
  if (checkWinner(cellNumber)) {
    declareWinner();
  } else if (turns === 9) {
    declareTie();
  }
  switchPlayerTurn();
};

const checkWinner = (cellNumber: string): boolean => {
  const winConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let possibleWinConditions: number[][] = [];

  for (let i = 0; i < winConditions.length; i++) {
    for (let j = 0; j < winConditions[i].length; j++) {
      if (winConditions[i][j] == parseInt(cellNumber)) {
        possibleWinConditions.push(winConditions[i]);
      }
    }
  }

  for (let k = 0; k < possibleWinConditions.length; k++) {
    let condition: number[] = possibleWinConditions[k];
    let conditionIndex1: number = condition[0];
    let conditionIndex2: number = condition[1];
    let conditionIndex3: number = condition[2];

    if (gameboard.every((elem) => elem !== undefined)) {
      if (
        gameboard[conditionIndex1] === activePlayer.symbol &&
        gameboard[conditionIndex2] === activePlayer.symbol &&
        gameboard[conditionIndex3] === activePlayer.symbol
      ) {
        activePlayer.points += 1;
        return true;
      }
    }
  }
  return false;
};

function declareWinner(): void {
  gameOver = true;
  clearDiv(scoreboardMessage);
  if (activePlayer.symbol === "X") {
    clearDiv(playerOnePoints);
    playerOnePoints.innerHTML = players[0].points.toString();
    scoreboardMessage.innerHTML += "Player X has won this round!";
    scoreboardMessage.style.color = "#4ab6d5";
  } else if (activePlayer.symbol === "O") {
    clearDiv(playerTwoPoints);
    playerTwoPoints.innerHTML = players[1].points.toString();
    scoreboardMessage.innerHTML += "Player O has won this round!";
    scoreboardMessage.style.color = "#db52b4";
  }
}

function declareTie(): void {
  gameOver = true;
  clearDiv(scoreboardMessage);
  scoreboardMessage.innerHTML += "It's a tie!";
}

function clearDiv(divToClear: HTMLElement): void {
  divToClear.innerHTML = "";
}

playAgainBtn.onclick = loadNewRound;
restartGameBtn.onclick = function (): void {
  loadNewRound();
  resetPlayersPoints();
};

function loadNewRound(): void {
  gameOver = false;
  turns = 0;
  clearDiv(gameBoradDiv);
  clearDiv(scoreboardMessage);
  clearArray(gameboard);
  renderBoard();
}

function resetPlayersPoints(): void {
  let result: boolean = window.confirm(
    "After restart the players scoores will be lost. Do you want to continue?"
  );
  if (result) {
    players[0].points = 0;
    players[1].points = 0;
    playerOnePoints.innerHTML = "";
    playerTwoPoints.innerHTML = "";
  } else {
    return;
  }
}

function clearArray(array: string[]): void {
  array.forEach((_, index) => (array[index] = ""));
}
