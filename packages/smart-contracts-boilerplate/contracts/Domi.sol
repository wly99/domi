pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import './Ownable.sol';

abstract contract PrincipalInterface {
  function distributeSavingsRate(uint256 amount) external virtual;
}

abstract contract Homes {
  function minted(bytes32 homeId) public virtual returns (bool);
}

contract DomiToken is ERC20, Ownable {
  Homes private homes;
  address private _owner;
  address[] private _domiHolders;
  mapping(address => bool) private _addressInitialized;
  address private _recipient;
  uint256 public savingsRate;
  uint256 public lastDistributed;
  uint256 public numOfHolders;

  PrincipalInterface public principalContract;

  function setPrincipalContractAddress(address _address) external onlyOwner {
    principalContract = PrincipalInterface(_address);
  }

  constructor() public ERC20('DomiToken', 'Domi') {
    _mint(msg.sender, 100 * (10**uint256(decimals())));
    _owner = msg.sender;
    lastDistributed = block.timestamp;
    numOfHolders = 0;
  }

  function transferTokens(
    address sender,
    address recipient,
    uint256 amount
  ) public {
    if (_addressInitialized[recipient] == false) {
      _addressInitialized[recipient] = true;
      // TODO is it possible the same address is pushed more than once to _domiHolders?
      // crucial as distribute fn relies on it or the same address can be paid more than once
      _domiHolders.push(recipient);
    }
    if (recipient == address(principalContract)) {
      principalContract.distributeSavingsRate(amount);
    }
    _transfer(sender, recipient, amount);
  }

  function getTokenOwner() public view returns (address) {
    return _owner;
  }

  function isSufficient() external view returns (bool) {
    uint256 totalSavingsRateOwed = totalSupply() * savingsRate;
    if (totalSavingsRateOwed <= balanceOf(address(this))) {
      return true;
    } else {
      return false;
    }
  }

  function distribute() external onlyOwner {
    require(block.timestamp - 28 days >= lastDistributed, 'Wait at least 28 days');
    // TODO take a snapshot of the current state and use this data to do the following
    // or might pay the same entity twice? eg Person A owns first and last address in the
    // array, when distribute fn is called, A can transfer his tokens from first to last
    // address after the fn pays his first address but before reading the balance of his
    // last address. Then when fn reads the balance of his last address, he will get paid
    // again despite only having the same amount of tokens
    uint256 totalSavingsRateOwed = totalSupply() * savingsRate;
    require(totalSavingsRateOwed <= balanceOf(address(this)), 'Insufficient to pay savings rate');
    uint256 numDomiHolders = _domiHolders.length;
    for (uint256 i = 0; i < numDomiHolders; i++) {
      // if recipient is principal contract, let it update its balances first before transferring
      if (_domiHolders[i] == address(principalContract)) {
        principalContract.distributeSavingsRate(
          (balanceOf(_domiHolders[i]) * totalSavingsRateOwed) / totalSupply()
        );
      }
      transferTokens(
        address(this),
        _domiHolders[i],
        (balanceOf(_domiHolders[i]) * totalSavingsRateOwed) / totalSupply()
      );
    }
  }

  function mintWithHome(
    address currentOwnerAddress,
    bytes32 homeId,
    uint256 price
  ) public onlyOwner returns (bool) {
    // Mint domi and transfer to owner after home deposit
    if (homes.minted(homeId)) {
      // TODO: implement mint
      // domi.mint(currentOwnerAddress, price);
      return true;
    }
  }
}
