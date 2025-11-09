import { sepolia } from 'wagmi/chains'

// --- 1. CHAIN CONFIG ---
export const TARGET_CHAIN = sepolia
export const CHAIN_ID = sepolia.id

// --- 2. ADDRESSES ---

// Constant Sepolia addresses (from your backend/contracts/src/Constants.sol)
export const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7a08' as const

// Your Deployed Contract Addresses
export const YIELD_HERO_VAULT_ADDRESS = '0x022ffe571dd0d4886a0661eb5d98465f477f7422' as const
export const YIELD_HERO_POLICY_ADDRESS = '0xaf7fc01d233f0ae83b072a168cacc6941441bd51' as const
export const AAVE_STRATEGY_ADDRESS = '0xb5746a9441cba4e0011c1f191dc68af8549b5250' as const
export const SPARK_STRATEGY_ADDRESS = '0x3f7cb167b7bbe639053c16286dd2c2b0f86f4d81' as const

// Your Project Role Addresses
export const VAULT_OWNER_ADDRESS = '0x7cfbfa604809777c7a4367a879c7db5ffd2d149f' as const
export const PUBLIC_GOODS_TREASURY = '0xe89bec8664d07bc2629c73499d19d96172087871' as const


// --- 3. ABIs ---

/**
 * @dev Minimal ERC20 ABI. Your frontend only needs these 3 functions.
 */
export const erc20ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

/**
 * @dev The full, *corrected* ABI for your YieldHeroVault.sol contract.
 */
export const yieldHeroVaultABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_yieldHeroPolicy",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_initialOwner",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC20InsufficientAllowance"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" },
      { "internalType": "uint256", "name": "balance", "type": "uint256" },
      { "internalType": "uint256", "name": "needed", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC20InsufficientBalance"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "approver", "type": "address" }
    ],
    "type": "error",
    "name": "ERC20InvalidApprover"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "type": "error",
    "name": "ERC20InvalidReceiver"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "sender", "type": "address" }
    ],
    "type": "error",
    "name": "ERC20InvalidSender"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "type": "error",
    "name": "ERC20InvalidSpender"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      { "internalType": "uint256", "name": "assets", "type": "uint256" },
      { "internalType": "uint256", "name": "max", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC4626ExceededMaxDeposit"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      { "internalType": "uint256", "name": "shares", "type": "uint256" },
      { "internalType": "uint256", "name": "max", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC4626ExceededMaxMint"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "shares", "type": "uint256" },
      { "internalType": "uint256", "name": "max", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC4626ExceededMaxRedeem"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "uint256", "name": "assets", "type": "uint256" },
      { "internalType": "uint256", "name": "max", "type": "uint256" }
    ],
    "type": "error",
    "name": "ERC4626ExceededMaxWithdraw"
  },
  { "inputs": [], "type": "error", "name": "NotAStrategy" },
  { "inputs": [], "type": "error", "name": "NotOwnerOrManager" },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "type": "error",
    "name": "OwnableInvalidOwner"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "type": "error",
    "name": "OwnableUnauthorizedAccount"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "token", "type": "address" }
    ],
    "type": "error",
    "name": "SafeERC20FailedOperation"
  },
  { "inputs": [], "type": "error", "name": "TransferFailed" },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "type": "event",
    "name": "Approval",
    "anonymous": false
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "assets",
        "type": "uint256",
        "indexed": false
      },
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256",
        "indexed": false
      }
    ],
    "type": "event",
    "name": "Deposit",
    "anonymous": false
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "previousOwner",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address",
        "indexed": true
      }
    ],
    "type": "event",
    "name": "OwnershipTransferred",
    "anonymous": false
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "type": "event",
    "name": "Transfer",
    "anonymous": false
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "address",
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "internalType": "uint256",
        "name": "assets",
        "type": "uint256",
        "indexed": false
      },
      {
        "internalType": "uint256",
        "name": "shares",
        "type": "uint256",
        "indexed": false
      }
    ],
    "type": "event",
    "name": "Withdraw",
    "anonymous": false
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_strategy",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "addStrategy"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "allowance",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "asset",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "account", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "balanceOf",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "shares", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "convertToAssets",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "assets", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "convertToShares",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "decimals",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "assets", "type": "uint256" },
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deposit",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "harvest"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "isStrategy",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "maxDeposit",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "maxMint",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "maxRedeem",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "maxWithdraw",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "shares", "type": "uint256" },
      { "internalType": "address", "name": "receiver", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "mint",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "name",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "owner",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "assets", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "previewDeposit",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "shares", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "previewMint",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "shares", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "previewRedeem",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "assets", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "previewWithdraw",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "fromStrategy",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "toStrategy",
        "type": "address"
      },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "rebalance"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "shares", "type": "uint256" },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "redeem",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "renounceOwnership"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function",
    "name": "strategies",
    "outputs": [
      { "internalType": "address", "name": "", "type": "address" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "token", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "sweep"
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "symbol",
    "outputs": [
      { "internalType": "string", "name": "", "type": "string" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "totalAssets",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "totalSupply",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transfer",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "from", "type": "address" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "value", "type": "uint256" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transferFrom",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }]
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transferOwnership"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "assets", "type": "uint256" },
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ]
  },
  {
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "name": "yieldHeroPolicy",
    "outputs": [
      {
        "internalType": "contract YieldHeroPolicy",
        "name": "",
        "type": "address"
      }
    ]
  }
] as const