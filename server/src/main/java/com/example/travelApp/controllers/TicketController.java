package com.example.travelApp.controllers;

import com.example.travelApp.TicketFactory.Factory;
import com.example.travelApp.dto.TicketDto;
import com.example.travelApp.services.impl.TicketServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket")
@CrossOrigin
@RequiredArgsConstructor
public class TicketController {
    private final Factory ticketFactory;
    private final TicketServiceImpl ticketService;

    @PostMapping("/bookTicket")
    ResponseEntity<String> bookTicket(@RequestBody TicketDto ticketDto) {
        System.out.println(ticketDto.toString());
        return ticketFactory.bookTicket(ticketDto);
    }

    @GetMapping("/getTicketsByUserid")
    ResponseEntity<List<TicketDto>> getTickets(@RequestParam String userid) {
        System.out.println(userid);
        return ticketService.getTickets(userid);
    }

}
