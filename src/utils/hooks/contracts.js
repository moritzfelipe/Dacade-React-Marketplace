import { useContract } from './helpers'
import {
    contractAddress,
    cUSDContractAddress,
    ERC20_DECIMALS,
} from "../constants";

import MarketPlaceAbi from "../../abis/Marketplace.abi.json";
import erc20ABI from "../../abis/ERC20.abi.json";

export const useMarketPlaceContract = () => {
    return useContract(MarketPlaceAbi, contractAddress);
};