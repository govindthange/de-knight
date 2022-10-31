import React from 'react';

function Groups() {
  return (
    <div className="sub-section">
      <h3 className="title is-size-4">Find De-CHESS communities & groups in your country.</h3>
      <div className="columns">
        <div className="column">
          <div className="card rb-card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img src={require('../assets/placeholder-640x360.png')} alt="India" />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-size-7">
                <a href="#">India</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card rb-card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img src={require('../assets/placeholder-640x360.png')} alt="USA" />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-size-7">
                <a href="#">USA</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card rb-card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img src={require('../assets/placeholder-640x360.png')} alt="France" />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-size-7">
                <a href="#">France</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card rb-card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img src={require('../assets/placeholder-640x360.png')} alt="Singapore" />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-size-7">
                <a href="#">Singapore</a>
              </h3>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card rb-card">
            <div className="card-image">
              <figure className="image is-16by9">
                <img src={require('../assets/placeholder-640x360.png')} alt="Russia" />
              </figure>
            </div>
            <div className="card-content">
              <h3 className="title is-size-7">
                <a href="#">Russia</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Groups;
