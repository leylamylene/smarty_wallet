import Home from './components/home';
import SetPassword from './components/set_password';
import { useState } from 'react';
function App() {

  const [shownCompoenent, SetShownComponent] = useState('Home');
  const createWallet = () => {
    SetShownComponent('SetPassword');
  };


  const importWallet = () => {

  }


  const connectLedger = () => {

  }

  return (

    <>
      {shownCompoenent === 'Home' && <Home createWallet={createWallet} importWallet={importWallet} connectLedger={connectLedger} />}
      {shownCompoenent === 'SetPassword' && <SetPassword SetShownComponent={SetShownComponent} />}

    </>


  );
}

export default App;
