const tokenLendingABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_rmb",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loanAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collateralAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "loanTime",
				"type": "string"
			}
		],
		"name": "CollateralDeposited",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "loanAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "collateralAmount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "repayTime",
				"type": "string"
			}
		],
		"name": "CollateralWithdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "COLLATERAL_RATE",
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
		"name": "MAXLOANNUM",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "admin",
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
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "collateralStatus",
		"outputs": [
			{
				"internalType": "address",
				"name": "loanTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "loanAmount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "collateralTokenAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "collateralAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collateralRate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "loanTime",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isFinish",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "repayTime",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_loanTime",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_collateralToken",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenAmount",
				"type": "uint256"
			}
		],
		"name": "depositCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getLoanDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "loanTokenAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "loanAmount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "collateralTokenAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "collateralAmount",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "collateralRate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "loanTime",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isFinish",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "repayTime",
						"type": "string"
					}
				],
				"internalType": "struct TokenLending.Collateral[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "goldAmount",
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
		"name": "rmb",
		"outputs": [
			{
				"internalType": "contract IRMB",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "rmbAddress",
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
		"name": "rmbAmount",
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
				"internalType": "string",
				"name": "_repayTime",
				"type": "string"
			},
			{
				"internalType": "uint8[]",
				"name": "_index",
				"type": "uint8[]"
			}
		],
		"name": "withdrawCollateral",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]