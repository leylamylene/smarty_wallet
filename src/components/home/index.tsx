import './home.css';
const Home = (props: any) => {
  const logo = require('../../assets/logo.png');
  return (
    <div className="container">
      <img src={logo} alt="Trust Wallet Logo" className="logo" />
      <h1 className="welcome-text">Welcome to Smarty Wallet</h1>
      <p className="description-text">The multi-chain wallet trusted by millions</p>

      <button className="wallet-button" onClick={props.createWallet}>
        <span className="button-icon">+</span> Create a new wallet
        <p className="sub-title">Start fresh with a new wallet</p>
      </button>
      <button className="wallet-button" onClick={props.importWallet}>
        <span className="button-icon">&#x21bb;</span> Import or recover wallet
        <p className="sub-title">Import with your secret phrase</p>
      </button>
      <button className="wallet-button" onClick={props.connectLedger}>
        <span className="button-icon">&#x1f4bb;</span>Ledger
        <p className="sub-title">Connect your ledger wallet</p>
      </button>
    </div>
  );
};



export default Home;