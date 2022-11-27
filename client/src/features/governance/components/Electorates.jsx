import React from 'react';

function Electorates() {
  return (
    <>
      <div>
        <div className="notification is-info is-light is-pulled-left">
          <p>
            Here is the list of all <strong>Externally Owned Accounts (ECA)</strong>, AKA
            electorates, from the De-Knight community who are entitled to vote on a referendum or in
            an election of chairperson.
          </p>
        </div>
        <div className="field">
          <button className="button is-info  is-pulled-right">
            <i className="fas fa-fingerprint mr-2"></i>Register
          </button>
        </div>
      </div>
    </>
  );
}

export default Electorates;
