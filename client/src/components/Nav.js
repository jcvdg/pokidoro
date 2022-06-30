import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Nav = () => {
  const pomodoroState = useSelector((state) => state.pomodoroState);

  return (
    <div 
      className="Nav" 
      style={{visibility: pomodoroState !== 'DEFAULT' ? "hidden" : ""}}>
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