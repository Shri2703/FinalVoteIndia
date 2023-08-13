// walletUtils.js

import Web3 from 'web3';

const web3 = new Web3(window.ethereum);

export const connectWallet = async () => {
  try {
    if (window.ethereum) {
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      return accounts[0]; // Return the MetaMask account ID
    } else {
      alert('Metamask not detected. Please install Metamask and try again.');
    }
  } catch (error) {
    console.error('Error connecting to wallet:', error);
  }
};
