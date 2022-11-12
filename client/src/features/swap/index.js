import React, {Component} from 'react';
import * as Util from '../../utils/Web3Util';
import Navbar from './components/Navbar';
import SwapForm from './components/SwapForm';

class Swap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      account: '',
      etherBalance: '0',
      tokenBalance: '0',
      tokenContract: {},
      swapContract: {}
    };

    this.loadBlockchainData = Util.loadBlockchainData.bind(this);
  }

  async componentDidMount() {
    Util.loadBlockchainData()
      .then(data => {
        console.log(data);
        return this.setState({...data});
      })
      .catch(alert);
  }

  onBuyTokens = etherAmount => {
    this.setState({loading: true});
    this.state.swapContract.methods
      .buyTokens()
      .send({
        value: etherAmount,
        from: this.state.account
      })
      .on('transactionHash', hash => {
        this.setState({loading: false});
      });
  };

  onSellTokens = tokenAmount => {
    // First. approve swap-contract to sell tokens on behalf of the seller.
    this.setState({loading: true});
    this.state.tokenContract.methods
      .approve(this.state.swapContract.address, tokenAmount)
      .send({
        from: this.state.account
      })
      .on('transactionHash', hash => {
        this.setState({loading: false});
      });

    // Second. swap-contract sells the token.
    this.setState({loading: true});
    this.state.swapContract.methods
      .sellTokens(tokenAmount)
      .send({
        from: this.state.account
      })
      .on('transactionHash', hash => {
        this.setState({loading: false});
      });
  };

  render() {
    let landingPage = (
      <SwapForm
        ethBalance={this.state.etherBalance}
        tokenBalance={this.state.tokenBalance}
        onBuyTokens={this.onBuyTokens}
        onSellTokens={this.onSellTokens}
      />
    );
    if (this.state.loading) landingPage = <div>Loading...</div>;

    return (
      <div className={`modal ${this.props.shouldShow ? 'is-active' : ''}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">
              <Navbar account={this.state.account} />
            </p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => this.props.onClose()}></button>
          </header>
          <section className="modal-card-body">{landingPage}</section>
        </div>
      </div>
    );
  }
}

export default Swap;
