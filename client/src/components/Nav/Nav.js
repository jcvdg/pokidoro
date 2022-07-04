import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Nav = () => {
  const user = useSelector((state) => state.authReducer.authData);
  const pomodoroState = useSelector((state) => state.pomodoroState);

  return (
    <div 
      className="Nav" 
      style={{visibility: pomodoroState !== 'DEFAULT' ? "hidden" : ""}}>
        <nav>
          <Link to="/">
            Home
          </Link>
          {user 
            ? <Link to="/logout">
                Logout
              </Link>
            : <Link to="/auth">
                Login
              </Link>
          }
        </nav>
    </div>
  );
};

export default Nav;