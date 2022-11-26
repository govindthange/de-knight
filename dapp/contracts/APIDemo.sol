// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// import "github.com/provable-things/ethereum-api/provableAPI.sol";
import "./provableAPI.sol";

contract APIDemo is usingProvable {
    string public ETHUSD;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);

    constructor() payable {
        emit LogConstructorInitiated(
            "Constructor was initiated. Call 'updatePrice()' to send the Provable Query."
        );
    }

    function __callback(bytes32 myid, string memory result) public {
        //    if (msg.sender != provable_cbAddress()) revert();
        ETHUSD = result;
        emit LogPriceUpdated(result);
    }

    function updatePrice() public payable {
        if (provable_getPrice("URL") > msg.sender.balance) {
            // emit LogNewProvableQuery("Provable query was NOT sent, please add some ETH to cover for the query fee");
        } else {
            emit LogNewProvableQuery(
                "Provable query was sent, standing by for the answer.."
            );
            //    provable_query("URL", "json(https://api.pro.coinbase.com/products/ETH-USD/ticker).price");
        }
    }
}
