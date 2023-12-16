import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { User } from "../api";

interface UserTableProps {
  users: User[];
  onDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete }) => (
  <Table striped bordered hover className='mt-3'>
    <thead>
      <tr>
        <th>Nickname</th>
        <th>Admin</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.nick_name}</td>
          <td>{user.is_admin ? 'Yes' : 'No'}</td>
          <td>
            {/* Delete button */}
            <Button variant="outline-danger" onClick={() => onDelete(user.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default UserTable;
