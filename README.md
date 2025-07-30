# SupplyBlocks

Blockchain applied to supply chain orchestration

<div style="text-align:center"><img src="src/assets/logo.png"/></div>

## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js 18.x** (Required for compatibility)
- **npm** (comes with Node.js)
- **Ganache** (local blockchain)
- **MetaMask** (browser extension)

### Installing Node.js 18

If you don't have Node.js 18, you can install it using:

```bash
# Using nvm (recommended)
nvm install 18
nvm use 18

# Or download directly from nodejs.org
# https://nodejs.org/en/download/
```

## How to use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dtote/SupplyBlocks.git
   cd SupplyBlocks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start Ganache:**
   - Open Ganache application
   - Create a new workspace or use the default one
   - Make sure it's running on port 7545

4. **Deploy smart contracts:**
   ```bash
   npm run migrate
   ```

5. **Start the application:**
   ```bash
   npm start
   ```

6. **Configure MetaMask:**
   - Open MetaMask in your browser
   - Add a new network with the following settings:
     - **Network Name:** Ganache
     - **RPC URL:** http://127.0.0.1:7545
     - **Chain ID:** 1337
     - **Currency Symbol:** ETH
   - Import an account from Ganache using the private key

7. **Connect MetaMask:**
   - The application will open in your browser at http://localhost:3000
   - Click "Connect Wallet" or similar button to connect MetaMask
   - Approve the connection in MetaMask

## Troubleshooting

### Common Issues

**Error: "Module not found" or polyfill errors:**
- Make sure you're using Node.js 18.x
- Run `node --version` to verify
- If using a different version, switch to Node.js 18

**Error: "Cannot connect to Ganache":**
- Make sure Ganache is running
- Verify the RPC URL in MetaMask is correct
- Check that Ganache is on port 7545

**Error: "Smart contracts not deployed":**
- Run `npm run migrate` again
- Make sure Ganache is running before migrating

**Error: "MetaMask not connected":**
- Make sure MetaMask is installed and unlocked
- Check that you're on the correct network (Ganache)
- Try refreshing the page

### Quick Setup (All in one)

If you want to run everything quickly:

```bash
# 1. Install Node.js 18 (if not already installed)
nvm install 18 && nvm use 18

# 2. Clone and setup
git clone https://github.com/dtote/SupplyBlocks.git
cd SupplyBlocks

# 3. Install and run
npm install && npm run migrate && npm start
```

## About

SupplyBlocks was created as [Cybersecurity and Data Intelligence Master's Degree final project](report.pdf).

## Recent Updates

This fork includes compatibility fixes for:
- Node.js 18+ support
- Updated react-scripts to 5.0.1
- Fixed TypeScript compilation issues
- Improved Web3 configuration
- Enhanced error handling

## Contributing

Feel free to submit issues and enhancement requests!
