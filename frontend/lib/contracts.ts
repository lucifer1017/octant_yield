import { sepolia } from 'wagmi/chains'

// --- CHAIN CONFIG ---
export const TARGET_CHAIN = sepolia
export const CHAIN_ID = sepolia.id

// --- CONSTANT ADDRESSES (from contracts/src/Constants.sol) ---
export const USDC_ADDRESS = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7a08' as const
export const PUBLIC_GOODS_TREASURY = '0xaB5801A7D398351B89E6080bA41A9ACaa4C539Fb' as const
export const OCTANT_POLICY_MANAGER = '0x75B1F8c9826c7311F5c5116C97C198585489d52b' as const

// --- DEPLOYED ADDRESSES (Fill these in!) ---
// TODO: Paste your deployed addresses here after running `forge script ... --broadcast`
export const YIELD_HERO_VAULT_ADDRESS = '0x...TODO_PASTE_YOUR_ADDRESS' as const
export const YIELD_HERO_POLICY_ADDRESS = '0x...TODO_PASTE_YOUR_ADDRESS' as const
export const AAVE_STRATEGY_ADDRESS = '0x...TODO_PASTE_YOUR_ADDRESS' as const
export const SPARK_STRATEGY_ADDRESS = '0x...TODO_PASTE_YOUR_ADDRESS' as const

export const CONTRACT_ADDRESSES = {
    chainId: CHAIN_ID,
    usdc: USDC_ADDRESS,
    publicGoodsTreasury: PUBLIC_GOODS_TREASURY,
    octantPolicyManager: OCTANT_POLICY_MANAGER,
    yieldHeroVault: YIELD_HERO_VAULT_ADDRESS,
    yieldHeroPolicy: YIELD_HERO_POLICY_ADDRESS,
    aaveStrategy: AAVE_STRATEGY_ADDRESS,
    sparkStrategy: SPARK_STRATEGY_ADDRESS,
} as const

// --- CONTRACT ABIS ---

/**
 * @dev Minimal ERC20 ABI for frontend interactions (approve, balanceOf, allowance)
 */
export const erc20ABI = [
    {
        constant: true,
        inputs: [{ name: '_owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: 'balance', type: 'uint256' }],
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: '_spender', type: 'address' },
            { name: '_value', type: 'uint256' },
        ],
        name: 'approve',
        outputs: [{ name: '', type: 'bool' }],
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            { name: '_owner', type: 'address' },
            { name: '_spender', type: 'address' },
        ],
        name: 'allowance',
        outputs: [{ name: '', type: 'uint256' }],
        type: 'function',
    },
] as const

/**
 * @dev ABI for our main YieldHeroVault.sol contract.
 * (Cursor: This was extracted from `contracts/out/YieldHeroVault.sol/YieldHeroVault.json`)
 */
export const yieldHeroVaultABI = [
    {
        type: 'constructor',
        inputs: [
            {
                name: '_yieldHeroPolicy',
                type: 'address',
                internalType: 'address',
            },
            {
                name: '_initialOwner',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'addStrategy',
        inputs: [
            {
                name: '_strategy',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'allowance',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'spender',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'approve',
        inputs: [
            {
                name: 'spender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'asset',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'balanceOf',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'convertToAssets',
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'convertToShares',
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'decimals',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint8',
                internalType: 'uint8',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'deposit',
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'harvest',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'isStrategy',
        inputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maxDeposit',
        inputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maxMint',
        inputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maxRedeem',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'maxWithdraw',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'mint',
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'name',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'string',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'owner',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'previewDeposit',
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'previewMint',
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'previewRedeem',
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'previewWithdraw',
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'rebalance',
        inputs: [
            {
                name: 'fromStrategy',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'toStrategy',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'amount',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'redeem',
        inputs: [
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'renounceOwnership',
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'strategies',
        inputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'address',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'sweep',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'symbol',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'string',
                internalType: 'string',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalAssets',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'totalSupply',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'function',
        name: 'transfer',
        inputs: [
            {
                name: 'to',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'transferFrom',
        inputs: [
            {
                name: 'from',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'bool',
                internalType: 'bool',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'transferOwnership',
        inputs: [
            {
                name: 'newOwner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'withdraw',
        inputs: [
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
        outputs: [
            {
                name: '',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
        stateMutability: 'nonpayable',
    },
    {
        type: 'function',
        name: 'yieldHeroPolicy',
        inputs: [],
        outputs: [
            {
                name: '',
                type: 'address',
                internalType: 'contract YieldHeroPolicy',
            },
        ],
        stateMutability: 'view',
    },
    {
        type: 'event',
        name: 'Approval',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'spender',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Deposit',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'owner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'assets',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'shares',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'OwnershipTransferred',
        inputs: [
            {
                name: 'previousOwner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'newOwner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Transfer',
        inputs: [
            {
                name: 'from',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'to',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'value',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'event',
        name: 'Withdraw',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'receiver',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'owner',
                type: 'address',
                indexed: true,
                internalType: 'address',
            },
            {
                name: 'assets',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
            {
                name: 'shares',
                type: 'uint256',
                indexed: false,
                internalType: 'uint256',
            },
        ],
        anonymous: false,
    },
    {
        type: 'error',
        name: 'ERC20InsufficientAllowance',
        inputs: [
            {
                name: 'spender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'allowance',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'needed',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC20InsufficientBalance',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'balance',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'needed',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC20InvalidApprover',
        inputs: [
            {
                name: 'approver',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC20InvalidReceiver',
        inputs: [
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC20InvalidSender',
        inputs: [
            {
                name: 'sender',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC20InvalidSpender',
        inputs: [
            {
                name: 'spender',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC4626ExceededMaxDeposit',
        inputs: [
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'max',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC4626ExceededMaxMint',
        inputs: [
            {
                name: 'receiver',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'max',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC4626ExceededMaxRedeem',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'shares',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'max',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'ERC4626ExceededMaxWithdraw',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
            {
                name: 'assets',
                type: 'uint256',
                internalType: 'uint256',
            },
            {
                name: 'max',
                type: 'uint256',
                internalType: 'uint256',
            },
        ],
    },
    {
        type: 'error',
        name: 'NotAStrategy',
        inputs: [],
    },
    {
        type: 'error',
        name: 'NotOwnerOrManager',
        inputs: [],
    },
    {
        type: 'error',
        name: 'OwnableInvalidOwner',
        inputs: [
            {
                name: 'owner',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'OwnableUnauthorizedAccount',
        inputs: [
            {
                name: 'account',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'SafeERC20FailedOperation',
        inputs: [
            {
                name: 'token',
                type: 'address',
                internalType: 'address',
            },
        ],
    },
    {
        type: 'error',
        name: 'TransferFailed',
        inputs: [],
    },
] as const

