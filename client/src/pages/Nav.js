import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <div className="Nav">
        <nav>
          <Link to="/">
            Home
          </Link>
          <Link to="/auth">
            Logout
          </Link>
        </nav>
    </div>
  );
};

export default Nav;