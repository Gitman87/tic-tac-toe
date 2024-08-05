function createPlayer(number, name) {
  let score = 0;

  return {
    name: name,
    score: score,
    number: number,
  };
}

function GameBoard() {
  const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const caps = document.querySelectorAll(".cap");

  function clearBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = 0;
      if (caps[i]) {
        caps[i].innerHTML = "";
        caps[i].style = "";
      } else {
        console.error(`Cap at index ${i} is undefined.`);
      }
    }
  }
  function clearBoardRed() {
    for (let i = 0; i < board.length; i++) {
      board[i] = 0;
      if (caps[i]) {
        caps[i].innerHTML = "";
        caps[i].style = "";
      } else {
        console.error(`Cap at index ${i} is undefined.`);
      }
    }
  }

  const player1ScoreField = document.querySelector("#player1-score");
  const player2ScoreField = document.querySelector("#player2-score");

  const getBoard = () => board;
  const getCaps = () => caps;
  const paintCaps = (cap1, cap2, cap3) => {
    for (let i = 0; i < 3; i++) {
      const filed1 = document.querySelector(`[data-id="${cap1}"]`);
      filed1.style.backgroundColor = "red";
      const filed2 = document.querySelector(`[data-id="${cap2}"]`);
      filed2.style.backgroundColor = "red";
      const filed3 = document.querySelector(`[data-id="${cap3}"]`);
      filed3.style.backgroundColor = "red";
    }
  };
  //dialog - show winner and ask for replay
  const dialog = document.querySelector("#replay");
  const yes = document.querySelector("#yes");
  const no = document.querySelector("#no");
  const winner = document.querySelector("#show-winner");
  //tie
  const tieDialog = document.querySelector("#tie-dialog");
  const tieReplay = document.querySelector("#tie-replay");
  const tieClose = document.querySelector("#tie-close");
  //occupied
  const occupied = document.querySelector("#occupied");
  const tieAlert = document.querySelector("#tie-alert");
  //player won round
  const playerWon = document.querySelector("#player-won-round");
  const playerWonPara = document.querySelector("#player-won-para");

  const showWinnerOfRound = (player) => {
    playerWonPara.textContent = `${player.name} has won the round`;
    playerWon.showModal();
    setTimeout(() => {
      playerWon.close();
    }, 1700);
  };
  const askReplay = (player, player1, player2, activePlayer) => {
    dialog.showModal();
    winner.textContent = `${player.name}`;
    no.addEventListener("click", () => {
      dialog.close();
      window.location.reload(true);
    });
    yes.addEventListener("click", () => {
      dialog.close();
      playReplay(player1, player2, activePlayer);
    });
  };
  const tieShow = (player1, player2, activePlayer) => {
    tieDialog.showModal();

    tieReplay.addEventListener("click", () => {
      tieDialog.close();
      playReplay(player1, player2, activePlayer);
    });
    tieClose.addEventListener("click", () => {
      window.location.reload(true);
    });
  };
  // play replay
  const playReplay = (player1, player2, activePlayer) => {
    player1.score = 0;
    player2.score = 0;
    activePlayer.score = 0;
    player1ScoreField.textContent = "";
    player2ScoreField.textContent = "";

    setTimeout(() => {
      clearBoard();
    }, 2000);
  };
  function showTie() {
    tieAlert.showModal();
    setTimeout(() => {
      tieAlert.close();
    }, 1500);
  }

  function addCapsListener(
    activePlayer,
    player1,
    player2,
    switchPlayerTurn,
    roundsPlayed,
    rounds
  ) {
    caps.forEach((item) => {
      item.addEventListener("click", () => {
        let index = item.dataset.id;
        if (activePlayer === player1) {
          activePlayer = player2;
        } else {
          activePlayer = player1;
        }
        if (board[index] == 0) {
          board[index] = activePlayer.number;
          item.innerHTML = activePlayer.number;
          if (checkWinner()) {
            console.log(`checkwinner array is: ${checkWinner()[2]}`);
            paintCaps(checkWinner()[0], checkWinner()[1], checkWinner()[2]);
            showWinnerOfRound(activePlayer);
            console.log(`Player ${activePlayer.name} wins!`);

            activePlayer.score++;
            player1ScoreField.textContent = player1.score;
            player2ScoreField.textContent = player2.score;
            roundsPlayed++;
            console.log(`Rounds played: ${roundsPlayed}`);

            if (roundsPlayed >= rounds) {
              if (player1.score > player2.score) {
                askReplay(player1, player1, player2, activePlayer);
                roundsPlayed = 0;
                player1.score = 0;
                player2.score = 0;
                console.log(`Rounds played player1 won: ${roundsPlayed}`);
              } else if (player1.score < player2.score) {
                askReplay(player2, player1, player2, activePlayer);
                roundsPlayed = 0;
                player1.score = 0;
                player2.score = 0;
                console.log(`Rounds played player2 won: ${roundsPlayed}`);
              } else {
                tieShow(player1, player2, activePlayer);
                roundsPlayed = 0;

                player1.score = 0;
                player2.score = 0;
                console.log(`Rounds played tie: ${roundsPlayed}`);
              }
            }

            setTimeout(() => {
              clearBoard();
            }, 2000);
          } else if (board.every((cell) => cell != 0)) {
            showTie();
            roundsPlayed++;
            if (roundsPlayed >= rounds) {
              if (player1.score > player2.score) {
                askReplay(player1, player1, player2, activePlayer);
                roundsPlayed = 0;
                player1.score = 0;
                player2.score = 0;
              } else if (player1.score < player2.score) {
                askReplay(player2, player1, player2, activePlayer);
                roundsPlayed = 0;
                player1.score = 0;
                player2.score = 0;
              } else {
                tieShow(player1, player2, activePlayer);
                roundsPlayed = 0;

                player1.score = 0;
                player2.score = 0;
              }
            }
            setTimeout(() => {
              clearBoard();
            }, 2000);
          } else {
            switchPlayerTurn();
          }
        } else {
          occupied.showModal();
          setTimeout(() => {
            occupied.close();
          }, 700);
        }
      });
    });
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // dolumns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];
    const checkHit = (pattern) =>
      board[pattern[0]] == board[pattern[1]] &&
      board[pattern[1]] == board[pattern[2]] &&
      board[pattern[0]] != 0;
    for (let i = 0; i < winPatterns.length; i++) {
      if (checkHit(winPatterns[i])) {
        return winPatterns[i];
      }
    }
    // return winPatterns.some(
    //   (pattern) =>
    //     board[pattern[0]] == board[pattern[1]] &&
    //     board[pattern[1]] == board[pattern[2]] &&
    //     board[pattern[0]] != 0
    // );
  }

  return { addCapsListener, clearBoard, getBoard, getCaps };
}

function playRound(player1, player2, roundsPlayed, rounds) {
  const game = GameBoard();
  game.clearBoard();

  let activePlayer = player1;

  const switchPlayerTurn = () => {
    document.querySelector(
      "#player-turn"
    ).textContent = `${activePlayer.name}'s turn`;

    return (activePlayer = activePlayer === player1 ? player2 : player1);
  };

  switchPlayerTurn(); // Initialize turn display
  game.addCapsListener(
    activePlayer,
    player1,
    player2,
    switchPlayerTurn,
    roundsPlayed,
    rounds
  );
}

function playMatch() {
  const playerOneName = document.querySelector("#playerone-input").value;
  const playerTwoName = document.querySelector("#playertwo-input").value;
  let player1 = createPlayer("O", playerOneName);
  let player2 = createPlayer("X", playerTwoName);
  const rounds = document.querySelector("#rounds").value;
  console.log(`rounds: ${rounds}`);
  let roundsPlayed = 0;

  playRound(player1, player2, roundsPlayed, rounds);
}

function startGame() {
  const playButton = document.querySelector("#play");
  playButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    playMatch();
  });
}
window.onload = function () {
  document.getElementById("player-form").reset();
};

document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
});
