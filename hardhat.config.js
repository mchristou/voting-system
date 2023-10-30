require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    local: {
      url: "http://localhost:8545",
      // chainId: 1337,
      gas: 10000000, // This is the gas limit
    },
  },
};
