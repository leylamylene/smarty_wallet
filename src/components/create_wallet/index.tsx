import { useEffect, useState } from 'react';
import './create_wallet.css';
const CreateWallet = (props: any) => {
  const logo = require('../../assets/logo.png');
  const [isWalletExist, setIsWalletExist] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("wallet")) {
      setIsWalletExist(true)
    }

  }, []);

  useEffect(() => {
    if (isWalletExist) {
      props.SetShownComponent("Home");
    }
  }, [isWalletExist]);
  return (
    <div className="content">
      <div className="logo">Smarty Wallet</div>
      <div className="action-container">
        <button className="button-primary" onClick={props.createWallet}>Create a wallet</button>
        <button className="button-secondary" onClick={props.importWallet}>Or Import Your Seed Phrase</button>
        <div id="my_balance"></div>
      </div>
    </div>
  );
};



export default CreateWallet;