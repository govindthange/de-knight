const DieselPrice = artifacts.require("DieselPrice");

module.exports = async function(deployer) {
  // Deploy DieselPrice
  await deployer.deploy(DieselPrice);
  const token = await DieselPrice.deployed();
};
