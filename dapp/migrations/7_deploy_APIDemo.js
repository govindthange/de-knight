const APIDemo = artifacts.require("APIDemo");

module.exports = async function(deployer) {
  // Deploy APIDemo
  await deployer.deploy(APIDemo);
  const demo = await APIDemo.deployed();
};
