import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Tasting } from "../api";

interface TastingTableProps {
  tastings: Tasting[];
  onDelete: (tastingId: number) => void;
}

const TastingTable: React.FC<TastingTableProps> = ({ tastings, onDelete }) => (
  <Table striped bordered hover className='mt-3'>
    <thead>
      <tr>
        <th>Title</th>
        <th>Started At</th>
      </tr>
    </thead>
    <tbody>
      {tastings.map(tasting => (
        <tr key={tasting.id}>
          <td>{tasting.title}</td>
          <td>{tasting.started}</td>
          <td>
            {/* Delete button */}
            <Button variant="outline-danger" onClick={() => onDelete(tasting.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TastingTable;
