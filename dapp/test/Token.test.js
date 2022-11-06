const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('Token', ([deployer, investor]) => {

    let token, ethSwap;

    before(async () => {
        token = await Token.new();
    })

    describe('Token deployment', async() => {
        it('Should have a name', async() => {
            const name = await token.name();
            assert.equal(name, 'De-Chess');
        })
    })
})