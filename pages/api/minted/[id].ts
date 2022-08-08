import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

async function mintedNFTs(account: string) {
  const results = await fetch(
    `https://deep-index.moralis.io/api/v2/${account}/nft/${process.env.NEXT_PUBLIC_PROXY_CONTRACT_ADDRESS}?chain=${process.env.NEXT_PUBLIC_CHAIN_NAME}`,
    {
      headers: {
        'X-API-Key': `${process.env.MORALIS_API_KEY}`,
        accept: 'application/json',
      },
    },
  );

  const result = await results.json();
  const pieces = result.result;

  return pieces;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const pieces = await mintedNFTs(id.toString());
    return res.status(200).json(pieces);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withSentry(handler);
