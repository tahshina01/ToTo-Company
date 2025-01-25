package com.example.travelApp.repositories;

import com.example.travelApp.models.LandMarkImages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LandMarkImageRepository extends JpaRepository<LandMarkImages, Integer> {
    List<LandMarkImages> findByLandMarkId(int id);

    @Query("SELECT l.id FROM LandMarkImages l WHERE l.landMark.id = :id")
    List<Integer> getPrevFilesByLandMarkId(int id);
}
