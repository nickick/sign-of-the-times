/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import contractAbi from './contractAbi.json';
import allowlist from './allowlist';
import useInterval from './hooks/useInterval';

// eslint-disable-next-line no-shadow
export const enum ContractStatus {
  Paused,
  Premint,
  Mint
}

type Piece = {
  name?: string;
  description?: string;
  token_id?: string;
  token_address?: string;
}

interface ContextInterface {
  currentAccount: string | null;
  errorMessage: string | null;
  connectWallet: () => void;
  getContractStatus: () => Promise<ContractStatus>;
  contractStatus: ContractStatus;
  allowedGasOnlyMint: boolean;
  canMintGasOnly: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  transactionHash?: string;
  transactionResult?: ethers.ContractReceipt;
  isMinting: boolean;
  mintedPieces: Piece[];
  mintGasOnly: (beginningOrEnd: boolean) => Promise<false | ethers.ContractReceipt>;
  mint: (beginningOrEnd: boolean) => Promise<false | ethers.ContractReceipt>;
  beginningCount: number;
  endCount: number;
}

export const ContractContext = createContext<ContextInterface>({} as ContextInterface);

type Props = {
  children: React.ReactNode;
}

const ContractContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [allowedGasOnlyMint, setAllowedGasOnlyMint] = useState(false);
  const [canMintGasOnly, setCanMintGasOnly] = useState(false);
  const [contractStatus, setContractStatus] = useState(0);
  const [transactionHash, setTransactionHash] = useState<string>();
  const [transactionResult, setTransactionResult] = useState<ethers.ContractReceipt>();
  const [isMinting, setIsMinting] = useState(false);
  const [beginningCount, setBeginningCount] = useState(0);
  const [endCount, setEndCount] = useState(0);
  const [mintedPieces, setMintedPieces] = useState<Piece[]>([]);
  const [price, setPrice] = useState<string>('0');

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        // setErrorMessage("No accounts found");
      }
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;

      console.error(message);
      setErrorMessage(message);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        if (window.innerWidth < 800) {
          window.location.replace('https://metamask.app.link/dapp/signs-of-the-times.xyz');
        }
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      let message = 'Unknown Error';
      if (error instanceof Error) message = error.message;

      console.error(message);
      setErrorMessage(message);
    }
  };

  const contractAddress = process.env.NEXT_PUBLIC_SIGNS_CONTRACT_ADDRESS || '';

  function getProvider() {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    return provider;
  }

  // fetch Signs Contract
  const getSignsContract = () => {
    const provider = getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  };

  function handleError(error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    console.error(error);
    setErrorMessage(message);
  }

  const getContractStatus = async (): Promise<ContractStatus> => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return ContractStatus.Paused;
      }
      const signsContract = getSignsContract();
      const status = await signsContract.contractStatus();
      setContractStatus(status);
      return status;
    } catch (error) {
      handleError(error);
      return ContractStatus.Paused;
    }
  };

  const getEndSupply = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const signsContract = getSignsContract();
      const newEndCountRaw = await signsContract.endCount();
      const newEndCount = parseInt(newEndCountRaw, 10);

      setEndCount(newEndCount);
      return newEndCount;
    } catch (error) {
      handleError(error);
      return endCount;
    }
  };

  const getBeginningSupply = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) return alert('Please install MetaMask.');
      const signsContract = getSignsContract();
      const beginningCountRaw = await signsContract.beginningCount();
      const newBeginningCount = parseInt(beginningCountRaw, 10);

      setBeginningCount(newBeginningCount);
      return newBeginningCount;
    } catch (error) {
      handleError(error);
      return beginningCount;
    }
  };

  const getMintedPieces = async () => {
    if (!currentAccount) return [];

    try {
      const results = await fetch(`/api/minted/${currentAccount}`);
      console.log(results);
      const result = await results.json();
      const signsContract = getSignsContract();

      const pieces = await Promise.all(result.map(async (piece: Piece) => {
        const metadataResult = await signsContract.tokenURI(
          process.env.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS,
          piece.token_id,
        );

        const metadataPrecursorIndex = 27;
        const metadataParsed = JSON.parse(metadataResult.slice(metadataPrecursorIndex));

        const metadata = { ...piece, ...metadataParsed };
        return metadata;
      }));

      setMintedPieces(pieces);

      return pieces;
    } catch (error) {
      handleError(error);
      return [];
    }
  };

  const canMintPrivate = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return false;
      }
      if (currentAccount) {
        const signsContract = getSignsContract();
        const leaves = allowlist.map(keccak256);
        const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
        const hexProof = merkleTree.getHexProof(keccak256(currentAccount || ''));
        // console.log(merkleTree.getHexRoot());
        const approvedForMintGasOnly = await signsContract.approvedForMintGasOnly(
          currentAccount,
          hexProof,
        );

        setCanMintGasOnly(await signsContract.canMintGasOnly(
          currentAccount,
        ));

        setAllowedGasOnlyMint(approvedForMintGasOnly);
        return approvedForMintGasOnly && canMintGasOnly;
      }

      return false;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const mintGasOnly = async (beginningOrEnd: boolean) => {
    const { ethereum } = window;
    setTransactionHash(undefined);
    setIsMinting(true);
    setTransactionResult(undefined);

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return false;
      }

      if (currentAccount) {
        const signsContract = getSignsContract();
        const leaves = allowlist.map(keccak256);
        const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
        const hexProof = merkleTree.getHexProof(keccak256(currentAccount || ''));
        const gasOnlyMint: ethers.ContractTransaction = await signsContract.mintGasOnly(
          beginningOrEnd,
          hexProof,
        );

        setTransactionHash(gasOnlyMint.hash);
        const gasOnlyMinted = await gasOnlyMint.wait(2);
        setIsMinting(false);
        await getEndSupply();
        await getBeginningSupply();
        await getMintedPieces();
        setTransactionResult(gasOnlyMinted);
        return gasOnlyMinted;
      }

      return false;
    } catch (error) {
      setIsMinting(false);
      handleError(error);
      return false;
    }
  };

  const getPrice = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return false;
      }
      const signsContract = getSignsContract();
      // eslint-disable-next-line no-underscore-dangle
      const contractPrice = await signsContract._price();
      setPrice(contractPrice.toString());
      return contractPrice.toString();
    } catch (error) {
      setIsMinting(false);
      handleError(error);
      return '0';
    }
  };

  const mint = async (beginningOrEnd: boolean) => {
    const { ethereum } = window;
    setTransactionHash(undefined);
    setIsMinting(true);
    setTransactionResult(undefined);

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return false;
      }

      if (currentAccount) {
        const signsContract = getSignsContract();
        const mintTxn: ethers.ContractTransaction = await signsContract.mint(
          1,
          beginningOrEnd,
          {
            value: ethers.utils.parseEther(ethers.utils.formatEther(price)),
          },
        );

        setTransactionHash(mintTxn.hash);
        const minted = await mintTxn.wait(2);
        setIsMinting(false);
        await getEndSupply();
        await getBeginningSupply();
        await getMintedPieces();
        setTransactionResult(minted);
        return minted;
      }

      return false;
    } catch (error) {
      setIsMinting(false);
      handleError(error);
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    if (currentAccount) {
      getContractStatus();
      canMintPrivate();
      getMintedPieces();
      getBeginningSupply();
      getEndSupply();
      getPrice();
    }
  }, [currentAccount]);

  useInterval(() => {
    if (currentAccount) {
      getContractStatus();
      getMintedPieces();
      getBeginningSupply();
      getEndSupply();
    }
  }, 5000);

  return (
    <ContractContext.Provider value={{
      currentAccount,
      connectWallet,
      errorMessage,
      getContractStatus,
      contractStatus,
      allowedGasOnlyMint,
      setErrorMessage,
      transactionHash,
      transactionResult,
      canMintGasOnly,
      isMinting,
      mintedPieces,
      mintGasOnly,
      mint,
      beginningCount,
      endCount,
    }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
