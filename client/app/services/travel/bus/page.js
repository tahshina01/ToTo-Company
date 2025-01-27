'use client';
import { useGlobals } from '@/contexts/Globals';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './BusPage.module.css';
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
import axios from 'axios';

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
    const [isTracking, setIsTracking] = useState(false);
    const [showDateGrid, setShowDateGrid] = useState(true);
    const router = useRouter();

    const availableFlights = [ 
        { id: 1, from: 'New York', to: 'Los Angeles', date: '2024-12-01', time: '10:00 AM', duration: '6h 10m', price: 300, airline: 'Delta Airlines', type: 'Economy' },
        { id: 2, from: 'New York', to: 'Los Angeles', date: '2024-12-02', time: '02:00 PM', duration: '6h 15m', price: 210, airline: 'American Airlines', type: 'Economy' },
        { id: 3, from: 'New York', to: 'Los Angeles', date: '2024-12-03', time: '08:00 AM', duration: '6h 20m', price: 220, airline: 'United Airlines', type: 'Premium Economy' },
        { id: 4, from: 'New York', to: 'Los Angeles', date: '2024-12-04', time: '11:00 AM', duration: '6h 5m', price: 930, airline: 'Southwest Airlines', type: 'Business' },
        { id: 5, from: 'New York', to: 'Los Angeles', date: '2024-12-05', time: '03:00 PM', duration: '6h 25m', price: 240, airline: 'Delta Airlines', type: 'Economy' },
        { id: 6, from: 'Los Angeles', to: 'New York', date: '2024-12-01', time: '09:00 AM', duration: '5h 50m', price: 180, airline: 'American Airlines', type: 'Economy' },
        { id: 7, from: 'Los Angeles', to: 'New York', date: '2024-12-02', time: '01:00 PM', duration: '5h 55m', price: 185, airline: 'United Airlines', type: 'Premium Economy' },
        { id: 8, from: 'Los Angeles', to: 'New York', date: '2024-12-03', time: '10:00 AM', duration: '5h 45m', price: 190, airline: 'Delta Airlines', type: 'Business' },
        { id: 9, from: 'Los Angeles', to: 'New York', date: '2024-12-04', time: '04:00 PM', duration: '6h 0m', price: 195, airline: 'Southwest Airlines', type: 'Economy' },
        { id: 10, from: 'Los Angeles', to: 'New York', date: '2024-12-05', time: '07:00 AM', duration: '5h 50m', price: 200, airline: 'American Airlines', type: 'Premium Economy' },
        { id: 11, from: 'Chicago', to: 'San Francisco', date: '2024-12-01', time: '06:00 AM', duration: '4h 0m', price: 150, airline: 'United Airlines', type: 'Economy' },
        { id: 12, from: 'Chicago', to: 'San Francisco', date: '2024-12-02', time: '10:00 AM', duration: '4h 15m', price: 160, airline: 'Delta Airlines', type: 'Business' },
        { id: 13, from: 'Chicago', to: 'San Francisco', date: '2024-12-03', time: '02:00 PM', duration: '4h 20m', price: 170, airline: 'American Airlines', type: 'Economy' },
        { id: 14, from: 'Chicago', to: 'San Francisco', date: '2024-12-04', time: '12:00 PM', duration: '4h 5m', price: 175, airline: 'Southwest Airlines', type: 'Premium Economy' },
        { id: 15, from: 'Chicago', to: 'San Francisco', date: '2024-12-05', time: '08:00 AM', duration: '4h 30m', price: 180, airline: 'Delta Airlines', type: 'Economy' },
        { id: 16, from: 'San Francisco', to: 'Chicago', date: '2024-12-01', time: '07:00 AM', duration: '4h 10m', price: 140, airline: 'American Airlines', type: 'Economy' },
        { id: 17, from: 'San Francisco', to: 'Chicago', date: '2024-12-02', time: '03:00 PM', duration: '4h 25m', price: 145, airline: 'United Airlines', type: 'Premium Economy' },
        { id: 18, from: 'San Francisco', to: 'Chicago', date: '2024-12-03', time: '09:00 AM', duration: '4h 15m', price: 150, airline: 'Delta Airlines', type: 'Business' },
        { id: 19, from: 'San Francisco', to: 'Chicago', date: '2024-12-04', time: '11:00 AM', duration: '4h 5m', price: 155, airline: 'Southwest Airlines', type: 'Economy' },
        { id: 20, from: 'San Francisco', to: 'Chicago', date: '2024-12-05', time: '01:00 PM', duration: '4h 20m', price: 160, airline: 'United Airlines', type: 'Premium Economy' },
        { id: 21, from: 'Miami', to: 'Atlanta', date: '2024-12-01', time: '05:00 PM', duration: '2h 5m', price: 100, airline: 'Delta Airlines', type: 'Economy' },
        { id: 22, from: 'Miami', to: 'Atlanta', date: '2024-12-02', time: '08:00 AM', duration: '2h 15m', price: 110, airline: 'American Airlines', type: 'Economy' },
        { id: 23, from: 'Miami', to: 'Atlanta', date: '2024-12-03', time: '02:00 PM', duration: '2h 20m', price: 120, airline: 'Southwest Airlines', type: 'Premium Economy' },
        { id: 24, from: 'Miami', to: 'Atlanta', date: '2024-12-04', time: '11:00 AM', duration: '2h 10m', price: 130, airline: 'United Airlines', type: 'Business' },
        { id: 25, from: 'Miami', to: 'Atlanta', date: '2024-12-05', time: '06:00 AM', duration: '2h 25m', price: 140, airline: 'Delta Airlines', type: 'Economy' },
        { id: 26, from: 'Atlanta', to: 'Miami', date: '2024-12-01', time: '09:00 AM', duration: '2h 15m', price: 90, airline: 'United Airlines', type: 'Economy' },
        { id: 27, from: 'Atlanta', to: 'Miami', date: '2024-12-02', time: '07:00 AM', duration: '2h 10m', price: 95, airline: 'American Airlines', type: 'Economy' },
        { id: 28, from: 'Atlanta', to: 'Miami', date: '2024-12-03', time: '03:00 PM', duration: '2h 20m', price: 100, airline: 'Delta Airlines', type: 'Business' },
        { id: 29, from: 'Atlanta', to: 'Miami', date: '2024-12-04', time: '10:00 AM', duration: '2h 15m', price: 105, airline: 'Southwest Airlines', type: 'Premium Economy' },
        { id: 30, from: 'Atlanta', to: 'Miami', date: '2024-12-05', time: '01:00 PM', duration: '2h 30m', price: 110, airline: 'United Airlines', type: 'Economy' },
        { id: 31, from: 'New York', to: 'Los Angeles', date: '2024-12-01', time: '10:00 AM', duration: '6h 10m', price: 300, airline: 'Delta Airlines', type: 'Premium Economy' },
    ];
    
    const {setToastMessage} = useGlobals()

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
                backgroundColor: 'rgba(13, 204, 211, 0.2)',
                tension: 0.3,
                fill: true,
                pointBackgroundColor: 'white',
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
                text: [`Price Timeline with Airline Information`, `${fromLocation} → ${toLocation}`],
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;
                        const data = priceTimelineData[index];
                        return `Price: $${data.price}, Airline: ${data.airline}`;
                    },
                },
                bodyColor: 'white',
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
                
            },
        },
    };

    

    return (
      <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
          <h1>Find The Fastest Bus</h1>
          <p>Search hundreds of Coaches and find the best price for your journey</p>
      </div>

      <div className={styles.searchContainer}>
          <div className={styles.formWrapper}>
              <div className={styles.formGrid}>
                  <div className={styles.inputGroup}>
                      <label>
                          <span className={styles.icon}>✈️</span>
                          From
                      </label>
                      <select
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                      >
                          <option value="">Select Departure</option>
                          {locations.map((location, index) => (
                              <option key={index} value={location}>
                                  {location}
                              </option>
                          ))}
                      </select>
                  </div>

                  <div className={styles.switchButton}>
                      <button type="button" onClick={() => {
                          setFromLocation(toLocation);
                          setToLocation(fromLocation);
                      }}>
                          ⇄
                      </button>
                  </div>

                  <div className={styles.inputGroup}>
                      <label>
                          <span className={styles.icon}>🛬</span>
                          To
                      </label>
                      <select
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                      >
                          <option value="">Select Destination</option>
                          {locations.map((location, index) => (
                              <option key={index} value={location}>
                                  {location}
                              </option>
                              
                          ))}
                      </select>
                  </div>

                  <div className={styles.inputGroup}>
                      <label>
                          <span className={styles.icon}>📅</span>
                          Travel Date
                      </label>
                      <input
                          type="date"
                          value={travelDate}
                          onChange={(e) => setTravelDate(e.target.value)}
                      />
                  </div>
              </div>

              <button 
                  onClick={handleSearchFlights} 
                  className={styles.searchButton}
              >
                  Search Buses
                  <span className={styles.searchIcon}>🔍</span>
              </button>
          </div>
      </div>

            <div className={styles.resultsContainer}>
                <h1>Available Buses</h1>
                {flights.length > 0 ? (
                   <div className={styles.flightGrid}>
                   {flights.map(flight => (
                       <div key={flight.id} className={styles.flightCard}>
                           <div className={styles.airline}>
                               <span className={styles.airlineIcon}>✈️</span>
                               {flight.airline}
                           </div>
                           
                           <div className={styles.routeInfo}>
                               <div className={styles.route}>
                                   <span className={styles.city}>{flight.from}</span>
                                   <span className={styles.arrow}>→</span>
                                   <span className={styles.city}>{flight.to}</span>
                               </div>
                               <div className={styles.info}>

                               
                               <div className={styles.date}>
                                   <span className={styles.icon}>📅</span>
                                   {new Date(flight.date).toLocaleDateString('en-US', {
                                       weekday: 'short',
                                       month: 'short',
                                       day: 'numeric'
                                   })}
                               </div>
                               <div className={styles.timeInfo}>
                                    <span className={styles.icon}>⏰</span>
                                    <span>{flight.time}</span>
                                </div>
                                </div>
                                <div className={styles.info}>
                                <div className={styles.duration}>
                                    <span className={styles.icon}>🕒</span>
                                    <span>Duration: {flight.duration}</span>
                                </div>
                                <div className={styles.type}>
                                    <span className={styles.icon}>💺</span>
                                    <span>{flight.type}</span>
                                </div>
                                </div>
                            </div>

                           <div className={styles.priceSection}>
                               <span className={styles.price}>${flight.price}</span>
                               <button className={styles.bookButton} onClick={async () =>{
                                    const token = localStorage.getItem("token")
                                    const userId = jwtDecode(token).sub
                                    let ticketDto = {
                                        id : flight.id,
                                        userId,
                                        vehicle_id : 1,
                                        datetime : flight.date,
                                        from : flight.from,
                                        to : flight.to,
                                        price : flight.price,
                                        vehicle_type: 'bus',
                                        seat_class: flight.type

                                    }

                                    try {
                                        
                                        const response = await axios.post(
                                          `${process.env.NEXT_PUBLIC_SERVER_URL}/ticket/bookTicket`,
                                           ticketDto,
                                          {
                                            headers: {
                                              Authorization: `Bearer ${token}`,
                                            },
                                          }
                                        );
                                        if (response.status === 200) {
                                            setToastMessage("Booking Completed")
                                            router.push('/services')
                                        }
                                      } catch (error) {
                                        console.log(error);
                                      }
                               }}>
                                   
                                   Book Now
                               </button>
                           </div>
                       </div>
                   ))}
               </div>
                ) : (
                  <div className={styles.noResults}>
                  <span className={styles.noResultsIcon}>🔍</span>
                  <p>No Buses found for your search criteria.</p>
                  <p>Try different dates or locations.</p>
                  </div>
                )}
            </div>
            <div className={styles.chartSection}>
            {searchPerformed && priceTimelineData.length > 0 && (
    <div className={styles.chartSection}>
        <div className={styles.container}>
            <div className={styles.priceHeader}>
                <h2>{(() => {
                        const currentPrice = Math.min(...flights.map(f => f.price));
                        console.log(currentPrice);
                        const minPrice = Math.min(...priceTimelineData.map(d => d.price));
                        const priceRange = Math.max(...priceTimelineData.map(d => d.price)) - minPrice;
                        const lowThreshold = minPrice + (priceRange / 3);
                        const mediumThreshold = minPrice + (2 * priceRange / 3);

                        if (currentPrice <= lowThreshold) {
                            return (
                                <>
                                    Prices are currently <span className={styles.lowPrice}>low</span> for your search
                                </>
                            );
                        } else if (currentPrice <= mediumThreshold) {
                            return (
                                <>
                                    Prices are currently <span className={styles.mediumPrice}>medium</span> for your search
                                </>
                            );
                        } else {
                            return (
                                <>
                                    Prices are currently <span className={styles.highPrice}>high</span> for your search
                                </>
                            );
                        }
                    })()}
                </h2>
                <div className={styles.priceRange}>
                    <p>
                        The least expensive buses for similar trips to {toLocation} usually cost between ${Math.min(...priceTimelineData.map(d => d.price))}–${Math.max(...priceTimelineData.map(d => d.price))}.
                        <span className={styles.infoIcon}>ⓘ</span>
                    </p>
                    
                    <div className={styles.priceIndicator}>
                        <div className={styles.rangeBar}>
                            <div className={styles.lowRange} />
                            <div className={styles.mediumRange} />
                            <div className={styles.highRange} />
                            <div 
                                className={styles.pricePointer}
                                style={{ left: '90%' }}
                            >
                            </div>
                        </div>
                        <div className={styles.rangeLabels}>
                            <span>${Math.min(...priceTimelineData.map(d => d.price))}</span>
                            <span>${Math.max(...priceTimelineData.map(d => d.price))}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.graphContainer}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    </div>
)}
            </div>
        </div>
    );
}

