import {reset as restartChess} from '../model/game';

export function Result({isGameOver, result}) {
  let statusContent;
  if (isGameOver) {
    statusContent = (
      <button onClick={() => restartChess()}>
        <span>New Game</span>
      </button>
    );
  } else {
    statusContent = (
      <button onClick={() => restartChess()}>
        <span>Reset Game</span>
      </button>
    );
  }

  let resultContent;
  if (result) {
    resultContent = <p>{result}</p>;
  }
  return (
    <div className="chessboard-status">
      {resultContent}
      {statusContent}
    </div>
  );
}
