const DieselPrice = artifacts.require("DieselPrice");
/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("DieselPrice", function (/* accounts */) {

  it("should update diesel price", async function () {
    const instance = await DieselPrice.deployed();
    await instance.updatePrice();
    const response = await instance.get();
    console.log(response);
    assert.eq(response, 123);
  });
});
