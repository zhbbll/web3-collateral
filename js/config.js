
// 1. 初始化 Web3.js
let web3js;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    web3js = new Web3(window.web3.currentProvider);
    console.log("init web3 successful");
}else{
    console("error");
}
console.log("web3js ", web3js)
let userAddress;
const tokenLendingAddress = "0xA05c4125D50AE54C9A2d92e60530D935343Ef986"; // 替换为你的合约地址
const goldTokenAddress = "0xB062fEC8105D4d0Fcb2608949b5e327aeC449B5D"; // 替换为 GOLD Token 合约地址
// 合约实例
let tokenLendingInstance = new web3js.eth.Contract(tokenLendingABI, tokenLendingAddress);
console.log("instance", tokenLendingInstance);