import React, { useState } from 'react';
import './set_password.css';

const SetPassword = (props: any) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [hasEightCharacters, setHasEightCharacters] = useState(false);
  const [hasUppercaseLetter, setHasUppercaseLetter] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
      // Handle form submission
    }
  };

  const validatePassword = (password: string) => {
    setHasEightCharacters(password.length >= 8);
    setHasUppercaseLetter(/[A-Z]/.test(password));
    setHasSymbol(/[^A-Za-z0-9]/.test(password));
    setHasDigit(/\d/.test(password));

    return hasEightCharacters && hasUppercaseLetter && hasSymbol && hasDigit;
  };

  const handleInputChange = (event: any) => {
    setNewPassword(event.target.value);
    validatePassword(event.target.value);
  };
  const backHome = () => {
    props.SetShownComponent('Home')
  }

  return (
    <>
      <div className="App">
        <div className="flex-col">
          <h1>Set Password</h1>
          <p className="password-desc">This password is used to protect your wallet and provide access to the browser extension.</p>
        </div>

        <div className="form-group">
          <label>New password</label>
          <input type="password" value={newPassword}
            onChange={handleInputChange} />
        </div>
        <ul className="password-criteria">
          <li className={hasEightCharacters ? 'valid' : 'invalid'}>8 or more characters</li>
          <li className={hasUppercaseLetter ? 'valid' : 'invalid'}>At least one uppercase letter</li>
          <li className={hasSymbol ? 'valid' : 'invalid'}>At least one symbol</li>
          <li className={hasDigit ? 'valid' : 'invalid'}>At least one digit</li>

        </ul>
        <div className="form-group">
          <label>Confirm new password</label>
          <input type="password" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        {error && <p className="error">Passwords do not match</p>}

        <div className="buttons">
          <button className="button" onClick={backHome}>Back</button>
          <button className="button active" onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </>
  );
};

export default SetPassword;