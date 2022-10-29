import './index.css';
import Board from './components/Board';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentPlayer, getPosition, getGame, setGame} from './chessboardSlice';
import {
  subjectObservable as chessSubject,
  start as startChess,
  reset as restartChess,
  applyRemotePlayerGame,
  getResult
} from './model/game';
import useSocketIo from '../../hooks/useSocketIo';
import {getAuthenticatedUser} from '../authentication/authenticationSlice';

function Chessboard(props) {
  const currentUser = useSelector(getAuthenticatedUser);
  const currentGame = useSelector(getGame);
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [turnChessboard, setTurnChessboard] = useState(); // TODO: rename turnChessboard to position
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [gameObject, setGameObject] = useState({});
  const {id} = useParams();
  const dispatch = useDispatch();
  const currentPosition = useSelector(getPosition);
  const sharebleLink = window.location.href;

  // Get memoized callbacks.
  const listenerMap = {
    command: useCallback((e, obj) => {
      alert(`Received '${e}' event w/ obj: ` + JSON.stringify(obj));
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, []),

    chat: useCallback((e, obj) => {
      alert(`Received '${e}' event w/ obj: ` + JSON.stringify(obj));
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, []),

    game: useCallback((e, obj) => {
      alert(`Received '${e}' event w/ obj: ` + JSON.stringify(obj));
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);

      const game = JSON.parse(obj);
      alert(obj);
    }, []),

    play: useCallback((e, move) => {
      // alert(`Received '${e}' event w/ ${move} data`);
      console.log('Received %o event w/ %o data', e, move);

      const game = JSON.parse(move);
      // dispatch(setPosition(game));
      // remoteGameObservable.next(game);
      !game.members && alert('no members received!');
      applyRemotePlayerGame(currentUser, game);
    }, [])
  };

  const {isConnected, emit} = useSocketIo(listenerMap);

  const requestRemoteGameById = useCallback(
    gameId => {
      return fetch(`http://localhost:3000/game/${gameId}`).then(response => response.json());
    },
    [id, emit]
  );

  // Some dummy response received from socket server.
  const dummyResponse = 'rnb2bnr/pppPkppp/8/4p3/7q/8/PPPP1PPP/RNBQKBNR w KQ - 1 5';
  const multiplayerGameObjectPromise = new Promise((resolve, reject) => {
    resolve({
      tempPosition: dummyResponse,
      game: currentGame,
      member: {
        uid: 'some-uuid',
        piece: 'b',
        name: 'opponent', //localStorage.getItem('de-chess/user'),
        creator: true
      }
    });
  });

  const sendGameToRemotePlayer = new useCallback(g => {
    dispatch(setGame(g));
    !g.members && alert('no members to send!');
    emit('play', {room: id, move: JSON.stringify(g)});
  }, []);

  useEffect(() => {
    let subscription;
    async function init() {
      const res = await startChess(
        id,
        currentUser,
        id !== 'standalone' ? requestRemoteGameById : null,
        sendGameToRemotePlayer
      );
      if (res) {
        emit('join', id);
        setInitResult(res);
        subscription = chessSubject.subscribe(g => {
          if (!g) {
            alert('No game object returned by the chessSubject observable.');
            return;
          }
          setBoard(g.board);
          setIsGameOver(g.isGameOver);
          setResult(getResult());
          setTurnChessboard(g.turnChessboard); // TODO: rename turnChessboard to position
          setStatus(g.status);
          setGameObject(g);
        });
      }

      setLoading(false);
    }

    init();

    return () => subscription && subscription.unsubscribe();
  }, [id]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharebleLink);
  }

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
      <a href="../">Go to root page....</a>
      <div className="chessboard">
        <div className="board-container">
          {gameObject.oponent && gameObject.oponent.name && (
            <span className="tag is-link">{gameObject.oponent.name}</span>
          )}

          <Board board={board} turnBoard={turnChessboard} />
          {gameObject.member && gameObject.member.name && (
            <span className="tag is-link">{gameObject.member.name}</span>
          )}
        </div>
      </div>
      <div className="chessboard-status">
        {resultContent}
        {statusContent}
      </div>
      {status === 'waiting' && (
        <div className="notification is-link share-game">
          <strong>Share this game to continue</strong>
          <br />
          <br />
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="text" name="" id="" className="input" readOnly value={sharebleLink} />
            </div>
            <div className="control">
              <button className="button is-info" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
      <div>Chessboard.currentPosition: {currentPosition}</div>
      <div>{!isConnected && <div>Connecting to remote server...</div>}</div>
      <div>{isConnected && <div>Connected to remote server.</div>}</div>
      <div>{loading && <div>'Loading...'</div>}</div>
      <div>{!loading && <div>'Loaded remote player data'</div>}</div>
      <div>Chessboard.initResult: {initResult}</div>
      <div>Chessboard.status: {status}</div>
    </>
  );
}

export default Chessboard;
