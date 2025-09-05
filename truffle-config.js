const path = require('path');

module.exports = {
  contracts_directory: path.join(__dirname, 'contracts'),
  contracts_build_directory: path.join(__dirname, 'src/contracts'),
  migrations_directory: path.join(__dirname, 'migrations'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: 1337, // ID fijo en lugar de '*'
      gas: 6721975,
      gasPrice: 20000000000,
      confirmations: 0,
      timeoutBlocks: 50,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 1500
        }
      }
    }
  }
};
