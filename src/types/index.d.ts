export {};

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    // eslint-disable-next-line no-undef
    ethereum: ExternalProvider;
  }
}
