/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import { Check, Close } from '@mui/icons-material';
import {
  Box, CircularProgress, Dialog, DialogContent, Link, Typography,
} from '@mui/material';
import { useContext } from 'react';
import { ContractContext } from './ContractContextProvider';
import shortenAddress from './utils/shortenAddress';

type Props = {
  name?: string;
  token_address?: string;
  token_id?: string;
}

const MintedPiece = ({
  name, token_address, token_id,
}: Props) => {
  let imageSrc = '/the-beginning-is-near.jpg';

  if (name) {
    if (name?.indexOf('End') > 0) {
      imageSrc = '/the-end-is-near.jpg';
    } else if (name?.indexOf('Signs') > 0) {
      imageSrc = '/the-signs-of-the-times.jpeg';
    }
  }

  return (
    <Box
      sx={[
        {
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #141414',
          background: name && name.indexOf('Signs') > 0 ? 'white' : 'transparent',
          lineHeight: 0,
          mr: {
            xs: 1,
            md: 2,
          },
        },
        {
          '& > a > img': {
            width: {
              xs: '100%',
              md: '200px',
            },
            transform: name && name.indexOf('Signs') > 0 ? 'translateY(-2px)' : 'none',
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
          color={
            name && name.indexOf('Signs') > 0 ? 'primary' : 'secondary'
          }
          sx={{
            fontSize: {
              xs: '1.5rem',
              md: '1.5rem',
            },
            lineHeight: '3rem',
            p: 2,
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

type GalleryProps = {
  open: boolean;
  onClose: () => void;
}

const Gallery = ({ open, onClose }: GalleryProps) => {
  const {
    isMinting, transactionHash, transactionResult, mintedPieces, currentAccount,
  } = useContext(ContractContext);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="paper"
      maxWidth="md"
      PaperProps={{
        sx: {
          background: '#141414',
          position: 'relative',
        },
      }}
    >
      <Close
        sx={{
          color: 'white',
          fontSize: '4rem',
          position: 'absolute',
          right: '2rem',
          top: '2rem',
          cursor: 'pointer',
        }}
        onClick={onClose}
      />
      <DialogContent dividers>
        <Box
          sx={{
            pb: {
            },
            px: {
              xs: 0,
              md: 4,
            },
          }}
        >
          <Box
            sx={{
              py: 4,
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
                display: 'flex',
                flexDirection: 'column',
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
                <br />
                There may be small delays between minting and displaying NFTs.
                <br />
                You can check your minted NFTs in
                {' '}
                <Link
                  href={`https://opensea.io/${currentAccount}`}
                  target="_blank"
                  sx={{
                    color: 'white',
                    textDecorationColor: 'white',
                  }}
                >
                  Opensea
                </Link>
                .
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
                        flexDirection: {
                          xs: 'column',
                          md: 'row',
                        },
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
                  justifyContent: 'center',
                  alignItems: 'center',
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
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Gallery;
