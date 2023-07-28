import { IUniswapV2Router02 } from "@uniswap/v2-periphery/build/IUniswapV2Router02.json";
import { IUniswapV2ERC20 } from "@uniswap/v2-core/build/IUniswapV2ERC20.json";
import { ethers, providers } from "ethers";
import { LARRYX_ABI } from "./abi";

async function main() {
  // Provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-goerli.g.alchemy.com/v2/MGGlH-80oFX2RUjT-9F8pd6h6d3AG0hj"
  );

  // Signer
  const wallet = new ethers.Wallet(
    "da0c9df90c205700a269814a85fc9d383cd6a7a967334c0d63b413389433a949"
  );
  const account = wallet.connect(provider);

  // Contract Addresses
  const tokenContractAddress = "0x2Cd0417a95Af2e4d727EEEB64564f07380A5AE82";
  const uniswapPairAddress = "0x0e4143808e40aDEdb6F1680cC24dfdD2CeDEBa31";
  const uniswapRouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  // Contract Instances
  const tokenContract = new ethers.Contract(
    tokenContractAddress,
    LARRYX_ABI,
    account
  );
  const uniswapPairContract = new ethers.Contract(
    uniswapPairAddress,
    IUniswapV2ERC20.abi,
    account
  );
  const uniswapRouter = new ethers.Contract(
    uniswapRouterAddress,
    IUniswapV2Router02.abi,
    account
  );

  // Approve Uniswap Router to spend tokens
  await tokenContract.approve(
    uniswapRouterAddress,
    ethers.utils.parseUnits("307103700000000", "wei")
  );

  // Add liquidity
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
  await uniswapRouter.addLiquidityETH(
    tokenContractAddress,
    ethers.utils.parseUnits("307103700000000", "wei"),
    ethers.utils.parseUnits("307103700000000", "wei"),
    ethers.utils.parseUnits("100", "wei"),
    account.address,
    deadline,
    { value: ethers.utils.parseUnits("120", "wei") }
  );

  // Get LP balance
  const lpBalance = await uniswapPairContract.balanceOf(account.address);

  // Transfer LP tokens to dead address
  await uniswapPairContract.transfer(
    "0x000000000000000000000000000000000000dEaD",
    lpBalance
  );

  // Transfer ownership
  await tokenContract.transferOwnership(
    "0x0000000000000000000000000000000000000000"
  );
}

main();
