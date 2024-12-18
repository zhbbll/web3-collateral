
// Deposit Collateral
async function depositCollateral() {
    now_time = get_time();
    const amount = document.getElementById("depositAmount").value;
    if (!amount) {
        alert("Please enter collateral amount!");
        return;
    }

    try {
        const tx = await tokenLendingInstance.methods
            .depositCollateral(now_time, goldTokenAddress, amount)
            .send({ from: userAddress });
        console.log("Deposit Successful:", tx);
        alert("Collateral deposited successfully!");
    } catch (error) {
        console.error("Deposit Failed:", error);
        alert("Error depositing collateral.");
    }
}

// Get Loan Details
async function getLoanDetails() {
    try {
        const loanDetails = await tokenLendingInstance.methods.getLoanDetails(userAddress).call();
        console.log("Loan Details: ", loanDetails);
        document.getElementById("loanDetails").textContent = JSON.stringify(loanDetails, null, 2);
    } catch (error) {
        errorMessage = error.message;
        show_error = get_error_message(errorMessage);
        console.error("Error fetching loan details:", error);
        console.log("message: ", show_error);
        
        alert("Error fetching loan details.");
    }
}

// Withdraw Collateral
async function withdrawCollateral() {
    const indexes = [0];

    try {
        const tx = await tokenLendingInstance.methods
            .withdrawCollateral(get_time(), indexes)
            .send({ from: userAddress });
        console.log("Withdraw Successful:", tx);
        alert("Collateral withdrawn successfully!");
    } catch (error) {
        console.error("Withdraw Failed:", error);
        alert("Error withdrawing collateral.");
    }
}