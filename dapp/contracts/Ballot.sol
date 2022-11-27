// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "./Owner.sol";

/// @title Ballot contract
/// @author Govind Thange
/// @notice Implements voting process along with vote delegation
contract Ballot is Owner {
    struct Voter {
        uint256 weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
        address delegate; // person delegated to
        uint256 vote; // index of the voted proposal
    }

    struct Proposal {
        // If you can limit the length to a certain number of bytes,
        // always use one of bytes1 to bytes32 because they are much cheaper
        bytes32 name; // short name (up to 32 bytes)
        uint256 voteCount; // number of accumulated votes
    }

    address public chairperson;

    // event for EVM logging
    event ChairpersonSet(
        address indexed oldChairperson,
        address indexed newChairperson
    );

    mapping(address => Voter) public voters;

    // TODO: create proposals for each voting session.
    uint256 public proposalCount;
    Proposal[] public proposals;

    // @dev Create a new ballot to choose one of 'proposalNames'.
    // @param proposalNames is the names of proposals.
    constructor(bytes32[] memory proposalNames) Owner() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        addProposals(proposalNames);
    }

    // @dev Change the chairperson
    // @param newChairperson is the address of new chairperson
    function changeChairperson(address newChairperson) public isOwner {
        emit ChairpersonSet(chairperson, newChairperson);
        voters[chairperson].weight = 0;
        chairperson = newChairperson;
        voters[chairperson].weight = 1;
    }

    function addProposals(bytes32[] memory proposalNames) public {
        for (uint256 i = 0; i < proposalNames.length; i++) {
            addProposal(proposalNames[i]);
        }
    }

    function addProposal(bytes32 _name) private {
        proposalCount++;
        // 'Proposal({...})' creates a temporary Proposal object and
        // 'proposals.push(...)' appends it to the end of 'proposals'.
        proposals.push(Proposal({name: _name, voteCount: 0}));
    }

    // @dev Give 'voter' the right to vote on this ballot. May only be called by 'chairperson'.
    // @param voter is the address of voter.
    function giveRightToVote(address voter) public {
        require(
            msg.sender == chairperson,
            "Only chairperson can give right to vote."
        );
        require(!voters[voter].voted, "The voter already voted.");
        require(voters[voter].weight == 0);
        voters[voter].weight = 1;
    }

    // @dev Delegate your vote to the voter 'to'.
    // @param to is the address to which vote is delegated.
    function delegate(address to) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "You already voted.");
        require(to != msg.sender, "Self-delegation is disallowed.");

        while (voters[to].delegate != address(0)) {
            to = voters[to].delegate;

            // We found a loop in the delegation, not allowed.
            require(to != msg.sender, "Found loop in delegation.");
        }
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegate_ = voters[to];
        if (delegate_.voted) {
            // If the delegate already voted,
            // directly add to the number of votes
            proposals[delegate_.vote].voteCount += sender.weight;
        } else {
            // If the delegate did not vote yet,
            // add to her weight.
            delegate_.weight += sender.weight;
        }
    }

    // @dev Give your vote (including votes delegated to you) to proposal 'proposals[proposal].name'.
    // @param proposal is the index of proposal in the proposals array.
    function vote(uint256 proposal) public {
        Voter storage sender = voters[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    // @dev Computes the winning proposal taking all previous votes into account and then
    // @return winningProposal_ the index of winning proposal in the proposals array.
    function winningProposal() public view returns (uint256 winningProposal_) {
        uint256 winningVoteCount = 0;
        for (uint256 p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    // @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
    // @return winnerName_ the name of the winner.
    function winnerName() public view returns (bytes32 winnerName_) {
        winnerName_ = proposals[winningProposal()].name;
    }
}
