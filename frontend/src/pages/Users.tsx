import React, { useState, useEffect } from 'react';
import UserTable from '../components/UserTable';

import api from '../api';
import { User } from '../api';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // State and functions for users and tastings

  useEffect(() => {
    // Fetch users and tastings
  }, []);

  // Handlers for form inputs and submissions

  return (
    <div>
      Welcome to massify!
    </div>
  );
};

export default HomePage;