// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Counter
 * @dev A simple counter contract demonstrating basic state changes and arithmetic operations
 * This contract teaches the fundamentals of reading/writing state and function logic
 */
contract Counter {
    /// @dev Stores the counter value
    uint public count;

    /**
     * @dev Get the current count value
     * @return The current count
     */
    function get() public view returns (uint) {
        return count;
    }

    /**
     * @dev Increment the count by 1
     * Increases the counter by one unit
     */
    function inc() public {
        count += 1;
    }

    /**
     * @dev Decrement the count by 1
     * Reverts if count is zero to prevent underflow
     */
    function dec() public {
        require(count > 0, "Counter: cannot decrement below zero");
        count -= 1;
    }

    /**
     * @dev Reset the counter to zero
     */
    function reset() public {
        count = 0;
    }

    /**
     * @dev Set the counter to a specific value
     * @param _count The new count value
     */
    function setCount(uint _count) public {
        count = _count;
    }
}
