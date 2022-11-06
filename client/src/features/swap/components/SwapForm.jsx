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
    <div>
      <div>
        <button
          onClick={event => {
            setCurrentForm('buy');
          }}>
          Buy
        </button>
        <button
          onClick={event => {
            setCurrentForm('sell');
          }}>
          Sell
        </button>
      </div>
      <div>
        <div>{content}</div>
      </div>
    </div>
  );
}

export default SwapForm;
