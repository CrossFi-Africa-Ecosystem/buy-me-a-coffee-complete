export const CONTRACT_ADDRESS = "0x7CF98BB68ff409CF3dD0b1eDC5B72F34B3e6651c";
export const CONTRACT_ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "from",
				type: "address",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "timestamp",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "name",
				type: "string",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "amount",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "message",
				type: "string",
			},
		],
		name: "NewMemo",
		type: "event",
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_name",
				type: "string",
			},
			{
				internalType: "string",
				name: "_message",
				type: "string",
			},
		],
		name: "buyCoffee",
		outputs: [],
		stateMutability: "payable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "address",
				name: "newOwner",
				type: "address",
			},
		],
		name: "changeOwner",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getMemos",
		outputs: [
			{
				components: [
					{
						internalType: "address",
						name: "from",
						type: "address",
					},
					{
						internalType: "uint256",
						name: "timestamp",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "name",
						type: "string",
					},
					{
						internalType: "uint256",
						name: "amount",
						type: "uint256",
					},
					{
						internalType: "string",
						name: "message",
						type: "string",
					},
				],
				internalType: "struct BuyMeACoffee.Memo[]",
				name: "",
				type: "tuple[]",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "owner",
		outputs: [
			{
				internalType: "address payable",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
	},
	{
		inputs: [],
		name: "withdrawTips",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
];
