import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";
import api, { User } from "../api";

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({
        nick_name: '',
        is_admin: false,
    })

    const fetchUsers = async () => {
        const response = await api.get('/users/');
        setUsers(response.data)
    }
    
    const deleteUser = async (userId: number) => {
        await api.delete(`/users/${userId}`)
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
        await api.post('/users/new/', formData);
        fetchUsers();
        setFormData({
        nick_name: '',
        is_admin: false,
        })
    }

    const handleDeleteUser = async(userId: number) => {
        await deleteUser(userId)
        fetchUsers();
    }


  return (
    <div>
        <UserForm 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleFormSubmit={handleFormSubmit}
        />
        <UserTable users={users} onDelete={handleDeleteUser}/>
    </div>
    );
};

export default Users;