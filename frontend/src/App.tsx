import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNav from './components/MainNav';

import HomePage from './pages/HomePage';
import Users from './pages/Users';

function App() {
  

  return (
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/users" Component={Users} />
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}

export default App;
