import React from 'react';

function Banner() {
  return (
    <section className="hero is-medium is-light">
      <div className="hero-body p-b-30">
        <div className="container">
          <div className="has-text-centered">
            <h2 className="subtitle">For NFT creators & chess tournament organizers</h2>
            <h1 className="title">Want to decrease Time-To-Market?</h1>
            <p className="m-t-30">
              <a href="" className="button is-medium is-shadowy is-primary">
                Learn more
              </a>
            </p>
            <div className="has-text-centered m-t-60">
              <img
                className="m-t-50"
                src={require('./assets/play-to-earn.png')}
                alt="Play to Earn"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
