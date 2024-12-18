// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

import "./RMBToken.sol";
import "./GOLDToken.sol";

// 使用名为 gold 的 token 作为质押物，借出 rmb
contract TokenLending {
    IRMB public rmb;
    address public rmbAddress;
    uint256 public rmbAmount; // 合约持有的 RMB 数量
    uint256 public goldAmount; // 合约持有的 GOLD 数量
    address public admin; // 合约管理员

    uint256 public COLLATERAL_RATE = 75; // 抵押率
    uint8 public MAXLOANNUM = 3; // 最大借款数目限制

    // 借贷抵押信息
    struct Collateral {
        address loanTokenAddress; // 借款代币地址（rmb）
        uint256 loanAmount; // 借款数量
        address collateralTokenAddress; // 抵押代币地址（gold）
        uint256 collateralAmount; // 抵押数量
        uint256 collateralRate; // 抵押率
        string loanTime; // 借款时间
        bool isFinish; // 是否完成还款
        string repayTime; // 还款时间
    }

    // 用户地址到其抵押记录的映射
    mapping(address => Collateral[]) public collateralStatus;

    // 事件定义
    event CollateralDeposited(address indexed user, uint256 loanAmount, uint256 collateralAmount, string loanTime);
    event CollateralWithdrawn(address indexed user, uint256 loanAmount, uint256 collateralAmount, string repayTime);

    constructor(address _rmb) {
        rmbAddress = _rmb;
        rmb = IRMB(_rmb);
        admin = msg.sender;

        // 初始化合约持有的 RMB 数量
        uint256 initialSupply = 1000000 * (10**18); // 假设 18 位小数
        rmb.mint(address(this), initialSupply);
        rmbAmount += initialSupply;
    }

    /**
     * @dev 存入抵押品并借款
     */
    function depositCollateral(
        string memory _loanTime,
        address _collateralToken,
        uint256 tokenAmount
    ) public {
        require(collateralStatus[msg.sender].length < MAXLOANNUM, "Borrowing limit reached");
        require(tokenAmount > 0, "Collateral amount must be greater than 0");

        // 计算借款金额
        uint256 loanAmount = (tokenAmount * COLLATERAL_RATE) / 100;
        require(rmbAmount >= loanAmount, "Not enough RMB in contract");

        // 创建抵押记录
        Collateral memory sheet = Collateral({
            loanTokenAddress: rmbAddress,
            loanAmount: loanAmount,
            collateralTokenAddress: _collateralToken,
            collateralAmount: tokenAmount,
            collateralRate: COLLATERAL_RATE,
            loanTime: _loanTime,
            isFinish: false,
            repayTime: ""
        });

        // 更新用户的抵押状态
        collateralStatus[msg.sender].push(sheet);

        // 接收用户的抵押品（GOLD token）
        IGOLD gold = IGOLD(_collateralToken);
        uint256 gold_balance = gold.balanceOf(msg.sender);
        require(gold_balance > tokenAmount, "you not have enough token to deposit");
        require(gold.transferFrom(msg.sender, address(this), tokenAmount), "Collateral transfer failed");
        goldAmount += tokenAmount;

        // 向用户转移借款（RMB token）
        rmb.transfer(msg.sender, loanAmount);
        rmbAmount -= loanAmount;

        // 触发事件
        emit CollateralDeposited(msg.sender, loanAmount, tokenAmount, _loanTime);
    }

    /**
     * @dev 归还借款并提取抵押品
     */
    function withdrawCollateral(string memory _repayTime, uint8[] memory _index) public {
        require(_index.length > 0, "No loans selected");
        require(_index.length <= MAXLOANNUM, "Too many loans selected");

        for (uint8 i = 0; i < _index.length; i++) {
            uint8 loanIndex = _index[i];
            require(loanIndex < collateralStatus[msg.sender].length, "Invalid loan index");

            Collateral storage sheet = collateralStatus[msg.sender][loanIndex];
            require(!sheet.isFinish, "Loan already repaid");

            // 用户需归还借款（RMB token）
            require(rmb.transferFrom(msg.sender, address(this), sheet.loanAmount), "Loan repayment failed");
            rmbAmount += sheet.loanAmount;

            // 归还用户的抵押品（GOLD token）
            IGOLD gold = IGOLD(sheet.collateralTokenAddress);
            require(gold.transfer(msg.sender, sheet.collateralAmount), "Collateral transfer failed");
            goldAmount -= sheet.collateralAmount;

            // 更新抵押状态
            sheet.repayTime = _repayTime;
            sheet.isFinish = true;

            // 触发事件
            emit CollateralWithdrawn(msg.sender, sheet.loanAmount, sheet.collateralAmount, _repayTime);
        }
    }

    /**
     * @dev 获取用户的借贷详情
     */
    function getLoanDetails(address user) public view returns (Collateral[] memory) {
        require(collateralStatus[user].length > 0, "No loans found for user");
        return collateralStatus[user];
    }

}
