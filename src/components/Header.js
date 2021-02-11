import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = ({ theme, themeOnClick }) => {
  return (
    <header id="header">
      <div className="row space-btw">
        <div className="logo">
          <Link to="/github-searcher">RepoGit</Link>
        </div>
        <div className="theme-switcher" onClick={themeOnClick}>
          {theme ? <i className="fas fa-moon"></i> : <i className="far fa-sun"></i>}
        </div>
      </div>
    </header>
  );
};

export default Header;
