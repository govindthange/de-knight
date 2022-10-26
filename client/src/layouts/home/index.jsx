import './index.css';
import React from 'react';
import {useState} from 'react';
import * as uuid from 'uuid';
import {useSelector} from 'react-redux';
import {getCurrentPlayer} from '../../features/chessboard/chessboardSlice';
import {useHistory} from 'react-router-dom/cjs/react-router-dom.min';

function Home() {
  const currentPlayer = useSelector(getCurrentPlayer);
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  const newGameOptions = [
    {label: 'Black pieces', value: 'b'},
    {label: 'White pieces', value: 'w'},
    {label: 'Random', value: 'r'}
  ];

  const onPlayLocally = () => {
    // TODO: play w/ yourself.
  };

  const onPlayOnline = () => {
    setShowModal(true);
  };

  const startOnlineGame = startingPiece => {
    const member = {
      uid: currentPlayer.uid,
      piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
      name: currentPlayer.name,
      creator: true
    };

    const game = {
      status: 'waiting',
      members: [member],
      gameId: `${uuid.v4()}`
    };

    console.log(`Save following object to database:\n\n %o`, game);
    alert(`Save following object to database:\n${JSON.stringify(game)}`);

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
