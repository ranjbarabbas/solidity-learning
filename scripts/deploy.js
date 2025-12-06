/**
 * Deployment Script for TestToken
 * 
 * This script deploys the TestToken contract to the configured network.
 * 
 * Usage:
 * - For testnet: npx hardhat run scripts/deploy.js --network testnet
 * - For mainnet: npx hardhat run scripts/deploy.js --network mainnet
 * - For local network: npx hardhat run scripts/deploy.js
 */

async function main() {
    try {
        // Get the deployer account
        const [deployer] = await ethers.getSigners();
        console.log("Deploying contracts with the account:", deployer.address);

        // Get the account balance
        const balance = await deployer.getBalance();
        console.log("Account balance:", ethers.utils.formatEther(balance), "ETH");

        // Get the TestToken contract factory
        const TestToken = await ethers.getContractFactory("TestToken");
        console.log("Deploying TestToken...");

        // Deploy the contract
        const token = await TestToken.deploy();
        await token.deployed();

        console.log("\n=== Deployment Successful ===");
        console.log("TestToken contract deployed to:", token.address);
        console.log("Transaction hash:", token.deployTransaction.hash);

        // Get some basic info about the deployed token
        const name = await token.name();
        const symbol = await token.symbol();
        const totalSupply = await token.totalSupply();

        console.log("\nToken Details:");
        console.log("Name:", name);
        console.log("Symbol:", symbol);
        console.log("Total Supply:", ethers.utils.formatUnits(totalSupply, 18), symbol);
        console.log("Owner Balance:", ethers.utils.formatUnits(await token.balanceOf(deployer.address), 18), symbol);

    } catch (error) {
        console.error("Error during deployment:", error);
        process.exit(1);
    }
}

// Execute main function
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
  