import './index.css';
import Board from './components/Board';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCurrentPlayer,
  getPosition,
  setPosition,
  getGame,
  setGame,
  fetchGame
} from './chessboardSlice';
import {
  subjectObservable as chessSubject,
  start as startChess,
  reset as restartChess,
  applyRemotePlayerGame,
  getResult
} from './model/game';
import useSocketIo from '../../hooks/useSocketIo';
import {getAuthenticatedUser} from '../authentication/authenticationSlice';
import {BehaviorSubject} from 'rxjs';

function Chessboard(props) {
  const currentUser = useSelector(getAuthenticatedUser);
  const currentPlayer = useSelector(getCurrentPlayer);
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

  const remoteGameObservable = new BehaviorSubject();

  //
  // Simulate remote player's move
  //
  const simulateRemoteUser = () => {
    dispatch(fetchGame);
    let str = window.localStorage.getItem('de-chess/game/remote');
    let game = JSON.parse(str);
    console.log('Game fetched locally is: %o', game);
    remoteGameObservable.next(game);
  };

  // Get memoized callbacks.
  const listenerMap = {
    chat: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
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

  //
  // If URL contains a game UID then fetch
  // the initial remote game object.
  //
  const fetchRemoteGameById = new useCallback(
    id => {
      dispatch(fetchGame);

      let str = window.localStorage.getItem('de-chess/game/remote');
      let game = JSON.parse(str);
      console.log('Game fetched locally is: %o', game);
      return game;
    },
    [id]
  );

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
        id !== 'standalone' ? multiplayerGameObjectPromise : null,
        fetchRemoteGameById,
        sendGameToRemotePlayer,
        remoteGameObservable
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
      <button className="button is-info" onClick={simulateRemoteUser}>
        Simulate remote player move
      </button>
      <div>Chessboard.currentPosition: {currentPosition}</div>
      <div>{loading && <div>'Loading...'</div>}</div>
      <div>{!loading && <div>'Loaded remote player data'</div>}</div>
      <div>Chessboard.initResult: {initResult}</div>
      <div>Chessboard.status: {status}</div>
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
    </>
  );
}

export default Chessboard;
