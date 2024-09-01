import React, { useState } from 'react';
import './secret_phrase.css';

const SecretPhraseImport = (props: any) => {
  const [showPassword, setShowPassword] = useState(Array(12).fill(false));

  const toggleVisibility = (index: any) => {
    const newShowPassword = [...showPassword];
    newShowPassword[index] = !newShowPassword[index];
    setShowPassword(newShowPassword);
  };

  return (
    <div className="secret-phrase-import">
      <h1>Import with Secret Phrase</h1>
      <select className="secret-phrase-dropdown">
        <option>I have a 12 word Secret Phrase</option>
      </select>
      <div className="words-input-container">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="word-input-group">
            <input
              type={showPassword[index] ? 'text' : 'password'}
              id={`word${index + 1}`}
              className='word-input'
              placeholder={`word${index + 1}`}
            />
            {/* <button
              type="button"
              className="toggle-visibility-btn"
              onClick={() => toggleVisibility(index)}
            >
              👁️
            </button> */}
          </div>
        ))}
      </div>
      <div className="navigation-buttons">
        <button className="back-btn">Back</button>
        <button className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default SecretPhraseImport;