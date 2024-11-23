package com.example.travelApp.repositories;

import com.example.travelApp.models.LandMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandMarkRepository extends JpaRepository<LandMark, Integer> {
}
