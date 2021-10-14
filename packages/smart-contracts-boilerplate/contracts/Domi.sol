pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DomiToken is ERC20 {
    address private owner;
    address private recipient;
    uint stabilityFee;
    
    constructor() public ERC20("DomiToken", "Domi") {
        _mint(msg.sender, 100 * (10 ** uint256(decimals())));
        owner = msg.sender;
    }

    function transferTokens(msg.sender, recipient,  uint amount) external {
        _transfer(msg.sender, recipient,amount);
    }

    function getTokenOwner() public view returns (address){ 
        return owner;
    }

}