import { BENTOBOX_ADDRESS, ChainId, WNATIVE } from "@sushiswap/sdk";

import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function ({
  ethers,
  deployments,
  getNamedAccounts,
  getChainId,
}: HardhatRuntimeEnvironment) {
  console.log("Running MasterDeployer deploy script");
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const bentoBoxV1 = await ethers.getContract("BentoBoxV1");

  const { address } = await deploy("MasterDeployer", {
    from: deployer,
    args: [17, deployer, bentoBoxV1.address],
    deterministicDeployment: false,
  });

  console.log("MasterDeployer deployed at ", address);
};

export default deployFunction;

deployFunction.tags = ["MasterDeployer"];

deployFunction.dependencies = ["BentoBox"];
