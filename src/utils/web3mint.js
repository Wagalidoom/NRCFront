import contract from '../contracts/bithuabi.json';
import { ethers } from 'ethers';
import { isMetaMaskInstalled, ethereum } from '../config';



export const mint = async (mint_amount) => {
    if(isMetaMaskInstalled()){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x9FD56e423c9f0C01D4d011ad30860962ddaeA51D";
        const nftContract = new ethers.Contract(contractAddress, contract, signer);
        let txnHash = await nftContract.mint(ethereum.selectedAddress, mint_amount, {
            gasLimit: "285000",
            value: ethers.utils.parseEther((0.03 * mint_amount).toString())
        })
        return txnHash
    }
}

export const totalMintCount = async () => {
    if(isMetaMaskInstalled()){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contractAddress = "0x9FD56e423c9f0C01D4d011ad30860962ddaeA51D";
        const nftContract = new ethers.Contract(contractAddress, contract, signer);

        let totalMint = await nftContract.count();

        return totalMint;
    }
}

export function getNftType(nftId) {
    if (nftId >= 0 && nftId < 2) {
        return 0;
    } else if (nftId >= 2 && nftId < 12) {
        return 1;
    } else if (nftId >= 12 && nftId < 62) {
        return 2;
    } else if (nftId >= 62 && nftId < 162) {
        return 3;
    } else if (nftId >= 162 && nftId < 362) {
        return 4;
    } else if (nftId >= 362 && nftId < 10000) {
        return 5;
    } else {
        return "Error on NFT type";
    }
}
