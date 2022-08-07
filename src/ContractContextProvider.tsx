/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import { ethers } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import contractAbi from './contractAbi.json';

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
}

export const ContractContext = createContext<ContextInterface>({} as ContextInterface);

type Props = {
  children: React.ReactNode;
}

const ContractContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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
          window.location.replace('https://metamask.app.link/dapp/sign-of-the-times.vercel.app');
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

  // fetch NYC365 Contract
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
      return contractStatus;
    } catch (error) {
      handleError(error);
      return ContractStatus.Paused;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    getContractStatus();
  }, [currentAccount]);

  return (
    <ContractContext.Provider value={{
      currentAccount,
      connectWallet,
      errorMessage,
      getContractStatus,
      contractStatus,
    }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
