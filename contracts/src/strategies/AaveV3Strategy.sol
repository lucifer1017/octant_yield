// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "openzeppelin-contracts/token/ERC20/extensions/ERC4626.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {IERC4626} from "openzeppelin-contracts/interfaces/IERC4626.sol";
import {Constants} from "../Constants.sol";

/**
 * @title AaveV3Strategy
 * @notice This is our wrapper for the official Aave V3 aUSDC Token.
 * The aUSDC token itself IS the ERC4626-compliant vault.
 * This contract is itself an ERC4626 vault that composes the Aave vault.
 */
contract AaveV3Strategy is ERC4626 {
    IERC4626 private constant AAVE_VAULT = IERC4626(Constants.AAVE_USDC_ATOKEN_VAULT);

    constructor() ERC20("YieldHero Aave USDC Strategy", "yhAAVE-USDC") ERC4626(IERC20(Constants.USDC)) {}

    function totalAssets() public view override returns (uint256) {
        uint256 idleAssets = IERC20(Constants.USDC).balanceOf(address(this));
        uint256 vaultShares = AAVE_VAULT.balanceOf(address(this));
        uint256 vaultAssets = vaultShares == 0 ? 0 : AAVE_VAULT.convertToAssets(vaultShares);
        return idleAssets + vaultAssets;
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        super._deposit(caller, receiver, assets, shares);
        IERC20(Constants.USDC).approve(address(AAVE_VAULT), assets);
        AAVE_VAULT.deposit(assets, address(this));
    }

    function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares)
        internal
        override
    {
        uint256 idleAssets = IERC20(Constants.USDC).balanceOf(address(this));
        if (idleAssets < assets) {
            uint256 amountNeeded = assets - idleAssets;
            AAVE_VAULT.withdraw(amountNeeded, address(this), address(this));
        }
        super._withdraw(caller, receiver, owner, assets, shares);
    }
}
