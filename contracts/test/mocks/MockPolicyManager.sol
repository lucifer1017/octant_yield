// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Allocation, IPolicyManager} from "octant-v2/policies/BasePolicy.sol";

contract MockPolicyManager is IPolicyManager {
    Allocation[] private _lastAllocations;

    event RouteCalled(address indexed caller, Allocation[] allocations);

    function route(Allocation[] calldata allocations) external override {
        delete _lastAllocations;
        for (uint256 i = 0; i < allocations.length; i++) {
            _lastAllocations.push(allocations[i]);
        }
        emit RouteCalled(msg.sender, allocations);
    }

    function lastAllocationsLength() external view returns (uint256) {
        return _lastAllocations.length;
    }

    function lastAllocationAt(uint256 index) external view returns (Allocation memory) {
        return _lastAllocations[index];
    }
}
