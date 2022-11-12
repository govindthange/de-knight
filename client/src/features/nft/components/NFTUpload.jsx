import axios from 'axios';
import React, {useCallback, useRef, useState} from 'react';

const UPLOAD_URL = `http://${window.location.hostname}:${process.env.REACT_APP_WEBSOCKET_PORT}/nft/upload`;

function NFTUpload({shouldShow, onClose, onSuccessfulUpload}) {
  const nameInput = useRef(null);
  const [name, setName] = useState('');

  const descriptionInput = useRef(null);
  const [description, setDescription] = useState('');

  const fileInput = useRef(null);
  const [file, setFile] = useState(null);

  const onSubmit = evt => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('file', file);

    axios
      .post(UPLOAD_URL, formData)
      .then(res => {
        onSuccessfulUpload(res.data);
      })
      .catch(err => alert(err.message));
  };

  return (
    <div className={`modal ${shouldShow ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">NFT Upload</p>
          <button className="delete" aria-label="close" onClick={() => onClose()}></button>
        </header>
        <section className="modal-card-body">
          <form>
            {
              // Uncomment below code for adding more NFTUpload info.
              /*
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Owner</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <input className="input" type="text" placeholder="Name" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-user"></i>
                    </span>
                  </p>
                </div>
                <div className="field">
                  <p className="control is-expanded has-icons-left has-icons-right">
                    <input className="input is-success" type="email" placeholder="Email" value="" />
                    <span className="icon is-small is-left">
                      <i className="fas fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                      <i className="fas fa-check"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label"></div>
              <div className="field-body">
                <div className="field is-expanded">
                  <div className="field has-addons">
                    <p className="control">
                      <a className="button is-static">+91</a>
                    </p>
                    <p className="control is-expanded">
                      <input className="input" type="tel" placeholder="Your phone number" />
                    </p>
                  </div>
                  <p className="help">Do not enter the first zero</p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label">
                <label className="label">Make phone visible?</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <label className="radio">
                      <input type="radio" name="member" />
                      Yes
                    </label>
                    <label className="radio">
                      <input type="radio" name="member" />
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
            */
            }

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Name</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <input
                      className="input is-danger"
                      type="text"
                      placeholder="Enter a name for your NFT"
                      ref={nameInput}
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <p className="help is-danger">This field is required</p>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Description</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <div className="control">
                    <textarea
                      className="textarea"
                      placeholder="Describe your NFT here..."
                      ref={descriptionInput}
                      value={description}
                      onChange={e => setDescription(e.target.value)}></textarea>
                  </div>
                </div>
              </div>
            </div>

            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">NFT File</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <label className="file-label">
                      <input
                        className="file-input"
                        type="file"
                        ref={fileInput}
                        name="nftImage"
                        onChange={e => {
                          setFile(e.target.files[0]);
                        }}
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">Select file...</span>
                      </span>
                      <span className="file-name">{file ? file.name : 'No file uploaded'}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/*
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">Storage</label>
              </div>
              <div className="field-body">
                <div className="field is-narrow">
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select>
                        <option>IPFS</option>
                        <option>Swarm</option>
                        <option>Central Server</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            */}
          </form>
        </section>
        <footer className="modal-card-foot">
          <button className="button is-primary" onClick={onSubmit}>
            Upload
          </button>
          <button className="button" onClick={() => onClose()}>
            Cancel
          </button>
        </footer>
      </div>
    </div>
  );
}

export default NFTUpload;
