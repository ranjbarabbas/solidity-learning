# Solidity Learning Repository

A comprehensive repository for learning Solidity smart contract development with practical examples, tests, and deployment scripts.

## Overview

This repository contains educational Solidity contracts demonstrating fundamental concepts:
- **HelloWorld**: Simple state variables and getter/setter functions
- **Counter**: Basic arithmetic operations and state management
- **ERC20**: Token standard implementation (educational version)
- **TestToken**: Production-ready ERC20 token using OpenZeppelin

## Prerequisites

Before getting started, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/ranjbarabbas/solidity-learning.git
cd solidity-learning
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- **Hardhat**: Ethereum development environment
- **OpenZeppelin Contracts**: Secure, audited smart contract libraries
- **Ethers.js**: Blockchain interaction library
- **Chai**: Testing framework

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
PRIVATE_KEY=your_private_key_here
BSCSCAN_API=your_bscscan_api_key_here
```

⚠️ **NEVER commit your `.env` file to version control!** It's in `.gitignore` for your safety.

## Project Structure

```
solidity-learning/
├── contracts/              # Smart contract source files
│   ├── HelloWorld.sol      # Basic example contract
│   ├── Counter.sol         # Counter contract with increment/decrement
│   ├── ERC20.sol           # Educational ERC20 implementation
│   ├── IERC20.sol          # ERC20 token interface
│   └── TestToken.sol       # Production ERC20 token
├── scripts/
│   └── deploy.js           # Deployment script
├── test/
│   ├── Token.js            # Basic token tests
│   └── TokenwFixture.js    # Advanced tests using fixtures
├── hardhat.config.js       # Hardhat configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

## Usage

### Compile Contracts

Compile all Solidity contracts:

```bash
npm run compile
```

This generates artifacts in the `artifacts/` directory containing ABIs and bytecode.

### Run Tests

Execute the test suite:

```bash
npm test
```

This runs all tests in the `test/` directory using Hardhat's built-in test network.

Run tests with verbose output:

```bash
npx hardhat test --verbose
```

### Deploy to Networks

#### Deploy to Local Hardhat Network

```bash
npx hardhat run scripts/deploy.js
```

#### Deploy to BSC Testnet

```bash
npm run deploy:testnet
```

#### Deploy to BSC Mainnet

```bash
npm run deploy:mainnet
```

⚠️ **Warning**: Ensure you have sufficient funds before deploying to mainnet!

### Verify Contracts on Explorer

After deployment, verify your contract on BSCScan:

```bash
npx hardhat verify --network testnet CONTRACT_ADDRESS "Constructor Argument 1" "Constructor Argument 2"
```

Example for TestToken (no constructor arguments):

```bash
npx hardhat verify --network testnet 0x1234567890123456789012345678901234567890
```

## Contract Details

### HelloWorld

A simple contract demonstrating basic Solidity concepts:
- State variable storage
- Public variable access
- Function returns

**Key Functions:**
- `setGreeting(string memory newGreeting)`: Update the greeting message
- `getGreeting() returns (string memory)`: Retrieve the current greeting

### Counter

Demonstrates arithmetic operations and state mutations:
- Increment and decrement operations
- Safety checks to prevent underflow
- State variable updates

**Key Functions:**
- `inc()`: Increment counter by 1
- `dec()`: Decrement counter by 1 (requires count > 0)
- `reset()`: Reset counter to 0
- `setCount(uint _count)`: Set counter to a specific value

### ERC20 (Educational)

An educational implementation of the ERC20 token standard. **⚠️ For learning purposes only** - use OpenZeppelin's version in production.

**Key Functions:**
- `transfer(address to, uint amount)`: Transfer tokens to another address
- `approve(address spender, uint amount)`: Approve spender to use tokens
- `transferFrom(address from, address to, uint amount)`: Transfer tokens with allowance
- `mint(uint amount)`: Create new tokens
- `burn(uint amount)`: Destroy tokens

**Important Notes:**
- This implementation includes basic input validation
- Production contracts should use `@openzeppelin/contracts` version
- Missing advanced security features of production implementations

### TestToken

A production-ready ERC20 token built on OpenZeppelin's secure implementation:
- **Name**: TestToken
- **Symbol**: TST
- **Decimals**: 18
- **Initial Supply**: 1,000 TST tokens (minted to deployer)

## Testing Examples

### Basic Test Example

```javascript
it("Should transfer tokens between accounts", async function () {
  const [owner, addr1] = await ethers.getSigners();
  const token = await Token.deploy();

  // Transfer 100 tokens to addr1
  await token.transfer(addr1.address, ethers.utils.parseUnits("100", 18));

  // Check balance
  expect(await token.balanceOf(addr1.address))
    .to.equal(ethers.utils.parseUnits("100", 18));
});
```

### Testing with Fixtures

```javascript
async function deployTokenFixture() {
  const token = await Token.deploy();
  return { token, owner, addr1 };
}

it("Should work with fixtures", async function () {
  const { token, owner } = await loadFixture(deployTokenFixture);
  // Test code here
});
```

## Common Commands Reference

| Command | Description |
|---------|-------------|
| `npm run compile` | Compile all contracts |
| `npm test` | Run all tests |
| `npm run deploy:testnet` | Deploy to BSC Testnet |
| `npm run deploy:mainnet` | Deploy to BSC Mainnet |
| `npm run clean` | Clean artifacts and cache |
| `npx hardhat node` | Start a local hardhat node |
| `npx hardhat help` | Show all available commands |

## Learning Resources

- **Solidity Documentation**: [docs.soliditylang.org](https://docs.soliditylang.org/)
- **Hardhat Documentation**: [hardhat.org](https://hardhat.org/)
- **OpenZeppelin Contracts**: [docs.openzeppelin.com](https://docs.openzeppelin.com/)
- **Ethereum Development**: [ethereum.org/en/developers](https://ethereum.org/en/developers/)
- **ERC20 Standard**: [EIP-20](https://eips.ethereum.org/EIPS/eip-20)

## Security Notes

⚠️ **Important Security Considerations:**

1. **Private Keys**: Never commit private keys or seed phrases to version control
2. **Test Network Only**: Always test extensively on testnets before mainnet deployment
3. **Code Audits**: For production contracts, consider professional security audits
4. **OpenZeppelin**: Use audited implementations from OpenZeppelin for production
5. **Gas Optimization**: Educational contracts prioritize clarity over gas optimization
6. **Error Handling**: Production code should include comprehensive error handling

## Troubleshooting

### Issue: "Cannot find module '@nomicfoundation/hardhat-toolbox'"

**Solution**: Run `npm install` to install all dependencies

### Issue: "PRIVATE_KEY not found in environment"

**Solution**: Create a `.env` file with your private key (see Configuration section)

### Issue: Tests fail with "testToken not found"

**Solution**: Make sure contracts are compiled first: `npm run compile`

### Issue: Insufficient balance for deployment

**Solution**: Get testnet funds from a BSC testnet faucet:
- [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)

## Contributing

This is an educational repository. Feel free to fork, modify, and improve for your learning journey!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This repository is for **educational purposes only**. The smart contracts are examples and should not be used in production without:
- Professional security audits
- Thorough testing
- Expert review
- Compliance with applicable regulations

Always use audited, battle-tested libraries like OpenZeppelin in production environments.

---

**Happy Learning! 🚀**

For questions or suggestions, feel free to open an issue on GitHub.
