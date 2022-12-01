// const Owner = artifacts.require("Owner");
const Ballot = artifacts.require("Ballot");

module.exports = async function(deployer) {
  // // Deploy Owner
  // await deployer.deploy(Owner);
  // const owner = await Owner.deployed();

  // Deploy Ballot
  await deployer.deploy(Ballot);
  const ballot = await Ballot.deployed();
};
