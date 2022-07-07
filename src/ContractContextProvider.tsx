/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useEffect, useState } from 'react';

interface ContextInterface {
  currentAccount: string | null;
  errorMessage: string | null;
  connectWallet: () => void;
}

export const ContractContext = createContext<ContextInterface>({} as ContextInterface);

type Props = {
  children: React.ReactNode;
}

const ContractContextProvider = ({ children }: Props) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

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

  useEffect(() => {
    checkIfWalletIsConnected();

    return () => {
      console.log('test');
    };
  }, [currentAccount]);

  return (
    <ContractContext.Provider value={{
      currentAccount,
      connectWallet,
      errorMessage,
    }}
    >
      {children}
    </ContractContext.Provider>
  );
};

export default ContractContextProvider;
