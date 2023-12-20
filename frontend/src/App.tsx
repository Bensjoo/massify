import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainNav from './components/MainNav';

import HomePage from './pages/HomePage';
import Users from './pages/Users';
import Beers from './pages/Beers';

function App() {
  

  return (
    <Router>
      <MainNav />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/users" Component={Users} />
        <Route path="/beers" Component={Beers} />
        {/* ... other routes ... */}
      </Routes>
    </Router>
  );
}

export default App;
