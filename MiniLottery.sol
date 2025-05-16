// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.1.0/contracts/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/drafts/RandomLib/randomness.sol";

// If you are using Remix, it can usually fetch OpenZeppelin contracts automatically.
// If you were in a local environment like Hardhat, you'd do `npm install @openzeppelin/contracts`
// import "@openzeppelin/contracts/access/Ownable.sol";
// import { Ownable } from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {Ownable} from "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract MiniLottery is Ownable {

    uint256 public ticketPrice;
    address[] public participants;
    bool public lotteryOpen;
    address public lastWinner;
    uint256 public lotteryId;

    event LotteryEntered(uint256 indexed lotteryId, address indexed participant, uint256 ticketPrice);
    event WinnerPicked(uint256 indexed lotteryId, address indexed winner, uint256 prizeAmount);
    event LotteryStateChanged(uint256 indexed lotteryId, bool isOpen);
    // event AdminFeeWithdrawn(address indexed owner, uint256 amount); // If fee implemented

    constructor(uint256 _initialTicketPrice) Ownable(msg.sender) {
        require(_initialTicketPrice > 0, "Ticket price must be greater than zero");
        ticketPrice = _initialTicketPrice;
        lotteryOpen = false; // Start as closed, owner needs to open it
        lotteryId = 1; // First lottery
    }

    // --- We will add functions below this line ---
        // --- Add this function INSIDE the MiniLottery contract, below the constructor ---

    /**
     * @notice Allows a user to enter the lottery.
     * @dev User must send ETH equal to the current ticketPrice.
     */
    function enterLottery() external payable {
        require(lotteryOpen, "Lottery is not currently open.");
        require(msg.value == ticketPrice, "Must send exact ticket price to enter.");
        // Optional: Check if the participant is already in THIS round of lottery to prevent multiple entries
        // For simplicity in a 12-hour project, we might allow multiple entries from the same address,
        // as each entry is a separate chance. If you want to prevent it, you'd need a mapping.

        participants.push(msg.sender);
        emit LotteryEntered(lotteryId, msg.sender, msg.value);
    }

        // --- Add these functions INSIDE the MiniLottery contract ---

    /**
     * @notice Toggles the lottery state (open/closed).
     * @dev Only callable by the contract owner.
     * @param _isOpen The desired new state of the lottery.
     */
    function setLotteryStatus(bool _isOpen) external onlyOwner {
        lotteryOpen = _isOpen;
        emit LotteryStateChanged(lotteryId, _isOpen);
    }

    /**
     * @notice Allows the owner to set a new ticket price.
     * @dev Only callable by the contract owner. Can only be done when lottery is closed.
     * @param _newTicketPrice The new price for a lottery ticket (in wei).
     */
    function setTicketPrice(uint256 _newTicketPrice) external onlyOwner {
        require(!lotteryOpen, "Cannot change price while lottery is open.");
        require(_newTicketPrice > 0, "Ticket price must be greater than zero.");
        ticketPrice = _newTicketPrice;
        // Optionally, emit an event here if needed for front-end
    }

        // --- Add this function INSIDE the MiniLottery contract ---

    /**
     * @notice Picks a winner from the participants.
     * @dev Only callable by the contract owner.
     *      Sends the entire contract balance to the winner.
     *      Resets participants and closes the lottery for the current round.
     *      Increments lotteryId for the next round.
     */
    function pickWinner() external onlyOwner {
        require(participants.length > 0, "No participants to pick a winner from.");
        
        // randomness.randomSeed();
        uint256 randomIndex = uint256(keccak256(abi.encodePacked(block.timestamp, block.prevrandao, participants.length))) % participants.length;
        address winner = participants[randomIndex];

        uint256 prizeAmount = address(this).balance;
        require(prizeAmount > 0, "No prize to send.");

        // --- State updates BEFORE transfer (Checks-Effects-Interactions) ---
        lastWinner = winner;
        // Store the lotteryId for the event before incrementing
        uint256 currentLotteryIdForEvent = lotteryId; 
        
        // Clear participants for the current round
        delete participants; 
        lotteryOpen = false; // Close the lottery after picking a winner
        lotteryId++;         // Increment lotteryId for the next round

        // Emit events AFTER state changes but BEFORE external call if possible,
        // though for .transfer() re-entrancy is not an issue.
        emit WinnerPicked(currentLotteryIdForEvent, winner, prizeAmount);
        emit LotteryStateChanged(currentLotteryIdForEvent, false); 

        // --- Send the ETH ---
        // .transfer() will revert on failure. No boolean is returned.
        payable(winner).transfer(prizeAmount);
        // No need for `require(sent, ...)` because .transfer() handles the revert.
    }

        // --- Add these functions INSIDE the MiniLottery contract ---

    /**
     * @notice Gets the list of current participants.
     * @return An array of participant addresses.
     */
    function getParticipants() external view returns (address[] memory) {
        return participants;
    }

    /**
     * @notice Gets the current prize pool (total ETH in the contract).
     * @return The current prize pool amount in wei.
     */
    function getCurrentPrizePool() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @notice Gets the number of participants in the current lottery.
     * @return The count of participants.
     */
    function getParticipantsCount() external view returns (uint256) {
        return participants.length;
    }
}