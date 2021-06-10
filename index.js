const gameBoard = (function () {
  const _board = [];
  const _players = ["X", "O"];
  let _turn = 0;
  const startGame = () => {
    _board.length = 0;
    for (let i = 0; i < 9; i++) {
      _board.push("");
    }
  };
  const addMark = (pos) => {
    if (_board[pos] == "" && !checkGameOver().gameOver) {
      _board[pos] = _players[_turn];
      _turn = _turn == 0 ? 1 : 0;
      if (checkGameOver().gameOver) {
        return `Gameover. The winner is ${checkGameOver().winner}.`;
      } else {
        return "Sucessful";
      }
    } else {
      return "Illegal";
    }
  };

  const checkGameOver = () => {
    let gameOver = false;
    let winner;

    for (let i = 0; i < 3; i++) {
      if (
        (_board[i] == _board[i + 3]
          ? _board[i] == _board[i + 6]
            ? true
            : false
          : false) &&
        _board[i] != ""
      ) {
        gameOver = true;
        winner = _board[i];
        break;
      }
    }

    for (let i = 0; i < 7; i += 3) {
      if (
        _board[i] != "" && _board[i] == _board[i + 1]
          ? _board[i] == _board[i + 2]
            ? true
            : false
          : false
      ) {
        gameOver = true;
        winner = _board[i];
        break;
      }
    }

    if (
      _board[0] != "" && _board[0] == _board[4]
        ? _board[0] == _board[8]
          ? true
          : false
        : false
    ) {
      gameOver = true;
      winner = _board[0];
    } else if (
      _board[2] != "" && _board[2] == _board[4]
        ? _board[2] == _board[6]
          ? true
          : false
        : false
    ) {
      gameOver = true;
      winner = _board[2];
    }

    for (let i = 0; i < _board.length; i++) {
      if (_board[i] == "") {
        break;
      } else if (i == _board.length - 1) {
        gameOver = true;
        winner = "Draw";
      }
    }

    return { gameOver, winner };
  };

  const getBoard = () => {
    return [..._board];
  };

  return {
    startGame,
    addMark,
    checkGameOver,
    getBoard,
  };
})();

const displayController = (function (doc, gameBoard) {
  const coordsTags = [];
  const gameBoardTag = doc.getElementById("board");
  const resultsTag = doc.getElementById("results");
  for (let i = 0; i < 9; i++) {
    let tag = doc.getElementById(`coord_${i + 1}`);
    tag.addEventListener("click", () => _playTurn(i));
    coordsTags.push(tag);
  }

  const _startGame = () => {
    _clear();
    gameBoard.startGame();
    gameBoardTag.style.display = "block";
    resultsTag.innerHTML = "&nbsp;";
  };

  const _playTurn = (pos) => {
    gameBoard.addMark(pos);
    _render();
    if (gameBoard.checkGameOver().gameOver) {
      resultsTag.innerHTML =
        gameBoard.checkGameOver().winner == "Draw"
          ? "Draw"
          : `The winner is ${gameBoard.checkGameOver().winner}`;
    }
  };

  const _render = () => {
    for (let i = 0; i < coordsTags.length; i++) {
      coordsTags[i].innerHTML =
        gameBoard.getBoard()[i] == "" ? "&nbsp;" : gameBoard.getBoard()[i];
    }
  };

  const _clear = () => {
    for (let i = 0; i < coordsTags.length; i++) {
      coordsTags[i].innerHTML = "&nbsp;";
    }
  };
  doc.getElementById("start_button").addEventListener("click", _startGame);
  return {};
})(document, gameBoard);
