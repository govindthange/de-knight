import './index.css';
import React, {useState} from 'react';
import Banner from '../../features/marketplace/components/Banner';
import Footer from './components/Footer';
import NftListing from '../../features/marketplace/components/NftListing';
import Tournaments from '../../features/tournament/components/Tournaments';
import PieceColorPicker from '../../features/chessboard/components/PieceColorPicker';
import NFTUpload from '../../features/nft/components/NFTUpload';
import {loadBlockchainData} from '../../utils/Web3Util';
import Swap from '../../features/swap';

function Home() {
  const [isChessPieceColorPickerVisible, setChessPieceColorPicker] = useState(false);
  const [isNFTUploadVisible, setNFTUploadVisibility] = useState(false);
  const [isSwapVisible, setSwapVisibility] = useState(false);

  const onTournamentClick = () => {
    setChessPieceColorPicker(true);
  };

  const onClosePieceColorPicker = () => {
    setChessPieceColorPicker(false);
  };

  const onNFTUpload = () => {
    setNFTUploadVisibility(true);
  };

  const onCloseNFTUpload = () => {
    setNFTUploadVisibility(false);
  };

  const onSuccessfulNFTUpload = async data => {
    setNFTUploadVisibility(false);
    // alert(JSON.stringify(data));
    console.log(data);

    loadBlockchainData().then(({account, chessNFTContract}) => {
      const willingToPayGas = '5000000';
      /*
      // TODO: Implement gas-estimation-input
      // Provide how much gas you are willing to pay
      // and get the actual estimated gas for the method
      chessNFTContract.methods
        .mint(data.url)
        .estimateGas({
          from: account
          // to: CONFIG.CONTRACT_ADDRESS,
          // gasLimit: String(totalGasLimit),
          // gas: max-gas-you-are-willing-to-pay, // 5000000
          // value: totalCostInWeiToBeTransferred
        })
        .then(gasAmount => {
          alert(`The estimated gas for minting is ${gasAmount}`);
          if (gasAmount == 5000000) alert('The mint function ran out of gas!');
        })
        .catch(error => alert(error ? error.message : error));
        */

      // Processing response using event-emitter
      chessNFTContract.methods
        .mint(data.url)
        .send({
          from: account,
          // to: CONFIG.CONTRACT_ADDRESS,
          // gasLimit: String(totalGasLimit),
          gas: willingToPayGas
          // value: totalCostInWeiToBeTransferred
        })
        .on('transactionHash', txnHash => alert(`NFT Mint Transaction Hash: ${txnHash}`))
        .on('confirmation', (confirmationNumber, receipt) => {
          console.log(JSON.stringify(receipt));
          alert(`NFT Mint Confirmation Number: ${confirmationNumber}`);
        })
        .on('receipt', receipt => {
          console.log(JSON.stringify(receipt));
          alert(
            `Great... we've the transaction the receipt. The NFT is yours! go visit our marketplace to view it.`
          );
        })
        .once('error', error => {
          console.log(error);
          alert(error.message);
        })
        .once('allEvents', event => {
          alert(`Contract event received: ${JSON.stringify(event)}`);
          console.log(event);
        })
        .catch((error, receipt) => {
          console.log(error);
          console.log(receipt.events);
        });

      /*
      // Processing response using promise object
      chessNFTContract.methods
        .mintFromOwner(account, data.url)
        .send({
          from: account,
          // to: CONFIG.CONTRACT_ADDRESS,
          // gasLimit: String(totalGasLimit),
          gas: willingToPayGas
          // value: totalCostInWeiToBeTransferred
        })
        .then(receipt => {
          console.log(receipt.events);
          alert(
            `Great... we've the transaction the receipt w/ ${receipt.events.length} events. The NFT is yours! go visit our marketplace to view it.`
          );
        })
        .catch((error, receipt) => {
          alert(error.message);
          console.log(receipt.events);
        });
        */
    });
  };

  const onSwap = () => {
    setSwapVisibility(true);
  };

  const onCloseSwap = () => {
    setSwapVisibility(false);
  };

  return (
    <>
      <PieceColorPicker
        shouldShow={isChessPieceColorPickerVisible}
        onClose={onClosePieceColorPicker}
      />

      <NFTUpload
        shouldShow={isNFTUploadVisible}
        onClose={onCloseNFTUpload}
        onSuccessfulUpload={onSuccessfulNFTUpload}
      />

      <Swap shouldShow={isSwapVisible} onClose={onCloseSwap} />

      <div id="app">
        <section className="hero is-fullheight is-light">
          <div className="hero-head">
            <nav
              className="navbar is-transparent is-spaced"
              role="navigation"
              aria-label="main navigation">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item" href="">
                    <img
                      src={require('./assets/dechess-logo.png')}
                      alt="De-Chess Tournament Venue"
                      width="150"
                      height="100"
                    />
                  </a>
                  <a
                    role="button"
                    className="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarTopMain">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </a>
                </div>
                <div className="navbar-menu" id="navbarTopMain">
                  <div className="navbar-end">
                    <a
                      className="navbar-item has-text-weight-semibold"
                      onClick={() => onNFTUpload()}>
                      <span>NFTs</span>
                      <span className="tag is-primary m-l-5">Mint</span>
                    </a>
                    <a href="./play/standalone" className="navbar-item has-text-weight-semibold">
                      Play Solo
                    </a>
                    <a
                      className="navbar-item has-text-weight-semibold"
                      onClick={() => onTournamentClick()}>
                      Tournament
                    </a>
                    <a className="navbar-item has-text-weight-semibold" onClick={() => onSwap()}>
                      Swaps
                    </a>
                    <a href="#" className="navbar-item has-text-weight-semibold">
                      Marketplace
                    </a>
                    <a href="./governance" className="navbar-item has-text-weight-semibold">
                      Governance
                    </a>
                    <div className="navbar-item">
                      <a href="/login" className="button is-primary">
                        Sign in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="hero-body  p-b-30 ">
            <div className="container">
              <h2 className="subtitle">
                <span className="has-text-centered is-block">
                  Create chess tournaments and initiate crowdfunding rounds.
                  <br />
                  Mint your own NFTs. Buy/Sell/Earn NFTs while you play chess.
                </span>
              </h2>
              <br />
              <h1 className="title">
                <span className="is-size-2 has-text-centered is-block">Play to Earn💰...</span>
              </h1>
              <div className="columns is-centered">
                <div className="column is-7">
                  <div className="search-form">
                    <form>
                      <div className="field has-addons has-shadow-field">
                        <div className="control has-icons-left is-expanded">
                          <input
                            type="text"
                            id="mainSearch"
                            defaultValue=""
                            placeholder="Find NFTs you'll love..."
                            className="input is-large"
                          />
                          <span className="icon is-small is-left">
                            <svg
                              className="svg-inline--fa fa-search fa-w-16"
                              aria-hidden="true"
                              data-prefix="fa"
                              data-icon="search"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              data-fa-i2svg="">
                              <path
                                fill="currentColor"
                                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                            </svg>
                          </span>
                        </div>
                        <div className="control">
                          <button type="button" className="button is-large is-primary">
                            <span className="has-text-weight-semibold">Go!</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="has-text-centered">
                <img
                  className="m-t-50"
                  src={require('./assets/play-standalone-green.png')}
                  alt="Play Standalone"
                />
              </div>
            </div>
          </div>
        </section>

        <NftListing />

        <div className="container">
          <hr />
        </div>

        <Tournaments />
        <Banner />
        <Footer />
      </div>
    </>
  );
}

export default Home;
