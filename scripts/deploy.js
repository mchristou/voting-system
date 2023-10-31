const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy(["CandidateA", "CandidateB"]);
  const contractAddress = await votingSystem.getAddress();

  // This is needed in the votingSystem.js
  process.env.ContractAddress = contractAddress;

  console.log("VotingSystem deployed to:", contractAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

