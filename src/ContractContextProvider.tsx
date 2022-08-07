/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import contractAbi from './contractAbi.json';
import approvelist from './approvelist';

// eslint-disable-next-line no-shadow
export const enum ContractStatus {
  Paused,
  Premint,
  Mint
}

interface ContextInterface {
  currentAccount: string | null;
  errorMessage: string | null;
  connectWallet: () => void;
  getContractStatus: () => Promise<ContractStatus>;
  contractStatus: ContractStatus;
  allowedGasOnlyMint: boolean;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const ContractContext = createContext<ContextInterface>({} as ContextInterface);

type Props = {
  children: React.ReactNode;
}

const ContractContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [allowedGasOnlyMint, setAllowedGasOnlyMint] = useState(false);
  const [contractStatus, setContractStatus] = useState(0);

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

  const canMintPrivate = async () => {
    const { ethereum } = window;

    try {
      if (!ethereum) {
        // eslint-disable-next-line no-alert
        alert('Please install MetaMask or another wallet provider.');
        return false;
      }
      const signsContract = await getSignsContract();
      const leaves = approvelist.map(keccak256);
      const merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const hexProof = merkleTree.getHexProof(keccak256(currentAccount || ''));
      if (currentAccount) {
        const approvedForMintGasOnly = await signsContract.approvedForMintGasOnly(
          currentAccount,
          hexProof,
        );

        setAllowedGasOnlyMint(approvedForMintGasOnly);
        return approvedForMintGasOnly;
      }

      return false;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getContractStatus();
    canMintPrivate();
  }, [currentAccount]);

  return (
    <ContractContext.Provider value={{
      currentAccount,
      connectWallet,
      errorMessage,
      getContractStatus,
      contractStatus,
      allowedGasOnlyMint,
      setErrorMessage,
    }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
