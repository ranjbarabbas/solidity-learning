// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./IERC20.sol";

/**
 * @title ERC20
 * @dev Implementation of the ERC20 token standard
 * This is an educational example of ERC20 - for production use OpenZeppelin's implementation
 * 
 * Security Notes:
 * - This implementation lacks some safety checks that the OpenZeppelin version includes
 * - Use this for learning purposes only, not for production
 * - Consider using @openzeppelin/contracts for production contracts
 */
contract ERC20 is IERC20 {
    /// @dev Total supply of tokens
    uint public totalSupply;
    
    /// @dev Mapping from address to token balance
    mapping(address => uint) public balanceOf;
    
    /// @dev Mapping from owner to spender allowance
    mapping(address => mapping(address => uint)) public allowance;
    
    /// @dev Token name
    string public name = "Solidity by Example";
    
    /// @dev Token symbol
    string public symbol = "SOLBYEX";
    
    /// @dev Number of decimal places
    uint8 public decimals = 18;

    /**
     * @dev Transfer tokens from sender to recipient
     * @param recipient The address to receive tokens
     * @param amount The number of tokens to transfer
     * @return bool indicating success
     */
    function transfer(address recipient, uint amount) external returns (bool) {
        require(recipient != address(0), "ERC20: cannot transfer to zero address");
        require(balanceOf[msg.sender] >= amount, "ERC20: insufficient balance");
        
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev Approve spender to use tokens on behalf of the owner
     * @param spender The address to be approved
     * @param amount The amount of tokens to approve
     * @return bool indicating success
     */
    function approve(address spender, uint amount) external returns (bool) {
        require(spender != address(0), "ERC20: cannot approve zero address");
        
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    /**
     * @dev Transfer tokens from one address to another (using allowance)
     * @param sender The address to send tokens from
     * @param recipient The address to receive tokens
     * @param amount The amount of tokens to transfer
     * @return bool indicating success
     */
    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        require(recipient != address(0), "ERC20: cannot transfer to zero address");
        require(balanceOf[sender] >= amount, "ERC20: insufficient balance");
        require(allowance[sender][msg.sender] >= amount, "ERC20: insufficient allowance");
        
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    /**
     * @dev Create new tokens and assign to caller's balance
     * @param amount The number of tokens to mint
     */
    function mint(uint amount) external {
        require(amount > 0, "ERC20: mint amount must be greater than 0");
        
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    /**
     * @dev Burn (destroy) tokens from caller's balance
     * @param amount The number of tokens to burn
     */
    function burn(uint amount) external {
        require(amount > 0, "ERC20: burn amount must be greater than 0");
        require(balanceOf[msg.sender] >= amount, "ERC20: insufficient balance to burn");
        
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}