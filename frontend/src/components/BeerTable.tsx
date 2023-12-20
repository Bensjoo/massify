import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Beer } from "../api";

interface BeerTableProps {
  beers: Beer[];
  onDelete: (beerId: number) => void;
};

const BeerTable: React.FC<BeerTableProps> = ({ beers, onDelete }) => (
  <Table striped bordered hover className='mt-3'>
    <thead>
      <tr>
        <th>Name</th>
        <th>ABV [%]</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {beers.map(beer => (
        <tr key={beer.id}>
          <td>{beer.name}</td>
          <td>{beer.abv.toFixed(1)}</td>
          <td>
            {/* Delete button */}
            <Button variant="outline-danger" onClick={() => onDelete(beer.id)}>Delete</Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default BeerTable;
