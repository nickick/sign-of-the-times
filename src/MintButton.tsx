/* eslint-disable react/display-name */
import {
  Box, Button, FormControl, InputLabel, InputBase, MenuItem, Select, SelectChangeEvent, Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, {
  ForwardedRef, forwardRef, useCallback, useContext, useState,
} from 'react';
import ConnectButton from './ConnectButton';
import { ContractContext, ContractStatus } from './ContractContextProvider';

type Props = {
  mintType: 'beginning' | 'end'
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 0,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  '& .MuiInputBase-input:focus': {
    borderRadius: 0,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 0,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

const MintButton = forwardRef(({ mintType }: Props, ref: ForwardedRef<HTMLButtonElement>) => {
  const {
    contractStatus, allowedGasOnlyMint, mintGasOnly,
    canMintGasOnly, errorMessage, mint, currentAccount, endCount, beginningCount,
  } = useContext(ContractContext);

  const isUnstarted = contractStatus === ContractStatus.Paused
    && endCount === 0 && beginningCount === 0;

  const isOver = contractStatus === ContractStatus.Premint
    && (endCount > 0 || beginningCount > 0);

  const canPremint = (
    contractStatus === ContractStatus.Paused || contractStatus === ContractStatus.Mint
  ) && canMintGasOnly && allowedGasOnlyMint;

  const [value, setValue] = useState<string>('1');

  const onChange = (e: SelectChangeEvent) => {
    setValue(e.target.value);
  };

  const onMintClick = useCallback(() => {
    const beginningOrEndBool = mintType === 'beginning';

    if (canPremint) {
      mintGasOnly(beginningOrEndBool);
    } else if (contractStatus === ContractStatus.Mint) {
      // public mint
      if (allowedGasOnlyMint && canMintGasOnly) {
        // still first try a gas-only mint if wallet hasn't minted yet
        mintGasOnly(beginningOrEndBool);
      } else {
        mint(beginningOrEndBool, parseInt(value, 10));
      }
    }

    // Paused, no-op
  }, [errorMessage, contractStatus, mintType, canPremint, value]);

  if (!currentAccount) {
    return (
      <ConnectButton />
    );
  }

  const options = new Array(10).fill('').map((_, i) => ({ optionValue: i + 1, label: i + 1 }));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        contractStatus === ContractStatus.Mint && !canPremint && (
          <FormControl
            fullWidth
            sx={{
              transform: {
                md: 'translateY(8rem)',
              },
            }}
          >
            <InputLabel
              id={`${mintType}-select-label`}
              sx={{
                top: '1rem',
                left: '-1rem',
                color: {
                  xs: 'white !important',
                  md: mintType === 'beginning' ? 'black !important' : 'white !important',
                },
              }}
            >
              Count
            </InputLabel>
            <Select
              labelId={`${mintType}-select-label`}
              value={value}
              variant="filled"
              onChange={onChange}
              input={<BootstrapInput />}
              sx={{
                mb: 2,
              }}
            >
              {options.map(({ optionValue, label }) => (
                <MenuItem value={optionValue} key={value}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )
      }
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
          transform: {
            md: contractStatus === ContractStatus.Mint && !canPremint ? 'translateY(8rem)' : 'none',
          },
          position: 'relative',
          zIndex: 1000,
        }}
        onClick={onMintClick}
      >
        {
          isUnstarted && (
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
          isOver && (
            <Typography
              variant="body2"
              color={mintType === 'beginning' ? 'primary' : 'secondary'}
              sx={{
                fontSize: '1.5rem',
                lineHeight: '2.0rem',
              }}
            >
              Mint Closed
            </Typography>
          )
        }
        {
          canPremint && (
            <Typography
              variant="body2"
              color={mintType === 'beginning' ? 'primary' : 'secondary'}
              sx={{
                fontSize: '1.5rem',
                lineHeight: '2.0rem',
              }}
            >
              Gas-only Mint
            </Typography>
          )
        }
        {
          contractStatus === ContractStatus.Mint && !canPremint && (
            <Typography
              variant="body2"
              color={mintType === 'beginning' ? 'primary' : 'secondary'}
              sx={{
                fontSize: '1.5rem',
                lineHeight: '2.0rem',
              }}
            >
              Mint &#40;
              {(parseInt(value, 10) * 0.05).toFixed(2)}
              {' '}
              Eth&#41;
            </Typography>
          )
        }
      </Button>
    </Box>
  );
});

export default MintButton;
