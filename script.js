// script.js

// --- Configuration ---
const contractAddress = "0x463ea0E962Eb65b3F6D9e32A19d4bD99c87c7995"; // PASTE YOUR DEPLOYED CONTRACT ADDRESS HERE

// PASTE YOUR CONTRACT ABI HERE
// This is a long JSON array that you get from Remix after compiling your contract.
// Example structure: const contractABI = [ { "inputs": [...], "name": "...", ... }, ... ];
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialTicketPrice",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lotteryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "participant",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "ticketPrice",
				"type": "uint256"
			}
		],
		"name": "LotteryEntered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lotteryId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isOpen",
				"type": "bool"
			}
		],
		"name": "LotteryStateChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "lotteryId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "winner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "prizeAmount",
				"type": "uint256"
			}
		],
		"name": "WinnerPicked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "enterLottery",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCurrentPrizePool",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getParticipants",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getParticipantsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lastWinner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryOpen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_isOpen",
				"type": "bool"
			}
		],
		"name": "setLotteryStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_newTicketPrice",
				"type": "uint256"
			}
		],
		"name": "setTicketPrice",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ticketPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];




// --- Global Variables ---
let provider;
let signer;
let contract;
let userAddress;
let contractOwner;

// --- DOM Elements ---
// Wallet Connection
const connectWalletBtn = document.getElementById('connectWalletBtn');
const connectedAccountSpan = document.getElementById('connectedAccount');
const currentNetworkSpan = document.getElementById('currentNetwork');

// Lottery Info
const lotteryIdSpan = document.getElementById('lotteryId');
const ticketPriceSpan = document.getElementById('ticketPrice');
const lotteryStatusSpan = document.getElementById('lotteryStatus');
const participantsCountSpan = document.getElementById('participantsCount');
const prizePoolSpan = document.getElementById('prizePool');
const lastWinnerSpan = document.getElementById('lastWinner');
const refreshInfoBtn = document.getElementById('refreshInfoBtn');

// User Actions
const enterLotteryBtn = document.getElementById('enterLotteryBtn');
const userMessageSpan = document.getElementById('userMessage');

// Owner Actions
const ownerSectionDiv = document.getElementById('ownerSection');
const newStatusSelect = document.getElementById('newStatus');
const setLotteryStatusBtn = document.getElementById('setLotteryStatusBtn');
const newTicketPriceInput = document.getElementById('newTicketPriceInput');
const setTicketPriceBtn = document.getElementById('setTicketPriceBtn');
const pickWinnerBtn = document.getElementById('pickWinnerBtn');
const ownerMessageSpan = document.getElementById('ownerMessage');

async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            provider = new ethers.BrowserProvider(window.ethereum); // Use ethers.BrowserProvider for v6

            // Request account access
            await provider.send("eth_requestAccounts", []); // Standard way to request accounts

            signer = await provider.getSigner(); // Get the signer object
            userAddress = await signer.getAddress(); // Get the user's address

            connectedAccountSpan.innerText = userAddress;
            connectWalletBtn.innerText = 'Wallet Connected';
            connectWalletBtn.disabled = true; // Disable after connection, or change text
            userMessageSpan.innerText = 'Wallet connected successfully!';
            userMessageSpan.style.color = 'green';

            const network = await provider.getNetwork();
            currentNetworkSpan.innerText = `${network.name} (ID: ${network.chainId.toString()})`;

            if (network.chainId.toString() !== "11155111") { // Sepolia Chain ID is 11155111
                userMessageSpan.innerText = `Please switch to Sepolia Testnet! Current: ${network.name}`;
                userMessageSpan.style.color = 'red';
                // Disable interaction buttons if not on Sepolia
                enterLotteryBtn.disabled = true;
                // Potentially disable owner buttons too if that makes sense for your UI
                // setLotteryStatusBtn.disabled = true; 
                // setTicketPriceBtn.disabled = true;
                // pickWinnerBtn.disabled = true;
                return; // Stop further initialization if wrong network
            }


            // Initialize contract AFTER signer is available
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log("Contract initialized:", contract);

            await updateLotteryInfo();
            await checkOwner(); // Check if the connected user is the owner

        } catch (error) {
            console.error("Error connecting wallet:", error);
            userMessageSpan.innerText = `Error: ${error.message || error.reason || "Could not connect wallet."}`;
            userMessageSpan.style.color = 'red';
            connectedAccountSpan.innerText = 'Connection Failed';
        }
    } else {
        userMessageSpan.innerText = 'MetaMask is not installed. Please install it!';
        userMessageSpan.style.color = 'red';
        connectWalletBtn.innerText = 'Install MetaMask';
        alert('MetaMask is not installed. Please install it to use this DApp.');
    }
}

async function updateLotteryInfo() {
    if (!contract) {
        userMessageSpan.innerText = "Please connect your wallet first.";
        userMessageSpan.style.color = 'orange';
        return;
    }
    try {
        userMessageSpan.innerText = "Fetching lottery info...";
        userMessageSpan.style.color = 'blue';

        const id = await contract.lotteryId();
        const priceWei = await contract.ticketPrice();
        const status = await contract.lotteryOpen();
        const count = await contract.getParticipantsCount(); // Using our getter
        const poolWei = await contract.getCurrentPrizePool(); // Using our getter
        const winner = await contract.lastWinner();

        lotteryIdSpan.innerText = id.toString();
        // Convert Wei to Ether for display (ethers.js v6)
        ticketPriceSpan.innerText = ethers.formatEther(priceWei);
        lotteryStatusSpan.innerText = status ? 'Open' : 'Closed';
        participantsCountSpan.innerText = count.toString();
        prizePoolSpan.innerText = ethers.formatEther(poolWei);
        
        // Check if lastWinner is the zero address (meaning no winner yet or contract just deployed)
        if (winner === "0x0000000000000000000000000000000000000000") {
            lastWinnerSpan.innerText = "N/A (No previous winner)";
        } else {
            lastWinnerSpan.innerText = winner;
        }
        

        // Enable/disable enter button based on lottery status
        if (status && userAddress) { // Lottery is open and wallet connected
            enterLotteryBtn.disabled = false;
        } else {
            enterLotteryBtn.disabled = true;
        }
        userMessageSpan.innerText = "Lottery info updated.";
        userMessageSpan.style.color = 'green';

    } catch (error) {
        console.error("Error updating lottery info:", error);
        userMessageSpan.innerText = `Error fetching info: ${error.message || error.reason || "Unknown error"}`;
        userMessageSpan.style.color = 'red';
    }
}

async function checkOwner() {
    if (!contract || !userAddress) return;
    try {
        contractOwner = await contract.owner(); // 'owner()' function from Ownable.sol
        if (userAddress.toLowerCase() === contractOwner.toLowerCase()) {
            ownerSectionDiv.style.display = 'block'; // Show owner section
            console.log("Connected user is the owner.");
        } else {
            ownerSectionDiv.style.display = 'none'; // Hide owner section
            console.log("Connected user is NOT the owner. Owner is:", contractOwner);
        }
    } catch (error) {
        console.error("Error checking owner:", error);
        ownerMessageSpan.innerText = "Could not verify owner status.";
        ownerMessageSpan.style.color = 'red';
    }
}

async function enterLottery() {
    if (!contract || !signer) {
        userMessageSpan.innerText = "Please connect your wallet first.";
        userMessageSpan.style.color = 'orange';
        return;
    }
    try {
        const currentTicketPriceWei = await contract.ticketPrice();
        
        userMessageSpan.innerText = `Attempting to enter lottery for ${ethers.formatEther(currentTicketPriceWei)} ETH...`;
        userMessageSpan.style.color = 'blue';
        enterLotteryBtn.disabled = true; // Disable button during transaction

        // Call the smart contract's enterLottery function
        // We need to send ETH with this transaction (msg.value)
        const tx = await contract.enterLottery({ value: currentTicketPriceWei });
        
        userMessageSpan.innerText = `Transaction sent! Waiting for confirmation... (TxHash: ${tx.hash.substring(0,10)}...)`;
        await tx.wait(); // Wait for the transaction to be mined

        userMessageSpan.innerText = "Successfully entered the lottery!";
        userMessageSpan.style.color = 'green';
        await updateLotteryInfo(); // Refresh info after successful entry

    } catch (error) {
        console.error("Error entering lottery:", error);
        userMessageSpan.innerText = `Error entering lottery: ${error.data?.message || error.reason || error.message || "Unknown error"}`;
        userMessageSpan.style.color = 'red';
    } finally {
        // Re-enable button only if lottery is still open and wallet connected
        const status = await contract.lotteryOpen();
        if (status && userAddress) {
             enterLotteryBtn.disabled = false;
        } else {
            enterLotteryBtn.disabled = true;
        }
    }
}

async function setLotteryStatus() {
    if (!contract || !signer) {
        ownerMessageSpan.innerText = "Please connect your wallet first as owner.";
        ownerMessageSpan.style.color = 'orange';
        return;
    }
    try {
        const newStatus = newStatusSelect.value === 'true'; // Convert string "true"/"false" to boolean
        
        ownerMessageSpan.innerText = `Setting lottery status to ${newStatus ? 'Open' : 'Closed'}...`;
        ownerMessageSpan.style.color = 'blue';
        setLotteryStatusBtn.disabled = true;

        const tx = await contract.setLotteryStatus(newStatus);
        ownerMessageSpan.innerText = `Transaction sent! Waiting for confirmation... (TxHash: ${tx.hash.substring(0,10)}...)`;
        await tx.wait();

        ownerMessageSpan.innerText = `Lottery status successfully set to ${newStatus ? 'Open' : 'Closed'}!`;
        ownerMessageSpan.style.color = 'green';
        await updateLotteryInfo(); // Refresh lottery info

    } catch (error) {
        console.error("Error setting lottery status:", error);
        ownerMessageSpan.innerText = `Error setting status: ${error.data?.message || error.reason || error.message || "Unknown error"}`;
        ownerMessageSpan.style.color = 'red';
    } finally {
        setLotteryStatusBtn.disabled = false;
    }
}

async function setNewTicketPrice() {
    if (!contract || !signer) {
        ownerMessageSpan.innerText = "Please connect your wallet first as owner.";
        ownerMessageSpan.style.color = 'orange';
        return;
    }
    try {
        const newPriceEth = newTicketPriceInput.value;
        if (!newPriceEth || isNaN(parseFloat(newPriceEth)) || parseFloat(newPriceEth) <= 0) {
            ownerMessageSpan.innerText = "Please enter a valid new ticket price (e.g., 0.01).";
            ownerMessageSpan.style.color = 'red';
            return;
        }
        const newPriceWei = ethers.parseEther(newPriceEth); // Convert ETH string to Wei BigInt

        ownerMessageSpan.innerText = `Setting new ticket price to ${newPriceEth} ETH...`;
        ownerMessageSpan.style.color = 'blue';
        setTicketPriceBtn.disabled = true;

        const tx = await contract.setTicketPrice(newPriceWei);
        ownerMessageSpan.innerText = `Transaction sent! Waiting for confirmation... (TxHash: ${tx.hash.substring(0,10)}...)`;
        await tx.wait();

        ownerMessageSpan.innerText = `Ticket price successfully set to ${newPriceEth} ETH!`;
        ownerMessageSpan.style.color = 'green';
        newTicketPriceInput.value = ''; // Clear input
        await updateLotteryInfo(); // Refresh lottery info

    } catch (error) {
        console.error("Error setting ticket price:", error);
        // More detailed error message from contract revert
        ownerMessageSpan.innerText = `Error setting price: ${error.data?.message || error.reason || error.message || "Unknown error"}`;
        ownerMessageSpan.style.color = 'red';
    } finally {
        setTicketPriceBtn.disabled = false;
    }
}

async function pickWinner() {
    if (!contract || !signer) {
        ownerMessageSpan.innerText = "Please connect your wallet first as owner.";
        ownerMessageSpan.style.color = 'orange';
        return;
    }
    try {
        ownerMessageSpan.innerText = "Attempting to pick a winner...";
        ownerMessageSpan.style.color = 'blue';
        pickWinnerBtn.disabled = true;

        const tx = await contract.pickWinner();
        ownerMessageSpan.innerText = `Transaction sent! Waiting for confirmation... (TxHash: ${tx.hash.substring(0,10)}...)`;
        await tx.wait();

        ownerMessageSpan.innerText = "Winner picked successfully!";
        ownerMessageSpan.style.color = 'green';
        await updateLotteryInfo(); // Refresh lottery info (should show new lastWinner, 0 participants, etc.)

    } catch (error) {
        console.error("Error picking winner:", error);
        ownerMessageSpan.innerText = `Error picking winner: ${error.data?.message || error.reason || error.message || "Unknown error"}`;
        ownerMessageSpan.style.color = 'red';
    } finally {
        pickWinnerBtn.disabled = false;
    }
}





// --- Initialization ---
window.addEventListener('load', async () => {
    // Event Listeners will be added here
    connectWalletBtn.addEventListener('click', connectWallet);
    refreshInfoBtn.addEventListener('click', updateLotteryInfo);
    enterLotteryBtn.addEventListener('click', enterLottery);
    setLotteryStatusBtn.addEventListener('click', setLotteryStatus);
    setTicketPriceBtn.addEventListener('click', setNewTicketPrice);
    pickWinnerBtn.addEventListener('click', pickWinner);


    // Check if MetaMask is installed
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        // Try to connect if already permitted (e.g. page refresh)
        // Or listen for account/network changes
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
        // Initial check for connected accounts
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await connectWallet(); // Attempt to connect if already authorized
            }
        } catch (error) {
            console.error("Error checking for existing accounts:", error);
        }

    } else {
        console.log('MetaMask is not installed. Please install it to use this DApp.');
        connectWalletBtn.innerText = 'Install MetaMask';
        connectWalletBtn.disabled = true;
        alert('MetaMask is not installed. Please install it to use this DApp.');
    }
});

function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
        connectedAccountSpan.innerText = 'Not Connected';
        userAddress = null;
        signer = null;
        contract = null; // Reset contract instance as signer might be gone
        ownerSectionDiv.style.display = 'none'; // Hide owner section
        enterLotteryBtn.disabled = true;
    } else {
        userAddress = accounts[0];
        connectedAccountSpan.innerText = userAddress;
        console.log('Account changed to:', userAddress);
        // Re-initialize provider and signer with new account
        if (window.ethereum) {
            provider = new ethers.BrowserProvider(window.ethereum);
            signer = provider.getSigner(userAddress); // Get signer for the new account
            // Re-initialize contract instance with the new signer
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            updateLotteryInfo(); // Refresh info with new account context
            checkOwner(); // Check if new account is owner
        }
    }
}

async function handleChainChanged(_chainId) {
    console.log('Network changed to:', _chainId);
    // It's good practice to reload the page or re-initialize the app state
    // as contract addresses might be different on different networks.
    // For this simple project, we'll just update the display and re-init provider.
    window.location.reload(); 
    // If not reloading, you would re-initialize provider, signer, contract, and update info
    // await connectWallet(); // Could also try to reconnect
}