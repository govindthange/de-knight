const ChessNFT = artifacts.require("ChessNFT");

module.exports = async function(deployer) {
  // Deploy ChessNFT
  await deployer.deploy(ChessNFT);
  const chessNFT = await ChessNFT.deployed();
};
