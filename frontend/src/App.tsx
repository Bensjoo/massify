import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavLink from 'react-bootstrap/NavLink';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import api from "./api";

interface User {
  id: number;
  nick_name: string;
  is_admin: boolean;
}

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
      <Navbar variant="dark" bg="primary">
        <Container fluid="true">
          <NavLink className="navbar-brand" href="#">Massify 🍺</NavLink>

        </Container>

      </Navbar>


    <Container>
      <Form onSubmit={handleFormSubmit}>
      <Form.Group className="mb-3 mt-3">
        <Form.Label htmlFor="nickname">Nickname</Form.Label>
        <Form.Control
          type="text"
          id="nickname"
          name="nick_name"
          value={formData.nick_name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check 
          type="checkbox"
          id="isAdmin"
          label="Is Admin"
          name="is_admin"
          checked={formData.is_admin}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      </Form>
    </Container>
    

    <Table striped bordered hover className='mt-3'>
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Admin</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.nick_name}</td>
            <td>{user.is_admin ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
}

export default App;
