import React from 'react';

function NewCampaign({shouldShow, onClose}) {
  return (
    <div className={`modal ${shouldShow ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">New Campaign</p>
          <button className="delete" aria-label="close" onClick={() => onClose()}></button>
        </header>
        <footer className="modal-card-foot"></footer>
      </div>
    </div>
  );
}

export default NewCampaign;
