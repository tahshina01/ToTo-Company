package com.example.travelApp.services.impl;

import com.example.travelApp.dto.TicketDto;
import com.example.travelApp.models.BusTicket;
import com.example.travelApp.models.PlaneTicket;
import com.example.travelApp.models.TrainTicket;
import com.example.travelApp.repositories.BusTicketRepository;
import com.example.travelApp.repositories.PlaneTicketRepository;
import com.example.travelApp.repositories.TrainTicketRepository;
import com.example.travelApp.repositories.TransPortCompanyRepository;
import com.example.travelApp.services.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {
    private final BusTicketRepository busTicketRepository;
    private final TrainTicketRepository trainTicketRepository;
    private final PlaneTicketRepository planeTicketRepository;
    private final TransPortCompanyRepository transPortCompanyRepository;

    @Override
    public ResponseEntity<String> bookBusTicket(TicketDto ticketDto) {

        BusTicket busTicket = BusTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())

                .seat_class(ticketDto.getSeat_class())
                .build();
        busTicketRepository.save(busTicket);
        return ResponseEntity.ok("Bus Ticket Booked");
    }

    @Override
    public ResponseEntity<String> bookTrainTicket(TicketDto ticketDto) {
        TrainTicket trainTicket = TrainTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())

                .seat_class(ticketDto.getSeat_class())
                .build();
        trainTicketRepository.save(trainTicket);
        return ResponseEntity.ok("Train Ticket Booked");
    }

    @Override
    public ResponseEntity<String> bookPlaneTicket(TicketDto ticketDto) {
        PlaneTicket planeTicket = PlaneTicket.builder()
                .vehicle_id(ticketDto.getVehicle_id())
                .datetime(ticketDto.getDatetime())
                .price(ticketDto.getPrice())
                .start_place(ticketDto.getFrom())
                .end_place(ticketDto.getTo())

                .seat_class(ticketDto.getSeat_class())
                .build();
        planeTicketRepository.save(planeTicket);
        return ResponseEntity.ok("Plane Ticket Booked");
    }

    @Override
    public ResponseEntity<List<TicketDto>> getTickets(String userid) {
        ArrayList<TicketDto> ticketDtoArrayList = new ArrayList<>();
        ArrayList<BusTicket> busTickets =  busTicketRepository.findByUserId(userid);
        ArrayList<PlaneTicket> planeTickets =  planeTicketRepository.findByUserId(userid);
        ArrayList<TrainTicket> trainTickets =  trainTicketRepository.findByUserId(userid);

        for (BusTicket busTicket: busTickets){
            TicketDto ticketDto = TicketDto
                    .builder()
                    .id(busTicket.getId())
                    .userId(busTicket.getUserId())
                    .vehicle_id(busTicket.getVehicle_id())
                    .vehicle_type("bus")
                    .from(busTicket.getStart_place())
                    .to(busTicket.getEnd_place())
                    .datetime(busTicket.getDatetime())
                    .price(busTicket.getPrice())
                    .seat_class(busTicket.getSeat_class())

                    .build();
            ticketDtoArrayList.add(ticketDto);
        }

        for (TrainTicket busTicket: trainTickets){
            TicketDto ticketDto = TicketDto
                    .builder()
                    .id(busTicket.getId())
                    .userId(busTicket.getUserId())
                    .vehicle_id(busTicket.getVehicle_id())
                    .vehicle_type("train")
                    .from(busTicket.getStart_place())
                    .to(busTicket.getEnd_place())
                    .datetime(busTicket.getDatetime())
                    .price(busTicket.getPrice())
                    .seat_class(busTicket.getSeat_class())

                    .build();
            ticketDtoArrayList.add(ticketDto);
        }
        for (PlaneTicket busTicket: planeTickets){
            TicketDto ticketDto = TicketDto
                    .builder()
                    .id(busTicket.getId())
                    .userId(busTicket.getUserId())
                    .vehicle_id(busTicket.getVehicle_id())
                    .vehicle_type("train")
                    .from(busTicket.getStart_place())
                    .to(busTicket.getEnd_place())
                    .datetime(busTicket.getDatetime())
                    .price(busTicket.getPrice())
                    .seat_class(busTicket.getSeat_class())

                    .build();
            ticketDtoArrayList.add(ticketDto);
        }

        System.out.println(busTickets.size());
        System.out.println(planeTickets.size());
        System.out.println(trainTickets.size());

        return ResponseEntity.ok(ticketDtoArrayList);
    }
}
