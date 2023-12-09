// import { createWalletClient, http, getContract } from "viem";
// import { privateKeyToAccount } from "viem/accounts";
// import { baseGoerli } from "viem/chains";
// import { ABI } from "./abi";

// export const registerEvent = async ({ eventId, telegramId }) => {
//     console.log("THIS IS NEW, calling contract!", PRIVATE_KEY);
//     const account = privateKeyToAccount(PRIVATE_KEY);
//     const client = createWalletClient({
//         account,
//         chain: baseGoerli,
//         transport: http(),
//     });
//     const contract = getContract({
//         address: "0xf782D6F97f36D5ce311982841cFb3299C4bce98F", // 0x5Af520A9b24794fD9Dc1AB21BbdE58eC719CdA90
//         abi: ABI,
//         walletClient: client,
//     });
//     const result = await contract.write.register([eventId, telegramId]);
//     console.log(result);
// };



// export const getListOfevents = async ({ telegramId }) => {
//     const account = privateKeyToAccount(PRIVATE_KEY);
//     const client = createWalletClient({
//         account,
//         chain: baseGoerli,
//         transport: http(),
//     });
//     const contract = getContract({
//         address: "0xf782D6F97f36D5ce311982841cFb3299C4bce98F", // 0x5Af520A9b24794fD9Dc1AB21BbdE58eC719CdA90
//         abi: ABI,
//         walletClient: client,
//     });
//     const result = await contract.write.getEvent([telegramId]);
//     console.log(result);
// }

const ethers = require('ethers');
require('dotenv').config();

// Replace with your private key
let privateKey = "0x0123456789012345678901234567890123456789012345678901234567890123";

// Create a wallet instance
let wallet = new ethers.Wallet(privateKey);

// Connect the wallet to the Base Goerli testnet
let url = 'https://goerli.base.org';
let provider = new ethers.providers.JsonRpcProvider(url);
let walletWithProvider = new ethers.Wallet(privateKey, provider);

// Replace with your contract address and ABI
let contractAddress = '';
let contractAbi = [];

// Create a new contract instance
let contract = new ethers.Contract(contractAddress, contractAbi, walletWithProvider);

// Call the function
const result = await contract.yourFunction('param1', 'param2');
console.log(result);




