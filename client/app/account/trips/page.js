// app/account/trips/page.js
'use client';

import { useEffect, useState } from 'react';
import { useGlobals } from '@/contexts/Globals';
import { jwtDecode } from 'jwt-decode';
import styles from './TripsPage.module.css';
import axios from 'axios';

export default function TripsPage() {
  const tripsAll = [
    { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-12-01', time: '10:00 AM', duration: '6h 10m', price: 300, airline: 'Delta Airlines', class: 'Economy' },
    { id: 2, from: 'New York', to: 'Los Angeles', date: '2024-12-02', time: '02:00 PM', duration: '6h 15m', price: 210, airline: 'American Airlines', class: 'Economy' },
    { id: 3, from: 'New York', to: 'Los Angeles', date: '2024-12-03', time: '08:00 AM', duration: '6h 20m', price: 220, airline: 'United Airlines', class: 'Premium Economy' },
    { id: 4, from: 'New York', to: 'Los Angeles', date: '2024-12-04', time: '11:00 AM', duration: '6h 5m', price: 930, airline: 'Southwest Airlines', class: 'Business' },
  ];

  const [trips,setTrips] = useState(tripsAll)

  const getAirlineInitials = (airlineName) => {
    return airlineName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };
  const getData =  async () =>{

    const token = localStorage.getItem("token")
    const userId = jwtDecode(token).sub
    try {
        
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/ticket/getTicketsByUserid?userid=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
            // setTrips(response.data)
            console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <div className={styles.tripsContainer}>
      <div className={styles.tripsHeader}>
        <h1>My Trips</h1>
        <p>View all your travel itineraries</p>
      </div>

      <div className={styles.tripsGrid}>
        {trips.map((trip) => (
          <div key={trip.id} className={styles.tripCard}>
            <div className={styles.ticket}>
          <div className={styles.airline}>
            <div className={styles.airline_header}>
              <div className={styles.logo_section}>
                <div className={styles.airline_logo}> {getAirlineInitials(trip.airline)}</div>
                <div className={styles.airline_info}>
                  <h1>{trip.airline}</h1>
                  <span className={styles.type}>{trip.class}</span>
                </div>
              </div>
              <div className={styles.price_tag}>
                <span>Total Price</span>
                <h2>${trip.price}</h2>
              </div>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.flight_route}>
              <div className={styles.route_info}>
                <h2>{trip.from}</h2>
                <p>{trip.time}</p>
              </div>
              
              <div className={styles.flight_path}>
                <div className={styles.duration}>
                  <span>{trip.duration}</span>
                  <div className={styles.plane_line}>
                    <div className={styles.dot}></div>
                    <div className={styles.plane_icon}>✈️</div>
                    <div className={styles.dot}></div>
                  </div>
                  <span>Direct Flight</span>
                </div>
              </div>
              
              <div className={styles.route_info}>
                <h2>{trip.to}</h2>
              </div>
            </div>
  
            <div className={styles.details}>
              <div className={styles.detail_item}>
                <div className={styles.detail_icon}>📅</div>
                <div>
                  <span>Date</span>
                  <h3>{trip.date}</h3>
                </div>
              </div>
              
              <div className={styles.detail_item}>
                <div className={styles.detail_icon}>💺</div>
                <div>
                  <span>Class</span>
                  <h3>{trip.class}</h3>
                </div>
              </div>
              
            </div>
          </div>
        </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}