import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

export async function mintedNFTs(account: string) {
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

  return new Promise((resolve) => {
    mintedNFTs(id.toString())
      .then((index) => {
        res.status(200).send(index);
        resolve(0);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
        res.status(500).json({ message: error.message });
        resolve(0);
      });
  });
}

export default withSentry(handler);
