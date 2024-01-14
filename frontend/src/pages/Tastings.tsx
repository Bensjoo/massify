import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import TastingForm from "../components/TastingForm";
import TastingTable from "../components/TastingTable";
import api, { Tasting } from "../api";

const Tastings: React.FC = () => {
    const today = new Date().toISOString().split('T')[0];

    const [tastings, setTastings] = useState<Tasting[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        startDate: today,  // For the date part
        startTime: '19:04',  // For the time part
    })

    const fetchTastings = async () => {
        const response = await api.get('/tastings/');
        setTastings(response.data)
    }
    
    const deleteTasting = async (tastingId: number) => {
        await api.delete(`/tastings/${tastingId}`)
    }


    useEffect(() => {
        fetchTastings();
    }, []);
    
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Combine date and time
        const combinedDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
        
        // Format your combined date-time as needed, e.g., to ISO string
        const submitData = {
            title: formData.title,
            started: combinedDateTime.toISOString(),
        };

        await api.post('/tastings/', submitData);
        fetchTastings();
        setFormData({
        title: '',
        startDate: today,  // For the date part
        startTime: '18:64',  // For the time part
        })
    };

    const handleDeleteTasting = async(tastingId: number) => {
        await deleteTasting(tastingId)
        fetchTastings();
    }


  return (
    <div>
        <TastingTable tastings={tastings} onDelete={handleDeleteTasting}/>
        <hr />
        <TastingForm
            formData={formData}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
        />
        
    </div>
    );
};

export default Tastings;