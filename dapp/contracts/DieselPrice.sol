// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

// https://github.com/provable-things/ethereum-api/blob/master/provableAPI.sol
import "./provableAPI.sol";

contract DieselPrice is usingProvable {
    uint256 public dieselPriceUSD;

    event LogNewDieselPrice(string price);
    event LogNewProvableQuery(string description);

    string public ETHUSD;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);

    // constructor() {
    //     update(); // First check at contract creation...
    // }

    /// @dev Retrieve the stored value of greeting
    /// @return the greeting message
    function get() public view returns (uint256) {
        return dieselPriceUSD;
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != provable_cbAddress()) revert();
        ETHUSD = result;
        emit LogPriceUpdated(result);
        updatePrice();
    }

    function updatePrice() public payable {
        if (provable_getPrice("URL") > msg.sender.balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query was sent, standing by for the answer.."
            );
            provable_query(
                60,
                "URL",
                "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price"
            );
        }
    }
    /*
    function __callback(bytes32 _myid, string memory _result) public {
        require(msg.sender == provable_cbAddress());
        emit LogNewDieselPrice(_result);
        dieselPriceUSD = parseInt(_result, 2); // Let's save it as cents...
        // Now do something with the USD Diesel price...
    }

    function update() public payable {
        emit LogNewProvableQuery(
            "Provable query was sent, standing by for the answer..."
        );
        provable_query(
            "URL",
            "xml(https://www.fueleconomy.gov/ws/rest/fuelprices).fuelPrices.diesel"
        );
    }
    */
}
