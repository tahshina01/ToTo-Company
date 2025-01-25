package com.example.travelApp.controllers;

import com.example.travelApp.TicketFactory.Factory;
import com.example.travelApp.dto.TicketDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ticket")
@CrossOrigin
@RequiredArgsConstructor
public class TicketController {
    private final Factory ticketFactory;

    @PostMapping("/bookTicket")
    ResponseEntity<String> bookTicket(@RequestParam TicketDto ticketDto) {
        return ticketFactory.bookTicket(ticketDto);
    }
}
