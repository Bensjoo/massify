import React, {useState, useEffect, ChangeEvent, FormEvent} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

interface UserFormData {
    nick_name: string;
    is_admin: boolean;
}

interface UserFormProps {
    formData: UserFormData;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({formData, handleInputChange, handleFormSubmit}) => {
    return(
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
    )
}

export default UserForm