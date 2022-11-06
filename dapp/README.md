## Setup workspace inside container

Execute following commands

```
node -v
truffle version
npm install
npm install --save identicon.js@^2.3.3
truffle migrate --reset
```

## Launch the de-Swap client application

```
node ➜ /workspace/dapp/src $ npm run start
```

## Test on Ganache Console

1. Open Ganache Console like so:

```
node ➜ /workspace/dapp/src $ truffle console
```

2. Test Token.sol

```
truffle(development)> token = await Token.deployed()
undefined
truffle(development)> balance = await token.balanceOf('0x33489ed5cf4c1622c853aaee4f68a4c5798d513a')
BN {
  negative: 0,
  words: [ 16777216, 28565389, 32425087, 69, <1 empty item> ],
  length: 4,
  red: null
}
truffle(development)> balance
BN {
  negative: 0,
  words: [ 16777216, 28565389, 32425087, 69, <1 empty item> ],
  length: 4,
  red: null
}
truffle(development)> balance.toString()
'21000000000000000000000000'
```

# Running the Unit Test

Run the test like so:

```
node ➜ /workspace/dapp (dev ✗) $ truffle test
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


  Contract: EthSwap
    EthSwap deployment w/ transfer
      ✔ should have a name "ETH/CHESS Swap"
      ✔ should show balance 1000000 after transfer (85ms)
    Purchase tokens
      ✔ Should allow player to instantly purchase tokens from EthSwap at a fixed rate.
    Sell tokens
      ✔ Should allow player to instantly sell tokens to EthSwap at a fixed rate.

  Contract: Greeter
    ✔ should return 'Hello World!'
    ✔ should change the greeting message (87ms)

  Contract: Token
    Token deployment
      ✔ Should have a name


  7 passing (999ms)
```

> When you run the test for the first time it will may fail like so:

```
node ➜ /workspace/dapp $ truffle test
Using network 'development'.


Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.

Error: Cannot find module 'react-bootstrap/lib/Breadcrumb'
Require stack:
```

`Problem:` Apparently the truffle automatically adds following lines in EthSwap.test.js.

```
const { assert } = require('chai');
const { Item } = require('react-bootstrap/lib/Breadcrumb');
```

`Solution:` Follow these steps to fix this issue.
1. Remove the 2 lines that were added by truffle.
2. Rename the variable *Item* back to *it*.
3. Rerun the test.