// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "openzeppelin-contracts/token/ERC20/extensions/ERC4626.sol";
import {Ownable} from "openzeppelin-contracts/access/Ownable.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {Constants} from "./Constants.sol";
import {YieldHeroPolicy} from "./YieldHeroPolicy.sol";

/**
 * @title YieldHeroVault
 * @notice This is the central vault for our aggregator.
 * Users deposit USDC here (via their Privy wallet).
 * The owner (our Privy worker) calls rebalance() and harvest().
 * On harvest, it sends all profit to the Octant policy for splitting.
 */
contract YieldHeroVault is ERC4626, Ownable {
    // --- State Variables ---

    // Our Octant Policy contract
    YieldHeroPolicy public immutable yieldHeroPolicy;

    // List of all approved strategies
    address[] public strategies;
    mapping(address => bool) public isStrategy;

    // --- Errors ---
    error NotAStrategy();
    error NotOwnerOrManager();
    error TransferFailed();

    // --- Constructor ---

    constructor(address _yieldHeroPolicy, address _initialOwner)
        ERC20("YieldHero Vault", "YH-USDC")
        ERC4626(IERC20(Constants.USDC))
        Ownable(_initialOwner)
    {
        yieldHeroPolicy = YieldHeroPolicy(_yieldHeroPolicy);
    }

    // --- User-Facing Functions (Called by Frontend via Privy) ---

    // deposit() and withdraw() are inherited from ERC4626.
    // We override them to add the strategy logic.

    // --- Worker-Facing Functions (Called by Privy Worker) ---

    /**
     * @notice The core harvest function.
     * This is called by our off-chain worker (the "brain").
     */
    function harvest() external {
        // Only the owner (our worker) or the policy (for flash loans) can call
        if (msg.sender != owner() && msg.sender != address(yieldHeroPolicy)) {
            revert NotOwnerOrManager();
        }

        // 1. Calculate the total profit (yield)
        // Profit = (Current Total Assets) - (Total Principal)
        // We use totalSupply() as a measure of principal (1 share = 1 USDC)
        uint256 totalPrincipal = totalSupply();
        uint256 totalAssetsInStrategies = _totalAssets();

        if (totalAssetsInStrategies <= totalPrincipal) {
            return; // No profit
        }

        uint256 profit = totalAssetsInStrategies - totalPrincipal;

        // 2. Withdraw *only the profit* from the strategies
        _withdrawProfitFromStrategies(profit);

        // 3. Send 100% of the profit to the Octant Policy
        // The policy will then split it 90/10 and send 90% back.
        bool success = IERC20(Constants.USDC).transfer(address(yieldHeroPolicy), profit);
        if (!success) revert TransferFailed();

        // 4. The policy will auto-compound by sending 90%
        // back to this contract via a `deposit()` call.
    }

    /**
     * @notice Moves funds between strategies. Called by our worker.
     * @param fromStrategy The strategy to withdraw from
     * @param toStrategy The strategy to deposit into
     * @param amount The amount of USDC to move
     */
    function rebalance(address fromStrategy, address toStrategy, uint256 amount) external onlyOwner {
        if (!isStrategy[fromStrategy] || !isStrategy[toStrategy]) {
            revert NotAStrategy();
        }

        // 1. Withdraw from the old strategy
        ERC4626(fromStrategy).withdraw(amount, address(this), address(this));

        // 2. Deposit into the new strategy
        _depositIntoStrategy(toStrategy, amount);
    }

    // --- Internal Logic ---

    /**
     * @dev Calculates the total assets (USDC value) held by this vault,
     * which is the sum of all assets in all strategies.
     */
    function totalAssets() public view override returns (uint256) {
        return _totalAssets();
    }

    function _totalAssets() internal view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < strategies.length; i++) {
            total += ERC4626(strategies[i]).totalAssets();
        }
        // Add any idle USDC in this contract
        total += IERC20(Constants.USDC).balanceOf(address(this));
        return total;
    }

    /**
     * @dev This is the vault's core deposit logic.
     * It deposits USDC into the *first available* strategy.
     * The worker's `rebalance` call will optimize it later.
     */
    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        super._deposit(caller, receiver, assets, shares);

        // For simplicity, deposit into the first strategy
        if (strategies.length > 0) {
            _depositIntoStrategy(strategies[0], assets);
        }
    }

    /**
     * @dev Withdraws from strategies to cover a user's withdrawal.
     */
    function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares)
        internal
        override
    {
        // 1. Check if we have enough idle USDC
        uint256 idleUSDC = IERC20(Constants.USDC).balanceOf(address(this));
        if (idleUSDC < assets) {
            // 2. Not enough idle, pull from strategies
            uint256 amountToPull = assets - idleUSDC;

            // Naive pull: just pull from the first strategy
            // A production version would pull proportionally.
            if (strategies.length > 0) {
                // This call withdraws `amountToPull` assets
                ERC4626(strategies[0]).withdraw(amountToPull, address(this), address(this));
            }
        }

        super._withdraw(caller, receiver, owner, assets, shares);
    }

    /**
     * @dev Internal: Pulls *only* the profit from strategies.
     */
    function _withdrawProfitFromStrategies(uint256 profit) internal {
        // Naive pull for demo: pull all profit from the first strategy.
        if (strategies.length > 0) {
            ERC4626(strategies[0]).withdraw(profit, address(this), address(this));
        }
    }

    function _depositIntoStrategy(address strategy, uint256 amount) internal {
        IERC20(Constants.USDC).approve(strategy, amount);
        ERC4626(strategy).deposit(amount, address(this));
    }

    // --- Admin Functions (Owner-only) ---

    function addStrategy(address _strategy) external onlyOwner {
        if (!isStrategy[_strategy]) {
            isStrategy[_strategy] = true;
            strategies.push(_strategy);
        }
    }

    /**
     * @dev A function to sweep any accidental tokens sent to this contract.
     * This is a safety measure.
     */
    function sweep(address token, address to) external onlyOwner {
        if (token == address(asset())) revert(); // Cannot sweep the vault's asset
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(to, balance);
    }
}
