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

    </div>
  );
}

export default Home;