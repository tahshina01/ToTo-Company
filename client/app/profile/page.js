// app/profile/page.js
"use client";

import styles from "./ProfilePage.module.css";
import { MdEdit } from "react-icons/md";
import { useState } from "react";

export default function ProfilePage() {
  const user = {
    id: "U12345",
    name: "John Doe",
    phone: "+1 (234) 567-890",
    address: "123 Main Street, Hometown, USA",
    gender: "Male",
    age: 30,
    profession: "Software Engineer",
    imageUrl: "/profile.jpg",
  };

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className={styles.profilePage}>
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
            {!isEditing && <p>{user.id}</p>}
            {isEditing && (
              <input
                type="text"
                className="indent-2 rounded-b-none border-b-2 rounded-2xl w-full outline-none font-sans cursor-pointer"
                placeholder="Enter address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setWarning("");
                }}
              />
            )}
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
        <button className={styles.updateProfileBtn}>
          {isEditing ? (
            "Apply Changes"
          ) : (
            <div className="flex justify-center items-center gap-2">
              <MdEdit className="text-xl" />
              Update
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
