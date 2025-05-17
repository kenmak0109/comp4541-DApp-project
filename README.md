# Decentralized Mini-Lottery DApp

**COMP4541: Blockchain, Cryptocurrencies, and Smart Contracts - Individual Project**

**Student Name:** MAK Wai Kin
**Student ID:** 20889050

---

## Project Overview

This project is a Decentralized Mini-Lottery Application (DApp) built on the Ethereum blockchain. It allows users to participate in a lottery by purchasing tickets with Ether. The contract owner manages the lottery (opening/closing, setting ticket price) and triggers the winner selection. The prize pool, accumulated from ticket sales, is automatically transferred to a randomly selected winner.

This DApp demonstrates core concepts of smart contract development using Solidity, front-end integration with Web3 technologies (HTML, CSS, JavaScript, ethers.js), and considerations for testing and security.

## Technical Details

*   **Blockchain Platform:** Ethereum
*   **Testnet Used:** Sepolia Testnet
*   **Smart Contract Language:** Solidity `^0.8.20`
*   **Key Libraries:**
    *   OpenZeppelin Contracts (for `Ownable`)
    *   ethers.js (v6.7.0) for front-end to blockchain interaction
*   **Development Environment:** Remix IDE (for contract development and initial testing), VS Code (for front-end).

## Deployed Artifacts

*   **Smart Contract Address (Sepolia):** 0x463ea0E962Eb65b3F6D9e32A19d4bD99c87c7995
*   **Live Front-End Demonstration:** `https://[YourGitHubUsername].github.io/[YourGitHubRepoName]/`
    *   *(You will get this URL after deploying to GitHub Pages in the next step)*

## Features

*   **User Participation:** Connect MetaMask wallet and enter the lottery by paying the ticket price.
*   **Owner Administration:**
    *   Open/Close the lottery.
    *   Set the ticket price (when the lottery is closed).
    *   Pick a winner.
*   **Automated Prize Distribution:** The entire prize pool is transferred to the winner.
*   **Transparent Lottery Information:** View current lottery ID, ticket price, status, number of participants, prize pool, and last winner.

## How to Use the DApp (Live Demo)

1.  **Prerequisites:**
    *   Install the [MetaMask browser extension](https://metamask.io/).
    *   In MetaMask, switch to the **Sepolia Testnet**.
    *   Obtain some Sepolia ETH from a faucet (e.g., [https://sepoliafaucet.com/](https://sepoliafaucet.com/), [https://www.infura.io/faucet/sepolia](https://www.infura.io/faucet/sepolia)). You'll need this for gas fees and the ticket price.

2.  **Access the DApp:**
    *   Navigate to the **Live Front-End Demonstration** link provided above.

3.  **Interact with the DApp:**
    *   Click the "Connect Wallet" button to connect your MetaMask wallet.
    *   The DApp will display the current lottery information.
    *   **If you are a participant:** If the lottery status is "Open," you can click "Enter Lottery." MetaMask will ask you to confirm the transaction and send the required ticket price in ETH.
    *   **If you are the contract owner (i.e., you deployed this instance of the contract):** An "Owner Actions" section will be visible. You can:
        *   Use "Set Status" to open or close the lottery.
        *   Use "Set New Price" to change the ticket price (only when the lottery is closed).
        *   Click "Pick Winner" when there are participants and you wish to conclude the round.
    *   Observe UI updates and MetaMask notifications for transaction progress and confirmations.

## Project Structure (in the .zip submission)
├── MiniLottery.sol # Solidity Smart Contract
├── index.html # Front-end HTML file
├── script.js # Front-end JavaScript logic
├── style.css # Front-end CSS styling
├── README.md # This README file
└── 20889050_COMP4541_Report.pdf # PDF Project Report