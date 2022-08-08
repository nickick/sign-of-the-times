/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import { Check, Close } from '@mui/icons-material';
import {
  Box, Button, CircularProgress, Dialog, DialogContent, DialogTitle, Link, Typography,
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { ContractContext, ContractStatus } from './ContractContextProvider';
import shortenAddress from './utils/shortenAddress';

type Props = {
  name?: string;
  token_address?: string;
  token_id?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (tokenId: string) => void;
  selectingMode: boolean;
  selected: boolean;
}

const MintedPiece = ({
  name, token_address, token_id, onClick, selectingMode, selected,
}: Props) => {
  let imageSrc = '/the-beginning-is-near.jpg';

  if (name) {
    if (name?.indexOf('End') > 0) {
      imageSrc = '/the-end-is-near.jpg';
    } else if (name?.indexOf('Signs') > 0) {
      imageSrc = '/the-signs-of-the-times.jpeg';
    }
  }

  const onLinkClick = useCallback((e: React.SyntheticEvent) => {
    if (onClick) {
      e.preventDefault();
      if (name?.indexOf('Signs') === -1) {
        onClick(token_id || '');
      }
    }
  }, [onClick, token_id]);

  return (
    <Box
      sx={[
        {
          my: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: selected && selectingMode ? '2px solid white' : '2px solid #141414',
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
        onClick={onLinkClick}
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
    isMinting, transactionHash, transactionResult, mintedPieces,
    contractStatus, approveForBurn, mintTheSignsOfTheTimes, currentAccount,
  } = useContext(ContractContext);

  const [selected, setSelected] = useState<string[]>([]);
  const [selectingMode, setSelectingMode] = useState(false);
  const [selectedApprovedForBurned, setSelectedApprovedForBurned] = useState<boolean[]>([]);
  const [approvingForBurn, setApprovingForBurn] = useState(false);
  const [mintStarted, setMintStarted] = useState(false);
  const [minting, setMinting] = useState(false);

  const toggleSelectingMode = useCallback(() => {
    setSelected([]);
    setSelectedApprovedForBurned([]);
    setSelectingMode(!selectingMode);
  }, [selectingMode]);

  const clickApproveForBurn = useCallback(async () => {
    setApprovingForBurn(true);
    setSelectedApprovedForBurned([false, false]);
    const firstBurnApproved = await approveForBurn(selected[0]);
    setSelectedApprovedForBurned([firstBurnApproved, false]);
    const secondBurnApproved = await approveForBurn(selected[1]);
    setSelectedApprovedForBurned([firstBurnApproved, secondBurnApproved]);
    setApprovingForBurn(false);
  }, [selected]);

  const clickMintSignsOfTheTimes = useCallback(async () => {
    if (selectedApprovedForBurned.length === 2
      && selectedApprovedForBurned[0]
      && selectedApprovedForBurned[1]
    ) {
      setMintStarted(true);
      setMinting(true);
      const success = await mintTheSignsOfTheTimes(selected);
      setMinting(false);
      if (success) {
        toggleSelectingMode();
      }
    }
  }, [selectedApprovedForBurned, selected]);

  const selectMint = useCallback((tokenId: string) => {
    setSelectedApprovedForBurned([]);

    const selectedPiece = selected.indexOf(tokenId);
    if (selectedPiece > -1) {
      setSelected(selected.filter((piece) => piece !== tokenId));
    } else if (selected.length < 2) {
      const selectedCopy = [...selected];
      selectedCopy.push(tokenId);
      setSelected(selectedCopy);
    } else {
      const selectedCopy = [...selected];
      selectedCopy[1] = tokenId;
      setSelected(selectedCopy);
    }
  }, [selected, setSelected]);

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
      <DialogTitle>
        <Typography
          variant="h2"
          color="secondary"
          sx={{
            fontWeight: 300,
            fontSize: '3rem',
            lineHeight: '3rem',
            flex: 2,
            m: 2,
          }}
        >
          Gallery
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            pb: {
              md: 18,
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
              {
                contractStatus === ContractStatus.Paused && mintedPieces.length > 1 && (
                  <Box>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        py: 1.5,
                        px: 3,
                        my: 2,
                        width: {
                          xs: '100%',
                          md: 'inherit',
                        },
                      }}
                      onClick={toggleSelectingMode}
                    >
                      {
                        !selectingMode && (
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                              fontSize: '1.5rem',
                              lineHeight: '2.0rem',
                            }}
                          >
                            Mint &quot;The Signs of the Times&quot;
                          </Typography>
                        )
                      }
                      {
                        selectingMode && (
                          <Typography
                            variant="body2"
                            color="primary"
                            sx={{
                              fontSize: '1.5rem',
                              lineHeight: '2.0rem',
                            }}
                          >
                            Cancel
                          </Typography>
                        )
                      }
                    </Button>
                    {
                      selectingMode && (
                        <Box
                          sx={{
                            pb: 4,
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="secondary"
                            sx={{
                              fontSize: '1.5rem',
                              lineHeight: '2.0rem',
                              mt: 2,
                            }}
                          >
                            1. Select 2 Open Edition NFTs to burn.
                            {
                              selected.length > 1 && (
                                <Check color="secondary" sx={{ fontSize: 12, ml: 1 }} />
                              )
                            }
                          </Typography>
                          <Typography
                            variant="body2"
                            color="secondary"
                            sx={{
                              fontSize: '1.5rem',
                              lineHeight: '2.0rem',
                              display: 'flex',
                              mt: 2,
                            }}
                          >
                            2. Set approval to burn those NFTs.
                            {
                              selectedApprovedForBurned.length === 2 && (
                                <Box>
                                  {
                                    selectedApprovedForBurned[0] ? (
                                      <Check color="secondary" sx={{ fontSize: 12, ml: 1 }} />
                                    ) : (
                                      <CircularProgress color="secondary" size={12} sx={{ ml: 1 }} />
                                    )
                                  }
                                  {
                                    selectedApprovedForBurned[1] ? (
                                      <Check color="secondary" sx={{ fontSize: 12, ml: 1 }} />
                                    ) : (
                                      <CircularProgress color="secondary" size={12} sx={{ ml: 1 }} />
                                    )
                                  }
                                </Box>
                              )
                            }
                          </Typography>
                          {
                            selected.length === 2 && !(
                              selectedApprovedForBurned[0] && selectedApprovedForBurned[1]
                            ) && (
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                  py: 1.5,
                                  px: 3,
                                  mt: 2,
                                  width: {
                                    xs: '100%',
                                    md: 'inherit',
                                  },
                                }}
                                onClick={clickApproveForBurn}
                              >
                                Approve for burn
                              </Button>
                            )
                          }
                          {
                            approvingForBurn && (
                              <Box />
                            )
                          }
                          <Typography
                            variant="body2"
                            color="secondary"
                            sx={{
                              fontSize: '1.5rem',
                              lineHeight: '2.0rem',
                              mt: 2,
                            }}
                          >
                            3. Burn NFTs to mint &quot;The Signs of the Times&quot;
                          </Typography>
                          {
                            selected.length === 2 && (
                              selectedApprovedForBurned[0] && selectedApprovedForBurned[1]
                            ) && (
                              <Button
                                variant="contained"
                                color="secondary"
                                sx={{
                                  py: 1.5,
                                  px: 3,
                                  mt: 2,
                                  width: {
                                    xs: '100%',
                                    md: 'inherit',
                                  },
                                }}
                                onClick={clickMintSignsOfTheTimes}
                              >
                                Burn and Mint &quot;The Signs of the Times&quot;
                                {
                                  mintStarted && (
                                    <Box>
                                      {
                                        minting ? (
                                          <CircularProgress color="secondary" size={12} sx={{ ml: 1 }} />
                                        ) : (
                                          <Check color="secondary" sx={{ fontSize: 12, ml: 1 }} />
                                        )
                                      }
                                    </Box>
                                  )
                                }
                              </Button>
                            )
                          }
                        </Box>
                      )
                    }
                  </Box>
                )
              }
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                {
                  mintedPieces.map(({ name, token_address, token_id }) => (
                    <MintedPiece
                      key={name?.concat(token_id || '')}
                      name={name}
                      token_address={token_address}
                      token_id={token_id}
                      selectingMode={selectingMode}
                      selected={selected.indexOf(token_id || '') > -1}
                      onClick={selectingMode ? selectMint : undefined}
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
