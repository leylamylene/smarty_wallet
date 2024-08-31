import React from 'react';
import './home.css';

function Home(props: any) {
  return (
    <div className="Home">
      <header className="App-header">
        <div className="balance-section">
          <div className="logo">🌐 Internet Computer</div>
          <div className="balance">100 ICP</div>
          <div className="balance-usd">$39,092.22</div>
        </div>
        <div className="wallet-address">4246fd ... b812c8a</div>
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