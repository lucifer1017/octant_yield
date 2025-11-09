// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "openzeppelin-contracts/token/ERC20/extensions/ERC4626.sol";
import {IERC20} from "openzeppelin-contracts/token/ERC20/IERC20.sol";

interface IMintableERC20 is IERC20 {
    function mint(address to, uint256 amount) external;
}

contract MockStrategy is ERC4626 {
    constructor(IERC20 asset_) ERC20("Mock Strategy", "mSTRAT") ERC4626(asset_) {}

    function addYield(uint256 amount) external {
        IMintableERC20(address(asset())).mint(address(this), amount);
    }
}

