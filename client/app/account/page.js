// app/account/page.js
'use client';

import { useRouter } from 'next/navigation';
import styles from './AccountPage.module.css';

export default function AccountPage() {
  const router = useRouter();

  const accountCards = [
    {
      title: 'My Profile',
      icon: '👤', // You can replace with actual icon component
      description: 'Manage your personal information, preferences, and settings',
      features: [
        'Personal Details',
        'Password Management',
        'Email Preferences',
        'Privacy Settings'
      ],
      path: '/account/profile'
    },
    {
      title: 'My Bookings',
      icon: '🏨', // You can replace with actual icon component
      description: 'View and manage all your hotel reservations and bookings',
      features: [
        'Current Bookings',
        'Booking History',
        'Cancellations',
        'Special Requests'
      ],
      path: '/account/bookings'
    },
    {
      title: 'My Trips',
      icon: '✈️', // You can replace with actual icon component
      description: 'Track and organize all your travel arrangements',
      features: [
        'Upcoming Trips',
        'Past Travels',
        'Travel Documents',
        'Trip Planning'
      ],
      path: '/account/trips'
    }
  ];

  const handleCardClick = (path) => {
    router.push(path);
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.accountHeader}>
        <h1>My Account</h1>
        <p>Manage your profile, bookings, and travel plans</p>
      </div>

      <div className={styles.cardsGrid}>
        {accountCards.map((card, index) => (
          <div 
            key={index} 
            className={styles.card}
            onClick={() => handleCardClick(card.path)}
          >
            <div className={styles.cardIcon}>{card.icon}</div>
            <h2>{card.title}</h2>
            <p className={styles.description}>{card.description}</p>
            <div className={styles.featuresList}>
              {card.features.map((feature, featureIndex) => (
                <div key={featureIndex} className={styles.featureItem}>
                  <span className={styles.checkIcon}>✓</span>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}