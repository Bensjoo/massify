import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BeerForm from "../components/BeerForm";
import BeerTable from "../components/BeerTable";
import api, { Beer } from "../api";

const Beers: React.FC = () => {
    const [beers, setBeers] = useState<Beer[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        short_name: '',
        brewery: '',
        bolaget_number: 0,
        abv: 5.0,
    })

    const fetchBeers = async () => {
        const response = await api.get('/beers/');
        setBeers(response.data)
    }
    
    const deleteBeer = async (userId: number) => {
        await api.delete(`/beers/${userId}`)
    }


    useEffect(() => {
        fetchBeers();
    }, []);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormData({
        ...formData,
        [event.target.name]: value
        })
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // multipart form
        const requestFormData = new FormData();
        // Manually append each field from the state to the FormData object
        requestFormData.append('name', formData.name);
        requestFormData.append('short_name', formData.short_name);
        requestFormData.append('brewery', formData.brewery);
        requestFormData.append('bolaget_number', String(formData.bolaget_number)); // Convert number to string
        requestFormData.append('abv', String(formData.abv)); // Convert number to string

        if (selectedFile) {
            requestFormData.append('thumbnail', selectedFile);
        }

        await api.post('/beers/new/', requestFormData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        fetchBeers();
        setFormData({
            name: '',
            short_name: '',
            brewery: '',
            bolaget_number: 0,
            abv: 5.0
        });
        setSelectedFile(null);
    };

    const handleDeleteBeer = async(userId: number) => {
        await deleteBeer(userId)
        fetchBeers();
    }

    

  return (
    <div>
        <BeerForm 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleFormSubmit={handleFormSubmit}
        handleFileChange={handleFileChange}
        />
        <BeerTable beers={beers} onDelete={handleDeleteBeer}/>
    </div>
    );
};

export default Beers;