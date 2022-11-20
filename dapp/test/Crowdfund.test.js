const { assert } = require('chai');
const { default: Web3 } = require('web3');

const Token = artifacts.require("Token");
const Crowdfund = artifacts.require("Crowdfund");

const organizer = "0x33489ed5cf4c1622c853aaee4f68a4c5798d513a"
const donor = "0xccfa7493e3c8bb69bd5e0c8f6d0fd9c3f29a1f71";

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

const sleep = m => new Promise(r => setTimeout(r, m))

contract('Crowdfund', ([deployerAccount, userAccount]) => {

    let token, crowdfund;

    before(async () => {
        token = await Token.new();
        crowdfund = await Crowdfund.new(token.address);
    })

    describe('Crowdfund deployment', async() => {
        it('should have a name "Crowdfund"', async() => {
            const name = await crowdfund.name();
            assert.equal(name, 'Crowdfund');
        })
    })

    describe('Launch campaign', async() => {

        let result;
        let campaignId = 1;
        let campaignGoal = tokens('100');
        let campaignStartDate = Math.floor(new Date().getTime() / 1000) + 50
        let campaignEndDate = campaignStartDate + 100;

        before(async () => {
            result = await crowdfund.launch(campaignGoal, campaignStartDate, campaignEndDate, {from: organizer});
        })

        it('Should create a campaign', async() => {
            const event = result.logs[0].args // Check logs to ensure event was emitted with correct data.
            // console.log(`crowdfund.launch() => ${JSON.stringify(event)}`); // Print emitted events.

            assert.equal(event.id, campaignId);
            assert.equal(event.creator, organizer);
            assert.equal(event.goal.toString(), campaignGoal);
            assert.equal(event.startAt, campaignStartDate);
            assert.equal(event.endAt, campaignEndDate);
        })

        it('Should cancel a campaign before it starts', async() => {
            result = await crowdfund.cancel(campaignId, {from: organizer});

            const event = result.logs[0].args // Check logs to ensure event was emitted with correct data.
            // console.log(`crowdfund.cancel() => ${JSON.stringify(event)}`); // Print emitted events.

            assert.equal(event.id, campaignId);
        })
    })

    describe('Pledge campaign', async() => {

        let launchResult;
        let pledgeResult;
        let unpledgeResult;
        let campaignId = 1;
        let campaignGoal = tokens('100');
        let pledgeAmount = tokens('50');
        let unpledgeAmount = tokens('2');

        before(async () => {
            let tempDate = new Date();
            let campaignStartDate = Math.floor(tempDate / 1000)+1
            console.log("Start Date: " + tempDate.toDateString());
            let campaignEndDate = Math.floor(tempDate.setDate(tempDate.getDate() + 1)/1000); // Add a day to start date
            console.log("End Date: " + tempDate.toDateString());
            launchResult = await crowdfund.launch(campaignGoal, campaignStartDate, campaignEndDate, {from: organizer});
        })

        it('Should pledge a campaign between its start & end date', async() => {
            console.log("Sleep before " + new Date().toLocaleTimeString())
            await sleep(10);
            console.log("Sleep after "+ new Date().toLocaleTimeString())
            pledgeResult = await crowdfund.pledge(campaignId, pledgeAmount, {from: donor});

            const event = pledgeResult.logs[0].args // Check logs to ensure event was emitted with correct data.
            console.log(`crowdfund.pledge() => ${JSON.stringify(event)}`); // Print emitted events.

            assert.equal(event.id, campaignId);
            assert.equal(event.creator, donor);
            assert.equal(event.amount.toString(), pledgeAmount);
        })

        it('Should unpledge a campaign between its start & end date', async() => {
            unpledgeResult = await crowdfund.unpledge(campaignId, unpledgeAmount, {from: donor});

            const event = unpledgeResult.logs[0].args // Check logs to ensure event was emitted with correct data.
            console.log(`crowdfund.unpledge() => ${JSON.stringify(event)}`); // Print emitted events.

            assert.equal(event.id, campaignId);
            assert.equal(event.creator, donor);
            assert.equal(event.amount.toString(), unpledgeAmount);
        })
    })

    describe('Claim funds in a successful campaign', async() => {

        let launchResult;
        let pledgeResult;
        let claimResult;
        let campaignId = 1;
        let campaignGoal = tokens('100');
        let pledgeAmount = tokens('50');
        let totalPledge = tokens('100');

        before(async () => {
            let tempDate = new Date();
            let campaignStartDate = Math.floor(tempDate / 1000)+1
            let campaignEndDate = Math.floor(tempDate.setDate(tempDate.getDate() + 1)/1000); // Add a day to start date
            launchResult = await crowdfund.launch(campaignGoal, campaignStartDate, campaignEndDate, {from: organizer});
            pledgeResult = await crowdfund.pledge(campaignId, pledgeAmount, {from: donor});
        })

        it('Should issue claim after a successful campaign ends', async() => {
            claimResult = await crowdfund.claim(campaignId, {from: organizer});

            const event = claimResult.logs[0].args // Check logs to ensure event was emitted with correct data.
            console.log(`crowdfund.claim() => ${JSON.stringify(event)}`); // Print emitted events.

            assert.equal(event.id, campaignId);
            assert.equal(event.creator, organizer);
            assert.equal(event.amount.toString(), totalPledge);
        })
    })
})