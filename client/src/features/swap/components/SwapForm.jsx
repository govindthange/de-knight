import React, {useState} from 'react';
import BuyTokenForm from './BuyTokenForm';
import SellTokenForm from './SellTokenForm';

function SwapForm(props) {
  const [currentForm, setCurrentForm] = useState('buy');

  let content;
  switch (currentForm) {
    case 'buy':
      content = <BuyTokenForm {...props} />;
      break;
    case 'sell':
      content = <SellTokenForm {...props} />;
      break;
    default:
      content = <div>No swap operation available!</div>;
  }

  return (
    <>
      <div class="tabs is-boxed">
        <ul>
          <li
            class={currentForm === 'buy' ? 'is-active' : ''}
            onClick={event => {
              setCurrentForm('buy');
            }}>
            <a>
              <span class="icon is-small">
                <i class="fas fa-cart-plus" aria-hidden="true"></i>
              </span>
              <span>Buy</span>
            </a>
          </li>
          <li
            class={currentForm === 'sell' ? 'is-active' : ''}
            onClick={event => {
              setCurrentForm('sell');
            }}>
            <a>
              <span class="icon is-small">
                <i class="fas fa-money-bill" aria-hidden="true"></i>
              </span>
              <span>Sell</span>
            </a>
          </li>
        </ul>
      </div>
      <div>{content}</div>
    </>
  );
}

export default SwapForm;
