// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TestToken
 * @dev A simple ERC20 token implementation for testing purposes
 * Uses OpenZeppelin's battle-tested ERC20 implementation
 */
contract TestToken is ERC20 {
    /**
     * @dev Initialize the token with initial supply minted to the deployer
     * Initial supply: 1,000 tokens (with 18 decimals)
     */
    constructor() ERC20("TestToken", "TST") {
        _mint(msg.sender, 1000 * 10 ** decimals());
    }
}