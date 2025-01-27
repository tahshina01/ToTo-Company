// app/travel/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from './TravelPage.module.css';

export default function TravelPage() {
  const router = useRouter();

  const travelOptions = [
    {
      id: 1,
      type: 'Flight',
      icon: '✈️',
      description: 'Book domestic and international flights with best deals',
      features: [
        'Real-time flight tracking',
        'Seat selection',
        'Meal preferences',
        'Baggage options'
      ],
      benefits: [
        'Best price guarantee',
        'Free cancellation on selected flights',
        '24/7 customer support'
      ],
      route: '/services/travel/flight',
      gradient: 'blueGradient'
    },
    {
      id: 2,
      type: 'Train',
      icon: '🚂',
      description: 'Reserve train tickets for your journey across the country',
      features: [
        'Live train status',
        'Seat availability',
        'Platform locator',
        'Food ordering'
      ],
      benefits: [
        'Instant booking confirmation',
        'Alternative routes suggestion',
        'Station information'
      ],
      route: '/services/travel/train',
      gradient: 'greenGradient'
    },
    {
      id: 3,
      type: 'Bus',
      icon: '🚌',
      description: 'Find and book bus tickets for your desired destination',
      features: [
        'Live tracking',
        'Seat layout selection',
        'Rest stop information',
        'Luggage allowance'
      ],
      benefits: [
        'Flexible scheduling',
        'Multiple pickup points',
        'Easy cancellation'
      ],
      route: '/services/travel/bus',
      gradient: 'orangeGradient'
    }
  ];

  const handleCardClick = (route) => {
    router.push(route);
  };

  return (
    <div className={styles.travelContainer}>
      <div className={styles.travelHeader}>
        <h1>Travel Bookings</h1>
        <p>Choose your preferred mode of transportation</p>
      </div>

      <div className={styles.cardsContainer}>
        {travelOptions.map((option) => (
          <div 
            key={option.id} 
            className={`${styles.card} ${styles[option.gradient]}`}
            onClick={() => handleCardClick(option.route)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.icon}>{option.icon}</span>
              <h2>{option.type}</h2>
            </div>

            <p className={styles.description}>{option.description}</p>

            <div className={styles.featuresSection}>
              <h3>Features</h3>
              <ul className={styles.featuresList}>
                {option.features.map((feature, index) => (
                  <li key={index}>
                    <span className={styles.checkmark}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.benefitsSection}>
              <h3>Benefits</h3>
              <ul className={styles.benefitsList}>
                {option.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span className={styles.star}>★</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <button className={styles.bookButton}>
              Book {option.type}
              <span className={styles.arrowIcon}>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}