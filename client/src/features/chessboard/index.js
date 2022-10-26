import './index.css';
import Board from './components/Board';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {
  subjectObservable as chessSubject,
  start as startChess,
  reset as restartChess,
  getResult
} from './model/game';

function Chessboard(props) {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turnChessboard, setTurnChessboard] = useState();
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  // Some dummy response received from socket server.
  const dummyResponse = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';
  const multiplayerGameObjectPromise = new Promise((resolve, reject) => {
    resolve({
      game: dummyResponse,
      member: {
        uid: 'some-uuid',
        piece: 'b',
        name: 'opponent', //localStorage.getItem('de-chess-user'),
        creator: true
      }
    });
  });
  useEffect(() => {
    let subscription;
    async function init() {
      const res = await startChess(id !== 'local' ? multiplayerGameObjectPromise : null);
      if (res) {
        setInitResult(res);
        subscription = chessSubject.subscribe(game => {
          setBoard(game.board);
          setIsGameOver(game.isGameOver);
          setResult(getResult());
          setTurnChessboard(game.turnChessboard);
        });
      }

      setLoading(false);
    }

    init();

    return () => subscription && subscription.unsubscribe();
  }, [id]);

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
    <>
      {loading && <div>'Loading...'</div>}
      {!loading && <div>'Loaded remote player data'</div>}
      {initResult}
      <div className="chessboard">
        <div className="board-container">
          <Board board={board} turnBoard={turnChessboard} />
        </div>
      </div>
      <div className="chessboard-status">
        {resultContent}
        {statusContent}
      </div>
    </>
  );
}

export default Chessboard;
