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
    <div className="container">
      <h1>Set Password</h1>
      <p>This password is used to protect your wallet and provide access to the browser extension. It cannot be reset and is separate from your mobile wallet.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-password">New password</label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={handleInputChange}
        />
        <ul className="criteria">
          <li className={hasEightCharacters ? 'valid' : 'invalid'}>8 or more characters</li>
          <li className={hasUppercaseLetter ? 'valid' : 'invalid'}>At least one uppercase letter</li>
          <li className={hasSymbol ? 'valid' : 'invalid'}>At least one symbol</li>
          <li className={hasDigit ? 'valid' : 'invalid'}>At least one digit</li>
        </ul>
        <label htmlFor="confirm-password">Confirm new password</label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="error">Passwords do not match</p>}
        <div className="terms">
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">I have read and agree to the <a href="#">Terms of Service</a>.</label>
        </div>
        <div className="buttons">
          <button type="button" onClick={backHome}>Back</button>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default SetPassword;