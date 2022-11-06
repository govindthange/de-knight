import './index.css';
import Board from './components/Board';
import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {setGame} from './chessboardSlice';
import {
  subjectObservable as chessSubject,
  start as startChess,
  reset as resetChess,
  applyRemotePlayerGame,
  getResult
} from './model/game';
import useSocketIo from '../../hooks/useSocketIo';
import {getAuthenticatedUser} from '../authentication/authenticationSlice';
import {SharableLink} from './components/SharableLink';
import {Status} from './components/Status';
import {Result} from './components/Result';
import SocketIoDemo from '../chat/components/SocketIoDemo';

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
    play: useCallback((e, move) => {
      console.log('Received %o event w/ %o data', e, move);
      const game = JSON.parse(move);
      !game.players && alert('No players found!');
      applyRemotePlayerGame(currentUser, game);
    }, [])
  };

  const {isConnected, emit} = useSocketIo(listenerMap);

  const fetchGameById = useCallback(gameId => {
    return fetch(`http://localhost:5000/game/${gameId}`).then(response => response.json());
  }, []);

  const sendGameToRemotePlayer = new useCallback(g => {
    dispatch(setGame(g));
    !g.players && alert('There are no players in the list to send!');
    emit('play', {room: id, move: JSON.stringify(g)});
  }, []);

  useEffect(() => {
    let subscription;
    async function init() {
      const res = await startChess(
        id,
        currentUser,
        id !== 'standalone' ? fetchGameById : null,
        sendGameToRemotePlayer
      );
      if (res) {
        emit('join', id);
        setInitResult(res);
        subscription = chessSubject.subscribe(g => {
          if (!g) {
            alert('There is no game configured for you!');
            return;
          }
          setBoard(g.board);
          setIsGameOver(g.isGameOver);
          setResult(getResult());
          setPosition(g.position);
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
      <nav className="navbar is-transparent" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          {/*
          <a className="navbar-item has-background-success" href="#">
            <h1 class="has-text-white">De-Chess</h1>
          </a>
          */}
          <a className="navbar-item" href="../">
            <img
              src={require('../../assets/images/dechess-logo.png')}
              alt="De-CHESS, a decentralized play-to-earn game"
              width="112"
              height="28"
            />
          </a>
          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbar-chessboard-menu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-chessboard-menu" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="../">
              Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="#">
                Game
              </a>
              <div className="navbar-dropdown is-boxed">
                <a className="navbar-item" href="../game-selection">
                  New Game
                </a>
                <a className="navbar-item" onClick={() => resetChess()}>
                  Restart
                </a>
                <a className="navbar-item" href="#">
                  Share Link
                </a>
              </div>
            </div>
          </div>
          <div className="navbar-end chessboard-navbar">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-light">
                  <span className="icon">
                    <i className="fa fa-phone"></i>
                  </span>
                  <span>Call Opponent</span>
                </a>
              </div>
            </div>
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button is-primary" href="#">
                    <span className="icon">
                      <i className="fa fa-share"></i>
                    </span>
                    <span>Share Link</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section class="hero is-primary is-fullheight-with-navbar">
        <div class="container">
          <div class="columns">
            <div class="column is-8">
              <div class="rows">
                <div class="row">
                  <div className="chessboard">
                    <div className="board-container">
                      {gameObject.opponent && gameObject.opponent.name && (
                        <span className="tag is-warning">{gameObject.opponent.name}</span>
                      )}
                      <Board board={board} turnBoard={position} />
                      {gameObject.player && gameObject.player.name && (
                        <span className="tag is-warning">{gameObject.player.name}</span>
                      )}
                    </div>
                  </div>
                </div>
                {status === 'waiting' && (
                  <div className="row">
                    <SharableLink />
                  </div>
                )}
              </div>
            </div>
            <div class="column is-4">
              <div class="rows">
                {isGameOver && (
                  <div className="row">
                    <Result isGameOver={isGameOver} result={result}></Result>
                  </div>
                )}
                <div className="row is-full chessboard-right-column">
                  <Status
                    initResult={initResult}
                    loading={loading}
                    status={status}
                    isConnected={isConnected}></Status>
                </div>
                <div class="row">
                  <SocketIoDemo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chessboard;
