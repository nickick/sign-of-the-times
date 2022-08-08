/* eslint-disable react/display-name */
import { Button, Typography } from '@mui/material';
import {
  ForwardedRef, forwardRef, useCallback, useContext,
} from 'react';
import { ContractContext, ContractStatus } from './ContractContextProvider';

type Props = {
  mintType: 'beginning' | 'end'
}

const MintButton = forwardRef(({ mintType }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    contractStatus, allowedGasOnlyMint, setErrorMessage, mintGasOnly,
    canMintGasOnly, errorMessage, mint,
  } = useContext(ContractContext);

  const onMintClick = useCallback(() => {
    const beginningOrEndBool = mintType === 'beginning';

    if (contractStatus === ContractStatus.Premint) {
      if (allowedGasOnlyMint) {
        // mintGasOnly
        if (canMintGasOnly) {
          mintGasOnly(beginningOrEndBool);
        } else {
          setErrorMessage('Maximum pre-mints already minted');
        }
      } else {
        // error message about gas only mint
        setErrorMessage('Connected wallet is not on allowlist');
      }
    } else if (contractStatus === ContractStatus.Mint) {
      // public mint
      if (allowedGasOnlyMint && canMintGasOnly) {
        // still first try a gas-only mint if wallet hasn't minted yet
        mintGasOnly(beginningOrEndBool);
      } else {
        mint(beginningOrEndBool);
      }
    }

    // Paused, no-op
  }, [errorMessage, contractStatus, mintType]);

  return (
    <Button
      variant="contained"
      color={mintType === 'beginning' ? 'secondary' : 'success'}
      ref={ref}
      sx={{
        py: 1.5,
        px: 3,
        width: {
          xs: '100%',
          md: 'inherit',
        },
      }}
      onClick={onMintClick}
    >
      {
        contractStatus === ContractStatus.Paused && (
          <Typography
            variant="body2"
            color={mintType === 'beginning' ? 'primary' : 'secondary'}
            sx={{
              fontSize: '1.5rem',
              lineHeight: '2.0rem',
            }}
          >
            Minting soon &#40;0.05 Eth&#41;
          </Typography>
        )
      }
      {
        contractStatus === ContractStatus.Premint && (
          <Typography
            variant="body2"
            color={mintType === 'beginning' ? 'primary' : 'secondary'}
            sx={{
              fontSize: '1.5rem',
              lineHeight: '2.0rem',
            }}
          >
            Premint &#40;0.05 Eth&#41;
          </Typography>
        )
      }
      {
        contractStatus === ContractStatus.Mint && (
          <Typography
            variant="body2"
            color={mintType === 'beginning' ? 'primary' : 'secondary'}
            sx={{
              fontSize: '1.5rem',
              lineHeight: '2.0rem',
            }}
          >
            Mint &#40;0.05 Eth&#41;
          </Typography>
        )
      }
    </Button>
  );
});

export default MintButton;
