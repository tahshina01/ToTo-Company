package com.example.travelApp.repositories;

import com.example.travelApp.models.BusTicket;
import com.example.travelApp.models.TrainTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface TrainTicketRepository extends JpaRepository<TrainTicket, Integer> {
    ArrayList<TrainTicket> findByUserId(String userid);
}
