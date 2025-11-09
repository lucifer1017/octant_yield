// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

struct Allocation {
    address destination;
    uint256 amount;
}

interface IPolicyManager {
    function route(Allocation[] calldata allocations) external;
}

abstract contract BasePolicy {
    IPolicyManager public immutable policyManager;

    constructor(IPolicyManager _policyManager) {
        policyManager = _policyManager;
    }

    function _totalAssets() internal view virtual returns (uint256);

    function _route(Allocation[] memory allocations) internal virtual {
        policyManager.route(allocations);
    }

    function _execute() internal virtual;
}
