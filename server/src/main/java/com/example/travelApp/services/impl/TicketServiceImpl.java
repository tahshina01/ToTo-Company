package com.example.travelApp.services.impl;

import com.example.travelApp.dto.TicketDto;
import com.example.travelApp.models.BusTicket;
import com.example.travelApp.models.PlaneTicket;
import com.example.travelApp.models.TrainTicket;
import com.example.travelApp.models.TransportCompany;
import com.example.travelApp.repositories.BusTicketRepository;
import com.example.travelApp.repositories.PlaneTicketRepository;
import com.example.travelApp.repositories.TrainTicketRepository;
import com.example.travelApp.repositories.TransPortCompanyRepository;
import com.example.travelApp.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final BusTicketRepository busTicketRepository;
    private final TrainTicketRepository trainTicketRepository;
    private final PlaneTicketRepository planeTicketRepository;
    private final TransPortCompanyRepository transPortCompanyRepository;

    @Override
    public ResponseEntity<String> bookBusTicket(TicketDto ticketDto) {
        TransportCompany transportCompany = transPortCompanyRepository.findById(ticketDto.getOwner_id()).get();
        BusTicket busTicket = BusTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())
                .transportCompany(transportCompany)
                .seat_class(ticketDto.getSeat_class())
                .build();
        busTicketRepository.save(busTicket);
        return ResponseEntity.ok("Bus Ticket Booked");
    }

    @Override
    public ResponseEntity<String> bookTrainTicket(TicketDto ticketDto) {
        TransportCompany transportCompany = transPortCompanyRepository.findById(ticketDto.getOwner_id()).get();
        TrainTicket trainTicket = TrainTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())
                .transportCompany(transportCompany)
                .seat_class(ticketDto.getSeat_class())
                .build();
        trainTicketRepository.save(trainTicket);
        return ResponseEntity.ok("Train Ticket Booked");
    }

    @Override
    public ResponseEntity<String> bookPlaneTicket(TicketDto ticketDto) {
        TransportCompany transportCompany = transPortCompanyRepository.findById(ticketDto.getOwner_id()).get();
        PlaneTicket planeTicket = PlaneTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())
                .transportCompany(transportCompany)
                .seat_class(ticketDto.getSeat_class())
                .build();
        planeTicketRepository.save(planeTicket);
        return ResponseEntity.ok("Plane Ticket Booked");
    }
}
