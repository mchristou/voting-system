# Voting System Smart Contract

A simple example of a Voting System smart contract deployed and interacted with using Hardhat and ethers.js.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)

## Getting Started

1. Clone the repository and navigate to the project folder.

2. Install project dependencies:

    ```
    npm install
    ```

3. Compile the smart contract:

    ```
    npx hardhat compile
    ```

4. Deploy the smart contract:

    ```
    npx hardhat run scripts/deploy.js --network <network-name>
    ```

5. Execute the script that interacts with the smart contract:

    ```
    npx hardhat run scripts/votingSystem.js --network <network-name>
    ```

6. Execute tests:

    ```
    npx hardhat test
    ```

## Example

Example of deploying and interacting with the smart contract on a local node:

1. Start a Hardhat node:

    ```
    npx hardhat node
    ```

2. On a different terminal execute the deploy script:

    ```
    npx hardhat run scripts/deploy.js --network localhost

    ```
    output:
    ```
    Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
    VotingSystem deployed to: 0x0165878A594ca255338adfa4d48449f69242Eb8F
    ```

3. Execute the interaction script:

    ```
    npx hardhat run scripts/votingSystem.js --network localhost
    ```
    output:
    ```
    Candidate CandidateA added
    Candidate CandidateB added
    Voting started
    Voting ended
    Winner: CandidateB
    ```

This demonstrates how to deploy, interact with, and test the Voting System smart contract in a local development environment.
