// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

library Constants {
    // --- SEPOLIA ADDRESSES ---

    // Sepolia USDC (6 decimals)
    address public constant USDC = 0x1c7d4B196CB0c7b01d743fBc6116a902379c7a08;

    // --- Aave V3 on Sepolia ---
    // Aave V3 Sepolia USDC aToken (This is the ERC4626-compliant vault)
    address public constant AAVE_USDC_ATOKEN_VAULT = 0x26690F14B9C6E0e68f3d329810A8A0b2c40409B7;

    // --- Spark on Sepolia ---
    // Spark Sepolia USDC spToken (This is the ERC4626-compliant vault)
    address public constant SPARK_USDC_SPTOKEN_VAULT = 0x51e2A2D4d4455c08253165b116E76587321543ff;

    // --- Octant V2 on Sepolia ---
    address public constant OCTANT_POLICY_MANAGER = 0x75B1F8c9826c7311F5c5116C97C198585489d52b;

    // --- Our Project ---
    // This is the wallet that receives the 10% donation
    // TODO: Update this address before deployment!
    address public constant PUBLIC_GOODS_TREASURY = 0xaB5801A7D398351B89E6080bA41A9ACaa4C539Fb; // (Placeholder)
}
