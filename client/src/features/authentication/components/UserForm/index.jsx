import './index.css';
import React, {useState} from 'react';

function UserForm() {
  const [name, setName] = useState('');
  const onSubmit = async evt => {
    evt.preventDefault();
    localStorage.setItem('de-chess-user');
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
            placeholder="Name"
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
