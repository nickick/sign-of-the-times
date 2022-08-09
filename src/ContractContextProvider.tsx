/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import contractAbi from './contractAbi.json';
import proxyAbi from './proxyAbi.json';
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
  mint: (beginningOrEnd: boolean, quantity: number) => Promise<false | ethers.ContractReceipt>;
  beginningCount: number;
  endCount: number;
  galleryOpen: boolean;
  setGalleryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  approveForBurn: (tokenId: string) => Promise<boolean>;
  mintTheSignsOfTheTimes: (tokenIds: string[]) => Promise<boolean>;
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
  const [galleryOpen, setGalleryOpen] = useState(false);

  interface ErrorWithMessage {
    message: string;
  }

  function handleError(error: unknown) {
    let message = 'Unknown Error';
    if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'object' && error) {
      if ('message' in error) {
        const errorWithMessage = error as ErrorWithMessage;
        message = errorWithMessage.message;
        if (errorWithMessage.message.indexOf('Transaction reverted without a reason string') > -1) {
          message = '';
        }
      }
    }

    console.error(error);
    setErrorMessage(message);
  }

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
      console.error('checkIfWalletIsConnected');
      handleError(error);
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

  const getProxyContract = () => {
    const provider = getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_IMPLEMENTATION_CONTRACT_ADDRESS || '',
      proxyAbi,
      signer,
    );

    return contract.attach(
      process.env.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS || '',
    );
  };

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
      console.error('getcontractstatus');
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
      console.error('getEndSupply');
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
      console.error('getBeginningSupply');
      handleError(error);
      return beginningCount;
    }
  };

  const getMintedPieces = async () => {
    if (!currentAccount) return [];

    try {
      const results = await fetch(`/api/minted/${currentAccount}`);
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
      console.error('getMintedPieces');
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
        setAllowedGasOnlyMint(approvedForMintGasOnly);

        const canMintGasOnlyCall = await signsContract.canMintGasOnly(
          currentAccount,
        );
        setCanMintGasOnly(canMintGasOnlyCall);

        return approvedForMintGasOnly && canMintGasOnly;
      }

      return false;
    } catch (error) {
      console.error('canMintPrivate');
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

        setGalleryOpen(true);
        setTransactionHash(gasOnlyMint.hash);
        const gasOnlyMinted = await gasOnlyMint.wait(2);
        setIsMinting(false);
        setCanMintGasOnly(false);
        await getEndSupply();
        await getBeginningSupply();
        await getMintedPieces();
        setTransactionResult(gasOnlyMinted);
        return gasOnlyMinted;
      }

      return false;
    } catch (error) {
      setIsMinting(false);
      console.error('mintGasOnly');
      handleError(error);
      return false;
    }
  };

  const mint = async (beginningOrEnd: boolean, quantity: number) => {
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
          quantity,
          beginningOrEnd,
          {
            value: ethers.utils.parseEther((quantity * 0.05).toFixed(2).toString()),
          },
        );

        setGalleryOpen(true);
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
      console.error('mint');
      handleError(error);
      return false;
    }
  };

  const approveForBurn = async (tokenId: string) => {
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
        const proxyContract = getProxyContract();
        const approveTxn = await proxyContract.approve(
          process.env.NEXT_PUBLIC_SIGNS_CONTRACT_ADDRESS,
          tokenId,
        );

        setTransactionHash(approveTxn.hash);
        const approvedReceipt = await approveTxn.wait(2);
        setTransactionResult(approvedReceipt);
        setIsMinting(false);
        return approvedReceipt.status === 1;
      }

      setIsMinting(false);
      return false;
    } catch (error) {
      console.error('approveForburn');
      setIsMinting(false);
      handleError(error);
      return false;
    }
  };

  const mintTheSignsOfTheTimes = async (
    tokenIds: string[],
  ) => {
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
        const mintTxn = await signsContract.mintComposite(
          tokenIds,
        );

        setTransactionHash(mintTxn.hash);
        const mintReceipt = await mintTxn.wait(2);
        setTransactionResult(mintReceipt);
        setIsMinting(false);
        await getEndSupply();
        await getBeginningSupply();
        await getMintedPieces();
        return mintReceipt.status === 1;
      }

      setIsMinting(false);
      return false;
    } catch (error) {
      console.error('mintComposite');
      setIsMinting(false);
      handleError(error);
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    if (currentAccount) {
      getBeginningSupply();
      getEndSupply();
      getContractStatus();
      canMintPrivate();
      getMintedPieces();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAccount]);

  useInterval(() => {
    if (currentAccount) {
      getBeginningSupply();
      getEndSupply();
      getContractStatus();
      getMintedPieces();
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
      galleryOpen,
      setGalleryOpen,
      approveForBurn,
      mintTheSignsOfTheTimes,
    }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
