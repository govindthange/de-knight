import './index.css';
import React from 'react';
import {useCallback, useState} from 'react';
import * as uuid from 'uuid';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  getCurrentPlayer,
  setCurrentPlayer,
  setGame
} from '../../features/chessboard/chessboardSlice';
import {getAuthenticatedUser} from '../../features/authentication/authenticationSlice';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import useSocketIo from '../../hooks/useSocketIo';

function Home() {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const currentPlayer = useSelector(getCurrentPlayer);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory(); // Get memoized callbacks.

  const defaultMemoizedHandler = useCallback((e, obj) => {
    console.log(`Received '${e}' event w/ ${JSON.stringify(obj)} data`);
  });

  const listenerMap = {
    command: defaultMemoizedHandler,
    chat: defaultMemoizedHandler,
    game: defaultMemoizedHandler,
    play: defaultMemoizedHandler
  };

  const {isConnected, emit} = useSocketIo(listenerMap);

  const newGameOptions = [
    {label: 'Black pieces', value: 'b'},
    {label: 'White pieces', value: 'w'},
    {label: 'Random', value: 'r'}
  ];

  const onPlayLocally = () => {
    const member = {
      uid: currentPlayer.uid,
      piece: 'w',
      name: currentPlayer.name,
      creator: true
    };

    dispatch(setCurrentPlayer(member));
    history.push(`/play/standalone`);
    // TODO: play w/ yourself.
  };

  const onPlayOnline = () => {
    setShowModal(true);
  };

  const startOnlineGame = startingPiece => {
    const member = {
      uid: authenticatedUser.uid,
      name: authenticatedUser.name,
      piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
      creator: true
    };

    const game = {
      status: 'waiting',
      members: [member],
      gameId: `${uuid.v4()}`
    };

    let req = {type: 'save', gameId: game.gameId, game};
    emit('command', {room: game.gameId, command: JSON.stringify(req)});

    dispatch(setGame(game)); // TODO: the gameObject should be saved under gameId
    dispatch(setCurrentPlayer(member)); // TODO: saving currentPlayer may not be needed since we are saving in in game object!

    history.push(`/play/${game.gameId}`);
  };

  return (
    <>
      <div className="columns home">
        <div className="column has-background-primary home-columns">
          <button className="button is-link" onClick={onPlayLocally}>
            Play Locally
          </button>
        </div>
        <div className="column has-background-link home-columns">
          <button className="button is-primary" onClick={onPlayOnline}>
            Play Online
          </button>
        </div>
      </div>
      <div>{!isConnected && <div>Connecting to remote server...</div>}</div>
      <div>{isConnected && <div>Connected to remote server.</div>}</div>
      <div className={`modal ${showModal ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="card">
            <div className="card-content">
              <div className="content">Please Select the piece you want to start</div>
            </div>
            <footer className="card-footer">
              {newGameOptions.map(({label, value}) => (
                <span
                  className="card-footer-item pointer"
                  key={value}
                  onClick={() => startOnlineGame(value)}>
                  {label}
                </span>
              ))}
            </footer>
          </div>
        </div>
        <button className="modal-close is-large" onClick={() => setShowModal(false)}></button>
      </div>
    </>
  );
}

export default Home;
