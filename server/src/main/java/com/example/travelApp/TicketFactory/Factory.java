package com.example.travelApp.TicketFactory;

import com.example.travelApp.dto.TicketDto;
import com.example.travelApp.services.impl.TicketServiceImpl;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.Objects;


@RequiredArgsConstructor
@Component
public class Factory {
    @Autowired
    private final TicketServiceImpl ticketService;

    public ResponseEntity<String> bookTicket(TicketDto ticketDto) {
        if(Objects.equals(ticketDto.getVehicle_type(), "bus")) {
            return ticketService.bookBusTicket(ticketDto);
        } else if(Objects.equals(ticketDto.getVehicle_type(), "train")) {
            return ticketService.bookTrainTicket(ticketDto);
        } else {
            return ticketService.bookPlaneTicket(ticketDto);
        }
    }
}
