package com.example.travelApp.services;

import com.example.travelApp.dto.TicketDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface TicketService {
    ResponseEntity<String> bookBusTicket(TicketDto ticketDto);

    ResponseEntity<String> bookTrainTicket(TicketDto ticketDto);

    ResponseEntity<String> bookPlaneTicket(TicketDto ticketDto);

    ResponseEntity<List<TicketDto>> getTickets(String userid);
}
