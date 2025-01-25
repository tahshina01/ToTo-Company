// app/account/trips/page.js
'use client';

import { useState } from 'react';
import styles from './TripsPage.module.css';

export default function TripsPage() {
  const [activeTab, setActiveTab] = useState('upcoming');

  const trips = {
    upcoming: [
      {
        id: 1,
        destination: 'Paris, France',
        date: '15-20 Dec 2023',
        status: 'Confirmed',
        image: '/paris.jpg',
        hotel: 'Grand Hotel Paris',
        flightNo: 'AF1234',
        price: '$1,200',
        activities: ['Eiffel Tower Tour', 'Louvre Museum']
      },
      {
        id: 2,
        destination: 'Tokyo, Japan',
        date: '3-10 Jan 2024',
        status: 'Pending',
        image: '/tokyo.jpg',
        hotel: 'Tokyo Luxury Hotel',
        flightNo: 'JL5678',
        price: '$2,300',
        activities: ['Mount Fuji Tour', 'Sushi Making Class']
      },
    ],
    past: [
      {
        id: 3,
        destination: 'New York, USA',
        date: '5-10 Nov 2023',
        status: 'Completed',
        image: '/nyc.jpg',
        hotel: 'Manhattan Suite Hotel',
        flightNo: 'UA9012',
        price: '$1,800',
        activities: ['Broadway Show', 'Central Park Tour']
      },
      // Add more past trips as needed
    ],
    cancelled: [
      {
        id: 4,
        destination: 'Dubai, UAE',
        date: '20-25 Dec 2023',
        status: 'Cancelled',
        image: '/dubai.jpg',
        hotel: 'Burj Al Arab',
        flightNo: 'EK7890',
        price: '$3,500',
        activities: ['Desert Safari', 'Burj Khalifa Visit']
      },
      // Add more cancelled trips as needed
    ]
  };

  return (
    <div className={styles.tripsContainer}>
      <div className={styles.tripsHeader}>
        <h1>My Trips</h1>
        <p>Manage and view all your travel itineraries</p>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'upcoming' ? styles.active : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Trips
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'past' ? styles.active : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Trips
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'cancelled' ? styles.active : ''}`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className={styles.tripsGrid}>
        {trips[activeTab].map((trip) => (
          <div key={trip.id} className={styles.tripCard}>
            <div className={styles.tripImage}>
              <img src={trip.image} alt={trip.destination} />
              <span className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
                {trip.status}
              </span>
            </div>
            
            <div className={styles.tripContent}>
              <h2>{trip.destination}</h2>
              <div className={styles.tripDetails}>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>📅</span>
                  <span>{trip.date}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>🏨</span>
                  <span>{trip.hotel}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>✈️</span>
                  <span>{trip.flightNo}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.icon}>💰</span>
                  <span>{trip.price}</span>
                </div>
              </div>

              <div className={styles.activities}>
                <h3>Planned Activities</h3>
                <div className={styles.activityList}>
                  {trip.activities.map((activity, index) => (
                    <span key={index} className={styles.activity}>
                      {activity}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.cardActions}>
                <button className={styles.viewButton}>View Details</button>
                {activeTab === 'upcoming' && (
                  <button className={styles.editButton}>Modify Trip</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}