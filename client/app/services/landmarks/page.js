"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./LandmarkPage.module.css";
import axios from "axios";
import LandMarkDialog from "@/components/dialogs/LandMarkDialog";
import { Button } from "@/components/ui/button";

const LandmarkCard = ({ landmark }) => {
  const dialogRef = useRef(null);
  return (
    <div className={styles.landmarkCard}>
      <img
        src={
          landmark.images.length > 0
            ? `data:image/jpeg;base64,${landmark.images[0].data}`
            : "/landmark.jpg"
        }
        alt={landmark.name}
        className={styles.landmarkImage}
      />
      <h2 className={styles.cardTitle}>{landmark.name}</h2>
      <p className={styles.cardDetails}>{landmark.location}</p>
      <p className={styles.cardType}>{landmark.type}</p>
      <Button
        className="text-sm font-bold mt-1"
        onClick={() => {
          dialogRef.current.click();
        }}
      >
        Show details
      </Button>
      <div className="flex items-center w-full justify-end px-3 my-2">
        <LandMarkDialog landmark={landmark} buttonRef={dialogRef} />
      </div>
    </div>
  );
};

export default function LandmarkPage() {
  const [landmarks, setLandmarks] = useState([]);
  const [filteredLandmarks, setFilteredLandmarks] = useState([]);

  useEffect(() => {
    const getLandmarks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/landmark/getAll`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setLandmarks(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLandmarks();
  }, []);

  const countries = [
    "All",
    "USA",
    "France",
    "China",
    "Brazil",
    "India",
    "Australia",
    "Peru",
    "Nepal",
    "Canada",
    "Italy",
    "Zimbabwe",
    "Cambodia",
    "United Kingdom",
    "Singapore",
    "Malaysia",
    "Japan",
    "Spain",
  ];
  const types = ["All", "Cultural", "Historical", "Natural", "Modern"];

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const filteredLandmarks = landmarks.filter((landmark) => {
      const matchesSearch = landmark.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCountry =
        selectedCountry === "All" || landmark.location === selectedCountry;
      const matchesType =
        selectedType === "All" || landmark.type === selectedType;
      return matchesSearch && matchesCountry && matchesType;
    });
    setFilteredLandmarks(filteredLandmarks);
  }, [landmarks, searchQuery, selectedCountry, selectedType]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div className={styles.landmarkPage}>
      <h1 className={styles.pageTitle}>Discover Landmarks</h1>

      <div className={styles.filters}>
        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search landmarks..."
            value={searchQuery}
            onChange={handleSearch}
            className={styles.searchInput}
          />
        </div>

        {/* Country Filter */}
        <div className={styles.filterContainer}>
          <h1>Country</h1>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className={styles.filterDropdown}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterContainer}>
          <h1>Type</h1>
          <select
            value={selectedType}
            onChange={handleTypeChange}
            className={styles.filterDropdown}
          >
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Landmark List */}
      <div className={styles.landmarkList}>
        {filteredLandmarks.length > 0 ? (
          filteredLandmarks.map((landmark) => (
            <div key={landmark.id}>
              <LandmarkCard landmark={landmark} />
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", color: "#888" }}>
            No landmarks match your search.
          </p>
        )}
      </div>
    </div>
  );
}
