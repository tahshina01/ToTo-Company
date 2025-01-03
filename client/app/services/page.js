// app/services/page.js
"use client";
import styles from "./ServicesPage.module.css";
import { useRouter } from "next/navigation";

export default function ServicesPage() {
  const router = useRouter();
  const services = [
    {
      title: "Travel",
      imageUrl: "/travel.jpg", // Replace with your image URL
      description:
        "Explore amazing destinations around the world with our curated travel packages.",
      link: "/services/travel", // Link to more details
    },
    {
      title: "Hotel",
      imageUrl: "/accomodation.jpg", // Replace with your image URL
      description:
        "Stay at the best hotels and resorts that offer comfort and luxury.",
      link: "/services/accommodation", // Link to more details
    },
    {
      title: "Landmarks",
      imageUrl: "/landmark.jpg", // Replace with your image URL
      description:
        "Discover the most iconic landmarks and attractions that make every trip unforgettable.",
      link: "/services/landmarks", // Link to more details
    },
  ];

  return (
    <div className={styles.servicesContainer}>
      <div className={styles.servicesHeader}>
        <h1>Our Services</h1>
      </div>

      <div className={styles.servicesGrid}>
        {services.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <img src={service.imageUrl} alt={service.title} />
            <div className={styles.serviceCardContent}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <button onClick={() => router.push(service.link)}>
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
