// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {YieldHeroVault} from "../src/YieldHeroVault.sol";
import {YieldHeroPolicy} from "../src/YieldHeroPolicy.sol";
import {AaveV3Strategy} from "../src/strategies/AaveV3Strategy.sol";
import {SparkStrategy} from "../src/strategies/SparkStrategy.sol";
import {Constants} from "../src/Constants.sol";

contract Deploy is Script {
    struct DeploymentConfig {
        address vaultOwner;
        address publicGoodsTreasury;
        address policyManager;
        bool autoAddStrategies;
    }

    struct DeploymentResult {
        YieldHeroVault vault;
        YieldHeroPolicy policy;
        AaveV3Strategy aaveStrategy;
        SparkStrategy sparkStrategy;
        bool strategiesAdded;
    }

    function run() external returns (DeploymentResult memory result) {
        DeploymentConfig memory config = _loadConfig();

        uint256 deployerKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.addr(deployerKey);

        uint256 currentNonce = vm.getNonce(deployer);
        address predictedVaultAddress = vm.computeCreateAddress(deployer, currentNonce + 1);

        vm.startBroadcast(deployerKey);
        result.policy = new YieldHeroPolicy(predictedVaultAddress, config.publicGoodsTreasury, config.policyManager);
        result.vault = new YieldHeroVault(address(result.policy), config.vaultOwner);
        result.aaveStrategy = new AaveV3Strategy();
        result.sparkStrategy = new SparkStrategy();

        if (config.autoAddStrategies && deployer == config.vaultOwner) {
            result.vault.addStrategy(address(result.aaveStrategy));
            result.vault.addStrategy(address(result.sparkStrategy));
            result.strategiesAdded = true;
        }
        vm.stopBroadcast();

        console2.log("Deployer", deployer);
        console2.log("Policy", address(result.policy));
        console2.log("Vault", address(result.vault));
        console2.log("Aave strategy", address(result.aaveStrategy));
        console2.log("Spark strategy", address(result.sparkStrategy));
        console2.log("Vault owner", config.vaultOwner);
        console2.log("Public goods treasury", config.publicGoodsTreasury);
        console2.log("Octant policy manager", config.policyManager);

        if (config.autoAddStrategies) {
            if (result.strategiesAdded) {
                console2.log("Strategies added to vault by deployer");
            } else {
                console2.log("autoAddStrategies enabled but deployer is not vault owner; please add manually");
            }
        } else {
            console2.log("autoAddStrategies disabled; remember to call addStrategy() for each strategy");
        }
    }

    function _loadConfig() private view returns (DeploymentConfig memory config) {
        config.vaultOwner = vm.envAddress("VAULT_OWNER");
        config.publicGoodsTreasury = vm.envAddress("PUBLIC_GOODS_TREASURY");

        config.policyManager = vm.envOr("OCTANT_POLICY_MANAGER", Constants.OCTANT_POLICY_MANAGER);
        config.autoAddStrategies = vm.envOr("AUTO_ADD_STRATEGIES", false);
    }
}
