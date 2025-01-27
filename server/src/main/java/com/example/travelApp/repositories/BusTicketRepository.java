package com.example.travelApp.repositories;

import com.example.travelApp.models.BusTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BusTicketRepository extends JpaRepository<BusTicket, Integer> {
    ArrayList<BusTicket> findByUserId(String userid);
}
