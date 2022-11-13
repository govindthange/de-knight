const Token = artifacts.require("Token");
const Crowdfund = artifacts.require("Crowdfund");

module.exports = async function(deployer) {
  // Deploy Token
  await deployer.deploy(Token);
  const token = await Token.deployed();

  // Deploy Crowdfund
  await deployer.deploy(Crowdfund, token.address);
  const crowdfund = await Crowdfund.deployed();
};
