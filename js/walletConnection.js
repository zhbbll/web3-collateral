// 加载钱包
async function connectWallet() {
    const provider = await detectEthereumProvider();
    if (provider){
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        const account = accounts[0];
        document.getElementById("address").textContent = account;
        userAddress = account;
        console.log(account);
    }else{
        alert("未检测到钱包")
    }
}
async function disconnection(){
    
}
window.onload = () =>{
    connectWallet();
}