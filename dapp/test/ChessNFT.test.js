const { assert, expect } = require('chai');
const { default: Web3 } = require('web3');
const ChessNFT = artifacts.require("ChessNFT");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('ChessNFT', ([deployer, investor]) => {

    let chessNFT;

    before(async () => {
        chessNFT = await ChessNFT.new();
    })

    describe('ChessNFT deployment w/ minting', async() => {
        it('should mint w/ token URI by the owner', async() => {
          const tokenURI = "QmQvEFSzuY2Re7mS1NdCNz6EH2yWmycL27sDF7dMvdZa9f";
          let result = await chessNFT.mintFromOwner(deployer, tokenURI);

          const {tokenId} = result.logs[0].args;
          expect(tokenId).to.be.not.undefined;
          expect(tokenId).to.be.not.null;
          expect(tokenId).to.be.not.NaN;
          expect(String(tokenId)).to.equal("1");
        })
        it('should mint w/ token URI by anyone', async() => {
          const tokenURI = "QmQvEFSzuY2Re7mS1NdCNz6EH2yWmycL27sDF7dMvdZa9f";
          let result = await chessNFT.mint(tokenURI);

          const {tokenId} = result.logs[0].args;
          expect(tokenId).to.be.not.undefined;
          expect(tokenId).to.be.not.null;
          expect(tokenId).to.be.not.NaN;
          expect(String(tokenId)).to.equal("2");
        })

        it('should mimic mint w/ token URI and return the same', async() => {
          const tokenURI = "QmQvEFSzuY2Re7mS1NdCNz6EH2yWmycL27sDF7dMvdZa9f";
          let result = await chessNFT.reflectMint(tokenURI);
          expect(String(result)).to.equal(tokenURI);
        })
    })
})
