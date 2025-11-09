// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Import paths are based on our foundry.toml remappings
import {BasePolicy, Allocation, IPolicyManager} from "octant-v2/policies/BasePolicy.sol";
import {Constants, IERC20} from "./Constants.sol";

/**
 * @title YieldHeroPolicy
 * @author YourName
 * @notice This is our Octant V2 Policy (Yield Donating Strategy).
 * It receives 100% of the harvested yield from our main vault.
 * It is programmed to:
 * 1. Send 10% of the yield to the Public Goods Treasury.
 * 2. Send 90% of the yield BACK to the main vault to auto-compound.
 */
contract YieldHeroPolicy is BasePolicy {
    // The address of our main vault, which will receive the compounded yield
    address public immutable yieldHeroVault;

    // The address of the public goods wallet
    address public immutable publicGoodsTreasury;

    // 10% donation
    uint256 public constant DONATION_BPS = 1000; // 10.00%
    uint256 public constant MAX_BPS = 10000;

    constructor(address _yieldHeroVault, address _publicGoodsTreasury, address _octantPolicyManager)
        BasePolicy(IPolicyManager(_octantPolicyManager))
    {
        yieldHeroVault = _yieldHeroVault;
        publicGoodsTreasury = _publicGoodsTreasury;
    }

    /**
     * @dev This is the core Octant V2 function that executes the yield split.
     * It is called by our `YieldHeroVault` during `harvest()`.
     */
    function _execute() internal override {
        // 1. Get the total yield available (which is the full balance of this contract)
        uint256 totalYield = _totalAssets();

        // 2. Calculate the split
        uint256 donationAmount = (totalYield * DONATION_BPS) / MAX_BPS;
        uint256 compoundAmount = totalYield - donationAmount;

        // 3. Define the allocations (the "destinations")
        Allocation[] memory allocations = new Allocation[](2);

        // Allocation 1: 10% to Public Goods
        allocations[0] = Allocation({destination: publicGoodsTreasury, amount: donationAmount});

        // Allocation 2: 90% back to the vault for compounding
        allocations[1] = Allocation({destination: yieldHeroVault, amount: compoundAmount});

        // 4. Route the funds
        _route(allocations);
    }

    function _totalAssets() internal view override returns (uint256) {
        return IERC20(Constants.USDC).balanceOf(address(this));
    }
}
