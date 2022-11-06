const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

const MAX_TOKEN_SUPPLY = '21000000000000000000000000';  // 21 million tokens

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy EthSwap
  await deployer.deploy(EthSwap, token.address);
  const ethSwap = await EthSwap.deployed();

  // Tranfer 21 million tokens to EthSwap.
  await token.transfer(ethSwap.address, MAX_TOKEN_SUPPLY);
};
