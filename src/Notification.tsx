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

  const message: Message = {
    type: 'error',
    text: errorMessage
      ? errorMessage.length > 100
        ? `${errorMessage.slice(0, 100)}...`
        : errorMessage
      : '',
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
        }}
      >
        {message.text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
