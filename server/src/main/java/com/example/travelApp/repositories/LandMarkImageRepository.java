package com.example.travelApp.repositories;

import com.example.travelApp.models.LandMarkImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkImageRepository extends JpaRepository<LandMarkImages, Integer> {
}
