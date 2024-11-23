'use client';

import { useState } from 'react';
import styles from './LandmarkPage.module.css';

export default function LandmarkPage() {
    const landmarks = [
        // Historical Landmarks
        { id: 1, name: 'Eiffel Tower', country: 'France', type: 'Historical', image: '/landmark.jpg' },
        { id: 2, name: 'Great Wall of China', country: 'China', type: 'Historical', image: '/landmark.jpg' },
        { id: 3, name: 'Machu Picchu', country: 'Peru', type: 'Historical', image: '/landmark.jpg' },
        { id: 4, name: 'Statue of Liberty', country: 'USA', type: 'Historical', image: '/landmark.jpg' },
        { id: 5, name: 'Colosseum', country: 'Italy', type: 'Historical', image: '/landmark.jpg' },
        { id: 6, name: 'Taj Mahal', country: 'India', type: 'Historical', image: '/landmark.jpg' },
      
        // Natural Landmarks
        { id: 7, name: 'Grand Canyon', country: 'USA', type: 'Natural', image: '/landmark.jpg' },
        { id: 8, name: 'Mount Everest', country: 'Nepal', type: 'Natural', image: '/landmark.jpg' },
        { id: 9, name: 'Amazon Rainforest', country: 'Brazil', type: 'Natural', image: '/landmark.jpg' },
        { id: 10, name: 'Niagara Falls', country: 'Canada', type: 'Natural', image: '/landmark.jpg' },
        { id: 11, name: 'Uluru', country: 'Australia', type: 'Natural', image: '/landmark.jpg' },
        { id: 12, name: 'Victoria Falls', country: 'Zimbabwe', type: 'Natural', image: '/landmark.jpg' },
      
        // Cultural Landmarks
        { id: 13, name: 'Sydney Opera House', country: 'Australia', type: 'Cultural', image: '/landmark.jpg' },
        { id: 14, name: 'Christ the Redeemer', country: 'Brazil', type: 'Cultural', image: '/landmark.jpg' },
        { id: 15, name: 'Angkor Wat', country: 'Cambodia', type: 'Cultural', image: '/landmark.jpg' },
        { id: 16, name: 'Stonehenge', country: 'United Kingdom', type: 'Cultural', image: '/landmark.jpg' },
        { id: 17, name: 'Burj Khalifa', country: 'United Arab Emirates', type: 'Cultural', image: '/landmark.jpg' },
        { id: 18, name: 'Louvre Museum', country: 'France', type: 'Cultural', image: '/landmark.jpg' },
      
        // Modern Marvels
        { id: 19, name: 'Marina Bay Sands', country: 'Singapore', type: 'Modern', image: '/landmark.jpg' },
        { id: 20, name: 'Golden Gate Bridge', country: 'USA', type: 'Modern', image: '/landmark.jpg' },
        { id: 21, name: 'Petronas Towers', country: 'Malaysia', type: 'Modern', image: '/landmark.jpg' },
        { id: 22, name: 'Tokyo Skytree', country: 'Japan', type: 'Modern', image: '/landmark.jpg' },
        { id: 23, name: 'Shibuya Crossing', country: 'Japan', type: 'Modern', image: '/landmark.jpg' },
        { id: 24, name: 'Guggenheim Museum', country: 'Spain', type: 'Modern', image: '/landmark.jpg' },
    ];

    const countries = ['All', 'USA', 'France', 'China', 'Brazil', 'India', 'Australia', 'Peru', 'Nepal', 'Canada', 'Italy', 'Zimbabwe', 'Cambodia', 'United Kingdom', 'Singapore', 'Malaysia', 'Japan', 'Spain'];
    const types = ['All', 'Cultural', 'Historical', 'Natural', 'Modern'];


    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const [selectedType, setSelectedType] = useState('All');

    const filteredLandmarks = landmarks.filter((landmark) => {
        const matchesSearch = landmark.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCountry = selectedCountry === 'All' || landmark.country === selectedCountry;
        const matchesType = selectedType === 'All' || landmark.type === selectedType;
        return matchesSearch && matchesCountry && matchesType;
      });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
    };

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    return (
        <div className={styles.landmarkPage}>
            <h1 className={styles.pageTitle}>Discover Landmarks</h1>

            <div className={styles.filters}>
            {/* Search Bar */}
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search landmarks..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            
            
            {/* Country Filter */}
            <div className={styles.filterContainer}>
            <h1>Country</h1>
                <select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className={styles.filterDropdown}
                >
                    {countries.map((country, index) => (
                        <option key={index} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className={styles.filterContainer}>
            <h1>Type</h1>
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className={styles.filterDropdown}
                >
                    {types.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            </div>
            {/* Landmark List */}
            <div className={styles.landmarkList}>
                {filteredLandmarks.length > 0 ? (
                    filteredLandmarks.map((landmark) => (
                        <div key={landmark.id} className={styles.landmarkCard}>
                            <img
                                src={landmark.image}
                                alt={landmark.name}
                                className={styles.landmarkImage}
                            />
                            <h2 className={styles.cardTitle}>{landmark.name}</h2>
                            <p className={styles.cardDetails}>{landmark.country}</p>
                            <span className={styles.cardType}>{landmark.type}</span>
                        </div>
                    ))
                ) : (
                    <p style={{ textAlign: 'center', color: '#888' }}>
                        No landmarks match your search.
                    </p>
                )}
            </div>
        </div>
    );
}
