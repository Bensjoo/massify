import React from 'react';
import Table from 'react-bootstrap/Table';
import { User } from "../api";

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => (
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
);

export default UserTable;
