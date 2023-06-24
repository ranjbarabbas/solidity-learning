# Step-by-Step Hardhat Project Running

```shell
Create an empty project npm init --yes
Once your project is ready, run npm install --save-dev hardhat to install Hardhat.
Install hardhat toolbox npm install @nomicfoundation/hardhat-toolbox
Create your Hardhat project run npx hardhat
Select "Create an empty hardhat.config.js"
Install npm install @openzeppelin/contracts
For compile run npx hardhat compile
npx hardhat test
Install npm i dotenv
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat run .\scripts\deploy.js
npx hardhat verify --contract contracts/testToken.sol:testToken --network testnet contract_adr
```
