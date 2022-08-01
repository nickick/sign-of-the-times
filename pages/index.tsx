import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../src/Landing';

const Home: NextPage = () => (
  <>
    <Head>
      <meta property="og:image" content="https://www.signs-of-the-times.xyz/share-image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:alt" content="Brendan North's Signs of the Times Open Edition Mint site" />
      <meta property="og:type" content="website" />
      <meta name="description" content="Brendan North's Signs of the Times Open Edition Mint site" />
      <meta property="og:title" content="Brendan North's Signs of the Times" />
      <meta property="og:description" content="Mint site for Brendan North's Signs of the Times Open Edition" />
      <meta property="og:url" content="https://www.signs-of-the-times.xyz" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ImBrendanNorth" />
      <meta name="twitter:creator" content="@pepperonick" />
      <meta name="twitter:description" content="Mint site for Brendan North's Signs of the Times Open Edition" />
      <meta name="twitter:image" content="https://www.signs-of-the-times.xyz/share-image.png" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Landing />
  </>
);

export default Home;
