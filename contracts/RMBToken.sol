
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC20 标准接口
interface IRMB {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function mint(address account, uint256 amount) external ;
}

contract RMBToken is IRMB {
    string public name = "RMBToken";  // 代币名称
    string public symbol = "RMB";      // 代币符号
    uint8 public decimals = 18;        // 代币小数位数

    uint256 private _totalSupply;      // 代币总供应量
    mapping(address => uint256) private _balances;  // 存储账户余额
    mapping(address => mapping(address => uint256)) private _allowances; // 授权的额度

    // 事件
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    // 构造函数
    constructor() {
        _totalSupply = 0;  // 初始化时没有任何代币供应
    }

    // 查询代币总供应量
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }

    // 查询账户余额
    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }

    // 转账
    function transfer(address recipient, uint256 amount) external override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    // 从指定账户转账
    function transferFrom(address sender, address recipient, uint256 amount) external override returns (bool) {
        // uint256 currentAllowance = _allowances[sender][msg.sender];
        // require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        // _allowances[sender][msg.sender] = currentAllowance - amount;
        _transfer(sender, recipient, amount);
        return true;
    }

    // 授权
    function approve(address spender, uint256 amount) external override returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    // 查询授权额度
    function allowance(address owner, address spender) external view override returns (uint256) {
        return _allowances[owner][spender];
    }

    // 内部转账函数
    function _transfer(address sender, address recipient, uint256 amount) internal {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
        require(_balances[sender] >= amount, "ERC20: transfer amount exceeds balance");

        _balances[sender] -= amount;
        _balances[recipient] += amount;
        emit Transfer(sender, recipient, amount);
    }

    // 内部授权函数
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    // mint函数：用于铸造新代币
    function mint(address account, uint256 amount) external {
        require(account != address(0), "ERC20: mint to the zero address");
        _totalSupply += amount;
        _balances[account] += amount;
        emit Transfer(address(0), account, amount);
    }
}
