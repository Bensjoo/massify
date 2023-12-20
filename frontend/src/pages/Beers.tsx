import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import BeerForm from "../components/BeerForm";
import BeerTable from "../components/BeerTable";
import api, { Beer } from "../api";

const Beers: React.FC = () => {
    const [beers, setBeers] = useState<Beer[]>([]);
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

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await api.post('/beers/new/', formData);
        fetchBeers();
        setFormData({
            name: '',
            short_name: '',
            brewery: '',
            bolaget_number: 0,
            abv: 5.0
        })
    }

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
        />
        <BeerTable beers={beers} onDelete={handleDeleteBeer}/>
    </div>
    );
};

export default Beers;