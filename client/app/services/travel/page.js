'use client';

import { useState } from 'react';
import styles from './TravelPage.module.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function TravelPage() {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [travelDate, setTravelDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const availableFlights = [
        { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-12-01', price: 200, airline: 'Delta Airlines' },
        { id: 2, from: 'New York', to: 'Los Angeles', date: '2024-12-02', price: 210, airline: 'American Airlines' },
        { id: 3, from: 'New York', to: 'Los Angeles', date: '2024-12-03', price: 220, airline: 'United Airlines' },
        { id: 4, from: 'New York', to: 'Los Angeles', date: '2024-12-04', price: 930, airline: 'Southwest Airlines' },
        { id: 5, from: 'New York', to: 'Los Angeles', date: '2024-12-05', price: 240, airline: 'Delta Airlines' },
        { id: 6, from: 'Los Angeles', to: 'New York', date: '2024-12-01', price: 180, airline: 'American Airlines' },
        { id: 7, from: 'Los Angeles', to: 'New York', date: '2024-12-02', price: 185, airline: 'United Airlines' },
        { id: 8, from: 'Los Angeles', to: 'New York', date: '2024-12-03', price: 190, airline: 'Delta Airlines' },
        { id: 9, from: 'Los Angeles', to: 'New York', date: '2024-12-04', price: 195, airline: 'Southwest Airlines' },
        { id: 10, from: 'Los Angeles', to: 'New York', date: '2024-12-05', price: 200, airline: 'American Airlines' },
        { id: 11, from: 'Chicago', to: 'San Francisco', date: '2024-12-01', price: 150, airline: 'United Airlines' },
        { id: 12, from: 'Chicago', to: 'San Francisco', date: '2024-12-02', price: 160, airline: 'Delta Airlines' },
        { id: 13, from: 'Chicago', to: 'San Francisco', date: '2024-12-03', price: 170, airline: 'American Airlines' },
        { id: 14, from: 'Chicago', to: 'San Francisco', date: '2024-12-04', price: 175, airline: 'Southwest Airlines' },
        { id: 15, from: 'Chicago', to: 'San Francisco', date: '2024-12-05', price: 180, airline: 'Delta Airlines' },
        { id: 16, from: 'San Francisco', to: 'Chicago', date: '2024-12-01', price: 140, airline: 'American Airlines' },
        { id: 17, from: 'San Francisco', to: 'Chicago', date: '2024-12-02', price: 145, airline: 'United Airlines' },
        { id: 18, from: 'San Francisco', to: 'Chicago', date: '2024-12-03', price: 150, airline: 'Delta Airlines' },
        { id: 19, from: 'San Francisco', to: 'Chicago', date: '2024-12-04', price: 155, airline: 'Southwest Airlines' },
        { id: 20, from: 'San Francisco', to: 'Chicago', date: '2024-12-05', price: 160, airline: 'United Airlines' },
        { id: 21, from: 'Miami', to: 'Atlanta', date: '2024-12-01', price: 100, airline: 'Delta Airlines' },
        { id: 22, from: 'Miami', to: 'Atlanta', date: '2024-12-02', price: 110, airline: 'American Airlines' },
        { id: 23, from: 'Miami', to: 'Atlanta', date: '2024-12-03', price: 120, airline: 'Southwest Airlines' },
        { id: 24, from: 'Miami', to: 'Atlanta', date: '2024-12-04', price: 130, airline: 'United Airlines' },
        { id: 25, from: 'Miami', to: 'Atlanta', date: '2024-12-05', price: 140, airline: 'Delta Airlines' },
        { id: 26, from: 'Atlanta', to: 'Miami', date: '2024-12-01', price: 90, airline: 'United Airlines' },
        { id: 27, from: 'Atlanta', to: 'Miami', date: '2024-12-02', price: 95, airline: 'American Airlines' },
        { id: 28, from: 'Atlanta', to: 'Miami', date: '2024-12-03', price: 100, airline: 'Delta Airlines' },
        { id: 29, from: 'Atlanta', to: 'Miami', date: '2024-12-04', price: 105, airline: 'Southwest Airlines' },
        { id: 30, from: 'Atlanta', to: 'Miami', date: '2024-12-05', price: 110, airline: 'United Airlines' },
        { id: 31, from: 'New York', to: 'Los Angeles', date: '2024-12-01', price: 300, airline: 'Southwest Airlines' },
        { id: 32, from: 'New York', to: 'Los Angeles', date: '2024-12-01', price: 350, airline: 'American Airlines' },
        { id: 33, from: 'New York', to: 'Los Angeles', date: '2024-12-01', price: 350, airline: 'United Airlines' },

    ];
    

    const handleSearchFlights = () => {
        const filteredFlights = availableFlights.filter(
            (flight) =>
                flight.from === fromLocation &&
                flight.to === toLocation &&
                flight.date === travelDate
        );
        setFlights(filteredFlights);
        setSearchPerformed(true);
    };

    const priceTimelineData = availableFlights
        .filter((flight) => flight.from === fromLocation && flight.to === toLocation)
        .map((flight) => ({
            date: flight.date,
            price: flight.price,
            airline: flight.airline,
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    const chartData = {
        labels: priceTimelineData.map((data) => data.date),
        datasets: [
            {
                label: 'Price Over Time',
                data: priceTimelineData.map((data) => data.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.3,
                fill: true,
            },
        ],
    };
    // Get unique locations from available flights
    const locations = [
        ...new Set(
            availableFlights.flatMap(flight => [flight.from, flight.to])
        ),
    ];
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Price Timeline with Airline Information',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const data = priceTimelineData[index];
                        return `Price: $${data.price}, Airline: ${data.airline}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className={styles.travelPage}>
            <h1 className={styles.pageTitle}>Find Your Flight</h1>

            <div className={styles.formContainer}>
            

            
                <div className={styles.inputGroup}>
                    <label htmlFor="fromLocation" className={styles.label}>
                        From
                    </label>
                    <select
                        id="fromLocation"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="input"
                    >
                        <option value="">Select From Location</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="toLocation" className={styles.label}>
                        To
                    </label>
                    <select
                        id="toLocation"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="input"
                    >
                        <option value="">Select To Location</option>
                        {locations
                            .filter(location => location !== fromLocation)  // Remove the selected 'fromLocation' from the options
                            .map((location, index) => (
                                <option key={index} value={location}>
                                    {location}
                                </option>
                            ))}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="travelDate" className={styles.label}>
                        Date
                    </label>
                    <input
                        type="date"
                        id="travelDate"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={styles.input}
                    />
                </div>

                <button onClick={handleSearchFlights} className={styles.searchButton}>
                    Search Flights
                </button>
            </div>

            <div className={styles.results}>
                <h1>Available Flights</h1>
                {flights.length > 0 ? (
                    <ul className={styles.flightList}>
                        {flights.map((flight) => (
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

            {searchPerformed && priceTimelineData.length > 0 && (
                <div className={styles.graphContainer}>
                    <Line data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
}