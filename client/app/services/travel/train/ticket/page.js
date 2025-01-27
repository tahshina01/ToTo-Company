// pages/ticket.js
"use client";
import styles from "./TicketPage.module.css";
export default function Ticket() {
    const flightInfo = {
      from: 'New York',
      to: 'Los Angeles',
      date: '2024-12-01',
      time: '10:00 AM',
      duration: '6h 10m',
      price: 300,
      airline: 'Delta Airlines',
      class: 'Economy'
    };
    const getAirlineInitials = (airlineName) => {
        return airlineName
          .split(' ')
          .map(word => word[0])
          .join('')
          .toUpperCase();
      };
    return (
      <div className={styles.container}>
        <div className={styles.ticket}>
          <div className={styles.airline}>
            <div className={styles.airline_header}>
              <div className={styles.logo_section}>
                <div className={styles.airline_logo}> {getAirlineInitials(flightInfo.airline)}</div>
                <div className={styles.airline_info}>
                  <h1>{flightInfo.airline}</h1>
                  <span className={styles.type}>{flightInfo.class}</span>
                </div>
              </div>
              <div className={styles.price_tag}>
                <span>Total Price</span>
                <h2>${flightInfo.price}</h2>
              </div>
            </div>
          </div>
          
          <div className={styles.content}>
            <div className={styles.flight_route}>
              <div className={styles.route_info}>
                <h2>{flightInfo.from}</h2>
                <p>{flightInfo.time}</p>
              </div>
              
              <div className={styles.flight_path}>
                <div className={styles.duration}>
                  <span>{flightInfo.duration}</span>
                  <div className={styles.plane_line}>
                    <div className={styles.dot}></div>
                    <div className={styles.plane_icon}>✈️</div>
                    <div className={styles.dot}></div>
                  </div>
                  <span>Direct Flight</span>
                </div>
              </div>
              
              <div className={styles.route_info}>
                <h2>{flightInfo.to}</h2>
              </div>
            </div>
  
            <div className={styles.details}>
              <div className={styles.detail_item}>
                <div className={styles.detail_icon}>📅</div>
                <div>
                  <span>Date</span>
                  <h3>{flightInfo.date}</h3>
                </div>
              </div>
              
              <div className={styles.detail_item}>
                <div className={styles.detail_icon}>💺</div>
                <div>
                  <span>Class</span>
                  <h3>{flightInfo.class}</h3>
                </div>
              </div>
              
            </div>
  
            <button className={styles.confirm_button} onClick={() => alert('Booking confirmed!')}>
              <span>Confirm Booking</span>
              <div className={styles.button_icon}>→</div>
            </button>
          </div>
        </div>
      </div>
    );
  }