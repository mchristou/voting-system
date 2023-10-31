const hre = require("hardhat");
const ethers = hre.ethers;

const contractAddress = process.env.ContractAddress;
const contractAbi = require("../artifacts/contracts/VotingSystem.sol/VotingSystem.json").abi;


async function main() {

  const rpcURL = 'http://127.0.0.1:8545/';
  const provider = new ethers.JsonRpcProvider(rpcURL);

  const admin = await provider.getSigner(0);
  const accountA = await provider.getSigner(1);
  const accountB = await provider.getSigner(2);
  const accountC = await provider.getSigner(3);

  const contract = new ethers.Contract(contractAddress, contractAbi, admin);
  try {

    // Add CandidateA
    const candidateAName = 'CandidateA';
    const addCandidateATx = await contract.addCandidate(candidateAName);
    await addCandidateATx.wait();
    console.log(`Candidate ${candidateAName} added`);

    // Add CandidateB
    const candidateBName = 'CandidateB';
    const addCandidateBTx = await contract.addCandidate(candidateBName);
    await addCandidateBTx.wait();
    console.log(`Candidate ${candidateBName} added`);

    // Start voting
    const startVotingTx = await contract.startVoting();
    await startVotingTx.wait();
    console.log('Voting started');

    // accountA vote
    const accountATx = await contract.connect(accountA).vote(0);
    await accountATx.wait();
    // accountB vote
    const accountBTx = await contract.connect(accountB).vote(1);
    await accountBTx.wait();
    // accountA vote
    const accountCTx = await contract.connect(accountC).vote(1);
    await accountCTx.wait();

    // End voting
    const endVotingTx = await contract.endVoting();
    await endVotingTx.wait();
    console.log('Voting ended');


    // Retrieve winner
    const winner = await contract.getWinner();
    console.log(`Winner: ${winner}`);

  }
  catch (error) {
    console.log(error);
  }
}

main();
