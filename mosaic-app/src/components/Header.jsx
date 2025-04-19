import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onContributeClick }) => {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Mosaic</h1>
        <span>Where every story is a tile in our shared history</span>
      </div>
      <nav>
        <ul>
          <li><Link to="/" className="active">Map</Link></li>
          <li><Link to="/my-stories">My Stories</Link></li>
          <li><Link to="/lesson-plans">Lesson Plans</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <button className="contribute-btn" onClick={onContributeClick}>
        Share Your Story
      </button>
    </header>
  );
};

export default Header;
