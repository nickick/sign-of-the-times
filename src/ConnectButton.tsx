import { Button, Typography } from '@mui/material';
import Image from 'next/image';
import { useContext } from 'react';
import { ContractContext } from './ContractContextProvider';
import shortenAddress from './utils/shortenAddress';

type Props = {
  // eslint-disable-next-line react/require-default-props
  sx?: object;
}

const ConnectButton = ({ sx }: Props) => {
  const { connectWallet, currentAccount } = useContext(ContractContext);

  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        p: 2,
        ...sx,
      }}
      onClick={connectWallet}
    >
      <Typography
        variant="overline"
        color="secondary"
        sx={{
          display: 'flex',
          textTransform: currentAccount ? 'none' : 'uppercase',
        }}
      >
        { currentAccount && (
          <span
            style={{
              display: 'flex',
              marginRight: '0.5rem',
            }}
          >
            <Image
              src="/ethereum.png"
              height={18}
              width={16}
            />
          </span>
        )}
        {
          currentAccount
            ? `${shortenAddress(currentAccount)}`
            : 'Connect Wallet'
        }
      </Typography>
    </Button>
  );
};

export default ConnectButton;
