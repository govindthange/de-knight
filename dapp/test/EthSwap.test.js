const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");
const EthSwap = artifacts.require("EthSwap");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

contract('EthSwap', ([deployer, investor]) => {

    let token, ethSwap;

    before(async () => {
        token = await Token.new();
        ethSwap = await EthSwap.new(token.address);
    })

    describe('EthSwap deployment w/ transfer', async() => {
        it('should have a name "ETH/CHESS Swap"', async() => {
            const name = await ethSwap.name();
            assert.equal(name, 'ETH/CHESS Swap');
        })

        it('should show balance 1000000 after transfer', async() => {
            await token.transfer(ethSwap.address, tokens('1000000'));
            let balance = await token.balanceOf(ethSwap.address);
            assert.equal(balance.toString(), tokens('1000000'));
        })
    })

    describe('Purchase tokens', async() => {

        let result;

        before(async () => {
            result = await ethSwap.buyTokens({from: investor, value: web3.utils.toWei('1', 'ether')});
        })

        it('Should allow player to instantly purchase tokens from EthSwap at a fixed rate.', async() => {
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('100'));

            // Its a brittle test. WIP!
            let ethSwapBalance = await token.balanceOf(ethSwap.address);
            assert.equal(ethSwapBalance.toString(), tokens('999900'));

            // Check logs to ensure event was emitted with correct data.
            const event = result.logs[0].args
            // Print emitted events.
            //console.log(event);

            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString());
            assert.equal(event.rate.toString(), '100');
        })
    })

    describe('Sell tokens', async() => {

        let result;

        before(async () => {
            // Investor must approve tokens before the purchase
            await token.approve(ethSwap.address, tokens('100'), {from: investor});
            result = await ethSwap.sellTokens(tokens('100'), {from: investor});
        })

        it('Should allow player to instantly sell tokens to EthSwap at a fixed rate.', async() => {
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), tokens('0'));

            // Check logs to ensure event was emitted with correct data.
            const event = result.logs[0].args
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), tokens('100').toString());
            assert.equal(event.rate.toString(), '100');
        })
    })
})