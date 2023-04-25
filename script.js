var playersTurn = document.getElementById("playersTurn");
var scoreboardDiv = document.getElementById("scoreboardDiv");
var scoreboardMessage = document.getElementById("scoreboardMessage");
var gameBoradDiv = document.getElementById("gameBoradDiv");
var playerOnePoints = document.getElementById("playerOnePoints");
var playerTwoPoints = document.getElementById("playerTwoPoints");
var playAgainBtn = document.getElementById("playAgainBtn");
var restartGameBtn = document.getElementById("restartGameBtn");
var gameboard = new Array(9).fill("");
var turns = 0;
var gameOver = false;
var players = [
    { name: "playerOne", symbol: "X", points: 0 },
    { name: "playerTwo", symbol: "O", points: 0 },
];
var activePlayer = players[0];
renderBoard();
function renderBoard() {
    var _loop_1 = function (i) {
        var cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(i.toString());
        cell.classList.add("empty");
        cell.onclick = function () { return addSymbolToCell(cell); };
        gameBoradDiv.appendChild(cell);
    };
    for (var i = 0; i < gameboard.length; i++) {
        _loop_1(i);
    }
}
function addSymbolToCell(activeCell) {
    if (gameOver) {
        return;
    }
    else {
        if (activeCell.classList.item(2) === "empty") {
            activeCell.classList.remove("empty");
            activeCell.innerHTML += activePlayer.symbol;
            if (activePlayer.symbol === "X") {
                activeCell.style.color = "#4ab6d5";
                activeCell.style.textShadow = "0 0 30px #919bd3";
            }
            else if (activePlayer.symbol === "O") {
                activeCell.style.color = "#db52b4";
                activeCell.style.textShadow = "0 0 30px #919bd3";
            }
            turns += 1;
            fillGameboardArray(activeCell);
        }
        else {
            return;
        }
    }
}
var switchPlayerTurn = function () {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    if (activePlayer.symbol === "X") {
        playersTurn.innerHTML = "X";
    }
    else if (activePlayer.symbol === "O") {
        playersTurn.innerHTML = "O";
    }
};
function fillGameboardArray(filledDiv) {
    var cellNumber = null;
    cellNumber = filledDiv.classList.item(1);
    gameboard[parseInt(cellNumber)] = activePlayer.symbol;
    playRound(cellNumber);
}
var playRound = function (cellNumber) {
    if (checkWinner(cellNumber)) {
        declareWinner();
    }
    else if (turns === 9) {
        declareTie();
    }
    switchPlayerTurn();
};
var checkWinner = function (cellNumber) {
    var winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    var possibleWinConditions = [];
    for (var i = 0; i < winConditions.length; i++) {
        for (var j = 0; j < winConditions[i].length; j++) {
            if (winConditions[i][j] == parseInt(cellNumber)) {
                possibleWinConditions.push(winConditions[i]);
            }
        }
    }
    for (var k = 0; k < possibleWinConditions.length; k++) {
        var condition = possibleWinConditions[k];
        var conditionIndex1 = condition[0];
        var conditionIndex2 = condition[1];
        var conditionIndex3 = condition[2];
        if (gameboard.every(function (elem) { return elem !== undefined; })) {
            if (gameboard[conditionIndex1] === activePlayer.symbol &&
                gameboard[conditionIndex2] === activePlayer.symbol &&
                gameboard[conditionIndex3] === activePlayer.symbol) {
                activePlayer.points += 1;
                return true;
            }
        }
    }
    return false;
};
function declareWinner() {
    gameOver = true;
    clearDiv(scoreboardMessage);
    if (activePlayer.symbol === "X") {
        clearDiv(playerOnePoints);
        playerOnePoints.innerHTML = players[0].points.toString();
        scoreboardMessage.innerHTML += "Player X has won this round!";
        scoreboardMessage.style.color = "#4ab6d5";
    }
    else if (activePlayer.symbol === "O") {
        clearDiv(playerTwoPoints);
        playerTwoPoints.innerHTML = players[1].points.toString();
        scoreboardMessage.innerHTML += "Player O has won this round!";
        scoreboardMessage.style.color = "#db52b4";
    }
}
function declareTie() {
    gameOver = true;
    clearDiv(scoreboardMessage);
    scoreboardMessage.innerHTML += "It's a tie!";
}
function clearDiv(divToClear) {
    divToClear.innerHTML = "";
}
playAgainBtn.onclick = loadNewRound;
restartGameBtn.onclick = function () {
    loadNewRound();
    resetPlayersPoints();
};
function loadNewRound() {
    gameOver = false;
    turns = 0;
    clearDiv(gameBoradDiv);
    clearDiv(scoreboardMessage);
    clearArray(gameboard);
    renderBoard();
}
function resetPlayersPoints() {
    var result = window.confirm("After restart the players scoores will be lost. Do you want to continue?");
    if (result === true) {
        players[0].points = 0;
        players[1].points = 0;
        playerOnePoints.innerHTML = "";
        playerTwoPoints.innerHTML = "";
    }
    else {
        return;
    }
}
function clearArray(array) {
    array.forEach(function (_, index) { return (array[index] = ""); });
}
