import './index.css';
import Board from './components/Board';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setGame} from './chessboardSlice';
import {
  subjectObservable as chessSubject,
  start as startChess,
  applyRemotePlayerGame,
  getResult
} from './model/game';
import useSocketIo from '../../hooks/useSocketIo';
import {getAuthenticatedUser} from '../authentication/authenticationSlice';
import {SharableLink} from './components/SharableLink';
import {Status} from './components/Status';
import {Result} from './components/Result';

function Chessboard(props) {
  const currentUser = useSelector(getAuthenticatedUser);
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  const [position, setPosition] = useState();
  const [initResult, setInitResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [gameObject, setGameObject] = useState({});
  const {id} = useParams();
  const dispatch = useDispatch();

  // Get memoized callbacks.
  const listenerMap = {
    command: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, []),

    chat: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);
    }, []),

    game: useCallback((e, obj) => {
      console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
      // setTranscript(oldTranscript => [obj, ...oldTranscript]);

      const game = JSON.parse(obj);
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

  const requestRemoteGameById = useCallback(gameId => {
    return fetch(`http://localhost:3000/game/${gameId}`).then(response => response.json());
  }, []);

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
          setPosition(g.position); // TODO: rename position to position
          setStatus(g.status);
          setGameObject(g);
        });
      }

      setLoading(false);
    }

    init();

    return () => subscription && subscription.unsubscribe();
  }, [id]);

  return (
    <>
      <a href="../">Go to root page....</a>
      <Result isGameOver={isGameOver} result={result}></Result>
      <div className="chessboard">
        <div className="board-container">
          {gameObject.oponent && gameObject.oponent.name && (
            <span className="tag is-link">{gameObject.oponent.name}</span>
          )}

          <Board board={board} turnBoard={position} />
          {gameObject.member && gameObject.member.name && (
            <span className="tag is-link">{gameObject.member.name}</span>
          )}
        </div>
      </div>
      {status === 'waiting' && <SharableLink />}
      <Status
        initResult={initResult}
        loading={loading}
        status={status}
        isConnected={isConnected}></Status>
    </>
  );
}

export default Chessboard;
