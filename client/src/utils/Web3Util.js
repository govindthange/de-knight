import Web3 from 'web3';
import Token from '../contracts/Token.json';
import * as Swap from '../contracts/EthSwap.json';

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  }
}

function loadAccount() {
  const web3 = window.web3;
  return web3.eth
    .getAccounts()
    .then(([account]) => Promise.all([account, web3.eth.getBalance(account)]))
    .then(([account, etherBalance]) => ({account, etherBalance}));
}

function loadContract(name, abi, networks) {
  const web3 = window.web3;
  return web3.eth.net
    .getId()
    .then(networkId => networks[networkId])
    .then(contract => {
      if (!contract) {
        return Promise.reject(
          `{name} contract not found! DApp is not deployed on the detected network.`
        );
      }

      return new web3.eth.Contract(abi, contract.address);
    });
}

function loadBlockchainData() {
  return (
    loadAccount()
      // load Token contract here...
      .then(data =>
        Promise.all([data, loadContract(Token.contractName, Token.abi, Token.networks)])
      )

      // load account's token balance here...
      .then(([data, tokenContract]) => {
        return Promise.all([
          {tokenContract, ...data},
          tokenContract.methods.balanceOf(data.account).call()
        ]);
      })
      .then(([data, balance]) => ({tokenBalance: balance.toString(), ...data}))

      // load Swap contract here...
      .then(data => Promise.all([data, loadContract(Swap.contractName, Swap.abi, Swap.networks)]))

      // Merge data...
      .then(([data, swapContract]) => ({loading: false, swapContract, ...data}))
  );
}

export {loadWeb3, loadBlockchainData};
