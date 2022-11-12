import React, {useCallback, useRef, useState} from 'react';

function SellTokenForm({onSellTokens, ethBalance, tokenBalance}) {
  const [output, setOutput] = useState('0');
  const input = useRef();

  const onSubmit = useCallback(event => {
    event.preventDefault();
    const tokenAmount = window.web3.utils.toWei(input.current.value, 'Ether');
    onSellTokens(tokenAmount);
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <div class="field">
        <label class="label">Convert</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input is-info"
            type="text"
            placeholder="0"
            onChange={event => setOutput(input.current.value / 100)}
            ref={input}
            required
          />
          <span class="icon is-left">♞</span>
          <span class="icon is-medium is-right mr-2">CHESS</span>
        </div>
        <p class="help is-info">
          Input Balance: {window.web3.utils.fromWei(tokenBalance, 'Ether')} ♞
        </p>
      </div>

      <div class="field">
        <label class="label">To</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input is-primary" type="text" placeholder="?" value={output} disabled />
          <span class="icon is-left">♦</span>
          <span class="icon is-medium is-right">ETH</span>
        </div>
        <p class="help is-info">
          Output Balance: {window.web3.utils.fromWei(ethBalance, 'Ether')} ♦
        </p>
      </div>

      <div class="field">
        <div class="control">
          <strong>Exchange Rate: </strong>100 CHESS = 1 ETH
        </div>
      </div>

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-primary">
            Swap
          </button>
        </div>
      </div>
    </form>
  );
}

export default SellTokenForm;
