// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;

/// @title Token contract
/// @author Govind Thange
/// @notice This is a non-secure token for PoC. The real implementation will follow openzeppelin library
contract Token {
    string public name = "De-Chess";
    string public symbol = "CHESS";
    uint256 public totalSupply = 21000000000000000000000000; // 21 million tokens
    uint8 public decimals = 18;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    /// @dev Allocate total supply to the deployer's account
    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    /// @dev Transfer tokens to a given address
    /// @param _to is the receiver's address
    /// @param _value is amount received
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    /// @dev Grant a stipulated amount for spending by the spender
    /// @param _spender is the address being approved for spending
    /// @param _value is the maximum amount allowed for spending
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    /// @dev Transfer a given amount from one account to another
    /// @param _from is the address from which the token will flow
    /// @param _to is the address to which the token will flow to
    /// @param _value is the amount being transferred
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
