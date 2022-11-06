import React from 'react';

function ShareLinkDialog({shouldShow, onClose}) {
  const sharableLink = window.location.href;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(sharableLink);
  }

  return (
    <div className={`modal ${shouldShow ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Share link with your opponent</p>
          <button className="delete" aria-label="close" onClick={() => onClose()}></button>
        </header>
        <section className="modal-card-body">
          <div className="field has-addons">
            <div className="control is-expanded">
              <input type="text" name="" id="" className="input" readOnly value={sharableLink} />
            </div>
            <div className="control">
              <button className="button is-primary" onClick={copyToClipboard}>
                <i className="fa fa-copy"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ShareLinkDialog;
