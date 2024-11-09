// app/profile/page.js

import Image from 'next/image';
import styles from './ProfilePage.module.css';

export default function ProfilePage() {
  const user = {
    id: 'U12345',
    name: 'John Doe',
    phone: '+1 (234) 567-890',
    address: '123 Main Street, Hometown, USA',
    gender: 'Male',
    age: 30,
    profession: 'Software Engineer',
    imageUrl: '/profile.jpg', // You can replace this with a URL or an image in your 'public' folder
  };

  return (
    <div className={styles.profilePage}>
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <Image 
          src={user.imageUrl} 
          alt="User Profile Picture" 
          width={150} 
          height={150} 
          className={styles.profileImage} 
        />
        <div className={styles.profileInfo}>
          <h1>{user.name}</h1>
          <p className={styles.profession}>{user.profession}</p>
        </div>
      </div>

      <div className={styles.profileDetails}>
        <div className={styles.detail}>
          <strong>User ID:</strong>
          <p>{user.id}</p>
        </div>
        <div className={styles.detail}>
          <strong>Phone:</strong>
          <p>{user.phone}</p>
        </div>
        <div className={styles.detail}>
          <strong>Address:</strong>
          <p>{user.address}</p>
        </div>
        <div className={styles.detail}>
          <strong>Gender:</strong>
          <p>{user.gender}</p>
        </div>
        <div className={styles.detail}>
          <strong>Age:</strong>
          <p>{user.age}</p>
        </div>
      </div>
    </div>
    </div>
  );
}
