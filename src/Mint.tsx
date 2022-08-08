/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import { Check } from '@mui/icons-material';
import {
  Box, CircularProgress, Link, Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import { ContractContext } from './ContractContextProvider';
import shortenAddress from './utils/shortenAddress';

type Props = {
  name?: string;
  token_address?: string;
  token_id?: string;
}

const MintedPiece = ({ name, token_address, token_id }: Props) => {
  let imageSrc = '/the-beginning-is-near.jpg';

  if (name) {
    if (name?.indexOf('End') > 0) {
      imageSrc = '/the-end-is-near.jpg';
    } else if (name?.indexOf('Signs') > 0) {
      imageSrc = '/the-signs-of-the-times.jpg';
    }
  }

  return (
    <Box
      sx={[
        {
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          pr: 2,
        },
        {
          '& > a > img': {
            width: '200px',
          },
        },
      ]}
    >
      <Link
        href={`${process.env.NEXT_PUBLIC_OPENSEA_URL}/${token_address}/${token_id}`}
        target="_blank"
      >
        <img src={imageSrc} alt="nft" />
        <Typography
          variant="body1"
          color="secondary"
          sx={{
            fontSize: '2rem',
            lineHeight: '3rem',
            pr: 2,
            pt: 2,
            textAlign: 'center',
          }}
        >
          &quot;
          {name}
          &quot;
        </Typography>
      </Link>
    </Box>
  );
};

const Mint = () => {
  const {
    isMinting, transactionHash, transactionResult, mintedPieces,
  } = useContext(ContractContext);

  if (!isMinting && !transactionHash && mintedPieces.length === 0) {
    return <Box />;
  }

  return (
    <Box
      sx={{
        pb: {
          md: 18,
        },
      }}
    >
      <Box
        sx={{
          py: 12,
          px: {
            xs: 4,
            md: 0,
          },
          bgcolor: '#141414',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Typography
          variant="h2"
          color="secondary"
          sx={{
            fontWeight: 300,
            fontSize: '6rem',
            lineHeight: '6rem',
            flex: 2,
            mb: 4,
          }}
        >
          Minting
        </Typography>
        <Box
          sx={{
            flex: 1,
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 7,
          }}
        >
          <Typography
            variant="body1"
            color="secondary"
            sx={{
              fontSize: '2rem',
              lineHeight: '3rem',
            }}
          >
            Your transactions and minted NFTs will appear here.
            There may be small delays between minting and displaying NFTs.
          </Typography>
          {
            transactionHash && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{
                      fontSize: '2rem',
                      lineHeight: '3rem',
                      pr: 2,
                    }}
                  >
                    Transaction hash:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{
                      fontSize: '2rem',
                      lineHeight: '3rem',
                      pr: 2,
                    }}
                  >
                    <Link
                      href={`${process.env.NEXT_PUBLIC_ETHERSCAN_URL}/tx/${transactionHash}`}
                      sx={{
                        color: 'white',
                        textDecoration: 'underline',
                      }}
                      target="_blank"
                    >
                      {shortenAddress(transactionHash, 18)}
                    </Link>
                  </Typography>
                  {
                    isMinting && (
                      <CircularProgress color="secondary" size={20} />
                    )
                  }
                  {
                    !isMinting && (
                      <Check color="secondary" sx={{ fontSize: 20 }} />
                    )
                  }
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    pb: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{
                      fontSize: '2rem',
                      lineHeight: '3rem',
                      pr: 2,
                    }}
                  >
                    Transaction result:
                  </Typography>
                  {
                    !transactionResult && (
                      <CircularProgress color="secondary" size={20} />
                    )
                  }
                  {
                    transactionResult && transactionResult.status && (
                      <Typography
                        variant="body1"
                        color="secondary"
                        sx={{
                          fontSize: '2rem',
                          lineHeight: '3rem',
                        }}
                      >
                        {transactionResult?.status === 1 ? 'success' : 'reverted'}
                      </Typography>
                    )
                  }
                </Box>
              </Box>
            )
          }
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {
              mintedPieces.map(({ name, token_address, token_id }) => (
                <MintedPiece
                  key={name?.concat(token_id || '')}
                  name={name}
                  token_address={token_address}
                  token_id={token_id}
                />
              ))
            }
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default Mint;
