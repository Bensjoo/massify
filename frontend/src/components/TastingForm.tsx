import React, {ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

interface TastingFormData {
    title: string,
    startDate: string,
    startTime: string,
}

interface TastingFormProps {
    formData: TastingFormData;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const TastingForm: React.FC<TastingFormProps> = ({formData, handleInputChange, handleFormSubmit}) => {
    return(
    <Container>
        <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor="startDate">Start Date</Form.Label>
            <Form.Control
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label htmlFor="startTime">Start Time</Form.Label>
            <Form.Control
                type="time"
                id="startTime"
                name="startTime"
                value={formData.startTime}
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

export default TastingForm