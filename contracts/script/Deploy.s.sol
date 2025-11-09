// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {YieldHeroVault} from "../src/YieldHeroVault.sol";
import {YieldHeroPolicy} from "../src/YieldHeroPolicy.sol";
import {Constants} from "../src/Constants.sol";

contract Deploy is Script {
    struct DeploymentConfig {
        address vaultOwner;
        address publicGoodsTreasury;
        address policyManager;
    }

    function run() external returns (YieldHeroVault vault, YieldHeroPolicy policy) {
        DeploymentConfig memory config = _loadConfig();

        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        uint256 currentNonce = vm.getNonce(deployer);
        address predictedVaultAddress = vm.computeCreateAddress(deployer, currentNonce + 1);

        vm.startBroadcast(deployerKey);
        policy = new YieldHeroPolicy(predictedVaultAddress, config.publicGoodsTreasury, config.policyManager);
        vault = new YieldHeroVault(address(policy), config.vaultOwner);
        vm.stopBroadcast();

        console2.log("Deployer", deployer);
        console2.log("Policy", address(policy));
        console2.log("Vault", address(vault));
        console2.log("Vault owner", config.vaultOwner);
        console2.log("Public goods treasury", config.publicGoodsTreasury);
        console2.log("Octant policy manager", config.policyManager);
    }

    function _loadConfig() private view returns (DeploymentConfig memory config) {
        config.vaultOwner = vm.envAddress("VAULT_OWNER");
        config.publicGoodsTreasury = vm.envAddress("PUBLIC_GOODS_TREASURY");

        config.policyManager = vm.envOr("OCTANT_POLICY_MANAGER", Constants.OCTANT_POLICY_MANAGER);
    }
}
