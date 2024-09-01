import CreateWallet from './components/create_wallet';
import Home from './components/home';
import SecretPhraseImport from './components/secret_phrase';
import SetPassword from './components/set_password';
import { useState } from 'react';
function App() {

  const [shownCompoenent, SetShownComponent] = useState('CreateWallet');
  const createWallet = () => {
    SetShownComponent('SetPassword');
  };


  const importWallet = () => {
    SetShownComponent('SecretPhraseImport');
  }


  const connectLedger = () => {

  }

  return (

    <>
      {shownCompoenent === 'CreateWallet' && <CreateWallet createWallet={createWallet} importWallet={importWallet} connectLedger={connectLedger} />}
      {shownCompoenent === 'SetPassword' && <SetPassword SetShownComponent={SetShownComponent} />}
      {shownCompoenent === 'Home' && <Home SetShownComponent={SetShownComponent} />}
      {shownCompoenent === 'SecretPhraseImport' && <SecretPhraseImport SetShownComponent={SetShownComponent} />}

    </>


  );
}

export default App;
