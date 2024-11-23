//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract BuyMeACoffee {
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        uint256 amount,
        string message
    );

    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        uint256 amount;
        string message;
    }

    address payable public owner;

    Memo[] memos;

    modifier ownerOnly() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev fetches all stored memos
     */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    /**
     * @dev buy a coffee for owner (sends an XFI tip and leaves a memo)
     * @param _name name of the coffee purchaser
     * @param _message a nice message from the purchaser
     */
    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable {
        require(msg.value > 0, "cannot buy coffee for free!");

        memos.push(
            Memo(msg.sender, block.timestamp, _name, msg.value, _message)
        );

        emit NewMemo(msg.sender, block.timestamp, _name, msg.value, _message);
    }

    /**
     * @dev send the entire balance stored in this contract to the owner
     */
    function withdrawTips() public {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Transfer failed");
    }

    function changeOwner(address newOwner) public ownerOnly {
        owner = payable(newOwner);
    }
}