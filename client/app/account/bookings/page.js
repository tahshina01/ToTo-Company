// app/account/bookings/page.js
"use client";

import { useEffect, useState } from "react";
import styles from "./BookingsPage.module.css";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useGlobals } from "@/contexts/Globals";

const RatingStars = ({
  bookingId,
  setBookings,
  bookings,
  setBookingsToShow,
  hotelId,
}) => {
  const [currentRating, setCurrentRating] = useState(0);
  const { setToastMessage } = useGlobals();

  const handleRatingChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/rateHotel`,
        {
          bookingId,
          rating: currentRating,
          hotelId,
          userId: jwtDecode(token).sub,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setToastMessage("Rating submitted successfully");
        const updatedBookings = bookings.pastBookings.filter(
          (b) => b.id !== bookingId
        );
        setBookings({ ...bookings, pastBookings: updatedBookings });
        setBookingsToShow(updatedBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentRating !== 0) {
      setTimeout(() => {
        handleRatingChange();
      }, 1000);
    }
  }, [currentRating]);

  return (
    <div className={styles.ratingContainer}>
      <p className={styles.ratingLabel}>Rate your stay:</p>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            className={`${styles.starButton} ${
              star <= currentRating ? styles.active : ""
            }`}
            onClick={() => setCurrentRating(star)}
          >
            ★
          </button>
        ))}
      </div>
      {currentRating > 0 && (
        <span className={styles.ratingValue}>{currentRating.toFixed(1)}</span>
      )}
    </div>
  );
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("current");
  const [bookings, setBookings] = useState(null);
  const [bookingsToShow, setBookingsToShow] = useState([]);
  const amenities = ["Free Wifi", "Breakfast", "Special Request"];
  const { setToastMessage } = useGlobals();

  useEffect(() => {
    if (bookings) {
      if (activeTab == "current") {
        setBookingsToShow(bookings.currentBookings);
      } else {
        setBookingsToShow(bookings.pastBookings);
      }
    }
  }, [bookings, activeTab]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).sub;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/getBookingsByUserId?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setBookings(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getBookings();
  }, []);

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hotel/cancelBooking?bookingId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setToastMessage("Booking cancelled successfully");
        const updatedBookings = bookings.currentBookings.filter(
          (b) => b.id !== id
        );
        setBookings({ ...bookings, currentBookings: updatedBookings });
        setBookingsToShow(updatedBookings);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bookingsContainer}>
      <div className={styles.bookingsHeader}>
        <h1>My Bookings</h1>
        <p>Manage your hotel reservations and bookings</p>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "current" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("current")}
          >
            Current Bookings
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "past" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("past")}
          >
            Past Bookings
          </button>
        </div>
      </div>

      <div className={styles.bookingsGrid}>
        {bookingsToShow.map((booking) => (
          <div key={booking.id} className={styles.bookingCard}>
            <div className={styles.bookingImage}>
              <img
                src={
                  booking.image
                    ? `data:image/jpeg;base64,${booking.image}`
                    : "/accomodation.png"
                }
                alt={booking.hotelName}
              />
            </div>

            <div className={styles.bookingContent}>
              <div className={styles.bookingHeader}>
                <h2>{booking.hotelName}</h2>
                <p className={styles.location}>
                  <span className={styles.icon}>📍</span>
                  {booking.hotelAddress}
                </p>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Check-in</span>
                    <span>{dayjs(booking.fromDate).format("YYYY-MM-DD")}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Check-out</span>
                    <span>{dayjs(booking.toDate).format("YYYY-MM-DD")}</span>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <div className={styles.detailItem}>
                    <span className={styles.label}>Room Type</span>
                    <span className={styles.value}>{booking.roomType}</span>
                  </div>
                </div>
              </div>

              <div className={styles.amenities}>
                <h3>Amenities</h3>
                <div className={styles.amenitiesList}>
                  {amenities.map((amenity, index) => (
                    <span key={index} className={styles.amenity}>
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.priceSection}>
                <span className={styles.price}>{booking.totalAmount}</span>
                <span className={styles.perNight}>Tk in total</span>
              </div>

              <div className={styles.cardActions}>
                {activeTab === "current" && (
                  <>
                    <button
                      className={styles.cancelButton}
                      onClick={() => {
                        cancelBooking(booking.id);
                      }}
                    >
                      Cancel Booking
                    </button>
                  </>
                )}
                {activeTab === "past" && (
                  <div className={styles.pastBookingActions}>
                    <RatingStars
                      bookingId={booking.id}
                      hotelId={booking.hotelId}
                      setBookings={setBookings}
                      bookings={bookings}
                      setBookingsToShow={setBookingsToShow}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
