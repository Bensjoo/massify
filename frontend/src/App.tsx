import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import api from "./api";
import { User } from "./api";
import MainNav from './components/MainNav';
import UserTable from './components/UserTable';
import UserForm from './components/UserForm';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    nick_name: '',
    is_admin: false,
  })

  const fetchUsers = async () => {
    const response = await api.get('/users/');
    setUsers(response.data)
  }


  useEffect(() => {
    fetchUsers();
  }, []);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    })
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api.post('/users/new', formData);
    fetchUsers();
    setFormData({
      nick_name: '',
      is_admin: false,
    })
  }

  return (
    <div>
      <MainNav />

    <UserForm 
      formData={formData} 
      handleInputChange={handleInputChange} 
      handleFormSubmit={handleFormSubmit}
    />
    

    <UserTable users={users} />
    </div>
  );
}

export default App;
