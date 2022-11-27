import React from 'react';

function Crowdsale() {
  return (
    <>
      <div>
        <div className="notification is-info is-light is-pulled-left">
          <p>
            From this screen De-Knight conducts all its capital-raising activity, AKA{' '}
            <strong>initial coin offering (ICO)</strong>. You may also view all De-Knight's{' '}
            <strong>initial stake-pool offering (ISPO)</strong> from this screen. From here you may
            stake your cryptocurrency holdings (notably ♞ DGT or ♦ ETH) through a stake-pool
            operated by the De-Knight project.
          </p>
        </div>
        <div className="field">
          <button className="button is-info  is-pulled-right">
            <i className="fas fa-cart mr-2"></i>Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default Crowdsale;
