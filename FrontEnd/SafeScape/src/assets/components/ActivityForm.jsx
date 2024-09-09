import React, { useState } from 'react';

const ActivityForm = () => {
    const [type, setType] = useState('');

    const handleChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Selected Type:', type);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="type">Activity Type:</label>
            <select id="type" name="type" value={type} onChange={handleChange}>
                <option value="TOURS">Tours</option>
                <option value="CUISINE">Cuisine</option>
                <option value="ADVENTURES">Adventures</option>
                <option value="SHOPPING">Shopping</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActivityForm;
