/* eslint-disable camelcase */
/* eslint-disable react/require-default-props */
import { Check, Close } from '@mui/icons-material';
import {
  Box, Button, CircularProgress, Dialog, DialogContent, Link, Typography,
} from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';
import { ContractContext } from './ContractContextProvider';

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

const SignsMinter = ({ open, onClose }: GalleryProps) => {
  const {
    mintedPieces, approveForBurn, mintTheSignsOfTheTimes,
  } = useContext(ContractContext);

  const [selected, setSelected] = useState<string[]>([]);
  const selectingMode = true;
  const [selectedApprovedForBurned, setSelectedApprovedForBurned] = useState<boolean[]>([]);
  const [approvingForBurn, setApprovingForBurn] = useState(false);
  const [mintStarted, setMintStarted] = useState(false);
  const [minting, setMinting] = useState(false);

  const onDialogClose = useCallback(async () => {
    setSelected([]);
    setSelectedApprovedForBurned([]);
    setApprovingForBurn(false);
    setMintStarted(false);
    setMinting(false);
    onClose();
  }, []);

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
      await mintTheSignsOfTheTimes(selected);
      setMinting(false);
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
      onClose={onDialogClose}
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
        onClick={onDialogClose}
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
              {
                mintedPieces.length > 1 && (
                  <Typography
                    variant="body1"
                    color="secondary"
                    sx={{
                      fontSize: '2rem',
                      lineHeight: '3rem',
                    }}
                  >
                    Follow the instructions to mint &quot;The Signs of the Times&quot;.
                  </Typography>
                )
              }
              <Box>
                {
                  mintedPieces.length < 2 && (
                    <Typography
                      variant="body2"
                      color="secondary"
                      sx={{
                        fontSize: '2rem',
                        lineHeight: '2.0rem',
                        mb: 4,
                      }}
                    >
                      Error: You don&apos;t have enough Open Edition NFTs
                      to mint &quot;The Signs of the Times&quot;.
                      {
                        selected.length > 1 && (
                          <Check sx={{ color: '#AAFF00', fontSize: 14, ml: 1 }} />
                        )
                      }
                    </Typography>
                  )
                }
                {
                  selectingMode && mintedPieces.length > 1 && (
                    <Box
                      sx={{
                        pb: 4,
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="secondary"
                        sx={{
                          fontSize: '2rem',
                          lineHeight: '2.0rem',
                          mt: 2,
                        }}
                      >
                        1. Select 2 Open Edition NFTs to burn.
                        {
                          selected.length > 1 && (
                            <Check sx={{ color: '#AAFF00', fontSize: 14, ml: 1 }} />
                          )
                        }
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary"
                        sx={{
                          fontSize: '2rem',
                          lineHeight: '2.0rem',
                          display: 'flex',
                          mt: 2,
                        }}
                      >
                        2. Accept 2 transactions to set approval to burn those NFTs.
                        {
                          selectedApprovedForBurned.length === 2 && (
                            <Box>
                              {
                                selectedApprovedForBurned[0] ? (
                                  <Check sx={{ color: '#AAFF00', fontSize: 14, ml: 1 }} />
                                ) : (
                                  <CircularProgress color="secondary" size={12} sx={{ ml: 1 }} />
                                )
                              }
                              {
                                selectedApprovedForBurned[1] ? (
                                  <Check sx={{ color: '#AAFF00', fontSize: 14, ml: 1 }} />
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
                              bgcolor: '#1D7FFF',
                            }}
                            onClick={clickApproveForBurn}
                            disabled={approvingForBurn}
                          >
                            <Typography
                              sx={{
                                color: 'white',
                                fontSize: '1.5rem',
                              }}
                            >
                              {
                                approvingForBurn
                                  ? '... Approving'
                                  : 'Approve for burn'
                              }
                            </Typography>
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
                          fontSize: '2rem',
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
                              bgcolor: '#1D7FFF',
                            }}
                            onClick={clickMintSignsOfTheTimes}
                            disabled={mintStarted}
                          >
                            <Typography
                              sx={{
                                color: 'white',
                                fontSize: '1.5rem',
                              }}
                            >
                              {
                                mintStarted
                                  ? '... Burning and Minting'
                                  : 'Burn and Mint "The Signs of the Times"'
                              }
                            </Typography>
                            {
                              mintStarted && (
                                <Box>
                                  {
                                    minting ? (
                                      <CircularProgress color="secondary" size={12} sx={{ ml: 1 }} />
                                    ) : (
                                      <Check sx={{ color: '#AAFF00', fontSize: 14, ml: 1 }} />
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

export default SignsMinter;
