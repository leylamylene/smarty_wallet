import React from 'react';
import './home.css';

function Home(props: any) {
  return (
    <div className="Home" id="home">
      <div className="fixed-top">
        <div className="logo">🌐 Sepolia Network</div>
        <div className="wallet-address" id="my_wallet_address">dzdzfzfugfiuzgfiuzfgzu</div>
        <div className="balance-section">
          <div className="balance" id="my_balance"></div>
        </div>
      </div>
      <header className="App-header">
        <div className="buttons">
          <button className="button receive">Receive</button>
          <button className="button send">Send</button>
        </div>
        <button className="transactions-button">Transactions</button>
      </header>
    </div>
  );
}

export default Home;