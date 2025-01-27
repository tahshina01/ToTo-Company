// app/about/page.js

'use client'; // Ensure the component is a Client Component

import styles from './AboutPage.module.css';

export default function AboutPage() {
  const individuals = [
    {
      name: 'Tahshina Islam Munni',
      imageUrl: '/profile.jpg', // Replace with actual image path
      description: 'Tahshina is a product designer focused on creating user-centric digital experiences.',
    },
    {
      name: 'S.M. Imran Rahman',
      imageUrl: '/profile.jpg', // Replace with actual image path
      description: 'Imran is a software engineer with a passion for web development and AI.',
    },
    {
      name: 'Nirjhor Singha',
      imageUrl: '/profile.jpg', // Replace with actual image path
      description: 'Nirjhor is a data scientist who specializes in machine learning and big data analysis.',
    },
    {
      name: 'Shariful Islam Rayhan',
      imageUrl: '/profile.jpg', // Replace with actual image path
      description: 'Shariful is a digital marketing expert with a background in SEO and content strategy.',
    },
  ];

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h1>Meet Our Team</h1>
      </div>

      <div className={styles.aboutGrid}>
        {individuals.map((individual, index) => (
          <div key={index} className={styles.aboutCard}>
            <img src={individual.imageUrl} alt={individual.name} />
            <h2>{individual.name}</h2>
            <p>{individual.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
