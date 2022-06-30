import React from 'react';
import './App.css';
import Home from './pages/Home';
import Nav from './components/Nav';
import Auth from './pages/Auth';
import Pomodoro from './pages/Pomodoro';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/pomodoro" element={<Pomodoro />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
