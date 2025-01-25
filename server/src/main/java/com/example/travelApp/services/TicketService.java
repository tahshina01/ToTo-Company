package com.example.travelApp.services;

import com.example.travelApp.dto.TicketDto;
import org.springframework.http.ResponseEntity;

public interface TicketService {
    ResponseEntity<String> bookBusTicket(TicketDto ticketDto);

    ResponseEntity<String> bookTrainTicket(TicketDto ticketDto);

    ResponseEntity<String> bookPlaneTicket(TicketDto ticketDto);
}
