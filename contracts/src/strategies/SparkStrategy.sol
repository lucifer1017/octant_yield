// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "openzeppelin-contracts/token/ERC20/extensions/ERC4626.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";
import {IERC4626} from "openzeppelin-contracts/interfaces/IERC4626.sol";
import {Constants} from "../Constants.sol";

/**
 * @title SparkStrategy
 * @notice This is our wrapper for the official Spark spUSDC Token.
 * The spUSDC token is also an ERC4626-compliant vault.
 */
contract SparkStrategy is ERC4626 {
    IERC4626 private constant SPARK_VAULT = IERC4626(Constants.SPARK_USDC_SPTOKEN_VAULT);

    constructor() ERC20("YieldHero Spark USDC Strategy", "yhSPARK-USDC") ERC4626(IERC20(Constants.USDC)) {}

    function totalAssets() public view override returns (uint256) {
        uint256 idleAssets = IERC20(Constants.USDC).balanceOf(address(this));
        uint256 vaultShares = SPARK_VAULT.balanceOf(address(this));
        uint256 vaultAssets = vaultShares == 0 ? 0 : SPARK_VAULT.convertToAssets(vaultShares);
        return idleAssets + vaultAssets;
    }

    function _deposit(address caller, address receiver, uint256 assets, uint256 shares) internal override {
        super._deposit(caller, receiver, assets, shares);
        IERC20(Constants.USDC).approve(address(SPARK_VAULT), assets);
        SPARK_VAULT.deposit(assets, address(this));
    }

    function _withdraw(address caller, address receiver, address owner, uint256 assets, uint256 shares)
        internal
        override
    {
        uint256 idleAssets = IERC20(Constants.USDC).balanceOf(address(this));
        if (idleAssets < assets) {
            uint256 amountNeeded = assets - idleAssets;
            SPARK_VAULT.withdraw(amountNeeded, address(this), address(this));
        }
        super._withdraw(caller, receiver, owner, assets, shares);
    }
}
