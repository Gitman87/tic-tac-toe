const players = [];
function createPlayer(number) {
  let name = prompt(`Player ${number} name: `, " ");
  let score = 0;
  number = number;

  return {
    name: name,
    score: score,
    number: number,
  };
}
const player1 = createPlayer(1);
players.push(player1);
const player2 = createPlayer(2);
players.push(player2);
console.log(`Player one: ${player1}`);
const rounds = prompt("How many round You want to play? ", " ");
let firstPlayer = prompt("Choose first player: ", " ");
let activePlayer = {};
console.log(`First player is:  ${firstPlayer}`);
if (firstPlayer == 1) {
  activePlayer = player1;
} else {
  activePlayer = player2;
}
console.log(activePlayer);

function playRound(activePlayer, board) {
  printBoard(board);
  let numberOfTurns = 0;
  do {
    playTurn(activePlayer, board);

    if (activePlayer.number == 1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
    numberOfTurns++;
  } while (strike(checkArray) < 1 || checkForNumberInArray(board, 0));

  // activePlayer.mark(board)
}
function playMatch(rounds) {
  for (let i = 0; i < rounds; i++) {
    playRound();
  }
  // checkWinner
}

let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
//print empty board
function printBoard(board) {
  for (let i = 0; i < 3; i++) {
    let joined = board[i].join(" ");
    console.log(`    ${joined}`);
  }
}
printBoard(board);
console.log(board[0][1]);
function playerGuess() {
  let playerPick = Math.floor(prompt("Type a number 0-8: ", " "));
  return playerPick;
}

let picked = 0; //global
function playTurn(activePlayer, board) {
  do {
    let playerChoice = playerGuess();

    switch (playerChoice) {
      case 0:
        if (board[0][0] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[0][0] = activePlayer.number;
          picked = 1;
        }

        break;
      case 1:
        if (board[0][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[0][1] = activePlayer.number;
          picked = 1;
        }
        break;
      case 2:
        if (board[0][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[0][2] = activePlayer.number;
          picked = 1;
        }
        break;
      case 3:
        if (board[1][0] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][0] = activePlayer.number;
          picked = 1;
        }
        break;
      case 4:
        if (board[1][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][1] = activePlayer.number;
          picked = 1;
        }
        break;
      case 5:
        if (board[1][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][2] = activePlayer.number;
          picked = 1;
        }
        break;
      case 6:
        if (board[2][0] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][0] = activePlayer.number;
          picked = 1;
        }
        break;
      case 7:
        if (board[2][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][1] = activePlayer.number;
          picked = 1;
        }
        break;
      case 8:
        if (board[2][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][2] = activePlayer.number;
          picked = 1;
        }
        break;
      default:
        alert("Only numbers in range  of 0-8!");
    }
  } while (picked == 0);
}

//arrays for checking strike
let checkArray = [
  [board[0][0], board[0][1], board[0][2]],
  [board[1][0], board[1][1], board[1][2]],
  [board[2][0], board[2][1], board[2][2]],
  [board[0][0], board[1][0], board[2][0]],
  [board[0][1], board[1][1], board[2][1]],
  [board[0][2], board[1][2], board[2][2]],
  [board[0][0], board[1][1], board[2][2]],
  [board[0][2], board[1][1], board[2][0]],
];

function strike(array) {
  let counter1 = 0;
  let counter2 = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i] == 1) {
      counter1++;
    } else if (array[i] == 2) {
      counter2++;
    } else {
      return 0;
    }
  }
  if (counter1 > 2) {
    return 1;
  } else if (counter2 > 2) {
    return 2;
  } else {
    return 0;
  }
}
function checkForNumberInArray(array, search) {
  return array.some((row) => row.includes(search));
}
