// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract VotingSystem {
    address public admin;
    bool public votingStarted;
    uint256 public winningCandidateId;

    struct Candidate {
        string name;
        uint256 votes;
    }

    Candidate[] public candidates;
    mapping(address => bool) public hasVoted;

    constructor(string[] memory candidateNames) {
        admin = msg.sender;
        votingStarted = false;
        winningCandidateId = 0;

        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate({name: candidateNames[i], votes: 0}));
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only the admin can call this function");
        _;
    }

    modifier votingIsOpen() {
        require(votingStarted, "Voting has not started");
        _;
    }

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    function addCandidate(string memory candidateName) public onlyAdmin {
        require(
            !votingStarted,
            "Candidates cannot be added after the start of voting"
        );
        candidates.push(Candidate({name: candidateName, votes: 0}));
    }

    function startVoting() public onlyAdmin {
        require(!votingStarted, "Voting has already started");
        votingStarted = true;
    }

    function vote(uint256 candidateId) public votingIsOpen hasNotVoted {
        require(candidateId < candidates.length, "Invalid candidate ID");
        candidates[candidateId].votes++;
        hasVoted[msg.sender] = true;
    }

    function endVoting() public onlyAdmin {
        require(votingStarted, "Voting has not started yet");
        votingStarted = false;
        winningCandidateId = findWinningCandidate();
    }

    function findWinningCandidate() internal view returns (uint256) {
        uint256 maxVotes = 0;
        uint256 winningId = 0;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > maxVotes) {
                maxVotes = candidates[i].votes;
                winningId = i;
            }
        }

        return winningId;
    }

    function getVotesForCandidate(uint256 candidateId)
        public
        view
        returns (uint256)
    {
        require(candidateId < candidates.length, "Invalid candidate ID");
        return candidates[candidateId].votes;
    }

    function getWinner() public view returns (string memory) {
        return candidates[winningCandidateId].name;
    }
}
