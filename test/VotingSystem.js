const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingSystem", function() {
  let votingSystem;
  let admin;
  let voter1;
  let voter2;
  let voter3;

  before(async function() {
    const VotingSystem = await ethers.getContractFactory("VotingSystem");
    [admin, voter1, voter2, voter3] = await ethers.getSigners();
    votingSystem = await VotingSystem.deploy(["CandidateA", "CandidateB"]);
    // await votingSystem.deployed();
  });

  it("should only allow the admin to start and end voting", async function() {
    // Try to start voting as a non-admin (voter1)
    await expect(votingSystem.connect(voter1).startVoting()).to.be.revertedWith(
      "Only the admin can call this function"
    );

    // Start voting as the admin
    await votingSystem.connect(admin).startVoting();
    expect(await votingSystem.votingStarted()).to.equal(true);

    // Try to end voting as a non-admin (voter2)
    await expect(votingSystem.connect(voter2).endVoting()).to.be.revertedWith(
      "Only the admin can call this function"
    );

    // End voting as the admin
    await votingSystem.connect(admin).endVoting();
    expect(await votingSystem.votingStarted()).to.equal(false);
  });

  it("should correctly reflect the votes for the right candidate", async function() {
    // Ensure voting is open
    await votingSystem.connect(admin).startVoting();

    // Voter1 votes for CandidateA (index 0)
    await votingSystem.connect(voter1).vote(0);

    // Voter2 votes for CandidateB (index 1)
    await votingSystem.connect(voter2).vote(1);

    // Voter3 votes for CandidateA (index 0)
    await votingSystem.connect(voter3).vote(0);

    // Close voting
    await votingSystem.connect(admin).endVoting();

    // Check the votes for CandidateA and CandidateB
    expect(await votingSystem.getVotesForCandidate(0)).to.equal(2);
    expect(await votingSystem.getVotesForCandidate(1)).to.equal(1);

    // Check the winner
    expect(await votingSystem.getWinner()).to.equal("CandidateA");
  });
});

