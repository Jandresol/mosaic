import React, { useState } from 'react';
import '../styles/Welcome.css';

const Welcome = ({ onStart }) => {
  const [identity, setIdentity] = useState('');
  const [theme, setTheme] = useState('purple');
  const [language, setLanguage] = useState('en');

  const handleIdentitySelect = (selected) => {
    setIdentity(selected);
  };

  const handleThemeSelect = (selected) => {
    setTheme(selected);
  };

  const handleStart = () => {
    if (identity) {
      onStart({ identity, theme, language });
    } else {
      alert('Please select how youd like to join our community');
    }
  };

  const identityOptions = [
    { id: 'student', label: 'Student' },
    { id: 'teacher', label: 'Teacher' },
    { id: 'community', label: 'Community Member' },
    { id: 'contributor', label: 'Contributor' }
  ];

  const themeOptions = [
    { id: 'purple', color: '#6a11cb' },
    { id: 'blue', color: '#2575fc' },
    { id: 'coral', color: '#FF7F50' },
    { id: 'green', color: '#3CB371' },
    { id: 'orange', color: '#FF4500' }
  ];

  const languageOptions = [
    { id: 'en', label: 'English' },
    { id: 'es', label: 'Español' },
    { id: 'fr', label: 'Français' },
    { id: 'zh', label: '中文' },
    { id: 'ar', label: 'العربية' },
    { id: 'hi', label: 'हिन्दी' }
  ];

  return (
    <div className="welcome-splash">
      <div className="welcome-content">
        <h1>Welcome to Mosaic</h1>
        <p>Where every story is a tile in our shared history. Help us weave together cultural knowledge from around the world.</p>
        
        <h3>How would you like to join our community?</h3>
        <div className="welcome-options">
          {identityOptions.map(option => (
            <button 
              key={option.id}
              className={`identity-btn ${identity === option.id ? 'selected' : ''}`} 
              onClick={() => handleIdentitySelect(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <h3>Choose your color theme:</h3>
        <div className="color-selection">
          {themeOptions.map(option => (
            <div 
              key={option.id}
              className={`color-option ${theme === option.id ? 'selected' : ''}`}
              style={{ backgroundColor: option.color }}
              onClick={() => handleThemeSelect(option.id)}
            />
          ))}
        </div>
        
        <div className="language-selection">
          <h3>Preferred Language:</h3>
          <select 
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languageOptions.map(option => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>
        
        <button className="start-btn" onClick={handleStart}>
          Begin My Journey
        </button>
      </div>
    </div>
  );
};

export default Welcome;