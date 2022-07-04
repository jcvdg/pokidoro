import React from 'react';
import './App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Pomodoro from './pages/Pomodoro';
import Nav from './components/Nav';
import Logout from './components/Logout';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route 
            path="/" 
            element={<Home />} 
          />
          <Route 
            path="/auth" 
            element={ user ? <Navigate to = "../" />: <Auth /> } 
          />
          <Route 
            path="/pomodoro" 
            element={<Pomodoro />}
          />
          <Route 
            path="/logout" 
            element={<Logout />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
