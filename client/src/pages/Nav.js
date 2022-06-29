import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';


const Nav = () => {
  return (
    <div className="Nav">
        <nav style={{ margin: 10 }}>
          <Link to="/" style={{ padding: 5 }}>
            Home
          </Link>
          <Link to="/auth" style={{ padding: 5 }}>
            Nav
          </Link>
        </nav>
    </div>
  );
};

export default Nav;