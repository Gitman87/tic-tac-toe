function createPlayer(number, name) {
  let score = 0;

  return {
    name: name,
    score: score,
    number: number
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
      } else {
        console.error(`Cap at index ${i} is undefined.`);
      }
    }
  }

  const getBoard = () => board;
  const getCaps = () => caps;

  function addCapsListener(activePlayer,player1, player2, switchPlayerTurn) {
    caps.forEach((item) => {
      item.addEventListener("click", () => {
        let index = item.dataset.id;
        if(activePlayer===player1){
          activePlayer=player2;
        }
        else{
          activePlayer=player1;
        }
        if (board[index] == 0) {
          board[index] = activePlayer.number;
          item.innerHTML = activePlayer.number;
          if (checkWinner()) {
            alert(`Player ${activePlayer.name} wins!`);
            activePlayer.score++;
            console.log(`active player score:${activePlayer.score}`);
            console.log(`Player1 score: ${player1.score} and player2 score:${player2.score}`)
            clearBoard();
          } else if (board.every(cell => cell != 0)) {
            alert("It's a tie!");
            clearBoard();
          } else {
            
            switchPlayerTurn();
          }
        } else {
          alert("Field Occupied!");
        }
      });
    });
  }

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winPatterns.some(pattern =>
      board[pattern[0]] == board[pattern[1]] &&
      board[pattern[1]] == board[pattern[2]] &&
      board[pattern[0]] != 0
    );
  }

  return { addCapsListener, clearBoard, getBoard, getCaps };
}

function playRound(player1, player2) {
  const game = GameBoard();
  game.clearBoard();
  let roundWinner=0;
  let activePlayer = player1;
  
  const switchPlayerTurn = () => {
    document.getElementById("player-turn").textContent = `${activePlayer.name}'s turn`;

     return activePlayer = activePlayer === player1 ? player2 : player1;
  };

  switchPlayerTurn(); // Initialize turn display
  game.addCapsListener(activePlayer,player1, player2, switchPlayerTurn); 
    
}

function playMatch() {
  const playerOneName = document.querySelector("#playerone-input").value;
  const playerTwoName = document.querySelector("#playertwo-input").value;
  let player1 = createPlayer(1, playerOneName);
  let player2 = createPlayer(2, playerTwoName);

  playRound(player1, player2);
}

function startGame() {
  
  const playButton = document.querySelector("#play");
  playButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission
    playMatch();
  });
}
window.onload = function() {
  document.getElementById("player-form").reset();
};

document.addEventListener("DOMContentLoaded", (event) => {
  startGame();
});
