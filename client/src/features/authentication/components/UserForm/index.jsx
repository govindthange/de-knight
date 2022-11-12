import './index.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../../authenticationSlice';
import {nanoid} from '@reduxjs/toolkit';

function UserForm() {
  const [name, setName] = useState('');
  const [uid, setUid] = useState(nanoid());
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
      <h1>By what name you'd like to play?</h1>
      <br />
      <div className="field">
        <p className="control">
          <input
            type="text"
            name=""
            id=""
            className="input"
            placeholder="Pick any name..."
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button className="button is-success" type="submit">
            Get in
          </button>
        </p>
      </div>
    </form>
  );
}

export default UserForm;
