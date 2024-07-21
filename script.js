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

//print empty board
function printBoard(board) {
  for (let i = 0; i < 3; i++) {
    let joined = board[i].join(" ");
    console.log(`    ${joined}`);
  }
}
function playerGuess() {
  let playerPick = Math.floor(prompt("Type a number 0-8: ", " "));
  return playerPick;
}
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
          console.log(board);
        }

        break;
      case 1:
        if (board[0][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[0][1] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 2:
        if (board[0][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[0][2] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 3:
        if (board[1][0] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][0] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 4:
        if (board[1][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][1] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 5:
        if (board[1][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[1][2] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 6:
        if (board[2][0] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][0] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 7:
        if (board[2][1] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][1] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      case 8:
        if (board[2][2] != 0) {
          alert("Field occupied! Try another");
          break;
        } else {
          board[2][2] = activePlayer.number;
          picked = 1;
          console.log(board);
        }
        break;
      default:
        alert("Only numbers in range  of 0-8!");
    }
  } while (picked == 0);
}

function strike(array) {
  let counter1 = 0;
  let counter2 = 0;
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < 3; j++) {
      if (array[i][j] == 1) {
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
}

// function checkForNumberInArray(array, search) {
//   return array.some((row) => row.includes(search));
// }
function playRound(activePlayer, board, player1, player2) {
  // clear board
  printBoard(board);
  console.log(`The board ${board}`);
  let freeFields = 9;
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

  let roundWinner = 0;

  for (let i = 0; i < freeFields; i++){
    if (strike(checkArray) > 0) {
      break;
    } else {
      console.log(`Active player is: ${activePlayer.name}`);
      playTurn(activePlayer, board);
      // freeFields--;
      checkArray = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[0][2], board[1][1], board[2][0]],
      ];
      console.log(`Check array is ${strike(checkArray)}`);
      console.log(`Check array is ${checkArray[0]}`);
      console.log(`Free fields ${freeFields}`);
      if (activePlayer.number == 1) {
        activePlayer = player2;
      } else {
        activePlayer = player1;
      }
    
    }
  }

 
// while (strike(checkArray) < 1 || freeFields > 0);

if (strike(checkArray) == 1) {
  roundWinner = 1;
  return roundWinner;
} else if (strike(checkArray) == 2) {
  roundWinner = 2;
  return roundWinner;

  // activePlayer.mark(board)
}
}

function playMatch() {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const players = [];

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
  printBoard(board);
  console.log(board);

  for (let i = 0; i < rounds; i++) {
    const board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    printBoard(board);
    let roundScore = playRound(activePlayer, board, player1, player2);
    console.log("round played");
    if (roundScore == 1) {
      player1.score++;
      console.log(`Player 1 score:${player1.score}`);
    } else if (roundScore == 2) {
      player2.score++;
      console.log(`Player 2 score:${player2.score}`);
    } else {
      console.log("Tie!");
    }
  }
  // checkWinner
  if (player1.score < player2.score) {
    alert(
      `${player1.score} : ${player2.score} - the winner is ${player2.name}!`
    );
  } else {
    alert(
      `${player1.score} : ${player2.score} - the winner is ${player1.name}!`
    );
  }
}
playMatch();
