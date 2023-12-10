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
let contractAbi = require('./abi').ABI;
let contractAddress = '0xf782D6F97f36D5ce311982841cFb3299C4bce98F';
let privateKey = process.env.PRIVATE_KEY;
let url = 'https://goerli.base.org';

exports.registerEvent = async ({ eventId, telegramId }) => {

    // Connect the wallet to the Base Goerli testnet
    let provider = new ethers.providers.JsonRpcProvider(url);
    let walletWithProvider = new ethers.Wallet(privateKey, provider);

    // Replace with your contract address and ABI
    // Create a new contract instance
    let contract = new ethers.Contract(contractAddress, contractAbi, walletWithProvider);

    // Call the function
    try {
        const result = await contract.register(eventId, telegramId);
        console.log(result);
    }
    catch (e) {
        console.log('Already registered!')
        return null;
    }

};

exports.getEvents = async ({ telegramId }) => {

    // Connect the wallet to the Base Goerli testnet
    let provider = new ethers.providers.JsonRpcProvider(url);
    let walletWithProvider = new ethers.Wallet(privateKey, provider);

    // Replace with your contract address and ABI
    // Create a new contract instance
    let contract = new ethers.Contract(contractAddress, contractAbi, walletWithProvider);

    // Call the function

    try {
        const result = await contract.getListOfUsers(telegramId);
        console.log(result);
        return result;
    }
    catch (e) {
        console.log('Already registered!');
        return null;
    }


};

