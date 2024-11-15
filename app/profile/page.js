// app/profile/page.js
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
    imageUrl: '/profile.jpg',
  };

  return (
    <div className={styles.profilePage}> {/* Apply the background to the whole page */}
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <img
            src={user.imageUrl}
            alt="User Profile"
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
            <strong>Username:</strong>
            <p>{user.name}</p>
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
      <div className={styles.updateButtonContainer}>
        <button className={styles.updateProfileBtn}>Update Profile</button>
      </div>
    </div>
  );
}
