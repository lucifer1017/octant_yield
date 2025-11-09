// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {YieldHeroVault} from "../src/YieldHeroVault.sol";
import {YieldHeroPolicy} from "../src/YieldHeroPolicy.sol";
import {Constants} from "../src/Constants.sol";
import {MockUSDC} from "./mocks/MockUSDC.sol";
import {MockStrategy} from "./mocks/MockStrategy.sol";
import {MockPolicyManager} from "./mocks/MockPolicyManager.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";

contract YieldHeroVaultTest is Test {
    address private constant OWNER = address(0xBEEF);
    address private constant USER = address(0xCAFE);
    address private constant PUBLIC_GOODS = address(0xFEE1);

    YieldHeroVault private vault;
    YieldHeroPolicy private policy;
    MockPolicyManager private policyManager;
    MockStrategy private strategyPrimary;
    MockStrategy private strategySecondary;

    IERC20 private usdc;

    function setUp() public {
        _deployMockUSDC();

        policyManager = new MockPolicyManager();
        policy = new YieldHeroPolicy(address(0), PUBLIC_GOODS, address(policyManager));

        vault = new YieldHeroVault(address(policy), OWNER);

        strategyPrimary = new MockStrategy(usdc);
        strategySecondary = new MockStrategy(usdc);

        vm.prank(OWNER);
        vault.addStrategy(address(strategyPrimary));
    }

    function testDepositForwardsFundsIntoStrategy() public {
        uint256 depositAmount = 1_000e6;

        _mintToUser(depositAmount);

        vm.startPrank(USER);
        usdc.approve(address(vault), depositAmount);
        uint256 sharesMinted = vault.deposit(depositAmount, USER);
        vm.stopPrank();

        assertEq(sharesMinted, depositAmount, "Shares should equal amount for 1:1 vault");
        assertEq(vault.totalAssets(), depositAmount, "Vault total assets incorrect");
        assertEq(strategyPrimary.totalAssets(), depositAmount, "Strategy assets mismatch");
        assertEq(vault.balanceOf(USER), depositAmount, "User share balance mismatch");
    }

    function testWithdrawPullsFromStrategyWhenNeeded() public {
        uint256 depositAmount = 10_000e6;
        _mintToUser(depositAmount);

        vm.startPrank(USER);
        usdc.approve(address(vault), depositAmount);
        vault.deposit(depositAmount, USER);
        vm.stopPrank();

        vm.startPrank(USER);
        uint256 assetsWithdrawn = vault.withdraw(depositAmount, USER, USER);
        vm.stopPrank();

        assertEq(assetsWithdrawn, depositAmount, "Withdrawn assets mismatch");
        assertEq(usdc.balanceOf(USER), depositAmount, "User did not receive assets");
        assertEq(vault.totalAssets(), 0, "Vault still reports assets");
    }

    function testHarvestTransfersProfitsToPolicy() public {
        uint256 depositAmount = 50_000e6;
        uint256 profitAmount = 5_000e6;
        _mintToUser(depositAmount);

        vm.startPrank(USER);
        usdc.approve(address(vault), depositAmount);
        vault.deposit(depositAmount, USER);
        vm.stopPrank();

        MockUSDC(address(usdc)).mint(address(strategyPrimary), profitAmount);

        vm.prank(OWNER);
        vault.harvest();

        assertEq(usdc.balanceOf(address(policy)), profitAmount, "Policy should receive full profit");
        assertEq(strategyPrimary.totalAssets(), depositAmount, "Strategy assets should reduce to principal");
    }

    function testHarvestRevertsForUnauthorizedCaller() public {
        vm.expectRevert(YieldHeroVault.NotOwnerOrManager.selector);
        vault.harvest();
    }

    function testRebalanceMovesFundsBetweenStrategies() public {
        uint256 depositAmount = 30_000e6;
        uint256 moveAmount = 12_000e6;

        _mintToUser(depositAmount);
        vm.startPrank(USER);
        usdc.approve(address(vault), depositAmount);
        vault.deposit(depositAmount, USER);
        vm.stopPrank();

        vm.prank(OWNER);
        vault.addStrategy(address(strategySecondary));

        vm.prank(OWNER);
        vault.rebalance(address(strategyPrimary), address(strategySecondary), moveAmount);

        assertEq(strategyPrimary.totalAssets(), depositAmount - moveAmount, "Primary strategy not debited");
        assertEq(strategySecondary.totalAssets(), moveAmount, "Secondary strategy not credited");
    }

    function testRebalanceRejectsUnknownStrategy() public {
        vm.prank(OWNER);
        vm.expectRevert(YieldHeroVault.NotAStrategy.selector);
        vault.rebalance(address(0x1234), address(strategyPrimary), 1);
    }

    function _deployMockUSDC() private {
        MockUSDC implementation = new MockUSDC();
        vm.etch(Constants.USDC, address(implementation).code);
        usdc = IERC20(Constants.USDC);
    }

    function _mintToUser(uint256 amount) private {
        MockUSDC(Constants.USDC).mint(USER, amount);
        vm.prank(USER);
        usdc.approve(address(vault), type(uint256).max);
    }
}
