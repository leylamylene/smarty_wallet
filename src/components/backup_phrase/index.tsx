import React from 'react';
import './backup_phrase.css'; // Assuming you have a CSS file for styling

const BuckUpPhrase = (props: any) => {
  return (
    <div className="trust-wallet-container" id="my_wallet">
      <div className="logo">
        Smarty Wallet
      </div>
      <h1>Your wallet is ready to use!</h1>
      <p>Remember to backup and keep your Secret Phrase safe.</p>

      <div className="pass-phrase" id="my_wallet_mnemonic">

      </div>
      <p className="pin-wallet">Click at the top right of your browser and pin Smarty Wallet for easy access.</p>

    </div>
  );
};

export default BuckUpPhrase;