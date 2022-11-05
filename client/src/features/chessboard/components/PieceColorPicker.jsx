import React from 'react';
import * as uuid from 'uuid';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {getAuthenticatedUser} from '../../authentication/authenticationSlice';
import {setGame} from '../chessboardSlice';

function PieceColorPicker({shouldShow, onClose}) {
  const authenticatedUser = useSelector(getAuthenticatedUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const startGameWith = startingPiece => {
    const member = {
      uid: authenticatedUser.uid,
      name: authenticatedUser.name,
      piece: startingPiece === 'r' ? ['b', 'w'][Math.round(Math.random())] : startingPiece,
      creator: true
    };

    const game = {
      status: 'waiting',
      players: [member],
      gameId: `${uuid.v4()}`
    };

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(game)
    };
    fetch(`http://localhost:5000/game/${game.gameId}`, requestOptions).then(res => {
      dispatch(setGame(game));
      history.push(`/play/${game.gameId}`);
    });
  };
  return (
    <div className={`modal ${shouldShow ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Pick your color set for the tournament</p>
          <button className="delete" aria-label="close" onClick={() => onClose()}></button>
        </header>
        <footer className="modal-card-foot">
          <a href="#" className="card-footer-item" onClick={() => startGameWith('w')}>
            <figure className="image">
              <img
                src={require('../assets/white-pieces.png')}
                className="is-rounded  has-background-primary p-2"
                alt="White/Light Color"
              />
            </figure>
          </a>
          <a href="#" className="card-footer-item" onClick={() => startGameWith('b')}>
            <figure className="image">
              <img
                src={require('../assets/black-pieces.png')}
                className="is-rounded  has-background-primary p-2"
                alt="Black/Dark Color"
              />
            </figure>
          </a>
          <a href="#" className="card-footer-item" onClick={() => startGameWith('r')}>
            <figure className="image">
              <img
                src={require('../assets/bnw-pieces.png')}
                className="is-rounded  has-background-primary p-2"
                alt="Pick any color!"
              />
            </figure>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default PieceColorPicker;
