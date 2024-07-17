function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];
  //populate board
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }
  const getBoard = () => board;
}
function Cell() {
  let value = 0;
  const markCell = (player) => {
    value = player;
  };
  const getValue = () => value;
  return { markCell, getValue };
}
function createPlayer(number) {
  let name= prompt(`Player ${number} name: `, " " );
  let score=0;
  let mark=0;
  return {
    name: name,
    score: score,
    mark: mark,
  };
}


function Game(player1 = "Player 1", player2 = "Player 2") {
  const board = Gameboard();
  const players = [
   createPlayer(1),
   createPlayer(2)
  ];

  let activePlayer = players[0];
}

