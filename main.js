// 引入 Web3.js
const Web3 = require("web3");
const web3 = new Web3(window.ethereum);

// 合约和代币信息
const tokenLendingAddress = "0xYourTokenLendingContractAddress";
const goldTokenAddress = "0xYourGoldTokenAddress";
const tokenLendingABI = [/* 填入 TokenLending ABI */];

const tokenLendingContract = new web3.eth.Contract(tokenLendingABI, tokenLendingAddress);

let userAddress;

// 加载钱包
async function connectWallet() {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    console.log("Connected Wallet Address: ", userAddress);
}

// 添加按钮事件
document.getElementById("connectWallet").onclick = connectWallet;

document.getElementById("approveGold").onclick = async () => {
    await approveGoldToken(goldTokenAddress, 100);
};

document.getElementById("depositCollateral").onclick = async () => {
    await depositCollateral("2024-12-18", goldTokenAddress, 100);
};

document.getElementById("getLoanDetails").onclick = async () => {
    const details = await getLoanDetails(userAddress);
    console.log(details);
};

document.getElementById("withdrawCollateral").onclick = async () => {
    await withdrawCollateral("2024-12-31", [0]);
};
