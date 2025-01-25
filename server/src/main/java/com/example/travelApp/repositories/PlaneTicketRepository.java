package com.example.travelApp.repositories;

import com.example.travelApp.models.BusTicket;
import com.example.travelApp.models.PlaneTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaneTicketRepository extends JpaRepository<PlaneTicket, Integer> {
}
