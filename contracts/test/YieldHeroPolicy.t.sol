// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "forge-std/Test.sol";
import {Allocation} from "octant-v2/policies/BasePolicy.sol";
import {YieldHeroPolicy} from "../src/YieldHeroPolicy.sol";
import {Constants} from "../src/Constants.sol";
import {MockUSDC} from "./mocks/MockUSDC.sol";
import {MockPolicyManager} from "./mocks/MockPolicyManager.sol";

contract ExposedYieldHeroPolicy is YieldHeroPolicy {
    constructor(address vault, address treasury, address policyManager)
        YieldHeroPolicy(vault, treasury, policyManager)
    {}

    function execute() external {
        _execute();
    }
}

contract YieldHeroPolicyTest is Test {
    address private constant VAULT = address(0xAAAA);
    address private constant TREASURY = address(0xBBBB);

    MockUSDC private usdc;
    MockPolicyManager private policyManager;
    ExposedYieldHeroPolicy private policy;

    function setUp() public {
        _deployMockUSDC();
        policyManager = new MockPolicyManager();
        policy = new ExposedYieldHeroPolicy(VAULT, TREASURY, address(policyManager));
    }

    function testExecuteRoutesFundsWithCorrectSplit() public {
        uint256 totalYield = 20_000e6;
        uint256 expectedDonation = totalYield / 10;
        uint256 expectedCompound = totalYield - expectedDonation;

        usdc.mint(address(policy), totalYield);

        policy.execute();

        assertEq(policyManager.lastAllocationsLength(), 2, "Should emit two allocations");

        (address dest0, uint256 amount0) = _allocationAt(0);
        (address dest1, uint256 amount1) = _allocationAt(1);

        assertEq(dest0, TREASURY, "Donation destination mismatch");
        assertEq(amount0, expectedDonation, "Donation amount mismatch");

        assertEq(dest1, VAULT, "Vault destination mismatch");
        assertEq(amount1, expectedCompound, "Compound amount mismatch");
    }

    function _deployMockUSDC() private {
        MockUSDC implementation = new MockUSDC();
        vm.etch(Constants.USDC, address(implementation).code);
        usdc = MockUSDC(Constants.USDC);
    }

    function _allocationAt(uint256 index) private view returns (address, uint256) {
        Allocation memory allocation = policyManager.lastAllocationAt(index);
        return (allocation.destination, allocation.amount);
    }
}
