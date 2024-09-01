import React from 'react';
import './backup_phrase.css'; // Assuming you have a CSS file for styling

const BuckUpPhrase = (props: any) => {
  return (
    <div className="trust-wallet-container">
      <div className="logo">
        Smarty Wallet
      </div>
      <h1>Your wallet is ready to use!</h1>
      <p>Remember to backup and keep your Secret Phrase safe.</p>
      <p id="my_wallet_address" className='wallet-address'></p>
      <div className="pass-phrase" id="my_wallet_mnemonic">

      </div>
      <p>Click at the top right of your browser and pin Smarty Wallet for easy access.</p>
      <button id="create_wallet" className='wallet-button'>Create wallet</button>
      <button id="get_wallet_address" className='wallet-button'>Get wallet address</button>
      <button id="get_wallet_mnemonic" className='wallet-button'>Get wallet mnemonic</button>

    </div>
  );
};

export default BuckUpPhrase;