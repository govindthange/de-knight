// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "./Token.sol";

/// @title Crowdfund contract
/// @author Govind Thange
/// @notice This is a contract to crowdfund a ERC20 tokens
contract Crowdfund {
    string public name = "Crowdfund";

    event CampaignLaunched(
        uint256 id,
        address indexed creator,
        uint256 goal,
        uint32 startAt, // To test in JS: new Date().getTime() / 1000
        uint32 endAt
    );
    event CampaignCancelled(uint256 id);
    event CampaignPledged(
        uint256 indexed id,
        address indexed caller,
        uint256 amount
    );
    event CampaignUnpledged(
        uint256 indexed id,
        address indexed caller,
        uint256 amount
    );
    event CampaignClaimed(uint256 id, uint256 totalPledged);
    event CampaignRefunded(
        uint256 indexed id,
        address indexed caller,
        uint256 amount
    );

    struct Campaign {
        address creator;
        uint256 goal;
        uint256 totalPledge;
        uint32 startAt;
        uint32 endAt;
        bool isClaimed;
    }

    /// @dev For security reasons each crowdfunding contract will only be able to support only one token
    Token public immutable token;

    /// @dev Map the campaign
    uint256 public count;
    mapping(uint256 => Campaign) public campaigns;

    /// @dev Track the amount each user has pledged to each campaign
    mapping(uint256 => mapping(address => uint256)) public pledgedAmount;

    /// @dev Initiatlize all the state variables
    constructor(address _token) {
        token = Token(_token);
    }

    /// @dev Launch a campaign by stating a goal
    /// @param _goal is the amount of ERC20 tokens to raise
    /// @param _startAt is the time when the campaign will start
    /// @param _endAt is the time when the campaign will end
    function launch(
        uint256 _goal,
        uint32 _startAt,
        uint32 _endAt
    ) external {
        // Check whether the inputs are valid
        require(_startAt >= block.timestamp, "Campaign can't begin in past!");
        require(_endAt >= _startAt, "Campaign can't end before it starts!");
        require(
            _endAt <= block.timestamp + 45 days,
            "Campaign must go for at least 45 days."
        );

        count += 1;
        campaigns[count] = Campaign({
            creator: msg.sender,
            goal: _goal,
            totalPledge: 0,
            startAt: _startAt,
            endAt: _endAt,
            isClaimed: false
        });

        emit CampaignLaunched(count, msg.sender, _goal, _startAt, _endAt);
    }

    /// @dev Cancel/undo an accidentally created campaign if it has not yet started
    /// @param _id is the campaign identifier
    function cancel(uint256 _id) external {
        Campaign memory campaign = campaigns[_id];

        // Check whether the cancel operation is allowed
        require(
            msg.sender == campaign.creator,
            "Only campaign creator can cancel a campaign."
        );
        require(
            block.timestamp < campaign.startAt,
            "Campaign cannot be cancelled after it has started."
        );

        delete campaigns[_id];
        emit CampaignCancelled(_id);
    }

    /// @dev Pay a certain amount as contribution to a campaign
    /// @param _id is the campaign identifier
    /// @param _amount is the contribution amount
    function pledge(uint256 _id, uint256 _amount) external {
        // We need to declarate storage because
        // we will have to update the campaign
        Campaign storage campaign = campaigns[_id];

        // Check whether the pledge is allowed
        require(
            block.timestamp >= campaign.startAt,
            "Cannot pledge before campaign starts."
        );
        require(
            block.timestamp <= campaign.endAt,
            "Cannot pledge after campaign ends."
        );

        campaign.totalPledge += _amount;
        pledgedAmount[_id][msg.sender] += _amount;
        token.transferFrom(msg.sender, address(this), _amount);
        emit CampaignPledged(_id, msg.sender, _amount);
    }

    /// @dev Get a certain amount back from campaign while the campaign is still going
    /// @param _id is the campaign identifier
    /// @param _amount is the amount unpledged from campaign
    function unpledge(uint256 _id, uint256 _amount) external {
        // We need to declarate storage because
        // we will have to update the campaign
        Campaign storage campaign = campaigns[_id];

        // Check whether the unpledge operation is allowed
        require(
            block.timestamp <= campaign.endAt,
            "Cannot unpledge after campaign ends."
        );

        campaign.totalPledge -= _amount;
        pledgedAmount[_id][msg.sender] -= _amount;
        token.transfer(msg.sender, _amount);
        emit CampaignUnpledged(_id, msg.sender, _amount);
    }

    /// @dev Campaign creators gets the collected amount from a succesful comapain
    /// @param _id is the campaign identifier
    function claim(uint256 _id) external {
        // We need to declarate storage because
        // we will have to update the campaign
        Campaign storage campaign = campaigns[_id];

        // Check whether the claim is allowed
        require(
            msg.sender == campaign.creator,
            "Only campaign creator can claim funds."
        );
        require(
            block.timestamp > campaign.endAt,
            "Funds cannot be claimed before campaign ends."
        );
        require(
            campaign.totalPledge >= campaign.goal,
            "Funds cannot be claimed if the campaign goal was not met."
        );
        require(!campaign.isClaimed, "Campaing has already been claimed.");

        campaign.isClaimed = true;
        token.transfer(msg.sender, campaign.totalPledge);

        emit CampaignClaimed(_id, campaign.totalPledge);
    }

    /// @dev Users can get their tokens back
    /// @param _id is the campaign identifier
    function refund(uint256 _id) external {
        // We need to declarate storage because
        // we will have to update the campaign
        Campaign storage campaign = campaigns[_id];

        // Check whether the refund is allowed
        require(
            block.timestamp > campaign.endAt,
            "Cannot refund before campaign ends."
        );
        require(
            campaign.totalPledge < campaign.goal,
            "Cannot refund when campaign meets its goal."
        );

        pledgedAmount[_id][msg.sender] = 0;
        uint256 balance = pledgedAmount[_id][msg.sender];
        token.transfer(msg.sender, balance);

        emit CampaignRefunded(_id, msg.sender, balance);
    }
}
