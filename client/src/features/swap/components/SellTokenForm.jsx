import React, {useCallback, useRef, useState} from 'react';
import tokenLogo from '../assets/token-logo.png';
import ethLogo from '../assets/eth-logo.png';

function SellTokenForm(props) {
  const [output, setOutput] = useState('0');
  const input = useRef();

  const onSubmit = useCallback(event => {
    event.preventDefault();
    const tokenAmount = window.web3.utils.toWei(input.current.value, 'Ether');
    props.onSellTokens(tokenAmount);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <label>Input</label>
      <span>Balance: {window.web3.utils.fromWei(props.tokenBalance, 'Ether')}</span>
      <div>
        <input
          type="text"
          onChange={event => setOutput(input.current.value / 100)}
          ref={input}
          placeholder="0"
          required
        />
        <img src={tokenLogo} alt="CHESS Logo" /> &nbsp; CHESS
      </div>
      <div>
        <label>Output</label>
        <span>Balance: {window.web3.utils.fromWei(props.ethBalance, 'Ether')}</span>
      </div>
      <div>
        <input type="text" placeholder="0" value={output} disabled />
        <img src={ethLogo} alt="ETH Logo" /> &nbsp; ETH
      </div>
      <div>
        <span>Exchange Rate</span>
        <span>100 CHESS = 1 ETH</span>
      </div>
      <button type="submit">Swap</button>
    </form>
  );
}

export default SellTokenForm;
