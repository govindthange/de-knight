import React, {useCallback} from 'react';
import {loadBlockchainData} from '../../utils/Web3Util';

function GreetContracts() {
  const onGreet = useCallback(() => {
    loadBlockchainData().then(({account, greeterContract}) => {
      let resultPromise = greeterContract.methods
        .get()
        .call()
        .then(alert)
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  const onMint = useCallback(() => {
    alert('Visit the page.');
  }, []);

  const onCrowdfund = useCallback(() => {
    alert('Coming soon...');
  }, []);

  const onGetPrice = useCallback(() => {
    loadBlockchainData().then(({account, apiDemoContract}) => {
      let resultPromise = apiDemoContract.methods
        .ETHUSD()
        .call()
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, []);

  const onUpdatePrice = useCallback(() => {
    loadBlockchainData().then(({account, apiDemoContract}) => {
      let resultPromise = apiDemoContract.methods
        .updatePrice()
        .send({
          from: account
        })
        .on('transactionHash', hash => {
          alert(hash);
        });
    });
  }, []);

  return (
    <section className="hero is-link is-fullheight has-background-white">
      <div className="hero-body">
        <div className="container content has-text-centered">
          <h1 className="has-text-primary">De-CHESS</h1>
          <div className="has-text-grey-light">Hit buttons to test your contracts...</div>
          <div className="rows is-mobile is-centered has-text-centered">
            <div className="row mt-4">
              <button className="button is-outlined" onClick={onGreet}>
                Greet the Greeter contract
              </button>
            </div>
            <div className="row mt-4">
              <button className="button is-link is-outlined" onClick={onMint}>
                Mint your NFT
              </button>
            </div>
            <div className="row mt-4">
              <button className="button is-danger is-outlined" onClick={onCrowdfund}>
                Crowdfund
              </button>
            </div>
            <div className="row mt-4">
              <button className="button is-info is-outlined" onClick={onGetPrice}>
                Provable API (Get ETH/USD Price)
              </button>
            </div>
            <div className="row mt-4">
              <button className="button is-info is-outlined" onClick={onUpdatePrice}>
                Provable API (Fetch &amp; Update ETH/USD Price)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GreetContracts;
