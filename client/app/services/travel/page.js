'use client';

import { useState } from 'react';
import styles from './TravelPage.module.css';

export default function TravelPage() {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [flights, setFlights] = useState([]);

    // Updated sample flight data with more options
    const availableFlights = [
        { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-12-01', price: 200, airline: 'Delta Airlines' },
        { id: 2, from: 'Los Angeles', to: 'New York', date: '2024-12-01', price: 180, airline: 'American Airlines' },
        { id: 3, from: 'London', to: 'Paris', date: '2024-12-01', price: 150, airline: 'British Airways' },
        { id: 4, from: 'London', to: 'Paris', date: '2024-12-01', price: 140, airline: 'Air France' },
        { id: 5, from: 'Tokyo', to: 'Sydney', date: '2024-12-05', price: 350, airline: 'Japan Airlines' },
        { id: 6, from: 'Sydney', to: 'Tokyo', date: '2024-12-05', price: 330, airline: 'Qantas' },
        { id: 7, from: 'New York', to: 'Tokyo', date: '2024-12-05', price: 500, airline: 'United Airlines' },
        { id: 8, from: 'Tokyo', to: 'New York', date: '2024-12-05', price: 490, airline: 'ANA' },
        { id: 9, from: 'San Francisco', to: 'Chicago', date: '2024-12-07', price: 220, airline: 'United Airlines' },
        { id: 10, from: 'Chicago', to: 'San Francisco', date: '2024-12-07', price: 210, airline: 'Southwest Airlines' },
        { id: 11, from: 'Dubai', to: 'Mumbai', date: '2024-12-10', price: 380, airline: 'Emirates' },
        { id: 12, from: 'Mumbai', to: 'Dubai', date: '2024-12-10', price: 370, airline: 'Air India' },
        { id: 13, from: 'New York', to: 'London', date: '2024-12-12', price: 450, airline: 'British Airways' },
        { id: 14, from: 'London', to: 'New York', date: '2024-12-12', price: 430, airline: 'American Airlines' },
        { id: 15, from: 'Hong Kong', to: 'Singapore', date: '2024-12-15', price: 310, airline: 'Cathay Pacific' },
        { id: 16, from: 'Singapore', to: 'Hong Kong', date: '2024-12-15', price: 300, airline: 'Singapore Airlines' },
        { id: 17, from: 'Paris', to: 'New York', date: '2024-12-20', price: 480, airline: 'Air France' },
        { id: 18, from: 'New York', to: 'Paris', date: '2024-12-20', price: 470, airline: 'Delta Airlines' },
        { id: 19, from: 'Los Angeles', to: 'London', date: '2024-12-22', price: 530, airline: 'American Airlines' },
        { id: 20, from: 'London', to: 'Los Angeles', date: '2024-12-22', price: 520, airline: 'British Airways' },
        { id: 21, from: 'Sydney', to: 'Melbourne', date: '2024-12-25', price: 150, airline: 'Jetstar Airways' },
        { id: 22, from: 'Melbourne', to: 'Sydney', date: '2024-12-25', price: 140, airline: 'Qantas' },
        { id: 23, from: 'Los Angeles', to: 'Toronto', date: '2024-12-30', price: 400, airline: 'Air Canada' },
        { id: 24, from: 'Toronto', to: 'Los Angeles', date: '2024-12-30', price: 380, airline: 'WestJet Airlines' },
        { id: 25, from: 'Bangkok', to: 'Hanoi', date: '2025-01-05', price: 250, airline: 'Thai Airways' },
        { id: 26, from: 'Hanoi', to: 'Bangkok', date: '2025-01-05', price: 240, airline: 'Vietnam Airlines' },
        { id: 27, from: 'San Francisco', to: 'Miami', date: '2025-01-10', price: 270, airline: 'JetBlue Airways' },
        { id: 28, from: 'Miami', to: 'San Francisco', date: '2025-01-10', price: 260, airline: 'Delta Airlines' },
    ];

    const handleSearchFlights = () => {
        // Filter flights based on user input
        const filteredFlights = availableFlights.filter(flight => 
            flight.from === fromLocation &&
            flight.to === toLocation &&
            flight.date === travelDate
        );
        setFlights(filteredFlights);
    };

    return (
        <div className={styles.travelPage}>
            <h1 className={styles.pageTitle}>Find Your Flight</h1>

            {/* Location & Date Inputs */}
            <div className={styles.formContainer}>
                <div className={styles.inputGroup}>
                    <label htmlFor="fromLocation" className={styles.label}>From</label>
                    <select
                        id="fromLocation"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className={styles.input}
                    >
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="London">London</option>
                        <option value="Paris">Paris</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Sydney">Sydney</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="Hanoi">Hanoi</option>
                        <option value="Miami">Miami</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="toLocation" className={styles.label}>To</label>
                    <select
                        id="toLocation"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className={styles.input}
                    >
                        <option value="">Select Location</option>
                        <option value="New York">New York</option>
                        <option value="Los Angeles">Los Angeles</option>
                        <option value="London">London</option>
                        <option value="Paris">Paris</option>
                        <option value="Tokyo">Tokyo</option>
                        <option value="Sydney">Sydney</option>
                        <option value="San Francisco">San Francisco</option>
                        <option value="Chicago">Chicago</option>
                        <option value="Dubai">Dubai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hong Kong">Hong Kong</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Melbourne">Melbourne</option>
                        <option value="Toronto">Toronto</option>
                        <option value="Bangkok">Bangkok</option>
                        <option value="Hanoi">Hanoi</option>
                        <option value="Miami">Miami</option>
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="travelDate" className={styles.label}>Date</label>
                    <input
                        type="date"
                        id="travelDate"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <button onClick={handleSearchFlights} className={styles.searchButton}>Search Flights</button>
            </div>

            {/* Flight Results */}
            <div className={styles.results}>
                <h1>Available Flights</h1>
                {flights.length > 0 ? (
                    <ul className={styles.flightList}>
                        {flights.map(flight => (
                            <li key={flight.id} className={styles.flightCard}>
                                <p>{flight.from} to {flight.to}</p>
                                <p>{flight.date}</p>
                                <p>Price: ${flight.price}</p>
                                <p>Airline: {flight.airline}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No flights found for your search.</p>
                )}
            </div>
        </div>
    );
}
