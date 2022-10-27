import './index.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../authenticationSlice';

function UserForm() {
  const [name, setName] = useState('Govind Thange');
  const [uid, setUid] = useState('player1');
  const dispatch = useDispatch();

  const onSubmit = async evt => {
    evt.preventDefault();
    let user = {
      uid: uid,
      name: name
    };
    dispatch(login(user));
  };

  return (
    <form className="user-form" onSubmit={onSubmit}>
      <h1>Enter your name to start</h1>
      <br />
      <div className="field">
        <p className="control">
          <input
            type="text"
            name=""
            id=""
            className="input"
            placeholder="User ID"
            value={uid}
            onChange={e => setUid(e.target.value)}
            required
          />
          <input
            type="text"
            name=""
            id=""
            className="input"
            placeholder="User Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success" type="submit">
            Start
          </button>
        </p>
      </div>
    </form>
  );
}

export default UserForm;
