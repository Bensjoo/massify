import React, {ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

interface BeerFormData {
    name: string;
    short_name: string;
    brewery: string;
    bolaget_number: number;
    abv: number;
}

interface BeerFormProps {
    formData: BeerFormData;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const BeerForm: React.FC<BeerFormProps> = ({formData, handleInputChange, handleFormSubmit}) => {
    return(
    <Container>
        <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3 mt-3">
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3 mt-3">
            <Form.Label htmlFor="name">Short Name</Form.Label>
            <Form.Control
                type="text"
                id="short_name"
                name="short_name"
                value={formData.short_name}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3 mt-3">
            <Form.Label htmlFor="name">Brewery</Form.Label>
            <Form.Control
                type="text"
                id="brewery"
                name="brewery"
                value={formData.brewery}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor="abv">ABV (Alcohol By Volume)</Form.Label>
            <Form.Control
                type="number"
                step="0.1"  // Allows for decimal input
                id="abv"
                name="abv"
                value={formData.abv}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor="bolaget_number">Bolaget Number</Form.Label>
            <Form.Control
                type="number"
                id="bolaget_number"
                name="bolaget_number"
                value={formData.bolaget_number}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
        Submit
        </Button>
        </Form>
    </Container>
    )
}

export default BeerForm