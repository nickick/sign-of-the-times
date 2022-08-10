/* eslint-disable no-nested-ternary */
import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useContext } from 'react';
import { ContractContext } from './ContractContextProvider';

type Message = {
  type: AlertColor;
  text: string;
}

const Notification: React.FC = () => {
  const { errorMessage, setErrorMessage } = useContext(ContractContext);

  let errorMessageTruncated = errorMessage || '';

  if (errorMessage && errorMessage.length > 100) {
    const reasonIndex = errorMessage?.indexOf('(reason="execution reverted: ');
    if (reasonIndex > -1) {
      errorMessageTruncated = errorMessage.slice(reasonIndex + 29, reasonIndex + 29 + 150).concat(' ...');
    } else if (errorMessage.indexOf('insufficient funds for intrinsic transaction cost') > -1) {
      errorMessageTruncated = 'Error: Not enough ETH in wallet. Try switching your wallet or adding more funds.';
    } else {
      errorMessageTruncated = 'Error: '.concat(errorMessage.slice(0, 150).concat(' ...'));
    }
  }

  if (errorMessage && errorMessage.indexOf('Transaction reverted without a reason string') > -1) {
    setErrorMessage('');
  }

  if (errorMessage && errorMessage.indexOf('JSON') > -1) {
    setErrorMessage('');
  }

  if (errorMessage && errorMessage.indexOf('unknown account') > -1) {
    setErrorMessage('');
  }

  const message: Message = {
    type: 'error',
    text: errorMessageTruncated,
  };

  const handleClose = () => {
    setErrorMessage('');
  };

  const open = Boolean(errorMessage && !!errorMessage.length);

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity={message.type}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '4px solid red',
        }}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
