// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

import "./Token.sol";

/// @title EthSwap contract
/// @author Govind Thange
/// @notice This contract facilitates swapping between ETH and CHESS tokens.
contract EthSwap {
    string public name = "ETH/CHESS Swap";

    Token public token;
    uint256 public redemptionRate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );
    event TokensSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    /// @dev Set Token contract instance upon deployment
    constructor(Token _token) {
        token = _token;
    }

    /// @dev Transfer CHESS from EthSwap contract account to player's account after receiving ETH tokens.
    function buyTokens() public payable {
        uint256 tokenAmount = msg.value * redemptionRate;

        // Ensure that the EthSwap exchange has sufficient token balance.
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Insufficient balance!"
        );

        // Transfer tokens from EthSwap to player (i.e. msg.sender)
        token.transfer(msg.sender, tokenAmount);

        emit TokensPurchased(
            msg.sender,
            address(token),
            tokenAmount,
            redemptionRate
        );
    }

    /// @dev Transfer tokens from player's wallet back to the EthSwap
    /// @param _tokenAmount is the total CHESS tokens to be transferred
    function sellTokens(uint256 _tokenAmount) public {
        uint256 etherAmount = _tokenAmount / redemptionRate;

        // Ensure that the player has sufficient token balance.
        require(
            token.balanceOf(msg.sender) >= _tokenAmount,
            "Insufficient balance!"
        );

        // Transfer tokens from player (i.e. msg.sender) to EthSwap contract
        token.transferFrom(msg.sender, address(this), _tokenAmount);

        // Transfer ethers from EthSwap exchange to the player.
        payable(msg.sender).transfer(etherAmount);

        emit TokensSold(
            msg.sender,
            address(token),
            _tokenAmount,
            redemptionRate
        );
    }
}
