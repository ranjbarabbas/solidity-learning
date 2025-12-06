// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title HelloWorld
 * @dev A simple contract demonstrating basic state variables and public access
 * This is the most basic example - a contract that stores and displays a string
 */
contract HelloWorld {
    /// @dev Stores the greeting message
    string public greet = "Hello World!";

    /**
     * @dev Update the greeting message
     * @param newGreeting The new greeting message
     */
    function setGreeting(string memory newGreeting) public {
        greet = newGreeting;
    }

    /**
     * @dev Get the current greeting message
     * @return The current greeting
     */
    function getGreeting() public view returns (string memory) {
        return greet;
    }
}
